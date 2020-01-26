const { parseAndEvaluate } = require( './repl.parse-and-evaluate' );

const fs = require( 'fs' );

const [ command, ...args ] = process.argv.slice( 2 );

( function () {
  if ( !command ) {
    const repl = require( './repl' );
    return repl();
  }

  if ( command.toLowerCase() === 'run' ) {
    fs.readFile( args[0], 'utf-8', ( error, file ) => {
      if ( error ) {
        console.error( error );
      }
      const result = parseAndEvaluate( file );
      console.log( result );
    } );
  }
} )();
