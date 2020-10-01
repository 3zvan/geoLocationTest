import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { startWatchingGeolocation, getLocationInfo } from './watchGeolocation';

const App = () => {
  const [location, setLocation] = useState('');
  const [latDelta, setLatDelta] = useState(0);
  const [longDelta, setLongDelta] = useState(0);
  startWatchingGeolocation(location, setLocation, setLatDelta, setLongDelta);

  const handleClick = () => {
    getLocationInfo();
  }

  return (
    <View style={styles.container}>
      <Text style={longDelta > 0 ? styles.greenText : longDelta < 0 ? styles.redText : styles.blackText}>Long: {location.longitude}</Text>
      <Text style={latDelta > 0 ? styles.greenText : latDelta < 0 ? styles.redText : styles.blackText}>Lat: {location.latitude}</Text>
      <Button title='Show my location!' onPress={handleClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackText: {
    color: 'black',
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  }
});

export default App;