import { Command } from "commander";
import { CLI_NAME, DEFAULT_APP_NAME } from "~/consts.js";
import inquirer from "inquirer";
import { logger } from "~/utils/logger.js";
import { type AvailablePackages } from "~/installers/index.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";

interface CliFlags {
  language: "typescript" | "javascript";
  importAlias: string;
  install: boolean;

  express: boolean;
  tailwind: boolean;
  trpc: boolean;
  prisma: boolean;

  // auth stuff
  expressSession: boolean;
  nextAuth: boolean;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ["env"],
  flags: {
    language: "typescript",
    express: false,
    expressSession: false,
    // noGit: false,
    install: false,
    // default: false,
    // CI: false,
    tailwind: false,
    trpc: false,
    prisma: false,
    nextAuth: false,
    importAlias: "~/",
  },
};

export const runCli = async () => {
  const cliResults = defaultOptions;

  const program = new Command().name(CLI_NAME);

  program.description("Extended T3 stack web app bootstrapper for the CLI");

  cliResults.flags.language = await promptLanguage();
  cliResults.flags.install = await promptInstall();

  return cliResults;
};

const promptLanguage = async () => {
  const { language } = await inquirer.prompt<{
    language: "typescript" | "javascript";
  }>({
    name: "language",
    type: "list",
    message: "What language do you want to use?",
    choices: [
      { name: "TypeScript", value: "typescript", short: "TypeScript" },
      { name: "JavaScript", value: "javascript", short: "JavaScript" },
    ],
    default: "typescript",
  });

  if (language === "javascript") {
    logger.error(
      "Javascript is not yet supported, defaulting to Typescript..."
    );
    return "typescript";
  }

  return language;
};

const promptInstall = async () => {
  const pkgManager = getUserPkgManager();

  const { install } = await inquirer.prompt<{ install: boolean }>({
    name: "install",
    type: "confirm",
    message:
      `Would you like us to run '${pkgManager}` +
      (pkgManager === "yarn" ? `'?` : ` install'?`),
    default: true,
  });

  return install;
};
