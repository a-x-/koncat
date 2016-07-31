#!/bin/env node
const koncat = require('.')
const getopt = require('commander')

getopt
  .version('0.0.1')
  .usage('[options] input...')
  .option('[-o, --output]', 'output file', outputFile)
  .option('[-t, --title]')

koncat({
  inputFiles: getopt.input,
  outputFile: getopt.output,
  transform: getopt.title
});
