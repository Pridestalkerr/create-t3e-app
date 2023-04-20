import path from "path";
import { getUserPkgManager } from "~/utils/getUserPkgManager.js";
import { scaffoldProject } from "./scaffoldProject.js";

interface CreateProjectOptions {
  projectName: string;
  addons: any;
  install: boolean;
  importAlias: string;
}

export const createProject = async ({
  projectName,
  addons,
  install,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.join(process.cwd(), projectName);

  await scaffoldProject({ projectDir, projectName, install });

  return projectDir;
};
