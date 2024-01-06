import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default defineConfig({
  input: "./bin/cli.ts",
  output: {
    file: "dist/cli.js",
    format: "cjs",
  },
  plugins: [
    resolve({
      exportConditions: ['node'],
    }),
    commonjs(),
    json(),
    typescript(),
    babel(),
  ],
  watch: {
    include: './bin/**'
  }
});
