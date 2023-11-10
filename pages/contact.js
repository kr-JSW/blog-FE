import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const contact = () => {
  const form = useRef();

  const [textSec, setTextSec] = useState("");

  const changeHandle = (e) => {
    setTextSec(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    form.current[2].value = `발신인 : ${form.current[0].value} \n \n 발신인 메일 : ${form.current[1].value} \n \n 내용 : ${textSec}`;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (result) => {
          form.current[0].value = "";
          form.current[1].value = "";
          setTextSec("");
          toast("문의사항을 전달하였습니다.");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="p-[50px] ">
      <section className="rounded-[15px] overflow-hidden shadow-md flex items-center flex-col bg-cover bg-no-repeat bg-[url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg')]">
        <div className="py-[20px] font-['마고체'] flex items-center justify-center flex-col font-[600] text-[30px] text-white bg-[rgba(0,0,0,.4)] w-[100%] h-[100%]">
          <h1 className="font-mono font-semibold">Contact Me</h1>
          <br />
          <br />
          취업 및 공부를 위한 개발 블로그 입니다.
          <br />
          문의 사항이 있으시면 언제든지 편하게 연락주세요.
        </div>
      </section>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col mt-[80px] rounded-[15px]  gap-3"
      >
        <label className="font-[600] font-serif ">Name</label>
        <input
          type="text"
          name="user_name"
          className="border-b-[1px] border-gray-600 outline-none"
          placeholder="이름을 입력해주세요."
        />
        <label className="font-[600] font-serif ">Email</label>
        <input
          type="email"
          name="user_email"
          className="border-b-[1px] border-gray-600 outline-none"
          placeholder="회신이 가능한 메일 주소를 입력해주세요."
        />
        <label className="font-[600] font-serif ">Message</label>
        <textarea
          name="message"
          className="resize-none h-[250px] overflow-auto outline-none shadow-lg"
          onChange={changeHandle}
          placeholder="문의 내용을 입력해주세요."
          value={textSec}
        ></textarea>
        <button
          type="submit"
          value="Send"
          className="mb-[30px] w-[150px] h-[50px] bg-gradient-to-r from-sky-500 to-indigo-500   rounded-[10px] self-center text-indigo-100 font-[600] font-serif"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default contact;
