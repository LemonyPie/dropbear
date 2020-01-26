import chalk from 'chalk';
import { prompt } from 'inquirer';
import { parseAndEvaluate } from './repl.parse-and-evaluate';

const askQuestions = () => {
  const questions = [
    { name: 'COMMAND', type: 'input', message: chalk.blue( '>' ) },
  ];

  return prompt( questions );
};

export const repl = async () => {
  try {
    const answers = await askQuestions();
    const { COMMAND } = answers;

    if ( COMMAND.trim() ) {
      console.log( chalk.yellow( parseAndEvaluate( COMMAND ) ) );
    }
  } catch ( error ) {
    console.error( error );
  }

  repl();
};

if ( require.main === module || !module.parent ) {
  console.log(
    chalk.red(
      `Welcome to the ${ chalk.bgBlackBright( ' DropBear ' ) } Programming Language`,
    ),
  );

  repl();
}
