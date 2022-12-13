"use client";
import React, { useEffect, useState } from "react";
import { useFiles } from "../hooks/useFiles";

type DragDropProps = {
  fileList: Array<File>;
};

const DragAndDropComponent = ({ fileList }: DragDropProps) => {
  const [dragActive, setDragActive] = useState(false);

  const filesOp = useFiles();

  const AddDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (
      e.dataTransfer != null &&
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {
      for (let index = 0; index < e.dataTransfer.files.length; index++) {
        let nameSplit: string[] = e.dataTransfer.files[index].name.split(".");
        let acceptedFiles: string[] = ["bmp", "jpg", "png", "webp"];

        if (nameSplit.at(-1) != undefined) {
          // Tells typescript i am sure that is not undefined (because i tested before ok, use that carefully)
          let ext = nameSplit.at(-1)!.toLowerCase();
          if (acceptedFiles.includes(ext)) {
            filesOp.addFile(e.dataTransfer.files[index]);
          }
        }
      }
    }
  };

  const ActivateDrag = (e: React.DragEvent) => {
    let event = e as React.DragEvent;
    setDragActive(true);
    event.stopPropagation();
    event.preventDefault();
  };

  const DeactivateDrag = (e: React.DragEvent) => {
    let event = e as React.DragEvent;
    setDragActive(false);
    event.stopPropagation();
    event.preventDefault();
  };

  const DeleteFile = (file: File) => {
    filesOp.deleteFile(file);
  };

  return (
    <div
      className={`flex grow relative overflow-hidden justify-center items-center rounded-3xl border-teal-700 border-dashed border-2`}
      onDragOver={(e) => ActivateDrag(e)}
      onDrop={(event) => AddDropFile(event)}
    >
      {/* Div superior apenas para verificar qdo o objeto arrastado sai da área delimitada */}
      {dragActive && (
        <div
          className={`absolute bg-none z-20`}
          style={{ width: "100%", height: "100%" }}
          onDragLeave={(e) => DeactivateDrag(e)}
        ></div>
      )}
      {dragActive && (
        <div
          className={`absolute bg-white/80 flex justify-center items-center z-10`}
          style={{ width: "100%", height: "100%" }}
        >
          <p className="text-center text-xl text-gray-600 select-none">
            Solte a imagem aqui para adicionar
          </p>
        </div>
      )}
      {fileList.length == 0 && (
        <div
          className="p-5 flex justify-center items-center"
          style={{ width: "25vw", height: "100%" }}
        >
          <p className="text-center text-md text-gray-500 leading-loose select-none">
            Arraste aqui a imagem para adicionar
            <br />
            ou
            <br />
            Clique para escolher o arquivo
            <br />
            ou
            <br />
            Cole o arquivo de sua área de transferência
          </p>
        </div>
      )}
      {fileList.length > 0 && (
        <div
          className="p-4 text-md text-gray-500 leading-loose select-none"
          style={{ width: "25vw", height: "100%" }}
        >
          {fileList.map((file, index) => {
            return (
              <div key={index} className="flex items-center my-1">
                <p className="select-none me-2">{file.name}</p>
                <span
                  className="fill-gray-400 text-[0.9rem] hover:fill-teal-900 hover:cursor-pointer p-1 pb-2 text-center rounded-lg select-none flex items-center"
                  style={{ width: 32, height: 32 }}
                  onClick={() => DeleteFile(file)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="m12.45 38.35-2.8-2.8L21.2 24 9.65 12.45l2.8-2.8L24 21.2 35.55 9.65l2.8 2.8L26.8 24l11.55 11.55-2.8 2.8L24 26.8Z" />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DragAndDropComponent;
