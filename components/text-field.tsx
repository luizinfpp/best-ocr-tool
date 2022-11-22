"use client";
import { useState } from "react";

type StringProps = {
  text: string;
};

const TextFieldComponent = ({ text }: StringProps) => {
  return (
    <div className="flex rounded-3xl overflow-hidden border-teal-700 border-2 w-[25rem] h-[28rem] bg-gray-100 p-4">
      <div>{text == "" ?  "Seu texto aparecerá aqui." : text}</div>
    </div>
  );
};

export default TextFieldComponent;