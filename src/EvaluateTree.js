import { TokenEnum } from "./TokenEnum.js";
import { TreeExpr } from "./TreeExpr.js";
import { methodMap } from "./MethodMap.js";

export class EvaluateTree {
  constructor(treesExpr) {
    this.state = new Map();
    this.trees = treesExpr;
  }

  init() {
    let lastLine;
    for (const tree of this.trees) {
      lastLine = this.evaluate(tree);
    }
    return lastLine;
  }

  evaluate(operation) {
    switch (true) {
      case operation instanceof TreeExpr.Method:
        return this.methodEvaluation(operation);
      case operation instanceof TreeExpr.Variable:
        if (!this.state.has(operation.value)) {
          throw new Error("Variable does not exist on this scope.");
        }
        return this.state.get(operation.value);
      case operation instanceof TreeExpr.Literal:
        return operation.value;
      case operation instanceof TreeExpr.Unary:
        return this.unaryEvaluation(operation);
      case operation instanceof TreeExpr.Assign:
        return this.assignEvaluation(operation);
      case operation instanceof TreeExpr.Binary:
        return this.binaryEvaluation(operation);
      case operation instanceof TreeExpr.Grouping:
        return this.groupingEvaluation(operation);
    }
  }

  methodEvaluation(operation) {
    const params = operation.params.map((param) => this.evaluate(param));
    const method = methodMap.get(operation.operator);
    return method(params);
  }

  assignEvaluation(operation) {
    const rightHandValue = this.evaluate(operation.right);
    this.state.set(operation.left.value, rightHandValue);
  }

  groupingEvaluation(operation) {
    return this.evaluate(operation.expr);
  }

  binaryEvaluation(operation) {
    const leftHandValue = this.evaluate(operation.left);
    const rightHandValue = this.evaluate(operation.right);

    switch (operation.operator) {
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
      case TokenEnum.EXPONENT.final:
        return Math.pow(leftHandValue, rightHandValue);
      case TokenEnum.MULTIPLY.final:
        return leftHandValue * rightHandValue;
      case TokenEnum.DIVIDE.final:
        return leftHandValue / rightHandValue;
      case TokenEnum.PLUS.final:
        return leftHandValue + rightHandValue;
      case TokenEnum.MINUS.final:
        return leftHandValue - rightHandValue;
      case TokenEnum.AND.final:
        return leftHandValue && rightHandValue;
      case TokenEnum.OR.final:
        return leftHandValue || rightHandValue;
      case TokenEnum.XOR.final:
        return (leftHandValue ^ rightHandValue) === 1;
    }
  }

  unaryEvaluation(operation) {
    const rightHandValue = this.evaluate(operation.right);
    switch (operation.operator) {
      case TokenEnum.NOT.final:
        return !rightHandValue;
      case TokenEnum.MINUS.final:
        return -rightHandValue;
      default:
        throw new Error("Operation could not be parsed.");
    }
  }
}
