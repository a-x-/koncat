const fs = require('fs')
const globs = require('globs')

module.exports = function (options) {

    const getDefaultTransform = title => function defaultTransform(path, content) {
        var out = [];
        title !== undefined && out.push((title || '//< file: {path}').replace('{path}', path));
        out.push(content);
        return out.join('\n');
    }

    const inputFiles = options.inputFiles;
    const outputFile = options.outputFile;
    const transform = typeof options.title ? getDefaultTransform(options.title) : options.transform;

    (function concat () {
        globs(inputFiles, function (err, files) {
            if (err) throw err;

            const output = files.map(path => transform(path, fs.readFileSync(path, 'utf8')));

            outputFile
                ? fs.writeFileSync(outputFile, output.join('\n'))
                : console.log(output.join('\n'));
        })
    })()

}
