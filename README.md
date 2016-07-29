# WhatPulse Corsair Keyboard Thing

This is a thing that shows your WhatPulse heatmap on your Corsair keyboard.

![](http://i.imgur.com/v1ioZNI.jpg)

## Usage

**This only works on Windows.**

Make sure you have the CUE software installed and the SDK enabled.

![CUE Settings Menu](http://i.imgur.com/kfraBoh.png)

Make sure you have WhatPulse installed. You don't need to enable any special
settings there.

Then run `npm install`.

Then `node index`.

The script will then take control of your keyboard LEDs through CUE and display
the heatmap if no errors occur.

## Options

This script takes options, so you can do things like this:

```
node index --color1 #0000FF --color2 #00FF00
```

- `color1` - Sets the first color of the gradient used by the heatmap. It's the
  color that the least used keys will have. (Default: `#00FF00`)
- `color2` - Sets the second color of the gradient used by the heatmap. It's the
  color that the most used keys will have. (Default: `#FF0000`)
- `database` - The path to the `whatpulse.db` file. (Default:
  `%USERPROFILE%\AppData\Local\whatpulse\whatpulse.db`)
- `verbose` - Pass this option in to enable verbose mode.

## Running in Background

To run this script in the background, I recommend you use [forever](https://github.com/foreverjs/forever).
You could do something like this to run a heatmap with a blue-red color scheme in
the background:

```
forever start index.js --color1 #0000FF
```
