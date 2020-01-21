import { tokenize } from './tokenize';

describe(tokenize, () => {
  it('should return array of tokens', () => {
    expect(Array.isArray(tokenize(''))).toBe(true);
  })
});
