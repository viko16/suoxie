# suoxie

[![Build Status](https://img.shields.io/travis/viko16/suoxie.svg?style=flat)](https://travis-ci.org/viko16/suoxie)
[![NPM version](https://img.shields.io/npm/v/suoxie.svg?style=flat)](https://npmjs.org/package/suoxie)
[![Node version](https://img.shields.io/node/v/suoxie.svg?style=flat)](https://github.com/viko16/suoxie)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

🔍 Query abbreviations in your command line. 🔍 在命令行查缩写。🔍

![Screenshot](https://cloud.githubusercontent.com/assets/5064777/19028195/0909bc44-896c-11e6-9f71-14b6bdc7db6b.gif)

## Install

```bash
$ [sudo] npm install -g suoxie
```

## Usage

```bash
$ sx <word>
$ sx --help
# or
$ suoxie <word>
```

## API

```javascript
const suoxie = require('suoxie')
suoxie(word).then(console.log) // return Promise
```

## Thanks
- All data is fetched from [Abbreviations.com](http://www.abbreviations.com/) API.
- Inspired by [egoist/liyu](https://github.com/egoist/liyu).

## License
MIT © [viko16](https://github.com/viko16)
