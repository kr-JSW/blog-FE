import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signStore } from "../store";
import style from "./management.module.css";

function Management({}) {
  const [userArr, setUserArr] = useState([]);

  const [allCodes, setCode] = useState([]);

  const [btnKey, setBtnKey] = useState(null);

  const [userGrade, setUserGrade] = useState(null);

  const [myName, setName] = useState(null);

  const [fun, setFun] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [copyText, setCopyText] = useState(false);

  let { userRole, username } = signStore();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/user/getuser`)
      .then((res) => {
        setUserArr(res.data.arr);
      });

    getCode();
  }, [refresh]);

  useEffect(() => {
    if (fun === 1) {
      clickHandler(1);
    } else if (fun === 2) {
      clickHandler(2);
    }
  }, [fun]);

  const clickHandler = (num) => {
    // num 1은 등급변경 2는 탈퇴
    if (num === 1 && myName !== null) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/user/grade`,
          {
            userGrade,
            myName,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast(res.data.answer);
          if (username === myName) {
            userRole(res.data.role);
          }
          setRefresh(!refresh);
        });
    } else if (num === 2) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_BACK_URL}/user/withdraw`, {
          data: {
            myName,
          },
        })
        .then((res) => {
          toast(res.data.answer);
          setRefresh(!refresh);
        });
    }
  };

  const codeGenerate = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/code/createCode`)
      .then((res) => toast(res.data.answer));
  };

  const getCode = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/code/getCode`)
      .then((res) => {
        setCode(res.data.allCode);
      });
  };

  const codeDel = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_URL}/code/delCode`, {
        data: { id },
      })
      .then((res) => {
        toast(res.data.answer);
        setRefresh(!refresh);
      });
  };

  useEffect(() => {
    if (copyText) {
      (async () => {
        await navigator.clipboard.writeText(copyText);
        alert("코드가 복사되었습니다.");
      })();
    }
  }, [copyText]);

  return (
    <div className="flex h-[100%] gap-[20px]">
      <div className="bg-violet-400 flex-1 rounded-[10px] p-[10px]">
        <div className="mb-[10px] font-semibold text-[17px]">유저 관리</div>
        <div className="flex flex-col gap-[10px] overflow-auto h-[350px]">
          {userArr.map((i, k) => {
            let { nickname, role } = i;
            return (
              <div
                key={k}
                className="flex justify-between p-[5px] border-b-[1px] shadow-lg "
              >
                <div className="flex gap-[10px]">
                  <span className="w-[100px]">{nickname}</span>
                  <span>{role}</span>
                </div>
                <div className="flex gap-[10px] relative">
                  <button
                    data-key={k}
                    className="rounded-[5px] text-white bg-gradient-to-r from-violet-800 to-fuchsia-700 px-[5px]"
                    onClick={(e) => {
                      if (btnKey !== Number(e.target.dataset.key)) {
                        setBtnKey(k);
                      } else {
                        setBtnKey(null);
                      }
                    }}
                  >
                    등급 변경
                  </button>
                  <button
                    onClick={() => {
                      setName(nickname);
                      setFun(2);
                    }}
                    className="rounded-[5px] text-white bg-gradient-to-r  from-indigo-800 to-fuchsia-700 px-[5px]"
                  >
                    탈퇴
                  </button>
                  {btnKey === k ? (
                    <div
                      className={`absolute overflow-hidden flex flex-col items-center justify-center top-[20px] w-[100px] h-[80px] bg-white rounded-[10px] z-[10]`}
                    >
                      <div
                        className="flex-1 bg-red-100 flex items-center w-[100%] justify-center cursor-pointer font-mono transition duration-[400ms] hover:bg-red-300"
                        onClick={() => {
                          setName(nickname);
                          setUserGrade("user");
                          setBtnKey(null);
                          setFun(1);
                        }}
                      >
                        User
                      </div>
                      <div
                        className="flex-1 bg-green-100 flex items-center w-[100%] justify-center cursor-pointer font-mono transition duration-[400ms] hover:bg-green-300"
                        onClick={() => {
                          setName(nickname);
                          setUserGrade("admin");
                          setBtnKey(null);
                          setFun(1);
                        }}
                      >
                        Admin
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" flex-1 flex flex-col gap-[20px] ">
        <section className="bg-violet-500 h-[35%] rounded-[10px] p-[10px] flex items-center justify-center">
          <button
            onClick={() => {
              setRefresh(!refresh);
              codeGenerate();
            }}
            className={style.codeBtn}
          >
            가입 코드 발급
          </button>
        </section>
        <section className="bg-violet-300 h-[65%] rounded-[10px] p-[10px] ">
          <div className="mb-[10px] font-semibold text-[17px]">
            가입 코드 관리
          </div>
          <div className="overflow-auto flex gap-[5px] flex-col h-[80%]">
            {allCodes.map((i, k) => {
              const { code, id } = i;

              return (
                <div key={k} className="">
                  <div className="flex ">
                    <span className="flex-[8] ">{code}</span>
                    <span className="flex gap-[5px] flex-[2]">
                      <button
                        onClick={() => setCopyText(code)}
                        className="flex-1 rounded-[5px] text-white bg-gradient-to-r from-violet-800 to-fuchsia-700 px-[5px]"
                      >
                        복사
                      </button>
                      <button
                        className="flex-1 rounded-[5px] text-white bg-gradient-to-r from-violet-800 to-fuchsia-700 px-[5px]"
                        onClick={() => codeDel(id)}
                      >
                        삭제
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Management;
