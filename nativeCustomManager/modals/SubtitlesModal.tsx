import { useEffect } from 'react';
// import { Spacer } from '../../design-system/components/Spacer';
import { GenericModal } from './GenericModal';
import { useIsFirstRender } from './useIsFirstRender';
import { SpatialNavigationRoot, useLockSpatialNavigation, DefaultFocus } from 'react-tv-space-navigation';
import React from 'react';
import ActionSheet from '../actionSheet';

interface SubtitlesModalProps {
  isModalVisible: boolean;
  audioTracks:any;
  textTracks:any;
  videoTracks:any;
  selectedTextTrack:any;
  selectedAudioTrack:any;
  selectedVideoTrack:any;
  videoBitrate:any;
  onAudioTracksChange:any;
  isFullScreen:any;
  onTextTracksChange:any;
  onVideoTrackChange:any;
  onCancel:any;
  onTextTracksOff:any;
}

export const SubtitlesModal = ({
  isModalVisible,
  audioTracks,
  textTracks,
  videoTracks,
  selectedTextTrack,
  selectedAudioTrack,
  selectedVideoTrack,
  videoBitrate,
  onAudioTracksChange,
  isFullScreen,
  onTextTracksChange,
  onVideoTrackChange,
  onCancel,
  onTextTracksOff
}: SubtitlesModalProps) => {
  const { lock, unlock } = useLockSpatialNavigation();
  const isFirstRender = useIsFirstRender();

  // Locks the parent navigator when the modal is open and unlocks it when it's closed
  useEffect(() => {
    if (!isFirstRender) {
      if (isModalVisible) {
        lock();
      } else {
        unlock();
      }
    }
  }, [isModalVisible, lock, unlock, isFirstRender]);

 const _onCancel=()=>{
  console.log(' unlock();')
  unlock();
  onCancel()
 }

  return (
    <SpatialNavigationRoot>
      <GenericModal isVisible={isModalVisible}>
        <ActionSheet
          audioTracks={audioTracks}
          textTracks={textTracks}
          videoTracks={videoTracks}
          selectedTextTrack={selectedTextTrack}
          selectedAudioTrack={selectedAudioTrack}
          selectedVideoTrack={selectedVideoTrack}
          videoBitrate={videoBitrate}
          onAudioTracksChange={onAudioTracksChange}
          isFullScreen={isFullScreen}
          onTextTracksChange={onTextTracksChange}
          onVideoTrackChange={onVideoTrackChange}
          onCancel={_onCancel}
          onTextTracksOff={onTextTracksOff}
        />

      </GenericModal>
    </SpatialNavigationRoot>
  );
};