import next from "~/recipes/next/_recipe.js";
import eslint from "~/recipes/eslint/_recipe.js";

export { next, eslint };

type Step = {
  id?: string;
  label?: string;
  description?: string;
  run: (options: any) => Promise<void>;
};

type Recipe = {
  packageJson: {
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  arch: Record<string, string>;
  steps: Step[];
};

export { Recipe, Step };
