"use client";
import { useState, useEffect } from "react";
import { createWorker } from 'tesseract.js';

const DragAndDropComponent = () => {
  const [dragActive, setDragActive] = useState(false);
  const [textOcr, setTextOcr] = useState("Example");

  const worker = createWorker({
    errorHandler: err => console.error(err)
  });

  const DoOcr = async () => {
    await worker.load();
    await worker.loadLanguage('por');
    await worker.initialize('por');
    const { data: { text } } = await worker.recognize('Capturar.PNG');
    setTextOcr(text);
    await worker.terminate();
  };

  useEffect(() => {
    DoOcr();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex relative overflow-hidden justify-center items-center p-9 rounded-3xl border-teal-700 border-dashed border-2`}
    >
      <div
        className={`absolute ${dragActive ? "bg-white/80" : ""} flex justify-center items-center`}
        style={{ width: "100%", height: "100%" }}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        {dragActive && (
          <p className="text-center text-xl text-gray-600">
            Solte a imagem aqui para adicionar
          </p>
        )}
      </div>
      <p className="text-center text-md text-gray-500 leading-loose">
        Arraste aqui a imagem para adicionar
        <br />
        ou
        <br />
        Clique para escolher o arquivo
        <br />
        ou
        <br />
        Cole o arquivo de sua área de transferência {textOcr}
      </p>
    </div>
  );
};

export default DragAndDropComponent;
