import axios from 'axios'

// const url = 'https://sugoku.herokuapp.com/board?difficulty=easy'

export function setBoard(payload) {
  return { type: 'board/setBoard', payload }
}
  
export function setBoardAsync(url) {
  return (dispatch) => {
    axios({
      method: 'GET',
      url
    })
      .then(board => {
        dispatch(setBoard(board.data))
      })
      .catch(err => console.log(err))
  }
}