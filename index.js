const fs = require('fs')
const helpers = require('broccoli-kitchen-sink-helpers')

module.exports = function (options) {
  const getDefaultTransform = title => function defaultTransform(path, content) {
    var out = [];
    getopt.title !== undefined && out.push('\n' + (title || '//< file: {path}').replace('{path}', path));
    out.push(content);
    return out.join('\n');
  }
  
  const inputFiles = options.inputFiles;
  const outputFile = options.outputFile;
  const transform = typeof options.transform === 'string' ? getDefaultTransform(options.transform) : options.transform;

  (function concat () {
    const inputFiles = helpers.multiGlob(inputFiles, { cwd: process.cwd() })
    const output = inputFiles.map(path => transform(path, fs.readFileSync(path, 'utf8')));
  
    outputFile
      ? fs.writeFileSync(outputFile, output.join("\n"))
      : console.log(output.join("\n"));
  })()
}
