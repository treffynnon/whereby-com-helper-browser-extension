# Browser extension build tools

## Building a Chrome .crx from the command line
### Build the docker image

    docker build -t treffynnon/alpine-chrome-extension-pack ./chrome

### Pack the extension into a .crx

    ./chrome-pack.sh