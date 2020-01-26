import { ASTNode, ICallExpression, INumericLiteral, IParseTreeNodeType, IStringLiteral } from './parse';

export const isCallExpression = ( node: IParseTreeNodeType ): node is ICallExpression => node.type === ASTNode.CallExpression;
export const isNumericLiteral = ( node: IParseTreeNodeType ): node is INumericLiteral => node.type === ASTNode.NumericLiteral;
export const isStringLiteral = ( node: IStringLiteral ): node is IStringLiteral => node.type === ASTNode.StringLiteral;
