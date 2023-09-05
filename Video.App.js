import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, requireNativeComponent, NativeModules, View, Image, Platform, findNodeHandle } from 'react-native';
import { ViewPropTypes, ImagePropTypes } from 'deprecated-react-native-prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import TextTrackType from './TextTrackType';
import FilterType from './FilterType';
import DRMType from './DRMType';
import VideoResizeMode from './VideoResizeMode.js';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

export { TextTrackType, FilterType, DRMType };

const  Video = React.forwardRef((props, ref) => {
  const [state, setState]= useState({
    showPoster: !!props.poster
  })
  const [nativeProps, setNativePropsState] = useState(null)
  const _root = useRef(null);
  
  function setNativeProps(nativeProps) {
    _root.current &&  _root.current.setNativeProps(nativeProps);
  }

  function toTypeString(x) {
    switch (typeof x) {
      case 'object':
        return x instanceof Date
          ? x.toISOString()
          : JSON.stringify(x); // object, null
      case 'undefined':
        return '';
      default: // boolean, number, string
        return x.toString();
    }
  }

  function stringsOnlyObject(obj) {
    const strObj = {};

    Object.keys(obj).forEach(x => {
      strObj[x] = toTypeString(obj[x]);
    });

    return strObj;
  }

  function seek(time, tolerance = 100) {
    if (isNaN(time)) { throw new Error('Specified time is not a number'); }

    if (Platform.OS === 'ios') {
      setNativePropsState({
        seek: {
          time,
          tolerance,
        },
      });
    } else {
      setNativePropsState({ seek: time });
    }
  };


  const presentFullscreenPlayer = () => {
    setNativeProps({ fullscreen: true });
  };

  const dismissFullscreenPlayer = () => {
    setNativeProps({ fullscreen: false });
  };

  const save = async (options) => {
    return await NativeModules.VideoManager.save(options, findNodeHandle(_root.current));
  }

  const restoreUserInterfaceForPictureInPictureStopCompleted = (restored) => {
    setNativeProps({ restoreUserInterfaceForPIPStopCompletionHandler: restored });
  };

  const _assignRoot = (component) => {
    _root = component;
  };

  const _hidePoster = () => {
    if (state.showPoster) {
      setState({ showPoster: false });
    }
  }

  const _onLoadStart = (event) => {
    if (props.onLoadStart) {
      props.onLoadStart(event.nativeEvent);
    }
  };

  const _onLoad = (event) => {
    // Need to hide poster here for windows as onReadyForDisplay is not implemented
    if (Platform.OS === 'windows') {
      _hidePoster();
    }
    if (props.onLoad) {
      props.onLoad(event.nativeEvent);
    }
  };

  const _onError = (event) => {
    if (props.onError) {
      props.onError(event.nativeEvent);
    }
  };

  const _onProgress = (event) => {
    if (props.onProgress) {
      props.onProgress(event.nativeEvent);
    }
  };

  const _onBandwidthUpdate = (event) => {
    if (props.onBandwidthUpdate) {
      props.onBandwidthUpdate(event.nativeEvent);
    }
  };

  const _onSeek = (event) => {
    if (props.onSeek) {
      props.onSeek(event.nativeEvent);
    }
  };

  const _onEnd = (event) => {
    if (props.onEnd) {
      props.onEnd(event.nativeEvent);
    }
  };

  const _onTimedMetadata = (event) => {
    if (props.onTimedMetadata) {
      props.onTimedMetadata(event.nativeEvent);
    }
  };

  const _onFullscreenPlayerWillPresent = (event) => {
    if (props.onFullscreenPlayerWillPresent) {
      props.onFullscreenPlayerWillPresent(event.nativeEvent);
    }
  };

  const _onFullscreenPlayerDidPresent = (event) => {
    if (props.onFullscreenPlayerDidPresent) {
      props.onFullscreenPlayerDidPresent(event.nativeEvent);
    }
  };

  const _onFullscreenPlayerWillDismiss = (event) => {
    if (props.onFullscreenPlayerWillDismiss) {
      props.onFullscreenPlayerWillDismiss(event.nativeEvent);
    }
  };

  const _onFullscreenPlayerDidDismiss = (event) => {
    if (props.onFullscreenPlayerDidDismiss) {
      props.onFullscreenPlayerDidDismiss(event.nativeEvent);
    }
  };

  const  _onReadyForDisplay = (event) => {
    if (!props.audioOnly) {
      _hidePoster();
    }

    if (props.onReadyForDisplay) {
      props.onReadyForDisplay(event.nativeEvent);
    }
  };

  const  _onPlaybackStalled = (event) => {
    if (props.onPlaybackStalled) {
      props.onPlaybackStalled(event.nativeEvent);
    }
  };

  const  _onPlaybackResume = (event) => {
    if (props.onPlaybackResume) {
      props.onPlaybackResume(event.nativeEvent);
    }
  };

  const _onPlaybackRateChange = (event) => {
    if (props.onPlaybackRateChange) {
      props.onPlaybackRateChange(event.nativeEvent);
    }
  };

  const  _onExternalPlaybackChange = (event) => {
    if (props.onExternalPlaybackChange) {
      props.onExternalPlaybackChange(event.nativeEvent);
    }
  }

  const _onAudioBecomingNoisy = () => {
    if (props.onAudioBecomingNoisy) {
      props.onAudioBecomingNoisy();
    }
  };

  const _onPictureInPictureStatusChanged = (event) => {
    if (props.onPictureInPictureStatusChanged) {
      props.onPictureInPictureStatusChanged(event.nativeEvent);
    }
  };

  const _onRestoreUserInterfaceForPictureInPictureStop = (event) => {
    if (props.onRestoreUserInterfaceForPictureInPictureStop) {
      props.onRestoreUserInterfaceForPictureInPictureStop();
    }
  };

  const _onAudioFocusChanged = (event) => {
    if (props.onAudioFocusChanged) {
      props.onAudioFocusChanged(event.nativeEvent);
    }
  };

  const _onBuffer = (event) => {
    if (props.onBuffer) {
      props.onBuffer(event.nativeEvent);
    }
  };

  const  _onGetLicense = (event) => {
    if (props.drm && props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;
      if (data && data.spcBase64) {
        const getLicenseOverride = props.drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
        getLicensePromise.then((result => {
          if (result !== undefined) {
            NativeModules.VideoManager.setLicenseResult(result, findNodeHandle(_root.current));
          } else {
            NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('Empty license result', findNodeHandle(_root.current));
          }
        })).catch((error) => {
          NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError(error, findNodeHandle(_root.current));
        });
      } else {
        NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError("No spc received", findNodeHandle(_root.current));
      }
    }
  }

  const getViewManagerConfig = viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName];
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  };



  const stringToSec = (timeString) => {
    const arr = timeString.split(":");
    const seconds = arr[0] * 3600 + arr[1] * 60 + +arr[2];
    return seconds;
  };

  useEffect(()=> {
    const resizeMode = props.resizeMode;
    const source = resolveAssetSource(props.source) || {};
    const shouldCache = !source.__packager_asset;

    let uri = source.uri || '';
    if (uri && uri.match(/^\//)) {
      uri = `file://${uri}`;
    }

    if (!uri) {
      console.warn('Trying to load empty source.');
    }

    const isNetwork = !!(uri && uri.match(/^https?:/));
    const isAsset = !!(uri && uri.match(/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/));

    let nativeResizeMode;
    const RCTVideoInstance = getViewManagerConfig('RCTVideo');

    if (resizeMode === VideoResizeMode.stretch) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
    } else if (resizeMode === VideoResizeMode.contain) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
    } else if (resizeMode === VideoResizeMode.cover) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
    } else {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
    }

    const nativePropData = Object.assign({}, props);
    Object.assign(nativePropData, {
      style: [styles.base, nativePropData.style],
      resizeMode: nativeResizeMode,
      paused: props.paused,
      muted: props.muted,
      src: {
        uri,
        isNetwork,
        isAsset,
        shouldCache,
        type: source.type || '',
        mainVer: source.mainVer || 0,
        patchVer: source.patchVer || 0,
        requestHeaders: source.headers ? stringsOnlyObject(source.headers) : {},
      },
      trackingJson: null,
      eventTracking: null,
      onVideoLoadStart: _onLoadStart,
      onVideoLoad: _onLoad,
      onVideoError: _onError,
      onVideoProgress: _onProgress,
      onVideoSeek: _onSeek,
      onVideoEnd: _onEnd,
      onVideoBuffer: _onBuffer,
      onVideoBandwidthUpdate: _onBandwidthUpdate,
      onTimedMetadata: _onTimedMetadata,
      onVideoAudioBecomingNoisy: _onAudioBecomingNoisy,
      onVideoExternalPlaybackChange: _onExternalPlaybackChange,
      onVideoFullscreenPlayerWillPresent: _onFullscreenPlayerWillPresent,
      onVideoFullscreenPlayerDidPresent: _onFullscreenPlayerDidPresent,
      onVideoFullscreenPlayerWillDismiss: _onFullscreenPlayerWillDismiss,
      onVideoFullscreenPlayerDidDismiss: _onFullscreenPlayerDidDismiss,
      onReadyForDisplay: _onReadyForDisplay,
      onPlaybackStalled: _onPlaybackStalled,
      onPlaybackResume: _onPlaybackResume,
      onPlaybackRateChange: _onPlaybackRateChange,
      onAudioFocusChanged: _onAudioFocusChanged,
      onAudioBecomingNoisy: _onAudioBecomingNoisy,
      onGetLicense: nativePropData.drm && nativePropData.drm.getLicense && _onGetLicense,
      onPictureInPictureStatusChanged: _onPictureInPictureStatusChanged,
      onRestoreUserInterfaceForPictureInPictureStop: _onRestoreUserInterfaceForPictureInPictureStop,
    });
    setNativePropsState(nativePropData)
    
  }, [props])
  useEffect(()=> {
    setNativeProps(nativeProps)
  }, [nativeProps])

  if(nativeProps === null || nativeProps.style === null){
    return null
  }
  return (
    <View style={nativeProps.style}>
        <RCTVideo
          ref={_root}
          {...nativeProps}
          style={StyleSheet.absoluteFill}
        />
        {state.showPoster && (
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: props.posterResizeMode || 'contain',
            }} 
            source={{ uri: props.poster }} 
          />
        )}
      </View>
  )


})

export default React.memo(Video)

Video.propTypes = {
  filter: PropTypes.oneOf([
    FilterType.NONE,
    FilterType.INVERT,
    FilterType.MONOCHROME,
    FilterType.POSTERIZE,
    FilterType.FALSE,
    FilterType.MAXIMUMCOMPONENT,
    FilterType.MINIMUMCOMPONENT,
    FilterType.CHROME,
    FilterType.FADE,
    FilterType.INSTANT,
    FilterType.MONO,
    FilterType.NOIR,
    FilterType.PROCESS,
    FilterType.TONAL,
    FilterType.TRANSFER,
    FilterType.SEPIA,
  ]),
  filterEnabled: PropTypes.bool,
  /* Native only */
  src: PropTypes.object,
  seek: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  fullscreen: PropTypes.bool,
  onVideoLoadStart: PropTypes.func,
  onVideoLoad: PropTypes.func,
  onVideoBuffer: PropTypes.func,
  onVideoError: PropTypes.func,
  onVideoProgress: PropTypes.func,
  onVideoBandwidthUpdate: PropTypes.func,
  onVideoSeek: PropTypes.func,
  onVideoEnd: PropTypes.func,
  onTimedMetadata: PropTypes.func,
  onVideoAudioBecomingNoisy: PropTypes.func,
  onVideoExternalPlaybackChange: PropTypes.func,
  onVideoFullscreenPlayerWillPresent: PropTypes.func,
  onVideoFullscreenPlayerDidPresent: PropTypes.func,
  onVideoFullscreenPlayerWillDismiss: PropTypes.func,
  onVideoFullscreenPlayerDidDismiss: PropTypes.func,

  /* Wrapper component */
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    // Opaque type returned by require('./video.mp4')
    PropTypes.number,
  ]),
  drm: PropTypes.shape({
    type: PropTypes.oneOf([
      DRMType.CLEARKEY, DRMType.FAIRPLAY, DRMType.WIDEVINE, DRMType.PLAYREADY
    ]),
    licenseServer: PropTypes.string,
    headers: PropTypes.shape({}),
    base64Certificate: PropTypes.bool,
    certificateUrl: PropTypes.string,
    getLicense: PropTypes.func,
  }),
  minLoadRetryCount: PropTypes.number,
  maxBitRate: PropTypes.number,
  resizeMode: PropTypes.string,
  poster: PropTypes.string,
  posterResizeMode: ImagePropTypes.resizeMode,
  repeat: PropTypes.bool,
  automaticallyWaitsToMinimizeStalling: PropTypes.bool,
  allowsExternalPlayback: PropTypes.bool,
  selectedAudioTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  selectedVideoTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  selectedTextTrack: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  textTracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        TextTrackType.SRT,
        TextTrackType.TTML,
        TextTrackType.VTT,
      ]),
      language: PropTypes.string.isRequired,
    })
  ),
  paused: PropTypes.bool,
  muted: PropTypes.bool,
  volume: PropTypes.number,
  bufferConfig: PropTypes.shape({
    minBufferMs: PropTypes.number,
    maxBufferMs: PropTypes.number,
    bufferForPlaybackMs: PropTypes.number,
    bufferForPlaybackAfterRebufferMs: PropTypes.number,
  }),
  stereoPan: PropTypes.number,
  rate: PropTypes.number,
  pictureInPicture: PropTypes.bool,
  playInBackground: PropTypes.bool,
  preferredForwardBufferDuration: PropTypes.number,
  playWhenInactive: PropTypes.bool,
  ignoreSilentSwitch: PropTypes.oneOf(['ignore', 'obey']),
  reportBandwidth: PropTypes.bool,
  disableFocus: PropTypes.bool,
  controls: PropTypes.bool,
  audioOnly: PropTypes.bool,
  currentTime: PropTypes.number,
  fullscreenAutorotate: PropTypes.bool,
  fullscreenOrientation: PropTypes.oneOf(['all', 'landscape', 'portrait']),
  progressUpdateInterval: PropTypes.number,
  useTextureView: PropTypes.bool,
  hideShutterView: PropTypes.bool,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
  onBuffer: PropTypes.func,
  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onBandwidthUpdate: PropTypes.func,
  onSeek: PropTypes.func,
  onEnd: PropTypes.func,
  onFullscreenPlayerWillPresent: PropTypes.func,
  onFullscreenPlayerDidPresent: PropTypes.func,
  onFullscreenPlayerWillDismiss: PropTypes.func,
  onFullscreenPlayerDidDismiss: PropTypes.func,
  onReadyForDisplay: PropTypes.func,
  onPlaybackStalled: PropTypes.func,
  onPlaybackResume: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onAudioFocusChanged: PropTypes.func,
  onAudioBecomingNoisy: PropTypes.func,
  onPictureInPictureStatusChanged: PropTypes.func,
  needsToRestoreUserInterfaceForPictureInPictureStop: PropTypes.func,
  onExternalPlaybackChange: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,

  trackingJson: PropTypes.object,
  ...ViewPropTypes,
};

const RCTVideo = requireNativeComponent('RCTVideo', Video, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true,
  },
});
