"use client"
import React, { createContext, useEffect, useReducer} from 'react';
import { filesReducer } from '../reducers/filesReducer'

export const FilesContext = createContext({ files: new Array<File>(), dispatch: new Function});

const FilesContextProvider = (props : any) => {

  const [files, dispatch] = useReducer(filesReducer, []);
   
  return (    
    <FilesContext.Provider value={{ files, dispatch }}>
      {props.children}
    </FilesContext.Provider>
  );
}
 
export default FilesContextProvider;