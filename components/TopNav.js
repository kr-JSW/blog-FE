import React, { useState, useRef, useEffect } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import Link from 'next/link';
import SignupModal from './SignupModal';
import SigninModal from './SigninModal';
import { signStore } from '../store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function TopNav() {
    const [cate, setCate] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [signinModal, setSigninModal] = useState(false);
    const [categories, setCategories] = useState([]);

    let { username, photo, userSet, newCategory } = signStore();

    const router = useRouter();

    const authToken = async () => {
        await axios
            .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/tokenAuth`, null, {
                withCredentials: true,
            })
            .then((res) => {
                let { nickname, photo, role } = res.data;

                userSet(nickname, photo, role);
            });
    };

    const logoutAxios = async () => {
        await axios
            .post(`${process.env.NEXT_PUBLIC_BACK_URL}/user/logout`, null, {
                withCredentials: true,
            })
            .then((res) => {
                userSet('', '', '');
                toast(res.data);
                router.push('/');
            });
    };

    useEffect(() => {
        authToken();

        if (username !== '') {
            const authInterval = setInterval(() => {
                authToken();

                clearInterval(authInterval);
            }, 1000 * 60 * 5);
        }
    }, [username]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACK_URL}/categories/getCategory`)
            .then((res) => setCategories(res.data.answer));
    }, [newCategory]);

    function checkUrl(photoName) {
        let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
        return expUrl.test(photoName);
    }

    return (
        <div className="sticky top-0 h-[50px] bg-gradient-to-r from-indigo-950 to-purple-400  flex items-center justify-evenly px-[10px] z-40">
            <h1 className="font-semibold italic flex-1  flex justify-center select-none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Coding_Archive
            </h1>
            <div className="font-bold text-white flex-[5] flex justify-center">
                <span className="ml-5 cursor-pointer hover:translate-y-[-5px] transition">
                    <Link href={`/`}>HOME</Link>
                </span>
                <span
                    className="ml-5 cursor-pointer hover:translate-y-[-5px] transition"
                    onClick={() => {
                        username ? router.push('/write') : toast('쓰기 권한이 없습니다.');
                    }}
                >
                    <>WRITE</>
                </span>
                <span className="ml-5 cursor-pointer hover:translate-y-[-5px] transition">
                    <Link href={`/contact`}>CONTACT ME</Link>
                </span>
                <span
                    className="ml-5 cursor-pointer hover:translate-y-[-5px] transition"
                    onClick={() => setCate(!cate)}
                >
                    CATEGORIES
                </span>
            </div>

            {username ? (
                <div className="flex mr-[30px]">
                    <span className="flex items-center mr-[15px] cursor-pointer" onClick={() => router.push('/mypage')}>
                        <img
                            src={photo}
                            alt="profile_pic"
                            className="w-[35px] h-[35px] border-1 rounded-[50%] mr-[5px] bg-white"
                        />
                        <span className="cursor-pointer text-zinc-200 px-[10px] py-[5px] bg-gradient-to-r from-indigo-400 to-slate-400 rounded-[10px]">
                            {username}
                        </span>
                    </span>

                    <span
                        className="cursor-pointer relative hover:translate-y-[-2px] transition text-zinc-200 px-[10px] py-[5px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-[10px]"
                        onClick={() => {
                            logoutAxios();
                        }}
                    >
                        Log out
                    </span>
                </div>
            ) : (
                <h1 className=" flex-1  flex justify-center ">
                    <span
                        className="mr-[20px] cursor-pointer font-light hover:translate-y-[-5px] transition"
                        onClick={() => setSignupModal(!signupModal)}
                    >
                        SignUp
                    </span>
                    <span
                        className="cursor-pointer font-light hover:translate-y-[-5px] transition"
                        onClick={() => setSigninModal(!signinModal)}
                    >
                        SignIn
                    </span>
                </h1>
            )}

            <div
                className={`backdrop-blur-sm bg-slate-100/40 z-50 fixed h-[100vh] w-[50vw] bottom-0 ease-in duration-300 ${
                    cate ? 'right-0 ease-in  ' : 'right-[-100%] '
                }`}
            >
                <span>
                    <IoExitOutline onClick={() => setCate(!cate)} className="text-[30px] cursor-pointer" />
                    <div className="flex flex-wrap  h-[100%] items-center justify-between px-[20px] overflow-auto gap-y-[40px]">
                        {categories.map((i, idx) => {
                            let { name, photo } = i;

                            photo = checkUrl(photo) ? photo : process.env.NEXT_PUBLIC_BACK_IMAGE + '/' + photo;
                            return (
                                <span
                                    key={idx}
                                    style={{
                                        backgroundImage: `url(${photo})`,
                                    }}
                                    className={`w-[40%] h-[30%] hover:translate-y-[-5px] transition overflow-hidden cursor-pointer rounded-lg  flex items-center justify-center bg-cover `}
                                >
                                    <Link
                                        href={`/category/${name}?page=1`}
                                        className="bg-black/20 h-[100%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]"
                                    >
                                        {name}
                                    </Link>
                                </span>
                            );
                        })}
                    </div>
                </span>
            </div>
            {signupModal ? <SignupModal modal={signupModal} setSignupModal={(e) => setSignupModal(e)} /> : null}
            {signinModal ? <SigninModal modal={signinModal} setSigninModal={(e) => setSigninModal(e)} /> : null}
        </div>
    );
}

export default TopNav;
