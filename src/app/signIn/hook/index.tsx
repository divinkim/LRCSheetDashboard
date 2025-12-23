"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { controllers, urlAPI } from '../../main';
import { ClipLoader } from 'react-spinners';
import { messaging } from "@/firebase/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

type SignInput = {
    email: string | null,
    password: string | null
}

export function SignInHook() {
    useEffect(() => {
        (async () => {
            await Notification.requestPermission().then(async (permission) => {
                if (permission === "granted") {
                    if (!messaging) return
                    const adminFcmToken = await getToken(messaging, {
                        vapidKey: "BM91689dVSwzQt0EWC0MmE0UBLvdkXzahkR0-UFppnWI3rOP8OTakisMCaxco0lXPZzx6jmxbtsbzWECTN6K6lg",
                    });
                    adminFcmToken ? window?.localStorage.setItem("adminFcmToken", adminFcmToken) : "";
                }
            })
        })();
    }, [])

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

        const response = await controllers.API.SendOne(urlAPI, "loginFromAdmin", null, { email: signInData.email, password: signInData.password });
        console.log(response.user)
        if (response.status) {
            const localStorageData = {
                id: response.user.id.toString(),
                firstname: response.user.firstname,
                lastname: response.user.lastname,
                image: response.user.image,
                authToken: response.user.authToken,
                adminRole: response.user?.adminRole,
                EnterpriseId: response.user?.EnterpriseId,
                adminService: response.user.adminService,
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
            return window.location.assign("/home");
        }
        setTimeout(() => {
            controllers.alertMessage(response.status, response.title, response.message, null);
            setLoadingHandleSignIn(false);
        }, 1000)
    }

    return { signInData, setSignInData, showPassword, setShowPassword, loadingHandleSignIn, handleSingnIn }
}