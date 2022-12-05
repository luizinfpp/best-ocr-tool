type Action =
  | { type: "GET_FILES" }
  | { type: "SET_FILES"; files: Array<File> }
  | { type: "CLEAR_FILES"}
  | { type: "ADD_FILE"; file: File }
  | { type: "DELETE_FILE"; file: File };

export const filesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FILES":
      return [...action.files];
    case "ADD_FILE":
      return [...state, action.file];
    case "CLEAR_FILES":
      return [];
    case "DELETE_FILE":
      return state.filter((file : File) => file !== action.file);
    default:
      return state;
  }
};
