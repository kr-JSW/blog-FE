import React from "react";
import Slide from "../components/Slide";
import ItemSlide from "../components/ItemSlide";

function index() {
  return (
    <div className="h-[calc(100vh-50px)] bg-[length:120%_calc(140vh-50px)] relative bg-no-repeat bg-[url('../images/way.jpg')] overflow-hidden">
      <section className="h-[100%] w-[100%] bg-black/20 text-white px-[100px]">
        <div>
          <div className="relative top-[50vh] right-[-50%]  translate-y-[-50%]">
            <Slide>
              <ItemSlide
                value={{
                  title: "HOME",
                  des: "기록을 저장하는 공간... 코딩기록, 일상을 공유합니다.",
                  sou: "https://cdn.pixabay.com/photo/2020/02/15/16/09/loveourplanet-4851331_640.jpg",
                }}
              />
              <ItemSlide
                value={{
                  title: "WRITE",
                  des: "기억은 휘발되지만, 기록은 영원합니다.",
                  sou: "https://cdn.pixabay.com/photo/2016/07/30/00/03/winding-road-1556177_640.jpg",
                }}
              />
              <ItemSlide
                value={{
                  title: "CONTACT ME",
                  des: "필요한 사항이 있으시면, 언제든 연락주세요.",
                  sou: "https://cdn.pixabay.com/photo/2018/11/01/05/33/nature-3787200_640.jpg",
                }}
              />
              <ItemSlide
                value={{
                  title: "CATEGORIES",
                  des: "게시글이 분류되어 있습니다.",
                  sou: "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_640.png",
                }}
              />
            </Slide>
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
