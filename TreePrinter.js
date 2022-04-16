export class TreePrinter {
  constructor(expr) {
    this.expr = expr;
  }

  print() {
    return this.expr.accept(this);
  }

  visitBinaryTreeExpr(expr) {
    return this.parenthesise(expr.operator, expr.left, expr.right);
  }

  visitGroupingTreeExpr(expr) {
    return this.parenthesise("group", expr.expr);
  }

  visitLiteralTreeExpr(expr) {
    if (expr.value === true || expr.value === false) return `(${expr.value})`;
    if (!expr.value) return "null";
    return expr.value.toString();
  }

  visitUnaryTreeExpr(expr) {
    return this.parenthesise(expr.operator, expr.right);
  }

  parenthesise(name, ...exprs) {
    const expressionData = exprs.map((expr) => expr.accept(this)).join(" ");
    return `(${name}${expressionData})`;
  }
}
