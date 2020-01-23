import { isLetter, isNumber, isParenthesis, isQuote, isWhitespace } from './tokenize.utils';

export enum TokenType {
  'Parenthesis',
  'Instruction',
  'Number',
  'String'
}

export type ITokenNumber = {
  type: TokenType.Number;
  value: number;
}

export type ITokenParenthesis = {
  type: TokenType.Parenthesis;
  value: string;
}

export type ITokenInstruction = {
  type: TokenType.Instruction;
  value: string;
}

export type ITokenString = {
  type: TokenType.String;
  value: string;
}

export type ITokenType = ITokenNumber | ITokenParenthesis | ITokenInstruction | ITokenString;

// TODO: find a way to get rid of any
// Token cannot implement ITokenType as last is union alias
export class Token {
  constructor(
    public readonly type: any,
    public readonly value: any,
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
