import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { FocusButton } from 'react-native-tv-selected-focus';

function convertTimeTot(totalSeconds) {
  const tSec = parseInt(totalSeconds);
  const minutes = Math.floor(tSec / 60);
  const seconds = tSec % 60;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  return result;
}


export const PercentageBar = ({
  percentage = "0%",
  showSkip,
  onSkipPress,
  playPauseCall,
  isPaused,
  adDuration,
  setTvFocus
}) => {
  let source = isPaused ? require('../assets/img/play.png') : require('../assets/img/pause.png')

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <View style={seekbar.container}>
        <View style={seekbar.track}>
          <View
            style={[
              seekbar.fill,
              {
                width: percentage,
                backgroundColor: '#FFFF00',
              },
            ]}
          />
        </View>
        <View
          style={[seekbar.handle, { left: percentage }]}
        >
          <View
            style={[
              seekbar.circle,
              { backgroundColor: '#FFFF00' },
            ]}
          />
        </View>
      </View>
      <SafeAreaView style={[controls.row, controls.bottomControlGroup]}>
        <FocusButton
          hasTVPreferredFocus={true}
          isTVSelectable={setTvFocus}
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
            // this.resetControlTimeout();
            playPauseCall(!isPaused)
          }}
          style={[controls.control, controls.playPause]}>
          <Image source={source} />
        </FocusButton>
        <View style={{ flexDirection: "row", justifyContent: "space-between", ...controls.control }}>
          <Text style={controls.timerText}>{convertTimeTot(adDuration)}</Text>
          {showSkip ?
            <FocusButton
              isTVSelectable={setTvFocus}
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
                onSkipPress();
              }}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ color: "white" }}>Skip</Text>
            </FocusButton>
            : null}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    height: 5,
    // marginVertical: 10,
    borderRadius: 5,

    position: 'absolute',
    bottom: 20
  }
})

const seekbar = StyleSheet.create({
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
})
const controls = StyleSheet.create({
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
    marginLeft: 15,
  },
})

