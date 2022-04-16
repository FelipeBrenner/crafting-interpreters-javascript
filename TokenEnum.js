export class TokenEnum {
  // Literals
  static STRING = new TokenEnum("STRING");
  static NUMBER = new TokenEnum("NUMBER");
  static STRING_DELIMITER = new TokenEnum("'");
  static FLOAT_DELIMITER = new TokenEnum(".");
  static FALSE = new TokenEnum("false");
  static TRUE = new TokenEnum("true");

  // Expression
  static OPEN_PAREN = new TokenEnum("(");
  static CLOSE_PAREN = new TokenEnum(")");

  // Unary expressions
  static NOT = new TokenEnum("!");
  static SUBTRACT = new TokenEnum("-");

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

  static AND = new TokenEnum("and");
  static OR = new TokenEnum("or");
  static XOR = new TokenEnum("xor");

  static END_OF_LINE = new TokenEnum("\n");

  constructor(value, expected) {
    this.value = value;
    this.expected = expected;
  }
}
