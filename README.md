# OBS-face-tracking-with-P5js
Lets say you want to track a face in a video to produce some creative effect. This could be easliy done with the latest [Nvidia RTX graphics cards](https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app/). 
If you don't have an RTX card, then try this javaScript to add face tracking to OBS.

This example comes from [the coding train](https://thecodingtrain.com/tracks/ml5js-beginners-guide) beginners guide to machine learning. The Coding Train is a great resource for learning creative coding.  

The P5 js library in this repo was modified to capture video from the desktop.  

## Using this project

To use this project you'll need [OBS](https://obsproject.com/), the OBS plugin "[Move Transistion](https://obsproject.com/forum/resources/move.913/)", a Chrome web browser, and a text editor. 
After installing these programs, download this repo and extract the folder.  

## Add an OBS Scene and Source
1. Create a Scene named "Scene"
2. Add a Video Capture Device source

![image](https://github.com/UUoocl/OBS-face-tracking-with-P5js/assets/99063397/a136b9a3-7225-4079-95ec-14adef4bca83)

3. Add a Scene Filter

  ![image](https://github.com/UUoocl/OBS-face-tracking-with-P5js/assets/99063397/b93074c1-ca84-42b5-a6ab-ee1c03e95d27)
  
4.Add a "Move Source" filter.

![image](https://github.com/UUoocl/OBS-face-tracking-with-P5js/assets/99063397/465c24ac-f303-45f4-ae59-e3a69218432e)

5.Open a preview window
  - right click on the "Video Capture Device" source
  - click "Windowed Projector (Source)"
  - ![image](https://github.com/UUoocl/OBS-face-tracking-with-P5js/assets/99063397/8e0432a7-4660-4e0c-8933-8aaae338d1b4)


## Enable the OBS WebSocket Server
1. In the menu bar click Tools --> WebSocket Server Settings
2. Check the box to "Enable WebSocket Server"
3. Click the "Show Connect Info" button
4. copy the password

## Edit the index.html file 
Open the index.html file from this repo with a text editor like [VS code](https://code.visualstudio.com/).
Replace the text ""YOUR-password-GOES-here" with the WebSocket Server password.
Save the change. 

## open the index.html file in Chrome
Choose the preview window as the window to share. 

There should now be a connection from the browser to the OBS WebSocket Server. 

![image](https://github.com/UUoocl/OBS-face-tracking-with-P5js/assets/99063397/f5665fc1-777f-48a9-8f35-cd3b9f551ac7)

As the face moves, commands are being sent to move the video source in OBS.  

This has been tested on Chrome for MacOS and Edge on Windows 11.

Explore the code in the "Sketch.js" file.  

 






