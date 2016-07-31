#!/usr/bin/env node
const koncat = require('.')
const getopt = require('commander')

getopt
  .version(require('./package.json').version)
  .usage('[options] [input...]')
  .option('-o, --output [path]', 'output file')
  .option('-t, --title [mask]', 'content delimeter; e.g. // file: {path}')
  .parse(process.argv)

getopt.input = getopt.args || fs.readFileSync('/dev/stdin', 'utf8').split('\n|\s+')

koncat({
  inputFiles: Array.isArray(getopt.input) ? getopt.input : [getopt.input],
  outputFile: getopt.output,
  title: getopt.title
});
