# koncat

Concatenate filenames into a single file.

## Node.js Usage

### concat files as is with titles between
```js
const koncat = require('.')

koncat({
  inputFiles: input,
  outputFile: output,
  title: '// file: {path}'
})
```

### create js file with requires
```js
const koncat = require('.')

koncat({
  inputFiles: ['tests/**/*_test.js'],
  outputFile: 'tests_main.js',
  transform: function(path) {
    var out = [];
    out.push("// require module " + path);
    out.push("require('" + path + "');");
    out.push("\n");
    return out.join("\n");
  }
})
```

For a directory with the structure

```
- tests/
  - utils_test.js
  - controllers/
    - index_test.js
    - list_test.js
```

this creates a file at `tests_main.js` with the content

```js
// require module tests/utils_test.js
require("tests/utils_test");

// require module tests/controllers/index_test.js
require("tests/controllers/index_test");

// require module tests/controllers/list_test.js
require("tests/controllers/list_test");
```

## CLI Usage
* `-t '... {path} ...'` - add titles with file paths

```sh
koncat -h
koncat '*.js' > bundle.js
koncat -t '/*< file: {path} */' -- '*.js' > bundle.js
koncat -o bundle.js -t '//< file: {path}' -- '*.js'
koncat -t '' -- '*.js' # defalut title
```
