import React, { useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

function Slide({ children, itemNum }) {
  const [child, setChild] = useState(
    children.length === undefined ? [children] : children
  );

  const nextHandle = () => {
    //children은 읽기전용이라 수정 할 수 없다. 그렇기에 slice와 concat를 이용해서 수정이 아닌 새 배열을 리턴시켰음.
    let arr = child;
    let sliceArrFirst = arr.slice(0, 1);
    let sliceArrRemain = arr.slice(1, arr.length);

    setChild(sliceArrRemain.concat(sliceArrFirst));
  };

  const prevHandle = () => {
    let arr = child;
    let sliceArrLast = arr.slice(-1);
    let sliceArrRemain = arr.slice(0, -1);

    setChild(sliceArrLast.concat(sliceArrRemain));
  };

  return (
    <div className="flex flex-col items-center">
      <section className="flex items-center self-start">
        {child.map((item, idx) => {
          const { title, des, sou } = item.props.value;

          return (
            <div
              key={idx}
              className={`relative rounded-[10px] bg-center ease-in duration-300  ${
                idx === 0 ? `w-[300px] h-[400px]` : `w-[200px] h-[300px]`
              }
              `}
              style={{
                backgroundImage: `url(${sou})`,
                left: `calc(${idx}*50px)`,
              }}
            >
              {idx === 0 ? (
                <div className="absolute left-[-150%] top-[10%]  w-[400px]">
                  <div className="text-[43px] font-['강부장님체']">{title}</div>
                  <div className="text-[23px] font-['강부장님체']">{des}</div>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>

      <section className="flex w-[100px] justify-between self-start ml-[100px] mt-4">
        <span className="w-[30px] h-[30px] rounded-[10px] bg-slate-200 flex items-center justify-center">
          <FcPrevious onClick={prevHandle} className="cursor-pointer" />
        </span>
        <span className="w-[30px] h-[30px] rounded-[10px] bg-slate-200 flex items-center justify-center">
          <FcNext onClick={nextHandle} className="cursor-pointer" />
        </span>
      </section>
    </div>
  );
}

export default Slide;
