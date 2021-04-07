import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function Lose(props) {

  return (
    <View style={styles.container}>
      <Text style={ styles.header } >You can do better!</Text>
      <Image style={styles.image} source={require('../assets/fail.png')} />
      <Text> </Text>
      <View style={styles.button}>
        <Button
          title="Play Again"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e3c6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 25,
    marginBottom: 25
  }
})
