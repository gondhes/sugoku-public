const initialState = {
    board: []
  }
  
  function reducer(state = initialState, action) {
    const { type, payload } = action
    if(type === 'board/setBoard') {
        return { ...state, board: payload }
    } 
    return state
  }
  
  export default reducer