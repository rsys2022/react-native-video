import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { checkArrayAndElements, ImageIcon, normalize } from '../assets/Icon/icon'
import { FocusButton } from 'react-native-tv-selected-focus';
import { gray } from '../../../src/helper/Color';

const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

const ActionSheet = (props) => {
	const { onCancel, audioTracks, textTracks, selectedTextTrack, selectedAudioTrack, setTvFocus, onTextTracksChange, onAudioTracksChange, onTextTracksOff } = props;

	return (
		<View style={styles.modalContent}>
			<View style={{
				paddingHorizontal: '2%',
				backgroundColor: 'white',
				borderTopLeftRadius: 10,
				borderTopRightRadius: 10,
				borderBottomLeftRadius: 10,
				borderBottomRightRadius: 10,
				paddingBottom: 10
			}}>
				<View style={{ flexDirection: 'row' }}>
					{checkArrayAndElements(audioTracks) ? (
						<View
							style={{
								borderRightWidth: 0.5,
								borderRightColor: 'gray',
								width: '50%',
								paddingTop: 10,
							}}
						>
							<View>
								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
									<ImageIcon size={normalize(1.7)} name={'volume-up'} /> Audio Language
								</Text>
							</View>
							{audioTracks.length && audioTracks.map((item, index) => {
								return (
									<FocusButton
										key={index}
										hasTVPreferredFocus={true}
										tvParallaxProperties={{
											enabled: true,
											magnification: 1.05,
										}}
										isTVSelectable={true}
										onFocus={() => { }}
										underlayColor={gray}
										activeOpacity={0.4}
										onPress={() => onAudioTracksChange(item)}>
										<View style={{ flexDirection: 'row', paddingTop: 7, justifyContent: 'flex-start' }}>
											<View style={{ paddingLeft: 30, paddingRight: 5 }}>
												{selectedAudioTrack && selectedAudioTrack.value === item.language ? (
													<ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
												)
													: null}
											</View>
											<View>
												<Text
													style={{
														color: selectedAudioTrack && selectedAudioTrack.value === item.language ? 'blue' : 'black',
														fontSize: normalize(1.4)
													}}>
													{item.language}
												</Text>
											</View>
										</View>
									</FocusButton>
								);
							})}
						</View>) : null}
					{checkArrayAndElements(textTracks) ?
						(<View
							style={{
								width: '50%',
								paddingTop: 10,
								paddingLeft: 15,
							}}>
							<View>
								<Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: normalize(1.6) }}>
									<ImageIcon size={normalize(1.7)} name={'commenting'} /> Subtitles
								</Text>
							</View>
							{textTracks.map((item, index) => {
								return (
									<FocusButton
										key={index}
										tvParallaxProperties={{
											enabled: true,
											magnification: 1.05,
										}}
										isTVSelectable={true}
										onFocus={() => { }}
										underlayColor={'transparent'}
										onPress={() => onTextTracksChange(item)}>

										<View style={{ flexDirection: 'row', paddingTop: 7 }}>
											<View style={{ paddingLeft: 30, paddingRight: 5 }}>
												{selectedTextTrack && selectedTextTrack.value === item.language ? (
													<ImageIcon size={normalize(1.4)} color={'blue'} name={'check'} />
												) : null}
											</View>
											<View>
												<Text
													style={{
														color: selectedTextTrack && selectedTextTrack.value === item.language ? 'blue' : 'black',
														fontSize: normalize(1.4)
													}}>
													{item.language}
												</Text>
											</View>
										</View>
									</FocusButton>
								);
							})}

							<FocusButton
								tvParallaxProperties={{
									enabled: true,
									magnification: 1.05,
								}}
								isTVSelectable={true}
								onFocus={() => { }}
								underlayColor={'transparent'}
								onPress={() => onTextTracksOff()}>
								<View style={{ flexDirection: 'row', paddingTop: 7 }}>
									<View style={{ width: 30 }}>
										{selectedTextTrack && selectedTextTrack.value === 'Off' ? (
											<ImageIcon size={18} color={'blue'} name={'check'} />
										) : null}
									</View>
									<View>
										<Text
											style={{
												color: selectedTextTrack && selectedTextTrack.value === 'Off' ? 'blue' : 'black',
												fontSize: normalize(1.3)
											}}>
											{'Off'}
										</Text>
									</View>
								</View>
							</FocusButton>
						</View>) : null}
				</View>
			</View>
			<FocusButton
				style={[
					styles.actionSheetView, {
						borderBottomWidth: 0,
						backgroundColor: WHITE,
						marginTop: 8,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
					}]}
				onFocus={() => { }}
				onPress={onCancel}
				isTVSelectable={true}
				tvParallaxProperties={{
					enabled: true,
					magnification: 1.05,
				}} >
				<Text allowFontScaling={false}
					style={[
						styles.actionSheetText
					]}>
					Cancel
				</Text>
			</FocusButton>
		</View>)
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


export default ActionSheet;