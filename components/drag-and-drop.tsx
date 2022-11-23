"use client";
import { useState } from "react";

type DragDropProps = {
  nameList: Array<String>;
};

const DragAndDropComponent = ({ nameList }: DragDropProps) => {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div
      className={`flex grow relative overflow-hidden justify-center items-center p-9 rounded-3xl border-teal-700 border-dashed border-2`}
    >
      <div
        className={`absolute ${
          dragActive ? "bg-white/80" : ""
        } flex justify-center items-center`}
        style={{ width: "100%", height: "100%" }}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        {dragActive && (
          <p className="text-center text-xl text-gray-600 select-none">
            Solte a imagem aqui para adicionar
          </p>
        )}
      </div>
      {nameList.length == 0 && (
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
      )}
      {nameList.length > 0 && (
        <div className="text-center text-md text-gray-500 leading-loose select-none">
          {nameList.map((name, index) => {
            return (<p key={index}>{name}</p>);
          })}
        </div>
      )}
    </div>
  );
};

export default DragAndDropComponent;
