import Image from "next/image";
import localFont from "@next/font/local";
import DragAndDropComponent from "../components/drag-and-drop";

const myFont = localFont({ src: "../public/Comfortaa-VariableFont_wght.ttf" });

export default function Home() {
  return (
    <main
      className={myFont.className}
      style={{ backgroundColor: "#e2eef6", width: "100vw", height: "100vh" }}
    >
      <div
        className="p-2 flex justify-center items-center flex-col"
        style={{ width: "100%", height: "100%" }}
      >
        <h1 className="text-teal-700 text-5xl font-bold text-center mb-10">
          O Melhor OCR da Galáxia
        </h1>
        <div >
          <div className="flex gap-2 mb-3">
            <span className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg">
              Escolher Arquivo
            </span>
            <span className="bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg">
              Colar imagem
            </span>
          </div>
          <DragAndDropComponent />
        </div>
      </div>
    </main>
  );
}
