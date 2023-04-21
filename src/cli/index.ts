// import { Command } from "commander";
import { DEFAULT_APP_NAME } from "~/consts.js";
import inquirer from "inquirer";
import { logger } from "~/utils/logger.js";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { next } from "~/recipes/index.js";
import { type ProjectOptions } from "~/installer.js";

export const runCli = async () => {
  const options: ProjectOptions = {
    projectDir: DEFAULT_APP_NAME,
    language: "typescript",
    install: true,
    importAlias: "~/*",
    recipes: [next],
  };

  options.projectDir = await promptProjectDir();
  options.language = await promptLanguage();
  options.install = await promptInstall();

  return options;
};

const promptProjectDir = async () => {
  const { projectDir } = await inquirer.prompt<
    Pick<ProjectOptions, "projectDir">
  >({
    name: "projectDir",
    type: "input",
    message: "What do you want to name your app?",
    default: DEFAULT_APP_NAME,
    validate: (input: string) => {
      const validationRegExp =
        /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
      const paths = input.split("/");

      // If the first part is a @, it's a scoped package
      const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));

      let appName = paths[paths.length - 1];
      if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
        appName = paths.slice(indexOfDelimiter).join("/");
      }

      if (input === "." || validationRegExp.test(appName ?? "")) {
        return true;
      } else {
        return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
      }
    },
    transformer: (input: string) => {
      return input.trim();
    },
  });

  return projectDir;
};

const promptLanguage = async () => {
  const { language } = await inquirer.prompt<Pick<ProjectOptions, "language">>({
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

  const { install } = await inquirer.prompt<Pick<ProjectOptions, "install">>({
    name: "install",
    type: "confirm",
    message:
      `Would you like us to run '${pkgManager}` +
      (pkgManager === "yarn" ? `'?` : ` install'?`),
    default: true,
  });

  return install;
};
