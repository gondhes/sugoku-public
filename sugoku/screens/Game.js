import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, TextInput, Button, Image } from "react-native";

import { useDispatch, useSelector } from 'react-redux'
import { setBoard, setBoardAsync } from '../store/action'

const windowWidth = Dimensions.get('window').width

export default function Game(props) {

  const { username, level } = props.route.params
  const baseUrl = 'https://sugoku.herokuapp.com/'
  const url = `${baseUrl}board?difficulty=${level}`
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBoardAsync(url))
  }, [])

  const changeBoard = (text, rowIndex, colIndex) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[rowIndex][colIndex] = +text
    dispatch(setBoard(newBoard))
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  const solve = () => {
    const answer = { board: board }
    
    fetch(`https://sugoku.herokuapp.com/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(answer)
    })
      .then(response => response.json())
      .then(result => {
        dispatch(setBoard(result.solution))
        alert(`Come on, you can do better than this!`)
      })
      .catch(console.log)
  }

  const validate = () => {
    const answer = { board: board }

    fetch(`https://sugoku.herokuapp.com/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(answer)
    })
      .then(response => response.json())
      .then(result => {
        result.status === 'solved' ? props.navigation.replace('Finish', { username }) : alert(`Try resolving the sugoku again!`)
      })
      .catch(console.log)
  }

  return (
      <View style={ styles.container }>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <View style={ styles.level }>
          <Text style={ styles.bold }>{ `Name: ${username}` }</Text>
          <Text style={ styles.bold }>{ `Level: ${level}` }</Text>
        </View>
        { 
          board.map((row, rowIndex) => {
            return (
              <View style={ styles.row } key={ rowIndex }>
                {
                  row.map((col, colIndex) => {
                    return (
                      <TextInput
                        key= { colIndex }
                        style= { styles.col }
                        maxLength= { 1 }
                        keyboardType= 'numeric'
                        // editable={board[rowIndex][colIndex] === 0 ? true : false}
                        textAlign= 'center'
                        value={col === 0 ? "" : String(col)}
                        onChangeText={ (value) => changeBoard(value, rowIndex, colIndex) }
                      />
                    );
                  })
                }
              </View>
            );
          }) 
        }
        <View style={ styles.button }>
          <Button title='SOLVE' onPress={solve}/>
          <Button title='VALIDATE' onPress={validate}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e3c6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col: {
    width: (windowWidth - 40) / 9,
    height: (windowWidth - 40) / 9,
    borderWidth: 1,
    borderColor: '#fff',
    fontSize: 25
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5
  },
  level: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: (windowWidth - 20),
  },
  bold: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: (windowWidth - 40)/ 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 25
  }
});
