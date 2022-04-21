import chalk from "chalk";
import fs from "fs";
import { CrawlCode } from "./CrawlCode.js";
import { CrawlTokens } from "./CrawlTokens.js";
import { EvaluateTree } from "./EvaluateTree.js";
import { TreePrinter } from "./TreePrinter.js";

async function main() {
  let fileList = fs.readdirSync("scripts");

  for (const index in fileList) {
    const startExecution = new Date();
    console.log(chalk.bgCyan.black(`running ${fileList[index]}`));
    const code = fs.readFileSync("scripts/" + fileList[index], {
      encoding: "utf8",
    });

    console.log(chalk.bgCyan.black("\nCode:"));
    console.log(code);
    const crawlCode = new CrawlCode(code);
    const tokens = await crawlCode.crawl();

    const trees = [];

    // console.log(chalk.bgCyan.black("\nTokens:"));
    // console.log(tokens);

    for (const token of tokens) {
      const crawlTokens = new CrawlTokens(token);
      const tree = await crawlTokens.crawl();
      trees.push(tree);
    }

    // console.log(chalk.bgCyan.black("\nTree Object:"));
    // console.log(trees);

    console.log(chalk.bgCyan.black("\nAST Tree:"));
    for (const tree of trees) {
      console.log(new TreePrinter(tree).print());
    }
    console.log(chalk.bgCyan.black("\nEvaluation:"));
    const evaluator = new EvaluateTree(trees);
    evaluator.init();
    const endExecution = new Date();
    console.log(
      chalk.bgRed.black.underline(
        `\nend of execution ${fileList[index]} in ${
          endExecution.getTime() - startExecution.getTime()
        }ms`
      )
    );

    console.log(chalk.cyan("------------------------------------"));
  }
}

main();
