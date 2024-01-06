#!/usr/bin/env node

import inquirer from "inquirer";
import { choices } from "./choices";
import { Command } from "commander";
import packageJson from "../package.json";

export interface QuestionProps {
  type: "business" | "module";
  path_name: string;
}

const program = new Command();

program
  .name("green-tea")
  .description("CLI to frontend repo")
  .version(packageJson.version);

program
  .command("create")
  .description("create a sub project")
  .action(() =>
    inquirer
      .prompt<QuestionProps>([
        {
          type: "list",
          name: "type",
          message: "请选择要创建的应用",
          choices: ["business", "module"],
        },
        {
          type: "input",
          name: "path_name",
          message: "请填写子项目路径名称",
          validate(path_name) {
            return Boolean(path_name);
          },
        },
      ])
      .then((res) => choices.path_name[res.type].call(res))
      .catch(console.log)
  );

program
  .command("init")
  .description("init a monorepo registry")
  .action(() =>
    inquirer
      .prompt<QuestionProps>([
        {
          type: "list",
          name: "type",
          message: "请选择要创建的应用",
          choices: ["business", "module"],
        },
        {
          type: "input",
          name: "path_name",
          message: "请填写子项目路径名称",
          validate(path_name) {
            return Boolean(path_name);
          },
        },
      ])
      .then((res) => choices[res.type].path_name.call(res))
      .catch(console.log)
  );

program.parse();
