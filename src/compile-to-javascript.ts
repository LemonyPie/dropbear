import generate from '@babel/generator';
import { JavaScriptVisitor } from './javascript-visitor';
import { traverse } from './traverse';

export const compileToJavascript = ast => {
  const tree = traverse( ast, new JavaScriptVisitor() );
  return generate( tree as any ).code;
};
