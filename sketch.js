let ScreenCapture;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
const obs = new OBSWebSocket();
let frameCount = 0;
let moving = false;
let videoElem;
var nXfactor;
var nYfactor;

function setup() {
    //P5 setup
    createCanvas(640, 360);
    ScreenCapture = createCapture(VIDEO);
    ScreenCapture.hide();

    //ml5 setup
    poseNet = ml5.poseNet(ScreenCapture);
    poseNet.on('pose', gotPoses);
  
    //OBS websocket setup
    var manualSceneChange= true;
    const websocketIPelement = document.querySelector("[data-websocket-IP]");
    const websocketIP = websocketIPelement ? websocketIPelement.getAttribute('data-websocket-IP') : false;
    const websocketPortElement = document.querySelector("[data-websocket-port]");
    const websocketPort = websocketPortElement ? websocketPortElement.getAttribute('data-websocket-port') : false;
    const websocketPasswordElement = document.querySelector("[data-websocket-password]");
    const websocketPassword = websocketPasswordElement ? websocketPasswordElement.getAttribute('data-websocket-password') : false;
    
    console.log(`ws://${websocketIP}:${websocketPort}`)
    // connect to OBS websocket
    if(!(document.URL.includes("?receiver"))){
    try {
      const {
        obsWebSocketVersion,
        negotiatedRpcVersion
      } = obs.connect(`ws://${websocketIP}:${websocketPort}`, websocketPassword, {
        rpcVersion: 1
      });
      console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
      } catch (error) {
      console.error('Failed to connect', error.code, error.message);
      }
      obs.on('error', err => {
        console.error('Socket error:', err)
      })
    }
    
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

async function draw() {
    frameRate(30);
    image(ScreenCapture, 0, 0);
    //erase canvas
    //clear();
    let d = dist(noseX, noseY, eyelX, eyelY);
  
    fill(255, 0, 0);
    ellipse(noseX, noseY, d);
    //console.log(noseX, noseY, d)
    //fill(0,0,255);
    //ellipse(eyelX, eyelY, 50);
    
    //console.log(noseX, noseY)
    //obs.call('SetCurrentProgramScene', {sceneName: "Scene 2"});
    console.log(await obs.call("GetSourceFilter",{sourceName: "Scene",filterName:"Move Source" }))
    
    //check the nose position every 1 sec.
    if(moving == false){
        frameCount = 30;
        //scale the nose position in the screen capture to the OBS scene
        nXfactor = ((noseX/480)*2560).toFixed(0);
        nYfactor = ((noseY/360)*1440).toFixed(0);
        console.log(nXfactor)
        moving = true;
        
        //use OBS websockets to send nose position to a Scene Move Transition filter
        await obs.call(
            "SetSourceFilterSettings",
            {
                sourceName: "Scene",
                filterName: "Move Source",
                overlay: true,
                enabled: true,
                filterSettings: {
                    source: "Video Capture Device",
                    enabled: true,
                    enabled_match_moving: true,
                    pos:{
                        x: (-1*parseInt(nXfactor)),
                        y: (-1*parseInt(nYfactor))
                      },
                    transform_text: `pos: x -${nXfactor} y -${nYfactor} rot: 0.0 scale: x 7.000 y 7.000 crop: l 0 t 0 r 0 b 0`,
                  }
              }
              );
       
              await obs.call(
                  "SetSourceFilterEnabled",
                  {
                      filterEnabled: true,
                      sourceName: "Scene",
                      filterName: "Move Source"
                  });  

  //count down the frames until next position check
  } else { 
      frameCount--;
      if(frameCount == 0){
  
          moving = false}
  }
  } 