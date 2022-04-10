import { TokenEnum } from "./TokenEnum.js";
import { TreeExpr } from "./TreeExpr.js";

export class CrawlTokens {
  constructor(tokens) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
  }

  async crawl() {
    return this.equality();
  }

  // Binary expressions

  equality() {
    let expr = this.primary();

    while (this.matchPattern(TokenEnum.NOT_EQUAL, TokenEnum.EQUAL)) {
      const { operator } = this.previousToken();
      const right = this.primary();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  primary() {
    if (this.matchPattern(TokenEnum.NUMBER, TokenEnum.STRING)) {
      const { value } = this.previousToken();
      return new TreeExpr.Literal(value);
    }

    if (this.matchPattern(TokenEnum.OPEN_PAREN)) {
      const expr = this.crawl();
      this.consume(TokenEnum.CLOSE_PAREN, "Expect ')' after expression.");
      return new TreeExpr.Grouping(expr);
    }
  }

  // Auxiliary expressions

  consume(type) {
    if (this.typeCheck(type)) return this.nextToken();
  }

  // Checks if the current token is one of these types
  matchPattern(...types) {
    for (const type of types) {
      if (this.typeCheck(type)) {
        this.nextToken();
        return true;
      }
    }

    return false;
  }

  // Checks if the current token is of this type
  typeCheck(type) {
    if (this.isEndOfExpression()) return false;
    return this.getCurrentToken()?.type === type;
  }

  nextToken() {
    if (!this.isEndOfExpression()) this.currentTokenIndex++;
    return this.previousToken();
  }

  previousToken() {
    return this.tokens[this.currentTokenIndex - 1];
  }

  isEndOfExpression() {
    return this.getCurrentToken()?.type === TokenEnum.END_OF_LINE;
  }

  getCurrentToken() {
    return this.tokens[this.currentTokenIndex];
  }
}
