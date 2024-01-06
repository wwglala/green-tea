import { QuestionProps } from "./cli";
import { downloadGit } from "./utils";

export const choices = {
  business: {
    path_name: {
      call(res: QuestionProps) {
        console.log(res);
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
  },
};

export const downloadMonoRepo = (path: string) =>
  downloadGit("https://github.com/wwglala/monorepo-template.git", path);

export const downloadRollupRepo = (path: string) =>
  downloadGit("https://github.com/wwglala/monorepo-rollup-template.git", path);
