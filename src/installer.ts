import { logger } from "~/utils/logger.js";
import { type Recipe } from "~/recipes/index.js";

interface ProjectOptions {
  projectDir: string;
  language: "typescript" | "javascript";
  install: boolean;
  importAlias: `${string}/*`;
  recipes: Recipe[];
}

export type { ProjectOptions };

export const create = async (options: ProjectOptions) => {
  options.recipes.forEach((recipe) => {
    recipe.steps.forEach(async (step) => {
      logger.info(step.label);
      logger.info(step.description);
      await step.run(options);
    });
  });
};
