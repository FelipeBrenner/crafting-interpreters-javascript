import { CrawlCode } from "./CrawlCode.js";
import { CrawlTokens } from "./CrawlTokens.js";
import { EvaluateTree } from "./EvaluateTree.js";
import { TreePrinter } from "./TreePrinter.js";

const testExpression = "a = 3\nb = a < 4\n!b\nc = a - 2\nc";

async function main() {
  const crawlCode = new CrawlCode(testExpression);
  const tokens = await crawlCode.crawl();
  console.log("Tokens: \n" + tokens);

  const trees = [];
  for (const token of tokens) {
    const crawlTokens = new CrawlTokens(token);
    const tree = await crawlTokens.crawl();
    trees.push(tree);
  }
  console.log("Tree Object: \n" + trees);
  for (const tree of trees) {
    console.log("AST Tree: " + new TreePrinter(tree).print());
  }

  console.log("Expression: \n" + testExpression);
  const evaluator = new EvaluateTree(trees);
  console.log(evaluator.init());
}

main();
