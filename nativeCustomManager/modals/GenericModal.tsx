import styled from '@emotion/native';
import React from 'react';
import { View, ModalProps,Text } from 'react-native';

type CustomModalProps = ModalProps & {
  isVisible: boolean;
  children: React.ReactNode;
};

export const GenericModal = ({ isVisible, children }: CustomModalProps) => {
  if (!isVisible) return null;

  return (
    <StyledModal>
        {children}
    </StyledModal>
  );
};

const StyledModal = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});