import { CallExpression, Identifier, IVisitor, NumericLiteral, StringLiteral } from './parse';

export class JavaScriptVisitor implements IVisitor {
  public visitCallExpression( node: CallExpression ) {
    return {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: node.name,
      },
      arguments: node.values.map( node => node.visit( this ) ),
    };
  }

  public visitIdentifier( node: Identifier ) {
    return {
      type: 'Identifier',
      name: node.name,
    };
  }

  public visitStringLiteral( node: StringLiteral ) {
    return {
      type: 'Literal',
      value: node.name,
    };
  }

  public visitNumericLiteral( node: NumericLiteral ) {
    return {
      type: 'NumericLiteral',
      value: node.value,
    };
  }
}
