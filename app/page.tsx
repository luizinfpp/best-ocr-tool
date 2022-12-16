"use client";
import localFont from "@next/font/local";
import DragAndDropComponent from "../components/drag-and-drop";
import TextFieldComponent from "../components/text-field";
import ButtonSendWithLoading from "../components/btn-send-loading";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { FilesContext } from "../contexts/filesContext";
import { createWorker } from "tesseract.js";
import { useFiles } from "../hooks/useFiles";
import { useStorage } from "../hooks/useStorage";


const myFont = localFont({ src: "../public/Comfortaa-VariableFont_wght.ttf" });

export default function Home() {
  const [textOcr, setTextOcr] = useState("");
  const [loading, setLoading] = useState(0);

  const { files }: { files: Array<File> } = useContext(FilesContext);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const pasteFileRef = useRef<HTMLDivElement>(null);
  const filesOp = useFiles();
  const storageOp = useStorage();

  const worker = createWorker({
    errorHandler: (err) => console.error(err),
  });

  

  const DoOcr = async () => {
    let urlList: string[] = [];

    await worker.load();
    await worker.loadLanguage("por");
    await worker.initialize("por");

    let entireText: string = "";

    const doFilesOCR = new Promise<void>((resolve, reject) => {
      setLoading(1);
      storageOp.uploadFiles(urlList);
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    doFilesOCR.then(() => {
      setLoading(2);
      //Cria uma promise para interpretar cada link -- na ordem da string
      let requests = urlList.reduce((promiseChain, url) => {
        return promiseChain.then(
          () =>
            new Promise<void>((resolve) => {
              worker.recognize(url).then((res) => {
                if (entireText == "") entireText += res.data.text;
                else
                  entireText = `${entireText}
                ${res.data.text}`;
                resolve();
              });
            })
        );
      }, Promise.resolve());

      //Ao fim da execução
      requests
        .then(() => {
          worker.terminate().then(() => {
            setLoading(3);
            setTextOcr(entireText);
            storageOp.deleteFiles();
          });
        })
        .then(() => {
          setLoading(4);
        }).then(() => {
          setTimeout(() => {
            setLoading(0);
          }, 4000);
        });
    });
  };

  const handleInputFileBtnClick = () => {
    if (inputFileRef.current != null) inputFileRef.current.click();
  };

  const handleInputFileChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files != null) {
      filesOp.addFile(e.currentTarget.files[0]);
    }
  };

  async function handlePasteFileBtnClick() {
    try {
      const permission: any = navigator.permissions.query({
        name: "clipboard-read" as PermissionName,
      });
      if (permission.state === "denied") {
        throw new Error(
          "O navegador não tem permissão para a leitura da área de transferência."
        );
      }

      await navigator.clipboard.read().then((clipboardContents) => {
        for (const item of clipboardContents) {
          if (
            !item.types.filter(
              (t) =>
                t.includes("image/png") ||
                t.includes("image/jpg") ||
                t.includes("image/bmp") ||
                t.includes("image/webp")
            )
          ) {
            throw new Error(
              "O conteúdo da área de transferência não é do tipo imagem."
            );
          }

          item.getType("image/png").then((dropBlob) => {
            let d: Date = new Date(Date.now());
            let fileName: string =
              "Clipboard_image_" +
              d.getHours() +
              d.getMinutes() +
              d.getSeconds() +
              d.getMilliseconds() +
              ".png";

            let f: File = new File([dropBlob], fileName, {
              type: item.types.filter(
                (t) =>
                  t.includes("image/png") ||
                  t.includes("image/jpg") ||
                  t.includes("image/bmp") ||
                  t.includes("image/webp")
              )[0],
            });

            filesOp.addFile(f);
          });
        }
      });
    } catch (error: any) {
      if ((error.name = "DataError"))
        alert(
          error.name +
            ": O conteúdo da área de transferência é inválido. (Use um instantâneo. Se estiver tentando colar um arquivo já pronto, tente a funcionalidade de arrastar para a área pontilhada.)"
        );
      else alert(error.name + ": " + error.message);
    }
  }

  return (
    <main
      className={myFont.className}
      style={{ background: "none", width: "100vw", height: "100vh" }}
    >
      <div
        className="p-2 flex justify-center items-center flex-col"
        style={{ width: "100%", height: "100%" }}
      >
        <h1 className="text-teal-700 text-5xl font-bold text-center my-12 select-none">
          O Melhor OCR da Galáxia
        </h1>
        <div className="flex gap-12 grow pb-14 max-h-[80vh]">
          <div className="flex flex-col">
            <div className="flex gap-2 mb-3">
              <input
                type="file"
                name="fileUploader"
                style={{ display: "none" }}
                ref={inputFileRef}
                accept=".jpg, .png, .bmp, .webp"
                onChange={handleInputFileChange}
              />
              <span
                className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg select-none"
                onClick={handleInputFileBtnClick}
              >
                Escolher Arquivo
              </span>
              <span
                className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg select-none"
                onClick={handlePasteFileBtnClick}
                ref={pasteFileRef}
              >
                Colar imagem
              </span>
            </div>
            <DragAndDropComponent fileList={files} loading={loading}/>
            <ButtonSendWithLoading loading={loading} DoOcr={DoOcr}/>
          </div>
          <div>
            <TextFieldComponent text={textOcr} />
          </div>
        </div>
      </div>
    </main>
  );
}
