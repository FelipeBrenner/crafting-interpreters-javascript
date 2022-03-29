export class TokenEnum {
    static OPEN_PAREN = new TokenEnum('(');
    static CLOSE_PAREN = new TokenEnum(')');
    static SUBTRACT = new TokenEnum('-');
    static PLUS = new TokenEnum('+');
    static MULTIPLY = new TokenEnum('*');
    static DIVIDE = new TokenEnum("/");
    static ASSIGN = new TokenEnum("=");
    static NOT = new TokenEnum("!");
    static LESS_THAN = new TokenEnum("<");
    static GREATER_THAN = new TokenEnum(">");
    
    static EQUALS = new TokenEnum("=", "=");
    static NOT_EQUALS = new TokenEnum("!", "=");
    static GREATER_THAN_OR_EQUAL = new TokenEnum(">", "=");
    static LESS_THAN_OR_EQUAL = new TokenEnum("<", "=");

  static EQUAL = new TokenEnum("=", "=");
  static NOT_EQUAL = new TokenEnum("!", "=");
  static GREATER_THAN_OR_EQUAL = new TokenEnum(">", "=");
  static LESS_THAN_OR_EQUAL = new TokenEnum("<", "=");

  static END_OF_LINE = new TokenEnum("\n");

  static STRING_DELIMITER = new TokenEnum("'");
  static FLOAT_DELIMITER = new TokenEnum(".");
  static NUMBER = new TokenEnum("NUMBER");

  constructor(value, expected) {
    this.value = value;
    this.expected = expected;
  }
}
