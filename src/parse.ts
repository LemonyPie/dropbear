import { isInstructionToken, isNumberToken, isStringToken, next, peek } from './parse.utils';
import { ITokenType } from './tokenize';
import { isClosingParenthesis, isOpeningParenthesis } from './tokenize.utils';

export const enum ASTNode {
  NumericLiteral,
  StringLiteral,
  Identifier,
  CallExpression
}

export interface IParseTreeNode {
  type: ASTNode;
}

export class NumericLiteral implements IParseTreeNode {
  public readonly type = ASTNode.NumericLiteral;

  constructor(
    public readonly value: number,
  ) {
  }
}

export class StringLiteral implements IParseTreeNode {
  public readonly type = ASTNode.StringLiteral;

  constructor(
    public readonly name: string,
  ) {
  }
}

export class Identifier implements IParseTreeNode {
  public readonly type = ASTNode.Identifier;

  constructor(
    public readonly name: string,
  ) {
  }
}

export class CallExpression implements IParseTreeNode {
  public readonly type = ASTNode.CallExpression;

  constructor(
    public readonly name: string,
    public readonly values: IParseTreeNode[],
  ) {
  }

}

export const parenthesize = ( tokens: ITokenType[] ): ITokenType | ITokenType[] => {
  const token = next( tokens );
  if ( isOpeningParenthesis( token.value ) ) {
    const expression = [];
    while ( !isClosingParenthesis( peek( tokens ).value ) ) {
      expression.push(
        parenthesize( tokens ),
      );
    }

    next( tokens );
    return expression;
  }

  return token;
};


export const parse = ( inputTokens: ITokenType[] | ITokenType ): IParseTreeNode => {
  let token;

  if ( Array.isArray( inputTokens ) ) {
    if ( isInstructionToken( peek( inputTokens ) ) ) {
      const [ name, ...rest ] = inputTokens;
      if ( isInstructionToken( name ) )
        return new CallExpression(
          name.value,
          rest.map( parse ),
        );
    }

    token = inputTokens[0];
  } else {
    token = inputTokens;
  }

  if ( isNumberToken( token ) ) {
    return new NumericLiteral( token.value );
  }

  if ( isStringToken( token ) ) {
    return new StringLiteral( token.value );
  }

  if ( isInstructionToken( token ) ) {
    return new Identifier( token.value );
  }
};
