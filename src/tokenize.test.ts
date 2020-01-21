import { tokenize, TokenType } from './tokenize';

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
    const expectedResult = [
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
} );
