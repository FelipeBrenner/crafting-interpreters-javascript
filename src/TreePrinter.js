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
    if (expr.value === false) return "false";
    if (!expr.value) return "null";
    return expr.value.toString();
  }

  visitUnaryTreeExpr(expr) {
    return this.parenthesise(expr.operator, expr.right);
  }

  visitMethodTreeExpr(expr) {
    return this.parenthesise(expr.operator, ...expr.params);
  }

  parenthesise(name, ...exprs) {
    const expressionData = exprs.map((expr) => expr.accept(this)).join(" ");
    return `(${name} ${expressionData})`;
  }
}
