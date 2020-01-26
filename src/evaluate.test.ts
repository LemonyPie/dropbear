import { evaluate } from './evaluate';
import { ASTNode, IParseTreeNodeType } from './parse';

describe( evaluate, () => {
  describe( 'primitive fall back', () => {
    it( 'should fall back to returning a primitive numeric value', () => {
      const expectedValue = 2;
      const ast: IParseTreeNodeType = {
        type: ASTNode.NumericLiteral,
        value: expectedValue,
      };

      expect( evaluate( ast ) ).toBe( expectedValue );
    } );

    it( 'should fall back to returning a primitive string value', () => {
      const expectedValue = 'Hello';
      const ast: IParseTreeNodeType = {
        type: ASTNode.StringLiteral,
        name: expectedValue,
      };

      expect( evaluate( ast ) ).toBe( expectedValue );
    } );
  } );

  describe( 'expression evaluation', () => {
    it( 'should evaluate single expression', () => {
      const expectedValue = 5;
      const ast: IParseTreeNodeType = {
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
      const ast: IParseTreeNodeType = {
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

    it( 'should throw an error if expression is of unknown type', () => {
      const ast: IParseTreeNodeType = {
        type: ASTNode.CallExpression,
        name: 'unknown',
        values: [],
      };

      expect( () => evaluate( ast ) ).toThrow( TypeError );
    } );
  } );

  describe( 'identifiers', () => {
    it( 'should be able to lookup identifiers in the environment', () => {
      const ast: IParseTreeNodeType = {
        type: ASTNode.Identifier,
        name: 'pi',
      };

      expect( evaluate( ast ) ).toBe( Math.PI );
    } );

    it( 'should throw error if identifier is not defined', () => {
      const ast: IParseTreeNodeType = {
        type: ASTNode.Identifier,
        name: 'poop',
      };

      expect( () => evaluate( ast ) ).toThrow( ReferenceError );
    } );

    it( 'should be able to use max to find highest number in a range', () => {
      const ast: IParseTreeNodeType = {
        type: ASTNode.CallExpression,
        name: 'max',
        values: [
          { type: ASTNode.NumericLiteral, value: 2 },
          { type: ASTNode.NumericLiteral, value: 8 },
          { type: ASTNode.NumericLiteral, value: 10 },
          { type: ASTNode.NumericLiteral, value: 3 },
        ],
      };

      expect( evaluate( ast ) ).toBe( 10 );
    } );
  } );


} );
