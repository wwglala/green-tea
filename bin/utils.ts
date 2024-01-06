import { spawn } from "child_process";

export const downloadGit = (url: string, localPath: string) =>
  new Promise<void>((resolve, reject) => {
    const git = spawn("git", ["clone", "--progress", url, localPath]);

    git.stderr.on("data", (chunk) => {
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

      console.log(`git ${stage} stage ${progress}% complete \n`);
    });

    git.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Git clone process exited with code ${code}`);
        reject(code);
      } else {
        console.log(`Git clone successful!`);
        resolve();
      }
    });
  });
