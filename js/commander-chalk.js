const program = require("commander")
const chalk = require("chalk")

console.log("---------------------------------------");
console.log(chalk.cyan("         * 欢迎使用XXXX工具 *          "));
console.log("---------------------------------------");

program
  .version(require("./package").version)
  .usage("<command> [options]")
  .command('init', '初始化')
  .command('version', '版本号')
  .option('-a, --abort', '初始化')
  .option('-b, --body', '初始化')
  .parse(process.argv);
