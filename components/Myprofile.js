import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signStore } from "../store";
import { BiExit } from "react-icons/bi";

function Myprofile({ photo, name }) {
  const [profileImg, setProfileImg] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const { userPhoto } = signStore();

  const clickHandler = async () => {
    if (profileImg) {
      const imgData = new FormData();
      const filename = Date.now() + profileImg.name;
      imgData.append("name", filename);
      imgData.append("file", profileImg);

      await axios
        .post(`${process.env.NEXT_PUBLIC_BACK_URL}/upload`, imgData)
        .then((res) => {
          toast(res.data);
          userPhoto(`${process.env.NEXT_PUBLIC_BACK_IMAGE}` + "/" + filename);
        });

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/user/profileImgUpdate`,
          { photo: filename, name },
          { withCredentials: true }
        )
        .then((res) => {
          toast(res.data);
        });
    } else if (imgUrl) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/user/profileImgUpdate`,
          { photo: imgUrl, name },
          { withCredentials: true }
        )
        .then((res) => {
          userPhoto(imgUrl);
          toast(res.data);
        });
    }
  };

  const imgModal = () => {
    return (
      <div className="fixed p-[5px]  bg-gradient-to-r from-violet-500 to-indigo-500  w-[400px] h-[200px] rounded-[10px] shadow-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div
          className="absolute text-[25px] right-[10px] cursor-pointer text-slate-100"
          onClick={() => setProfileModal(false)}
        >
          <BiExit />
        </div>
        <h3 className="font-semibold mb-[7px] text-slate-100">사진 선택</h3>
        <p className="text-[13px] text-slate-300 mb-[25px]">
          원하시는 이미지의 url주소를 입력하거나 pc에 저장되어있는 사진을 설정
          할 수 있습니다.
        </p>
        <section className="flex gap-[15px] items-center justify-center flex-col">
          <input
            type="text"
            placeholder="원하는 이미지 url주소를 입력하세요."
            className="outline-none w-[90%] rounded-[10px] h-[30px] pl-[10px] bg-stone-100"
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <label
            htmlFor="profile_img"
            className="cursor-pointer flex items-center justify-center bg-blue-500 text-white w-[200px] px-[10px] py-[5px] rounded-[10px] hover:bg-blue-600 "
          >
            PC파일 업로드
            <input
              type="file"
              className="hidden"
              id="profile_img"
              onChange={(e) => setProfileImg(e.target.files[0])}
            />
          </label>
        </section>
      </div>
    );
  };

  return (
    <div>
      <h2 className=" font-[600] text-lg mb-[10px]">내 프로필 사진</h2>
      <p className="mb-[30px] text-[12px] text-slate-600">
        개인 프로필 사진을 수정 할 수 있습니다.
      </p>
      <table className=" border-collapse w-[100%]">
        <tbody>
          <tr>
            <td className=" border w-[30%] h-[200px] border-slate-500 border-l-transparent font-bold text-[15px]">
              프로필 사진
            </td>
            <td className=" border w-[70%] border-slate-500 border-r-transparent ">
              <div className="flex  gap-[50px]">
                <img
                  src={`${
                    profileImg
                      ? URL.createObjectURL(profileImg)
                      : imgUrl
                      ? imgUrl
                      : photo
                  }`}
                  alt="profile_img"
                  className="w-[150px] h-[150px] rounded-[50%] ml-[100px]"
                />
                <div
                  onClick={() => setProfileModal(true)}
                  className="cursor-pointer flex items-center justify-center bg-blue-500 text-white w-[100px] h-[50px] rounded-[10px] hover:bg-blue-600 mt-[100px]"
                >
                  사진 변경
                </div>
              </div>
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
                className="cursor-pointer flex items-center justify-center bg-blue-500 text-white w-[100px] h-[50px] rounded-[10px] hover:bg-blue-600 m-auto"
              >
                저장
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {profileModal ? imgModal() : null}
    </div>
  );
}

export default Myprofile;
