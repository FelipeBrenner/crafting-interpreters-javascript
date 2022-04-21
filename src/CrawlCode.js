import { Token } from "./Token.js";
import { reservedWords, TokenEnum } from "./TokenEnum.js";

export class CrawlCode {
  constructor(code) {
    this.tokens = [];
    this.currentCharIndex = 0;
    this.startCharIndex = 0;
    this.line = 1;
    this.code = code;
  }

  async crawl() {
    while (!this.isEndOfExpression()) {
      this.startCharIndex = this.currentCharIndex;
      this.scanForTokens();
    }

    return this.tokens;
  }

  scanForTokens() {
    const currentChar = this.nextCharacter();
    switch (currentChar) {
      case TokenEnum.OPEN_PAREN.value:
        this.addToken(TokenEnum.OPEN_PAREN);
        break;
      case TokenEnum.CLOSE_PAREN.value:
        this.addToken(TokenEnum.CLOSE_PAREN);
        break;
      case TokenEnum.MINUS.value:
        this.addToken(TokenEnum.MINUS);
        break;
      case TokenEnum.PLUS.value:
        this.addToken(TokenEnum.PLUS);
        break;
      case TokenEnum.MULTIPLY.value:
        this.addToken(TokenEnum.MULTIPLY);
        break;
      case TokenEnum.DIVIDE.value:
        this.addToken(TokenEnum.DIVIDE);
        break;
      case TokenEnum.EXPONENT.value:
        this.addToken(TokenEnum.EXPONENT);
        break;
      case TokenEnum.ASSIGN.value:
        this.addToken(
          this.matchNext(TokenEnum.EQUAL.expected)
            ? TokenEnum.EQUAL
            : TokenEnum.ASSIGN
        );
        break;
      case TokenEnum.NOT.value:
        this.addToken(
          this.matchNext(TokenEnum.NOT_EQUAL.expected)
            ? TokenEnum.NOT_EQUAL
            : TokenEnum.NOT
        );
        break;
      case TokenEnum.LESS_THAN.value:
        this.addToken(
          this.matchNext(TokenEnum.LESS_THAN_OR_EQUAL.expected)
            ? TokenEnum.LESS_THAN_OR_EQUAL
            : TokenEnum.LESS_THAN
        );
        break;
      case TokenEnum.GREATER_THAN.value:
        this.addToken(
          this.matchNext(TokenEnum.GREATER_THAN_OR_EQUAL.expected)
            ? TokenEnum.GREATER_THAN_OR_EQUAL
            : TokenEnum.GREATER_THAN
        );
        break;
      case TokenEnum.STRING_DELIMITER.value:
        this.handleString();
        break;
      case " ":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;
      case "\n":
        this.line++;
        break;
      default:
        if (this.isDigit(currentChar)) {
          this.handleNumber();
        } else if (this.isAlpha(currentChar)) {
          this.handleReservedWords();
        } else {
          console.error(currentChar + " - Unknown token");
        }
        break;
    }

    return this.tokens;
  }

  isDigit(digit) {
    return digit >= "0" && digit <= "9";
  }

  isAlpha(alpha) {
    return (
      (alpha >= "a" && alpha <= "z") ||
      (alpha >= "A" && alpha <= "Z") ||
      alpha === "_"
    );
  }

  handleNumber() {
    while (this.isDigit(this.getCharAtCurrent())) {
      this.nextCharacter();
    }

    if (
      this.getCharAtCurrent() == TokenEnum.FLOAT_DELIMITER.value &&
      this.isDigit(this.matchNext("[0-9]"))
    ) {
      this.nextCharacter();
      while (this.isDigit(this.getCharAtCurrent())) {
        this.nextCharacter();
      }
    }

    const value = this.code.substring(
      this.startCharIndex,
      this.currentCharIndex
    );

    this.addToken(TokenEnum.NUMBER, parseFloat(value));
  }

  handleString() {
    while (
      this.getCharAtCurrent() != TokenEnum.STRING_DELIMITER.value &&
      !this.isEndOfExpression()
    ) {
      if (this.getCharAtCurrent() == TokenEnum.END_OF_LINE.value) {
        this.line++;
      }
      this.currentCharIndex++;
    }

    if (this.isEndOfExpression()) {
      console.error("String not finished till end of code");
      return;
    }

    this.currentCharIndex++;

    const value = this.code.substring(
      this.startCharIndex + 1,
      this.currentCharIndex - 1
    );
    this.addToken(TokenEnum.STRING, value);
  }

  handleReservedWords() {
    while (this.isAlpha(this.getCharAtCurrent())) {
      this.nextCharacter();
    }

    const text = this.code.slice(this.startCharIndex, this.currentCharIndex);
    let type = reservedWords.find((word) => word.value === text);
    if (!type) type = TokenEnum.VARIABLE;
    this.addToken(type);
  }

  getCharAtCurrent() {
    return this.code[this.currentCharIndex];
  }

  matchRegex(expression) {
    let regExp = new RegExp(expression);
    return regExp.exec(this.getCharAtCurrent()) != null;
  }

  matchNext(expected) {
    if (this.isEndOfExpression() || !this.matchRegex(expected)) {
      return false;
    }

    this.currentCharIndex++;
    return true;
  }

  nextCharacter() {
    return this.code.charAt(this.currentCharIndex++);
  }

  addToken(tokenEnum, value) {
    const text = this.code.substring(
      this.startCharIndex,
      this.currentCharIndex
    );
    const lineIndex = this.line - 1;
    if (!this.tokens[lineIndex]) {
      this.tokens[lineIndex] = [];
    }
    this.tokens[lineIndex].push(new Token(tokenEnum, text, this.line, value));
  }

  isEndOfExpression() {
    return this.currentCharIndex >= this.code.length;
  }
}
