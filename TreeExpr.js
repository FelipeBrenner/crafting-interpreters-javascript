export class TreeExpr {
  static Binary = class extends TreeExpr {
    constructor(left, operator, right) {
      super();
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
  };

  static Unary = class extends TreeExpr {
    constructor(operator, right) {
      super();
      this.operator = operator;
      this.right = right;
    }
  };

  static Literal = class extends TreeExpr {
    constructor(value) {
      super();
      this.value = value;
    }
  };

  static Grouping = class extends TreeExpr {
    constructor(expr) {
      super();
      this.expr = expr;
    }
  };

  accept(visitor) {
    if (this instanceof TreeExpr.Unary) return visitor.visitUnaryTreeExpr(this);
    if (this instanceof TreeExpr.Grouping)
      return visitor.visitGroupingTreeExpr(this);
    if (this instanceof TreeExpr.Literal)
      return visitor.visitLiteralTreeExpr(this);
    if (this instanceof TreeExpr.Binary)
      return visitor.visitBinaryTreeExpr(this);
  }
}