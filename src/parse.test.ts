import { ASTNode, parse } from './parse';
import { ITokenType, TokenType } from './tokenize';

describe( parse, () => {
  it( 'should parse NumericLiteral', () => {
    const tokens: ITokenType[] = [ { type: TokenType.Number, value: 220 } ];
    const expectedAST = { type: ASTNode.NumericLiteral, value: 220 };

    expect( parse( tokens ) ).toEqual( expectedAST );
  } );

  it( 'should parse StringLiteral', () => {
    const tokens: ITokenType[] = [ { type: TokenType.String, value: 'str' } ];
    const expectedAST = { type: ASTNode.StringLiteral, name: 'str' };

    expect( parse( tokens ) ).toEqual( expectedAST );
  } );

  it( 'should parse Identifier', () => {
    const tokens: ITokenType[] = [ { type: TokenType.Instruction, value: 'do' } ];
    const expectedAST = { type: ASTNode.Identifier, name: 'do' };

    expect( parse( tokens ) ).toEqual( expectedAST );
  } );

  it( 'should parse expressions with parenthesis', () => {
    const tokens: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Instruction,
        value: 'add',
      },
      {
        type: TokenType.Number,
        value: 2,
      },
      {
        type: TokenType.Number,
        value: 3,
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];
    const expectedAST = {
      type: ASTNode.CallExpression,
      name: 'add',
      values: [
        {
          type: ASTNode.NumericLiteral,
          value: 2,
        },
        {
          type: ASTNode.NumericLiteral,
          value: 3,
        },
      ],
    };

    expect( parse( tokens ) ).toEqual( expectedAST );
  } );

  it( 'should parse nested expressions', () => {
    const tokens: ITokenType[] = [
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Instruction,
        value: 'add',
      },
      {
        type: TokenType.Number,
        value: 100,
      },
      {
        type: TokenType.Parenthesis,
        value: '(',
      },
      {
        type: TokenType.Instruction,
        value: 'multiply',
      },
      {
        type: TokenType.Number,
        value: 2,
      },
      {
        type: TokenType.Number,
        value: 4,
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
      {
        type: TokenType.Parenthesis,
        value: ')',
      },
    ];
    const expectedAST = {
      type: ASTNode.CallExpression,
      name: 'add',
      values: [
        {
          type: ASTNode.NumericLiteral,
          value: 100,
        },
        {
          type: ASTNode.CallExpression,
          name: 'multiply',
          values: [
            {
              type: ASTNode.NumericLiteral,
              value: 2,
            },
            {
              type: ASTNode.NumericLiteral,
              value: 4,
            },
          ],
        },
      ],
    };

    expect( parse( tokens ) ).toEqual( expectedAST );
  } );
} );
