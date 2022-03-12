import { Token } from "./Token.js";
import { TokenEnum } from "./TokenEnum.js";

export class CrawlCode {
    constructor (code) {
        this.tokens = [];
        this.currentCharIndex = 0;
        this.startIndex = 0;
        this.line = 1;
        this.code = code;
    }

    crawl() {
        return new Promise((resolve) => {
            while(!this.isEndOfExpression()) {    
                this.startIndex = this.currentCharIndex;
                this.scanForTokens()
            }
            resolve();
        })
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
            case TokenEnum.SUBTRACT.value:
                this.addToken(TokenEnum.SUBTRACT);
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
            case TokenEnum.EQUAL.value:
                this.addToken(this.matchNext(TokenEnum.COMPARISON.expected)
                     ? TokenEnum.COMPARISON : TokenEnum.EQUAL );
                break;
            case TokenEnum.NEGATION.value:
                this.addToken(this.matchNext(TokenEnum.DIFFERENT.expected)
                     ? TokenEnum.DIFFERENT : TokenEnum.NEGATION );
                break;
            case TokenEnum.LESS_THAN.value:
                this.addToken(this.matchNext(TokenEnum.LESS_THAN_OR_EQUAL.expected)
                     ? TokenEnum.LESS_THAN_OR_EQUAL : TokenEnum.LESS_THAN );
                break;
            case TokenEnum.GREATER_THAN.value:
                this.addToken(this.matchNext(TokenEnum.GREATER_THAN_OR_EQUAL.expected)
                     ? TokenEnum.GREATER_THAN_OR_EQUAL : TokenEnum.GREATER_THAN );
                break;
            case TokenEnum.STRING_DELIMITER.value:
                this.handleString();
                break;
            case ' ':
            case '\r':
            case '\t':
                // Ignore whitespace.
                break;
            case '\n': 
                this.line++;
                break;
            default:
                console.error("Unknown token");
                break;
        }

        return this.tokens;
    }

    handleString() {
        while (this.getCharAtCurrent() != TokenEnum.STRING_DELIMITER.value && !this.isEndOfExpression()) {
            if (this.getCharAtCurrent() == TokenEnum.END_OF_LINE.value) {
                this.line++;
            };
            this.currentCharIndex++;
        }
    
        if (this.isEndOfExpression()) {
            console.error("string not finished till end of code")
            return;
        }

        this.currentCharIndex++;

        const value = this.code.substring(this.startIndex + 1, this.currentCharIndex - 1);
        this.addToken(TokenEnum.STRING_DELIMITER, value);
    }

    getCharAtCurrent() {
        return this.code[this.currentCharIndex];
    }

    matchNext(expected) {
        if (this.isEndOfExpression() || this.code.charAt(this.currentCharIndex) != expected) {
            return false;
        }

        this.currentCharIndex++;
        return true;
    }

    nextCharacter() {
        return this.code.charAt(this.currentCharIndex++);
        
    }

    addToken(tokenEnum, value) {
        const text = this.code.substring(this.startIndex, this.currentCharIndex);
        this.tokens.push(new Token(tokenEnum, text, this.line, value));
    }


    isEndOfExpression() {
        return this.currentCharIndex >= this.code.length;
    }

}