export const LETTER = /[a-zA-Z]/;
export const WHITESPACE = /\s+/;
export const NUMBER = /\b[0-9]+$/;
export const OPERATORS = [ '+', '-', '*', '/', '%' ];
export const OPENING_PARENTHESIS = '(';
export const CLOSING_PARENTHESIS = ')';
export const QUOTE = '"';

export const isLetter = ( character: string ): boolean => LETTER.test( character );
export const isWhitespace = ( character: string ): boolean => WHITESPACE.test( character );
export const isNumber = ( character: string ): boolean => NUMBER.test( character );
export const isOperator = ( character: string ): boolean => OPERATORS.includes( character );
export const isOpeningParenthesis = ( character: string ): boolean => character === OPENING_PARENTHESIS;
export const isClosingParenthesis = ( character: string ): boolean => character === CLOSING_PARENTHESIS;
export const isParenthesis = ( character: string ): boolean => isOpeningParenthesis( character ) || isClosingParenthesis( character );
export const isQuote = ( character: string ): boolean => character === QUOTE;
