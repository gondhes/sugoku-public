import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Dimensions, Image } from 'react-native'

const windowWidth = Dimensions.get('window').width

export default function Home({ navigation }) {
  const [username, setUsername] = useState('')

  function onPress(level) {
    if(username) {
      navigation.navigate('Game', {
        username,
        level
      })
    } else {
      alert('please input your name')
    }
  }

  return (
    <View style={ styles.container }>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <View style={ styles.form }>
        <TextInput
          onChangeText={ (text) => setUsername(text) }
          value={ username }
          placeholder="input your name here"
        ></TextInput>
      </View>
      
      <Text style={ styles.mode }> Game Level : </Text>
      <View style={ styles.button }>
        <Button onPress={ () => onPress('easy') } title="Easy"></Button>
        <Button onPress={ () => onPress('medium') } title="Medium"></Button>
        <Button onPress={ () => onPress('hard') } title="Hard"></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e3c6',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 250,
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  mode: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: (windowWidth - 40)/ 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 25
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 25,
    marginBottom: 25
  }
})