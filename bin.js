#!/usr/bin/env node
const koncat = require('.')
const getopt = require('commander')
const fs = require('fs')

getopt
  .version(require('./package.json').version)
  .usage('[options] [input...]')
  .option('-o, --output [path]', 'output file')
  .option('-t, --title [mask]', 'content delimeter; e.g. // file: {path}')
  .parse(process.argv)

getopt.input = getopt.args.length ? getopt.args : fs.readFileSync('/dev/stdin', 'utf8').split(/\n|\s+/).map(path=>path.trim())

koncat({
  inputFiles: Array.isArray(getopt.input) ? getopt.input : [getopt.input],
  outputFile: getopt.output,
  title: getopt.title
});
