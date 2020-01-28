import { compileToJavascript } from './compile-to-javascript';
import { CallExpression, IVisitableParseTreeNodeType, NumericLiteral } from './parse';

describe( compileToJavascript, () => {
  it( 'should reformat Dropbear to valid JavaScript', () => {
    const ast: IVisitableParseTreeNodeType = (
      new CallExpression( 'add', [
        new NumericLiteral( 2 ),
        new NumericLiteral( 3 ),
        new CallExpression( 'subtract', [
          new NumericLiteral( 5 ),
          new NumericLiteral( 4 ),
        ] ),
      ] )
    );
    const expectedOutput = 'add(2, 3, subtract(5, 4))';
    expect( compileToJavascript( ast ) ).toBe( expectedOutput );
  } );
} );
