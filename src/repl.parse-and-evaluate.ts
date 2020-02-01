import { evaluate } from './evaluate';
import { parse } from './parse';
import { pipe } from './repl.utilities';
import { tokenize } from './tokenize';
import { transform } from './transform';

export const parseAndEvaluate = pipe(
  tokenize,
  parse,
  transform,
  evaluate,
);

export const tokenizeAndParse = pipe(
  tokenize,
  parse,
);
