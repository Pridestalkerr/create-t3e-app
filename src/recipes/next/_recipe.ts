import { $ } from "execa";
import { ProjectOptions } from "~/installer.js";

import { type Recipe } from "~/recipes/index.js";

const recipe: Recipe = {
  packageJson: {
    scripts: {},
    dependencies: {},
    devDependencies: {},
  },
  arch: {
    ".gitignore": "gitignore",
    "tsconfig.json": "tsconfig",
  },
  steps: [
    {
      id: "create-next-app",
      label: "Creating Next.js app...",
      description: "Create a Next.js app with the default template",
      run: async ({
        projectDir,
        language,
        // packageManager,
        importAlias,
      }: ProjectOptions) => {
        await $`npx create-next-app@latest ${projectDir} --${language} --no-tailwind --no-eslint --src-dir --no-experimental-app --import-alias ${importAlias}`;
      },
    },
  ],
};

export default recipe;
