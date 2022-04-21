export class TreeExpr {
  static Binary = class extends TreeExpr {
    constructor(left, operator, right) {
      super();
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
  };

  static Assign = class extends this.Binary {
    constructor(left, operator, right) {
      super(left, operator, right);
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

  static Method = class extends TreeExpr {
    constructor(operator, params) {
      super();
      this.operator = operator;
      this.params = params;
    }
  };

  static Variable = class extends this.Literal {
    constructor(value) {
      super(value);
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
    if (this instanceof TreeExpr.Method)
      return visitor.visitMethodTreeExpr(this);
  }
}
