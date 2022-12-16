import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type StringProps = {
  text: string;
};

const divVariants = {
  initial: { left: "-150%" },
  animate: {
    left: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    left: "150%",
    transition: {
      duration: 0.3,
    },
  },
};

const CustomScroll = styled.div`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: lightgray;
    border-radius: 100vw;
    margin-block: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(15 118 110); //teal-700
    border-radius: 100vw;
    //border: 0.2rem solid lightgray; - to make space between track and thumb

    &:hover {
      background-color: rgb(19 78 74); //teal-900
    }
  }
`;

const TextFieldComponent = ({ text }: StringProps) => {
  const [copied, setCopied] = useState(false);

  async function handleCopyFileBtnClick() {
    try {
      const permission: any = navigator.permissions.query({
        name: "clipboard-write" as PermissionName,
      });
      if (permission.state === "denied") {
        throw new Error(
          "O navegador não tem permissão para modificar a área de transferência."
        );
      }

      await navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    } catch (error: any) {
      alert(error.name + ": " + error.message);
    }
  }

  return (
    <div
      className="flex flex-col justify-between rounded-3xl overflow-hidden border-teal-700 border-2 w-[25rem] bg-gray-100 p-4"
      style={{ height: "100%" }}
    >
      <CustomScroll className="overflow-x-hidden overflow-y-auto w-[100%] flex-grow-1 mt-1 mb-3">
        <div className="pr-3 w-[100%]">
          {text == "" ? "Seu texto aparecerá aqui." : text}
        </div>
      </CustomScroll>
      {text != "" && (
        <span
          className="w-[180px] place-self-end relative overflow-hidden bg-teal-700 text-white text-[0.9rem] hover:bg-teal-900 hover:cursor-pointer px-3 py-2 text-center rounded-lg select-none"
          onClick={handleCopyFileBtnClick}
        >
          Copiar texto
          <AnimatePresence mode="wait">
            {copied && (
              <motion.div
                variants={divVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key={"textAnimation"}
                className="absolute w-[100%] h-[100%] bg-emerald-200 top-0 left-0 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="fill-teal-700 h-[90%]"
                >
                  <path d="M18.9 35.95q-.45 0-.875-.175t-.775-.525L8.2 26.2q-.7-.7-.7-1.7t.7-1.7q.7-.7 1.675-.7.975 0 1.725.7l7.3 7.3 17.5-17.45q.7-.7 1.675-.725.975-.025 1.675.725.7.7.7 1.7t-.7 1.7l-19.2 19.2q-.35.35-.775.525-.425.175-.875.175Z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      )}
    </div>
  );
};

export default TextFieldComponent;
