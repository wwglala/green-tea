#!/usr/bin/env node

import inquirer from 'inquirer';
import { choices } from './choices';
import { Command } from 'commander';
import packageJson from '../package.json';

export interface QuestionProps {
  type: 'business' | 'module';
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
          choices: ['business', 'module'],
        },
        {
          type: 'input',
          name: 'name',
          message: "请填写 'package.json' name",
        },
        {
          type: 'input',
          name: 'path_name',
          message:
            '请填写子项目路径名称(以apps/components/packages开始)[不能以“/”开头]',
          validate(path_name: string) {
            return Boolean(path_name) && !path_name.startsWith('/');
          },
        },
      ])

      .then((res) => choices.path_name[res.type].call(res))
      .catch(console.log)
  );

program
  .command('init')
  .description('init a monorepo registry')
  .action(() => choices.monorepo.call().catch(console.log));

program
  .command('chs')
  .description('generate changeset for modify packages')
  .action(() => choices.chs.call());

program
  .command('chv')
  .description('update version for modify packages')
  .action(() => choices.chv.call());

program.parse();
