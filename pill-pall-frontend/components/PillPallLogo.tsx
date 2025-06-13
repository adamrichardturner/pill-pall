import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PillPallLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function PillPallLogo({ size = 'medium', showText = true }: PillPallLogoProps) {
  const logoSize = size === 'small' ? 60 : size === 'medium' ? 120 : 180;
  const textSize = size === 'small' ? 18 : size === 'medium' ? 32 : 48;

  return (
    <View style={styles.container}>
      <View style={[styles.pill, { width: logoSize, height: logoSize * 1.2 }]}>
        <View style={[styles.heart, { width: logoSize * 0.3, height: logoSize * 0.3 }]}>
          <Text style={[styles.heartText, { fontSize: logoSize * 0.15 }]}>♥</Text>
        </View>
      </View>
      {showText && <Text style={[styles.appName, { fontSize: textSize }]}>PillPall</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    backgroundColor: '#FF5555',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  heart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  appName: {
    color: '#8B4444',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
