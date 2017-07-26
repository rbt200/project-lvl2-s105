import fs from 'fs';

export default (file, parser) => parser(fs.readFileSync(file, 'utf-8'));
