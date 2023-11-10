import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import router from 'next/router';
import { signStore } from '../store';

function write() {
    const [category, setCategory] = useState('JavaScript');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [preview, setPreview] = useState(null);
    const [preUrl, setUrl] = useState('https://cdn.pixabay.com/photo/2023/05/18/20/48/swamp-8003229_640.png');
    const [categories, setCategories] = useState([]);

    let { newCategory } = signStore();

    const coverHandler = (e) => {
        setPreview(e.target.files[0]);
    };

    const clickHandler = (e) => {
        let dataObj = {
            categories: category,
            title,
            desc,
        };

        if (preview) {
            const imgData = new FormData();
            const filename = Date.now() + preview.name;
            imgData.append('name', filename);
            imgData.append('file', preview);

            dataObj.photo = filename;

            axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/upload`, imgData).then((res) => toast(res.data));
        } else if (preUrl) {
            dataObj.photo = preUrl;
        }

        axios
            .post(`${process.env.NEXT_PUBLIC_BACK_URL}/posts/createPost`, dataObj)
            .then((res) => {
                toast(res.data);
                router.push('/');
            })
            .catch((err) => toast('게시글을 등록에 실패하였습니다.'));
    };

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/getCategory`)
            .then((res) => setCategories(res.data.answer));
    }, [newCategory]);

    return (
        <div className="flex flex-col p-[50px]">
            <section className="flex flex-col">
                <div className="flex items-center">
                    <div className="flex h-[150px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-[10px] items-center justify-center flex-col p-[10px] gap-[10px] ">
                        <div className="flex">
                            <label
                                htmlFor="cover"
                                className="inline w-[100px] h-[40px] bg-cyan-500 text-neutral-50 text-center p-[5px] rounded-[10px] cursor-pointer"
                            >
                                PC Cover
                            </label>
                            <section className="flex flex-col ml-[20px] justify-center items-center">
                                <span className="text-white">카테고리를 선택해 주세요.</span>
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((i, idx) => {
                                        return <option key={idx}>{i.name}</option>;
                                    })}
                                </select>
                            </section>
                        </div>
                        <p className="text-white">PC파일 업로드 또는 이미지 url을 입력해 주세요.</p>
                        <input
                            type="text"
                            placeholder="이미지 URL입력"
                            onChange={(e) => setUrl(e.target.value)}
                            className="outline-none w-[90%] pl-[10px]"
                        />
                    </div>
                    <img
                        src={preview ? URL.createObjectURL(preview) : preUrl}
                        alt="cover"
                        className="w-[150px] h-[150px] ml-[40px] rounded-[10px]"
                    />
                    <input type="file" id="cover" style={{ display: 'none' }} onChange={(e) => coverHandler(e)} />
                </div>
                <input
                    type="text"
                    placeholder="제목을 입력하세요."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="mb-4 border mt-4 px-2 outline-none bg-slate-100"
                />
                <textarea
                    type="text"
                    placeholder="내용을 입력하세요."
                    onChange={(e) => {
                        let value = e.target.value;

                        setDesc(value);
                    }}
                    value={desc}
                    className="p-2 border h-[400px] resize-none mb-4 outline-none bg-gray-200 overflow-auto"
                />

                <button
                    className="border rounded-[10px] bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-100 h-[50px] w-[100px] self-center mt-[50px] "
                    onClick={() => {
                        clickHandler();
                    }}
                >
                    글 등록
                </button>
            </section>
        </div>
    );
}

export default write;
