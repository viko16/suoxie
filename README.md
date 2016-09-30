# suoxie

[![Build Status](https://img.shields.io/travis/viko16/suoxie.svg?style=flat)](https://travis-ci.org/viko16/suoxie)
[![NPM version](https://img.shields.io/npm/v/suoxie.svg?style=flat)](https://npmjs.org/package/suoxie)
[![Node version](https://img.shields.io/node/v/suoxie.svg?style=flat)](https://github.com/viko16/suoxie)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Query abbreviation in your command line.

在命令行查缩写

## Install

```bash
$ [sudo] npm install -g suoxie
```

## Usage

```bash
$ sx <word>
$ sx --help
```

## API

```javascript
const suoxie = require('suoxie')
suoxie(word).then(console.log) // return Promise
```

## Thanks
All data is fetched from [Abbreviations.com](http://www.abbreviations.com/) API.

## License
MIT © [viko16](https://github.com/viko16)
