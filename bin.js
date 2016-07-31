#!/bin/env node
const koncat = require('.')
const getopt = require('commander')

getopt
  .version('0.0.1')
  .usage('[options] input...')
  .option('[-o, --output]', 'output file', outputFile)
  .option('[-t, --title]')

koncat(sourceTree, {
  inputFiles: getopt.input,
  outputFile: getopt.output,
  transform: function(path, content) {
    var out = [];
    getopt.title !== undefined && out.push('\n' + (getopt.title || '//< file: {path}').replace('{path}', path));
    out.push(content);
    return out.join('\n');
  }
});
