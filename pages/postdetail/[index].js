import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { signStore } from "../../store";

function PostDetail() {
  const router = useRouter();

  const { username } = signStore();

  const [postData, setPostData] = useState({
    title: "",
    desc: "",
    photo: "",
  });

  const { title, desc, photo } = postData;
  const { index } = router.query;

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

  return (
    <div className="min-h-[calc(100vh-50px)] h-[100%] py-[50px] flex items-center justify-center">
      <div className="p-[50px]  min-h-[calc(100vh-100px)] w-[90%]  flex flex-col justify-between">
        <section>
          <div className="h-[200px] w-[100%] overflow-hidden ">
            <img
              className="object-cover h-[100%] w-[100%] rounded-[10px]"
              src={
                checkUrl(photo)
                  ? photo
                  : `${process.env.NEXT_PUBLIC_BACK_IMAGE}/${photo}`
              }
            />
          </div>
          <div>
            <div className="font-bold mt-[20px] border-b-[2px] pb-[25px] border-gray-400">
              {title}
            </div>
            <br />
            <div className="border-b-[2px] pb-[25px] border-gray-400 whitespace-pre">
              {desc.split("<<div>>").map((item, idx) => {
                let num = (idx + 1) % 2;

                if (num === 1) {
                  return <>{item}</>;
                } else {
                  return (
                    <>
                      <div className="bg-black/90 text-white flex flex-col justify-center p-[10px] pb-[30px] rounded-[10px]">
                        <span className="border-b-slate-500 pb-[5px] border-b-[1px]">
                          CODE
                        </span>
                        {item}
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </section>

        {username ? (
          <section className="flex items-center justify-evenly mt-[40px]">
            <button
              onClick={() => router.push(`/postupdate/${index}`)}
              className="rounded-[10px] border-2 py-[10px] px-[15px] font-mono bg-sky-400 text-slate-100"
            >
              Update
            </button>
            <button
              className="rounded-[10px] border-2 py-[10px] px-[15px] font-mono bg-sky-400 text-slate-100"
              onClick={async () => {
                await axios
                  .delete(
                    `${process.env.NEXT_PUBLIC_BACK_URL}/posts/postdelete?id=${index}&&filename=${photo}`
                  )
                  .then((res) => toast(res.data));

                router.back();
              }}
            >
              Delete
            </button>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default PostDetail;
