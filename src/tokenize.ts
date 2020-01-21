import { isLetter, isNumber, isParenthesis, isQuote, isWhitespace } from './identify.utils';

export enum TokenType {
  'Parenthesis',
  'Instruction',
  'Number',
  'String'
}

export type ITokenType =
  {
    type: TokenType.Parenthesis | TokenType.Instruction | TokenType.String;
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

    if ( isLetter( character ) ) {
      let instruction: string = character;

      while ( isLetter( input[++cursor] ) ) {
        instruction += input[cursor];
      }

      tokens.push( new Token( TokenType.Instruction, instruction ) );
      continue;
    }

    if ( isQuote( character ) ) {
      let stringLiteral = '';

      while ( !isQuote( input[++cursor] ) ) {
        stringLiteral += input[cursor];
      }

      tokens.push( new Token( TokenType.String, stringLiteral ) );
      cursor++;
      continue;
    }

    throw new Error( `${ character } is not valid` );
  }

  return tokens;
};
