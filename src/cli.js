import program from 'commander';
import { version, description } from '../package.json';
import gendiff from '.';

export default () => {
  program
    .version(version)
    .description(description)
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => console.log(
      gendiff(firstConfig, secondConfig, program.format)))
    .parse(process.argv);
};
