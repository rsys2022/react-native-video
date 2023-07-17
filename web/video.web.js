// import shaka from "shaka-player/dist/shaka-player.ui";
// import React from "react";
// import { CustomAdsManager } from "./customAdManager/adManager";

// /**
//  * A React component for shaka-player.
//  * @param {string} src
//  * @param {shaka.extern.PlayerConfiguration} config
//  * @param {boolean} autoPlay
//  * @param {number} width
//  * @param {number} height
//  * @param ref
//  * @param {boolean} chromeless
//  * @param {function} onLoaded
//  * @returns {*}
//  * @constructor
//  */
// var videoElement;
// const eventList = [
//   "firstQuartile",
//   "midpoint",
//   "thirdQuartile",
//   "start",
//   "complete",
// ];
// function ShakaPlayer(
//   { src, config, chromeless, className, onLoaded, trackingJson, ...rest },
//   ref
// ) {
//   const uiContainerRef = React.useRef(null);
//   const adUiRef = React.useRef(null);
//   const videoRef = React.useRef(null);

//   const [player, setPlayer] = React.useState(null);
//   const [ui, setUi] = React.useState(null);

//   // Effect to handle component mount & mount.
//   // Not related to the src prop, this hook creates a shaka.Player instance.
//   // This should always be the first effect to run.
//   React.useEffect(() => {
//     // videoElement = document.getElementById("video");
//     shaka.Player.setAdManagerFactory(
//       () =>
//         new CustomAdsManager(
//           adUiRef.current,
//           videoRef.current,
//           trackingJson,
//           eventList
//         )
//     );

//     const player = new shaka.Player(videoRef.current);
//     setPlayer(player);

//     let ui;
//     if (!chromeless) {
//       const ui = new shaka.ui.Overlay(
//         player,
//         uiContainerRef.current,
//         videoRef.current
//       );
//       setUi(ui);
//     }

//     return () => {
//       player.destroy();
//       if (ui) {
//         ui.destroy();
//       }
//     };
//   }, [chromeless, trackingJson]);

//   // Keep shaka.Player.configure in sync.
//   React.useEffect(() => {
//     if (player && config) {
//       player.configure({
//         ...config,
//       });
//     }
//   }, [player, config]);

//   // Load the source url when we have one.

//   React.useEffect(() => {
//     if (player && src) {
//       videoRef.current.addEventListener("loadeddata", (e) => {
//         console.log("loaded url", e);
//         onLoaded(e);
//       });
//       eventList.forEach((event) => {
//         videoRef.current.addEventListener(event, (e) => {
//           console.log("event in player ::: ", e);
//         });
//       });

//       player
//         .load(src)
//         .then(() => {})
//         .catch((error) => {
//           console.log("i am error", error);
//         });
//     }
//   }, [player, src, onLoaded]);

//   // Define a handle for easily referencing Shaka's player & ui API's.
//   React.useImperativeHandle(
//     ref,
//     () => ({
//       get player() {
//         return player;
//       },
//       get ui() {
//         return ui;
//       },
//       get videoElement() {
//         return videoRef.current;
//       },
//     }),
//     [player, ui]
//   );

//   return (
//     <div ref={uiContainerRef} className={className}>
//       <video
//         ref={videoRef}
//         className="video-js"
//         style={{
//           maxWidth: "100%",
//           width: "100%",
//         }}
//         autoPlay={true}
//         {...rest}
//       />
//       <div
//         ref={adUiRef}
//         style={{
//           position: "absolute",
//           zIndex: 1,
//           bottom: -2,
//           left: "2%",
//           width: "96%",
//           alignSelf: "center",
//           display: "none",
//         }}
//         id="ad-ui-outer"
//       >
//         <span
//           id={"ad-counter"}
//           style={{ color: "white", marginBottom: 2, width: "50%" }}
//         ></span>
//         <button id="pause" style={{ display: "none" }}>
//           Pause
//         </button>

//         <div id="ad-ui"></div>
//       </div>
//       <button
//         id="skipAd"
//         style={{
//           position: "absolute",
//           zIndex: 1,
//           bottom: "3%",
//           alignSelf: "center",
//           right: "2%",
//           display: "none",
//         }}
//         onClick={() => player.getAdManager().dismiss()}
//       >
//         SKIP AD
//       </button>
//     </div>
//   );
// }

// export default React.forwardRef(ShakaPlayer);


import React, { useEffect } from "react";
import "shaka-player/dist/controls.css";

import { CustomAdsManager } from "./customAdManager/adManager";
import shaka from "shaka-player/dist/shaka-player.ui.js";

const eventList = [
  "firstQuartile",
  "midpoint",
  "thirdQuartile",
  "start",
  "complete",
  "paused",
  "played",
  "muted",
];

const VidPlayer = (props, ref) => {
  const videoRef = React.useRef();
  const videoContainer = React.useRef();
  const adUiRef = React.useRef(null);
  const [player, setPlayer] = React.useState();
  const [ui, setUi] = React.useState();
  const [mutedState, setMute] = React.useState(props.muted);
  const [val, setVal] = React.useState(null);
  const [random, setRandom] = React.useState("asdadas");
  function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  function onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }
  useEffect(() => {
    const handleResize = () => {
      if (videoContainer.current) {
        const { innerWidth, innerHeight } = window;
        videoContainer.current.style.width = `${innerWidth}px`;
        videoContainer.current.style.height = `${innerHeight}px`;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (props.trackingJson) {
      const customAdManage = new CustomAdsManager(
        adUiRef.current,
        videoRef.current,
        props.trackingJson,
        eventList,
      );
      setVal(customAdManage);
    }
  }, [props.trackingJson]);



  useEffect(() => {
    if (videoRef.current && videoContainer.current) {
      const video = videoRef.current;
      const container = videoContainer.current;
      var player = new shaka.Player(video);
      setPlayer(player);
      const ul = new shaka.ui.Overlay(player, container, video);
      ul.getControls();
      setUi(ul);
      if (!props.controls) {
        var videoContainerQuery = document.querySelector(".video-container");
        videoContainerQuery.setAttribute("shaka-controls", "false");
      }
     
      // ui.setEnabled(false);
      // Listen for error events.
      videoRef.current.addEventListener("loadeddata", (e) => {
        console.log("loaded url", e);
        props.onLoaded(e);
      });
      player.addEventListener("error", onErrorEvent);
      eventList.forEach((event) => {
        videoRef.current.addEventListener(event, (e) => {
          // toast(event);
          console.log("event in player ::: ", e);
        });
      });
      console.log("props.src", props.src)
      player
        .load(props.src)
        .then(function () {
          // This runs if the asynchronous load is successful.
          console.log("The video has now been loaded!");
        })
        .catch(onError);
      console.log("player", player);
    }
  }, [videoRef, videoContainer, props.src, props.controls]);

  // Define a handle for easily referencing Shaka's player & ui API's.
  React.useImperativeHandle(
    ref,
    () => ({
      get player() {
        return player;
      },
      get ui() {
        return ui;
      },
      get videoElement() {
        return videoRef.current;
      },
    }),
    [player, ui]
  );

  return (
    <div>
      <div 
        className="video-container" 
        ref={videoContainer}
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <video
          className="shaka-video"
          ref={videoRef}
          
          onError={(error)=> console.log("video errt", error)}
          // poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          autoPlay={props.autoPlay}
        />
      </div>
      <div
        ref={adUiRef}
        style={{
          position: "absolute",
          zIndex: 100,
          bottom: -2,
          display: "none",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: 1,
          bottom: "10%"
        }}
        id="ad-ui-outer"
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", width: "50%", paddingLeft: "2%" }}>
            <button
              id="pause"
              onClick={() => {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }}
              style={{ display: "block" }}
            >
              Pause
            </button>
            <span
              id={"ad-counter"}
              style={{
                color: "white",
                marginBottom: 2,
                marginLeft: 10,
                width: "50%",
              }}
            ></span>
          </div>
          <div
            style={{
              display: "flex",
              // width: "50%",
              marginLeft: "auto",
              paddingRight: "2%",
              // alignSelf: "revert",
            }}
          >
            <button
              id="skipAd"
              style={{
                display: "none",
              }}
              onClick={() => {
                console.log("val", val.dismiss());
                // player.getAdManager().dismiss();
              }}
            >
              SKIP AD
            </button>
          </div>
        </div>
      </div>
      <div id="ad-ui" style={{
          display: "none",
           bottom: "5%", 
           position: "absolute",
          zIndex: 100,
          width: "96%",
          alignSelf: "center",
          left: "2%",
          right: "2%",
          alignItems: "center",
          justifyContent: "center",
          height: 3,
          }}></div>
    </div>
  );
};

export default React.forwardRef(VidPlayer);



// import React, { useEffect } from "react";
// // import "shaka-player/dist/controls.css";
// import "../../shaka-player/dist/controls.css";
// const shaka = require("shaka-player/dist/shaka-player.ui.js");

// const VidPlayer = (props, ref) => {
//   const videoRef = React.useRef();
//   const videoContainer = React.useRef();
//   const [player, setPlayer] = React.useState(null);
//   const [ui, setUi] = React.useState(null);

//   function onErrorEvent(event) {
//     // Extract the shaka.util.Error object from the event.
//     this.onError(event.detail);
//   }

//   function onError(error) {
//     // Log the error.
//     console.error("Error code", error.code, "object", error);
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       if (videoContainer.current) {
//         const { innerWidth, innerHeight } = window;
//         videoContainer.current.style.width = `${innerWidth}px`;
//         videoContainer.current.style.height = `${innerHeight}px`;
//       }
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);


//   useEffect(() => {
//     if (videoRef.current && videoContainer.current) {
//       const video = videoRef.current;
//       const container = videoContainer.current;
//       var player = new shaka.Player(video);
//       const ui = new shaka.ui.Overlay(player, container, video);
//       ui.getControls();
//       console.log('ui', ui)
//       setPlayer(player);
//       setUi(ui);
//       // Listen for error events.
//       player.addEventListener("error", onErrorEvent);
//       player
//         .load(props.src)
//         .then(function () {
//           // This runs if the asynchronous load is successful.
//           console.log("The video has now been loaded!");
//         })
//         .catch(onError);
//     }
//   }, [videoRef, videoContainer, props.src]);

//   // Define a handle for easily referencing Shaka's player & ui API's.
//   React.useImperativeHandle(
//     ref,
//     () => ({
//       get player() {
//         return player;
//       },
//       get ui() {
//         return ui;
//       },
//       get videoElement() {
//         return videoRef.current;
//       },
//     }),
//     [player, ui]
//   );

//   return (
//     <>
//       <div 
//         className="video-container" 
//         style={{
//           height: "100%",
//           width: "100%",
//           justifyContent: "center",
//           backgroundColor: "black",
//           // alignItems: "center"
//         }} 
//         ref={videoContainer}
//       >
//         <video
//           className="shaka-video"
//           ref={videoRef}
//           poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
//         />
//       </div>
//     </>
//   );
// };
// //Creating class component
// class VideoPlayer extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     //Creating reference to store video component on DOM
//     this.videoComponent = React.createRef();

//     //Creating reference to store video container on DOM
//     this.videoContainer = React.createRef();

//     //Initializing reference to error handlers
//     this.onErrorEvent = this.onErrorEvent.bind(this);
//     this.onError = this.onError.bind(this);
//   }

//   onErrorEvent(event) {
//     // Extract the shaka.util.Error object from the event.
//     this.onError(event.detail);
//   }

//   onError(error) {
//     // Log the error.
//     console.error("Error code", error.code, "object", error);
//   }

//   componentDidMount() {
//     //Link to MPEG-DASH video
//     // var manifestUri =
//     //   "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

//     //Getting reference to video and video container on DOM
//     const video = this.videoComponent.current;
//     const videoContainer = this.videoContainer.current;

//     //Initialize shaka player
//     var player = new shaka.Player(video);

//     //Setting up shaka player UI
//     const ui = new shaka.ui.Overlay(player, videoContainer, video);
//     ui.getControls();

//     // Listen for error events.
//     player.addEventListener("error", this.onErrorEvent);

//     // Try to load a manifest.
//     // This is an asynchronous process.
//     player
//       .load(this.props.src)
//       .then(function () {
//         // This runs if the asynchronous load is successful.
//         console.log("The video has now been loaded!");
//       })
//       .catch(this.onError); // onError is executed if the asynchronous load fails.
//   }

//   render() {
//     /*
// 		Returning video with a container. Remember, when setting up shaka player with custom UI, you must
// 		add your video component inside a container
// 		The container will be used by shaka player to add your customized UI for the player
// 		*/
//     return (
//       <div 
//         className="video-container" 
//         style={{
//           height: "100%",
//           width: "100%",
//           justifyContent: "center",
//           backgroundColor: "black",
//           alignItems: "center"
//         }} 
//         ref={this.videoContainer}
//       >
//         <video
//           className="shaka-video"
//           ref={this.videoComponent}
//           poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
//         />
//       </div>
//     );
//   }
// }

// export default React.forwardRef(VidPlayer);