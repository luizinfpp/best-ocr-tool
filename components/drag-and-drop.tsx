"use client";
import { useState } from "react";

type DragDropProps = {
  nameList: Array<String>;
};

const DragAndDropComponent = ({ nameList }: DragDropProps) => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div
      className={`flex grow relative overflow-hidden justify-center items-center rounded-3xl border-teal-700 border-dashed border-2`}
      onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
    >
      {dragActive && <div
        className={`absolute bg-white/80 flex justify-center items-center`}
        style={{ width: "100%", height: "100%" }}
      >
        
          <p className="text-center text-xl text-gray-600 select-none">
            Solte a imagem aqui para adicionar
          </p>
      </div>}
      {nameList.length == 0 && (
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
      {nameList.length > 0 && (
        <div
          className="p-4 text-md text-gray-500 leading-loose select-none"
          style={{ width: "25vw", height: "100%" }}
        >
          {nameList.map((name, index) => {
            return (
              <div key={index} className="flex items-center my-1">
                <p className="select-none me-2">{name}</p>
                <span className="fill-gray-400 text-[0.9rem] hover:fill-teal-900 hover:cursor-pointer p-1 pb-2 text-center rounded-lg select-none flex items-center"
                  style={{width: 32, height: 32}}
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
