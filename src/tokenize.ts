import { isNumber, isParenthesis, isWhitespace } from './identify.utils';

export enum TokenType {
  'Parenthesis',
  'Number'
}

export type ITokenType =
  {
    type: TokenType.Parenthesis;
    value: string;
  } |
  {
    type: TokenType.Number;
    value: number;
  }

export interface IToken {
  type: TokenType;
  value: string | number;
}


export class Token implements IToken {
  constructor(
    public readonly type,
    public readonly value,
  ) {
  }
}

export const tokenize = ( input: string ): ITokenType[] => {
  const tokens: ITokenType[] = [];
  let cursor = 0;

  while ( cursor < input.length ) {
    const character = input[cursor];

    if ( isWhitespace( character ) ) {
      cursor++;
      continue;
    }

    if ( isParenthesis( character ) ) {
      tokens.push( new Token( TokenType.Parenthesis, character ) );
      cursor++;
      continue;
    }

    if ( isNumber( character ) ) {
      let numberAsSting: string = character;

      while ( isNumber( input[++cursor] ) ) {
        numberAsSting += input[cursor];
      }

      tokens.push( new Token( TokenType.Number, parseInt( numberAsSting, 10 ) ) );
      continue;
    }

    throw new Error( `${ character } is not valid` );
  }

  return tokens;
};
