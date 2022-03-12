export class TokenEnum {
    static OPEN_PAREN = new TokenEnum('(');
    static CLOSE_PAREN = new TokenEnum(')');
    static SUBTRACT = new TokenEnum('-');
    static PLUS = new TokenEnum('+');
    static MULTIPLY = new TokenEnum('*');
    static DIVIDE = new TokenEnum("/");
    static EQUAL = new TokenEnum("=");
    static NEGATION = new TokenEnum("!");
    static LESS_THAN = new TokenEnum("<");
    static GREATER_THAN = new TokenEnum(">");
    
    static COMPARISON = new TokenEnum("=", "=");
    static DIFFERENT = new TokenEnum("!", "=");
    static GREATER_THAN_OR_EQUAL = new TokenEnum(">", "=");
    static LESS_THAN_OR_EQUAL = new TokenEnum("<", "=");

    static END_OF_LINE = new TokenEnum("\n")

    static STRING_DELIMITER = new TokenEnum("'")

    constructor (value, expected) {
        this.value = value;
        this.expected = expected;
    }
}