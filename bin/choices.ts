import { QuestionProps } from ".";
import { changeVersion, changeset, downloadGit } from "./utils";

export const choices = {
  chs: {
    call() {
      return changeset();
    },
  },
  chv: {
    call() {
      return changeVersion();
    },
  },
  business: {
    path_name: {
      call(res: QuestionProps) {
        console.log("init");
        return downloadMonoRepo("./").then(() => {
          console.log("down the first one");
          return downloadWebpackRepo(res.path_name);
        });
      },
    },
  },
  module: {
    path_name: {
      call(res: QuestionProps) {
        console.log("init");
        return downloadMonoRepo("./").then(() => {
          console.log("down the first one");
          return downloadRollupRepo(res.path_name);
        });
      },
    },
  },
  path_name: {
    module: {
      call(res: QuestionProps) {
        console.log("sub");
        return downloadRollupRepo(res.path_name);
      },
    },
    business: {
      call(res: QuestionProps) {
        throw new Error("This module has not been implemented yet");
      },
    },
  },
};

export const downloadMonoRepo = (path: string) =>
  downloadGit("https://github.com/wwglala/monorepo-template.git", path);

export const downloadRollupRepo = (path: string) =>
  downloadGit("https://github.com/wwglala/monorepo-rollup-template.git", path);

export const downloadWebpackRepo = (path: string) =>
  downloadGit("https://github.com/wwglala/monorepo-webpack-template.git", path);
