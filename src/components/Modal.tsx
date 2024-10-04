import classNames from "classnames";
import { resolve } from "path";
import { Children, useEffect, useState } from "react";
import Avatar from "./avatar";
export default function Modal({ children, isModalOpen, setIsModalOpen }: any) {
  const [modalOver, setModalOver] = useState<any>(
    "transition-all duration-500 p-4  fixed inset-0  bg-primary-black bg-opacity-0 hidden  justify-center items-center w-full h-dvh"
  );

  useEffect(() => {
    if (isModalOpen) {
      const opProm = () => {
        return new Promise((resolve) => {
          setModalOver((prev: any) => prev.replace("hidden", "flex"));
          resolve(true);
        });
      };
      opProm().then(() => {
        setModalOver((prev: any) =>
          prev.replace("bg-opacity-0", "bg-opacity-50")
        );
      });
    } else {
      setModalOver((prev: any) => prev.replace("flex", "hidden"));
      requestAnimationFrame(() => {
        setModalOver((prev: any) =>
          prev.replace("bg-opacity-50", "bg-opacity-0")
        );
      });
    }
  }, [isModalOpen]);
  return (
    <>
      <div className={modalOver}>
        <div className="relative w-full overflow-y-auto max-h-[85dvh] bg-[#111111]  rounded-[24px] overflow-hidden  ">
          <div className="p-[16px]">{children}</div>
          <div className="sticky w-full bottom-0 p-4 backdrop-blur-[8px] ">
            <button
              className="w-full p-4 tracking-widest bg-primary-white/10 text-white rounded-[12px] font-semibold text-[13px] uppercase"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
