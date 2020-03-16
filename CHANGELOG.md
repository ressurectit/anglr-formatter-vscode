# Changelog

## Version 0.2.3

- now change of settings works also without reload of vscode

## Version 0.2.2

- added support for disabling typescript formatter
- *formatter* configuration
    - `anglr.typescriptFormat.enable` - Enable/disalbe Typescript formatter which runs on whole file before custom formatters.

## Version 0.2.1

- updated version of `anglr-formatter` (fixed imports reordering)

## Version 0.2.0

- updated version of `anglr-formatter`
- *formatter* configuration
    - `anglr.callExpressionArgumentsFormatter.enable` - Enable/disalbe automatic Anglr call expression arguments formatter.
    - `anglr.constructorParameterFormatter.enable` - Enable/disalbe automatic Anglr constructor formatter.
    - `anglr.decoratorArgumentsFormatter.enable` - Enable/disalbe automatic Anglr decorator arguments formatter.
    - `anglr.importFormatter.enable` - Enable/disalbe automatic Anglr import formatter.
    - `anglr.localVersion.enable` - Enable/disalbe automatic use of local node_modules version.

## Version 0.1.0

- first version of formatter, changes whole files
- allows disabling of formatter `anglr.format.enable`, requires restart
- *formatter* configuration
    - `anglr.importReorder.enable` - Enable/disalbe automatic Anglr formatter import reordering.

