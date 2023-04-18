import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import useCountDown from './countdown';


const muteIcon = require("../icons/mute.png")
const volumeIcon = require("../icons/volume.png")

function convertTimeTot(totalSeconds) {
  const tSec = parseInt(totalSeconds/1000);
  const minutes = Math.floor(tSec / 60);
  const seconds = tSec % 60;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  return result;
}


const PercentageBar = ({
  navigation,
  percentage = "0%",
  height=5,
  backgroundColor = "white",
  completedColor="yellow",
  initialTime=9000,
  showSkip,
  onSkipPress,
  playPauseCall,
  isPaused,
  isMuted,
  setMuteValue
}) => {
  const [getPercentage, setPercentage] = useState(percentage);
  const [getheight, setHeight] = useState(height);
  const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [getCompletedColor, setCompletedColor] = useState(completedColor);

  // const [playPause, setPlayPause] = useState(false);
  /**Timer state */
  const [timerStart, setTimerStart] = useState(false);
  const [totalDuration, setTotalDuration] = useState(90000);
  const [timerReset, setTimerReset] = useState(false);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, 1000);
  
  // start the timer during the first render
  React.useEffect(() => {
    start();
  }, []);
  
  const restart = React.useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = 42 * 1000;
    start(newTime);
  }, []);

  return (
    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <View style={{justifyContent: "space-between", flexDirection: "row", marginBottom:30}}>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={{backgroundColor: "rgb(0,0,0,0.5)", borderColor: "white", borderWidth: 2, paddingHorizontal: 3}} onPress={()=> {
            if(isPaused){
              playPauseCall(false)
              
              resume()
            }else {
              playPauseCall(true)
              pause()
              
            }
            
          }}>
            <Text style={{color: "white"}}>{isPaused? "Play" : "Pause"}</Text>
          </TouchableOpacity>
          <Text style={{color: 'white', marginLeft: 10}}>{convertTimeTot(timeLeft)}</Text>

          </View>
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity 
              style={{
                backgroundColor: "rgb(0,0,0,0.5)",  
                paddingHorizontal: 3
              }} 
              onPress={()=> {
                if(isMuted){
                  setMuteValue(false)
                }else {
                  setMuteValue(true)                
                }
              }}>
              <Image source={isMuted ? muteIcon: volumeIcon} style={{width: 20, height: 20}} />
            </TouchableOpacity>
            {showSkip &&
              (
                <TouchableOpacity 
                  style={{
                    backgroundColor: "rgb(0,0,0,0.5)", 
                    borderColor: "white", 
                    borderWidth: 2, 
                    paddingHorizontal: 3
                  }} 
                  onPress={()=> {
                    pause();
                    onSkipPress();
                  }}
                >
                  <Text style={{color: "white"}}>Skip</Text>
                </TouchableOpacity>
          )
        }
        </View>
          
        </View>
                    
        <View style={[styles.barStyle, { width: percentage ? percentage : 0,backgroundColor: getCompletedColor,}]}/>
    </View>
  );
};

const styles = StyleSheet.create({
    barStyle : {
            height: 5,
            // marginVertical: 10,
            borderRadius: 5,
            
            position: 'absolute',
            bottom:20
          }
})


export default PercentageBar;