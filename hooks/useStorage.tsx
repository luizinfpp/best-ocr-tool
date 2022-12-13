import { useContext } from "react";
import { FilesContext } from "../contexts/filesContext";
import storage from "../utils/firebase";
import {
  ref,
  listAll,
  uploadBytes,
  StorageReference,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { error } from "console";

type FileContextType = {
  files: Array<File>;
  dispatch: Function;
};

export const useStorage = () => {
  const { files, dispatch }: FileContextType = useContext(FilesContext);

  const deleteFiles = () => {
    let OCRFolderRef: StorageReference = ref(storage, `OCR app`);

    listAll(OCRFolderRef)
      .then((res) => {
        res.items.forEach((item) => {
          deleteObject(item);
        });
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    return true;
  };

  const uploadFiles = (filesURL : string[]) : void => {
    
    let requests = files.map((file) => {
      //para cada arquivo retorna uma promise que fará o upload
      return new Promise((resolve) => {
        let OCRImageRef: StorageReference = ref(storage, `OCR app/${file.name}`);

      uploadBytes(OCRImageRef, file)
        .then((res) => {
          getDownloadURL(res.ref).then((url) => {
            filesURL.push(url);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      });
  })

  //processa todas as promises -- não necessariamente em ordem  
  Promise.all(requests);

  };

  return { deleteFiles, uploadFiles };
};
