import { useContext } from "react";
import { FilesContext } from "../contexts/filesContext";

export const useFiles = () => {

  let l: any;
  const { files, dispatch} : any = useContext(FilesContext);

  const addFile = (name: string) : boolean => {

    return true;

  }

  
  return { addFile };

}
