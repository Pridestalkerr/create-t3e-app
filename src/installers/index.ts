export const availablePackages = ["env"] as const;
export type AvailablePackages = typeof availablePackages[number];

export interface InstallerOptions {
  projectDir: string;
  install: boolean;
  projectName: string;
}

export type Installer = (opts: InstallerOptions) => void;

export const buildPkgInstallerMap = (packages: AvailablePackages[]) => ({
  env: {
    inUse: false,
    installer: () => {},
  },
});
