import { isCallExpression, isNumericLiteral, isStringLiteral } from './evaluate.utils';
import { ICallExpression, IParseTreeNodeType } from './parse';
import { environment } from './standard-library';

const last = collection => collection[collection.length - 1];

const apply = ( node: ICallExpression ): string | number => {
  const fn = environment[node.name];
  const values = node.values.map( evaluate );

  if ( typeof fn !== 'function' ) {
    throw new TypeError( `${ node.name } is not a function` );
  }

  return fn( ...values );
};

export const evaluate = ( node: IParseTreeNodeType ): string | number => {
  if ( isCallExpression( node ) ) {
    return apply( node );
  }
  if ( isNumericLiteral( node ) ) {
    return node.value;
  }

  if ( isStringLiteral( node ) ) {
    return node.name;
  }
};

