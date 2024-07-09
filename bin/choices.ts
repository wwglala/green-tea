import { QuestionProps } from '.';
import {
  changeVersion,
  changeset,
  downloadGit,
  modifyPackageName,
} from './utils';

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
        console.log('init');
        return downloadMonoRepo('./').then(() => {
          console.log('down the first one');
          return downloadWebpackRepo(res.path_name, res.name);
        });
      },
    },
  },
  module: {
    path_name: {
      call(res: QuestionProps) {
        console.log('init');
        return downloadMonoRepo('./').then(() => {
          console.log('down the first one');
          return downloadRollupRepo(res.path_name, res.name);
        });
      },
    },
  },
  path_name: {
    module: {
      call(res: QuestionProps) {
        console.log('sub');
        return downloadRollupRepo(res.path_name, res.name);
      },
    },
    business: {
      call(res: QuestionProps) {
        console.log('sub');
        return downloadWebpackRepo(res.path_name, res.name);
      },
    },
  },
};

export const downloadMonoRepo = (path: string) =>
  downloadGit('https://github.com/wwglala/monorepo-template.git', path);

export const downloadRollupRepo = (path: string, name = '') =>
  downloadGit(
    'https://github.com/wwglala/monorepo-rollup-template.git',
    path
  ).then(() => modifyPackageName(path, name));

export const downloadWebpackRepo = (path: string, name = '') =>
  downloadGit(
    'https://github.com/wwglala/monorepo-webpack-template.git',
    path
  ).then(() => modifyPackageName(path, name));
