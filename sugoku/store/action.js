import axios from 'axios'

export function setBoard(payload) {
  return { type: 'board/setBoard', payload }
}
  
export function setBoardAsync(url) {
  return (dispatch) => {
    axios({
      method: 'GET',
      url
    })
      .then(({data}) => {
        dispatch(setBoard(data.board))
      })
      .catch(err => console.log(err))
  }
}
