import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {black, blue, gray, transparent, white} from '../../src/helper/Color';
import { normalize } from '../../src/helper/FontSize'   // '../../helper/FontSize';
import {ImageIcon} from  '../../src/component/Icon/icon'   //'../../component/Icon/icon'; 
const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

const ActionSheet = (props) => {
  const {onCancel,audioTracks,textTracks,selectedTextTrack,selectedAudioTrack,setTvFocus,onTextTracksChange,onAudioTracksChange,onTextTracksOff } = props;

  return (
    <View style={styles.modalContent}>
     
	 <View style={{paddingHorizontal: '2%',backgroundColor:white,borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,paddingBottom:10}}>
			  <View style={{flexDirection: 'row'}}>
				<View
				  style={{
					borderRightWidth: 0.5,
					borderRightColor: 'gray',
					// height: 130,
					width: '50%',
					paddingTop: 10,
					// justifyContent:'flex-start',
					// alignItems: 'flex-start',
				  }}>
				  <View>
					<Text style={{color: black, fontFamily: 'Montserrat-Medium',fontSize:normalize(1.6)}}>
					  {' '}
					  <ImageIcon size={normalize(1.7)} name={'volume-up'} /> Audio Language
					</Text>
				  </View>
				  {audioTracks.length && audioTracks.map((item, index) => {
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
						isTVSelectable={!setTvFocus}
						underlayColor={ transparent}
						onPress={() => onAudioTracksChange(item)}>
						<View style={{flexDirection: 'row', paddingTop: 7}}>
						  <View style={{width: 30}}>
							{selectedAudioTrack ? (
							  selectedAudioTrack.value ===
							  item.language ? (
								<ImageIcon size={normalize(1.7)} color={blue} name={'check'} />
							  ) : null
							) : null}
						  </View>
						  <View>
							<Text
							  style={{
								color: selectedAudioTrack
								  ? selectedAudioTrack.value ==
									item.language
									? blue
									: black
								  : black,
								  fontSize:normalize(1.4)
							  }}>
							  {item.title} {'(' + item.language + ')'}
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
					<Text style={{color: black, fontFamily: 'Montserrat-Medium',fontSize:normalize(1.6)}}>
					  {' '}
					  <ImageIcon size={normalize(1.7)} name={'commenting'} /> Subtitles
					</Text>
				  </View>
				  
				  {textTracks.map((item, index) => {
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
						isTVSelectable={!setTvFocus}
						underlayColor={ transparent}
						onPress={() => onTextTracksChange(item)}>
						<View style={{flexDirection: 'row', paddingTop: 7}}>
						  <View style={{width: 30}}>
							{selectedTextTrack ? (
							  selectedTextTrack.value ===
							  item.language ? (
								<ImageIcon size={normalize(1.7)} color={blue} name={'check'} />
							  ) : null
							) : null}
						  </View>
						  <View>
							<Text
							  style={{
								color: selectedTextTrack
								  ? selectedTextTrack.value ===
									item.language
									? blue
									: black
								  : black,
								  fontSize:normalize(1.4)
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
						isTVSelectable={!setTvFocus}
						underlayColor={ transparent}
						onPress={() => onTextTracksOff()}>
						<View style={{flexDirection: 'row', paddingTop: 7}}>
						  <View style={{width: 30}}>
							{selectedTextTrack ? (
							  selectedTextTrack.value ===
							  'Off' ? (
								<ImageIcon size={18} color={blue} name={'check'} />
							  ) : null
							) : null}
						  </View>
						  <View>
							<Text
							  style={{
								color: selectedTextTrack
								  ? selectedTextTrack.value ===
									'Off'
									? blue
									: black
								  : black,
								  fontSize:normalize(1.3)
							  }}>
							  {'Off'}
							</Text>
						  </View>
						</View>
					  </TouchableHighlight>
				</View>
			  </View>
			</View>
			<TouchableHighlight
              style={[
                styles.actionSheetView,{
					borderBottomWidth: 0,
					backgroundColor: WHITE,
					marginTop: 8,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
				  }]}
              underlayColor={'#f7f7f7'}
             onPress={onCancel}
            >
              <Text allowFontScaling={false}
                style={[
                  styles.actionSheetText
                ]}>
               Cancel
              </Text>
            </TouchableHighlight>
       
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
  },
  actionSheetText: {
    fontSize: 18,
    color: black
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

  textTracks:PropTypes.array,
  audioTracks:PropTypes.array,
  selectedAudioTrack:PropTypes.object,
  selectedTextTrack:PropTypes.object,
  onTextTracksChange:PropTypes.func,
  onAudioTracksChange:PropTypes.func,
  onTextTracksOff:PropTypes.func,
  setTvFocus:PropTypes.bool
}


ActionSheet.defaultProps = {
  onCancel: () => { },
  actionTextColor: null,

  textTracks:[],
  audioTracks:[],
  selectedAudioTrack:{},
  selectedTextTrack:{},
  onTextTracksChange:()=>{},
  onAudioTracksChange:()=>{},
  onTextTracksOff:()=>{},
  setTvFocus:true
}


export default ActionSheet;