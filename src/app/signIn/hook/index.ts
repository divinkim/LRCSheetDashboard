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
    const [message, setMessage] = useState("");

    const [loadingHandleSignIn, setLoadingHandleSignIn] = useState(false)

    const handleSingnIn = async () => {
        setLoadingHandleSignIn(true);
        const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;
        const regexPassWord = /^[a-zA-Z0-9ù*!.-_]{4,}$/;

        if (!regexEmail.test(signInData.email ?? "") || !regexPassWord.test(signInData.password ?? "")) {
            setTimeout(() => {
                setLoadingHandleSignIn(false);
                setMessage("Authentification échouée, veuillez renseigner des identifiants valides.");
            }, 1000);
        }

        const response = await controllers.API.SendOne(urlAPI, "loginFromAdmin", null, { email: signInData.email, password: signInData.password });

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
                setTimeout(() => {
                    setLoadingHandleSignIn(false);
                    setMessage("Vous n'avez aucun droit d'accès sur cette plateforme, veuillez contacter votre administrateur local.")
                });
                return;
            }

            for (const [key, value] of Object.entries(localStorageData)) {
                localStorage.setItem(`${key}`, `${value}`);
            }

            window.location.assign("/home");
        }

        setTimeout(() => {
            setLoadingHandleSignIn(false);
            setMessage(response.message);
        }, 1000);
    }

    return { signInData, setSignInData, showPassword, setShowPassword, loadingHandleSignIn, handleSingnIn, message, setMessage }
}