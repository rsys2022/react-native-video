// import React, {useState} from 'react';

// import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
// import useCountDown from './countdown';


// const muteIcon = require("../icons/mute.png")
// const volumeIcon = require("../icons/volume.png")

// function convertTimeTot(totalSeconds) {
//   const tSec = parseInt(totalSeconds/1000);
//   const minutes = Math.floor(tSec / 60);
//   const seconds = tSec % 60;

//   function padTo2Digits(num) {
//     return num.toString().padStart(2, "0");
//   }
//   const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
//   return result;
// }


// const PercentageBar = ({
//   navigation,
//   percentage = "0%",
//   height=5,
//   backgroundColor = "white",
//   completedColor="yellow",
//   initialTime=9000,
//   showSkip,
//   onSkipPress,
//   playPauseCall,
//   isPaused,
//   isMuted,
//   setMuteValue
// }) => {
//   const [getPercentage, setPercentage] = useState(percentage);
//   const [getheight, setHeight] = useState(height);
//   const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
//   const [getCompletedColor, setCompletedColor] = useState(completedColor);

//   // const [playPause, setPlayPause] = useState(false);
//   /**Timer state */
//   const [timerStart, setTimerStart] = useState(false);
//   const [totalDuration, setTotalDuration] = useState(90000);
//   const [timerReset, setTimerReset] = useState(false);
//   const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, 1000);

//   // start the timer during the first render
//   React.useEffect(() => {
//     start();
//   }, []);

//   const restart = React.useCallback(() => {
//     // you can start existing timer with an arbitrary value
//     // if new value is not passed timer will start with initial value
//     const newTime = 42 * 1000;
//     start(newTime);
//   }, []);

//   return (
//     <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
//         <View style={{justifyContent: "space-between", flexDirection: "row", marginBottom:30}}>
//           <View style={{flexDirection: "row"}}>
//           <TouchableOpacity style={{backgroundColor: "rgb(0,0,0,0.5)", borderColor: "white", borderWidth: 2, paddingHorizontal: 3}} onPress={()=> {
//             if(isPaused){
//               playPauseCall(false)

//               resume()
//             }else {
//               playPauseCall(true)
//               pause()

//             }

//           }}>
//             <Text style={{color: "white"}}>{isPaused? "Play" : "Pause"}</Text>
//           </TouchableOpacity>
//           <Text style={{color: 'white', marginLeft: 10}}>{convertTimeTot(timeLeft)}</Text>

//           </View>
//           <View style={{flexDirection: "row"}}>
//             <TouchableOpacity 
//               style={{
//                 backgroundColor: "rgb(0,0,0,0.5)",  
//                 paddingHorizontal: 3
//               }} 
//               onPress={()=> {
//                 if(isMuted){
//                   setMuteValue(false)
//                 }else {
//                   setMuteValue(true)                
//                 }
//               }}>
//               <Image source={isMuted ? muteIcon: volumeIcon} style={{width: 20, height: 20}} />
//             </TouchableOpacity>
//             {showSkip &&
//               (
//                 <TouchableOpacity 
//                   style={{
//                     backgroundColor: "rgb(0,0,0,0.5)", 
//                     borderColor: "white", 
//                     borderWidth: 2, 
//                     paddingHorizontal: 3
//                   }} 
//                   onPress={()=> {
//                     pause();
//                     onSkipPress();
//                   }}
//                 >
//                   <Text style={{color: "white"}}>Skip</Text>
//                 </TouchableOpacity>
//           )
//         }
//         </View>

//         </View>

//         <View style={[styles.barStyle, { width: percentage ? percentage : 0,backgroundColor: getCompletedColor,}]}/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     barStyle : {
//             height: 5,
//             // marginVertical: 10,
//             borderRadius: 5,

//             position: 'absolute',
//             bottom:20
//           }
// })


// export default PercentageBar;




import React from 'react';

import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

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
  navigation,
  percentage = "0%",
  height = 5,
  backgroundColor = "white",
  completedColor = "yellow",
  initialTime = 9000,
  showSkip,
  onSkipPress,
  playPauseCall,
  isPaused,
  isMuted,
  setMuteValue,
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableHighlight
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
          style={[controls.control]}>
          <Image source={source} />
        </TouchableHighlight>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableHighlight
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
            }}
            style={[controls.control]}
          >
            <Text style={controls.timerText}>{convertTimeTot(adDuration)}</Text>
          </TouchableHighlight>
          {showSkip &&
            <TouchableHighlight
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
              style={[controls.control]}
            >
              <Text style={{ color: "white" }}>Skip</Text>
            </TouchableHighlight>
          }

        </View>
      </View>
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
  },
})

