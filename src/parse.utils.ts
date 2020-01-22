import { IToken, ITokenNumber, TokenType } from './tokenize';

export const peek = <T>( array: T[], offset: number = 0 ): T => array[offset];
export const shift = <T>( array: T[] ): T => array.shift();
export const pop = <T>( array: T[] ): T => array.pop();

export const isNumberToken = ( token: IToken ): token is ITokenNumber => token.type === TokenType.Number;
export const isStringToken = ( token: IToken ): boolean => token.type === TokenType.String;
export const isInstructionToken = ( token: IToken ): boolean => token.type === TokenType.Instruction;
export const isParenthesisToken = ( token: IToken ): boolean => token.type === TokenType.Parenthesis;
