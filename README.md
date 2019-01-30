[![Build Status](https://travis-ci.org/limitd/protocol.svg)](https://travis-ci.org/limitd/protocol)

This repository contains the definition of the limitd protocol.

> **Warning:** it contains some `.js` files for tests but it is not intended for node.js only.

Implementors of client libraries are supposed to use this repository.

## Develop
### Cloning
This repo makes use of git submodules. After cloning, do `git submodule update --init`.

### Building
Do not use `npm run build`. This library has modified the generated files to maintain backwards compatibility.

### Test
Run the test suite as follows:

```
npm install
npm test
```

## License

MIT - AUTH0 INC. 2015
