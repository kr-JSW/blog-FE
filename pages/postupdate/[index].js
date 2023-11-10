import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

function postupdate() {
  const router = useRouter();
  const [postData, setPostData] = useState({
    title: "",
    desc: "",
    photo: "",
  });
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { title, desc, photo } = postData;
  const { index } = router.query;

  const changeHandler = (val, e) => {
    setPostData({ ...postData, [val]: e.target.value });
  };

  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_URL}/posts/getPost`, {
          params: { postId: index },
        })
        .then((res) => setPostData(res.data[0]));
    }
  }, [router.isReady]);

  function checkUrl(photo) {
    let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
    return expUrl.test(photo);
  }

  const submitHandler = async () => {
    let editObj = {
      title,
      desc,
      index,
    };

    if (imgFile) {
      const fileUpdate = new FormData();
      const fileName = Date.now() + imgFile.name;
      fileUpdate.append("name", fileName);
      fileUpdate.append("file", imgFile);

      editObj.photo = fileName;
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACK_URL}/upload`, fileUpdate)
        .then((res) => toast(res.data));
    } else if (imgUrl) {
      editObj.photo = imgUrl;
    }

    await axios
      .put(`${process.env.NEXT_PUBLIC_BACK_URL}/posts/updatePost`, editObj)
      .then((res) => toast(res.data.message));

    router.back();
  };

  return (
    <div className="min-h-[calc(100vh-50px)] h-[100%] py-[50px] flex items-center justify-center">
      <div className="p-[50px]  border-[2px] min-h-[calc(100vh-100px)] w-[90%] rounded-[10px] flex flex-col">
        <div className="h-[200px] w-[100%] overflow-hidden ">
          <label htmlFor="imgupdate">
            <img
              className="object-cover h-[100%] w-[100%] rounded-[10px] cursor-pointer"
              src={
                imgFile
                  ? URL.createObjectURL(imgFile)
                  : imgUrl
                  ? imgUrl
                  : checkUrl(photo)
                  ? photo
                  : `${process.env.NEXT_PUBLIC_BACK_IMAGE}/${photo}`
              }
            />
          </label>

          <input
            type="file"
            id="imgupdate"
            style={{ display: "none" }}
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </div>
        <input
          type="text"
          placeholder="상단의 이미지를 클릭하여 파일을 업로드 하거나, 이곳에 이미지 url을 입력해주세요."
          onChange={(e) => {
            setImgUrl(e.target.value);
            setImgFile(null);
          }}
        />
        <div>
          <textarea
            className="w-[100%] h-[40px] font-bold mt-[10px] mb-[10px] border-[1px] border-black rounded-[10px] pl-[4px] outline-none resize-none"
            value={title}
            onChange={(e) => changeHandler("title", e)}
          />
          <br />
          <textarea
            className="w-[100%] h-[300px] border-[1px] border-black rounded-[10px] p-[4px] outline-none resize-none"
            value={desc}
            onChange={(e) => changeHandler("desc", e)}
          />
        </div>
        <section className="flex justify-center">
          <button
            onClick={() => {
              submitHandler();
            }}
            className="mt-[10px] w-[100px] rounded-[10px] border-2 p-[5px] font-mono bg-sky-400 text-slate-100"
          >
            Submit
          </button>
        </section>
      </div>
    </div>
  );
}

export default postupdate;
