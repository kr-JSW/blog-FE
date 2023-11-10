import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signStore } from "../store";

function Myrole({ photo, name }) {
  const { role, username } = signStore();

  const [pwdEdit, setPwdEdit] = useState(null);

  const clickHandler = () => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_BACK_URL}/user/editpwd`, {
        pwd: pwdEdit,
        nickname: username,
      })
      .then((res) => toast(res.data.answer));
  };

  return (
    <div>
      <h2 className=" font-[600] text-lg mb-[10px]">
        내 등급 확인 및 패스워드 변경
      </h2>
      <p className="mb-[30px] text-[12px] text-slate-600">
        패스워드는 변경 할 수 있으나, 등급 변경은 관리자에게 문의바랍니다.
      </p>
      <table className=" border-collapse w-[100%]">
        <tbody>
          <tr>
            <td className=" border w-[30%] h-[200px] border-slate-500 border-l-transparent font-bold text-[15px]">
              내 정보
            </td>
            <td className=" border w-[70%] border-slate-500 border-r-transparent relative  ">
              <tr className=" w-[100%] flex absolute top-0 h-[30px] items-center">
                <td className=" border flex justify-center flex-[1] border-slate-500 border-t-transparent border-l-transparent">
                  내 등급
                </td>
                <td className=" border flex justify-center flex-[1]  border-slate-500 border-r-transparent border-t-transparent border-l-transparent">
                  패스워드 변경
                </td>
              </tr>
              <tr className=" w-[100%] flex  h-[170px] bottom-0 absolute">
                <td className=" border flex justify-center flex-[1] border-slate-500 border-t-transparent border-l-transparent border-b-transparent">
                  <p className="flex items-center justify-center">
                    <strong>{username}</strong>님은&nbsp;
                    <strong> {role}</strong>등급 입니다.
                  </p>
                </td>
                <td className=" border flex items-center justify-center flex-[1]  border-slate-500 border-r-transparent border-t-transparent border-l-transparent border-b-transparent">
                  <input
                    type="password"
                    placeholder="변경할 패스워드를 입력하세요."
                    onChange={(e) => setPwdEdit(e.target.value)}
                    className="outline-none h-[30px] border w-[90%] pl-[10px]"
                  />
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td
              colSpan="2"
              className=" border w-[30%] h-[100px] border-slate-500 border-l-transparent border-r-transparent"
            >
              <button
                onClick={() => {
                  clickHandler();
                }}
                className="cursor-pointer flex items-center justify-center bg-blue-500 text-white p-[5px] h-[50px] rounded-[10px] hover:bg-blue-600 m-auto"
              >
                패스워드 변경
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Myrole;
