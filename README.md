# virtual-GBM
An emulation of the GigBAR Move with a built-in Art-Net receiver. Designed to connect to Engine OS devices.

## .env variables
WEB_PORT - The port to run the local webserver on.

DMX_UNIVERSE - The DMX universe to listen to.

## Connecting your Engine OS device
1. Download the GigBAR Move project file from the [SoundSwitch website](https://www.soundswitch.com/whatsnew.html)
2. Load the project file on your player's storage device
3. Open the lighting view in Engine OS
4. Load the project file from your storage device
5. Turn on "Broadcast Art-Net" from the lighting preferences.
6. On Computer, start VirtualGBM.exe. A new browser window should open with the basic settings dialogs showing.
7. Select the IP from the drop down that represents your computer's network IP.
8. Engine OS should connect automatically.

## Controls
- Click and drag to move lights.
- Hover and scroll to resize the lights.

## What's working and what's not
There are a lot of missing fixtures and DMX code handlers. Right now the 2 pars are fully working and the two moving heads are mostly working. There is no strobing or gobos on the moving heads yet. Everything else is TBA.