// import React, { Component } from 'react';
// import Video from './Video.App';
// import ActionSheet from 'react-native-actions-sheet';
// import {
// 	TouchableHighlight,
// 	ImageBackground,
// 	PanResponder,
// 	StyleSheet,
// 	Animated,
// 	SafeAreaView,
// 	Easing,
// 	Image,
// 	View,
// 	Text
// } from 'react-native';
// import padStart from 'lodash/padStart';
// import { ImageIcon,normalize } from './assets/Icon/icon';
// import Modal from 'react-native-modal';
// const lang = ['English', 'Dutch'];
// import ActionSheets from './nativeCustomManager/actionSheet';

// export default class VideoPlayer extends Component {
// 	static defaultProps = {
// 		toggleResizeModeOnFullscreen: true,
// 		controlAnimationTiming: 500,
// 		doubleTapTime: 130,
// 		playInBackground: false,
// 		playWhenInactive: false,
// 		resizeMode: 'contain',
// 		isFullscreen: true,
// 		showOnStart: true,
// 		paused: false,
// 		repeat: false,
// 		muted: false,
// 		volume: 1,
// 		title: '',
// 		rate: 1,
// 		showTimeRemaining: true,
// 		showHours: false,
// 		control:false,
// 		onPlayer:false
// 	};

// 	constructor(props) {
// 		super(props);

// 		/**
// 		 * All of our values that are updated by the
// 		 * methods and listeners in this class
// 		 */
// 		this.state = {
// 			// Video
// 			resizeMode: this.props.resizeMode,
// 			paused: this.props.paused,
// 			muted: this.props.muted,
// 			volume: this.props.volume,
// 			rate: this.props.rate,
// 			video_source:this.props.source,
// 			// Controls

// 			isFullscreen:
// 				this.props.isFullScreen || this.props.resizeMode === 'cover' || true,
// 			showTimeRemaining: this.props.showTimeRemaining,
// 			showHours: this.props.showHours,
// 			volumeTrackWidth: 0,
// 			volumeFillWidth: 0,
// 			seekerFillWidth: 0,
// 			showControls: this.props.showOnStart,
// 			volumePosition: 0,
// 			seekerPosition: 0,
// 			volumeOffset: 0,
// 			seekerOffset: 0,
// 			seeking: false,
// 			originallyPaused: false,
// 			scrubbing: false,
// 			loading: false,
// 			currentTime: 0,
// 			error: false,
// 			duration: 0,
// 			audioTracks: [],
// 			textTracks: [],
// 			selectedAudioTrack: undefined,
// 			selectedTextTrack: undefined,
// 			setTvFocus: true,
// 			actionSheet: false,
// 			errorMessage:''
// 		};

// 		/**
// 		 * Any options that can be set at init.
// 		 */
// 		this.opts = {
// 			playWhenInactive: this.props.playWhenInactive,
// 			playInBackground: this.props.playInBackground,
// 			repeat: this.props.repeat,
// 			title: this.props.title,
// 		};

// 		/**
// 		 * Our app listeners and associated methods
// 		 */
// 		this.events = {
// 			onError: this.props.onError || this._onError.bind(this),
// 			onBack: this.props.onBack || this._onBack.bind(this),
// 			onEnd: this.props.onEnd || this._onEnd.bind(this),
// 			onScreenTouch: this._onScreenTouch.bind(this),
// 			onEnterFullscreen: this.props.onEnterFullscreen,
// 			onExitFullscreen: this.props.onExitFullscreen,
// 			onShowControls: this.props.onShowControls,
// 			onHideControls: this.props.onHideControls,
// 			onLoadStart: this._onLoadStart.bind(this),
// 			onProgress: this._onProgress.bind(this),
// 			onSeek: this._onSeek.bind(this),
// 			onLoad: this._onLoad.bind(this),
// 			onPause: this.props.onPause,
// 			onPlay: this.props.onPlay,
// 		};

// 		/**
// 		 * Functions used throughout the application
// 		 */
// 		this.methods = {
// 			toggleFullscreen: this._toggleFullscreen.bind(this),
// 			togglePlayPause: this._togglePlayPause.bind(this),
// 			toggleControls: this._toggleControls.bind(this),
// 			toggleTimer: this._toggleTimer.bind(this),
// 		};

// 		/**
// 		 * Player information
// 		 */
// 		this.player = {
// 			controlTimeoutDelay: this.props.controlTimeout || 15000,
// 			volumePanResponder: PanResponder,
// 			seekPanResponder: PanResponder,
// 			controlTimeout: null,
// 			tapActionTimeout: null,
// 			volumeWidth: 150,
// 			iconOffset: 0,
// 			seekerWidth: 0,
// 			ref:Video,
// 			scrubbingTimeStep: this.props.scrubbing || 0,
// 			tapAnywhereToPause: this.props.tapAnywhereToPause,
// 		};

// 		/**
// 		 * Various animations
// 		 */
// 		const initialValue = this.props.showOnStart ? 1 : 0;

// 		this.animations = {
// 			bottomControl: {
// 				marginBottom: new Animated.Value(0),
// 				opacity: new Animated.Value(initialValue),
// 			},
// 			topControl: {
// 				marginTop: new Animated.Value(0),
// 				opacity: new Animated.Value(initialValue),
// 			},
// 			video: {
// 				opacity: new Animated.Value(1),
// 			},
// 			loader: {
// 				rotate: new Animated.Value(0),
// 				MAX_VALUE: 360,
// 			},
// 		};

// 		/**
// 		 * Various styles that be added...
// 		 */
// 		this.styles = {
// 			videoStyle: this.props.videoStyle || {},
// 			containerStyle: this.props.style || {},
// 		};
// 		// this.ActionSheetRef = React.createRef();
// 	}

// 	componentDidUpdate = prevProps => {
// 		const { isFullscreen } = this.props;

// 		if (prevProps.isFullscreen !== isFullscreen) {
// 			this.setState({
// 				isFullscreen,
// 			});
// 		}
// 	};
// 	/**
// 	  | -------------------------------------------------------
// 	  | Events
// 	  | -------------------------------------------------------
// 	  |
// 	  | These are the events that the <Video> component uses
// 	  | and can be overridden by assigning it as a prop.
// 	  | It is suggested that you override onEnd.
// 	  |
// 	  */

// 	/**
// 	 * When load starts we display a loading icon
// 	 * and show the controls.
// 	 */
// 	_onLoadStart() {
// 		let state = this.state;
// 		state.loading = true;
// 		this.loadAnimation();
// 		this.setState(state);

// 		if (typeof this.props.onLoadStart === 'function') {
// 			this.props.onLoadStart(...arguments);
// 		}
// 	}

// 	/**
// 	 * When load is finished we hide the load icon
// 	 * and hide the controls. We also set the
// 	 * video duration.
// 	 *
// 	 * @param {object} data The video meta data
// 	 */
// 	_onLoad(data = {}) {
// 		try {
// 			let state = this.state;
// 			if (this.props.onPlayer) {
// 		this.onAudioTracks(data);
// 		this.onTextTracks(data);
// 			}

// 		state.duration = data.duration;
// 		state.loading = false;
// 		this.setState(state);

// 		if (state.showControls) {
// 			this.setControlTimeout();
// 		}

// 		if (typeof this.props.onLoad === 'function') {
// 			this.props.onLoad(...arguments);
// 		}
// 		} catch (error) {
// 			console.log('Error on Load-')
// 		}

// 	}

// 	/**
// 	 * For onprogress we fire listeners that
// 	 * update our seekbar and timer.
// 	 *
// 	 * @param {object} data The video meta data
// 	 */
// 	_onProgress(data = {}) {
// 		// console.log('Video URL Progress start on:- ',this.timer)
// 		let state = this.state;
// 		if (!state.scrubbing) {
// 			state.currentTime = data.currentTime;

// 			if (!state.seeking) {
// 				const position = this.calculateSeekerPosition();
// 				this.setSeekerPosition(position);
// 			}

// 			if (typeof this.props.onProgress === 'function') {
// 				this.props.onProgress(...arguments);
// 			}

// 			this.setState(state);
// 		}
// 	}

// 	/**
// 	 * For onSeek we clear scrubbing if set.
// 	 *
// 	 * @param {object} data The video meta data
// 	 */
// 	_onSeek(data = {}) {
// 		let state = this.state;
// 		if (state.scrubbing) {
// 			state.scrubbing = false;
// 			state.currentTime = data.currentTime;

// 			// Seeking may be false here if the user released the seek bar while the player was still processing
// 			// the last seek command. In this case, perform the steps that have been postponed.
// 			if (!state.seeking) {
// 				this.setControlTimeout();
// 				state.paused = state.originallyPaused;
// 			}

// 			this.setState(state);
// 		}
// 	}

// 	onAudioTracks = (data) => {
// 		console.log('Audio Data------',data)
// 		let state = this.state;
// 		// const selectedTrack = data.audioTracks?.find((x: any) => {
// 		// 	return x.selected;
// 		// });


// 		state.audioTracks = data.audioTracks;
// 		console.log('audioTracks-------', data.audioTracks);
// 		// if (selectedTrack?.language) {
// 		// 	this.setState({
// 		// 		selectedAudioTrack: {
// 		// 			type: 'language',
// 		// 			value: selectedTrack?.language,
// 		// 		},
// 		// 	});
// 		// 	state.selectedAudioTrack = {
// 		// 		type: 'language',
// 		// 		value: selectedTrack?.language,
// 		// 	}
// 		// }
// 		this.setState(state);
// 		// console.log(state.audioTracks,'--audioTracks-------', data.audioTracks);
// 	};

// 	_onChangeAudio = item => {
// 		console.log('selectedAudioTrack----------', item.language);
// 		this.setState(
// 			{
// 				selectedAudioTrack: {
// 					type: 'language',
// 					value: item.language,
// 				},
// 				setTvFocus: true
// 			},
// 			() => {
// 				console.log(
// 					'selectedAudioTrack updated ---',
// 					this.state.selectedAudioTrack,
// 				);
// 			},
// 		);
// 		// this.ActionSheetRef.current?.hide();
// 	};

// 	_onChangeText = item => {
// 		console.log('TextTrack----------', item.language);
// 		this.setState(
// 			{
// 				selectedTextTrack: {
// 					type: 'language',
// 					value: item.language,
// 				},
// 				setTvFocus: true
// 			},
// 			() => {
// 				// console.log(this.state.setTvFocus, '---TextTrack updated ---', this.state.selectedTextTrack);
// 			},
// 		);
// 		// this.ActionSheetRef.current?.hide();
// 	};

// 	onTextTracks = (data) => {

// 		let state = this.state;
// 		// const selectedTrack = data.textTracks?.find((x: any) => {
// 		// 	return x.selected;
// 		// });
// 		state.textTracks = data.textTracks
// 		console.log('Text Data------',data.textTracks)
// 		state.selectedTextTrack = {
// 			type: 'disable',
// 			value: 'Off',
// 		}

// 		this.setState(state);
// 	};

// 	onTextTracksOff = () => {
// 		let state = this.state;
// 		state.selectedTextTrack = {
// 			type: 'disable',
// 			value: 'Off',
// 		}
// 		this.setState(state);
// 		//   this.ActionSheetRef.current?.hide();
// 	}

// 	/**
// 	 * It is suggested that you override this
// 	 * command so your app knows what to do.
// 	 * Either close the video or go to a
// 	 * new page.
// 	 */
// 	_onEnd() { }

// 	/**
// 	 * Set the error state to true which then
// 	 * changes our renderError function
// 	 *
// 	 * @param {object} err  Err obj returned from <Video> component
// 	 */
// 	_onError(err) {
// 		console.log('##err---', err)
// 		let state = this.state;
// 		state.errorMessage=err?.error?.localizedFailureReason || err?.error?.localizedDescription || 'Video not available'
// 		state.error = true;
// 		state.loading = false;

// 		this.setState(state);
// 	}

// 	/**
// 	 * This is a single and double tap listener
// 	 * when the user taps the screen anywhere.
// 	 * One tap toggles controls and/or toggles pause,
// 	 * two toggles fullscreen mode.
// 	 */
// 	_onScreenTouch() {
// 		console.log(this.player.tapActionTimeout, '<-tapActionTimeout--------showControls->', this.state.showControls)
// 		if (this.player.tapActionTimeout) {
// 			clearTimeout(this.player.tapActionTimeout);
// 			this.player.tapActionTimeout = 0;
// 			this.methods.toggleFullscreen();
// 			const state = this.state;
// 			if (state.showControls) {
// 				this.resetControlTimeout();
// 			}
// 		} else {
// 			this.player.tapActionTimeout = setTimeout(() => {
// 				const state = this.state;
// 				if (this.player.tapAnywhereToPause && state.showControls) {
// 					this.methods.togglePlayPause();
// 					this.resetControlTimeout();
// 				} else {
// 					this.methods.toggleControls();
// 				}
// 				this.player.tapActionTimeout = 0;
// 			}, this.props.doubleTapTime);
// 		}
// 	}

// 	/**
// 	  | -------------------------------------------------------
// 	  | Methods
// 	  | -------------------------------------------------------
// 	  |
// 	  | These are all of our functions that interact with
// 	  | various parts of the class. Anything from
// 	  | calculating time remaining in a video
// 	  | to handling control operations.
// 	  |
// 	  */

// 	/**
// 	 * Set a timeout when the controls are shown
// 	 * that hides them after a length of time.
// 	 * Default is 15s
// 	 */
// 	setControlTimeout() {
// 		this.player.controlTimeout = setTimeout(() => {
// 			this._hideControls();
// 		}, this.player.controlTimeoutDelay);
// 	}

// 	/**
// 	 * Clear the hide controls timeout.
// 	 */
// 	clearControlTimeout() {
// 		clearTimeout(this.player.controlTimeout);
// 	}

// 	/**
// 	 * Reset the timer completely
// 	 */
// 	resetControlTimeout() {
// 		this.clearControlTimeout();
// 		this.setControlTimeout();
// 	}

// 	/**
// 	 * Animation to hide controls. We fade the
// 	 * display to 0 then move them off the
// 	 * screen so they're not interactable
// 	 */
// 	hideControlAnimation() {
// 		Animated.parallel([
// 			Animated.timing(this.animations.topControl.opacity, {
// 				toValue: 0,
// 				duration: this.props.controlAnimationTiming,
// 				useNativeDriver: false,
// 			}),
// 			Animated.timing(this.animations.topControl.marginTop, {
// 				toValue: -100,
// 				duration: this.props.controlAnimationTiming,
// 				useNativeDriver: false,
// 			}),
// 			Animated.timing(this.animations.bottomControl.opacity, {
// 				toValue: 0,
// 				duration: this.props.controlAnimationTiming,
// 				useNativeDriver: false,
// 			}),
// 			Animated.timing(this.animations.bottomControl.marginBottom, {
// 				toValue: -100,
// 				duration: this.props.controlAnimationTiming,
// 				useNativeDriver: false,
// 			}),
// 		]).start();
// 	}

// 	/**
// 	 * Animation to show controls...opposite of
// 	 * above...move onto the screen and then
// 	 * fade in.
// 	 */
// 	showControlAnimation() {
// 		Animated.parallel([
// 			Animated.timing(this.animations.topControl.opacity, {
// 				toValue: 1,
// 				useNativeDriver: false,
// 				duration: this.props.controlAnimationTiming,
// 			}),
// 			Animated.timing(this.animations.topControl.marginTop, {
// 				toValue: 0,
// 				useNativeDriver: false,
// 				duration: this.props.controlAnimationTiming,
// 			}),
// 			Animated.timing(this.animations.bottomControl.opacity, {
// 				toValue: 1,
// 				useNativeDriver: false,
// 				duration: this.props.controlAnimationTiming,
// 			}),
// 			Animated.timing(this.animations.bottomControl.marginBottom, {
// 				toValue: 0,
// 				useNativeDriver: false,
// 				duration: this.props.controlAnimationTiming,
// 			}),
// 		]).start();
// 	}

// 	/**
// 	 * Loop animation to spin loader icon. If not loading then stop loop.
// 	 */
// 	loadAnimation() {
// 		if (this.state.loading) {
// 			Animated.sequence([
// 				Animated.timing(this.animations.loader.rotate, {
// 					toValue: this.animations.loader.MAX_VALUE,
// 					duration: 1500,
// 					easing: Easing.linear,
// 					useNativeDriver: false,
// 				}),
// 				Animated.timing(this.animations.loader.rotate, {
// 					toValue: 0,
// 					duration: 0,
// 					easing: Easing.linear,
// 					useNativeDriver: false,
// 				}),
// 			]).start(this.loadAnimation.bind(this));
// 		}
// 	}

// 	/**
// 	 * Function to hide the controls. Sets our
// 	 * state then calls the animation.
// 	 */
// 	_hideControls() {
// 		console.log('mounted----', this.mounted, 'showControls----', this.state.showControls)
// 		if (this.mounted) {
// 			let state = this.state;
// 			state.showControls = false;
// 			this.hideControlAnimation();
// 			typeof this.events.onHideControls === 'function' &&
// 				this.events.onHideControls();

// 			this.setState(state);
// 		}
// 	}

// 	/**
// 	 * Function to toggle controls based on
// 	 * current state.
// 	 */
// 	_toggleControls() {
// 		let state = this.state;
// 		state.showControls = !state.showControls;

// 		if (state.showControls) {
// 			this.showControlAnimation();
// 			this.setControlTimeout();
// 			typeof this.events.onShowControls === 'function' &&
// 				this.events.onShowControls();
// 		} else {
// 			this.hideControlAnimation();
// 			this.clearControlTimeout();
// 			typeof this.events.onHideControls === 'function' &&
// 				this.events.onHideControls();
// 		}

// 		this.setState(state);
// 	}

// 	/**
// 	 * Toggle fullscreen changes resizeMode on
// 	 * the <Video> component then updates the
// 	 * isFullscreen state.
// 	 */
// 	_toggleFullscreen() {
// 		let state = this.state;

// 		state.isFullscreen = !state.isFullscreen;

// 		if (this.props.toggleResizeModeOnFullscreen) {
// 			state.resizeMode = state.isFullscreen === true ? 'cover' : 'contain';
// 		}

// 		if (state.isFullscreen) {
// 			typeof this.events.onEnterFullscreen === 'function' &&
// 				this.events.onEnterFullscreen();
// 		} else {
// 			typeof this.events.onExitFullscreen === 'function' &&
// 				this.events.onExitFullscreen();
// 		}

// 		this.setState(state);
// 	}

// 	/**
// 	 * Toggle playing state on <Video> component
// 	 */
// 	_togglePlayPause() {
// 		let state = this.state;
// 		state.paused = !state.paused;

// 		if (state.paused) {
// 			typeof this.events.onPause === 'function' && this.events.onPause();
// 		} else {
// 			typeof this.events.onPlay === 'function' && this.events.onPlay();
// 		}

// 		this.setState(state);
// 	}

// 	/**
// 	 * Toggle between showing time remaining or
// 	 * video duration in the timer control
// 	 */
// 	_toggleTimer() {
// 		let state = this.state;
// 		state.showTimeRemaining = !state.showTimeRemaining;
// 		this.setState(state);
// 	}

// 	/**
// 	 * The default 'onBack' function pops the navigator
// 	 * and as such the video player requires a
// 	 * navigator prop by default.
// 	 */
// 	_onBack() {
// 		this.props.goBack();
// 		// if (this.props.navigator && this.props.navigator.pop) {
// 		//   this.props.navigator.pop();
// 		// } else {
// 		//   console.warn(
// 		//     'Warning: _onBack requires navigator property to function. Either modify the onBack prop or pass a navigator prop',
// 		//   );
// 		// }
// 	}

// 	/**
// 	 * Calculate the time to show in the timer area
// 	 * based on if they want to see time remaining
// 	 * or duration. Formatted to look as 00:00.
// 	 */
// 	calculateTime() {
// 		if (this.state.showTimeRemaining) {
// 			const time = this.state.duration - this.state.currentTime;
// 			return `-${this.formatTime(time)}`;
// 		}

// 		return this.formatTime(this.state.currentTime);
// 	}

// 	/**
// 	 * Format a time string as mm:ss
// 	 *
// 	 * @param {int} time time in milliseconds
// 	 * @return {string} formatted time string in mm:ss format
// 	 */
// 	formatTime(time = 0) {
// 		const symbol = this.state.showRemainingTime ? '-' : '';
// 		time = Math.min(Math.max(time, 0), this.state.duration);

// 		if (!this.state.showHours) {
// 			const formattedMinutes = padStart(Math.floor(time / 60).toFixed(0), 2, 0);
// 			const formattedSeconds = padStart(Math.floor(time % 60).toFixed(0), 2, 0);

// 			return `${symbol}${formattedMinutes}:${formattedSeconds}`;
// 		}

// 		const formattedHours = padStart(Math.floor(time / 3600).toFixed(0), 2, 0);
// 		const formattedMinutes = padStart(
// 			(Math.floor(time / 60) % 60).toFixed(0),
// 			2,
// 			0,
// 		);
// 		const formattedSeconds = padStart(Math.floor(time % 60).toFixed(0), 2, 0);

// 		return `${symbol}${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// 	}

// 	/**
// 	 * Set the position of the seekbar's components
// 	 * (both fill and handle) according to the
// 	 * position supplied.
// 	 *
// 	 * @param {float} position position in px of seeker handle}
// 	 */
// 	setSeekerPosition(position = 0) {
// 		let state = this.state;
// 		position = this.constrainToSeekerMinMax(position);

// 		state.seekerFillWidth = position;
// 		state.seekerPosition = position;

// 		if (!state.seeking) {
// 			state.seekerOffset = position;
// 		}

// 		this.setState(state);
// 	}

// 	/**
// 	 * Constrain the location of the seeker to the
// 	 * min/max value based on how big the
// 	 * seeker is.
// 	 *
// 	 * @param {float} val position of seeker handle in px
// 	 * @return {float} constrained position of seeker handle in px
// 	 */
// 	constrainToSeekerMinMax(val = 0) {
// 		if (val <= 0) {
// 			return 0;
// 		} else if (val >= this.player.seekerWidth) {
// 			return this.player.seekerWidth;
// 		}
// 		return val;
// 	}

// 	/**
// 	 * Calculate the position that the seeker should be
// 	 * at along its track.
// 	 *
// 	 * @return {float} position of seeker handle in px based on currentTime
// 	 */
// 	calculateSeekerPosition() {
// 		const percent = this.state.currentTime / this.state.duration;
// 		return this.player.seekerWidth * percent;
// 	}

// 	/**
// 	 * Return the time that the video should be at
// 	 * based on where the seeker handle is.
// 	 *
// 	 * @return {float} time in ms based on seekerPosition.
// 	 */
// 	calculateTimeFromSeekerPosition() {
// 		const percent = this.state.seekerPosition / this.player.seekerWidth;
// 		return this.state.duration * percent;
// 	}

// 	/**
// 	 * Seek to a time in the video.
// 	 *
// 	 * @param {float} time time to seek to in ms
// 	 */
// 	seekTo(time = 0) {
// 		let state = this.state;
// 		state.currentTime = time;
// 		this.player.ref.seek(time);
// 		this.setState(state);
// 	}

// 	/**
// 	 * Set the position of the volume slider
// 	 *
// 	 * @param {float} position position of the volume handle in px
// 	 */
// 	setVolumePosition(position = 0) {
// 		let state = this.state;
// 		position = this.constrainToVolumeMinMax(position);
// 		state.volumePosition = position + this.player.iconOffset;
// 		state.volumeFillWidth = position;

// 		state.volumeTrackWidth = this.player.volumeWidth - state.volumeFillWidth;

// 		if (state.volumeFillWidth < 0) {
// 			state.volumeFillWidth = 0;
// 		}

// 		if (state.volumeTrackWidth > 150) {
// 			state.volumeTrackWidth = 150;
// 		}

// 		this.setState(state);
// 	}

// 	/**
// 	 * Constrain the volume bar to the min/max of
// 	 * its track's width.
// 	 *
// 	 * @param {float} val position of the volume handle in px
// 	 * @return {float} contrained position of the volume handle in px
// 	 */
// 	constrainToVolumeMinMax(val = 0) {
// 		if (val <= 0) {
// 			return 0;
// 		} else if (val >= this.player.volumeWidth + 9) {
// 			return this.player.volumeWidth + 9;
// 		}
// 		return val;
// 	}

// 	/**
// 	 * Get the volume based on the position of the
// 	 * volume object.
// 	 *
// 	 * @return {float} volume level based on volume handle position
// 	 */
// 	calculateVolumeFromVolumePosition() {
// 		return this.state.volumePosition / this.player.volumeWidth;
// 	}

// 	/**
// 	 * Get the position of the volume handle based
// 	 * on the volume
// 	 *
// 	 * @return {float} volume handle position in px based on volume
// 	 */
// 	calculateVolumePositionFromVolume() {
// 		return this.player.volumeWidth * this.state.volume;
// 	}

// 	/**
// 	  | -------------------------------------------------------
// 	  | React Component functions
// 	  | -------------------------------------------------------
// 	  |
// 	  | Here we're initializing our listeners and getting
// 	  | the component ready using the built-in React
// 	  | Component methods
// 	  |
// 	  */

// 	/**
// 	 * Before mounting, init our seekbar and volume bar
// 	 * pan responders.
// 	 */
// 	UNSAFE_componentWillMount() {
// 		this.initSeekPanResponder();
// 		this.initVolumePanResponder();
// 	}

// 	/**
// 	 * To allow basic playback management from the outside
// 	 * we have to handle possible props changes to state changes
// 	 */
// 	UNSAFE_componentWillReceiveProps(nextProps) {
// 		if (this.state.paused !== nextProps.paused) {
// 			this.setState({
// 				paused: nextProps.paused,
// 			});
// 		}

// 		if (this.styles.videoStyle !== nextProps.videoStyle) {
// 			this.styles.videoStyle = nextProps.videoStyle;
// 		}

// 		if (this.styles.containerStyle !== nextProps.style) {
// 			this.styles.containerStyle = nextProps.style;
// 		}
// 	}

// 	/**
// 	 * Upon mounting, calculate the position of the volume
// 	 * bar based on the volume property supplied to it.
// 	 */
// 	componentDidMount() {
// 		const position = this.calculateVolumePositionFromVolume();
// 		let state = this.state;
// 		this.setVolumePosition(position);
// 		state.volumeOffset = position;
// 		this.mounted = true;

// 		this.setState(state);
// 	}

// 	/**
// 	 * When the component is about to unmount kill the
// 	 * timeout less it fire in the prev/next scene
// 	 */
// 	componentWillUnmount() {
// 		this.mounted = false;
// 		this.clearControlTimeout();
// 	}

// 	/**
// 	 * Get our seekbar responder going
// 	 */
// 	initSeekPanResponder() {
// 		this.player.seekPanResponder = PanResponder.create({
// 			// Ask to be the responder.
// 			onStartShouldSetPanResponder: (evt, gestureState) => true,
// 			onMoveShouldSetPanResponder: (evt, gestureState) => true,

// 			/**
// 			 * When we start the pan tell the machine that we're
// 			 * seeking. This stops it from updating the seekbar
// 			 * position in the onProgress listener.
// 			 */
// 			onPanResponderGrant: (evt, gestureState) => {
// 				let state = this.state;
// 				this.clearControlTimeout();
// 				const position = evt.nativeEvent.locationX;
// 				this.setSeekerPosition(position);
// 				state.seeking = true;
// 				state.originallyPaused = state.paused;
// 				state.scrubbing = false;
// 				if (this.player.scrubbingTimeStep > 0) {
// 					state.paused = true;
// 				}
// 				this.setState(state);
// 			},

// 			/**
// 			 * When panning, update the seekbar position, duh.
// 			 */
// 			onPanResponderMove: (evt, gestureState) => {
// 				const position = this.state.seekerOffset + gestureState.dx;
// 				this.setSeekerPosition(position);
// 				let state = this.state;

// 				if (
// 					this.player.scrubbingTimeStep > 0 &&
// 					!state.loading &&
// 					!state.scrubbing
// 				) {
// 					const time = this.calculateTimeFromSeekerPosition();
// 					const timeDifference = Math.abs(state.currentTime - time) * 1000;

// 					if (
// 						time < state.duration &&
// 						timeDifference >= this.player.scrubbingTimeStep
// 					) {
// 						state.scrubbing = true;

// 						this.setState(state);
// 						setTimeout(() => {
// 							this.player.ref.seek(time, this.player.scrubbingTimeStep);
// 						}, 1);
// 					}
// 				}
// 			},

// 			/**
// 			 * On release we update the time and seek to it in the video.
// 			 * If you seek to the end of the video we fire the
// 			 * onEnd callback
// 			 */
// 			onPanResponderRelease: (evt, gestureState) => {
// 				const time = this.calculateTimeFromSeekerPosition();
// 				let state = this.state;
// 				if (time >= state.duration && !state.loading) {
// 					state.paused = true;
// 					this.events.onEnd();
// 				} else if (state.scrubbing) {
// 					state.seeking = false;
// 				} else {
// 					this.seekTo(time);
// 					this.setControlTimeout();
// 					state.paused = state.originallyPaused;
// 					state.seeking = false;
// 				}
// 				this.setState(state);
// 			},
// 		});
// 	}

// 	/**
// 	 * Initialize the volume pan responder.
// 	 */
// 	initVolumePanResponder() {
// 		this.player.volumePanResponder = PanResponder.create({
// 			onStartShouldSetPanResponder: (evt, gestureState) => true,
// 			onMoveShouldSetPanResponder: (evt, gestureState) => true,
// 			onPanResponderGrant: (evt, gestureState) => {
// 				this.clearControlTimeout();
// 			},

// 			/**
// 			 * Update the volume as we change the position.
// 			 * If we go to 0 then turn on the mute prop
// 			 * to avoid that weird static-y sound.
// 			 */
// 			onPanResponderMove: (evt, gestureState) => {
// 				let state = this.state;
// 				const position = this.state.volumeOffset + gestureState.dx;

// 				this.setVolumePosition(position);
// 				state.volume = this.calculateVolumeFromVolumePosition();

// 				if (state.volume <= 0) {
// 					state.muted = true;
// 				} else {
// 					state.muted = false;
// 				}

// 				this.setState(state);
// 			},

// 			/**
// 			 * Update the offset...
// 			 */
// 			onPanResponderRelease: (evt, gestureState) => {
// 				let state = this.state;
// 				state.volumeOffset = state.volumePosition;
// 				this.setControlTimeout();
// 				this.setState(state);
// 			},
// 		});
// 	}

// 	/**
// 	  | -------------------------------------------------------
// 	  | Rendering
// 	  | -------------------------------------------------------
// 	  |
// 	  | This section contains all of our render methods.
// 	  | In addition to the typical React render func
// 	  | we also have all the render methods for
// 	  | the controls.
// 	  |
// 	  */

// 	/**
// 	 * Standard render control function that handles
// 	 * everything except the sliders. Adds a
// 	 * consistent <TouchableHighlight>
// 	 * wrapper and styling.
// 	 */
// 	renderControl(children, callback, style = {}) {
// 		return (
// 			<TouchableHighlight
// 				isTVSelectable={this.state.setTvFocus}
// 				tvParallaxProperties={{
// 					enabled: true,
// 					shiftDistanceX: 1.9,
// 					shiftDistanceY: 1.9,
// 					tiltAngle: 0.05,
// 					magnification: 1.55,
// 				}}
// 				underlayColor={'transparent'}
// 				activeOpacity={0.3}
// 				onPress={() => {
// 					this.resetControlTimeout();
// 					callback();
// 				}}
// 				style={[styles.controls.control, style]}>
// 				{children}
// 			</TouchableHighlight>
// 		);
// 	}

// 	/**
// 	 * Renders an empty control, used to disable a control without breaking the view layout.
// 	 */
// 	renderNullControl() {
// 		return <View style={[styles.controls.control]} />;
// 	}

// 	/**
// 	 * Groups the top bar controls together in an animated
// 	 * view and spaces them out.
// 	 */
// 	renderTopControls() {
// 		const backControl = this.props.disableBack
// 			? this.renderNullControl()
// 			: this.renderBack();
// 		const volumeControl = this.props.disableVolume
// 			? this.renderNullControl()
// 			: this.renderVolume();
// 		const fullscreenControl = this.props.disableFullscreen
// 			? this.renderNullControl()
// 			: this.renderFullscreen();

// 		return (
// 			<Animated.View
// 				style={[
// 					styles.controls.top,
// 					{
// 						opacity: this.animations.topControl.opacity,
// 						marginTop: this.animations.topControl.marginTop,
// 					},
// 				]}>
// 				<ImageBackground
// 					source={require('../../src/assets/img/top-vignette.png')}
// 					style={[styles.controls.column]}
// 					imageStyle={[styles.controls.vignette]}>
// 					<SafeAreaView style={styles.controls.topControlGroup}>
// 						{backControl}
// 						<View style={styles.controls.pullRight}>
// 							{volumeControl}
// 							{fullscreenControl}
// 						</View>
// 					</SafeAreaView>
// 				</ImageBackground>
// 			</Animated.View>
// 		);
// 	}

// 	/**
// 	 * Back button control
// 	 */
// 	renderBack() {
// 		return this.renderControl(
// 			<Image
// 				source={require('../../src/assets/img/back.png')}
// 				style={styles.controls.back}
// 			/>,
// 			this.events.onBack,
// 			styles.controls.back,
// 		);
// 	}

// 	/**
// 	 * Render the volume slider and attach the pan handlers
// 	 */
// 	renderVolume() {
// 		return (
// 			<View style={styles.volume.container}>
// 				<View
// 					style={[styles.volume.fill, { width: this.state.volumeFillWidth }]}
// 				/>
// 				<View
// 					style={[styles.volume.track, { width: this.state.volumeTrackWidth }]}
// 				/>
// 				<View
// 					style={[styles.volume.handle, { left: this.state.volumePosition }]}
// 					{...this.player.volumePanResponder.panHandlers}>
// 					<Image
// 						style={styles.volume.icon}
// 						source={require('../../src/assets/img/volume.png')}
// 					/>
// 				</View>
// 			</View>
// 		);
// 	}

// 	/**
// 	 * Render fullscreen toggle and set icon based on the fullscreen state.
// 	 */
// 	renderFullscreen() {
// 		let source =
// 			this.state.isFullscreen === true
// 				? require('../../src/assets/img/shrink.png')
// 				: require('../../src/assets/img/expand.png');
// 		return this.renderControl(
// 			<Image source={source} />,
// 			this.methods.toggleFullscreen,
// 			styles.controls.fullscreen,
// 		);
// 	}

// 	/**
// 	 * Render bottom control group and wrap it in a holder
// 	 */
// 	renderBottomControls() {
// 		const timerControl = this.props.disableTimer
// 			? this.renderNullControl()
// 			: this.renderTimer();
// 		const seekbarControl = this.props.disableSeekbar
// 			? this.renderNullControl()
// 			: this.renderSeekbar();
// 		const playPauseControl = this.props.disablePlayPause
// 			? this.renderNullControl()
// 			: this.renderPlayPause();

// 		return (
// 			<Animated.View
// 				style={[
// 					styles.controls.bottom,
// 					{
// 						opacity: this.animations.bottomControl.opacity,
// 						marginBottom: this.animations.bottomControl.marginBottom,
// 					},
// 				]}>
// 				<ImageBackground
// 					source={require('../../src/assets/img/bottom-vignette.png')}
// 					style={[styles.controls.column]}
// 					imageStyle={[styles.controls.vignette]}>
// 					{seekbarControl}
// 					<SafeAreaView
// 						style={[styles.controls.row, styles.controls.bottomControlGroup]}>
// 						{playPauseControl}
// 						{this.settingIcon()}
// 						{this.renderTitle()}
// 						{timerControl}
// 					</SafeAreaView>
// 				</ImageBackground>
// 			</Animated.View>
// 		);
// 	}

// 	/**
// 	 * Render the seekbar and attach its handlers
// 	 */
// 	renderSeekbar() {
// 		return (
// 			<View
// 				style={styles.seekbar.container}
// 				collapsable={false}
// 				{...this.player.seekPanResponder.panHandlers}>
// 				<View
// 					style={styles.seekbar.track}
// 					onLayout={event =>
// 						(this.player.seekerWidth = event.nativeEvent.layout.width)
// 					}
// 					pointerEvents={'none'}>
// 					<View
// 						style={[
// 							styles.seekbar.fill,
// 							{
// 								width: this.state.seekerFillWidth,
// 								backgroundColor: this.props.seekColor || '#FFF',
// 							},
// 						]}
// 						pointerEvents={'none'}
// 					/>
// 				</View>
// 				<View
// 					style={[styles.seekbar.handle, { left: this.state.seekerPosition }]}
// 					pointerEvents={'none'}>
// 					<View
// 						style={[
// 							styles.seekbar.circle,
// 							{ backgroundColor: this.props.seekColor || '#FFF' },
// 						]}
// 						pointerEvents={'none'}
// 					/>
// 				</View>
// 			</View>
// 		);
// 	}

// 	/**
// 	 * Render the play/pause button and show the respective icon
// 	 */
// 	renderPlayPause() {
// 		let source =
// 			this.state.paused === true
// 				? require('../../src/assets/img/play.png')
// 				: require('../../src/assets/img/pause.png');
// 		return this.renderControl(
// 			<Image source={source} />,
// 			this.methods.togglePlayPause,
// 			styles.controls.playPause,
// 		);
// 	}

// 	/**
// 	 * Render our title...if supplied.
// 	 */
// 	renderTitle() {
// 		if (this.opts.title) {
// 			return (
// 				<View style={[styles.controls.control, styles.controls.title]}>
// 					<Text
// 						style={[styles.controls.text, styles.controls.titleText]}
// 						numberOfLines={1}>
// 						{this.opts.title || ''}
// 					</Text>
// 				</View>
// 			);
// 		}

// 		return null;
// 	}

// 	/**
// 	 * Show our timer.
// 	 */
// 	renderTimer() {
// 		return this.renderControl(
// 			<Text style={styles.controls.timerText}>{this.calculateTime()}</Text>,
// 			this.methods.toggleTimer,
// 			styles.controls.timer,
// 		);
// 	}

// 	/**
// 	 * Show loading icon
// 	 */
// 	renderLoader() {
// 		if (this.state.loading) {
// 			return (
// 				<View style={styles.loader.container}>
// 					<Animated.Image
// 						source={require('../../src/assets/img/loader-icon.png')}
// 						style={[
// 							styles.loader.icon,
// 							{
// 								transform: [
// 									{
// 										rotate: this.animations.loader.rotate.interpolate({
// 											inputRange: [0, 360],
// 											outputRange: ['0deg', '360deg'],
// 										}),
// 									},
// 								],
// 							},
// 						]}
// 					/>
// 				</View>
// 			);
// 		}
// 		return null;
// 	}

// 	renderError() {
// 		if (this.state.error) {
// 			return (
// 				<View style={styles.error.container}>
// 					<Image
// 						source={require('../../src/assets/img/error-icon.png')}
// 						style={styles.error.icon}
// 					/>
// 					<Text style={styles.error.text}>{this.state.errorMessage}</Text>
// 				</View>
// 			);
// 		}
// 		return null;
// 	}

// 	/**
// 	*  Setting icon on bottom controls
// 	*/
// 	settingIcon = () => {
// 		return (
// 			<TouchableHighlight
// 				isTVSelectable={this.state.setTvFocus}
// 				tvParallaxProperties={{
// 					enabled: true,
// 					shiftDistanceX: 1.9,
// 					shiftDistanceY: 1.9,
// 					tiltAngle: 0.05,
// 					magnification: 1.55,
// 				}}
// 				underlayColor={'transparent'}
// 				onPress={() => {
// 					this.setState({ setTvFocus: false, actionSheet: true })
// 				}}>
// 				<Text style={{ color: 'gray', fontFamily: 'Montserrat-Medium' }}>
// 					<ImageIcon name={'cog'} color={'white'} size={18} />  Settings
// 				</Text>
// 			</TouchableHighlight> 
// 		);
// 	};

// 	/**
//    * Action sheet
//    */

// 	actionSheet = () => {
// 		return (
// 			<ActionSheet ref={this.ActionSheetRef} height={0}>
// 				<View style={{ paddingHorizontal: '2%' }}>
// 					<View style={{ flexDirection: 'row' }}>
// 						<View
// 							style={{
// 								borderRightWidth: 0.5,
// 								borderRightColor: 'gray',
// 								// height: 130,
// 								width: '50%',
// 								paddingTop: 10,
// 							}}>
// 							<View>
// 								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.5) }}>
// 									{' '}
// 									<ImageIcon size={normalize(1.5)} name={'volume-up'} /> Audio Language
// 								</Text>
// 							</View>
// 							{this.state.audioTracks.length && this.state.audioTracks.map((item, index) => {
// 								return (
// 									<TouchableHighlight
// 										key={index}
// 										// hasTVPreferredFocus={true}
// 										tvParallaxProperties={{
// 											enabled: true,
// 											shiftDistanceX: 1.9,
// 											shiftDistanceY: 1.9,
// 											tiltAngle: 0.05,
// 											magnification: 1.15,
// 										}}
// 										isTVSelectable={!this.state.setTvFocus}
// 										underlayColor={'transparent'}
// 										onPress={() => this._onChangeAudio(item)}>
// 										<View style={{ flexDirection: 'row', paddingTop: 7 }}>
// 											<View style={{ width: 30 }}>
// 												{this.state.selectedAudioTrack ? (
// 													this.state.selectedAudioTrack.value ===
// 														item.language ? (
// 														<ImageIcon size={18} color={'blue'} name={'check'} />
// 													) : null
// 												) : null}
// 											</View>
// 											<View>
// 												<Text
// 													style={{
// 														color: this.state.selectedAudioTrack
// 															? this.state.selectedAudioTrack.value ==
// 																item.language
// 																? 'blue'
// 																: 'black'
// 															: 'black',
// 														fontSize: normalize(1.3)
// 													}}>
// 													{/* {lang[index]} */}
// 													{item.language}
// 												</Text>
// 											</View>
// 										</View>
// 									</TouchableHighlight>
// 								);
// 							})}
// 						</View>
// 						<View
// 							style={{
// 								// height: 150,
// 								width: '50%',
// 								paddingTop: 10,
// 								paddingLeft: 15,
// 								// justifyContent:'flex-start',
// 							}}>
// 							<View>
// 								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.5) }}>
// 									{' '}
// 									<ImageIcon size={normalize(1.5)} name={'commenting'} /> Subtitles
// 								</Text>
// 							</View>

// 							{this.state.textTracks.map((item, index) => {
// 								return (
// 									<TouchableHighlight
// 										key={index}
// 										// hasTVPreferredFocus={true}
// 										tvParallaxProperties={{
// 											enabled: true,
// 											shiftDistanceX: 1.9,
// 											shiftDistanceY: 1.9,
// 											tiltAngle: 0.05,
// 											magnification: 1.15,
// 										}}
// 										isTVSelectable={!this.state.setTvFocus}
// 										underlayColor={'transparent'}
// 										onPress={() => this._onChangeText(item)}>
// 										<View style={{ flexDirection: 'row', paddingTop: 7 }}>
// 											<View style={{ width: 30 }}>
// 												{this.state.selectedTextTrack ? (
// 													this.state.selectedTextTrack.value ===
// 														item.language ? (
// 														<ImageIcon size={18} color={'blue'} name={'check'} />
// 													) : null
// 												) : null}
// 											</View>
// 											<View>
// 												<Text
// 													style={{
// 														color: this.state.selectedTextTrack
// 															? this.state.selectedTextTrack.value ===
// 																item.language
// 																? 'blue'
// 																: 'black'
// 															: 'black',
// 														fontSize: normalize(1.3)
// 													}}>
// 													{item.title} {'(' + item.language + ')'}
// 												</Text>
// 											</View>
// 										</View>
// 									</TouchableHighlight>
// 								);
// 							})}
// 							<TouchableHighlight
// 								// key={index}
// 								// hasTVPreferredFocus={true}
// 								tvParallaxProperties={{
// 									enabled: true,
// 									shiftDistanceX: 1.9,
// 									shiftDistanceY: 1.9,
// 									tiltAngle: 0.05,
// 									magnification: 1.15,
// 								}}
// 								isTVSelectable={!this.state.setTvFocus}
// 								underlayColor={'transparent'}
// 								onPress={() => this.onTextTracksOff()}>
// 								<View style={{ flexDirection: 'row', paddingTop: 7 }}>
// 									<View style={{ width: 30 }}>
// 										{this.state.selectedTextTrack ? (
// 											this.state.selectedTextTrack.value ===
// 												'Off' ? (
// 												<ImageIcon size={18} color={'blue'} name={'check'} />
// 											) : null
// 										) : null}
// 									</View>
// 									<View>
// 										<Text
// 											style={{
// 												color: this.state.selectedTextTrack
// 													? this.state.selectedTextTrack.value ===
// 														'Off'
// 														? 'blue'
// 														: 'black'
// 													: 'black',
// 												fontSize: normalize(1.3)
// 											}}>
// 											{'(' + 'Off' + ')'}
// 										</Text>
// 									</View>
// 								</View>
// 							</TouchableHighlight>
// 						</View>
// 					</View>
// 				</View>
// 			</ActionSheet>
// 		);
// 	};

// 	/**
// 	 * Provide all of our options and render the whole component.
// 	 */
// 	render() {
// 		return (
// 			<TouchableHighlight
// 				// hasTVPreferredFocus={!this.state.showControls}
// 				isTVSelectable={!this.state.showControls}
// 				onPress={this.events.onScreenTouch}
// 				style={[styles.player.container, this.styles.containerStyle]}>
// 				<View style={[styles.player.container, this.styles.containerStyle]}>
// 					<Video
// 						{...this.props}
// 						ref={videoPlayer => (this.player.ref = videoPlayer)}
// 						resizeMode={this.state.resizeMode}
// 						volume={this.state.volume}
// 						paused={this.state.paused}
// 						muted={this.state.muted}
// 						rate={this.state.rate}
// 						onLoadStart={this.events.onLoadStart}
// 						onProgress={this.events.onProgress}
// 						onError={this.events.onError}
// 						onLoad={this.events.onLoad}
// 						onEnd={this.events.onEnd}
// 						onSeek={this.events.onSeek}
// 						style={[styles.player.video, this.styles.videoStyle]}
// 						onAudioTracks={this.onAudioTracks}
// 						onTextTracks={this.onTextTracks}
// 						selectedTextTrack={this.state.selectedTextTrack}
// 						selectedAudioTrack={this.state.selectedAudioTrack}
// 						source={this.state.video_source}
// 					/>
// 					{this.renderError()}
// 					{this.renderLoader()}
// 					{this.props.control && this.renderTopControls()}
// 					{this.props.control && this.renderBottomControls()}

// 					<Modal
// 						isVisible={this.state.actionSheet}
// 						// animationType=
// 						transparent={true}
// 						onRequestClose={() => this.setState({ actionSheet: false })}
// 						style={{
// 							margin: 0,
// 							justifyContent: 'flex-end'
// 						}}
// 					>
// 						<TouchableHighlight style={{
// 							margin: 0,
// 							justifyContent: 'flex-end',
// 							flex: 1
// 						}} onPress={() => this.setState({ actionSheet: false })}>
// 							<ActionSheets
// 								audioTracks={this.state.audioTracks}
// 								textTracks={this.state.textTracks}
// 								selectedTextTrack={this.state.selectedTextTrack}
// 								selectedAudioTrack={this.state.selectedAudioTrack}
// 								onAudioTracksChange={(item) => this._onChangeAudio(item)}
// 								onTextTracksChange={(item) => this._onChangeText(item)}
// 								onCancel={() => this.setState({ actionSheet: false })}
// 								onTextTracksOff={() => this.onTextTracksOff()}
// 							/>
// 						</TouchableHighlight>
// 					</Modal>
// 				</View>
// 			</TouchableHighlight>
// 		);
// 	}
// }

// /**
//  * This object houses our styles. There's player
//  * specific styles and control specific ones.
//  * And then there's volume/seeker styles.
//  */
// const styles = {
// 	player: StyleSheet.create({
// 		container: {
// 			overflow: 'hidden',
// 			backgroundColor: '#000',
// 			flex: 1,
// 			alignSelf: 'stretch',
// 			justifyContent: 'space-between',
// 		},
// 		video: {
// 			overflow: 'hidden',
// 			position: 'absolute',
// 			top: 0,
// 			right: 0,
// 			bottom: 0,
// 			left: 0,
// 		},
// 	}),
// 	error: StyleSheet.create({
// 		container: {
// 			backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
// 			position: 'absolute',
// 			top: 0,
// 			right: 0,
// 			bottom: 0,
// 			left: 0,
// 			justifyContent: 'center',
// 			alignItems: 'center',
// 		},
// 		icon: {
// 			marginBottom: 16,
// 		},
// 		text: {
// 			backgroundColor: 'transparent',
// 			color: '#f27474',
// 		},
// 	}),
// 	loader: StyleSheet.create({
// 		container: {
// 			position: 'absolute',
// 			top: 0,
// 			right: 0,
// 			bottom: 0,
// 			left: 0,
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 		},
// 	}),
// 	controls: StyleSheet.create({
// 		row: {
// 			flexDirection: 'row',
// 			alignItems: 'center',
// 			justifyContent: 'space-between',
// 			height: null,
// 			width: null,
// 		},
// 		column: {
// 			flexDirection: 'column',
// 			alignItems: 'center',
// 			justifyContent: 'space-between',
// 			height: null,
// 			width: null,
// 		},
// 		vignette: {
// 			resizeMode: 'stretch',
// 		},
// 		control: {
// 			padding: 16,
// 		},
// 		text: {
// 			backgroundColor: 'transparent',
// 			color: '#FFF',
// 			fontSize: 14,
// 			textAlign: 'center',
// 		},
// 		pullRight: {
// 			flexDirection: 'row',
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 		},
// 		top: {
// 			flex: 1,
// 			alignItems: 'stretch',
// 			justifyContent: 'flex-start',
// 		},
// 		bottom: {
// 			alignItems: 'stretch',
// 			flex: 2,
// 			justifyContent: 'flex-end',
// 		},
// 		topControlGroup: {
// 			alignSelf: 'stretch',
// 			alignItems: 'center',
// 			justifyContent: 'space-between',
// 			flexDirection: 'row',
// 			width: null,
// 			margin: 12,
// 			marginBottom: 18,
// 		},
// 		bottomControlGroup: {
// 			alignSelf: 'stretch',
// 			alignItems: 'center',
// 			justifyContent: 'space-between',
// 			marginLeft: 12,
// 			marginRight: 12,
// 			marginBottom: 0,
// 		},
// 		volume: {
// 			flexDirection: 'row',
// 		},
// 		fullscreen: {
// 			flexDirection: 'row',
// 		},
// 		playPause: {
// 			position: 'relative',
// 			width: 80,
// 			zIndex: 0,
// 		},
// 		title: {
// 			alignItems: 'center',
// 			flex: 0.6,
// 			flexDirection: 'column',
// 			padding: 0,
// 		},
// 		titleText: {
// 			textAlign: 'center',
// 		},
// 		timer: {
// 			width: 80,
// 		},
// 		timerText: {
// 			backgroundColor: 'transparent',
// 			color: '#FFF',
// 			fontSize: 11,
// 			textAlign: 'right',
// 		},
// 	}),
// 	volume: StyleSheet.create({
// 		container: {
// 			alignItems: 'center',
// 			justifyContent: 'flex-start',
// 			flexDirection: 'row',
// 			height: 1,
// 			marginLeft: 20,
// 			marginRight: 20,
// 			width: 150,
// 		},
// 		track: {
// 			backgroundColor: '#333',
// 			height: 1,
// 			marginLeft: 7,
// 		},
// 		fill: {
// 			backgroundColor: '#FFF',
// 			height: 1,
// 		},
// 		handle: {
// 			position: 'absolute',
// 			marginTop: -24,
// 			marginLeft: -24,
// 			padding: 16,
// 		},
// 		icon: {
// 			marginLeft: 7,
// 		},
// 	}),
// 	seekbar: StyleSheet.create({
// 		container: {
// 			alignSelf: 'stretch',
// 			height: 28,
// 			marginLeft: 20,
// 			marginRight: 20,
// 		},
// 		track: {
// 			backgroundColor: '#333',
// 			height: 1,
// 			position: 'relative',
// 			top: 14,
// 			width: '100%',
// 		},
// 		fill: {
// 			backgroundColor: '#FFF',
// 			height: 1,
// 			width: '100%',
// 		},
// 		handle: {
// 			position: 'absolute',
// 			marginLeft: -7,
// 			height: 28,
// 			width: 28,
// 		},
// 		circle: {
// 			borderRadius: 12,
// 			position: 'relative',
// 			top: 8,
// 			left: 8,
// 			height: 12,
// 			width: 12,
// 		},
// 	}),
// };




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
	Text
} from 'react-native';
import padStart from 'lodash/padStart';
import { ImageIcon, normalize } from './assets/Icon/icon';
import Modal from 'react-native-modal';
const lang = ['English', 'Dutch'];
import ActionSheets from './nativeCustomManager/actionSheet';
import { PercentageBar } from 'react-native-video/nativeCustomManager/progress';

export default class VideoPlayer extends Component {
	static defaultProps = {
		toggleResizeModeOnFullscreen: true,
		controlAnimationTiming: 500,
		doubleTapTime: 130,
		playInBackground: false,
		playWhenInactive: false,
		resizeMode: 'contain',
		isFullscreen: true,
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
				this.props.isFullScreen || this.props.resizeMode === 'cover' || true,
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
			trackJson: this.props.trackingJson && this.props.trackingJson !== null ? this.parseTrackingJson() : null,
			eventJson: this.props.trackingJson && this.props.trackingJson !== null ? this.parseEventJson() : null,
			showSkip: false,
			skipTo: 0,
			adBar: 0,
			adDuration: 0,
			eventStack: [],
		};

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
	}

	componentDidUpdate = prevProps => {
		const { isFullscreen } = this.props;

		if (prevProps.isFullscreen !== isFullscreen) {
			this.setState({
				isFullscreen,
			});
		}
	};


	shouldComponentUpdate = (nextProps, nextState) => {
		if(this.props.trackingJson !== nextProps.trackingJson){
			const trackingJson = this.parseTrackingJson(nextProps.trackingJson)
			const eventJson = this.parseEventJson(nextProps.trackingJson)
			this.setState({
				trackJson: trackingJson,
				eventJson: eventJson
			})
			return true
		}else if(this.state !== nextState) {
			return true
		}else {
			return false
		}
		
	}





	parseTrackingJson = () => {
		var trackAvails = [...this.props.trackingJson.avails];
		var newData = {};

		trackAvails.forEach((element) => {
			element.ads.forEach((adElement) => {
				let data = adElement.trackingEvents.reduce(
					(previousObject, currentObject) => {
						const time = parseInt(currentObject.startTimeInSeconds);
						return Object.assign(previousObject, {
							[time]: {
								time: currentObject.startTimeInSeconds,
								eventType: currentObject.eventType,
								beaconUrls: ["https://randomuser.me/api/"],
								start: element.startTimeInSeconds,
								end: element.startTimeInSeconds + element.durationInSeconds,
								duration: element.durationInSeconds,
								skipOffset: this.stringToSec(adElement.skipOffset),
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

	parseEventJson = () => {
		var trackAvails = [...this.props.trackingJson.avails];
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
								beaconUrls: ["https://randomuser.me/api/"],
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
			}

			state.duration = data.duration;
			state.loading = false;
			this.setState(state);

			if (state.showControls) {
				this.setControlTimeout();
			}

			if (typeof this.props.onLoad === 'function') {
				this.props.onLoad(...arguments);
			}
		} catch (error) {
			console.log('Error on Load-')
		}

	}


	alertBeacons(urls) {
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
 * SHOWING AD UI 
 */

	stringToSec = (timeString) => {
		const arr = timeString.split(":");
		const seconds = arr[0] * 3600 + arr[1] * 60 + +arr[2];
		return seconds;
	};

	_onProgressAds(data) {
		const timeObj = this.state.trackJson;
		let state = this.state;
		// const trackingAvail = [...this.tracking_json_.avails];
		const currentTime = parseInt(data.currentTime);
		for (const time in timeObj) {
			if (
				timeObj[time].start < currentTime &&
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

				state.adDuration = ((parseInt(timeObj[time].duration) + timeObj[time].start) - currentTime)
				state.adBar = (currentTime - timeObj[time].start) / (timeObj[time].end - timeObj[time].start);
				// this.setState({ adDuration:  (parseInt(timeObj[time].duration) - currentTime)*1000})
				if (!this.state.isAdVisible) {
					// this.setState({isAdVisible: true})
					state.isAdVisible = true
					state.controls = false
					// console.log("timeObj[time].start", timeObj[time].start, this.state.isAdVisible)
					// adDuration = timeObj[time].start + parseInt(timeObj[time].duration)
				}
				if (
					parseInt(timeObj[time].start) +
					parseInt(timeObj[time].skipOffset) ===
					currentTime
				) {

					const skipTo = timeObj[time].start + timeObj[time].duration;
					this.currentAdTime = skipTo;
					state.skipTo = skipTo
					state.showSkip = true
				}

			}
			if (parseInt(timeObj[time].end) === currentTime) {
				state.isAdVisible = false
				state.adDuration = 0
				state.adBar = 0
				state.skipTo = 0
				state.showSkip = false
				state.eventStack = []
				state.controls = true
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
			state.currentTime = data.currentTime;
			this._onProgressAds(data)
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
		// const selectedTrack = data.audioTracks?.find((x: any) => {
		// 	return x.selected;
		// });


		state.audioTracks = data.audioTracks;
		// if (selectedTrack?.language) {
		// 	this.setState({
		// 		selectedAudioTrack: {
		// 			type: 'language',
		// 			value: selectedTrack?.language,
		// 		},
		// 	});
		// 	state.selectedAudioTrack = {
		// 		type: 'language',
		// 		value: selectedTrack?.language,
		// 	}
		// }
		this.setState(state);
		// console.log(state.audioTracks,'--audioTracks-------', data.audioTracks);
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
		console.log('TextTrack----------', item.language);
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

	onTextTracks = (data) => {

		let state = this.state;
		// const selectedTrack = data.textTracks?.find((x: any) => {
		// 	return x.selected;
		// });
		state.textTracks = data.textTracks
		console.log('Text Data------', data.textTracks)
		state.selectedTextTrack = {
			type: 'disable',
			value: 'Off',
		}

		this.setState(state);
	};

	onTextTracksOff = () => {
		let state = this.state;
		state.selectedTextTrack = {
			type: 'disable',
			value: 'Off',
		}
		this.setState(state);
		//   this.ActionSheetRef.current?.hide();
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
		console.log(this.player.tapActionTimeout, '<-tapActionTimeout--------showControls->', this.state.showControls)
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
				adDuration :0,
				adBar :0,
				skipTo :0,
				showSkip :false,
				eventStack :[],
				controls :true,
				// currentTime: time
			}), () => {
				this.player.ref.seek(time);
			})

		}else {
			this.player.ref.seek(time);
			// this.setState((prevState) => ({
			// 	...prevState,
			// 	currentTime: time
			// }), () => {
			// 	this.player.ref.seek(time);
			// })
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
	calculateVolumePositionFromVolume() {
		return this.player.volumeWidth * this.state.volume;
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
	}

	/**
	 * When the component is about to unmount kill the
	 * timeout less it fire in the prev/next scene
	 */
	componentWillUnmount() {
		this.mounted = false;
		this.clearControlTimeout();
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
	renderControl(children, callback, style = {}) {
		return (
			<TouchableHighlight
				isTVSelectable={this.state.setTvFocus}
				tvParallaxProperties={{
					enabled: true,
					shiftDistanceX: 1.9,
					shiftDistanceY: 1.9,
					tiltAngle: 0.05,
					magnification: 1.55,
				}}
				underlayColor={'transparent'}
				activeOpacity={0.3}
				onPress={() => {
					this.resetControlTimeout();
					callback();
				}}
				style={[styles.controls.control, style]}>
				{children}
			</TouchableHighlight>
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
		const volumeControl = this.props.disableVolume
			? this.renderNullControl()
			: this.renderVolume();
		const fullscreenControl = this.props.disableFullscreen
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
					source={require('../../src/assets/img/top-vignette.png')}
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
		return this.renderControl(
			<Image
				source={require('../../src/assets/img/back.png')}
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
						source={require('../../src/assets/img/volume.png')}
					/>
				</View>
			</View>
		);
	}

	/**
	 * Render fullscreen toggle and set icon based on the fullscreen state.
	 */
	renderFullscreen() {
		let source =
			this.state.isFullscreen === true
				? require('../../src/assets/img/shrink.png')
				: require('../../src/assets/img/expand.png');
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
					source={require('../../src/assets/img/bottom-vignette.png')}
					style={[styles.controls.column]}
					imageStyle={[styles.controls.vignette]}>
					{seekbarControl}
					<SafeAreaView
						style={[styles.controls.row, styles.controls.bottomControlGroup]}>
						{playPauseControl}
						{this.settingIcon()}
						{this.renderTitle()}
						{timerControl}
					</SafeAreaView>
				</ImageBackground>
			</Animated.View>
		);
	}

	/**
	 * Render the seekbar and attach its handlers
	 */
	renderSeekbar() {
		return (
			<View
				style={styles.seekbar.container}
				collapsable={false}
				{...this.player.seekPanResponder.panHandlers}>
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
					style={[styles.seekbar.handle, { left: this.state.seekerPosition }]}
					pointerEvents={'none'}>
					<View
						style={[
							styles.seekbar.circle,
							{ backgroundColor: this.props.seekColor || '#FFF' },
						]}
						pointerEvents={'none'}
					/>
				</View>
			</View>
		);
	}

	/**
	 * Render the play/pause button and show the respective icon
	 */
	renderPlayPause() {
		let source =
			this.state.paused === true
				? require('../../src/assets/img/play.png')
				: require('../../src/assets/img/pause.png');
		return this.renderControl(
			<Image source={source} />,
			this.methods.togglePlayPause,
			styles.controls.playPause,
		);
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
		if (this.state.loading) {
			return (
				<View style={styles.loader.container}>
					<Animated.Image
						source={require('../../src/assets/img/loader-icon.png')}
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
						source={require('../../src/assets/img/error-icon.png')}
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
		return (
			<TouchableHighlight
				isTVSelectable={this.state.setTvFocus}
				tvParallaxProperties={{
					enabled: true,
					shiftDistanceX: 1.9,
					shiftDistanceY: 1.9,
					tiltAngle: 0.05,
					magnification: 1.55,
				}}
				underlayColor={'transparent'}
				onPress={() => {
					this.setState({ setTvFocus: false, actionSheet: true })
				}}>
				<Text style={{ color: 'gray', fontFamily: 'Montserrat-Medium' }}>
					<ImageIcon name={'cog'} color={'white'} size={18} />  Settings
				</Text>
			</TouchableHighlight>
		);
	};

	/**
   * Action sheet
   */

	actionSheet = () => {
		return (
			<ActionSheet ref={this.ActionSheetRef} height={0}>
				<View style={{ paddingHorizontal: '2%' }}>
					<View style={{ flexDirection: 'row' }}>
						<View
							style={{
								borderRightWidth: 0.5,
								borderRightColor: 'gray',
								// height: 130,
								width: '50%',
								paddingTop: 10,
							}}>
							<View>
								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.5) }}>
									{' '}
									<ImageIcon size={normalize(1.5)} name={'volume-up'} /> Audio Language
								</Text>
							</View>
							{this.state.audioTracks.length && this.state.audioTracks.map((item, index) => {
								return (
									<TouchableHighlight
										key={index}
										// hasTVPreferredFocus={true}
										tvParallaxProperties={{
											enabled: true,
											shiftDistanceX: 1.9,
											shiftDistanceY: 1.9,
											tiltAngle: 0.05,
											magnification: 1.15,
										}}
										isTVSelectable={!this.state.setTvFocus}
										underlayColor={'transparent'}
										onPress={() => this._onChangeAudio(item)}>
										<View style={{ flexDirection: 'row', paddingTop: 7 }}>
											<View style={{ width: 30 }}>
												{this.state.selectedAudioTrack ? (
													this.state.selectedAudioTrack.value ===
														item.language ? (
														<ImageIcon size={18} color={'blue'} name={'check'} />
													) : null
												) : null}
											</View>
											<View>
												<Text
													style={{
														color: this.state.selectedAudioTrack
															? this.state.selectedAudioTrack.value ==
																item.language
																? 'blue'
																: 'black'
															: 'black',
														fontSize: normalize(1.3)
													}}>
													{/* {lang[index]} */}
													{item.language}
												</Text>
											</View>
										</View>
									</TouchableHighlight>
								);
							})}
						</View>
						<View
							style={{
								// height: 150,
								width: '50%',
								paddingTop: 10,
								paddingLeft: 15,
								// justifyContent:'flex-start',
							}}>
							<View>
								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.5) }}>
									{' '}
									<ImageIcon size={normalize(1.5)} name={'commenting'} /> Subtitles
								</Text>
							</View>

							{this.state.textTracks.map((item, index) => {
								return (
									<TouchableHighlight
										key={index}
										// hasTVPreferredFocus={true}
										tvParallaxProperties={{
											enabled: true,
											shiftDistanceX: 1.9,
											shiftDistanceY: 1.9,
											tiltAngle: 0.05,
											magnification: 1.15,
										}}
										isTVSelectable={!this.state.setTvFocus}
										underlayColor={'transparent'}
										onPress={() => this._onChangeText(item)}>
										<View style={{ flexDirection: 'row', paddingTop: 7 }}>
											<View style={{ width: 30 }}>
												{this.state.selectedTextTrack ? (
													this.state.selectedTextTrack.value ===
														item.language ? (
														<ImageIcon size={18} color={'blue'} name={'check'} />
													) : null
												) : null}
											</View>
											<View>
												<Text
													style={{
														color: this.state.selectedTextTrack
															? this.state.selectedTextTrack.value ===
																item.language
																? 'blue'
																: 'black'
															: 'black',
														fontSize: normalize(1.3)
													}}>
													{item.title} {'(' + item.language + ')'}
												</Text>
											</View>
										</View>
									</TouchableHighlight>
								);
							})}
							<TouchableHighlight
								// key={index}
								// hasTVPreferredFocus={true}
								tvParallaxProperties={{
									enabled: true,
									shiftDistanceX: 1.9,
									shiftDistanceY: 1.9,
									tiltAngle: 0.05,
									magnification: 1.15,
								}}
								isTVSelectable={!this.state.setTvFocus}
								underlayColor={'transparent'}
								onPress={() => this.onTextTracksOff()}>
								<View style={{ flexDirection: 'row', paddingTop: 7 }}>
									<View style={{ width: 30 }}>
										{this.state.selectedTextTrack ? (
											this.state.selectedTextTrack.value ===
												'Off' ? (
												<ImageIcon size={18} color={'blue'} name={'check'} />
											) : null
										) : null}
									</View>
									<View>
										<Text
											style={{
												color: this.state.selectedTextTrack
													? this.state.selectedTextTrack.value ===
														'Off'
														? 'blue'
														: 'black'
													: 'black',
												fontSize: normalize(1.3)
											}}>
											{'(' + 'Off' + ')'}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</ActionSheet>
		);
	};


	toggelNativeAdControls = () => {
		if(this.state.isAdVisible === true) { 
		  return (
			<PercentageBar
				percentage={`${parseInt((this.state.adBar * 100) + 1)}%`}
				showSkip={this.state.showSkip}
				adDuration={this.state.adDuration}
				onSkipPress={() => {
					this.seekTo(this.state.skipTo + 1)
				} }
				initialTime={9000}
				playPauseCall={(value) => this.setState({ paused: value })}
				setMuteValue={(value) => console.log(value)}
				isPaused={this.props.paused || this.state.paused}
				isMuted={this.props.isMuted}
				setTvFocus={this.state.setTvFocus}
			/>
		  )
		 } else if(this.state.controls === true){
			return this.renderBottomControls()
		 } else {
			return null
		 }
		
	}

	/**
	 * Provide all of our options and render the whole component.
	 */
	render() {
		return (
			<TouchableHighlight
				// hasTVPreferredFocus={!this.state.showControls}
				isTVSelectable={!this.state.showControls}
				onPress={this.events.onScreenTouch}
				style={[styles.player.container, this.styles.containerStyle]}>
				<View style={[styles.player.container, this.styles.containerStyle]}>
					<Video
						{...this.props}
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
						selectedTextTrack={this.state.selectedTextTrack}
						selectedAudioTrack={this.state.selectedAudioTrack}
						source={this.state.video_source}
					/>
					{this.renderError()}
					{this.renderLoader()}
					{this.state.controls && this.renderTopControls()}
					{/* {this.props.control && this.renderBottomControls()} */}
					{this.toggelNativeAdControls()}
					<Modal
						isVisible={this.state.actionSheet}
						// animationType=
						transparent={true}
						onRequestClose={() => this.setState({ actionSheet: false })}
						style={{
							margin: 0,
							justifyContent: 'flex-end'
						}}
					>
						<TouchableHighlight style={{
							margin: 0,
							justifyContent: 'flex-end',
							flex: 1
						}} onPress={() => this.setState({ actionSheet: false })}>
							<ActionSheets
								audioTracks={this.state.audioTracks}
								textTracks={this.state.textTracks}
								selectedTextTrack={this.state.selectedTextTrack}
								selectedAudioTrack={this.state.selectedAudioTrack}
								onAudioTracksChange={(item) => this._onChangeAudio(item)}
								onTextTracksChange={(item) => this._onChangeText(item)}
								onCancel={() => this.setState({ actionSheet: false })}
								onTextTracksOff={() => this.onTextTracksOff()}
							/>
						</TouchableHighlight>
					</Modal>
				</View>
			</TouchableHighlight>
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
			fontSize: 11,
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
			height: 1,
			position: 'relative',
			top: 14,
			width: '100%',
		},
		fill: {
			backgroundColor: '#FFF',
			height: 1,
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
	}),
};
