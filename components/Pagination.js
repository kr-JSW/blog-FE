import React from "react";
import { useRouter } from "next/router";

function Pagination({ totalDataEach, pageDataEach, currentPage, category }) {
  const router = useRouter();

  let totalPage = Math.ceil(totalDataEach / pageDataEach);
  let pageCount = 5;

  let pageGroup = Math.ceil(currentPage / pageCount);

  //페이지 그룹 내에서의 마지막 번호
  let lastNumber = pageGroup * pageCount;
  if (lastNumber > totalPage) {
    lastNumber = totalPage;
  }

  let firstNumber = pageGroup * pageCount - (pageCount - 1);

  let pageArr = new Array(totalPage).fill().map((i, key) => (i = key + 1));

  //pageGroup가 총 몇개인지?
  let totalPageGroup = Math.ceil(totalPage / pageCount);

  let lastPageGroup = totalPageGroup;

  let firstPageGroup = 1;

  return (
    <div className="flex gap-[20px] justify-center items-center mb-[50px]">
      <div
        onClick={() => {
          if (pageGroup !== firstPageGroup) {
            router.push(`${category}?page=${firstNumber - 1}`);
          }
        }}
        className="rounded-[8px] w-[50px] flex justify-center bg-zinc-400 font-mono cursor-pointer"
      >
        prev
      </div>
      {pageArr.map((i, key) => {
        if (key + 1 >= firstNumber && key + 1 <= lastNumber) {
          return (
            <div
              key={key}
              className="rounded-[8px] w-[40px] flex justify-center bg-zinc-300 font-serif cursor-pointer"
              onClick={() => router.push(`${category}?page=${i}`)}
            >
              <div
                className={`${
                  currentPage === i ? "text-indigo-800 font-[600]" : null
                }`}
              >
                {i}
              </div>
            </div>
          );
        }
      })}
      <div
        className="rounded-[8px] w-[50px] flex justify-center bg-zinc-400 font-mono cursor-pointer"
        onClick={() => {
          if (pageGroup !== lastPageGroup) {
            router.push(`${category}?page=${lastNumber + 1}`);
          }
        }}
      >
        next
      </div>
    </div>
  );
}

export default Pagination;
