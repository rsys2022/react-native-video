var ProgressBar = require("progressbar.js");
var { resume_clock, pause_clock, setCountDownTime } = require("./timeUtil");

const stringToSec = (timeString) => {
  const arr = timeString.split(":");
  const seconds = arr[0] * 3600 + arr[1] * 60 + +arr[2];
  return seconds;
};

export class CustomAdsManager {
  constructor(adContainer, video, trackJson, eventList) {
    /** @private {HTMLElement} */
    this.adContainer_ = adContainer;
    this.progressContainer_ = this.initializeBar();
    /** @private {HTMLMediaElement} */
    this.video_ = video;

    this.timeJson = this.parseTrackingJSON(trackJson);
    this.eventJson = this.parseEventJson(trackJson);

    this.tracking_json_ = trackJson;

    this.eventStack = [];

    this.currentAdTime = null;
    this.initServerSideAws_ = this.initServerSideAws();
    this.dismiss_ = this.dismiss();
    this.myEvent = eventList.map((element) => {
      return new Event(element, {
        bubbles: true,
        cancelable: true,
        composed: false,
      });
    });
  }

  parseTrackingJSON(trackJson) {
    var trackAvails = [...trackJson.avails];
    var newData = {};

    trackAvails.forEach((element) => {
      element.ads.forEach((adElement) => {
        let data = adElement.trackingEvents.reduce(
          (previousObject, currentObject) => {
            const time = parseInt(currentObject.startTimeInSeconds);
            return Object.assign(previousObject, {
              [time]: {
                time,
                eventType: currentObject.eventType,
                beaconUrls: currentObject.beaconUrls,
                start: element.startTimeInSeconds,
                end: element.startTimeInSeconds + element.durationInSeconds,
                duration: element.durationInSeconds,
                skipOffset: stringToSec(adElement.skipOffset),
              },
            });
          },
          {}
        );
        newData = { ...newData, ...data };
      });
    });
    return newData;
  }

  parseEventJson(trackJson) {
    console.log("trackJson", trackJson);
    var trackAvails = [...trackJson.avails];
    var newData = {};

    trackAvails.forEach((element) => {
      element.ads.forEach((adElement) => {
        let data = adElement.trackingEvents.reduce(
          (previousObject, currentObject) => {
            const time = parseInt(currentObject.startTimeInSeconds);
            return Object.assign(previousObject, {
              [`${adElement.adId}_${currentObject.eventType}`]: {
                time,
                eventType: currentObject.eventType,
                beaconUrls: currentObject.beaconUrls,
                start: element.startTimeInSeconds,
                end: element.startTimeInSeconds + element.durationInSeconds,
                duration: element.durationInSeconds,
                skipOffset: stringToSec(adElement.skipOffset),
              },
            });
          },
          {}
        );
        newData = { ...newData, ...data };
      });
    });
    return newData;
  }

  alertBeacons(urls) {
    var promises = urls.map((url) => fetch(url, { method: "GET" }));
    Promise.all(promises)
      .then((results) => {
        console.log("results", results);
      })
      .catch((error) => console.log("erroe", error));
  }

  initializeBar() {
    let bar_ = new ProgressBar.Line("#ad-ui", {
      strokeWidth: 0.25,
      // easing: "li",
      duration: 1000,
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "100%", borderRadius: 5 },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: "#999",
          position: "absolute",
          right: "0",
          top: "30px",
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state, bar) => {
        // bar.setText(Math.round(bar.value() * 100) + " %");
      },
    });
    return bar_;
  }

  dismiss() {
    if (this.currentAdTime) {
      this.video_.pause();
      const skipEl = document.getElementById("skipAd");
      skipEl.style.display = "none";
      this.video_.currentTime = this.currentAdTime;
      let videoContainer = document.querySelector(".video-container");
      videoContainer.setAttribute("shaka-controls", "true");
      this.adContainer_.style.display = "none";
      const barUi = document.getElementById("ad-ui")
      if(barUi){
        barUi.style.display = "none";
      }
      this.progressContainer_.animate(0);
      this.video_.play();
    }
    return null;
  }

  initServerSideAws() {
    this.video_.addEventListener(
      "timeupdate",
      (e) => {
        const timeObj = this.timeJson;
        // const trackingAvail = [...this.tracking_json_.avails];
        let currentTime = parseInt(this.video_.currentTime);

        for (const time in timeObj) {
          if (Number(time) === currentTime) {
            /**
             * FOR TRACKING
             */
            const isEventFired = this.eventStack.findIndex(
              (x) => timeObj[time].time === x.time
            );

            if (isEventFired === -1) {
              const myEventFire = this.myEvent.findIndex(
                (x) => timeObj[time].eventType === x.type
              );
              if (myEventFire !== -1) {
                this.video_.dispatchEvent(this.myEvent[myEventFire]);
              }
              this.alertBeacons(timeObj[time].beaconUrls);

              this.eventStack.push({ ...timeObj[time], isPublished: false });
            }
          }
          /**
           * SHOW HIDE AD UI
           */
          let videoContainer = document.querySelector(".video-container");
          if (
            timeObj[time].start < currentTime &&
            currentTime < timeObj[time].end
          ) {
            if (videoContainer && videoContainer.getAttribute("shaka-controls") == "true") {
              // this.video_.controls = false;
              videoContainer.setAttribute("shaka-controls", "false")
              const barUi = document.getElementById("ad-ui")
              if(barUi){
                barUi.style.display = "block";
              }
              //start
              if (this.video_.paused) {
                setCountDownTime(currentTime - timeObj[time].start);
                this.video_.play();
              }
              //end
              if (parseInt(timeObj[time].end) !== currentTime) {
                const el = document.getElementById("pause");
                el.onclick = resume_clock(parseInt(timeObj[time].duration));
              }
            }
            if (
              parseInt(timeObj[time].start) +
                parseInt(timeObj[time].skipOffset) ===
              currentTime
            ) {
              const adTime = timeObj[time].duration;
              const skipTo = timeObj[time].start + adTime;
              this.currentAdTime = skipTo;
              const skipEl = document.getElementById("skipAd");
              skipEl.style.display = "block";
             
            }
            this.adContainer_.style.display = "block";
          
            const animateBar =
              (this.video_.currentTime - timeObj[time].start) /
              (timeObj[time].end - timeObj[time].start);
            this.progressContainer_.animate(animateBar);
          }
          if (parseInt(timeObj[time].end) === parseInt(currentTime)) {
            if (videoContainer && videoContainer.getAttribute("shaka-controls") == "false") {
              const skipEl = document.getElementById("skipAd");
              skipEl.style.display = "none";
              const barUi = document.getElementById("ad-ui")
              if(barUi){
                barUi.style.display = "none";
              }
              videoContainer.setAttribute("shaka-controls", "true");
              this.adContainer_.style.display = "none";
              this.progressContainer_.animate(0);
            }
          }
        }
      },
      false
    );

    this.video_.addEventListener(
      "pause",
      (e) => {
        this.dispatchActionEvents("pause", "paused");
        pause_clock();
      },
      false
    );
    this.video_.addEventListener(
      "play",
      (e) => {
        this.dispatchActionEvents("play", "played");
        resume_clock(10);
      },
      false
    );
    /**
     * ON MUTE UPDATE
     */
    this.video_.addEventListener(
      "volumechange",
      (e) => {
        if(this.video_.muted){
          console.log("i am muted");
          this.dispatchActionEvents("mute", "muted");
        }
      },
      false
    );
  }

  dispatchActionEvents(eventType, dispatchedEventType){
    let currentTime = parseInt(this.video_.currentTime);

    for (let val in this.eventJson) {

      if (this.eventJson[val].eventType === eventType) {
        if (
          this.eventJson[val].start < currentTime &&
          currentTime < this.eventJson[val].end
        ) {
          const myEventFire = this.myEvent.findIndex(
            (x) => x.type === dispatchedEventType
          );
          if (myEventFire !== -1) {
            this.video_.dispatchEvent(this.myEvent[myEventFire]);
          }
          this.alertBeacons(this.eventJson[val].beaconUrls);
        }
      }
    }
  }
}
