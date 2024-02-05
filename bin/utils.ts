import { spawn } from "child_process";

const cmdForSpawn = (main: string, args: string[], flag: string) =>
  new Promise<void>((resolve, reject) => {
    const ins = spawn(main, args);
    ins.stderr.on("data", (chunk) => {
      const message = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(
        chunk.toString("utf8")
      );
      console.log(chunk.toString("utf8"));
      if (!message) {
        return;
      }

      const { stage, progress } = {
        stage: message[1],
        progress: message[2],
      };

      console.log(`${flag} ${stage} stage ${progress}% complete \n`);
    });
    ins.on("exit", (code) => {
      if (code !== 0) {
        console.error(`${flag} exited with code ${code}`);
        reject(code);
      } else {
        console.log(`${flag} successful!`);
        resolve();
      }
    });
  });

export const downloadGit = (url: string, localPath: string) =>
  cmdForSpawn("git", ["clone", "--progress", url, localPath], "GIT Clone");

export const changeset = () =>
  cmdForSpawn("pnpm", ["changeset"], "PNPM Changeset");

export const changeVersion = () =>
  cmdForSpawn("pnpm", ["changeset", "version"], "PNPM Changeset Version");
