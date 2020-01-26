export const pipe = ( ...functions ) => value => functions.reduce( ( value, fn ) => fn( value ), value );
export const tap = ( value, interceptor ) => {
  interceptor( value );
  return value;
};

export const log = value => tap( value, console.log );
