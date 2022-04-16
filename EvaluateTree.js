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
                return this.unaryEvaluation(operation.operator, operation.right);
        }
    }

    unaryEvaluation(operator, rightHand) {
        const rightHandValue = this.evaluate(rightHand);

        switch(operator) {
            case TokenEnum.NOT.value:
                return !rightHandValue;
            case TokenEnum.MINUS.value:
                return -rightHandValue;
            default:
                throw new Error("Operation could not be parsed.");
        }
    }


}