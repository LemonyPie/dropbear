import { isNumberToken, pop } from './parse.utils';
import { Token } from './tokenize';

export const enum ParseTreeNodeType {
  NumericLiteral,
}

export const parenthesize = tokens => {
  return tokens;
};

export class NumericLiteral {
  public readonly type = ParseTreeNodeType.NumericLiteral;

  constructor(
    public readonly value: number,
  ) {
  }
}

export const parse = ( tokens: Token[] ) => {
  const token = pop( tokens );

  if ( isNumberToken( token ) ) {
    return new NumericLiteral( token.value );
  }
};
