import React from 'react';
import { StyleSheet, Animated, View, Image, Text } from 'react-native';

export const VideoError = React.memo(({ error, errorMessage }) => {
    if (error) {
        return (
            <View style={styles.error.container}>
                <Image
                    source={require('../../../src/assets/img/error-icon.png')}
                    style={styles.error.icon}
                />
                <Text style={styles.error.text}>{errorMessage}</Text>
            </View>
        );
    }
    return null;
})

export const VideoLoader = React.memo(({ loading, errorMessage }) => {

   const loader = {
        rotate: new Animated.Value(0),
        MAX_VALUE: 360,
    }

		if (loading) {
			return (
				<View style={styles.loader.container}>
					<Animated.Image
						source={require('../../src/assets/img/loader-icon.png')}
						style={[
							styles.loader.icon,
							{
								transform: [
									{
										rotate: loader.rotate.interpolate({
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
	
})

export const VideoControls = React.memo(() => {
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
            onFocus={()=>{}}
            onPress={() => {
                this.resetControlTimeout();
                callback();
            }}
            button={true}
            style={[styles.controls.control, style]}>
            {children}
        </FocusButton>
    );
})



const styles = {
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
}