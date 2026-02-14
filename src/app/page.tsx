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

    console.log(signInData)

    return (
        <>
            {/* <Loader isLoading={loader} />
            <div className={loader ? "hidden" : "bg-[url('/images/background/background.webp')] bg-no-repeat bg-cover bg-center w-screen h-screen overflow-hidden"}>
                <div className="w-full h-full bg-black/50 " >
                    <div className={`duration-500 ease-in-out transition-all ${message !== "" ? "bg-red-400 py-5 w-full opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                        <p className="text-center text-white font-semibold">Erreur: {message}</p>
                    </div>
                    <div className="w-full h-full relative -top-8 flex items-center justify-center">
                        <div className="w-[95%] sm:w-1/2 lg:w-[40px]  xl:w-[35%] 2xl:w-[30%] flex flex-col items-center justify-center h-[65%] mt-3 lg:mt-0 sm:h-1/2 lg:h-[85%] shadow-xl bg-gray-100 2xl:h-[65%] rounded-2xl px-4 py-4 2xl:pt-10 mx-auto">
                            <h2 className="text-blue-700  font-extrabold -top-2 sm:-top-0 text-[22px] relative xl:-top-2  2xl:-top-4 lg:-top-1">Se connecter à LRCSheet Admin </h2>
                            <div className='h-24 w-24 relative xl:top-1'>
                                <img src="/images/logo/logo.png" className="w-full object-cover" alt="" />
                            </div>
                            <form className="w-full space-y-8 flex flex-col 2xl:pb-5" action="">
                                <div className='w-full relative'>
                                    <FontAwesomeIcon icon={faEnvelope} className='text-blue-600 text-[18px] absolute font-semibold top-4 left-2' />
                                    <input value={signInData.email ?? ""} onChange={(e) => {
                                        setSignInData({
                                            ...signInData,
                                            email: e.target.value
                                        })
                                    }} placeholder="Email" className="py-3  px-8 w-full outline-none bg-gray-200 text-blue-600 focus:" type="email" name="" id="" />
                                </div>
                                <div className='w-full relative'>
                                    <FontAwesomeIcon icon={faLock} className='text-[18px] text-blue-600 absolute font-semibold top-4 left-2' />
                                    <input value={signInData.password ?? ""} onChange={(e) => {
                                        setSignInData({
                                            ...signInData,
                                            password: e.target.value
                                        })
                                    }} placeholder="Mot de passe" className="py-3 bg-gray-200  px-8 w-full outline-none text-blue-600 " type={showPassword ? "text" : "password"} maxLength={12} name="" id="" />
                                    <FontAwesomeIcon onClick={() => {
                                        setShowPassword(!showPassword)
                                    }} icon={showPassword ? faEye : faEyeSlash} className='text-blue-600  cursor-pointer text-[18px] absolute top-4 right-2' />
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
            </div> */}
            <Loader isLoading={loader} />
            <div className={loader ? "hidden" : "bg-white dark:bg-gray-800 flex overflow-hidden justify-center lg:justify-normal items-center w-screen h-screen"}>
                <div className="flex w-full h-full">
                    <div className="hidden lg:flex lg:w-full bg-gradient-to-tr from-blue-800 to-purple-700 justify-center items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative z-10 px-10 text-center">
                            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl">
                                <img src="/images/logo/logo.png" />
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-4">LRCSheet Admin</h1>
                            <p className="text-white/80 text-lg mb-8">Assurez la gestion de vos données utilisateurs en toute sécurité et confiance!</p>
                            <div className="flex justify-center space-x-4">
                                <div className="w-3 h-3 rounded-full bg-white/30"></div>
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <div className="w-3 h-3 rounded-full bg-white/30"></div>
                            </div>
                        </div>

                        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 border-white/30 rounded-full"></div>
                        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 border-white/30 rounded-full"></div>
                        <div className="absolute top-0 -right-20 w-80 h-80 border-4 border-white/30 rounded-full"></div>
                    </div>
                    <div className="w-full h-full flex items-center justify-center bg-[url('/images/background/background.webp')] bg-no-repeat bg-cover bg-center">
                        <div className="w-full h-full  bg-black/60">
                            <div className={`transition-all duration-700 ${message ? "w-full py-2 bg-red-400" : "opacity-0"}`}>
                                <p className="text-center text-white">{message}</p>
                            </div>
                            <div className="flex w-full h-full items-center justify-center">
                                <div className="w-[90%] sm:w-[80%] lg:w-3/4 xl:w-[60%]">
                                    <div className="w-full  bg-white shadow-2xl p-6 rounded-xl">
                                        <div className="text-center lg:text-left">
                                            <h2 className="text-2xl leading-8 font-extrabold text-gray-700 mb-2 text-center">Authentification à  LRCSheet Admin!</h2>
                                        </div>

                                        <form className="space-y-6 mt-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                                <input onChange={(input) => {
                                                    setSignInData({
                                                        ...signInData,
                                                        email: input.target.value
                                                    })
                                                }} value={signInData.email ?? ""} type="email" id="email" name="email" className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="ornek@mail.com" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                                <input onChange={(input) => {
                                                    setSignInData({
                                                        ...signInData,
                                                        password: input.target.value
                                                    })
                                                }} value={signInData.password ?? ""} type="password" id="password" name="password" className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
                                            </div>

                                            <div>
                                                <button onClick={() => {
                                                    handleSingnIn()
                                                }} type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                    {loadingHandleSignIn ? <ClipLoader color='#fff' size={16} /> : "Connexion"}
                                                </button>
                                            </div>
                                        </form>

                                        <div className="mt-6">
                                            {/* <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">veya şununla devam et</span>
                                    </div>
                                </div> */}

                                            {/* <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="ml-2">Facebook</span>
                                    </button>
                                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                        </svg>
                                        <span className="ml-2">Google</span>
                                    </button>
                                </div> */}
                                        </div>

                                        <p className="mt-8 text-center text-sm text-gray-600">
                                            Mo de passe oublié ?
                                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500"> réinitialisez votre mot de passe</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}