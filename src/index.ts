import { renderTitle } from "~/utils/renderTitle.js";
import { logger } from "~/utils/logger.js";
import { runCli } from "~/cli/index.js";
import { create } from "~/installer.js";

const main = async () => {
  renderTitle();
  logger.info("node -v:", process.version);

  const options = await runCli();

  await create(options);

  logger.success("Installation complete! 🎉");
  logger.success("Godspeed! 🚀");
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
