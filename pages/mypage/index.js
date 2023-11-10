import React, { useEffect, useState } from "react";
import axios from "axios";
import { signStore } from "../../store";
import Myprofile from "../../components/Myprofile";
import Myrole from "../../components/Myrole";
import Management from "../../components/Management";
import Category from "../../components/Category";

function mypage({}) {
  const { username, photo, role } = signStore();
  const [smallMemu, setSmallMemu] = useState(1);

  return (
    <div>
      <section className="h-[50px] w-[100%] border-b-[1px] border-b-slate-300 flex items-center">
        <span className="flex ml-[20%] gap-[50px] font-bold text-sm">
          <span
            className={`${
              smallMemu === 1 ? "border-b-violet-700 text-violet-700" : null
            } cursor-pointer leading-[50px] border-b-[3px] border-b-transparent hover:border-b-violet-700 hover:text-violet-700 `}
            onClick={() => setSmallMemu(1)}
          >
            내 프로필 사진
          </span>
          <span
            className={`${
              smallMemu === 2 ? "border-b-violet-700 text-violet-700" : null
            } cursor-pointer leading-[50px] border-b-[3px] border-b-transparent hover:border-b-violet-700 hover:text-violet-700 `}
            onClick={() => setSmallMemu(2)}
          >
            내 등급 확인 및 패스워드 변경
          </span>
          <span
            className={` ${
              smallMemu === 3 ? "border-b-violet-700 text-violet-700" : null
            }
            ${role === "admin" ? null : "hidden"}
             cursor-pointer leading-[50px] border-b-[3px] border-b-transparent hover:border-b-violet-700 hover:text-violet-700 `}
            onClick={() => setSmallMemu(3)}
          >
            유저 관리 및 가입코드 관리(관리자 권한)
          </span>
          <span
            className={` ${
              smallMemu === 4 ? "border-b-violet-700 text-violet-700" : null
            }
            ${role === "admin" ? null : "hidden"}
             cursor-pointer leading-[50px] border-b-[3px] border-b-transparent hover:border-b-violet-700 hover:text-violet-700 `}
            onClick={() => setSmallMemu(4)}
          >
            카테고리 생성 및 삭제(관리자 권한)
          </span>
        </span>
      </section>
      <section className="h-[calc(100vh-100px)] flex">
        <div className="w-[80vw] h-[70vh] m-[auto]">
          {smallMemu === 1 ? <Myprofile photo={photo} name={username} /> : null}
          {smallMemu === 2 ? <Myrole /> : null}
          {smallMemu === 3 ? <Management /> : null}
          {smallMemu === 4 ? <Category /> : null}
        </div>
      </section>
    </div>
  );
}

export default mypage;

export async function getServerSideProps(context) {
  let cookies = context.req.headers.cookie;
  cookies = cookies.split(";");

  let token;

  cookies.map((i) => {
    if (i.includes("loginToken")) {
      token = i.replace("loginToken=", "").replace(" ", "");
    }
  });

  let role;
  if (token === "") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await axios
    .post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/user/mypage`,
      { token },
      {
        headers: {
          Origin: process.env.NEXT_PUBLIC_FRONT_HOST,
        },
      }
    )
    .then((res) => {
      role = res.data;
    });

  return {
    props: { role },
  };
}
