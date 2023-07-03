import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Platform } from "react-native";
import { RFPercentage} from "react-native-responsive-fontsize";

export const ImageIcon = ({name, size, style, color,solid}) => {
  return <Icon name={name} size={size} style={style} color={color} solid={solid?true:false} />;
};

export function normalize(size) {
  if(Platform.isTV){
    return RFPercentage(size);
  }else{
    return RFPercentage(size);
  }
 
}