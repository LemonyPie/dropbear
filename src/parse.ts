import { isInstructionToken, isNumberToken, isStringToken, next, peek } from './parse.utils';
import { ITokenType } from './tokenize';
import { isClosingParenthesis, isOpeningParenthesis } from './tokenize.utils';

export const enum ASTNode {
  NumericLiteral,
  StringLiteral,
  Identifier,
  CallExpression
}

export interface IParseTreeNode {
  type: ASTNode;
}

export interface IVisitable {
  visit( visitor ): IParseTreeNodeType;
}

export interface ICallExpression extends IParseTreeNode {
  name: string;
  values: IParseTreeNodeType[];
}

export interface ICallExpressionVisitor {
  visitCallExpression( node: CallExpression )
}

export interface IStringLiteral extends IParseTreeNode {
  name: string;
}

export interface IStringLiteralVisitor {
  visitStringLiteral( node: StringLiteral );
}

export interface INumericLiteral extends IParseTreeNode {
  value: number;
}

export interface INumericLiteralVisitor {
  visitNumericLiteral( node: NumericLiteral ): INumericLiteral;
}

export interface IIdentifier extends IParseTreeNode {
  name: string;
}

export interface IIdentifierVisitor {
  visitIdentifier( node: Identifier );
}

export interface IVisitor extends ICallExpressionVisitor, IStringLiteralVisitor, INumericLiteralVisitor, IIdentifierVisitor {
}

export class NumericLiteral implements INumericLiteral {
  public readonly type = ASTNode.NumericLiteral;

  constructor(
    public readonly value: number,
  ) {
  }

  public visit( visitor: INumericLiteralVisitor ): ReturnType<INumericLiteralVisitor['visitNumericLiteral']> {
    return visitor.visitNumericLiteral( this );
  }
}

export class StringLiteral implements IStringLiteral {
  public readonly type = ASTNode.StringLiteral;

  constructor(
    public readonly name: string,
  ) {
  }

  public visit( visitor: IStringLiteralVisitor ): ReturnType<IStringLiteralVisitor['visitStringLiteral']> {
    return visitor.visitStringLiteral( this );
  }
}

export class Identifier implements IIdentifier {
  public readonly type = ASTNode.Identifier;

  constructor(
    public readonly name: string,
  ) {
  }

  visit( visitor: IIdentifierVisitor ) {
    return visitor.visitIdentifier( this );
  }
}

export class CallExpression implements ICallExpression {
  public readonly type = ASTNode.CallExpression;

  constructor(
    public readonly name: string,
    public readonly values: IParseTreeNodeType[],
  ) {
  }

  visit( visitor: ICallExpressionVisitor ): ReturnType<ICallExpressionVisitor['visitCallExpression']> {
    return visitor.visitCallExpression( this );
  }
}

export type IParseTreeNodeType = ICallExpression | INumericLiteral | IStringLiteral | IIdentifier;
export type IVisitableParseTreeNodeType = IParseTreeNodeType & IVisitable;

export const parenthesize = ( tokens: ITokenType[] ): ITokenType | ITokenType[] => {
  const token = next( tokens );
  if ( isOpeningParenthesis( token.value ) ) {
    const expression = [];
    while ( !isClosingParenthesis( peek( tokens ).value ) ) {
      expression.push(
        parenthesize( tokens ),
      );
    }

    next( tokens );
    return expression;
  }

  return token;
};


const parse = ( inputTokens: ITokenType[] | ITokenType ): IParseTreeNodeType => {
  let token;

  if ( Array.isArray( inputTokens ) ) {
    if ( isInstructionToken( peek( inputTokens ) ) ) {
      const [ name, ...rest ] = inputTokens;
      if ( isInstructionToken( name ) )
        return new CallExpression(
          name.value,
          rest.map( parse ),
        );
    }
  } else {
    token = inputTokens;
  }

  if ( isNumberToken( token ) ) {
    return new NumericLiteral( token.value );
  }

  if ( isStringToken( token ) ) {
    return new StringLiteral( token.value );
  }

  if ( isInstructionToken( token ) ) {
    return new Identifier( token.value );
  }
};

const start = ( tokens: ITokenType[] ): ReturnType<typeof parse> => parse( parenthesize( tokens ) );

export { start as parse };

