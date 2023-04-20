import { $ } from "execa";

// empty, nextjs sets up the base for us
export const packageJson = {
  scripts: {},
  dependencies: {},
  devDependencies: {},
};

// instructions should be:
// - scripts to run (such as create next app?)
// - add files
// - modify files (with template engine maybe)

export const arch = {
  ".gitignore": "gitignore",
  "tsconfig.json": "tsconfig",
};

export const steps = [
  {
    id: "create-next-app",
    label: "Create Next App",
    description: "Create a Next.js app with the default template",
    run: async ({
      projectDir,
      language,
      packageManager,
      importAlias,
    }: {
      projectDir: string;
      language: "typescript" | "javascript";
      packageManager: "yarn" | "npm";
      importAlias: `${string}/*`;
    }) => {
      await $`npx create-next-app@latest ${projectDir} --${language} --no-tailwind --no-eslint --src-dir --no-experimental-app --import-alias ${importAlias}`;
    },
  },
];
