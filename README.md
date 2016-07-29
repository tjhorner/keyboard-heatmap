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
