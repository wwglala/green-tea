#!/usr/bin/env node

import inquirer from 'inquirer';
import { choices } from './choices';
import { Command } from 'commander';
import packageJson from '../package.json';

export interface QuestionProps {
  type: 'apps' | 'packages' | 'utils';
  name: string;
  path_name: string;
}

const program = new Command();

program
  .name('green-tea')
  .description('CLI to frontend repo')
  .version(packageJson.version);

program
  .command('create')
  .description('create a sub project')
  .action(() =>
    inquirer
      .prompt<QuestionProps>([
        {
          type: 'list',
          name: 'type',
          message: '请选择要创建的应用',
          choices: ['apps', 'packages', 'utils'],
        },
        {
          type: 'input',
          name: 'name',
          message: '请填写 `package.json` name',
        },
        {
          type: 'input',
          name: 'path_name',
          message: '请填写子项目路径名称',
          validate(path_name: string) {
            return Boolean(path_name);
          },
        },
      ])

      .then((res) => choices.create[res.type].call(res))
      .catch(console.log)
  );

program
  .command('init')
  .description('init a monorepo registry')
  .action(() => choices.monorepo.call().catch(console.log));

program
  .command('ac')
  .description('generate changeset for modify packages')
  .action(() => choices.ac.call());

program
  .command('up')
  .description('update version for modify packages')
  .action(() => choices.up.call());

program.parse();
