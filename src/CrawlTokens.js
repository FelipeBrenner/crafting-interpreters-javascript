import { methodNames, TokenEnum } from "./TokenEnum.js";
import { TreeExpr } from "./TreeExpr.js";

export class CrawlTokens {
  constructor(tokens) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
  }

  async crawl() {
    return this.expression();
  }

  expression() {
    return this.assign();
  }

  // Binary expressions

  assign() {
    let expr = this.logical();

    while (this.matchPattern(TokenEnum.ASSIGN)) {
      const { operator } = this.previousToken();
      const right = this.logical();
      expr = new TreeExpr.Assign(expr, operator, right);
    }

    return expr;
  }

  logical() {
    let expr = this.equality();

    while (this.matchPattern(TokenEnum.AND, TokenEnum.OR, TokenEnum.XOR)) {
      const { operator } = this.previousToken();
      const right = this.equality();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  equality() {
    let expr = this.comparation();

    while (this.matchPattern(TokenEnum.NOT_EQUAL, TokenEnum.EQUAL)) {
      const { operator } = this.previousToken();
      const right = this.comparation();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  comparation() {
    let expr = this.additionSubtraction();

    while (
      this.matchPattern(
        TokenEnum.GREATER_THAN,
        TokenEnum.GREATER_THAN_OR_EQUAL,
        TokenEnum.LESS_THAN,
        TokenEnum.LESS_THAN_OR_EQUAL
      )
    ) {
      const { operator } = this.previousToken();
      const right = this.additionSubtraction();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  additionSubtraction() {
    let expr = this.multiplicationDivision();

    while (this.matchPattern(TokenEnum.PLUS, TokenEnum.MINUS)) {
      const { operator } = this.previousToken();
      const right = this.multiplicationDivision();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  multiplicationDivision() {
    let expr = this.potentiation();

    while (this.matchPattern(TokenEnum.MULTIPLY, TokenEnum.DIVIDE)) {
      const { operator } = this.previousToken();
      const right = this.potentiation();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  potentiation() {
    let expr = this.unary();

    while (this.matchPattern(TokenEnum.EXPONENT)) {
      const { operator } = this.previousToken();
      const right = this.unary();
      expr = new TreeExpr.Binary(expr, operator, right);
    }

    return expr;
  }

  // Unary expressions

  unary() {
    if (this.matchPattern(TokenEnum.NOT, TokenEnum.MINUS)) {
      const { operator } = this.previousToken();
      const right = this.unary();
      return new TreeExpr.Unary(operator, right);
    }

    return this.literals();
  }

  // Literals

  literals() {
    if (this.matchPattern(TokenEnum.TRUE)) return new TreeExpr.Literal(true);
    if (this.matchPattern(TokenEnum.FALSE)) return new TreeExpr.Literal(false);
    if (this.matchPattern(TokenEnum.NUMBER, TokenEnum.STRING)) {
      const { value } = this.previousToken();
      return new TreeExpr.Literal(value);
    }

    if (this.matchPattern(...methodNames)) {
      const { operator } = this.previousToken();

      let nextParam = this.expression();
      const params = [];

      while (!!nextParam) {
        params.push(nextParam);
        nextParam = this.expression();
      }

      return new TreeExpr.Method(operator, params);
    }

    if (this.matchPattern(TokenEnum.VARIABLE)) {
      const { operator } = this.previousToken();
      return new TreeExpr.Variable(operator);
    }

    if (this.matchPattern(TokenEnum.OPEN_PAREN)) {
      const expr = this.expression();
      this.consume(TokenEnum.CLOSE_PAREN, "Expect ')' after expression.");
      return new TreeExpr.Grouping(expr);
    }
  }

  // Auxiliary expressions

  consume(type, message) {
    if (this.typeCheck(type)) return this.nextToken();

    throw new SyntaxError(message);
  }

  // Checks if the current token is one of these types, and advance
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
