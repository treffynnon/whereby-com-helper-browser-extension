# Docker container for Chrome extension packaging

## Usage
### Build image

    docker build -t treffynnon/alpine-chrome-extension-pack .

## Notes
### xvfb

Currently Chrome and Chromium do not support extensions when using the `--headless` support.
This means that we must use an external framebuffer for X so xvfb is used here for this purpose.