"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { SignInHook } from "./signIn/hook/index"
import Loader from '@/components/loader/loader';
import { useState, useEffect } from 'react';

export default function SingIn() {
    const { signInData, setSignInData, showPassword, setShowPassword, loadingHandleSignIn, handleSingnIn, message, setMessage } = SignInHook();
    const [loader, setLoader] = useState(true);

    setTimeout(() => {
        setLoader(false);
    }, 1500);

    if (message) setTimeout(() => {
        setMessage("");
    }, 5000);

    return (
        <>
            <Loader isLoading={loader} />
            <div className={loader ? "hidden" : "bg-[url('/images/background/background.webp')] bg-no-repeat bg-cover bg-center w-screen h-screen overflow-hidden"}>
                <div className="w-full h-full bg-black/50 " >
                    <div className={message ? "bg-red-400 py-5 w-full" : "hidden"}>
                        <p className="text-center text-white font-semibold">Erreur: {message}</p>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[95%] sm:w-1/2 lg:w-[40px]  xl:w-[35%] 2xl:w-[30%] flex flex-col items-center justify-center h-[65%] mt-3 lg:mt-0 sm:h-1/2 lg:h-[85%] shadow-xl bg-gray-100 2xl:h-[65%] rounded-2xl px-4 py-4 2xl:pt-10 mx-auto">
                            <h2 className="text-blue-700  font-extrabold -top-2 sm:-top-0 text-[20px] relative xl:-top-2  2xl:-top-4 lg:-top-1">Se connecter à LRCSheet Admin </h2>
                            <div className='h-24 w-24 relative xl:top-1'>
                                <img src="/images/logo/logo.png" className="w-full object-cover" alt="" />
                            </div>
                            <form className="w-full space-y-8 flex flex-col 2xl:pb-5" action="">
                                <div className='w-full relative'>
                                    <FontAwesomeIcon icon={faEnvelope} className='text-blue-700 text-[18px] absolute font-semibold top-4 left-2' />
                                    <input value={signInData.email ?? ""} onChange={(e) => {
                                        setSignInData({
                                            ...signInData,
                                            email: e.target.value
                                        })
                                    }} placeholder="Email" className="py-3 bg-blue-100 placeholder-blue-900  px-8 w-full outline-none text-blue-700 focus:text-blue-700" type="email" name="" id="" />
                                </div>
                                <div className='w-full relative'>
                                    <FontAwesomeIcon icon={faLock} className='text-blue-700   text-[18px] absolute font-semibold top-4 left-2' />
                                    <input value={signInData.password ?? ""} onChange={(e) => {
                                        setSignInData({
                                            ...signInData,
                                            password: e.target.value
                                        })
                                    }} placeholder="Mot de passe" className="py-3 bg-blue-100 placeholder-blue-900  px-8 w-full outline-none text-blue-700" type={showPassword ? "text" : "password"} maxLength={12} name="" id="" />
                                    <FontAwesomeIcon onClick={() => {
                                        setShowPassword(!showPassword)
                                    }} icon={showPassword ? faEye : faEyeSlash} className='text-blue-700 cursor-pointer text-[18px] absolute top-4 right-2' />
                                </div>
                                <button type="button" onClick={() => {
                                    handleSingnIn()
                                }} className="bg-orange-400 text-white w-full mx-auto relative top-1 py-3.5 hover:bg-blue-700 outline-none mt-[100px] ease duration-500 rounded-md font-semibold">
                                    {loadingHandleSignIn ? <ClipLoader size={15} color='#fff' /> : "Connexion"}
                                </button>
                                <Link href="" className="font-semibold hover:ease hover:text-blue-700 hover:duration-500 w-[165px] border-b text-blue-600">
                                    Mot de passe oublié ?
                                </Link>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}