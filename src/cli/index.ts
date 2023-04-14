import { Command } from "commander";
import { CLI_NAME } from "~/consts.js";
import inquirer from "inquirer";

interface CliOptions {
  install: boolean;

  express: boolean;
  tailwind: boolean;
  trpc: boolean;
  prisma: boolean;

  // auth stuff
  expressSession: boolean;
  nextAuth: boolean;
}

export const runCli = async () => {
  const program = new Command().name(CLI_NAME);

  program.description("Extended T3 stack web app bootstrapper for the CLI");

  await inquirer.prompt({
    name: "appName",
    type: "input",
    message: "What is the name of your app?",
    default: "my-app",
    transformer: (input: string) => {
      return input.trim();
    },
  });

  return {
    appName: "my-app",
    packages: true,
    flags: {
      install: true,
      importAlias: "@/",
    },
  };
};
