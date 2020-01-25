import { ITokenInstruction, ITokenNumber, ITokenParenthesis, ITokenString, ITokenType, TokenType } from './tokenize';

export const peek = <T>( array: T[], offset: number = 0 ): T => array[offset];
export const next = <T>( array: T[] ): T => shift( array );
export const shift = <T>( array: T[] ): T => array.shift();
export const pop = <T>( array: T[] ): T => array.pop();

export const isNumberToken = ( token: ITokenType ): token is ITokenNumber => token.type === TokenType.Number;
export const isStringToken = ( token: ITokenType ): token is ITokenString => token.type === TokenType.String;
export const isInstructionToken = ( token: ITokenType ): token is ITokenInstruction => token.type === TokenType.Instruction;
export const isParenthesisToken = ( token: ITokenType ): token is ITokenParenthesis => token.type === TokenType.Parenthesis;
