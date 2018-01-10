FROM alpine:edge

RUN apk upgrade --update-cache --available
RUN apk add --no-cache \
    dbus \
    ttf-freefont \
    udev \
    xvfb \
    chromium

RUN apk del --purge --force linux-headers binutils-gold gnupg zlib-dev libc-utils
RUN rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/*

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

ADD xvfb-runme /usr/bin/xvfb-runme
RUN chmod +x /usr/bin/xvfb-runme