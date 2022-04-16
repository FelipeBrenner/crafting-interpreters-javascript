import { CrawlCode } from "./CrawlCode.js";
import { CrawlTokens } from "./CrawlTokens.js";
import { EvaluateTree } from "./EvaluateTree.js";
import { TreePrinter } from "./TreePrinter.js";

const testExpression = "(2 + 1) > 2 == !true";

async function main() {
  console.log("Expression: " + testExpression);
  const crawlCode = new CrawlCode(testExpression);
  const tokens = await crawlCode.crawl();
  console.log("Tokens:");
  console.log(tokens);

  const crawlTokens = new CrawlTokens(tokens);
  const tree = await crawlTokens.crawl();

  console.log("Tree Object:");
  console.log(tree);
  console.log("AST Tree: " + new TreePrinter(tree).print());

  const evaluator = new EvaluateTree(tree);
  console.log(evaluator.init());

}

main();
