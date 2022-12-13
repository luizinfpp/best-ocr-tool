import { useContext } from "react";
import { FilesContext } from "../contexts/filesContext";

type FileContextType = {
  files: Array<File>,
  dispatch: Function
};

export const useFiles = () => {

  const { files, dispatch } : FileContextType = useContext(FilesContext);

  const addFile = (file: File) : boolean => {

    dispatch({type: 'ADD_FILE', file: file});
    return true;

  }

  const deleteFile = (file: File) : boolean => {

    dispatch({type: 'DELETE_FILE', file: file});
    return true;

  }

  
  return { addFile, deleteFile };

}
