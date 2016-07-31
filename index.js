const fs = require('fs')
const helpers = require('broccoli-kitchen-sink-helpers')

module.exports = function (options) {
  const inputFiles = options.inputFiles;
  const outputFile = options.outputFile;
  const transform = options.transform;

  (function concat () {
    const inputFiles = helpers.multiGlob(inputFiles, { cwd: process.cwd() })
    const output = inputFiles.map(path => transform(path, fs.readFileSync(path, 'utf8')));
  
    outputFile
      ? fs.writeFileSync(outputFile, output.join("\n"))
      : console.log(output.join("\n"));
  })()
}
