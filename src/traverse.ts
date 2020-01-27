import { IVisitable, IVisitor } from './parse';

const traverseNode = ( node: IVisitable, visitor: IVisitor ) => {
  return node.visit( visitor );
};

export const traverse = ( node: IVisitable, visitor: IVisitor ) => {
  return traverseNode( node, visitor );
};

