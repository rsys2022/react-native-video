import styled from '@emotion/native';
import React, { useEffect } from 'react';
import { View, ModalProps,BackHandler } from 'react-native';
import { SpatialNavigationOverlay } from './SpatialNavigationOverlay/SpatialNavigationOverlay';

type CustomModalProps = ModalProps & {
  isModalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  title: string;
};

export const Modal = ({ isModalVisible, hideModal, children, title }: CustomModalProps) => {
 
  if (!isModalVisible) return null;

  return (
    <StyledModal>
      {/* <ModalContentContainer> */}
        <SpatialNavigationOverlay isModalVisible={isModalVisible} hideModal={hideModal}>
          {children}
        </SpatialNavigationOverlay>
      {/* </ModalContentContainer> */}
    </StyledModal>
  );
};

const StyledModal = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalContentContainer = styled(View)({
  // minHeight: 200,
  // minWidth: 200,
  backgroundColor: 'gray',   //colors.background.main,
  // borderWidth: 2,
  // borderColor: '#111',   //colors.primary.light,
  // padding: 32,
  // margin: 16,
  // borderRadius: 16,
  justifyContent: 'center',
});
