// import PropTypes from 'prop-types';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
// import { FocusButton } from 'react-native-tv-selected-focus';
// import { gray } from '../../../src/helper/Color';

// const WHITE = '#ffffff';
// const BORDER_COLOR = '#DBDBDB';

// const ActionSheet = (props) => {
//  const { onCancel, audioTracks, textTracks, selectedTextTrack, selectedAudioTrack, setTvFocus, onTextTracksChange, onAudioTracksChange, onTextTracksOff } = props;

//  return (
//      <View style={styles.modalContent}>
//          <View style={{
//              paddingHorizontal: '2%',
//              backgroundColor: 'white',
//              borderTopLeftRadius: 10,
//              borderTopRightRadius: 10,
//              borderBottomLeftRadius: 10,
//              borderBottomRightRadius: 10,
//              paddingBottom: 10
//          }}>
//              <View style={{ flexDirection: 'row' }}>
//                  {checkArrayAndElements(audioTracks) ? (
//                      <View
//                          style={{
//                              borderRightWidth: 0.5,
//                              borderRightColor: 'gray',
//                              width: '50%',
//                              paddingTop: 10,
//                          }}
//                      >
//                          <View>
//                              <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                                  <ImageIcon size={normalize(1.7)} name={'volume-up'} /> Audio Language
//                              </Text>
//                          </View>
//                          {audioTracks.length && audioTracks.map((item, index) => {
//                              return (
//                                  <FocusButton
//                                      key={index}
//                                      hasTVPreferredFocus={true}
//                                      tvParallaxProperties={{
//                                          enabled: true,
//                                          magnification: 1.05,
//                                      }}
//                                      isTVSelectable={true}
//                                      onFocus={() => { }}
//                                      underlayColor={gray}
//                                      activeOpacity={0.4}
//                                      onPress={() => onAudioTracksChange(item)}>
//                                      <View style={{ flexDirection: 'row', paddingTop: 7, justifyContent: 'flex-start' }}>
//                                          <View style={{ paddingLeft: 30, paddingRight: 5 }}>
//                                              {selectedAudioTrack && selectedAudioTrack.value === item.language ? (
//                                                  <ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
//                                              )
//                                                  : null}
//                                          </View>
//                                          <View>
//                                              <Text
//                                                  style={{
//                                                      color: selectedAudioTrack && selectedAudioTrack.value === item.language ? 'blue' : 'black',
//                                                      fontSize: normalize(1.4)
//                                                  }}>
//                                                  {item.language}
//                                              </Text>
//                                          </View>
//                                      </View>
//                                  </FocusButton>
//                              );
//                          })}
//                      </View>) : null}
//                  {checkArrayAndElements(textTracks) ?
//                      (<View
//                          style={{
//                              width: '50%',
//                              paddingTop: 10,
//                              paddingLeft: 15,
//                          }}>
//                          <View>
//                              <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                                  <ImageIcon size={normalize(1.7)} name={'commenting'} /> Subtitles
//                              </Text>
//                          </View>
//                          {textTracks.map((item, index) => {
//                              return (
//                                  <FocusButton
//                                      key={index}
//                                      tvParallaxProperties={{
//                                          enabled: true,
//                                          magnification: 1.05,
//                                      }}
//                                      isTVSelectable={true}
//                                      onFocus={() => { }}
//                                      underlayColor={'transparent'}
//                                      onPress={() => onTextTracksChange(item)}>

//                                      <View style={{ flexDirection: 'row', paddingTop: 7 }}>
//                                          <View style={{ paddingLeft: 30, paddingRight: 5 }}>
//                                              {selectedTextTrack && selectedTextTrack.value === item.language ? (
//                                                  <ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
//                                              ) : null}
//                                          </View>
//                                          <View>
//                                              <Text
//                                                  style={{
//                                                      color: selectedTextTrack && selectedTextTrack.value === item.language ? 'blue' : 'black',
//                                                      fontSize: normalize(1.4)
//                                                  }}>
//                                                  {item.language}
//                                              </Text>
//                                          </View>
//                                      </View>
//                                  </FocusButton>
//                              );
//                          })}

//                          <FocusButton
//                              tvParallaxProperties={{
//                                  enabled: true,
//                                  magnification: 1.05,
//                              }}
//                              isTVSelectable={true}
//                              onFocus={() => { }}
//                              underlayColor={'transparent'}
//                              onPress={() => onTextTracksOff()}>
//                              <View style={{ flexDirection: 'row', paddingTop: 7 }}>
//                                  <View style={{ width: 30 }}>
//                                      {selectedTextTrack && selectedTextTrack.value === 'Off' ? (
//                                          <ImageIcon size={18} color={'blue'} name={'check'} />
//                                      ) : null}
//                                  </View>
//                                  <View>
//                                      <Text
//                                          style={{
//                                              color: selectedTextTrack && selectedTextTrack.value === 'Off' ? 'blue' : 'black',
//                                              fontSize: normalize(1.3)
//                                          }}>
//                                          {'Off'}
//                                      </Text>
//                                  </View>
//                              </View>
//                          </FocusButton>
//                      </View>) : null}
//              </View>
//          </View>
//          <FocusButton
//              style={[
//                  styles.actionSheetView, {
//                      borderBottomWidth: 0,
//                      backgroundColor: WHITE,
//                      marginTop: 8,
//                      borderTopLeftRadius: 10,
//                      borderTopRightRadius: 10,
//                      borderBottomLeftRadius: 10,
//                      borderBottomRightRadius: 10,
//                  }]}
//              onFocus={() => { }}
//              onPress={onCancel}
//              isTVSelectable={true}
//              tvParallaxProperties={{
//                  enabled: true,
//                  magnification: 1.05,
//              }} >
//              <Text allowFontScaling={false}
//                  style={[
//                      styles.actionSheetText
//                  ]}>
//                  Cancel
//              </Text>
//          </FocusButton>
//      </View>
//      )
// }



// const styles = StyleSheet.create({
//  modalContent: {
//      borderTopLeftRadius: 12,
//      borderTopRightRadius: 12,
//      borderBottomLeftRadius: 12,
//      borderBottomRightRadius: 12,
//      marginLeft: 8,
//      marginRight: 8,
//      marginBottom: 20,
//  },

//  actionSheetText: {
//      fontSize: 18,
//      color: 'black'
//  },

//  actionSheetView: {
//      backgroundColor: WHITE,
//      display: 'flex',
//      flexDirection: 'row',
//      justifyContent: 'center',
//      alignItems: 'center',
//      paddingTop: 10,
//      paddingBottom: 10,
//      borderBottomWidth: StyleSheet.hairlineWidth,
//      borderColor: BORDER_COLOR
//  }
// });

// ActionSheet.propTypes = {
//  onCancel: PropTypes.func,
//  actionTextColor: PropTypes.string,
//  textTracks: PropTypes.array,
//  audioTracks: PropTypes.array,
//  selectedAudioTrack: PropTypes.object,
//  selectedTextTrack: PropTypes.object,
//  onTextTracksChange: PropTypes.func,
//  onAudioTracksChange: PropTypes.func,
//  onTextTracksOff: PropTypes.func,
//  setTvFocus: PropTypes.bool
// }


// ActionSheet.defaultProps = {
//  onCancel: () => { },
//  actionTextColor: null,
//  textTracks: [],
//  audioTracks: [],
//  selectedAudioTrack: {},
//  selectedTextTrack: {},
//  onTextTracksChange: () => { },
//  onAudioTracksChange: () => { },
//  onTextTracksOff: () => { },
//  setTvFocus: true
// }


// export default ActionSheet;


// import PropTypes from 'prop-types';
// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
// import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
// import FontIstoIcon from 'react-native-vector-icons/Fontisto'
// import { FocusButton } from 'react-native-tv-selected-focus';
// import { gray } from '../../../src/helper/Color';
// import { FlatList } from 'react-native-gesture-handler';

// const WHITE = '#ffffff';
// const BORDER_COLOR = '#DBDBDB';
// const {height} = Dimensions.get("window")

// const ActionSheet = (props) => {
//     const { onCancel, audioTracks, textTracks, videoTracks, selectedTextTrack, selectedAudioTrack, selectedVideoTrack, setTvFocus, onTextTracksChange, onAudioTracksChange, onVideoTrackChange, onTextTracksOff, videoBitrate } = props;
//     const [settingList, setSettingList] = useState([
//         {
//             type: "Audio Language",
//             icon: 'volume-up',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...audioTracks]
//         },
//         {
//             type: "Subtitles",
//             icon: 'commenting',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...textTracks]
//         },
//         {
//             type: "Resolutions",
//             icon: 'hd',
//             iconType: "MaterialIcons",
//             dataAttr: "value",
//             data: [...videoTracks]
//         }
//     ])

//     const [selectedSettingType, setSelectedSettingType] = useState(null)
//     const [currentSelectedVal, setCurrentSelectedVal] = useState(null)
//     function setSelectedValue(data){
//         switch (selectedSettingType) {
//             case 0:
//                 onAudioTracksChange(data)
//                 break;
//             case 1:
//                 onTextTracksChange(data)
//                 break;
//             case 2:
//                 onVideoTrackChange(data)
//                 break;
//             default:
//                 console.log("error in defaukt")
//                 break;
//         }
//     }
//     // console.log("selectedSettingType", selectedSettingType, [...settingList[selectedSettingType].data])
//     return (
//         <View style={styles.modalContent}>
//             <View 
//                style={{
//                     paddingHorizontal: '2%',
//                     backgroundColor: 'white',
//                     borderTopLeftRadius: 10,
//                     borderTopRightRadius: 10,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     paddingBottom: 40,
//                     height: height/2.6, 
                    
//                 }}>
//                 <View>
//                     <Text style={{ color: 'black', alignSelf: "center", fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6), marginVertical: 10 }}>
//                         <FontIstoIcon size={normalize(1.7)} name={'player-settings'} /> Settings
//                     </Text>
//                     <View style={{flexDirection: "row"}}>
//                         <View style={{ width: "40%", marginLeft: 10}}>
//                         {
//                             settingList.map((item, index)=> {
//                                 return (
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() =>{}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row", marginTop: 10}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => {
//                                             setSelectedSettingType(index)
//                                             switch (index) {
//                                                 case 0:
//                                                     setCurrentSelectedVal(selectedAudioTrack && selectedAudioTrack.value ? selectedAudioTrack.value : null)

//                                                     break;
//                                                 case 1:
//                                                     setCurrentSelectedVal(selectedTextTrack && selectedTextTrack.value ? selectedTextTrack.value : null)
//                                                     break;
//                                                 case 2:
//                                                     if(Platform.OS === "ios"){
//                                                         setCurrentSelectedVal(videoBitrate ? videoBitrate : null)
//                                                     }else {
//                                                         setCurrentSelectedVal(selectedVideoTrack && selectedVideoTrack.value ? selectedVideoTrack.value : null)
//                                                     }
//                                                     break;
//                                                 default:
//                                                     console.log("error in defaukt")
//                                                     break;
//                                             }
//                                         }}
//                                     >
//                                         <ImageIcon size={20} name={item.icon} color={selectedSettingType === index ? "#4682B4": "black"}  iconType={item.iconType} />
//                                         <Text style={{ color: selectedSettingType === index ? "#4682B4": "black", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item.type}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                             })
//                         }
//                         </View>
//                         <View style={{marginLeft: 100}}>
//                         {selectedSettingType !== null &&
//                            <FlatList
//                               data = {[...settingList[selectedSettingType].data]}
//                               keyExtractor={(_, index) =>  index.toString()}
//                               style={{width: 100}}
//                               contentContainerStyle={{paddingBottom: 100}}
//                               renderItem={({item, index})=> {
//                                 let  isValueSelected = false 
//                                 if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
//                                     isValueSelected = true
//                                 } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
//                                     isValueSelected = true
//                                 }
//                                 return(
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() => {}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row"}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => 
//                                             {
//                                                 setSelectedValue(item)
//                                                 setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
//                                             }
//                                         }
//                                     >
//                                         <Text style={{ color: isValueSelected ? "#4682B4" : 'black', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item[settingList[selectedSettingType].dataAttr]}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                               }}

//                            />
//                             // [...settingList[selectedSettingType].data].map((item, index)=> {
//                             //  return (
                                    
//                             //  )
//                             // })
//                         }
//                         </View>
//                     </View>
                    
//                 </View>

//                 {/* <View>
//                     <Text style={{ color: 'black', alignSelf: "center", fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                         <FontIstoIcon size={normalize(1.7)} name={'player-settings'} /> Settings
//                     </Text>
//                     <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                         <ImageIcon size={normalize(1.7)} name={'volume-up'} /> Audio Language
//                     </Text>
//                     <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                         <ImageIcon size={normalize(1.7)} name={'commenting'} /> Subtitles
//                     </Text>
//                     <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                         <ImageIcon size={normalize(1.7)} name={'commenting'} /> Resolutions
//                     </Text>
//                 </View> */}
//                 {/* <View style={{ flexDirection: 'row' }}>
//                     {checkArrayAndElements(audioTracks) ? (
//                         <View
//                             style={{
//                                 borderRightWidth: 0.5,
//                                 borderRightColor: 'gray',
//                                 width: '50%',
//                                 paddingTop: 10,
//                             }}
//                         >
//                             <View>
//                                 <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                                     <ImageIcon size={normalize(1.7)} name={'volume-up'} /> Audio Language
//                                 </Text>
//                             </View>
//                             {audioTracks.length && audioTracks.map((item, index) => {
//                                 return (
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={true}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         isTVSelectable={true}
//                                         onFocus={() => { }}
//                                         underlayColor={gray}
//                                         activeOpacity={0.4}
//                                         onPress={() => onAudioTracksChange(item)}>
//                                         <View style={{ flexDirection: 'row', paddingTop: 7, justifyContent: 'flex-start' }}>
//                                             <View style={{ paddingLeft: 30, paddingRight: 5 }}>
//                                                 {selectedAudioTrack && selectedAudioTrack.value === item.language ? (
//                                                     <ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
//                                                 )
//                                                     : null}
//                                             </View>
//                                             <View>
//                                                 <Text
//                                                     style={{
//                                                         color: selectedAudioTrack && selectedAudioTrack.value === item.language ? 'blue' : 'black',
//                                                         fontSize: normalize(1.4)
//                                                     }}>
//                                                     {item.language}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </FocusButton>
//                                 );
//                             })}
//                         </View>) : null}
//                     {checkArrayAndElements(textTracks) ?
//                         (<View
//                             style={{
//                                 width: '50%',
//                                 paddingTop: 10,
//                                 paddingLeft: 15,
//                             }}>
//                             <View>
//                                 <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
//                                     <ImageIcon size={normalize(1.7)} name={'commenting'} /> Subtitles
//                                 </Text>
//                             </View>
//                             {textTracks.map((item, index) => {
//                                 return (
//                                     <FocusButton
//                                         key={index}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         isTVSelectable={true}
//                                         onFocus={() => { }}
//                                         underlayColor={'transparent'}
//                                         onPress={() => onTextTracksChange(item)}>

//                                         <View style={{ flexDirection: 'row', paddingTop: 7 }}>
//                                             <View style={{ paddingLeft: 30, paddingRight: 5 }}>
//                                                 {selectedTextTrack && selectedTextTrack.value === item.language ? (
//                                                     <ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
//                                                 ) : null}
//                                             </View>
//                                             <View>
//                                                 <Text
//                                                     style={{
//                                                         color: selectedTextTrack && selectedTextTrack.value === item.language ? 'blue' : 'black',
//                                                         fontSize: normalize(1.4)
//                                                     }}>
//                                                     {item.language}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </FocusButton>
//                                 );
//                             })}

//                             <FocusButton
//                                 tvParallaxProperties={{
//                                     enabled: true,
//                                     magnification: 1.05,
//                                 }}
//                                 isTVSelectable={true}
//                                 onFocus={() => { }}
//                                 underlayColor={'transparent'}
//                                 onPress={() => onTextTracksOff()}>
//                                 <View style={{ flexDirection: 'row', paddingTop: 7 }}>
//                                     <View style={{ width: 30 }}>
//                                         {selectedTextTrack && selectedTextTrack.value === 'Off' ? (
//                                             <ImageIcon size={18} color={'blue'} name={'check'} />
//                                         ) : null}
//                                     </View>
//                                     <View>
//                                         <Text
//                                             style={{
//                                                 color: selectedTextTrack && selectedTextTrack.value === 'Off' ? 'blue' : 'black',
//                                                 fontSize: normalize(1.3)
//                                             }}>
//                                             {'Off'}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </FocusButton>
//                         </View>) : null}
//                 </View> */}
//             </View>
//             <FocusButton
//                 style={[
//                     styles.actionSheetView, {
//                         borderBottomWidth: 0,
//                         backgroundColor: WHITE,
//                         marginTop: 8,
//                         borderTopLeftRadius: 10,
//                         borderTopRightRadius: 10,
//                         borderBottomLeftRadius: 10,
//                         borderBottomRightRadius: 10,
//                     }]}
//                 onFocus={() => { }}
//                 onPress={onCancel}
//                 isTVSelectable={true}
//                 tvParallaxProperties={{
//                     enabled: true,
//                     magnification: 1.05,
//                 }} >
//                 <Text allowFontScaling={false}
//                     style={[
//                         styles.actionSheetText
//                     ]}>
//                     Cancel
//                 </Text>
//             </FocusButton>
//         </View>
//         )
// }



// const styles = StyleSheet.create({
//     modalContent: {
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//         borderBottomLeftRadius: 12,
//         borderBottomRightRadius: 12,
//         marginLeft: 8,
//         marginRight: 8,
//         marginBottom: 20,
//     },

//     actionSheetText: {
//         fontSize: 18,
//         color: 'black'
//     },

//     actionSheetView: {
//         backgroundColor: WHITE,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingBottom: 10,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderColor: BORDER_COLOR
//     }
// });

// ActionSheet.propTypes = {
//     onCancel: PropTypes.func,
//     actionTextColor: PropTypes.string,
//     textTracks: PropTypes.array,
//     audioTracks: PropTypes.array,
//     selectedAudioTrack: PropTypes.object,
//     selectedTextTrack: PropTypes.object,
//     onTextTracksChange: PropTypes.func,
//     onAudioTracksChange: PropTypes.func,
//     onTextTracksOff: PropTypes.func,
//     setTvFocus: PropTypes.bool
// }


// ActionSheet.defaultProps = {
//     onCancel: () => { },
//     actionTextColor: null,
//     textTracks: [],
//     audioTracks: [],
//     selectedAudioTrack: {},
//     selectedTextTrack: {},
//     onTextTracksChange: () => { },
//     onAudioTracksChange: () => { },
//     onTextTracksOff: () => { },
//     setTvFocus: true
// }


// export default React.memo(ActionSheet);


// import PropTypes from 'prop-types';
// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
// import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
// import FontIstoIcon from 'react-native-vector-icons/Fontisto'
// import { FocusButton } from 'react-native-tv-selected-focus';
// import { gray } from '../../../src/helper/Color';
// import { FlatList } from 'react-native-gesture-handler';

// const WHITE = '#ffffff';
// const BORDER_COLOR = '#DBDBDB';
// const {height} = Dimensions.get("window")

// const ActionSheet = (props) => {
//     const { onCancel, audioTracks, textTracks, videoTracks, selectedTextTrack, selectedAudioTrack, selectedVideoTrack, setTvFocus, onTextTracksChange, onAudioTracksChange, onVideoTrackChange, onTextTracksOff, videoBitrate } = props;
//     const [settingList, setSettingList] = useState([
//         {
//             type: "Audio Language",
//             icon: 'volume-up',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...audioTracks]
//         },
//         {
//             type: "Subtitles",
//             icon: 'commenting',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...textTracks]
//         },
//         {
//             type: "Resolutions",
//             icon: 'hd',
//             iconType: "MaterialIcons",
//             dataAttr: "value",
//             data: [...videoTracks]
//         }
//     ])

//     const [selectedSettingType, setSelectedSettingType] = useState(null)
//     const [currentSelectedVal, setCurrentSelectedVal] = useState(null)
//     function setSelectedValue(data){
//         switch (selectedSettingType) {
//             case 0:
//                 onAudioTracksChange(data)
//                 break;
//             case 1:
//                 onTextTracksChange(data)
//                 break;
//             case 2:
//                 onVideoTrackChange(data)
//                 break;
//             default:
//                 console.log("error in defaukt")
//                 break;
//         }
//     }
//     // console.log("selectedSettingType", selectedSettingType, [...settingList[selectedSettingType].data])
//     return (
//         <View style={styles.modalContent}>
//             <View 
//                style={{
//                     paddingHorizontal: '2%',
//                     backgroundColor: 'white',
//                     borderTopLeftRadius: 10,
//                     borderTopRightRadius: 10,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     paddingBottom: 40,
//                     height: height/2.6, 
                    
//                 }}>
//                 <View>
//                     <Text style={{ color: 'black', alignSelf: "center", fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6), marginVertical: 10 }}>
//                         <FontIstoIcon size={normalize(1.7)} name={'player-settings'} /> Settings
//                     </Text>
//                     <View style={{flexDirection: "row"}}>
//                         <View style={{ width: "40%", marginLeft: 10}}>
//                         {
//                             settingList.map((item, index)=> {
//                                 return (
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() =>{}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row", marginTop: 10}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => {
//                                             setSelectedSettingType(index)
//                                             switch (index) {
//                                                 case 0:
//                                                     setCurrentSelectedVal(selectedAudioTrack && selectedAudioTrack.value ? selectedAudioTrack.value : null)

//                                                     break;
//                                                 case 1:
//                                                     setCurrentSelectedVal(selectedTextTrack && selectedTextTrack.value ? selectedTextTrack.value : null)
//                                                     break;
//                                                 case 2:
//                                                     if(Platform.OS === "ios"){
//                                                         setCurrentSelectedVal(videoBitrate ? videoBitrate : null)
//                                                     }else {
//                                                         setCurrentSelectedVal(selectedVideoTrack && selectedVideoTrack.value ? selectedVideoTrack.value : null)
//                                                     }
//                                                     break;
//                                                 default:
//                                                     console.log("error in defaukt")
//                                                     break;
//                                             }
//                                         }}
//                                     >
//                                         <ImageIcon size={20} name={item.icon} color={selectedSettingType === index ? "#4682B4": "black"}  iconType={item.iconType} />
//                                         <Text style={{ color: selectedSettingType === index ? "#4682B4": "black", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item.type}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                             })
//                         }
//                         </View>
//                         <View style={{marginLeft: 100}}>
//                         {selectedSettingType !== null &&
//                            <FlatList
//                               data = {[...settingList[selectedSettingType].data]}
//                               keyExtractor={(_, index) =>  index.toString()}
//                               style={{width: 100}}
//                               contentContainerStyle={{paddingBottom: 100}}
//                               renderItem={({item, index})=> {
//                                 let  isValueSelected = false 
//                                 if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
//                                     isValueSelected = true
//                                 } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
//                                     isValueSelected = true
//                                 }
//                                 return(
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() => {}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row"}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => 
//                                             {
//                                                 setSelectedValue(item)
//                                                 setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
//                                             }
//                                         }
//                                     >
//                                         <Text style={{ color: isValueSelected ? "#4682B4" : 'black', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item[settingList[selectedSettingType].dataAttr]}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                               }}

//                            />
//                             // [...settingList[selectedSettingType].data].map((item, index)=> {
//                             //  return (
                                    
//                             //  )
//                             // })
//                         }
//                         </View>
//                     </View>
                    
//                 </View>

//             </View>
//             <FocusButton
//                 style={[
//                     styles.actionSheetView, {
//                         borderBottomWidth: 0,
//                         backgroundColor: WHITE,
//                         marginTop: 8,
//                         borderTopLeftRadius: 10,
//                         borderTopRightRadius: 10,
//                         borderBottomLeftRadius: 10,
//                         borderBottomRightRadius: 10,
//                     }]}
//                 onFocus={() => { }}
//                 onPress={onCancel}
//                 isTVSelectable={true}
//                 tvParallaxProperties={{
//                     enabled: true,
//                     magnification: 1.05,
//                 }} >
//                 <Text allowFontScaling={false}
//                     style={[
//                         styles.actionSheetText
//                     ]}>
//                     Cancel
//                 </Text>
//             </FocusButton>
//         </View>
//         )
// }



// const styles = StyleSheet.create({
//     modalContent: {
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//         borderBottomLeftRadius: 12,
//         borderBottomRightRadius: 12,
//         marginLeft: 8,
//         marginRight: 8,
//         marginBottom: 20,
//     },

//     actionSheetText: {
//         fontSize: 18,
//         color: 'black'
//     },

//     actionSheetView: {
//         backgroundColor: WHITE,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingBottom: 10,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderColor: BORDER_COLOR
//     }
// });

// ActionSheet.propTypes = {
//     onCancel: PropTypes.func,
//     actionTextColor: PropTypes.string,
//     textTracks: PropTypes.array,
//     audioTracks: PropTypes.array,
//     selectedAudioTrack: PropTypes.object,
//     selectedTextTrack: PropTypes.object,
//     onTextTracksChange: PropTypes.func,
//     onAudioTracksChange: PropTypes.func,
//     onTextTracksOff: PropTypes.func,
//     setTvFocus: PropTypes.bool
// }


// ActionSheet.defaultProps = {
//     onCancel: () => { },
//     actionTextColor: null,
//     textTracks: [],
//     audioTracks: [],
//     selectedAudioTrack: {},
//     selectedTextTrack: {},
//     onTextTracksChange: () => { },
//     onAudioTracksChange: () => { },
//     onTextTracksOff: () => { },
//     setTvFocus: true
// }


// export default React.memo(ActionSheet);










/*** 
 * 
 * 
 * NEW VIEW WITH TABS
 */

// import PropTypes from 'prop-types';
// import React, {useState} from 'react';
// import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
// import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import FontIstoIcon from 'react-native-vector-icons/Fontisto'
// import { FocusButton } from 'react-native-tv-selected-focus';
// import { gray } from '../../../src/helper/Color';
// import { FlatList } from 'react-native-gesture-handler';

// const WHITE = '#ffffff';
// const BORDER_COLOR = '#DBDBDB';
// const {heigh, width} = Dimensions.get("window")

// const ActionSheet = (props) => {
//     const { 
//         onCancel, 
//         audioTracks, 
//         textTracks, videoTracks, 
//         selectedTextTrack, 
//         selectedAudioTrack, 
//         selectedVideoTrack, 
//         setTvFocus, 
//         onTextTracksChange, 
//         onAudioTracksChange, 
//         onVideoTrackChange, 
//         onTextTracksOff, 
//         videoBitrate, 
//         isFullScreen 
//     } = props;
//     const [settingList, setSettingList] = useState([
//         {
//             type: "Audio Language",
//             icon: 'volume-up',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...audioTracks]
//         },
//         {
//             type: "Subtitles",
//             icon: 'commenting',
//             iconType: "FontAwesome",
//             dataAttr: "language",
//             data: [...textTracks]
//         },
//         {
//             type: "Resolutions",
//             icon: 'hd',
//             iconType: "MaterialIcons",
//             dataAttr: "value",
//             data: videoTracks ? [...videoTracks] : []
//         }
//     ])

//     const [selectedSettingType, setSelectedSettingType] = useState(0)
//     const [currentSelectedVal, setCurrentSelectedVal] = useState(null)
//     const [textWidths, setTextWidth] = useState([])
//     const [isCloseSelected, setIsCloseSelected] = useState(false)


//     function setSettingType(index){
//         setSelectedSettingType(index)
//         switch (index) {
//             case 0:
//                 setCurrentSelectedVal(selectedAudioTrack && selectedAudioTrack.value ? selectedAudioTrack.value : null)
//                 break;
//             case 1:
//                 setCurrentSelectedVal(selectedTextTrack && selectedTextTrack.value ? selectedTextTrack.value : null)
//                 break;
//             case 2:
//                 if(Platform.OS === "ios"){
//                     setCurrentSelectedVal(videoBitrate ? videoBitrate : null)
//                 }else {
//                     setCurrentSelectedVal(selectedVideoTrack && selectedVideoTrack.value ? selectedVideoTrack.value : null)
//                 }
//                 break;
//             default:
//                 console.log("error in defaukt")
//                 break;
//             }
//     }

//     function setSelectedValue(data){
//         switch (selectedSettingType) {
//             case 0:
//                 onAudioTracksChange(data)
//                 break;
//             case 1:
//                 onTextTracksChange(data)
//                 break;
//             case 2:
//                 onVideoTrackChange(data)
//                 break;
//             default:
//                 console.log("error in defaukt")
//                 break;
//         }
//     }

//     console.log("textWidths", textWidths)
//     // console.log("selectedSettingType", selectedSettingType, [...settingList[selectedSettingType].data])
//     // console.log("fullscreen" , isFullScreen)
//     return (
//         <View style={{
//             ...styles.modalContent, 
//             height:  Platform.isTV || isFullScreen ? "100%" : "40%", 
//             width:  Platform.isTV || isFullScreen ? "40%" : "100%",
//             alignSelf: "flex-end"
//             }}>
//             <View 
//                style={{
//                     // paddingHorizontal: '2%',
//                     backgroundColor: 'rgb(21,24,33)',
//                     borderTopLeftRadius: 10,
//                     borderTopRightRadius: 10,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                     opacity: 0.7,
//                     margin: 10,
//                     width: "100%",
//                     // backgroundColor: "green",
//                     // paddingBottom: 40,
//                     // height: height/2.6, 
//                     // height: Platform.isTV ? "100%" : "40%"
                    
//                 }}>
//                     <View style={{width: "100%",}} >
//                     <FocusButton
//                         // key={index}
//                         tvParallaxProperties={{
//                             enabled: true,
//                             magnification: 1.05,
//                         }}
//                         hasTVPreferredFocus={true}
//                         // onlyText={true}
//                         isTVSelectable={true}
//                         onFocus={() => {
//                             setIsCloseSelected(true)
//                         }}
//                         onBlur={() => {
//                             setIsCloseSelected(false)
//                         }}
//                         onlyText={true}
//                         underlayColor={gray}
//                         style={{flexDirection: "row", width: "99%",  marginTop: 10,  justifyContent: "flex-end" }}
//                         activeOpacity={0.4}
//                                     // animatedStyle={{ width: "20%"}}
//                         onPress={onCancel}
//                     >
//                         <AntDesign name={"closecircle"} size={isCloseSelected ? 25: 20} style={{marginRight: 40, }} color="white" />
//                     </FocusButton>
//                     </View>


//                     <View style={{flexDirection: "row"}}>
//                     {
//                         settingList.map((item, index)=> {
//                             let eventWidth = 10
//                             return (
//                                 <View key={index}>
//                                 <FocusButton
//                                     // key={index}
//                                     // hasTVPreferredFocus={index=== 0}
//                                     tvParallaxProperties={{
//                                         enabled: true,
//                                         magnification: 1.05,
//                                     }}
//                                     // onlyText={true}
//                                     isTVSelectable={true}
//                                     onFocus={() =>{
//                                         setSettingType(index)
//                                     }}
//                                     underlayColor={gray}
//                                     style={{flexDirection: "row", marginTop: 10, marginRight: 20}}
//                                     activeOpacity={0.4}
//                                     // animatedStyle={{ width: "20%"}}
//                                     onPress={() => {
//                                      !Platform.isTV  &&  setSettingType(index)
//                                     }}
//                                     >
//                                         <Text 
//                                         onLayout={({nativeEvent}) => {
//                                             // console.log("nativeEvent", nativeEvent)
//                                             // const nativeWidth = nativeEvent.layout.width
//                                             // if(textWidths.length !== 3)
//                                             //     setTextWidth([...textWidths, nativeWidth])
//                                     }
//                                         }
//                                         style={{ fontWeight:  selectedSettingType === index && !isCloseSelected ? "700" : 'normal' , color:   "white", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), alignItems: "center" }}>
//                                             {item.type}
//                                         </Text>
//                                     </FocusButton>

//                                     </View>
//                                 )
//                         })
//                     }
                   
//                     </View>
//                     <View style={{width: "100%", }}>
//                     {selectedSettingType !== null &&
//                            <FlatList
//                               data = {[...settingList[selectedSettingType].data]}
//                               keyExtractor={(_, index) =>  index.toString()}
//                               style={{width: "100%"}}
//                               contentContainerStyle={{marginVertical: 20, }}
//                               renderItem={({item, index})=> {
//                                 let  isValueSelected = false 
//                                 if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
//                                     isValueSelected = true
//                                 } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
//                                     isValueSelected = true
//                                 }else if(selectedSettingType === 2 && selectedVideoTrack === undefined && item.value === "Auto"){
//                                     isValueSelected = true
//                                 }
//                                 return(
//                                     <FocusButton
                                        
//                                         // hasTVPreferredFocus={true}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         hasTVPreferredFocus={false}

//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() => {}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row",  marginBottom: 5, width: "100%", paddingLeft: 15}}
//                                         activeOpacity={0.4}
//                                         // style={{ marginBottom: 5}}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => 
//                                             {
//                                                 setSelectedValue(item)
//                                                 setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
//                                             }
//                                         }
//                                     >
//                                         <Text style={{ fontWeight:  isValueSelected  ? "700" : 'normal' , color: isValueSelected ? "#4682B4" : 'white', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item[settingList[selectedSettingType].dataAttr]}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                               }}
//                               ListEmptyComponent={() => {
//                                 return (
//                                     <View style={{alignSelf: 'center', height: "100%", width: "100%", flex: 1, alignItems: "center", justifyContent: "center",}}>
//                                         <Text style={{color: "white", textAlign: "center"}}>No Data found</Text>
//                                     </View>
//                                 )
//                               }}
//                             />
//                     }
//                     </View>

                   
//                 {/* <View>
//                     <Text style={{ color: 'black', alignSelf: "center", fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6), marginVertical: 10 }}>
//                         <FontIstoIcon size={normalize(1.7)} name={'player-settings'} /> Settings
//                     </Text>
//                     <View style={{flexDirection: "row"}}>
//                         <View style={{ width: "40%", marginLeft: 10}}>
//                         {
//                             settingList.map((item, index)=> {
//                                 return (
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() =>{}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row", marginTop: 10}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => {
//                                             setSelectedSettingType(index)
//                                             switch (index) {
//                                                 case 0:
//                                                     setCurrentSelectedVal(selectedAudioTrack && selectedAudioTrack.value ? selectedAudioTrack.value : null)

//                                                     break;
//                                                 case 1:
//                                                     setCurrentSelectedVal(selectedTextTrack && selectedTextTrack.value ? selectedTextTrack.value : null)
//                                                     break;
//                                                 case 2:
//                                                     if(Platform.OS === "ios"){
//                                                         setCurrentSelectedVal(videoBitrate ? videoBitrate : null)
//                                                     }else {
//                                                         setCurrentSelectedVal(selectedVideoTrack && selectedVideoTrack.value ? selectedVideoTrack.value : null)
//                                                     }
//                                                     break;
//                                                 default:
//                                                     console.log("error in defaukt")
//                                                     break;
//                                             }
//                                         }}
//                                     >
//                                         <ImageIcon size={20} name={item.icon} color={selectedSettingType === index ? "#4682B4": "black"}  iconType={item.iconType} />
//                                         <Text style={{ color: selectedSettingType === index ? "#4682B4": "black", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item.type}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                             })
//                         }
//                         </View>
//                         <View style={{marginLeft: 100}}>
//                         {selectedSettingType !== null &&
//                            <FlatList
//                               data = {[...settingList[selectedSettingType].data]}
//                               keyExtractor={(_, index) =>  index.toString()}
//                               style={{width: 100}}
//                               contentContainerStyle={{paddingBottom: 100}}
//                               renderItem={({item, index})=> {
//                                 let  isValueSelected = false 
//                                 if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
//                                     isValueSelected = true
//                                 } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
//                                     isValueSelected = true
//                                 }
//                                 return(
//                                     <FocusButton
//                                         key={index}
//                                         hasTVPreferredFocus={index === 0}
//                                         tvParallaxProperties={{
//                                             enabled: true,
//                                             magnification: 1.05,
//                                         }}
//                                         onlyText={true}
//                                         isTVSelectable={true}
//                                         onFocus={() => {}}
//                                         underlayColor={gray}
//                                         style={{flexDirection: "row"}}
//                                         activeOpacity={0.4}
//                                         // animatedStyle={{ width: "20%"}}
//                                         onPress={() => 
//                                             {
//                                                 setSelectedValue(item)
//                                                 setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
//                                             }
//                                         }
//                                     >
//                                         <Text style={{ color: isValueSelected ? "#4682B4" : 'black', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
//                                             {item[settingList[selectedSettingType].dataAttr]}
//                                         </Text>
//                                     </FocusButton>
//                                 )
//                               }}

//                            />
//                             // [...settingList[selectedSettingType].data].map((item, index)=> {
//                             //  return (
                                    
//                             //  )
//                             // })
//                         }
//                         </View>
//                     </View>
                    
//                 </View> */}

//             </View>
//         </View>
//         )
// }



// const styles = StyleSheet.create({
//     modalContent: {
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//         borderBottomLeftRadius: 12,
//         borderBottomRightRadius: 12,
//         // marginLeft: 8,
//         // marginRight: 8,
//         // marginBottom: 20,
//         // height: Platform.isTV ? "100%" : "40%", 
//         backgroundColor: 'rgb(21,24,33)',
//         // bottom: 0,
//         // position: "absolute",
//         // bottom: 0,

        
//     },

//     actionSheetText: {
//         fontSize: 18,
//         color: 'black'
//     },

//     actionSheetView: {
//         backgroundColor: WHITE,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingBottom: 10,
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         borderColor: BORDER_COLOR
//     }
// });

// ActionSheet.propTypes = {
//     onCancel: PropTypes.func,
//     actionTextColor: PropTypes.string,
//     textTracks: PropTypes.array,
//     audioTracks: PropTypes.array,
//     selectedAudioTrack: PropTypes.object,
//     selectedTextTrack: PropTypes.object,
//     onTextTracksChange: PropTypes.func,
//     onAudioTracksChange: PropTypes.func,
//     onTextTracksOff: PropTypes.func,
//     setTvFocus: PropTypes.bool
// }


// ActionSheet.defaultProps = {
//     onCancel: () => { },
//     actionTextColor: null,
//     textTracks: [],
//     audioTracks: [],
//     selectedAudioTrack: {},
//     selectedTextTrack: {},
//     onTextTracksChange: () => { },
//     onAudioTracksChange: () => { },
//     onTextTracksOff: () => { },
//     setTvFocus: true
// }


// export default React.memo(ActionSheet)































import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, SectionList, ScrollView } from 'react-native';
import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontIstoIcon from 'react-native-vector-icons/Fontisto'
import { FocusButton, FocusText } from 'react-native-tv-selected-focus';
import { gray } from '../../../src/helper/Color';
import { FlatList } from 'react-native-gesture-handler';

const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';
const {heigh, width} = Dimensions.get("window")

const ActionSheet = (props) => {
    const { 
        onCancel, 
        audioTracks, 
        textTracks, videoTracks, 
        selectedTextTrack, 
        selectedAudioTrack, 
        selectedVideoTrack, 
        setTvFocus, 
        onTextTracksChange, 
        onAudioTracksChange, 
        onVideoTrackChange, 
        onTextTracksOff, 
        videoBitrate, 
        isFullScreen 
    } = props;
    const [settingList, setSettingList] = useState([
        {
            title: "Audio Language",
            icon: 'volume-up',
            iconType: "FontAwesome",
            dataAttr: "language",
            data: [...audioTracks]
        },
        {
            title: "Subtitles",
            icon: 'commenting',
            iconType: "FontAwesome",
            dataAttr: "language",
            data: [...textTracks]
        },
        {
            title: "Resolutions",
            icon: 'hd',
            iconType: "MaterialIcons",
            dataAttr: "value",
            data: videoTracks ? [...videoTracks] : []
        }
    ])
    // console.log("textTracks :: +++ :: ", textTracks)
    // const [selectedSettingType, setSelectedSettingType] = useState(0)
    // const [currentSelectedVal, setCurrentSelectedVal] = useState(null)
    const [textWidths, setTextWidth] = useState([])
    const [isCloseSelected, setIsCloseSelected] = useState(false)


    function setSelectedValue(data, sectionName){
        switch (sectionName) {
            case "Audio Language":
                onAudioTracksChange(data)
                break;
            case "Subtitles":
                onTextTracksChange(data)
                break;
            case "Resolutions":
                onVideoTrackChange(data)
                break;
            default:
                console.log("error in defaukt")
                break;
        }
    }

    function updateVals(section, item){
        switch (section.title) {
           
            case "Audio Language":
                return selectedAudioTrack.value === item[section.dataAttr]
                break;
            case "Subtitles":
                return selectedTextTrack.value === item[section.dataAttr]
                break;
            case "Resolutions":
                if(selectedVideoTrack === undefined && item[section.dataAttr] === "Auto"){
                    return  true
                } else {
                    return selectedVideoTrack && selectedVideoTrack.value === item[section.dataAttr]
                }
            default:
                return false;
        }
    }

    // console.log("textWidths", textWidths)
    // console.log("selectedSettingType", selectedSettingType, [...settingList[selectedSettingType].data])
    // console.log("fullscreen" , isFullScreen)
    return (
        <View style={{
            ...styles.modalContent, 
            height:  Platform.isTV || isFullScreen ? "100%" : "40%", 
            width:  Platform.isTV || isFullScreen ? "40%" : "100%",
            alignSelf: "flex-end"
            }}>
            {/* <View 
               style={{
                    // paddingHorizontal: '2%',
                    backgroundColor: 'rgb(21,24,33)',
                    // borderTopLeftRadius: 10,
                    // borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    opacity: 0.7,
                    // margin: 10,
                    width: "100%",
                    // backgroundColor: "green",
                    // paddingBottom: 40,
                    // height: height/2.6, 
                    // height: Platform.isTV ? "100%" : "40%"
                    
                }}> */}
                <View style={{width: "100%",}} >
                    <FocusButton
                        // key={index}
                        tvParallaxProperties={{
                            enabled: true,
                            magnification: 1.05,
                        }}
                        hasTVPreferredFocus={true}
                        // onlyText={true}
                        isTVSelectable={true}
                        onFocus={() => {
                            setIsCloseSelected(true)
                        }}
                        onBlur={() => {
                            setIsCloseSelected(false)
                        }}
                        onlyText={true}
                        underlayColor={gray}
                        style={{flexDirection: "row", width: "99%",  marginTop: 10,  justifyContent: "flex-end" }}
                        activeOpacity={0.4}
                        // animatedStyle={{ width: "20%"}}
                        onPress={onCancel}
                    >
                        <AntDesign name={"closecircle"} size={isCloseSelected ? 25: 20} style={{marginRight: 40, }} color="white" />
                    </FocusButton>
                </View>
                {
                    Platform.isTV  || isFullScreen ? 
                    (
                        <SectionList 
                            sections={settingList}
                            scrollEnabled={true}
                            contentContainerStyle={{marginBottom: 110, marginTop: 10}}
                            keyExtractor={(item, index) => item + index}
                            renderSectionFooter={({section}) => {
                                if(section.data.length=== 0){
                                    return (
                                        <View style={{paddingHorizontal: 10, paddingVertical: 8}}>
                                            <Text>No Data Found</Text>
                                        </View>
                                )}
                                return null
                            }}
                            renderItem={({item, index, section}) => {
                                // console.log("section", section)
                                let isSelected = updateVals(section, item)

                                // const isSelected = selectedTextTrack === item[section.dataAttr] ? 
                                return(
                                    <FocusText
                                        tvParallaxProperties={{
                                            enabled: true,
                                            magnification: 1.05,
                                        }}
                                        hasTVPreferredFocus={false}

                                        onlyText={true}
                                        isTVSelectable={true}
                                        onFocus={() => {}}
                                        underlayColor={gray}
                                        // style={{flexDirection: "row",  marginBottom: 5, width: "100%", paddingLeft: 15}}
                                        activeOpacity={0.4}
                                        // style={{ marginBottom: 5}}
                                        // animatedStyle={{ width: "20%"}}
                                        onPress={() => 
                                            {
                                                setSelectedValue(item, section.title)
                                                // setCurrentSelectedVal(item[section.dataAttr])
                                            }
                                        }
                                        value={item[section.dataAttr]}
                                        containerStyle={{paddingHorizontal: 20, paddingVertical: 8, width : 90}}
                                        textStyle={{color: isSelected ? "#4682B4": "white", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center"}}
                                    />
                                        
                            )}}
                            renderSectionHeader={({section: {title}}) => (
                                <View style={{backgroundColor: "#1F456E", padding: 10}}>
                                    <Text style={{ fontWeight: "700"  , color: 'white', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>{title}</Text>
                                </View>
                            )}
                        />
                    )
                    : 
                    (
                        <SectionList 
                            sections={settingList}
                            scrollEnabled={true}
                            contentContainerStyle={{marginBottom: 110, marginTop: 10}}
                            keyExtractor={(item, index) => item + index}
                            renderSectionFooter={({section}) => {
                                if(section.data.length=== 0){
                                    return (
                                        <View style={{paddingHorizontal: 10, paddingVertical: 8}}>
                                            <Text>No Data Found</Text>
                                        </View>
                                )}
                                return null
                            }}
                            renderItem={({item, index, section}) => {
                                // console.log("section", section)
                                let isSelected = updateVals(section, item)

                                // const isSelected = selectedTextTrack === item[section.dataAttr] ? 
                                return(
                                    <FocusButton
                                    tvParallaxProperties={{
                                        enabled: true,
                                        magnification: 1.05,
                                    }}
                                    hasTVPreferredFocus={false}

                                    onlyText={true}
                                    isTVSelectable={true}
                                    onFocus={() => {}}
                                    underlayColor={gray}
                                    // style={{flexDirection: "row",  marginBottom: 5, width: "100%", paddingLeft: 15}}
                                    activeOpacity={0.4}
                                    // style={{ marginBottom: 5}}
                                    // animatedStyle={{ width: "20%"}}
                                    onPress={() => 
                                        {
                                            setSelectedValue(item, section.title)
                                            // setCurrentSelectedVal(item[section.dataAttr])
                                        }
                                    }
                                    style={{paddingHorizontal: 20, paddingVertical: 8}}>
                                        <Text style={{color: isSelected ? "#4682B4": "white", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center"}}>{item[section.dataAttr]}</Text>
                                    </FocusButton>
                            )}}
                            renderSectionHeader={({section: {title}}) => (
                                <View style={{backgroundColor: "#1F456E", padding: 10}}>
                                    <Text style={{ fontWeight: "700"  , color: 'white', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>{title}</Text>
                                </View>
                            )}
                        />
                    )

                }
                {/* <ScrollView >
                    <View >
                        {
                           settingList.map((section, settingId)=> {
                            return (
                                <View>
                                    <View style={{backgroundColor: "#4682A2", padding: 10}}>
                                        <Text style={{ fontWeight: "700"  , color: 'white', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>{section.title}</Text>
                                    </View>
                                    {section.data.map((item, index)=> (
                                                                    <FocusButton
                                                                    tvParallaxProperties={{
                                                                        enabled: true,
                                                                        magnification: 1.05,
                                                                    }}
                                                                    hasTVPreferredFocus={false}
                                        
                                                                    onlyText={true}
                                                                    isTVSelectable={true}
                                                                    onFocus={() => {}}
                                                                    underlayColor={gray}
                                                                    // style={{flexDirection: "row",  marginBottom: 5, width: "100%", paddingLeft: 15}}
                                                                    activeOpacity={0.4}
                                                                    // style={{ marginBottom: 5}}
                                                                    // animatedStyle={{ width: "20%"}}
                                                                    onPress={() => 
                                                                        {
                                                                            setSelectedValue(item)
                                                                            setCurrentSelectedVal(item[section.dataAttr])
                                                                        }
                                                                    }
                                                                    style={{paddingHorizontal: 10, paddingVertical: 4, width: 100}}>
                                                                        <Text style={{color: selectedSettingType === index ? "#4682B4": "white", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center"}}>{item[section.dataAttr]}</Text>
                                                                    </FocusButton>
                                    ))

                                    }
                                </View>
                            )
                           }) 
                        }
                    </View>
                </ScrollView> */}
                
                    {/* <View style={{width: "100%",}} >
                    <FocusButton
                        // key={index}
                        tvParallaxProperties={{
                            enabled: true,
                            magnification: 1.05,
                        }}
                        hasTVPreferredFocus={true}
                        // onlyText={true}
                        isTVSelectable={true}
                        onFocus={() => {
                            setIsCloseSelected(true)
                        }}
                        onBlur={() => {
                            setIsCloseSelected(false)
                        }}
                        onlyText={true}
                        underlayColor={gray}
                        style={{flexDirection: "row", width: "99%",  marginTop: 10,  justifyContent: "flex-end" }}
                        activeOpacity={0.4}
                        // animatedStyle={{ width: "20%"}}
                        onPress={onCancel}
                    >
                        <AntDesign name={"closecircle"} size={isCloseSelected ? 25: 20} style={{marginRight: 40, }} color="white" />
                    </FocusButton>
                    </View>


                    <View style={{flexDirection: "row"}}>
                    {
                        settingList.map((item, index)=> {
                            let eventWidth = 10
                            return (
                                <View key={index}>
                                <FocusButton
                                    // key={index}
                                    // hasTVPreferredFocus={index=== 0}
                                    tvParallaxProperties={{
                                        enabled: true,
                                        magnification: 1.05,
                                    }}
                                    // onlyText={true}
                                    isTVSelectable={true}
                                    onFocus={() =>{
                                        setSettingType(index)
                                    }}
                                    underlayColor={gray}
                                    style={{flexDirection: "row", marginTop: 10, marginRight: 20}}
                                    activeOpacity={0.4}
                                    // animatedStyle={{ width: "20%"}}
                                    onPress={() => {
                                     !Platform.isTV  &&  setSettingType(index)
                                    }}
                                    >
                                        <Text 
                                        onLayout={({nativeEvent}) => {
                                            // console.log("nativeEvent", nativeEvent)
                                            // const nativeWidth = nativeEvent.layout.width
                                            // if(textWidths.length !== 3)
                                            //     setTextWidth([...textWidths, nativeWidth])
                                    }
                                        }
                                        style={{ fontWeight:  selectedSettingType === index && !isCloseSelected ? "700" : 'normal' , color:   "white", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), alignItems: "center" }}>
                                            {item.type}
                                        </Text>
                                    </FocusButton>

                                    </View>
                                )
                        })
                    }
                   
                    </View>
                    <View style={{width: "100%", }}>
                    {selectedSettingType !== null &&
                           <FlatList
                              data = {[...settingList[selectedSettingType].data]}
                              keyExtractor={(_, index) =>  index.toString()}
                              style={{width: "100%"}}
                              contentContainerStyle={{marginVertical: 20, }}
                              renderItem={({item, index})=> {
                                let  isValueSelected = false 
                                if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
                                    isValueSelected = true
                                } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
                                    isValueSelected = true
                                }else if(selectedSettingType === 2 && selectedVideoTrack === undefined && item.value === "Auto"){
                                    isValueSelected = true
                                }
                                return(
                                    <FocusButton
                                        
                                        // hasTVPreferredFocus={true}
                                        tvParallaxProperties={{
                                            enabled: true,
                                            magnification: 1.05,
                                        }}
                                        hasTVPreferredFocus={false}

                                        onlyText={true}
                                        isTVSelectable={true}
                                        onFocus={() => {}}
                                        underlayColor={gray}
                                        style={{flexDirection: "row",  marginBottom: 5, width: "100%", paddingLeft: 15}}
                                        activeOpacity={0.4}
                                        // style={{ marginBottom: 5}}
                                        // animatedStyle={{ width: "20%"}}
                                        onPress={() => 
                                            {
                                                setSelectedValue(item)
                                                setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
                                            }
                                        }
                                    >
                                        <Text style={{ fontWeight:  isValueSelected  ? "700" : 'normal' , color: isValueSelected ? "#4682B4" : 'white', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
                                            {item[settingList[selectedSettingType].dataAttr]}
                                        </Text>
                                    </FocusButton>
                                )
                              }}
                              ListEmptyComponent={() => {
                                return (
                                    <View style={{alignSelf: 'center', height: "100%", width: "100%", flex: 1, alignItems: "center", justifyContent: "center",}}>
                                        <Text style={{color: "white", textAlign: "center"}}>No Data found</Text>
                                    </View>
                                )
                              }}
                            />
                    }
                    </View> */}

                   
                {/* <View>
                    <Text style={{ color: 'black', alignSelf: "center", fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6), marginVertical: 10 }}>
                        <FontIstoIcon size={normalize(1.7)} name={'player-settings'} /> Settings
                    </Text>
                    <View style={{flexDirection: "row"}}>
                        <View style={{ width: "40%", marginLeft: 10}}>
                        {
                            settingList.map((item, index)=> {
                                return (
                                    <FocusButton
                                        key={index}
                                        hasTVPreferredFocus={index === 0}
                                        tvParallaxProperties={{
                                            enabled: true,
                                            magnification: 1.05,
                                        }}
                                        onlyText={true}
                                        isTVSelectable={true}
                                        onFocus={() =>{}}
                                        underlayColor={gray}
                                        style={{flexDirection: "row", marginTop: 10}}
                                        activeOpacity={0.4}
                                        // animatedStyle={{ width: "20%"}}
                                        onPress={() => {
                                            setSelectedSettingType(index)
                                            switch (index) {
                                                case 0:
                                                    setCurrentSelectedVal(selectedAudioTrack && selectedAudioTrack.value ? selectedAudioTrack.value : null)

                                                    break;
                                                case 1:
                                                    setCurrentSelectedVal(selectedTextTrack && selectedTextTrack.value ? selectedTextTrack.value : null)
                                                    break;
                                                case 2:
                                                    if(Platform.OS === "ios"){
                                                        setCurrentSelectedVal(videoBitrate ? videoBitrate : null)
                                                    }else {
                                                        setCurrentSelectedVal(selectedVideoTrack && selectedVideoTrack.value ? selectedVideoTrack.value : null)
                                                    }
                                                    break;
                                                default:
                                                    console.log("error in defaukt")
                                                    break;
                                            }
                                        }}
                                    >
                                        <ImageIcon size={20} name={item.icon} color={selectedSettingType === index ? "#4682B4": "black"}  iconType={item.iconType} />
                                        <Text style={{ color: selectedSettingType === index ? "#4682B4": "black", fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
                                            {item.type}
                                        </Text>
                                    </FocusButton>
                                )
                            })
                        }
                        </View>
                        <View style={{marginLeft: 100}}>
                        {selectedSettingType !== null &&
                           <FlatList
                              data = {[...settingList[selectedSettingType].data]}
                              keyExtractor={(_, index) =>  index.toString()}
                              style={{width: 100}}
                              contentContainerStyle={{paddingBottom: 100}}
                              renderItem={({item, index})=> {
                                let  isValueSelected = false 
                                if(selectedSettingType === 2 && Platform.OS === "ios" &&  videoBitrate && videoBitrate ===  item.bitrate){
                                    isValueSelected = true
                                } else if(currentSelectedVal && currentSelectedVal ===  item[settingList[selectedSettingType].dataAttr]){
                                    isValueSelected = true
                                }
                                return(
                                    <FocusButton
                                        key={index}
                                        hasTVPreferredFocus={index === 0}
                                        tvParallaxProperties={{
                                            enabled: true,
                                            magnification: 1.05,
                                        }}
                                        onlyText={true}
                                        isTVSelectable={true}
                                        onFocus={() => {}}
                                        underlayColor={gray}
                                        style={{flexDirection: "row"}}
                                        activeOpacity={0.4}
                                        // animatedStyle={{ width: "20%"}}
                                        onPress={() => 
                                            {
                                                setSelectedValue(item)
                                                setCurrentSelectedVal(item[settingList[selectedSettingType].dataAttr])
                                            }
                                        }
                                    >
                                        <Text style={{ color: isValueSelected ? "#4682B4" : 'black', fontFamily: 'Montserrat-Medium', justifyContent: "center", fontSize: normalize(1.6), marginLeft: 5, alignItems: "center" }}>
                                            {item[settingList[selectedSettingType].dataAttr]}
                                        </Text>
                                    </FocusButton>
                                )
                              }}

                           />
                            // [...settingList[selectedSettingType].data].map((item, index)=> {
                            //  return (
                                    
                            //  )
                            // })
                        }
                        </View>
                    </View>
                    
                </View> */}

            </View>
        // </View>
        )
}



const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        // marginLeft: 8,
        // marginRight: 8,
        // marginBottom: 20,
        // height: Platform.isTV ? "100%" : "40%", 
        backgroundColor: 'rgb(21,24,33)',
        // bottom: 0,
        // position: "absolute",
        // bottom: 0,

        
    },

    actionSheetText: {
        fontSize: 18,
        color: 'black'
    },

    actionSheetView: {
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_COLOR
    }
});

ActionSheet.propTypes = {
    onCancel: PropTypes.func,
    actionTextColor: PropTypes.string,
    textTracks: PropTypes.array,
    audioTracks: PropTypes.array,
    selectedAudioTrack: PropTypes.object,
    selectedTextTrack: PropTypes.object,
    onTextTracksChange: PropTypes.func,
    onAudioTracksChange: PropTypes.func,
    onTextTracksOff: PropTypes.func,
    setTvFocus: PropTypes.bool
}


ActionSheet.defaultProps = {
    onCancel: () => { },
    actionTextColor: null,
    textTracks: [],
    audioTracks: [],
    selectedAudioTrack: {},
    selectedTextTrack: {},
    onTextTracksChange: () => { },
    onAudioTracksChange: () => { },
    onTextTracksOff: () => { },
    setTvFocus: true
}


export default React.memo(ActionSheet)