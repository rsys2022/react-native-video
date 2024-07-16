import React, { Component } from 'react';
import Video from './Video.App';
import ActionSheet from 'react-native-actions-sheet';
import {
	TouchableHighlight,
	ImageBackground,
	PanResponder,
	StyleSheet,
	Animated,
	SafeAreaView,
	Easing,
	Image,
	View,
	Text,
	Platform,
	TVEventHandler,
	Dimensions,
	Linking,
	Pressable
} from 'react-native';
import padStart from 'lodash/padStart';
import { ImageIcon, normalize, checkArrayAndElements, filterAndRemoveDuplicates } from './assets/Icon/icon';
import Modal from 'react-native-modal';
const lang = ['English', 'Dutch'];
import ActionSheets from './nativeCustomManager/actionSheet';
import { PercentageBar } from 'react-native-video/nativeCustomManager/progress';
import { FocusButton } from 'react-native-tv-selected-focus';
import { VolumeManager } from 'react-native-volume-manager';
import { useLockSpatialNavigation, SpatialNavigationNode, SpatialNavigationRoot, SpatialNavigationScrollView, SpatialNavigationView, DefaultFocus } from 'react-tv-space-navigation';
import { Button } from 'react-native-video/nativeCustomManager/buttons';
import { SubtitlesModal } from 'react-native-video/nativeCustomManager/modals/SubtitlesModal';
import { AddSkipModal } from 'react-native-video/nativeCustomManager/modals/addProgressBarModal';
// const { lock, unlock } = useLockSpatialNavigation();
const isWider=Platform.isTV || Platform.OS==='web';

export default class VideoPlayer extends Component {
	static defaultProps = {
		toggleResizeModeOnFullscreen: true,
		controlAnimationTiming: 500,
		doubleTapTime: 130,
		playInBackground: false,
		playWhenInactive: false,
		resizeMode: 'contain',
		isFullscreen: false,
		showOnStart: true,
		paused: false,
		repeat: false,
		muted: false,
		volume: 1,
		title: '',
		rate: 1,
		showTimeRemaining: true,
		showHours: false,
		control: false,
		onPlayer: false
	};

	constructor(props) {
		super(props);

		/**
		 * All of our values that are updated by the
		 * methods and listeners in this class
		 */
		this.state = {
			// Video
			resizeMode: this.props.resizeMode,
			paused: this.props.paused,
			muted: this.props.muted,
			volume: this.props.volume,
			rate: this.props.rate,
			video_source: this.props.source,
			// Controls

			isFullscreen:
				this.props.isFullScreen,
			showTimeRemaining: this.props.showTimeRemaining,
			showHours: this.props.showHours,
			volumeTrackWidth: 0,
			volumeFillWidth: 0,
			seekerFillWidth: 0,
			showControls: this.props.showOnStart,
			volumePosition: 0,
			seekerPosition: 0,
			volumeOffset: 0,
			seekerOffset: 0,
			seeking: false,
			originallyPaused: false,
			scrubbing: false,
			loading: false,
			currentTime: 0,
			error: false,
			duration: 0,
			audioTracks: [],
			textTracks: [],
			selectedAudioTrack: undefined,
			selectedTextTrack: undefined,
			setTvFocus: true,
			actionSheet: false,
			errorMessage: '',
			controls: this.props.control,
			isAdVisible: false,
			trackJson: this.props.trackingJson !== null && this.props.trackingJson !== undefined ? this.parseTrackingJson(this.props.trackingJson) : null,
			adMarkers: this.props.trackingJson !== null && this.props.trackingJson !== undefined ? this.getAdMarkersData(this.props.trackingJson) : null,
			eventJson: this.props.trackingJson !== null && this.props.trackingJson !== undefined ? this.parseEventJson(this.props.trackingJson) : null,
			showSkip: false,
			isAdSequence: 1,
			currentAd:1,
			skipTo: 0,
			adBar: 0,
			adDuration: 0,
			eventStack: [],
			adMarkerPercent: null,
			isSeeked: false,
			isSeekbarFocused: false,
			isBuffering: false,
			forwardBackwardCount: 0,
			fastForwardBackwardPosition: 0,
			adCompanionData: null,
			isModalVisible: false,//for add control
		};

    this.setIsModalVisible = this.setIsModalVisible.bind(this);
		/**
		 * Any options that can be set at init.
		 */
		this.opts = {
			playWhenInactive: this.props.playWhenInactive,
			playInBackground: this.props.playInBackground,
			repeat: this.props.repeat,
			title: this.props.title,
		};

		/**
		 * Our app listeners and associated methods
		 */
		this.tvEventHandler = Platform.isTV ? new TVEventHandler() : null;
		this.events = {
			onError: this.props.onError || this._onError.bind(this),
			onBack: this.props.onBack || this._onBack.bind(this),
			onEnd: this.props.onEnd || this._onEnd.bind(this),
			onScreenTouch: this._onScreenTouch.bind(this),
			onEnterFullscreen: this.props.onEnterFullscreen,
			onExitFullscreen: this.props.onExitFullscreen,
			onShowControls: this.props.onShowControls,
			onHideControls: this.props.onHideControls,
			onLoadStart: this._onLoadStart.bind(this),
			onProgress: this._onProgress.bind(this),
			onSeek: this._onSeek.bind(this),
			onLoad: this._onLoad.bind(this),
			onPause: this.props.onPause,
			onPlay: this.props.onPlay,
			onBuffer: this._onBuffer.bind(this),
		};

		/**
		 * Functions used throughout the application
		 */
		this.methods = {
			toggleFullscreen: this._toggleFullscreen.bind(this),
			togglePlayPause: this._togglePlayPause.bind(this),
			toggleControls: this._toggleControls.bind(this),
			toggleTimer: this._toggleTimer.bind(this),
		};

		/**
		 * Player information
		 */
		this.player = {
			controlTimeoutDelay: this.props.controlTimeout || 15000,
			volumePanResponder: PanResponder,
			seekPanResponder: PanResponder,
			controlTimeout: null,
			tapActionTimeout: null,
			volumeWidth: 150,
			iconOffset: 0,
			seekerWidth: 0,
			ref: Video,
			scrubbingTimeStep: this.props.scrubbing || 0,
			tapAnywhereToPause: this.props.tapAnywhereToPause,
		};

		/**
		 * Various animations
		 */
		const initialValue = this.props.showOnStart ? 1 : 0;

		this.animations = {
			bottomControl: {
				marginBottom: new Animated.Value(0),
				opacity: new Animated.Value(initialValue),
			},
			topControl: {
				marginTop: new Animated.Value(0),
				opacity: new Animated.Value(initialValue),
			},
			video: {
				opacity: new Animated.Value(1),
			},
			loader: {
				rotate: new Animated.Value(0),
				MAX_VALUE: 360,
			},
		};

		/**
		 * Various styles that be added...
		 */
		this.styles = {
			videoStyle: this.props.videoStyle || {},
			containerStyle: this.props.style || {},
		};
		// this.ActionSheetRef = React.createRef();

		this.volumeListener = null
	}


	setIsModalVisible(isVisible) {
		let state = this.state;
		state.isModalVisible=isVisible;
		this.setState(state);
	  }
	lockSpatialNavigation() {
		// const { lock } = useLockSpatialNavigation();
		// lock();
	  }
	
	  unlockSpatialNavigation() {
		// const { unlock } = useLockSpatialNavigation();
		// unlock();
	  }

	onTVRemoteEvent = (cmp, evt) => {
		if (evt && evt.eventType === 'right') {
			if(this.state.isSeekbarFocused){
				this.player.ref.seek(this.state.currentTime + 10)
			}
		}   else if (evt && evt.eventType === 'longRight') {
			if (this.state.isSeekbarFocused) {
				this.setState((prevState) => ({
					...prevState,
					paused: true,
					forwardBackwardCount: this.state.forwardBackwardCount + 10,
					fastForwardBackwardPosition: ((this.state.currentTime + 10) / this.state.duration) * this.player.seekerWidth,
					seekerFillWidth:((this.state.currentTime + 10) / this.state.duration) * this.player.seekerWidth,
					currentTime:(this.state.currentTime + 10),
				}))
				}
		}  else if (evt && evt.eventType === 'left') {
			if(this.state.isSeekbarFocused){
				this.player.ref.seek(this.state.currentTime>10 ?this.state.currentTime - 10:0)
			}
		} else if (evt && evt.eventType === 'longLeft') {
			if (this.state.isSeekbarFocused) {
				this.setState((prevState) => ({
					...prevState,
					paused: true,
					forwardBackwardCount: this.state.forwardBackwardCount - 10,
					fastForwardBackwardPosition: ((this.state.currentTime>10 ?this.state.currentTime - 10:0) / this.state.duration) * this.player.seekerWidth,
					seekerFillWidth:((this.state.currentTime>10 ?this.state.currentTime - 10:0) / this.state.duration) * this.player.seekerWidth,
					currentTime:(this.state.currentTime>10 ?this.state.currentTime - 10:0),
				}))
			}

		} else if (evt && evt.eventType === 'select') {
		    console.log('Select/OK button pressed on TV remote.');
			if (!this.state.showControls) {
				// this.methods.toggleControls();
				this.showControlAnimation();
				this.setControlTimeout();
				this.setState({
					showControls:true
				})
			}
		  
		} else if (evt && evt.eventType === 'down') {
			console.log('down tv player');
			if(this.state.isSeekbarFocused){
				this.setState((prevState)=> ({...prevState, isSeekbarFocused: false}))
			}
		} else if (evt && evt.eventType === 'up') {
			console.log('up tv player');
			// if(this.state.isSeekbarFocused){
			// 	this.setState((prevState)=> ({...prevState, isSeekbarFocused: false}))
			// }
		}
		// Add more cases to handle other remote control events as needed
	  };

	componentDidUpdate = prevProps => {
		const { isFullscreen } = this.props;

		if (prevProps.isFullscreen !== isFullscreen) {
			this.setState({
				isFullscreen,
			});
		}
		
	};
	
	  _disableTVEventHandler() {
		if (this.tvEventHandler) {
		  this.tvEventHandler.disable();
		  delete this.tvEventHandler;
		}
	  }


	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.trackingJson !== nextProps.trackingJson  ) {
			const trackingJson = this.parseTrackingJson(nextProps.trackingJson)
			const eventJson = this.parseEventJson(nextProps.trackingJson)
			const adMarkers = this.getAdMarkersData(nextProps.trackingJson)
			let adMarkerPercent = null
			// console.log("hii", this.state.duration)
			if(this.state.duration){
				// console.log("hii  222 ", this.state.duration)
				adMarkerPercent = this.calculateAdMarkerPosition(this.state.duration, adMarkers)
			}
			// console.log("hii", adMarkerPercent, adMarkers)

			this.setState((prevState)=>({
				...prevState,
				trackJson: trackingJson,
				eventJson: eventJson,
				adMarkerPercent: adMarkerPercent,
				adMarkers: adMarkers
			}))
			return true
		} else if (this.state !== nextState) {
			return true
		} else {
			return false
		}

	}




	getAdMarkersData = (trackList) => {
		// console.log("trackList sdsds ===>  ", trackList.avails);
		let adTimeArray = []
		trackList.avails.map((value)=> {
			adTimeArray.push({startTimeInSeconds:  value.startTimeInSeconds, durationInSeconds: value.durationInSeconds})
		})
		console.log("adTimeArray sdsds ===>  ", adTimeArray);

		return [...adTimeArray];
	}


	parseTrackingJson = (trackList) => {
		// console.log("trackList", trackList)
		if(trackList === null){
			return null
		}
		var trackAvails = [...trackList.avails];
		var newData = {};

		trackAvails.forEach((element) => {
			element.ads.forEach((adElement, id) => {
				let data = adElement.trackingEvents.reduce(
					(previousObject, currentObject) => {
						const time = parseInt(currentObject.startTimeInSeconds);
						const isAdCompanion = adElement.companionAds && adElement.companionAds.length >0;
						return Object.assign(previousObject, {
							[time]: {
								time: currentObject.startTimeInSeconds,
								eventType: currentObject.eventType,
								beaconUrls: currentObject.beaconUrls,
								start: adElement.startTimeInSeconds,
								end: adElement.startTimeInSeconds + adElement.durationInSeconds,
								isSequence: element.ads.length,
								id,
								// startAd: adElement.startTime,
								// endAd: adElement.startTimeInSeconds + adElement.durationInSeconds,
								// durationAd: adElement.durationInSeconds,
								duration: adElement.durationInSeconds,
								skipOffset: this.stringToSec(adElement.skipOffset),
								/*** companion ads */
								is_companion_ad: isAdCompanion,
								static_resource: isAdCompanion ? adElement.companionAds[0].staticResource : "",
								height: isAdCompanion ? adElement.companionAds[0].attributes.height: 0 ,
								width: isAdCompanion ? adElement.companionAds[0].attributes.width : 0,
								companionClickThrough: isAdCompanion ? adElement.companionAds[0].companionClickThrough: "",
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

	parseEventJson = (trackList) => {
		var trackAvails = [...trackList.avails];
		var newData = {};

		trackAvails.forEach((element) => {
			element.ads.forEach((adElement) => {
				let data = adElement.trackingEvents.reduce(
					(previousObject, currentObject) => {
						const time = parseInt(currentObject.startTimeInSeconds);
						return Object.assign(previousObject, {
							[`${adElement.adId}_${currentObject.eventType}`]: {
								time: currentObject.startTimeInSeconds,
								eventType: currentObject.eventType,
								beaconUrls: currentObject.beaconUrls,
								start: element.startTimeInSeconds,
								end: element.startTimeInSeconds + element.durationInSeconds,
								duration: element.durationInSeconds,
								skipOffset: this.stringToSec(adElement.skipOffset),
								eventId: `${adElement.adId}_${currentObject.eventType}`
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



	/**
	  | -------------------------------------------------------
	  | Events
	  | -------------------------------------------------------
	  |
	  | These are the events that the <Video> component uses
	  | and can be overridden by assigning it as a prop.
	  | It is suggested that you override onEnd.
	  |
	  */

	/**
	 * When load starts we display a loading icon
	 * and show the controls.
	 */
	_onLoadStart() {
		let state = this.state;
		state.loading = true;
		this.loadAnimation();
		this.setState(state);

		if (typeof this.props.onLoadStart === 'function') {
			this.props.onLoadStart(...arguments);
		}
	}

	/**
	 * When load is finished we hide the load icon
	 * and hide the controls. We also set the
	 * video duration.
	 *
	 * @param {object} data The video meta data
	 */
	_onLoad(data = {}) {
		try {
			let state = this.state;
			if (this.props.onPlayer) {
				this.onAudioTracks(data);
				this.onTextTracks(data);
				this.onVideoTracks(data);
			}
			
			state.duration = data.duration;
			// console.log("this.state.duration assss", data.duration, state.adMarkers)
			state.adMarkerPercent = this.calculateAdMarkerPosition(data.duration)
			state.loading = false;
			this.setState(state);

			if (state.showControls) {
				this.setControlTimeout();
			}

			if (typeof this.props.onLoad === 'function') {
				this.props.onLoad(...arguments);
			}
		} catch (error) {
			console.log('Error on Load-', error)
		}

	}


	alertBeacons(urls) {
		if (urls[0] === "") {
			return null
		}
		var promises = urls.map((url) => fetch(url, { method: "GET" }));
		Promise.all(promises)
			.then((results) => {
				// console.log("results", results);
				return { response: results, error: {} }
			})
			.catch((error) => {
				return { response: {}, error: error }
			});
	}

	/**
	 * Buffer check
	 * @param {*} timeString 
	 * @returns 
	 */

	_onBuffer(bufferData){
		this.setState((prevState) => ({ ...prevState, isBuffering: bufferData.isBuffering }))
		console.log("bufferData --- ", bufferData)
		if (!bufferData.isBuffering) {
			this.setState({
				forwardBackwardCount: 0
			})
		}

	}

	/**
 * SHOWING AD UI 
 */

	stringToSec = (timeString) => {
		const arr = timeString.split(":");
		const seconds = arr[0] * 3600 + arr[1] * 60 + +arr[2];
		return seconds;
	};

	_onProgressAds(data) {
		// console.log("his.state.trackJson",this.state.trackJson)
		if (this.state.trackJson === null) {
			return;
		}
		const timeObj = this.state.trackJson;
		let state = this.state;
		// const trackingAvail = [...this.tracking_json_.avails];
		const currentTime = state.isSeeked ? parseInt(this.state.currentTime) : parseInt(data.currentTime);
		// if(state.seeking){
		// 	currentTime = parseInt(data.currentTime)
		// } else if(this.state.currentTime > data.currentTime) {
		// 	currentTime = parseInt(this.state.currentTime)
		// }else {
		// 	currentTime = parseInt(data.currentTime)
		// }
		// const currentTime = parseInt(this.state.currentTime > data.currentTime ? this.state.currentTime : data.currentTime);
		for (const time in timeObj) {
			if (
				timeObj[time].start <= currentTime &&
				currentTime < timeObj[time].end
			) {
				// console.log("time" , time,currentTime,  time === currentTime ? "yes" : "")
				// console.log("time" ,typeof time, typeof currentTime)
				if (Number(time) === currentTime) {
					// let eventType = timeObj[time].eventType;
					// console.log("eventType", eventType)
					let isIncluded = state.eventStack.includes(timeObj[time].eventType);
					if (!isIncluded) {
						state.eventStack = [...state.eventStack, timeObj[time].eventType];
						const apiResult = this.alertBeacons(timeObj[time].beaconUrls);
					}
				}
				/** is ad companion start */
				if(state.adCompanionData === null && timeObj[time].is_companion_ad){
					state.adCompanionData =   timeObj[time].is_companion_ad ? {
						static_resource: timeObj[time].static_resource,
						height: parseInt(timeObj[time].height),
						width: parseInt(timeObj[time].width),
						companionClickThrough: timeObj[time].companionClickThrough
					}  : null
				}
				
				/** is ad companion end*/
				state.adDuration = ((parseInt(timeObj[time].duration) + timeObj[time].start) - currentTime)
				state.adBar = (currentTime - timeObj[time].start) / (timeObj[time].end - timeObj[time].start);
				state.isAdSequence = timeObj[time].isSequence;
				state.currentAd = timeObj[time].id+1;
				// this.setState({ adDuration:  (parseInt(timeObj[time].duration) - currentTime)*1000})
				if (!this.state.isAdVisible) {
					// this.setState({isAdVisible: true})
					state.isAdVisible = true

					state.controls = false
					state.isModalVisible=true
					// console.log("timeObj[time].start", timeObj[time].start, this.state.isAdVisible)
					// adDuration = timeObj[time].start + parseInt(timeObj[time].duration)
				}
				if (
					parseInt(timeObj[time].start) +
					parseInt(timeObj[time].skipOffset) <=
					currentTime && currentTime < parseInt(timeObj[time].end)
				) {

					const skipTo = timeObj[time].start + timeObj[time].duration;
					this.currentAdTime = skipTo;
					state.skipTo = skipTo
					state.showSkip = true
				}

			}
			if (parseInt(timeObj[time].end) === currentTime) {
				if(state.isAdSequence > 1 && state.currentAd !== state.isAdSequence){
					state.skipTo = 0
					state.showSkip = false
					state.adDuration = 0
					state.adCompanionData = null
					state.eventStack = []
				}
				else {
					state.isAdVisible = false
					state.isModalVisible=false
					state.adDuration = 0
					state.adBar = 0
					state.skipTo = 0
					state.showSkip = false
					state.eventStack = []
					state.controls = true
					state.adCompanionData = null
					state.currentAd = 0 
				}
				
			}

		}

		

		this.setState(state)
	}



	/**
	 * For onprogress we fire listeners that
	 * update our seekbar and timer.
	 *
	 * @param {object} data The video meta data
	 */
	_onProgress(data = {}) {
		let state = this.state;

		if (!state.scrubbing) {
			this._onProgressAds(data);
			// console.log("seeking ", state.isSeeked, this.state.currentTime, data.currentTime  )
			// state.currentTime = data.currentTime
			// if(state.seeking){
			// 	// console.log("seeking ", state.seeking, this.state.currentTime, data.currentTime  )
			// 	state.currentTime = data.currentTime
			// } else  {
			// 	state.currentTime = this.state.currentTime > data.currentTime ? this.state.currentTime : data.currentTime
			// }
			state.currentTime = state.isSeeked ? this.state.currentTime : data.currentTime;
			if (!state.seeking) {
				const position = this.calculateSeekerPosition();
				this.setSeekerPosition(position);
			}

			if (typeof this.props.onProgress === 'function') {
				this.props.onProgress(...arguments);
			}

			this.setState(state);
		}
	}

	/**
	 * For onSeek we clear scrubbing if set.
	 *
	 * @param {object} data The video meta data
	 */
	_onSeek(data = {}) {
		// console.log("stataa", data)
		let state = this.state;
		if (state.scrubbing) {
			state.scrubbing = false;
			state.currentTime = data.currentTime;

			// Seeking may be false here if the user released the seek bar while the player was still processing
			// the last seek command. In this case, perform the steps that have been postponed.
			if (!state.seeking) {
				this.setControlTimeout();
				state.paused = state.originallyPaused;
			}

			this.setState(state);
		}
	}

	onAudioTracks = (data) => {
		let state = this.state;
	

		state.audioTracks = filterAndRemoveDuplicates(data.audioTracks, 'language');
		
		state.selectedAudioTrack = {
			type: 'language',
			value: state.audioTracks[0]?.language,
		}
		// }
		this.setState(state);
	};

	_onChangeAudio = item => {
		// console.log('selectedAudioTrack----------', item.language);
		this.setState(
			{
				selectedAudioTrack: {
					type: 'language',
					value: item.language,
				},
				setTvFocus: true
			},
			() => {
				// console.log(
				// 	'selectedAudioTrack updated ---',
				// 	this.state.selectedAudioTrack,
				// );
			},
		);
		// this.ActionSheetRef.current?.hide();
	};

	_onChangeText = item => {
		this.setState(
			{
				selectedTextTrack: {
					type: 'language',
					value: item.language,
				},
				setTvFocus: true
			},
			() => {
				// console.log(this.state.setTvFocus, '---TextTrack updated ---', this.state.selectedTextTrack);
			},
		);
		// this.ActionSheetRef.current?.hide();
	};

	_onChangeVideoBitrate = item => {
        // console.log('onVideo TrackChange----------', item);
        const selectedTrack = item.type ==="resolution" ? {
            type: item.type, // "auto" || "resolution"
            value: item.value, // height
        } : {
            type: item.type,
        };
        if(Platform.OS === "ios"){
            this.setState({
                bitRateSelected: item.bandwidth
            })
        } else {
            this.setState(
                {
                    selectedVideoTracks: selectedTrack,
                    setTvFocus: true
                },
            );
        }
        
    };

	onTextTracks = (data) => {

		let state = this.state;
		// const selectedTrack = data.textTracks?.find((x: any) => {
		// 	return x.selected;
		// });
		state.textTracks = [{
			index: 25, language: "Off", title: "nil", type: "disable"
		}, ...filterAndRemoveDuplicates(data.textTracks, 'language')];
		// console.log('Text Data------', data.textTracks)
		
		state.selectedTextTrack = {
			index: 25, language: "Off", title: "nil", type: "disable", value: 'Off'
		}

		// console.log('Text Data------', data.textTracks)
		// state.selectedTextTrack = {
		// 	type: 'disable',
		// 	value: 'Off',
		// }

		this.setState(state);
	};

	onTextTracksOff = () => {
		let state = this.state;
		state.selectedTextTrack = {
			type: 'disabled',
			value: 'Off',
		}
		this.setState(state);
		//   this.ActionSheetRef.current?.hide();
	}

	onVideoTracks = (data) => {
        if(Platform.OS === "ios"){
            return;
        }
        let state = this.state;
        const unique = data.videoTracks.filter((obj, index) => {
            return index === data.videoTracks.findIndex(o => obj.height === o.height);
        });
        const updatedTrack = unique.map((item)=> {
            return {
              type: "resolution",
              value: item.height,
              ...item
            }
        })
        const sortedTrack = updatedTrack.sort((a, b) => {
            return b.value - a.value;
        });
        // console.log("sortedTrack",sortedTrack)
        state.videoTracks =  [ {
            type: "auto",
            value: 'Auto',
        }, ...sortedTrack]

        this.setState(state);
    }

	/**
	 * It is suggested that you override this
	 * command so your app knows what to do.
	 * Either close the video or go to a
	 * new page.
	 */
	_onEnd() { }

	/**
	 * Set the error state to true which then
	 * changes our renderError function
	 *
	 * @param {object} err  Err obj returned from <Video> component
	 */
	_onError(err) {
		console.log('##err---', err)
		let state = this.state;
		state.errorMessage = err?.error?.localizedFailureReason || err?.error?.localizedDescription || 'Video not available'
		state.error = true;
		state.loading = false;

		this.setState(state);
	}

	/**
	 * This is a single and double tap listener
	 * when the user taps the screen anywhere.
	 * One tap toggles controls and/or toggles pause,
	 * two toggles fullscreen mode.
	 */
	_onScreenTouch() {
		if (this.player.tapActionTimeout) {
			clearTimeout(this.player.tapActionTimeout);
			this.player.tapActionTimeout = 0;
			this.methods.toggleFullscreen();
			const state = this.state;
			if (state.showControls) {
				this.resetControlTimeout();
			}
		} else {
			this.player.tapActionTimeout = setTimeout(() => {
				const state = this.state;
				if (this.player.tapAnywhereToPause && state.showControls) {
					this.methods.togglePlayPause();
					this.resetControlTimeout();
				} else {
					this.methods.toggleControls();
				}
				this.player.tapActionTimeout = 0;
			}, this.props.doubleTapTime);
		}
	}

	/**
	  | -------------------------------------------------------
	  | Methods
	  | -------------------------------------------------------
	  |
	  | These are all of our functions that interact with
	  | various parts of the class. Anything from
	  | calculating time remaining in a video
	  | to handling control operations.
	  |
	  */

	/**
	 * Set a timeout when the controls are shown
	 * that hides them after a length of time.
	 * Default is 15s
	 */
	setControlTimeout() {
		this.player.controlTimeout = setTimeout(() => {
			this._hideControls();
		}, this.player.controlTimeoutDelay);
	}

	/**
	 * Clear the hide controls timeout.
	 */
	clearControlTimeout() {
		clearTimeout(this.player.controlTimeout);
	}

	/**
	 * Reset the timer completely
	 */
	resetControlTimeout() {
		this.clearControlTimeout();
		this.setControlTimeout();
	}

	/**
	 * Animation to hide controls. We fade the
	 * display to 0 then move them off the
	 * screen so they're not interactable
	 */
	hideControlAnimation() {
		Animated.parallel([
			Animated.timing(this.animations.topControl.opacity, {
				toValue: 0,
				duration: this.props.controlAnimationTiming,
				useNativeDriver: false,
			}),
			Animated.timing(this.animations.topControl.marginTop, {
				toValue: -100,
				duration: this.props.controlAnimationTiming,
				useNativeDriver: false,
			}),
			Animated.timing(this.animations.bottomControl.opacity, {
				toValue: 0,
				duration: this.props.controlAnimationTiming,
				useNativeDriver: false,
			}),
			Animated.timing(this.animations.bottomControl.marginBottom, {
				toValue: -100,
				duration: this.props.controlAnimationTiming,
				useNativeDriver: false,
			}),
		]).start();
	}

	/**
	 * Animation to show controls...opposite of
	 * above...move onto the screen and then
	 * fade in.
	 */
	showControlAnimation() {
		Animated.parallel([
			Animated.timing(this.animations.topControl.opacity, {
				toValue: 1,
				useNativeDriver: false,
				duration: this.props.controlAnimationTiming,
			}),
			Animated.timing(this.animations.topControl.marginTop, {
				toValue: 0,
				useNativeDriver: false,
				duration: this.props.controlAnimationTiming,
			}),
			Animated.timing(this.animations.bottomControl.opacity, {
				toValue: 1,
				useNativeDriver: false,
				duration: this.props.controlAnimationTiming,
			}),
			Animated.timing(this.animations.bottomControl.marginBottom, {
				toValue: 0,
				useNativeDriver: false,
				duration: this.props.controlAnimationTiming,
			}),
		]).start();
	}

	/**
	 * Loop animation to spin loader icon. If not loading then stop loop.
	 */
	loadAnimation() {
		if (this.state.loading) {
			Animated.sequence([
				Animated.timing(this.animations.loader.rotate, {
					toValue: this.animations.loader.MAX_VALUE,
					duration: 1500,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
				Animated.timing(this.animations.loader.rotate, {
					toValue: 0,
					duration: 0,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			]).start(this.loadAnimation.bind(this));
		}
	}

	/**
	 * Function to hide the controls. Sets our
	 * state then calls the animation.
	 */
	_hideControls() {
		// console.log('mounted----', this.mounted, 'showControls----', this.state.showControls)
		if (this.mounted) {
			let state = this.state;
			state.showControls = false;
			this.hideControlAnimation();
			typeof this.events.onHideControls === 'function' &&
				this.events.onHideControls();

			this.setState(state);
		}
	}

	/**
	 * Function to toggle controls based on
	 * current state.
	 */
	_toggleControls() {
		let state = this.state;
		state.showControls = !state.showControls;

		if (state.showControls) {
			this.showControlAnimation();
			this.setControlTimeout();
			typeof this.events.onShowControls === 'function' &&
				this.events.onShowControls();
		} else {
			this.hideControlAnimation();
			this.clearControlTimeout();
			typeof this.events.onHideControls === 'function' &&
				this.events.onHideControls();
		}

		this.setState(state);
	}

	/**
	 * Toggle fullscreen changes resizeMode on
	 * the <Video> component then updates the
	 * isFullscreen state.
	 */
	_toggleFullscreen() {
		let state = this.state;

		state.isFullscreen = !state.isFullscreen;

		if (this.props.toggleResizeModeOnFullscreen) {
			state.resizeMode = state.isFullscreen === true ? 'cover' : 'contain';
		}

		if (state.isFullscreen) {
			typeof this.events.onEnterFullscreen === 'function' &&
				this.events.onEnterFullscreen();
		} else {
			typeof this.events.onExitFullscreen === 'function' &&
				this.events.onExitFullscreen();
		}

		this.setState(state);
	}

	/**
	 * Toggle playing state on <Video> component
	 */
	_togglePlayPause() {
		let state = this.state;
		state.paused = !state.paused;

		if (state.paused) {
			typeof this.events.onPause === 'function' && this.events.onPause();
		} else {
			typeof this.events.onPlay === 'function' && this.events.onPlay();
			if (this.state.forwardBackwardCount) {
				this.player.ref.seek(this.state.currentTime)
				this.setState({
					seekerPosition: this.state.fastForwardBackwardPosition
				})
			}
		}

		this.setState(state);
	}

	/**
	 * Toggle between showing time remaining or
	 * video duration in the timer control
	 */
	_toggleTimer() {
		let state = this.state;
		state.showTimeRemaining = !state.showTimeRemaining;
		this.setState(state);
	}

	/**
	 * The default 'onBack' function pops the navigator
	 * and as such the video player requires a
	 * navigator prop by default.
	 */
	_onBack() {
		this.props.goBack();
		// if (this.props.navigator && this.props.navigator.pop) {
		//   this.props.navigator.pop();
		// } else {
		//   console.warn(
		//     'Warning: _onBack requires navigator property to function. Either modify the onBack prop or pass a navigator prop',
		//   );
		// }
	}

	/**
	 * Calculate the time to show in the timer area
	 * based on if they want to see time remaining
	 * or duration. Formatted to look as 00:00.
	 */
	calculateTime() {
		if (this.state.showTimeRemaining) {
			const time = this.state.duration - this.state.currentTime;
			return `-${this.formatTime(time)}`;
		}

		return this.formatTime(this.state.currentTime);
	}

	/**
	 * Format a time string as mm:ss
	 *
	 * @param {int} time time in milliseconds
	 * @return {string} formatted time string in mm:ss format
	 */
	formatTime(time = 0) {
		const symbol = this.state.showRemainingTime ? '-' : '';
		time = Math.min(Math.max(time, 0), this.state.duration);

		if (!this.state.showHours) {
			const formattedMinutes = padStart(Math.floor(time / 60).toFixed(0), 2, 0);
			const formattedSeconds = padStart(Math.floor(time % 60).toFixed(0), 2, 0);

			return `${symbol}${formattedMinutes}:${formattedSeconds}`;
		}

		const formattedHours = padStart(Math.floor(time / 3600).toFixed(0), 2, 0);
		const formattedMinutes = padStart(
			(Math.floor(time / 60) % 60).toFixed(0),
			2,
			0,
		);
		const formattedSeconds = padStart(Math.floor(time % 60).toFixed(0), 2, 0);

		return `${symbol}${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}

	/**
	 * Set the position of the seekbar's components
	 * (both fill and handle) according to the
	 * position supplied.
	 *
	 * @param {float} position position in px of seeker handle}
	 */
	setSeekerPosition(position = 0) {
		let state = this.state;
		position = this.constrainToSeekerMinMax(position);

		state.seekerFillWidth = position;
		state.seekerPosition = position;

		if (!state.seeking) {
			state.seekerOffset = position;
		}

		this.setState(state);
	}

	/**
	 * Constrain the location of the seeker to the
	 * min/max value based on how big the
	 * seeker is.
	 *
	 * @param {float} val position of seeker handle in px
	 * @return {float} constrained position of seeker handle in px
	 */
	constrainToSeekerMinMax(val = 0) {
		if (val <= 0) {
			return 0;
		} else if (val >= this.player.seekerWidth) {
			return this.player.seekerWidth;
		}
		return val;
	}

	/**
	 * Calculate the position that the seeker should be
	 * at along its track.
	 *
	 * @return {float} position of seeker handle in px based on currentTime
	 */
	calculateSeekerPosition() {
		const percent = this.state.currentTime / this.state.duration;
		return this.player.seekerWidth * percent;
	}

	calculateAdMarkerPosition =(duration, adMarker = this.state.adMarkers) =>{
		if(adMarker === null || adMarker.length <= 0)
		{
			return [];
		}
		let adMarkerArray = [...adMarker].map((element)=> {
			return {value: (element.startTimeInSeconds / duration)* 100, 
				adDuration:  
				((element.durationInSeconds) / duration)* 100};
		})
		return [...adMarkerArray]
	}


	/**
	 * Return the time that the video should be at
	 * based on where the seeker handle is.
	 *
	 * @return {float} time in ms based on seekerPosition.
	 */
	calculateTimeFromSeekerPosition() {
		const percent = this.state.seekerPosition / this.player.seekerWidth;
		return this.state.duration * percent;
	}

	/**
	 * Seek to a time in the video.
	 *
	 * @param {float} time time to seek to in ms
	 */
	seekTo(time = 0) {
		if (this.state.isAdVisible) {
			this.setState((prevState) => ({
				...prevState,
				isAdVisible: false,
				isModalVisible:false,
				adDuration: 0,
				adBar: 0,
				skipTo: 0,
				showSkip: false,
				eventStack: [],
				controls: true,
				currentTime: time,
				isSeeked: true,
			}), () => {
				this.player.ref.seek(time);
				setTimeout(() => {
					this.setState({ isSeeked: false })
				}, 1000)
			})

		} else {
			console.log('currentTime: time', this.state.currentTime, time)
			// this.player.ref.seek(time);
			this.setState((prevState) => ({
				...prevState,
				currentTime: time,
				isSeeked: true,
			}), () => {
				console.log('currentTime: time after update', this.state.currentTime, time)
				this.player.ref.seek(time);
				setTimeout(() => {
					this.setState({ isSeeked: false })
				}, 1000)
			})
		}
	}

	/**
	 * Set the position of the volume slider
	 *
	 * @param {float} position position of the volume handle in px
	 */
	setVolumePosition(position = 0) {
		let state = this.state;
		position = this.constrainToVolumeMinMax(position);
		state.volumePosition = position + this.player.iconOffset;
		state.volumeFillWidth = position;

		state.volumeTrackWidth = this.player.volumeWidth - state.volumeFillWidth;

		if (state.volumeFillWidth < 0) {
			state.volumeFillWidth = 0;
		}

		if (state.volumeTrackWidth > 150) {
			state.volumeTrackWidth = 150;
		}

		this.setState(state);
	}

	/**
	 * Constrain the volume bar to the min/max of
	 * its track's width.
	 *
	 * @param {float} val position of the volume handle in px
	 * @return {float} contrained position of the volume handle in px
	 */
	constrainToVolumeMinMax(val = 0) {
		if (val <= 0) {
			return 0;
		} else if (val >= this.player.volumeWidth + 9) {
			return this.player.volumeWidth + 9;
		}
		return val;
	}

	/**
	 * Get the volume based on the position of the
	 * volume object.
	 *
	 * @return {float} volume level based on volume handle position
	 */
	calculateVolumeFromVolumePosition() {
		return this.state.volumePosition / this.player.volumeWidth;
	}

	/**
	 * Get the position of the volume handle based
	 * on the volume
	 *
	 * @return {float} volume handle position in px based on volume
	 */
	calculateVolumePositionFromVolume(fromListenerVolume = this.state.volume) {
		return this.player.volumeWidth * fromListenerVolume;
	}

	/**
	  | -------------------------------------------------------
	  | React Component functions
	  | -------------------------------------------------------
	  |
	  | Here we're initializing our listeners and getting
	  | the component ready using the built-in React
	  | Component methods
	  |
	  */

	/**
	 * Before mounting, init our seekbar and volume bar
	 * pan responders.
	 */
	UNSAFE_componentWillMount() {
		this.initSeekPanResponder();
		this.initVolumePanResponder();
	}

	/**
	 * To allow basic playback management from the outside
	 * we have to handle possible props changes to state changes
	 */
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.paused !== nextProps.paused) {
			this.setState({
				paused: nextProps.paused,
			});
		}

		if (this.styles.videoStyle !== nextProps.videoStyle) {
			this.styles.videoStyle = nextProps.videoStyle;
		}

		if (this.styles.containerStyle !== nextProps.style) {
			this.styles.containerStyle = nextProps.style;
		}
	}

	/**
	 * Upon mounting, calculate the position of the volume
	 * bar based on the volume property supplied to it.
	 */
	componentDidMount() {
		
		const position = this.calculateVolumePositionFromVolume();
		let state = this.state;
		this.setVolumePosition(position);
		state.volumeOffset = position;
		this.mounted = true;

		this.setState(state);
		if(Platform.OS === "android" ){
		this.volumeListener = VolumeManager.addVolumeListener((result) => {
			const position = this.calculateVolumePositionFromVolume(result.volume);
			let state = this.state;
			this.setVolumePosition(position);
			state.volumeOffset = position;
			this.setState(state);
			// On Android, additional volume types are available:
			// music, system, ring, alarm, notification
		  });
		}
		// console.log("isFocused in ppppp oyyy", this.props.isFocused, prevProps.isFocused)

		if (!this.props.isFocused) {
			this._disableTVEventHandler();
		} else if(this.props.isFocused) {
		 	if (Platform.isTV) {
				this.tvEventHandler.enable(this, this.onTVRemoteEvent);
			}
		}
		  
	}

	/**
	 * When the component is about to unmount kill the
	 * timeout less it fire in the prev/next scene
	 */
	componentWillUnmount() {
		this.mounted = false;
		this.clearControlTimeout();
		!Platform.isTv && Platform.OS !== "ios" && this.volumeListener.remove();
		this._disableTVEventHandler();
	}

	/**
	 * Get our seekbar responder going
	 */
	initSeekPanResponder() {
		this.player.seekPanResponder = PanResponder.create({
			// Ask to be the responder.
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,

			/**
			 * When we start the pan tell the machine that we're
			 * seeking. This stops it from updating the seekbar
			 * position in the onProgress listener.
			 */
			onPanResponderGrant: (evt, gestureState) => {
				let state = this.state;
				this.clearControlTimeout();
				const position = evt.nativeEvent.locationX;
				this.setSeekerPosition(position);
				state.seeking = true;
				state.originallyPaused = state.paused;
				state.scrubbing = false;
				if (this.player.scrubbingTimeStep > 0) {
					state.paused = true;
				}
				this.setState(state);
			},

			/**
			 * When panning, update the seekbar position, duh.
			 */
			onPanResponderMove: (evt, gestureState) => {
				const position = this.state.seekerOffset + gestureState.dx;
				this.setSeekerPosition(position);
				let state = this.state;

				if (
					this.player.scrubbingTimeStep > 0 &&
					!state.loading &&
					!state.scrubbing
				) {
					const time = this.calculateTimeFromSeekerPosition();
					const timeDifference = Math.abs(state.currentTime - time) * 1000;

					if (
						time < state.duration &&
						timeDifference >= this.player.scrubbingTimeStep
					) {
						state.scrubbing = true;

						this.setState(state);
						setTimeout(() => {
							this.player.ref.seek(time, this.player.scrubbingTimeStep);
						}, 1);
					}
				}
			},

			/**
			 * On release we update the time and seek to it in the video.
			 * If you seek to the end of the video we fire the
			 * onEnd callback
			 */
			onPanResponderRelease: (evt, gestureState) => {
				const time = this.calculateTimeFromSeekerPosition();
				let state = this.state;
				if (time >= state.duration && !state.loading) {
					state.paused = true;
					this.events.onEnd();
				} else if (state.scrubbing) {
					state.seeking = false;
				} else {
					this.seekTo(time);
					this.setControlTimeout();
					state.paused = state.originallyPaused;
					state.seeking = false;
				}
				this.setState(state);
			},
		});
	}

	/**
	 * Initialize the volume pan responder.
	 */
	initVolumePanResponder() {
		this.player.volumePanResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
				this.clearControlTimeout();
			},

			/**
			 * Update the volume as we change the position.
			 * If we go to 0 then turn on the mute prop
			 * to avoid that weird static-y sound.
			 */
			onPanResponderMove: (evt, gestureState) => {
				let state = this.state;
				const position = this.state.volumeOffset + gestureState.dx;

				this.setVolumePosition(position);
				state.volume = this.calculateVolumeFromVolumePosition();
				Platform.OS === "android" && VolumeManager.setVolume(state.volume)
				if (state.volume <= 0) {
					state.muted = true;
				} else {
					state.muted = false;
				}

				this.setState(state);
			},

			/**
			 * Update the offset...
			 */
			onPanResponderRelease: (evt, gestureState) => {
				let state = this.state;
				state.volumeOffset = state.volumePosition;
				this.setControlTimeout();
				this.setState(state);
			},
		});
	}

	/**
	  | -------------------------------------------------------
	  | Rendering
	  | -------------------------------------------------------
	  |
	  | This section contains all of our render methods.
	  | In addition to the typical React render func
	  | we also have all the render methods for
	  | the controls.
	  |
	  */

	/**
	 * Standard render control function that handles
	 * everything except the sliders. Adds a
	 * consistent <TouchableHighlight>
	 * wrapper and styling.
	 */
	renderControl(children, callback, style = {}, name = "") {

		return (
			<FocusButton
				hasTVPreferredFocus={this.state.actionSheet ? false : name === "play"}
				isTVSelectable={this.state.actionSheet ? false : this.state.setTvFocus}
				tvParallaxProperties={{
					enabled: true,
					shiftDistanceX: 1.9,
					shiftDistanceY: 1.9,
					tiltAngle: 0.05,
					magnification: 1.55,
				}}
				underlayColor={'transparent'}
				// activeOpacity={0.3}
				onFocus={() => { }}
				onPress={() => {
					this.resetControlTimeout();
					callback();
				}}
				button={true}
				style={[styles.controls.control, style]}>
				{children}
			</FocusButton>
		);
	}

	/**
	 * Renders an empty control, used to disable a control without breaking the view layout.
	 */
	renderNullControl() {
		return <View style={[styles.controls.control]} />;
	}

	/**
	 * Groups the top bar controls together in an animated
	 * view and spaces them out.
	 */
	renderTopControls() {
		const backControl = this.props.disableBack
			? this.renderNullControl()
			: this.renderBack();
		const volumeControl = Platform.isTV  || this.props.disableVolume
			? this.renderNullControl()
			:  this.renderVolume();
		const fullscreenControl =   Platform.isTV  || this.props.disableFullscreen
			? this.renderNullControl()
			: this.renderFullscreen();

		return (
			<Animated.View
				style={[
					styles.controls.top,
					{
						opacity: this.animations.topControl.opacity,
						marginTop: this.animations.topControl.marginTop,
					},
				]}>
				<ImageBackground
					source={require('./assets/img/top-vignette.png')}
					style={[styles.controls.column]}
					imageStyle={[styles.controls.vignette]}>
					<SafeAreaView style={styles.controls.topControlGroup}>
						{backControl}
						<View style={styles.controls.pullRight}>
							{volumeControl}
							{fullscreenControl}
						</View>
					</SafeAreaView>
				</ImageBackground>
			</Animated.View>
		);
	}

	/**
	 * Back button control
	 */
	renderBack() {
		if(Platform.isTV || Platform.OS==='web'){
			return(
				(<Button label={'chevron-left'} type={'icon'}  onFocus={()=>this.resetControlTimeout()} onSelect={()=>{
					if (this.state.showControls) {
					this.events.onBack();
		}}} />)
			)
		}
		return this.renderControl(
			<Image
				source={require('./assets/img/back.png')}
				style={styles.controls.back}
			/>,
			this.events.onBack,
			styles.controls.back,
		);
	}

	/**
	 * Render the volume slider and attach the pan handlers
	 */
	renderVolume() {
		return (
			<View style={styles.volume.container}>
				<View
					style={[styles.volume.fill, { width: this.state.volumeFillWidth }]}
				/>
				<View
					style={[styles.volume.track, { width: this.state.volumeTrackWidth }]}
				/>
				<View
					style={[styles.volume.handle, { left: this.state.volumePosition }]}
					{...this.player.volumePanResponder.panHandlers}>
					<Image
						style={styles.volume.icon}
						source={require('./assets/img/volume.png')}
					/>
				</View>
			</View>
		);
	}

	/**
	 * Render fullscreen toggle and set icon based on the fullscreen state.
	 */
	renderFullscreen() {
		if(Platform.isTV || Platform.OS==='web'){
			let source =
			this.state.isFullscreen === true
				? 'compress-arrows-alt'
				:  'expend-arrows-alt';
			return(
				(<Button label={source}  type={'icon'} onSelect={this.methods.toggleFullscreen} />)
			)
		}

		let source =
			this.state.isFullscreen === true
				? require('./assets/img/shrink.png')
				: require('./assets/img/expand.png');
		return this.renderControl(
			<Image source={source} />,
			this.methods.toggleFullscreen,
			styles.controls.fullscreen,
		);
	}

	/**
	 * Render bottom control group and wrap it in a holder
	 */
	renderBottomControls() {
		const {isLive} = this.props
		const timerControl = this.props.disableTimer
			? this.renderNullControl()
			: this.renderTimer();
		const seekbarControl = this.props.disableSeekbar
			? this.renderNullControl()
			: this.renderSeekbar();
		const playPauseControl = this.props.disablePlayPause
			? this.renderNullControl()
			: this.renderPlayPause();
		return (
			<Animated.View
				style={[
					styles.controls.bottom,
					{
						opacity: this.animations.bottomControl.opacity,
						marginBottom: this.animations.bottomControl.marginBottom,
					},
				]}>
				<ImageBackground
					source={require('./assets/img/bottom-vignette.png')}
					style={[styles.controls.column]}
					imageStyle={[styles.controls.vignette]}>
					{seekbarControl}
					<SpatialNavigationView style={[styles.controls.row, styles.controls.bottomControlGroup]} direction="horizontal">
					{/* <SafeAreaView
						style={[styles.controls.row, styles.controls.bottomControlGroup]}> */}
						{this.state.showControls ? playPauseControl : (<View style={{ width: 40 }}></View>)}
						{(checkArrayAndElements(this.state.audioTracks) || checkArrayAndElements(this.state.textTracks)) ? this.settingIcon() : null}
						{this.renderTitle()}
						{/* {timerControl} */}
						{
							isLive ?
							(
								<View style={{flexDirection: "row", justifyContent: "space-between", marginRight: 10}}>
									<View style={{height: 8, width: 8, borderRadius: 8, backgroundColor: "red", alignSelf: "center", marginRight: 5}}/>
									<Text style={{color: "white"}}>LIVE</Text>
								</View>
							)
							:
							timerControl
						}
						
					{/* </SafeAreaView> */}
					</SpatialNavigationView>
				</ImageBackground>
			</Animated.View>
		);
	}

		/**
	 * Render the seekbar and attach its handlers
	 */
		// renderSeekbar() {
		// 	const {isLive} = this.props
		// 	const {seekerFillWidth, seekerPosition} = this.state
		// 	return (
		// 				<View
		// 					style={styles.seekbar.container}
		// 					collapsable={false}
		// 					{...this.player.seekPanResponder.panHandlers}
		// 					>
		// 					<View
		// 						style={styles.seekbar.track}
		// 						onLayout={event =>
		// 							(this.player.seekerWidth = event.nativeEvent.layout.width)
		// 						}
		// 						pointerEvents={'none'}>
		// 						<View
		// 							style={[
		// 								styles.seekbar.fill,
		// 								{
		// 									width: this.state.seekerFillWidth,
		// 									backgroundColor: this.props.seekColor || '#FFF',
		// 								},
		// 							]}
		// 							pointerEvents={'none'}
		// 						/>
		// 					</View>
		// 					<View
		// 						style={[styles.seekbar.handle, { left: this.state.seekerPosition }]}
		// 						pointerEvents={'none'}>
		// 						<View
		// 							style={[
		// 								styles.seekbar.circle,
		// 								{ backgroundColor: this.props.seekColor || '#FFF' },
		// 							]}
		// 							pointerEvents={'none'}
		// 						/>
		// 					</View>
		// 				    {
		// 						this.state.adMarkerPercent && this.state.adMarkerPercent.map(values => {
		// 							return (
		// 								<View style={{height: 2.5, width: 2 , backgroundColor: "yellow", left: `${values+1}%`, position: "absolute", zIndex: 1000, top: 13.5,}} />
		// 							)
		// 						})
		// 					}
		// 				</View>
						
		// 	);
		// }

	// /**
	//  * Render the seekbar and attach its handlers
	//  */
	renderSeekbar() {
		const {isLive} = this.props
		const {seekerFillWidth, seekerPosition} = this.state
		if(Platform.isTV){
		
			return (<SpatialNavigationNode 
				onFocus={() => { 
					this.setState((prevState)=> ({...prevState ,isSeekbarFocused: true}))
					this.resetControlTimeout();
				}}
				onSelect={() => console.log('Node was selected')}
				orientation="horizontal"
				isFocusable={true}
				style={{width: Dimensions.get("window").width}}
			  >
				{({ isFocused }) => 
						isLive ? (
							<View
								style={styles.seekbar.container}
							>
								<View
									style={[styles.seekbar.track, {
										backgroundColor: this.props.seekColor || '#FFF',
									}]}
									onLayout={event =>
										(this.player.seekerWidth = event.nativeEvent.layout.width)
									}
									pointerEvents={'none'}>
									
								</View>
								<View
									style={[styles.seekbar.handle1]}
									>
									<View
										style={[
											styles.seekbar.circle1,
											{ backgroundColor: this.props.seekColor || '#FFF' },
										]}
									/>
								</View>
							</View>
						):
						(
						<View
							style={[styles.seekbar.container]}
							collapsable={false}
							{...this.player.seekPanResponder.panHandlers}
							>
							<View
								style={styles.seekbar.track}
								onLayout={event =>
									(this.player.seekerWidth = event.nativeEvent.layout.width)
								}
								pointerEvents={'none'}>
								<View
									style={[
										styles.seekbar.fill,
										{
											width: this.state.seekerFillWidth,
											backgroundColor: this.props.seekColor || '#FFF',
										},
									]}
									pointerEvents={'none'}
								/>
							</View>
							<View
								style={[styles.seekbar.handle, { left: this.state.forwardBackwardCount !== 0 ? this.state.fastForwardBackwardPosition : this.state.seekerPosition }]}							
								pointerEvents={'none'}>
								{isFocused && <View
									style={[
										styles.seekbar.circle,
										{ backgroundColor: this.props.seekColor || '#FFF' },
									]}
									pointerEvents={'none'}
								/>}
							</View>
							{
									 this.state.adMarkerPercent && this.state.adMarkerPercent.map((el, indix) => {
										 return (
											 <View keu={indix} style={{height: 2.5, width: `${el.adDuration}%` , backgroundColor: "yellow", left: `${el.value}%`, position: "absolute", zIndex: 1000, top: 14,}} />
										 )
									 })
								 }
	
						</View>
						)
						}
	
			</SpatialNavigationNode>
		)}
	
		return (
		  <FocusButton
			hasTVPreferredFocus={false}
			isTVSelectable={this.state.setTvFocus}
			tvParallaxProperties={{
				enabled: true,
			}}
			focusValue={1.03}
			onFocus={() => { 
				this.setState((prevState)=> ({...prevState ,isSeekbarFocused: true}))
			}}
			onPress={() => {}}
			style={{width: Dimensions.get("window").width}}
			>
				{
					isLive ? (
						<View
							style={styles.seekbar.container}
						>
							<View
								style={[styles.seekbar.track, {
									backgroundColor: this.props.seekColor || '#FFF',
								}]}
								onLayout={event =>
									(this.player.seekerWidth = event.nativeEvent.layout.width)
								}
								pointerEvents={'none'}>
								
							</View>
							<View
								style={[styles.seekbar.handle1]}
								>
								<View
									style={[
										styles.seekbar.circle1,
										{ backgroundColor: this.props.seekColor || '#FFF' },
									]}
								/>
							</View>
						</View>
					):
					(
					<View
						style={styles.seekbar.container}
						collapsable={false}
						{...this.player.seekPanResponder.panHandlers}
						>
						<View
							style={styles.seekbar.track}
							onLayout={event =>
								(this.player.seekerWidth = event.nativeEvent.layout.width)
							}
							pointerEvents={'none'}>
							<View
								style={[
									styles.seekbar.fill,
									{
										width: this.state.seekerFillWidth,
										backgroundColor: this.props.seekColor || '#FFF',
									},
								]}
								pointerEvents={'none'}
							/>
						</View>
						<View
							style={[styles.seekbar.handle, { left: this.state.forwardBackwardCount !== 0 ? this.state.fastForwardBackwardPosition : this.state.seekerPosition }]}							
							pointerEvents={'none'}>
							<View
								style={[
									styles.seekbar.circle,
									{ backgroundColor: this.props.seekColor || '#FFF' },
								]}
								pointerEvents={'none'}
							/>
						</View>
						{
		 						this.state.adMarkerPercent && this.state.adMarkerPercent.map((values, index) => {
		 							return (
										 <View key={index} style={{height: 2.5, width: `${el.adDuration}%` , backgroundColor: "yellow", left: `${el.value}%`, position: "absolute", zIndex: 1000, top: 14,}} />

		 							)
		 						})
		 					}

					</View>
					)
				}				
		  </FocusButton>
		);
	}

	/**
	 * Render the play/pause button and show the respective icon
	 */
	renderPlayPause() {
		if (Platform.isTV || Platform.OS === "web") {
		  let source = this.state.paused === true ? "play" : "pause";
		  return (
			<DefaultFocus>
			<Button
			  label={source}
			  type={"icon"}
			  onFocus={() => this.resetControlTimeout()}
			  onSelect={this.methods.togglePlayPause}
			/>
			</DefaultFocus>
		  );
		} else {
		  let source =
			this.state.paused === true
			  ? require("./assets/img/play.png")
			  : require("./assets/img/pause.png");
		  return this.renderControl(
			<Image source={source} />,
			this.methods.togglePlayPause,
			styles.controls.playPause,
			"play"
		  );
		}
	  }
	

	/**
	 * Render our title...if supplied.
	 */
	renderTitle() {
		if (this.opts.title) {
			return (
				<View style={[styles.controls.control, styles.controls.title]}>
					<Text
						style={[styles.controls.text, styles.controls.titleText]}
						numberOfLines={1}>
						{this.opts.title || ''}
					</Text>
				</View>
			);
		}

		return null;
	}

	/**
	 * Show our timer.
	 */
	renderTimer() {
		return this.renderControl(
			<Text style={styles.controls.timerText}>{this.calculateTime()}</Text>,
			this.methods.toggleTimer,
			styles.controls.timer,
		);
	}

	/**
	 * Show loading icon
	 */
	renderLoader() {
		if (this.state.loading || this.state.isBuffering) {
			return (
				<View style={styles.loader.container}>
					<Animated.Image
						source={require('./assets/img/loader-icon.png')}
						style={[
							styles.loader.icon,
							{
								transform: [
									{
										rotate: this.animations.loader.rotate.interpolate({
											inputRange: [0, 360],
											outputRange: ['0deg', '360deg'],
										}),
									},
								],
							},
						]}
					/>
				</View>
			);
		}
		return null;
	}

	renderError() {
		if (this.state.error) {
			return (
				<View style={styles.error.container}>
					<Image
						source={require('./assets/img/error-icon.png')}
						style={styles.error.icon}
					/>
					<Text style={styles.error.text}>{this.state.errorMessage}</Text>
				</View>
			);
		}
		return null;
	}

	/**
	*  Setting icon on bottom controls
	*/
	settingIcon = () => {
		if(Platform.isTV || Platform.OS==='web'){
			return(
				(<Button label={'cog'} type={'icon'}
				onFocus={()=>this.resetControlTimeout()}
				// isFocusable={this.state.setTvFocus}
				isFocused
				 onSelect={() => {
					if (this.state.showControls) {
						this.setState({ setTvFocus: false, actionSheet: true })
						this.resetControlTimeout();
					}
				
				}} />)
			)
		}
		return (
			<FocusButton
				isTVSelectable={this.state.setTvFocus}
				tvParallaxProperties={{
					enabled: true,
					shiftDistanceX: 1.9,
					shiftDistanceY: 1.9,
					tiltAngle: 0.05,
					magnification: 1.55,
				}}
				underlayColor={'transparent'}
				// onFocus={()=>{}}
				onPress={() => {
					this.setState({ setTvFocus: false, actionSheet: true })
				}}>
				<Text style={{ color: 'white', fontFamily: 'Montserrat-Medium' }}>
					<ImageIcon name={'cog'} color={'white'} size={18} />  Settings
				</Text>
			</FocusButton>
		);
	};


	toggelNativeAdControls = () => {
		if (this.state.isAdVisible === true) {
			if(Platform.isTV){
				return (
					<AddSkipModal
					isModalVisible={this.state.isModalVisible}
					setIsModalVisible={this.setIsModalVisible}
						percentage={`${parseInt((this.state.adBar * 100) + 1)}%`}
						showSkip={this.state.showSkip}
						adDuration={this.state.adDuration}
						onSkipPress={() => {
							this.seekTo(this.state.skipTo + 1)
						}}
						initialTime={9000}
						playPauseCall={(value) => this.setState({ paused: value })}
						setMuteValue={(value) => console.log(value)}
						isPaused={this.props.paused || this.state.paused}
						isMuted={this.props.isMuted}
						setTvFocus={true}
						/>
				)
			}else{
				return (
					<PercentageBar
						percentage={`${parseInt((this.state.adBar * 100) + 1)}%`}
						showSkip={this.state.showSkip}
						adDuration={this.state.adDuration}
						onSkipPress={() => {
							this.seekTo(this.state.skipTo)
						}}
						initialTime={9000}
						playPauseCall={(value) => this.setState({ paused: value })}
						setMuteValue={(value) => console.log(value)}
						isPaused={this.props.paused || this.state.paused}
						isMuted={this.props.isMuted}
						setTvFocus={true}
					/>
				)
			}
			
		} else if (this.state.controls === true) {
			return this.renderBottomControls()
		} else {
			return null
		}

	}

	showCompanionAd = () => {
		const { isAdVisible, adCompanionData} = this.state;
		// console.log("state.adCompanionData ",adCompanionData)
		if(isAdVisible && adCompanionData !== null){
			return (
				<View 
					// onPress=""
					style={{
						// height: adCompanionData.height, 
						// width: adCompanionData.width, 
						height: 90,
						width: 90,
						position: "absolute", 
						zIndex: 1000, 
						alignSelf: "flex-end",
						justifyContent: 'flex-end',
						bottom: 100
						// top: - (Dimensions.get("window").height / 4), 
						// flex: 1,
					}}>
						<Pressable onPress={() => adCompanionData.companionClickThrough && Linking.openURL(adCompanionData.companionClickThrough)}>
							<Image source={{uri: adCompanionData.static_resource}} style={{width: "100%", height: "100%"}} />
						</Pressable>
				</View>
			)
		}
		return null
	}

	/**
	 * Provide all of our options and render the whole component.
	 */
	render() {
		return (
			<SpatialNavigationRoot>
			<TouchableHighlight
				hasTVPreferredFocus={Platform.isTV && Platform.OS === "ios" ? false : true}
				isTVSelectable={Platform.isTV && Platform.OS === "ios" ? false : true}
			
				// hasTVPreferredFocus={this.state.showControls ? false : (this.state.actionSheet ? false : this.state.isAdVisible ? false : true) || (this.state.isSeekbarFocused ? false : true)}
				// isTVSelectable={this.state.showControls ? false : (this.state.actionSheet ? false : this.state.isAdVisible ? false : true) || (this.state.isSeekbarFocused ? false : true)}

				onPress={this.events.onScreenTouch}
				style={[styles.player.container, this.styles.containerStyle]}>
				<View style={[styles.player.container, this.styles.containerStyle]}>
					<Video
						{...this.props}
						controls={false}
						ref={videoPlayer => (this.player.ref = videoPlayer)}
						resizeMode={this.state.resizeMode}
						volume={this.state.volume}
						paused={this.state.paused}
						muted={this.state.muted}
						rate={this.state.rate}
						onLoadStart={this.events.onLoadStart}
						onProgress={this.events.onProgress}
						onError={this.events.onError}
						onLoad={this.events.onLoad}
						onEnd={this.events.onEnd}
						onSeek={this.events.onSeek}
						style={[styles.player.video, this.styles.videoStyle]}
						onAudioTracks={this.onAudioTracks}
						onTextTracks={this.onTextTracks}
						onVideoTracks={this.onVideoTracks}
						selectedTextTrack={this.state.selectedTextTrack}
						selectedAudioTrack={this.state.selectedAudioTrack}
						selectedVideoTrack={this.state.selectedVideoTracks}
                        source={this.state.video_source}
                        bitRateSelected={this.state.bitRateSelected}
						onBuffer={this.events.onBuffer}    
					/>
					{this.renderError()}
					{this.props.control ? this.renderLoader() : null}
					{this.state.controls && this.renderTopControls()}
					{/* {this.props.control && this.renderBottomControls()} */}
					{this.toggelNativeAdControls()}
					{this.showCompanionAd()}
					{isWider ? (
              this.state.actionSheet && (
                <SubtitlesModal
                  isModalVisible={this.state.actionSheet}
                  setIsModalVisible={(isModal) =>
                    this.setState({ actionSheet: isModal })
                  }
                  setSubtitles={(subT) => console.log(subT)}
                  audioTracks={this.state.audioTracks}
                  textTracks={this.state.textTracks}
                  videoTracks={this.state.videoTracks}
                  selectedTextTrack={this.state.selectedTextTrack}
                  selectedAudioTrack={this.state.selectedAudioTrack}
                  selectedVideoTrack={this.state.selectedVideoTracks}
                  videoBitrate={this.state.bitRateSelected}
                  onAudioTracksChange={(item) => this._onChangeAudio(item)}
                  isFullScreen={this.props.fullscreen}
                  onTextTracksChange={(item) => this._onChangeText(item)}
                  onVideoTrackChange={(item) =>
                    this._onChangeVideoBitrate(item)
                  }
                  onCancel={() =>
                    this.setState({ actionSheet: false, setTvFocus: true })
                  }
                  onTextTracksOff={() => this.onTextTracksOff()}
                />
              )
            ) : (
              <Modal
                isVisible={this.state.actionSheet}
                // animationType=
                transparent={true}
                onRequestClose={() => this.setState({ actionSheet: false })}
                style={{
                  margin: 0,
                  justifyContent: "flex-end",
                }}
              >
                <TouchableHighlight
                  hasTVPreferredFocus={false}
                  isTVSelectable={false}
                  style={{
                    margin: 0,
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  {this.state.actionSheet ? (
                    <ActionSheets
                      audioTracks={this.state.audioTracks}
                      textTracks={this.state.textTracks}
                      videoTracks={this.state.videoTracks}
                      selectedTextTrack={this.state.selectedTextTrack}
                      selectedAudioTrack={this.state.selectedAudioTrack}
                      selectedVideoTrack={this.state.selectedVideoTracks}
                      videoBitrate={this.state.bitRateSelected}
                      onAudioTracksChange={(item) => this._onChangeAudio(item)}
                      isFullScreen={this.props.fullscreen}
                      onTextTracksChange={(item) => this._onChangeText(item)}
                      onVideoTrackChange={(item) =>
                        this._onChangeVideoBitrate(item)
                      }
                      onCancel={() =>
                        this.setState({ actionSheet: false, setTvFocus: true })
                      }
                      onTextTracksOff={() => this.onTextTracksOff()}
                    />
                  ) : (
                    <View />
                  )}
                </TouchableHighlight>
              </Modal>
            )}
				</View>
			</TouchableHighlight>
			</SpatialNavigationRoot>
		);
	}
}

/**
 * This object houses our styles. There's player
 * specific styles and control specific ones.
 * And then there's volume/seeker styles.
 */
const styles = {
	player: StyleSheet.create({
		container: {
			overflow: 'hidden',
			backgroundColor: '#000',
			flex: 1,
			alignSelf: 'stretch',
			justifyContent: 'space-between',
		},
		video: {
			overflow: 'hidden',
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	}),
	error: StyleSheet.create({
		container: {
			backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			justifyContent: 'center',
			alignItems: 'center',
		},
		icon: {
			marginBottom: 16,
		},
		text: {
			backgroundColor: 'transparent',
			color: '#f27474',
		},
	}),
	loader: StyleSheet.create({
		container: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			alignItems: 'center',
			justifyContent: 'center',
		},
	}),
	controls: StyleSheet.create({
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			height: null,
			width: null,
		},
		column: {
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			height: null,
			width: null,
		},
		vignette: {
			resizeMode: 'stretch',
		},
		control: {
			padding: 16,
		},
		text: {
			backgroundColor: 'transparent',
			color: '#FFF',
			fontSize: 14,
			textAlign: 'center',
		},
		pullRight: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		top: {
			flex: 1,
			alignItems: 'stretch',
			justifyContent: 'flex-start',
		},
		bottom: {
			alignItems: 'stretch',
			flex: 2,
			justifyContent: 'flex-end',
		},
		topControlGroup: {
			alignSelf: 'stretch',
			alignItems: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row',
			width: null,
			margin: 12,
			marginBottom: 18,
		},
		bottomControlGroup: {
			alignSelf: 'stretch',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginLeft: 12,
			marginRight: 12,
			marginBottom: 0,
		},
		volume: {
			flexDirection: 'row',
		},
		fullscreen: {
			flexDirection: 'row',
		},
		playPause: {
			position: 'relative',
			width: 80,
			zIndex: 0,
		},
		title: {
			alignItems: 'center',
			flex: 0.6,
			flexDirection: 'column',
			padding: 0,
		},
		titleText: {
			textAlign: 'center',
		},
		timer: {
			width: 80,
		},
		timerText: {
			backgroundColor: 'transparent',
			color: '#FFF',
			fontSize: 14,
			textAlign: 'right',
		},
	}),
	volume: StyleSheet.create({
		container: {
			alignItems: 'center',
			justifyContent: 'flex-start',
			flexDirection: 'row',
			height: 1,
			marginLeft: 20,
			marginRight: 20,
			width: 150,
		},
		track: {
			backgroundColor: '#333',
			height: 1,
			marginLeft: 7,
		},
		fill: {
			backgroundColor: '#FFF',
			height: 1,
		},
		handle: {
			position: 'absolute',
			marginTop: -24,
			marginLeft: -24,
			padding: 16,
		},
		icon: {
			marginLeft: 7,
		},
	}),
	seekbar: StyleSheet.create({
		container: {
			alignSelf: 'stretch',
			height: 28,
			marginLeft: 20,
			marginRight: 20,
		},
		track: {
			backgroundColor: '#333',
			height: 2.5,
			position: 'relative',
			top: 14,
			width: '100%',
		},
		fill: {
			backgroundColor: '#FFF',
			height: 2.5,
			width: '100%',
		},
		handle: {
			position: 'absolute',
			marginLeft: -7,
			height: 28,
			width: 28,
		},
		circle: {
			borderRadius: 12,
			position: 'relative',
			top: 8,
			left: 8,
			height: 12,
			width: 12,
		},
		handle1: {
			position: 'absolute',
			marginLeft: -7,
			height: 28,
			width: 28,
			right: -10,

		},
		circle1: {
			borderRadius: 12,
			// position: 'relative',
			top: 8,
			left: 8,
			height: 12,
			width: 12,
		},
	}),
};
