import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.introLine}>Pair ~ A ~ Dice Tumblers</Text>
      <Text style={styles.headLine}>Lyric Mate Song List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headLine: {
    fontSize: 30,
  },
  introLine: {
    fontSize: 18,
  },
});
