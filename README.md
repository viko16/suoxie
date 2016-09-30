# suoxie

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
console.log(suoxie(word)) // output "JSON-friendly" string
```

## Thanks
All data is fetched from [Abbreviations.com](http://www.abbreviations.com/) API.

## License
MIT © [viko16](https://github.com/viko16)
