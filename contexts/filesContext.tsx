import React, { createContext, useReducer} from 'react';
import { filesReducer } from '../reducers/filesReducer'

export const FilesContext = createContext({});

const FilesContextProvider = (props : any) => {

  const [files, dispatch] = useReducer(filesReducer, []);
    
  return (    
    <FilesContext.Provider value={{ files, dispatch}}>
      {props.children}
    </FilesContext.Provider>
  );
}
 
export default FilesContextProvider;