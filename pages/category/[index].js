import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Pagination from '../../components/Pagination';

function Category({ postDataNum, postData, page, index }) {
    const router = useRouter();

    page = parseInt(page);

    const [pageNum, setPageNum] = useState(page);

    useEffect(() => {
        setPageNum(page);
    }, [router.isReady]);

    return (
        <div className=" min-h-[calc(100vh-50px)] pt-[50px]">
            <ul className=" m-auto max-w-[1200px] md:max-w-[800px] sm:max-w-[800px] phone:w-[400px] min-h-[calc(100vh-150px)] ">
                {postData.map((item, key) => {
                    const { title, photo, desc, createdAt, _id } = item;

                    function checkUrl(photo) {
                        let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
                        return expUrl.test(photo);
                    }

                    let urlBoolean = checkUrl(photo);

                    if ((page - 1) * 6 - 1 < key && key < page * 6) {
                        return (
                            <li
                                className="h-[300px] w-[370px] rounded-[15px] overflow-hidden inline-block m-[15px] phone:mx-0 phone:my-[10px] phone:w-[100%] cursor-pointer"
                                key={key}
                                onClick={(e) => router.push(`/postdetail/${_id}`)}
                            >
                                <div className="bg-indigo-200/60 h-[20%] px-5 flex items-center">
                                    <span className="block truncate ">{title}</span>
                                </div>
                                <div
                                    className={` h-[80%] flex p-5 bg-cover`}
                                    style={{
                                        backgroundImage: urlBoolean
                                            ? `url(${photo})`
                                            : `url(
                      ${process.env.NEXT_PUBLIC_BACK_IMAGE}/${photo}
                    )`,
                                    }}
                                >
                                    <div className="bg-slate-200/25   w-[100%] rounded-[10px] flex flex-col justify-between ">
                                        <div>
                                            {desc.split('<<div>>').map((i, idx) => {
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="text-ellipsis overflow-hidden whitespace-pre"
                                                    >
                                                        {i}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="font-bold">{createdAt.slice(0, 10)}</div>
                                    </div>
                                </div>
                            </li>
                        );
                    }
                })}
            </ul>
            <section className="mt-[10px]">
                <Pagination totalDataEach={postDataNum} pageDataEach={6} currentPage={page} category={index} />
            </section>
        </div>
    );
}

export default Category;

export async function getServerSideProps(context) {
    const { index, page } = context.query;

    // let postDataNum;
    // let postData;

    // await axios
    //     .get(`${process.env.NEXT_PUBLIC_BACK_URL}/posts/getPost`, {
    //         params: { categories: index },
    //         headers: {
    //             Origin: process.env.NEXT_PUBLIC_FRONT_HOST,
    //         },
    //     })
    //     .then((res) => {
    //         postData = res.data;
    //         postDataNum = res.data.length;
    //     });

    let postDataNum = 2;

    let postData = [
        {
            title: 'ㅇㅇㅇ',
            desc: 'ㅅㄷㄴㅅ',
            photo: 'https://cdn.pixabay.com/photo/2023/05/18/20/48/swamp-8003229_640.png',
            createdAt: '2023-11-11T12:06:42.468Z',
            _id: '654f6e5219739ce6fc14fd53',
        },
        {
            title: 'split함수',
            desc:
                'split는 문자열의 특정 문자를 기준으로하여 배열을 생성하는 함수다.\n' +
                '\n' +
                '<<div>>\n' +
                "  let str = 'ABCDATAWH'\n" +
                '\n' +
                "  str = str.split('A')\n" +
                '\n' +
                '  console.log("str : ",str)\n' +
                '<<div>>\n' +
                '\n' +
                '이렇게 콘솔을 찍으면,\n' +
                '\n' +
                '<<div>>\n' +
                "  str : ['','BCD', 'T', 'WH']\n" +
                '<<div>>\n' +
                '\n' +
                '이런 배열이 출력된다.\n' +
                '\n' +
                'A라는 문자를 기준으로 배열을 만들었기 때문에, A가 사라지고 배열이 만들어진다.\n' +
                '\n' +
                '이렇게 배열로 리턴되기 때문에, map함수와 궁합이 좋다.',
            photo: 'https://cdn.pixabay.com/photo/2023/09/12/18/33/jackdaw-8249384_640.jpg',
            createdAt: '2023-10-31T06:53:21.638Z',
            _id: '6540a461b4103e280b5c0431',
        },
    ];

    console.log(postDataNum, postData);

    return {
        props: {
            postDataNum,
            postData,
            page,
            index,
        },
    };
}
