export const filesReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_FILES': 
      return [...action.files];
    default:
      return state;
  }
}