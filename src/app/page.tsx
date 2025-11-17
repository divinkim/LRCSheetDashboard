"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
// import { controllers, urlAPI } from "../scripts/index"
// import { ClipLoader } from 'react-spinners';
// import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
// import { Loader } from '../../layout/loader';
import Link from 'next/link';
import { controllers, urlAPI } from './main';
import { ClipLoader } from 'react-spinners';

export default function SingIn() {
    type SignInput = {
        email: string | null,
        password: string | null
    }

    const [signInData, setSignInData] = useState<SignInput>({
        email: null,
        password: null
    });
    const [showPassword, setShowPassword] = useState(false);

    const [loadingHandleSignIn, setLoadingHandleSignIn] = useState(false)

    const handleSingnIn = async () => {
        setLoadingHandleSignIn(true);

        const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;
        const regexPassWord = /^[a-zA-Z0-9ù*!.-_]{4,}$/;

        if (!regexEmail.test(signInData.email ?? "") || !regexPassWord.test(signInData.password ?? "")) {
            setTimeout(() => {
                controllers.alertMessage(false, "Echec d'authentification", "Veuillez vérifier vos identifiants de connexion!", null);
                setLoadingHandleSignIn(false);
            }, 1000)
            return;
        }

        const response = await controllers.API.SendOne("http://localhost:3000", "users/auth", null, { email: signInData.email, password: signInData.password });


        if (response.status) {
            const localStorageData = {
                id: response.data.id.toString(),
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                image: response.data.image,
                authToken: response.authToken,
                adminRole: response.data?.adminRole,
                EnterpriseId: response.data?.EnterpriseId,
                adminService: response.data.adminService,
            }

            console.log(localStorageData)
            //Sauvegarde des données de l'admin en local

            const requireRoles = ['Super-Admin', 'Moderator-Admin', 'Supervisor-Admin'];

            if (!requireRoles.includes(localStorageData.adminRole ?? "")) {
                setLoadingHandleSignIn(false);
                return Swal.fire({
                    icon: "warning",
                    title: "Violation d'accès!",
                    text: "Vous n'avez aucun droit d'accès à cette plateforme, veuillez contacter votre administrateur local."
                });
            }

            for (const [key, value] of Object.entries(localStorageData)) {
                localStorage.setItem(`${key}`, `${value}`);
            }

            return window.location.href = "/pages/home";
        }
        setTimeout(() => {
            controllers.alertMessage(response.status, response.title, response.message, null);
            setLoadingHandleSignIn(false);
        }, 1000)
    }
    return (
        <>
            <div className="bg-[url('/images/background/background.webp')] bg-no-repeat bg-cover bg-center w-screen h-screen items-center flex">
                <div className="w-[95%] sm:w-1/2 lg:w-[40px]  xl:w-[30%] flex flex-col items-center justify-center h-[65%] mt-3 lg:mt-0 sm:h-1/2 lg:h-[80%] backdrop-blur-2xl bg-black/30 2xl:h-[63%] shadow-sm rounded-[30px] px-4 py-4 2xl:pt-10 mx-auto">
                    <h2 className="text-white  font-extrabold -top-3 sm:-top-0 text-[20px] sm:text-[22px] relative xl:-top-3  2xl:-top-4 lg:-top-1">Se connecter à LRCSheet Admin </h2>
                    <div className='h-24 w-24  relative'>
                        <img src="/images/logo/logo.png" className="w-full object-cover" alt="" />
                    </div>
                    <form className="w-full space-y-5 flex flex-col 2xl:pb-5" action="">
                        <div className='w-full relative'>
                            <FontAwesomeIcon icon={faEnvelope} className='text-gray-600 dark:text-white text-[18px] absolute font-semibold top-4 left-2' />
                            <input value={signInData.email ?? ""} onChange={(e) => {
                                setSignInData({
                                    ...signInData,
                                    email: e.target.value
                                })
                            }} placeholder="Email" className="py-3 dark:bg-white px-8 w-full outline-none text-gray-600 " type="email" name="" id="" />
                        </div>
                        <div className='w-full relative'>
                            <FontAwesomeIcon icon={faLock} className='text-gray-600 dark:text-white  text-[18px] absolute font-semibold top-4 left-2' />
                            <input value={signInData.password ?? ""} onChange={(e) => {
                                setSignInData({
                                    ...signInData,
                                    password: e.target.value
                                })
                            }} placeholder="Mot de passe" className="py-3 dark:bg-white  px-8 w-full outline-none text-gray-600" type={showPassword ? "text" : "password"} maxLength={12} name="" id="" />
                            <FontAwesomeIcon onClick={() => {
                                setShowPassword(!showPassword)
                            }} icon={showPassword ? faEye : faEyeSlash} className='text-gray-600 dark:text-white cursor-pointer text-[18px] absolute top-4 right-2' />
                        </div>
                        <button type="button" onClick={() => {
                            handleSingnIn()
                        }} className="bg-blue-600 text-white  py-3.5 hover:bg-blue-700 ease duration-500 rounded-full font-semibold">
                            <p className={loadingHandleSignIn ? "hidden" : "block"}>Connexion</p>
                            <p className={loadingHandleSignIn ? "block" : "hidden"}>
                                <ClipLoader size={15} color='#fff' />
                            </p>
                        </button>
                        <Link href="" className="hover:font-semibold hover:ease hover:duration-500 w-[155px] hover:w-[170px] border-b text-white">
                            Mot de passe oublié ?
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}