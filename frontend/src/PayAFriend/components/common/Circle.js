import React from 'react';
import { View, StyleSheet } from 'react-native';

const Circle = ({children}) => {
    return (
      <View style={styles.circle}>
        {children}
      </View>
    );
  };

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#E0E0E0', // Base color
    borderWidth: 10,
    borderColor: '#D0D0D0', // A slightly darker shade for the "gradient" effect
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C0C0C0', // Even darker shade for the "gradient" effect
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 150,
  },
});

export default Circle;
