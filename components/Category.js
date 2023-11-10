import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signStore } from '../store';

function Category() {
    const [categoryName, setCategoryName] = useState(null);
    const [categoryImg, setCategoryImg] = useState(
        'https://cdn.pixabay.com/photo/2023/11/04/10/03/bear-8364583_640.png'
    );
    const [imgIsUrl, setImgIsUrl] = useState(true);

    const [categories, setCategories] = useState([]);

    const [delModal, setDelModal] = useState(false);

    const [delvalue, setDelvalue] = useState(null);

    const { newCategoryFun, newCategory } = signStore();

    function checkUrl(val) {
        let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
        return expUrl.test(val);
    }

    const changeHandler = (num, e) => {
        if (num === 1) {
            setCategoryImg(e);
            setImgIsUrl(false);
        } else {
            setCategoryImg(e);
            setImgIsUrl(true);
        }
    };

    const clickHandler = () => {
        //imgIsUrl은 categoryImg이 url양식일때 true, file일때 false로 표현된다.
        //이렇게 하는 이유는 file을 업로드할때 서버에 저장해야하기 때문이다.

        if (imgIsUrl) {
            axios
                .post(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/createCategory`, {
                    name: categoryName,
                    photo: categoryImg,
                })
                .then((res) => toast(res.data.answer));
        } else {
            const imgData = new FormData();
            const filename = Date.now() + categoryImg.name;
            imgData.append('name', filename);
            imgData.append('file', categoryImg);

            axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/upload`, imgData).then((res) => toast(res.data));
            axios
                .post(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/createCategory`, {
                    name: categoryName,
                    photo: filename,
                })
                .then((res) => toast(res.data.answer));
        }

        newCategoryFun();
    };

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/getCategory`)
            .then((res) => setCategories(res.data.answer));
    }, [newCategory]);

    const deleteCategory = async (value) => {
        await axios
            .delete(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/delCategory`, { data: { value } })
            .then((res) => toast(res.data.answer));

        newCategoryFun();
    };

    const delCheckModal = (value) => {
        return (
            <section className="absolute flex flex-col justify-evenly p-[10px] w-[400px] h-[200px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[10px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="text-white">
                    카테고리를 삭제하면, 해당하는 게시글 모두가 삭제됩니다. 정말 삭제하시겠습니까?
                </div>
                <div className="flex justify-center gap-[100px]">
                    <div
                        onClick={() => {
                            setDelModal(false);
                            deleteCategory(delvalue);
                        }}
                        className="cursor-pointer rounded-[10px] w-[80px] h-[40px] flex justify-center items-center bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
                    >
                        삭제
                    </div>
                    <div
                        onClick={() => setDelModal(false)}
                        className="cursor-pointer rounded-[10px] w-[80px] h-[40px] flex justify-center items-center bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
                    >
                        취소
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="flex gap-[15px] h-[100%]">
            <section className="rounded-[10px] bg-red-400 flex-1 p-[15px] flex flex-col gap-[10px]">
                {categories.map((i, idx) => {
                    const { name } = i;
                    return (
                        <section className="flex justify-between border-b-[1px] border-black shadow-xl" key={idx}>
                            <div>{name}</div>
                            <button
                                onClick={() => {
                                    newCategoryFun();

                                    setDelModal(true);
                                    setDelvalue(name);
                                }}
                            >
                                삭제
                            </button>
                        </section>
                    );
                })}
            </section>
            <section className="rounded-[10px] bg-red-500 flex-1">
                <div className="flex flex-col justify-evenly items-center h-[100%]">
                    <input
                        type="text"
                        placeholder="카테고리 이름을 입력하세요."
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-[80%] py-[5px] pl-[5px] outline-none rounded-[10px]"
                    />
                    <div className="flex flex-col gap-[20px] w-[80%]">
                        <label className="bg-blue-400 w-[50%] self-center cursor-pointer text-white p-[5px] rounded-[10px] flex items-center justify-center hover:translate-y-[-5px] transition">
                            pc사진 업로드
                            <input
                                type="file"
                                onChange={(e) => changeHandler(1, e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                        <input
                            type="text"
                            placeholder="url주소를 입력하세요."
                            onChange={(e) => changeHandler(2, e.target.value)}
                            className="p-[5px] rounded-[10px] outline-none"
                        />
                    </div>
                    <img
                        src={
                            checkUrl(categoryImg)
                                ? categoryImg
                                : typeof categoryImg === 'object'
                                ? URL.createObjectURL(categoryImg)
                                : 'https://cdn.pixabay.com/photo/2023/11/04/10/03/bear-8364583_640.png'
                        }
                        alt="category Cover"
                        className=" w-[200px] h-[200px] rounded-[10px]"
                    />
                    <button
                        className="bg-blue-400 px-[10px] py-[5px] text-white rounded-[10px] hover:translate-y-[-5px] transition"
                        onClick={clickHandler}
                    >
                        카테고리 생성
                    </button>
                </div>
            </section>
            {delModal ? delCheckModal() : null}
        </div>
    );
}

export default Category;
