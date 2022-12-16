"use client";
import React, { useState } from "react";
import { useFiles } from "../hooks/useFiles";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

type DragDropProps = {
  fileList: Array<File>;
  loading: number;
};

const Loader = styled.div`
  width: 32px;
  height: 32px;
  border: 5px solid rgb(15, 118, 110, 0.8); //teal-700
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const loaderVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 1 } },
};

const DragAndDropComponent = ({ fileList, loading }: DragDropProps) => {
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
      {/* Tela de carregamento enquanto o programa executa a tradução das imagens */}
      {loading > 0 && (
        <AnimatePresence mode="wait">
          <div
            className={`absolute bg-white/80 flex flex-col justify-center items-center z-10`}
            style={{ width: "100%", height: "100%" }}
          >
            {loading == 1 && (
              <motion.p variants={loaderVariants} initial="initial" animate="animate" exit="exit" className="text-center text-lg text-gray-600 select-none mb-4 p-3">
                Subindo imagens
              </motion.p>
            )}
            {loading == 2 && (
              <motion.p variants={loaderVariants} initial="initial" animate="animate" exit="exit" className="text-center text-lg text-gray-600 select-none mb-4 p-3">
                Realizando conversões
              </motion.p>
            )}
            {loading == 3 && (
              <motion.p variants={loaderVariants} initial="initial" animate="animate" exit="exit" className="text-center text-lg text-gray-600 select-none mb-4 p-3">
                Limpando espaço no servidor
              </motion.p>
            )}
            {loading == 4 && (
              <motion.p variants={loaderVariants} initial="initial" animate="animate" exit="exit" className="text-center text-lg text-gray-600 select-none mb-4 p-3">
                Pronto!
              </motion.p>
            )}
            <Loader></Loader>
          </div>
        </AnimatePresence>
      )}
      {fileList.length == 0 && (
        <div
          className="p-5 flex justify-center items-center"
          style={{ width: "25vw", height: "100%" }}
        >
          <p className="text-center text-md text-gray-700 leading-loose select-none">
            Arraste aqui a imagem para adicionar
            <br />
            <span className="text-sm">ou</span>
            <br />
            Clique para escolher o arquivo
            <br />
            <span className="text-sm">ou</span>
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
