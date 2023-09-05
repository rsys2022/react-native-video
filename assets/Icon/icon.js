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

export function checkArrayAndElements(array) {

  // Check if the array is empty

  if (array.length === 0) {
    return false;
  }
  // Check if specific object elements are empty strings or "undefined" up to the second index
  for (let i = 0; i < Math.min(2, array.length); i++) {
    const obj = array[i];
    if (obj.language === "" || obj.language === "und") {
      return false;
    }
  }
  return true;
}

export function filterAndRemoveDuplicates(arr, key) {
  const lookup = {};
  return arr.filter((obj) => {
    if (!lookup[obj[key]]) {
      lookup[obj[key]] = true;
      return true;
  }
    return false;
  });
}