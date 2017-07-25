import program from 'commander';
import { version, description } from '../package.json';
import gendiff from '.';

export default () => {
  program
    .version(version)
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)))
    .description(description)
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);
};
