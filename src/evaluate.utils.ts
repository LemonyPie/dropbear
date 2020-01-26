import { ASTNode, ICallExpression, IIdentifier, INumericLiteral, IParseTreeNodeType, IStringLiteral } from './parse';

export const isCallExpression = ( node: IParseTreeNodeType ): node is ICallExpression => node.type === ASTNode.CallExpression;
export const isNumericLiteral = ( node: IParseTreeNodeType ): node is INumericLiteral => node.type === ASTNode.NumericLiteral;
export const isStringLiteral = ( node: IParseTreeNodeType ): node is IStringLiteral => node.type === ASTNode.StringLiteral;
export const isIdentifier = ( node: IParseTreeNodeType ): node is IIdentifier => node.type === ASTNode.Identifier;
