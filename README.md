# template-hint [![Build Status](https://travis-ci.org/11joselu/template-hint.svg?branch=master)](https://travis-ci.org/11joselu/template-hint) [![NPM](https://img.shields.io/npm/v/template-hint.svg)](http://npmjs.com/package/template-hint)

> This project born from [panic-overlay](https://github.com/xpl/panic-overlay)

A lightweight XML template hint.

## Features

- Displays xml errors in browsers

## How It Looks

![Template hint example](/docs/sample.png)

## Installation

```bash
npm install template-hint
```

```javascript
import templateHint from 'template-hint'; // should be the very first import in your app!
```

## Using Without A Bundler

All-in-one browser bundle (batteries included), served from a CDN of your choice. Creates a global `templateHint` object.

- jsDelivr: https://cdn.jsdelivr.net/npm/template-hint/build/template-hint.browser.js
- unpkg: https://unpkg.com/template-hint

```html
<script src="https://unpkg.com/template-hint"></script>
```

## Demos

Here's how you can find an example usage of `template-hint` with a webpack enviroment

```sh
git clone https://github.com/11joselu/template-hint.git
cd template-hint
npm install
```

| Environment | Run with                       | Source folder                                   |
| ----------- | ------------------------------ | ----------------------------------------------- |
| Webpack     | `npm run demo-webpack-vanilla` | [`demo/webpack-vanilla`](/demo/webpack-vanilla) |

```javascript
import templateHint from 'template-hint';

templateHint.validate(xml_template); // true or a toggle fn
```

### TODO

- Validate HTML template
