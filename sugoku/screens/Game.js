import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, TextInput, Button } from "react-native";

const windowWidth = Dimensions.get('window').width
const url = 'https://sugoku.herokuapp.com/board?difficulty=easy'

export default function Game() {

  const [board, setBoard] = useState([])

  useEffect(() => {
    axios({
      url,
      method: 'GET'
    })
      .then(({ data }) => {
        setBoard(data.board)
      })
      .catch(err => console.log(err))
  }, [])

  const changeBoard = (text, rowIndex, colIndex) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[rowIndex][colIndex] = +text
    setBoard(newBoard)
  }

  const validate = () => {
    const answer = { board: board }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
    const encodeParams = (params) =>
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&')
    
    axios({
      url: 'https://sugoku.herokuapp.com/validate',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeParams(answer)
    })
      .then(({ data }) => {
        alert(data.status)
      })
      .catch(err => console.log(err))
  }

  return (
      <View style={ styles.container }>
        <Text style={ styles.header }> SUGOKU </Text>
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
        <Button title='VALIDATE' onPress={validate}/>
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
  }
});
