import { ASTNode } from './parse';
import { environment } from './standard-library';

const last = collection => collection[collection.length - 1];

const apply = ( node ) => {
  const fn = environment[node.name];
  const values = node.values.map( evaluate );

  if ( typeof fn !== 'function' ) {
    throw new TypeError( `${ node.name } is not a function` );
  }

  return fn( ...values );
};

export const evaluate = ( node ) => {
  if ( node.type === ASTNode.CallExpression ) {
    return apply( node );
  }
  if ( node.value ) {
    return node.value;
  }
};

