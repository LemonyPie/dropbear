export const LETTER = /[a-zA-Z]/;
export const WHITESPACE = /\s+/;
export const NUMBER = /\b[0-9]+$/;
export const OPENING_PARENTHESIS = '(';
export const CLOSING_PARENTHESIS = ')';
export const QUOTE = '"';

export const isStringType = ( character: unknown ): character is string => typeof character === 'string';
export const isLetter = ( character: unknown ): boolean => isStringType( character ) && LETTER.test( character );
export const isWhitespace = ( character: unknown ): boolean => isStringType( character ) && WHITESPACE.test( character );
export const isNumber = ( character: unknown ): boolean => isStringType( character ) && NUMBER.test( character );
export const isOpeningParenthesis = ( character: unknown ): boolean => character === OPENING_PARENTHESIS;
export const isClosingParenthesis = ( character: unknown ): boolean => character === CLOSING_PARENTHESIS;
export const isParenthesis = ( character: unknown ): boolean => isOpeningParenthesis( character ) || isClosingParenthesis( character );
export const isQuote = ( character: unknown ): boolean => character === QUOTE;
