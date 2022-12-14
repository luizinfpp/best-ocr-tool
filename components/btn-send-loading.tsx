import styled from "styled-components";

type ButtonSendWithLoadingProps = {
  loading: number;
  DoOcr: Function;
};

const stripesSize = "65px";

  const StripedBtn = styled.div`
    @keyframes animateStripes {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-65px);
      }
    }

    /* cores emerald-200 e sky-300 */
    background: repeating-linear-gradient(
      45deg,
      rgb(167 243 208) 25%,
      rgb(167 243 208) 50%,
      rgb(125 211 252) 50%,
      rgb(125 211 252) 75%
    );
    background-size: ${stripesSize} ${stripesSize};
    position: absolute;
    width: calc(100% + ${stripesSize});
    height: 100%;
    top: 0;
    left: 0;
    animation: animateStripes 2s linear infinite;
  `;

const ButtonSendWithLoading = ({
  loading,
  DoOcr,
}: ButtonSendWithLoadingProps) => {
  

  return (
    <>
      {loading == 0 && (
        <span
          className={`bg-teal-700 text-white hover:bg-teal-900 text-[0.9rem] hover:cursor-pointer px-3 py-3 text-center rounded-lg select-none mt-3 font-bold text-lg`}
          onClick={() => {
            if (loading == 0) DoOcr();
          }}
        >
          {loading > 0 ? "Carregando" : "Converter em texto"}
        </span>
      )}
      {loading > 0 && (
        <div
          className={`text-teal-700 overflow-hidden text-[0.9rem] px-3 py-3 text-center rounded-lg select-none mt-3 font-bold text-lg relative`}
        >
          {/* Apenas para manter o tamanho da div */}
          Carregando
          <StripedBtn className="z-0"></StripedBtn>
          <div className="absolute z-10 w-[100%] h-[100%] top-0 left-0 flex justify-center items-center">
            <div>Carregando</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonSendWithLoading;
