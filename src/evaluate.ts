import { isCallExpression, isIdentifier, isNumericLiteral, isStringLiteral } from './evaluate.utils';
import { ICallExpression, IIdentifier, IParseTreeNodeType } from './parse';
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

const getIdentifier = ( node: IIdentifier ) => {
  if ( environment[node.name] ) return environment[node.name];

  throw ReferenceError( `${ node.name } is not defined` );
};

const define = node => {
  return environment[node.identifier.name] = node.assignment.value;
};

export const evaluate = ( node: IParseTreeNodeType ): string | number => {
  console.log( node );
  // @ts-ignore
  if ( node.type === 'VariableDeclaration' ) {
    // @ts-ignore
    return define( node );
  }
  if ( isCallExpression( node ) ) {
    return apply( node );
  }
  if ( isNumericLiteral( node ) ) {
    return node.value;
  }

  if ( isStringLiteral( node ) ) {
    return node.name;
  }

  if ( isIdentifier( node ) ) {
    return getIdentifier( node );
  }
};

