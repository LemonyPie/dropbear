import { ITokenType, tokenize, TokenType } from './tokenize';

describe( tokenize, () => {
  it( 'should return array of tokens', () => {
    expect( Array.isArray( tokenize( '' ) ) ).toBe( true );
  } );

  it( 'should throw error for invalid characters', () => {
    const input = '§';
    expect( () => tokenize( input ) ).toThrow( Error );
  } );

  it( 'should ignore whitespaces', () => {
    const input = '         ';
    const result = tokenize( input );
    expect( result.length ).toBe( 0 );
  } );

  it( 'should recognize parenthesis', () => {
    const input = '()';
    const result = tokenize( input );
    const expectedResult: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];

    expect( result ).toEqual( expectedResult );
  } );

  it( 'should tokenize single digit as number', () => {
    const input = '(1 2)';
    const result = tokenize( input );
    const expectedResult: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Number,
        value: 1,
      },
      {
        type: TokenType.Number,
        value: 2,
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];

    expect( result ).toEqual( expectedResult );
  } );

  it( 'should tokenize multi-digit number', () => {
    const input = '(123 321)';
    const result = tokenize( input );
    const expectedResult: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Number,
        value: 123,
      },
      {
        type: TokenType.Number,
        value: 321,
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];

    expect( result ).toEqual( expectedResult );
  } );

  it( 'should differentiate numbers and letters (operation instructions)', () => {
    const input = '(200 add)';
    const result = tokenize( input );
    const expectedResult: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Number,
        value: 200,
      },
      {
        type: TokenType.Instruction,
        value: 'add',
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];

    expect( result ).toEqual( expectedResult );
  } );

  it( 'should handle strings', () => {
    const input = '(0 "string value")';
    const result = tokenize( input );
    const expectedResult: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Number,
        value: 0,
      },
      {
        type: TokenType.String,
        value: 'string value',
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];

    expect( result ).toEqual( expectedResult );
  } );
} );
