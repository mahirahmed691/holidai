import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="log-out-outline" size={23} color="white" style={{ marginRight: 20 }} />
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;
