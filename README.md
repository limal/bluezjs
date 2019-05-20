![bluezjs logo](bluezjs-logo.png?raw=true "bluezjs logo")

Bluezjs is a NodeJS library for using Bluetooth Low Energy on Linux systems via BlueZ. At this time it only supports the central mode.

## Installation

```
npm i bluezjs
```

or

```
yarn add bluezjs
```

## Example usage

Running an ExpressJS server that initiates a scan for nearby Bluetooth LE devices.

```javascript
const bluezjs = require("bluezjs");
const express = require("express");

const app = new express();
const http = require("http").Server(app);

app.get("/scan", (req, res) => {
  bluezjs.startDiscovery();
  res.json({ status: "ok" });
});

app.get("/stopScanning", (req, res) => {
  bluezjs.stopDiscovery();
  res.json({ status: "ok" });
});

bluezjs.init().then(() => {
  http.listen(3000);
});
```

## What makes it different?

Bluezjs is using the newest D-Bus library [dbus-next](https://github.com/acrisci/node-dbus-next) which makes it simple to build and use on the newer versions of NodeJS.

## bluezjs vs noble

The most popular BLE (central mode) library for NodeJS is [noble](https://github.com/noble/noble). It's great but it has its limiations. Below is a table that shows differences between bluezjs and noble.

| Feature             | noble   | bluezjs |
| ------------------- | ------- | ------- |
| NodeJS 10 and later | No      | **Yes** |
| D-Bus (more stable) | No      | **Yes** |
| Raspberry Pi        | **Yes** | **Yes** |
| Peripheral mode     | No      | No      |
| MacOS               | **Yes** | No      |
| Windows             | **Yes** | No      |
