import { ICallExpression, Identifier, IVisitor, NumericLiteral, StringLiteral } from './parse';
import { traverse } from './traverse';

export const specialForms = {
  define( node: ICallExpression ) {
    console.log( node );
    const [ identifier, assignment ] = node.values;
    return {
      type: 'VariableDeclaration',
      identifier,
      assignment,
    };
  },
};

class Visitor implements IVisitor {
  visitCallExpression( node ) {
    if ( specialForms[node.name] ) {
      return specialForms[node.name]();
    }

    return node;
  }

  public visitIdentifier( node: Identifier ) {
    return node;
  }

  public visitStringLiteral( node: StringLiteral ) {
    return node;
  }

  public visitNumericLiteral( node: NumericLiteral ) {
    return node;
  }
}

export const transform = node => {
  return traverse( node, new Visitor() );
};

