import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const TITLE_TEXT = `   ___ ___ ___   _ _____ ___   _____ _______     _   ___ ___ 
  / __| _ \\ __| /_\\_   _| __| |_   _|__ / __|   /_\\ | _ \\ _ \\
 | (__|   / _| / _ \\| | | _|    | |  |_ \\ _|   / _ \\|  _/  _/
  \\___|_|_\\___/_/ \\_\\_| |___|   |_| |___/___| /_/ \\_\\_| |_|
`;
export const DEFAULT_APP_NAME = "my-app";
export const CLI_NAME = "create-t3extended-app";
