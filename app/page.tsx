"use client"
import localFont from "@next/font/local";
import DragAndDropComponent from "../components/drag-and-drop";
import TextFieldComponent from "../components/text-field";
import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { ref, listAll } from "firebase/storage";
import storage from "../utils/firebase";

const myFont = localFont({ src: "../public/Comfortaa-VariableFont_wght.ttf" });

export default function Home() {

  const [textOcr, setTextOcr] = useState("");
  const [fileList, setFileList] = useState<Array<String>>([]);

  const filesToOCR = [];

  const worker = createWorker({
    errorHandler: (err) => console.error(err),
  });

  const DoOcr = async () => {
    await worker.load();
    await worker.loadLanguage("por");
    await worker.initialize("por");
    const {
      data: { text },
    } = await worker.recognize("https://firebasestorage.googleapis.com/v0/b/firstapp-229cf.appspot.com/o/OCR%20app%2FCapturar.PNG?alt=media&token=afde5e70-745c-410a-80ae-d60d10568779");
    setTextOcr(text);
    console.log(text);
    await worker.terminate();
  };

  const GetImages = () => {
    const OCRImagesRef = ref(storage, "OCR app");

    let names : Array<String> = [];
    
    listAll(OCRImagesRef).then((res) => {
      res.items.forEach((item) => {
        names.push(item.name);
      });
    }).then(() => {
      setFileList(names);
    });
    
  };

  useEffect(() => {
    GetImages();
    //DoOcr();
  }, []);

  return (
    <main
      className={myFont.className}
      style={{ backgroundColor: "#e2eef6", width: "100vw", height: "100vh" }}
    >
      <div
        className="p-2 flex justify-center items-center flex-col"
        style={{ width: "100%", height: "100%" }}
      >
        <h1 className="text-teal-700 text-5xl font-bold text-center my-12 select-none">
          O Melhor OCR da Galáxia
        </h1>
        <div className="flex gap-12 grow pb-14">
          <div className="flex flex-col">
            <div className="flex gap-2 mb-3">
              <span className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg select-none">
                Escolher Arquivo
              </span>
              <span className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg select-none">
                Colar imagem
              </span>
            </div>
            <DragAndDropComponent nameList={fileList}/>
          </div>
          <div>
            <TextFieldComponent text="" />
          </div>
        </div>
      </div>
    </main>
  );
}
