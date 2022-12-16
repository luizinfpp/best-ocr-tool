"use client";
import FilesContextProvider from "../contexts/filesContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import "./globals.css";

import {
  UfoSVG,
  StarSVG,
  MoonSVG,
  AlienSVG,
  Alien2SVG,
  AstronautSVG,
  Astronaut2SVG,
} from "../components/svgImages";

const GridBg = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 5vw);
  grid-template-rows: 1;
  opacity: 0.15;
  background-color: #e2eef6;

  * {
    padding: 1.2vw;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />
      <body>
        <div className="bg-[#e2eef6] absolute w-[100vw] h-[100vh] top-0 left-0 overflow-hidden">
          <GridBg
            className="w-[125vw] h-[100vh] fill-teal-700"
            initial={{ x: 0 }}
            animate={{ x: "-25vw" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {[...Array(12 * 25)].map((v, i) => {
              let offset = Math.round(i / 25);
              let l = (i % 5) + 2 * offset;
              let k = l % 5;

              if (k == 0) return <UfoSVG key={i} />;
              else if (k == 1) return <StarSVG key={i} />;
              else if (k == 2) return <MoonSVG key={i} />;
              else if (k == 3) return <Alien2SVG key={i} />;
              else if (k == 4) return <Astronaut2SVG key={i} />;
              // else if(i%7 == 5) return(<AstronautSVG key={i} />);
              // else if(i%7 == 6) return(<AlienSVG key={i} />);
            })}
          </GridBg>
        </div>
        <FilesContextProvider>
          <div className="z-10 absolute w-[100vw] h-[100vh]">{children}</div>
        </FilesContextProvider>
      </body>
    </html>
  );
}
