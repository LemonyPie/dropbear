import { evaluate } from './evaluate';
import { ASTNode } from './parse';

describe( evaluate, () => {
  it( 'should fall back to returning a primitive numeric value', () => {
    const expectedValue = 2;
    const ast = {
      type: ASTNode.NumericLiteral,
      value: expectedValue,
    };

    expect( evaluate( ast ) ).toBe( expectedValue );
  } );

  it( 'should fall back to returning a primitive string value', () => {
    const expectedValue = 'Hello';
    const ast = {
      type: ASTNode.StringLiteral,
      value: expectedValue,
    };

    expect( evaluate( ast ) ).toBe( expectedValue );
  } );

  it( 'should evaluate single expression', () => {
    const expectedValue = 5;
    const ast = {
      type: ASTNode.CallExpression,
      name: 'add',
      values: [
        { type: ASTNode.NumericLiteral, value: 2 },
        { type: ASTNode.NumericLiteral, value: 3 },
      ],
    };

    expect( evaluate( ast ) ).toBe( expectedValue );
  } );

  it( 'should evaluate nested expressions', () => {
    const expectedValue = 6;
    const ast = {
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
        {
          type: ASTNode.CallExpression,
          name: 'subtract',
          values: [
            {
              type: ASTNode.NumericLiteral,
              value: 5,
            },
            {
              type: ASTNode.NumericLiteral,
              value: 4,
            },
          ],
        },
      ],
    };
    expect( evaluate( ast ) ).toBe( expectedValue );
  } );
} );
