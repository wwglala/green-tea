import path from 'path';
import { QuestionProps } from '.';
import {
  changeVersion,
  changeset,
  downloadGit,
  modifyPackageName,
  removeGItDir,
} from './utils';

export const choices = {
  ac: {
    call() {
      return changeset();
    },
  },
  up: {
    call() {
      return changeVersion();
    },
  },
  monorepo: {
    call() {
      console.log('init');
      return downloadMonoRepo('./');
    },
  },
  create: {
    apps: {
      call(res: QuestionProps) {
        console.log('sub-apps');
        return downloadWebpackRepo(
          path.join('./apps', res.path_name),
          res.name
        );
      },
    },
    packages: {
      call(res: QuestionProps) {
        console.log('sub-packages');
        return downloadRollupRepo(
          path.join('./packages', res.path_name),
          res.name
        );
      },
    },
    utils: {
      call(res: QuestionProps) {
        console.log('sub-utils');
        console.log('not implement');
      },
    },
  },
};

export const downloadMonoRepo = (path: string) =>
  downloadGit('https://github.com/wwglala/monorepo-template.git', path).then(
    () => removeGItDir(path)
  );

export const downloadRollupRepo = (path: string, name = '') =>
  downloadGit('https://github.com/wwglala/monorepo-rollup-template.git', path)
    .then(() => modifyPackageName(path, name))
    .then(() => removeGItDir(path));

export const downloadWebpackRepo = (path: string, name = '') =>
  downloadGit('https://github.com/wwglala/monorepo-webpack-template.git', path)
    .then(() => modifyPackageName(path, name))
    .then(() => removeGItDir(path));
