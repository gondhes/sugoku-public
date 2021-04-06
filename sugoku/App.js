import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Dimensions, View, Text, TextInput, Button } from "react-native";

const windowWidth = Dimensions.get('window').width

export default function App() {

  const [board, setBoard] = useState([])

  useEffect(() => {
    axios({
      url: 'https://sugoku.herokuapp.com/board?difficulty=easy',
      method: 'GET'
    })
      .then(({ data }) => {
        setBoard(data.board)
      })
      .catch(err => console.log(err))
  }, [])

  const changeBoard = (value, rowIndex, colIndex) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[rowIndex][colIndex] = value
    setBoard(newBoard)
  };

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
      <Button title='VALIDATE'/>
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
