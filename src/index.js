import fs from "fs";
import { CrawlCode } from "./CrawlCode.js";
import { CrawlTokens } from "./CrawlTokens.js";
import { EvaluateTree } from "./EvaluateTree.js";
import { TreePrinter } from "./TreePrinter.js";

async function main() {
  let fileList = fs.readdirSync("scripts");

  for (const index in fileList) {
    const code = fs.readFileSync("scripts/" + fileList[index], {
      encoding: "utf8",
    });

    const crawlCode = new CrawlCode(code);
    const tokens = await crawlCode.crawl();
    // console.log("Tokens: \n" + tokens);

    const trees = [];
    for (const token of tokens) {
      const crawlTokens = new CrawlTokens(token);
      const tree = await crawlTokens.crawl();
      trees.push(tree);
    }
    // console.log("Tree Object: \n" + trees);
    console.log("AST Tree:");
    for (const tree of trees) {
      console.log(new TreePrinter(tree).print());
    }

    console.log("Code: \n" + code);
    const evaluator = new EvaluateTree(trees);
    console.log(evaluator.init());
  }
}

main();
