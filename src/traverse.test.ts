import {
  ASTNode,
  CallExpression,
  Identifier,
  IParseTreeNodeType,
  IVisitableParseTreeNodeType,
  IVisitor,
  NumericLiteral,
  StringLiteral,
} from './parse';
import { traverse } from './traverse';

describe( traverse, () => {
  it( 'should be able to traverse down the tree and change expression math operators', () => {
    const ast: IVisitableParseTreeNodeType = new CallExpression( 'add', [ new NumericLiteral( 12 ), new NumericLiteral( 6 ) ] );

    const expectedAST = {
      type: ASTNode.CallExpression,
      name: 'subtract',
      values: [
        { type: ASTNode.NumericLiteral, value: 12 },
        { type: ASTNode.NumericLiteral, value: 6 },
      ],
    };

    class Visitor implements Partial<IVisitor> {
      visitCallExpression( node ) {
        return {
          ...node,
          name: 'subtract',
          values: node.values.map( node => node.visit( this ) ),
        };
      }

      visitNumericLiteral( node ) {
        return node;
      }
    }

    expect( traverse( ast, new Visitor() as IVisitor ) ).toEqual( expectedAST );
  } );

  it( 'should be able to change terminal nodes by doubling them', () => {
    const ast = new CallExpression( 'add', [ new NumericLiteral( 2 ), new NumericLiteral( 3 ) ] );

    const expectedAST: IParseTreeNodeType = {
      type: ASTNode.CallExpression,
      name: 'add',
      values: [
        { type: ASTNode.NumericLiteral, value: 4 },
        { type: ASTNode.NumericLiteral, value: 6 },
      ],
    };

    class Visitor implements Partial<IVisitor> {
      visitCallExpression( node ) {
        return {
          ...node,
          values: node.values.map( node => node.visit( this ) ),
        };
      }

      visitNumericLiteral( node ) {
        return {
          ...node,
          value: node.value * 2,
        };
      }
    }

    expect( traverse( ast, new Visitor() as IVisitor ) ).toEqual( expectedAST );
  } );

  it( 'should be able to change identifiers values', () => {
    const ast = new CallExpression( 'multiply', [ new NumericLiteral( 2 ), new Identifier( 'pi' ) ] );

    const expectedAST: IParseTreeNodeType = {
      type: ASTNode.CallExpression,
      name: 'multiply',
      values: [
        { type: ASTNode.NumericLiteral, value: 2 },
        { type: ASTNode.Identifier, name: 'pi', value: 3 },
      ],
    };

    class Visitor implements Partial<IVisitor> {
      visitCallExpression( node ) {
        return {
          ...node,
          values: node.values.map( node => node.visit( this ) ),
        };
      }

      visitNumericLiteral( node ) {
        return node;
      }

      visitIdentifier( node ) {
        return {
          ...node,
          value: 3,
        };
      }
    }

    expect( traverse( ast, new Visitor() as IVisitor ) ).toEqual( expectedAST );
  } );

  it( 'should be able to change string values', () => {
    const ast = new StringLiteral( 'Hello' );

    const expectedAST: IParseTreeNodeType = {
      type: ASTNode.StringLiteral,
      name: 'World',
    };

    class Visitor implements Partial<IVisitor> {
      visitStringLiteral( node ) {
        return {
          ...node,
          name: 'World',
        };
      }
    }

    expect( traverse( ast, new Visitor() as IVisitor ) ).toEqual( expectedAST );
  } );
} );
