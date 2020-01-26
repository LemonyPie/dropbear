import { evaluate } from './evaluate';
import { parse } from './parse';
import { pipe } from './repl.utilities';
import { tokenize } from './tokenize';

export const parseAndEvaluate = pipe(
  tokenize,
  parse,
  evaluate,
);

export const tokenizeAndParse = pipe(
  tokenize,
  parse,
);
