import React, { useState, useRef, useEffect } from "react";
import style from "./topnav.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgPassword } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";

function SignupModal({ modal, setSignupModal }) {
  const modalRef = useRef();
  const [subcode, setSubcode] = useState(false);
  const [signupForm, setSignupForm] = useState({ name: "", pwd: "", code: "" });

  const { name, pwd, code } = signupForm;

  const changeHandler = (val, e) => {
    setSignupForm({ ...signupForm, [val]: e.target.value });
  };

  useEffect(() => {
    const closeModal = () => setSignupModal(!modal);
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
      className="w-[650px] h-[400px] fixed rounded-[10px] bg-gradient-to-b from-[#ADDC91] to-[#CDEA80] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex overflow-hidden shadow-lg"
    >
      <div
        className="cursor-pointer z-10 absolute text-sm top-[10%] left-[10%] translate-x-[-50%] translate-y-[-50%] p-[5px] bg-black/80 rounded-[10px] text-white"
        onClick={() => setSubcode(!subcode)}
      >
        신청 코드란?
        <p
          className={`border-[1px] border-black absolute top-[40px] w-[350px] rounded-[5px] pointer-events-none bg-white text-black p-[10px] ${
            subcode ? null : "hidden"
          }`}
        >
          <div
            className={`border-[1px] border-black z-[-1] bg-black w-[10px] h-[10px] absolute top-[-5px] rotate-[45deg]`}
          ></div>
          코딩아카이브는 공부를 위한 개인 블로그 입니다. 하지만, 블로그 사용을
          원하시는분은 CONTACT ME를 통해서 가입 사유와 수신 메일을 입력하시면
          심사 후, 가입 가능한 코드를 전달해 드립니다.
        </p>
      </div>
      <div className={`w-[100%] ${style.opp}`}>
        <div>
          <span style={{ "--i": "1" }}></span>
          <span style={{ "--i": "2" }}></span>
          <span style={{ "--i": "3" }}></span>
          <span style={{ "--i": "4" }}></span>
          <span style={{ "--i": "5" }}></span>
          <span style={{ "--i": "6" }}></span>
          <span style={{ "--i": "7" }}></span>
          <span style={{ "--i": "8" }}></span>
          <span style={{ "--i": "9" }}></span>
          <span style={{ "--i": "10" }}></span>
          <span style={{ "--i": "11" }}></span>
          <span style={{ "--i": "12" }}></span>
          <span style={{ "--i": "13" }}></span>
          <span style={{ "--i": "14" }}></span>
          <span style={{ "--i": "15" }}></span>
          <span style={{ "--i": "16" }}></span>
          <span style={{ "--i": "17" }}></span>
          <span style={{ "--i": "18" }}></span>
          <span style={{ "--i": "19" }}></span>
          <span style={{ "--i": "20" }}></span>
        </div>
      </div>
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
        <div className="relative">
          <input
            type="text"
            placeholder="Subscription code"
            className="outline-none pl-[10px] bg-stone-200 h-[35px]"
            onChange={(e) => changeHandler("code", e)}
            value={code}
          />
          <CgPassword className="absolute right-[10px] top-[50%] translate-y-[-50%]" />
        </div>
        <button
          className="bg-slate-900 text-white w-[120px] h-[40px] font-black cursor-pointer"
          onClick={() => {
            axios
              .post(
                `${process.env.NEXT_PUBLIC_BACK_URL}/user/signup`,
                signupForm
              )
              .then((res) => {
                toast(res.data);
                setSignupForm({ name: "", pwd: "", code: "" });
              });
          }}
        >
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default SignupModal;
