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
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const VidPlayer = (props, ref) => {
  const videoRef = React.useRef();
  const videoContainer = React.useRef();
  const [player, setPlayer] = React.useState(null);
  const [ui, setUi] = React.useState(null);

  function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  function onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }

  useEffect(() => {
    if (videoRef.current && videoContainer.current) {
      const video = videoRef.current;
      const container = videoContainer.current;
      var player = new shaka.Player(video);
      const ui = new shaka.ui.Overlay(player, container, video);
      ui.getControls();
      setPlayer(player);
      setUi(ui);
      // Listen for error events.
      player.addEventListener("error", onErrorEvent);
      player
        .load(props.src)
        .then(function () {
          // This runs if the asynchronous load is successful.
          console.log("The video has now been loaded!");
        })
        .catch(onError);
    }
  }, [videoRef, videoContainer, props.src]);

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
    <div className="video-container" ref={videoContainer}>
      <video
        className="shaka-video"
        ref={videoRef}
        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
      />
    </div>
  );
};
//Creating class component
class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    //Creating reference to store video component on DOM
    this.videoComponent = React.createRef();

    //Creating reference to store video container on DOM
    this.videoContainer = React.createRef();

    //Initializing reference to error handlers
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }

  componentDidMount() {
    //Link to MPEG-DASH video
    // var manifestUri =
    //   "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

    //Getting reference to video and video container on DOM
    const video = this.videoComponent.current;
    const videoContainer = this.videoContainer.current;

    //Initialize shaka player
    var player = new shaka.Player(video);

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    ui.getControls();

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.props.src)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  render() {
    /*
		Returning video with a container. Remember, when setting up shaka player with custom UI, you must
		add your video component inside a container
		The container will be used by shaka player to add your customized UI for the player
		*/
    return (
      <div className="video-container" ref={this.videoContainer}>
        <video
          className="shaka-video"
          ref={this.videoComponent}
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
        />
      </div>
    );
  }
}

export default React.forwardRef(VidPlayer);