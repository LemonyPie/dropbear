import { isNumberToken, pop } from './parse.utils';
import { ITokenType } from './tokenize';

export const enum ParseTreeNodeType {
  NumericLiteral,
}

export interface IParseTreeNode {
  type: ParseTreeNodeType;
  value: unknown;
}

export const parenthesize = tokens => {
  return tokens;
};

export class NumericLiteral implements IParseTreeNode {
  public readonly type = ParseTreeNodeType.NumericLiteral;

  constructor(
    public readonly value: number,
  ) {
  }
}

export const parse = ( tokens: ITokenType[] ) => {
  const token = pop( tokens );

  if ( isNumberToken( token ) ) {
    return new NumericLiteral( token.value );
  }
};
