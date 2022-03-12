import { CrawlCode } from "./CrawlCode.js";

const testExpression = "5/3!=2'teste'\n4+5";

const crawlCode = new CrawlCode(testExpression);
crawlCode.crawl().then(() => {
    console.log(crawlCode.tokens);
});
