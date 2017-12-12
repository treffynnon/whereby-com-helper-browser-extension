# Appear.in meeting room helper browser extension

This browser extension assists in the following ways:

* Allows you to configure defaults when entering a room
    * Camera off
    * Muted audio
* Apply those defaults to links that you open/follow automatically
* Keep a list of links to your favourite meeting rooms

## Building the extension

Install all the dependencies first:

```bash
yarn
```

and then the extension can be built:

```bash
yarn build
```

This produces a compiled extension file with a name like `appear-in-meeting-room-helper-x.x.x.crx`.

## Installing the extension

Open your chrome browser and navigate to [chrome://extensions](chrome://extensions).
Drag and drop the `appear-in-meeting-room-helper-x.x.x.crx` file onto the page and
accept the warning.

## Developing the extension

The extension is written with TypeScript and it's built with Webpack.

1. Run `yarn` to install dependencies
2. Run `yarn watch` to build and watch for file changes
3. Go to [chrome://extensions](chrome://extensions)
4. Remove the extension if already installed
5. Check on developer mode
6. Load unpacked extension and point to this projects `dist` dir
7. Hack away
8. Remember to hit reload against the extension on [chrome://extensions](chrome://extensions)

### Tests

The tests are written with Jest in TypeScript and can be run with:

```bash
yarn test
```

### Linting

There is a simple ts-lint setup configured that can be executed with:

```bash
yarn lint
```

## Icon credit

Icon made by [Freepik](http://www.freepik.com/) from [www.flaticon.com](http://www.flaticon.com).

https://www.flaticon.com/free-icon/webcam-video-call_70572#term=camera&page=5&position=78