import styled from "styled-components";

type StringProps = {
  text: string;
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

    &:hover{
      background-color: rgb(19 78 74); //teal-900
    }
  }
`;

const TextFieldComponent = ({ text }: StringProps) => {
  return (
    <div
      className="flex rounded-3xl overflow-hidden border-teal-700 border-2 w-[25rem] bg-gray-100 p-4"
      style={{ height: "100%" }}
    >
      <CustomScroll className="overflow-x-hidden overflow-y-auto w-[100%]">
        <div className="pr-3 w-[100%]">{text==""? "Seu texto aparecerá aqui.": text}</div>
        
      </CustomScroll>
    </div>
  );
};

export default TextFieldComponent;
