/**
 * old Code
 */
// import React, { useEffect } from "react";
// import "shaka-player/dist/controls.css";

// import { CustomAdsManager } from "./customAdManager/adManager";
// import shaka from "shaka-player/dist/shaka-player.ui.js";

// const eventList = [
//   "firstQuartile",
//   "midpoint",
//   "thirdQuartile",
//   "start",
//   "complete",
//   "paused",
//   "played",
//   "muted",
// ];

// const VidPlayer = (props, ref) => {
//   const videoRef = React.useRef();
//   const videoContainer = React.useRef();
//   const adUiRef = React.useRef(null);
//   const [player, setPlayer] = React.useState();
//   const [ui, setUi] = React.useState();
//   const [mutedState, setMute] = React.useState(props.muted);
//   const [val, setVal] = React.useState(null);
//   const [random, setRandom] = React.useState("asdadas");
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
//     if (props.trackingJson) {
//       const customAdManage = new CustomAdsManager(
//         adUiRef.current,
//         videoRef.current,
//         props.trackingJson,
//         eventList,
//       );
//       setVal(customAdManage);
//     }
//   }, [props.trackingJson]);



//   useEffect(() => {
//     if (videoRef.current && videoContainer.current) {
//       const video = videoRef.current;
//       const container = videoContainer.current;
//       var player = new shaka.Player(video);
//       setPlayer(player);
//       const ul = new shaka.ui.Overlay(player, container, video);
//       ul.getControls();
//       setUi(ul);
//       if (!props.controls) {
//         var videoContainerQuery = document.querySelector(".video-container");
//         videoContainerQuery.setAttribute("shaka-controls", "false");
//       }
     
//       // ui.setEnabled(false);
//       // Listen for error events.
//       videoRef.current.addEventListener("loadeddata", (e) => {
//         console.log("loaded url", e);
//         props.onLoaded(e);
//       });
//       player.addEventListener("error", onErrorEvent);
//       eventList.forEach((event) => {
//         videoRef.current.addEventListener(event, (e) => {
//           // toast(event);
//           console.log("event in player ::: ", e);
//         });
//       });
//       console.log("props.src", props.src)
//       player
//         .load(props.src)
//         .then(function () {
//           // This runs if the asynchronous load is successful.
//           console.log("The video has now been loaded!");
//         })
//         .catch(onError);
//       console.log("player", player);
//     }
//   }, [videoRef, videoContainer, props.src, props.controls]);

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
//     <div>
//       <div 
//         className="video-container" 
//         ref={videoContainer}
//         style={{
//           height: "100%",
//           width: "100%",
//           justifyContent: "center",
//           backgroundColor: "black",
//         }}
//       >
//         <video
//           className="shaka-video"
//           ref={videoRef}
          
//           onError={(error)=> console.log("video errt", error)}
//           // poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
//           autoPlay={props.autoPlay}
//         />
//       </div>
//       <div
//         ref={adUiRef}
//         style={{
//           position: "absolute",
//           zIndex: 100,
//           bottom: -2,
//           display: "none",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: "100%",
//           height: 1,
//           bottom: "10%"
//         }}
//         id="ad-ui-outer"
//       >
//         <div style={{ display: "flex" }}>
//           <div style={{ display: "flex", width: "50%", paddingLeft: "2%" }}>
//             <button
//               id="pause"
//               onClick={() => {
//                 if (videoRef.current.paused) {
//                   videoRef.current.play();
//                 } else {
//                   videoRef.current.pause();
//                 }
//               }}
//               style={{ display: "block" }}
//             >
//               Pause
//             </button>
//             <span
//               id={"ad-counter"}
//               style={{
//                 color: "white",
//                 marginBottom: 2,
//                 marginLeft: 10,
//                 width: "50%",
//               }}
//             ></span>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               // width: "50%",
//               marginLeft: "auto",
//               paddingRight: "2%",
//               // alignSelf: "revert",
//             }}
//           >
//             <button
//               id="skipAd"
//               style={{
//                 display: "none",
//               }}
//               onClick={() => {
//                 console.log("val", val.dismiss());
//                 // player.getAdManager().dismiss();
//               }}
//             >
//               SKIP AD
//             </button>
//           </div>
//         </div>
//       </div>
//       <div id="ad-ui" style={{
//           display: "none",
//            bottom: "5%", 
//            position: "absolute",
//           zIndex: 100,
//           width: "96%",
//           alignSelf: "center",
//           left: "2%",
//           right: "2%",
//           alignItems: "center",
//           justifyContent: "center",
//           height: 3,
//           }}></div>
//     </div>
//   );
// };

// export default React.forwardRef(VidPlayer);










/****
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * FRRROOOMMMM HERRRREEE NEWWWWW MEDIA TAILOR  with shaka code
 * 
 */


import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";
import { getAllResolutions, getAllLanguages } from "./utils";

// md MdSettings
function App(props, ref) {
  const videoRef = useRef(null);
  const videoContainerElementRef = useRef(null);
  const [player, setPlayer] = React.useState(null);
  const [volume, setVolume] = useState(props.muted ? 0 : 1);
  const [ui, setUi] = useState(false);
  const [resolutionList, setResolutionList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [textTrackList, setTextTrackList] = useState([]);
  const [isFullScreen, setFullScreenVisibility] = useState(false);

  const setSettingButton = () => {
    const SettingButton = class extends shaka.ui.Element {
      constructor(parent, controls) {
        super(parent, controls);

        // The actual button that will be displayed
        this.button_ = document.createElement("button");
        this.icon = document.createElement("img");
        this.button_.id = "settingButtonId";
        this.icon.src = require("../icons/settings.png");
        this.icon.width = 20;
        this.icon.height = 20;
        this.button_.appendChild(this.icon);
        this.parent.appendChild(this.button_);
      }
    };

    SettingButton.Factory = class {
      create(rootElement, controls) {
        return new SettingButton(rootElement, controls);
      }
    };

    shaka.ui.Controls.registerElement(
      "setting_menu",
      new SettingButton.Factory()
    );
  };

  async function initFun() {
    if (videoRef.current && videoContainerElementRef.current) {
      // When using the UI, the player is made automatically by the UI object.
      let video = videoRef.current;
      let videoContainerElement = videoContainerElementRef.current;

      const localPlayer = new shaka.Player();

      // const ui = video["ui"];
      const ui_ = new shaka.ui.Overlay(
        localPlayer,
        videoContainerElement,
        video
      );

      await localPlayer.attach(video);

      var config = {};
      setSettingButton();
      config["controlPanelElements"] = [
        // "spacer",
        // "skip",
        // "rewind",
        "play_pause",
        "spacer",
        "setting_menu",
        "spacer",
        "time_and_duration",
      ];
      ui_.configure(config);

      const controls = ui_.getControls();

      let player_ = controls.getPlayer();
      setUi(ui_);
      setPlayer(player_);
      videoRef.current.addEventListener("loadeddata", (e) => {
        console.log("loaded url", e);
        // props.onLoaded(e);
      });
      const url = "https://10368c5f41df4fb4b0689d2b90e2c7f2.mediatailor.us-west-2.amazonaws.com/v1/session/9a39c1f787063acfe5de4814e922e22605c1572d/single_ad/6fd21c05275845e2bb67f2a3ccac3605/3222cd28d72744cf86b09f568fa77418/dfadea49cd1647be8c684e1002969cad/index.mpd";
        // "https://b6d76811d0c6e6deca3d996b9ed217a8.egress.mediapackage-vod.us-west-2.amazonaws.com/out/v1/04da2d25b1414c18acf71878ef929a6c/9575008819084305a9d3a38026dbd2d2/71952b0df0f549f6b2916701c6d48cf3/index.mpd";
      // "https://e610299fd5864b5483cf4b764a5a2ff0.mediatailor.us-west-2.amazonaws.com/v1/session/9a39c1f787063acfe5de4814e922e22605c1572d/vod_june_24/04da2d25b1414c18acf71878ef929a6c/9575008819084305a9d3a38026dbd2d2/71952b0df0f549f6b2916701c6d48cf3/index.mpd";
      
      if (url.includes("mediatailor")) {
        const container = controls.getServerSideAdContainer(); //

        const netEngine = player_.getNetworkingEngine();
        const adManager = player_.getAdManager();
        adManager.initMediaTailor(container, netEngine, videoRef.current);
        adManager.addEventListener(shaka.ads.AdManager.AD_STARTED, () => {
          console.log("AWS Media Tailor: AD_STARTED");
          // let val = document.getElementsByClassName("shaka-ad-controls");
          // const skipButton = new shaka.ui.SkipAdButton(val[1], controls);
          // /**
          //  * ttt
          //  */
          // shaka.ui.Utils.setDisplay(skipButton, false);
          // // this.counter_.textContent = "";
          // // this.timer_.tickNow();
          // // this.timer_.tickEvery(0.5);
          // //shaka-ad-controls
          // // const skipButton = new shaka.ui.SkipAdButton(val, this);
          // // let try = document.getElementsByClassName("shaka-skip-ad-button");
          // console.log("try", skipButton);
        });

        adManager.addEventListener(shaka.ads.AdManager.AD_PAUSED, () => {
          console.log("AWS Media Tailor: AD_PAUSED");
        });

        adManager.addEventListener(shaka.ads.AdManager.AD_RESUMED, () => {
          console.log("AWS Media Tailor: AD_RESUMED");
        });

        adManager.addEventListener(shaka.ads.AdManager.AD_STOPPED, () => {
          console.log("AWS Media Tailor: AD_STOPPED");
        });

        const uri = await adManager.requestMediaTailorStream(url);
        player_.load(uri);
      } else {
        player_.load(url);
      }
    }
  }

  useEffect(() => {
    initFun();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (videoContainerElementRef.current) {
        const { innerWidth, innerHeight } = window;
        videoContainerElementRef.current.style.width = `${innerWidth}px`;
        videoContainerElementRef.current.style.height = `${innerHeight}px`;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


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
  

  useEffect(() => {
    if (document.getElementById("settingButtonId")) {
      document
        .getElementById("settingButtonId")
        .addEventListener("click", (e) => {
          const isSettingMenuView =
            document.getElementById("setting-menu-view");
          isSettingMenuView.style.display =
            isSettingMenuView.style.display === "none" ? "flex" : "none";
          if (resolutionList.length <= 0) {
            let resolutionList = getAllResolutions(player);
            setResolutionList(resolutionList);
          }
          if (languageList.length <= 0) {
            let langList = getAllLanguages(player);
            setLanguageList(langList);
          }
          if (textTrackList.length <= 0) {
            let captionList = player.getTextTracks();
            setTextTrackList(captionList);
          }
        });
    }
  }, [player]);

  function onResolutionSelection(element) {
    if (player) {
      let pList = player.getVariantTracks();
      const prevActiveEl = pList.find((findEl) => findEl.active);
      const newActiveEl = pList.find(
        (findEl) =>
          findEl.height === element.height &&
          findEl.language === prevActiveEl.language
      );
      let updatatedList = resolutionList.map((element) => {
        return {
          height: element.height,
          active: element.height === newActiveEl.height,
        };
      });
      player.configure({ abr: { enabled: false } });
      player.selectVariantTrack(newActiveEl, true);
      setResolutionList(updatatedList);
    }
  }

  function onLanguageSelection(element) {
    if (player) {
      let pList = player.getVariantTracks();
      const prevActiveEl = pList.find((findEl) => findEl.active);
      const newActiveEl = pList.find(
        (findEl) =>
          findEl.height === prevActiveEl.height &&
          findEl.language === element.language
      );
      let updatatedList = languageList.map((element) => {
        return {
          ...element,
          active: element.language === newActiveEl.language,
        };
      });
      player.configure({ abr: { enabled: false } });
      player.selectVariantTrack(newActiveEl, true);
      setLanguageList(updatatedList);
    }
  }

  async function onTextTrackChange(element) {
    if (player) {
      let captionList = player.getTextTracks();
      let updatedCapList = captionList.map((el) => {
        return {
          ...el,
          active: el.language === element.language,
        };
      });
      player.selectTextTrack(element);
      setTextTrackList(updatedCapList);
      await player.setTextTrackVisibility(true);
    }
  }

  return (
    <div
      ref={videoContainerElementRef}
      data-shaka-player-container
      data-shaka-player-cast-receiver-id="07AEE832"
      id="container"
    >
      <video 
        data-shaka-player
        id="video"
        ref={videoRef}
        height={"100%"}
        style={{ width: "100%", height: "100%" }}
        onError={(error)=> console.log("video errt", error)}
        autoPlay={props.autoPlay} 
      />
      <div id="up-conatiner" className="upper-controls display-flex">
        <div />
        <div className="header-container">
          <img
            alt={"volume-img"}
            src={
              volume
                ? require("../icons/volume_up.png")
                : require("../icons/mute_up.png")
            }
            width={24}
            height={24}
            style={{ tintColor: "white" }}
            className="vol-img"
          />
          <input
            type="range"
            className="slider-vol"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(event) => {
              videoRef.current.volume = event.target.valueAsNumber;
              setVolume(event.target.valueAsNumber);
            }}
          />
          <img
            alt={"full-screen-img"}
            src={
              !isFullScreen
                ? require("../icons/expand.png")
                : require("../icons/closeFullscreen.png")
            }
            width={24}
            height={24}
            className="expand-img"
            onClick={async () => {
              if (ui) {
                if (document.fullscreenElement == null) {
                  const fullScreenElement =
                    ui.getConfiguration().fullScreenElement;
                  await fullScreenElement.requestFullscreen({
                    navigationUI: "hide",
                  });
                  setFullScreenVisibility(true);
                } else {
                  await document.exitFullscreen();
                  setFullScreenVisibility(false);
                }
              }
            }}
          />
        </div>
      </div>
      <div
        id="setting-menu-view"
        className="setting-menu-container"
        style={{ display: "none" }}
      >
        <div className="closeContainer">
          <img
            alt="cancel-img"
            src={require("../icons/cancel.png")}
            width={24}
            height={24}
            id="close-settings"
            onClick={() => {
              document.getElementById("setting-menu-view").style.display =
                "none";
            }}
          />
        </div>
        <div id="language">
          <span className="setting-menu-label">Audio Language</span>
          <ul>
            {languageList.length > 0 &&
              languageList.map((element, index) => {
                return (
                  <li
                    key={`${element.language}`}
                    onClick={() => onLanguageSelection(element)}
                    className={`resoltution-item ${
                      element.active
                        ? "resoltution-active"
                        : "resoltution-inactive"
                    }`}
                    id={`li-${element.language}`}
                  >
                    {`${element.label}`}
                  </li>
                );
              })}
          </ul>
        </div>
        <div id="text-tracks">
          <span className="setting-menu-label">Subtitle</span>
          <ul>
            {textTrackList.length > 0 &&
              textTrackList.map((element, index) => {
                return (
                  <li
                    key={`${element.label}`}
                    onClick={() => onTextTrackChange(element)}
                    className={`resoltution-item ${
                      element.active
                        ? "resoltution-active"
                        : "resoltution-inactive"
                    }`}
                    id={`li-${element.language}`}
                  >
                    {`${element.label}`}
                  </li>
                );
              })}
          </ul>
        </div>
        <div id="resolution">
          <span className="setting-menu-label">Resolutions</span>
          <ul>
            {resolutionList.length > 0 &&
              resolutionList.map((element, index) => {
                return (
                  <li
                    key={`${index}-${element.height}`}
                    onClick={() => onResolutionSelection(element)}
                    className={`resoltution-item ${
                      element.active
                        ? "resoltution-active"
                        : "resoltution-inactive"
                    }`}
                    id={`li-${element.height}`}
                  >
                    {`${element.height}`}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(App)
