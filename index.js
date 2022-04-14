import { CrawlCode } from "./CrawlCode.js";
import { CrawlTokens } from "./CrawlTokens.js";
import { TreePrinter } from "./TreePrinter.js";

const testExpression = "2^3 + 4 > -3 * 1";

async function main() {
  console.log("Expression: " + testExpression);
  const crawlCode = new CrawlCode(testExpression);
  const tokens = await crawlCode.crawl();
  console.log("Tokens:");
  console.log(tokens);

  const crawlTokens = new CrawlTokens(tokens);
  const tree = await crawlTokens.crawl();

  console.log("Tree Oject:");
  console.log(tree);
  console.log("AST Tree: " + new TreePrinter(tree).print());
}

main();
