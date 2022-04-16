export class TokenEnum {
  // Literals
  static STRING = new TokenEnum("STRING");
  static NUMBER = new TokenEnum("NUMBER");
  static STRING_DELIMITER = new TokenEnum("'");
  static FLOAT_DELIMITER = new TokenEnum(".");
  static FALSE = new TokenEnum("false");
  static TRUE = new TokenEnum("true");

  // Parentheses
  static OPEN_PAREN = new TokenEnum("(");
  static CLOSE_PAREN = new TokenEnum(")");

  // Unary expressions
  static NOT = new TokenEnum("!");
  static MINUS = new TokenEnum("-");

  // Binary expressions
  static EXPONENT = new TokenEnum("^");
  static MULTIPLY = new TokenEnum("*");
  static DIVIDE = new TokenEnum("/");
  static PLUS = new TokenEnum("+");
  static ASSIGN = new TokenEnum("=");
  static LESS_THAN = new TokenEnum("<");
  static GREATER_THAN = new TokenEnum(">");
  static EQUAL = new TokenEnum("=", "=");
  static NOT_EQUAL = new TokenEnum("!", "=");
  static GREATER_THAN_OR_EQUAL = new TokenEnum(">", "=");
  static LESS_THAN_OR_EQUAL = new TokenEnum("<", "=");

  // Reserved words
  static INPUT = new TokenEnum("input");
  static OUTPUT = new TokenEnum("output");
  static IF = new TokenEnum("if");
  static MAX = new TokenEnum("max");
  static MIN = new TokenEnum("min");
  static AVG = new TokenEnum("avg");
  static SUM = new TokenEnum("sum");

  static VARIABLE = new TokenEnum("VARIABLE");

  static AND = new TokenEnum("and");
  static OR = new TokenEnum("or");
  static XOR = new TokenEnum("xor");

  static END_OF_LINE = new TokenEnum("\n");

  constructor(value, expected) {
    this.value = value;
    this.expected = expected;
    this.final = value + (!!expected ? expected : "");
  }
}
