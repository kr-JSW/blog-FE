import React, { useState, useRef, useEffect } from "react";
import style from "./topnav.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { signStore } from "../store";

function SigninModal({ modal, setSigninModal }) {
  const modalRef = useRef();
  const [signinForm, setSigninForm] = useState({ name: "", pwd: "" });

  const { name, pwd } = signinForm;

  const { userSet } = signStore();

  const changeHandler = (val, e) => {
    setSigninForm({ ...signinForm, [val]: e.target.value });
  };

  useEffect(() => {
    const closeModal = () => setSigninModal(!modal);

    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    window.addEventListener("mousedown", (e) => handleClick(e));

    return () => window.removeEventListener("mousedown", (e) => handleClick(e));
  }, [modal]);

  return (
    <section
      ref={modalRef}
      className="w-[325px] h-[400px] fixed rounded-[10px] bg-gradient-to-b from-[#ADDC91] to-[#CDEA80] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex overflow-hidden shadow-lg"
    >
      <div className="w-[100%] bg-slate-100 flex flex-col justify-center items-center gap-[20px]">
        <div className="bg-[url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png)] w-[100px] h-[100px] rounded-[50%] overflow-hidden bg-cover"></div>
        <div className="relative">
          <input
            type="text"
            placeholder="User name"
            className="outline-none pl-[10px] bg-stone-200 h-[35px]"
            onChange={(e) => changeHandler("name", e)}
            value={name}
          />
          <AiOutlineUser className="absolute right-[10px] top-[50%] translate-y-[-50%]" />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="outline-none pl-[10px] bg-stone-200 h-[35px]"
            onChange={(e) => changeHandler("pwd", e)}
            value={pwd}
          />
          <RiLockPasswordLine className="absolute right-[10px] top-[50%] translate-y-[-50%]" />
        </div>

        <button
          className="bg-slate-900 text-white w-[120px] h-[40px] font-black cursor-pointer"
          onClick={() => {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_BACK_URL}/user/signin`,
                signinForm,
                { withCredentials: true }
              )
              .then((res) => {
                const { photo, answer, role } = res.data;

                if (photo) {
                  toast(`${answer}님 환영합니다.`);
                  userSet(answer, photo, role);
                  setSigninModal(false);
                } else {
                  toast(answer);
                }
              });
          }}
        >
          Sign In
        </button>
      </div>
    </section>
  );
}

export default SigninModal;
