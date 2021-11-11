import React from 'react';
import { COLORS } from '../../Theme/COLORS'
import { Feather } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { styles } from './styles';

export function Search(){
  return (
    <View style={styles.container}>
        <View style={styles.containerInput}>
            <TextInput
                style={styles.textInput}
                placeholder="Procure sua favorita"
                placeholderTextColor={COLORS.textColor}
            />
        </View>
        <View style={styles.containerIcon}>
            <TouchableOpacity>
            <Feather name="search" size={30} color={COLORS.red50} />
            </TouchableOpacity>
        </View>
    </View>
  );
}