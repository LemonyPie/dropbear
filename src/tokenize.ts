import { isParenthesis, isWhitespace } from './identify.utils';

export enum TokenType {
  'Parenthesis',
}

export interface IToken {
  type: TokenType,
  value: string,
}

export class Token implements IToken {
  constructor(
    public readonly type,
    public readonly value,
  ) {
  }
}

export const tokenize = ( input: string ): IToken[] => {
  const tokens: IToken[] = [];

  for ( let cursor = 0; cursor < input.length; cursor++ ) {
    const character = input[cursor];

    if ( isWhitespace( character ) ) {
      continue;
    }

    if ( isParenthesis( character ) ) {
      tokens.push( new Token( TokenType.Parenthesis, character ) );
      continue;
    }

    throw new Error( `${ character } is not valid` );
  }

  return tokens;
};
