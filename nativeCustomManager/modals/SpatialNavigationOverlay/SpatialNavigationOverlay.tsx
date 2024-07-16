// import { SpatialNavigationRoot } from '../../../../../lib/src/spatial-navigation/components/Root';
import { SpatialNavigationRoot } from 'react-tv-space-navigation';
import { useLockOverlay } from './useLockOverlay';
import React from 'react';

type SpatialNavigationOverlayProps = {
  isModalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
};

export const SpatialNavigationOverlay = ({
  isModalVisible,
  hideModal,
  children,
}: SpatialNavigationOverlayProps) => {
  useLockOverlay({ isModalVisible, hideModal });

  return <SpatialNavigationRoot>{children}</SpatialNavigationRoot>;
};
