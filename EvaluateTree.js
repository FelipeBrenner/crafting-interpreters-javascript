import { TokenEnum } from "./TokenEnum.js";
import { TreeExpr } from "./TreeExpr.js";

export class EvaluateTree {
    constructor(treeExpr) {
        this.tree = treeExpr;
    }

    init() {
        return this.evaluate(this.tree);
    }
    
    evaluate(operation) {
        switch (true) {
            case operation instanceof TreeExpr.Literal:
                return operation.value;
            case operation instanceof TreeExpr.Unary:
                return this.unaryEvaluation(operation);
            case operation instanceof TreeExpr.Binary:
                return this.binaryEvaluation(operation);
        }
    }

    binaryEvaluation(operation) {
        const leftHandValue = this.evaluate(operation.left);
        const rightHandValue = this.evaluate(operation.right);

        switch(operation.operator) {
            case TokenEnum.LESS_THAN.final:
                return leftHandValue < rightHandValue;
            case TokenEnum.GREATER_THAN.final:
                return leftHandValue > rightHandValue;
            case TokenEnum.EQUAL.final:
                return leftHandValue == rightHandValue;
            case TokenEnum.NOT_EQUAL.final:
                return leftHandValue != rightHandValue;
            case TokenEnum.GREATER_THAN_OR_EQUAL.final:
                return leftHandValue >= rightHandValue;
            case TokenEnum.LESS_THAN_OR_EQUAL.final:
                return leftHandValue <= rightHandValue;
        }
    }

    unaryEvaluation(operation) {
        const rightHandValue = this.evaluate(operation.right);

        switch(operation.operator) {
            case TokenEnum.NOT.final:
                return !rightHandValue;
            case TokenEnum.MINUS.final:
                return -rightHandValue;
            default:
                throw new Error("Operation could not be parsed.");
        }
    }


}