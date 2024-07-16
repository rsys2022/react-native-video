import React, { useEffect } from 'react';
import { SpatialNavigationRoot, useLockSpatialNavigation, DefaultFocus } from 'react-tv-space-navigation';
import { Button } from '../buttons';  //'../Button';
// import { Spacer } from '../../design-system/components/Spacer';
import { GenericModal } from './GenericModal';
import { useIsFirstRender } from './useIsFirstRender';

import ActionSheet from '../actionSheet';
import { PercentageBar } from '../progress';
import { Modal } from './Modal';

interface AddSkipModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  percentage:any,
  showSkip:any,
  adDuration:any,
  onSkipPress:any,
  initialTime:any,
  playPauseCall:any,
  setMuteValue:any,
  isPaused:any,
  isMuted:any,
  onCancel:any;
}

export const AddSkipModal = ({
  isModalVisible,
  setIsModalVisible,
  percentage,
  showSkip,
  adDuration,
  onSkipPress,
  initialTime,
  playPauseCall,
  setMuteValue,
  isPaused,
  isMuted,
  onCancel
}: AddSkipModalProps) => {
  return (
	<Modal
	isModalVisible={isModalVisible}
	hideModal={() => {
    console.log('Hide Modal'); // Add this line
    setIsModalVisible(false)}}
	title=''
	>
	  <PercentageBar
					percentage={percentage}
					showSkip={showSkip}
					adDuration={adDuration}
					onSkipPress={() =>{
						onSkipPress();
					}}
					initialTime={initialTime}
					playPauseCall={(value) => playPauseCall(value)}
					setMuteValue={(value) => setMuteValue(value)}
					isPaused={isPaused}
					isMuted={isMuted}
					setTvFocus={true}
				/>

</Modal>
  );
};