import { $ } from "execa";
import { ProjectOptions } from "~/installer.js";

import { type Recipe } from "~/recipes/index.js";

const recipe: Recipe = {
  packageJson: {
    scripts: {},
    dependencies: {},
    devDependencies: {
      eslint: "latest",
      "eslint-config-next": "latest",
      "@typescript-eslint/parser": "latest",
      "@typescript-eslint/eslint-plugin": "latest",
    },
  },
  arch: {
    ".eslintrc.js": "replaces",
  },
  steps: [
    {
      id: "setup-eslint",
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
