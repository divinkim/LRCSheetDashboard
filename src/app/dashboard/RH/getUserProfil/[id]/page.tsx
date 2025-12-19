"use client";
import { controllers, urlAPI } from "@/app/main";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { useEffect, useState } from "react";
import { GetUserHookModal } from "../hook";
export default function GetUserProfil() {

    const { userData } = GetUserHookModal();

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mt-6 mb-4 w-[80%] xl:w-[70%] mx-auto">

                    <div className="flex justify-between mb-6">
                        <h1 className='dark:text-gray-300 text-[20px] text-gray-700 font-bold'>Profil de l'utilisateur</h1>
                        <p className="text-blue-600">Dashboard / RH / Profil utilisateur</p>
                    </div>

                    <hr className="bg-gray-400 h-[1px] border-0" />

                    <div className="mt-10 rounded-xl">

                        {/* Photo */}
                        <div className="flex justify-center py-16 bg-gray-500  relative ">
                            {userData[7]?.value ? (
                                <img
                                    className="object-cover w-[200px] h-[200px] rounded-full border border-gray-400"
                                    src={`${urlAPI}/images/${userData[6]?.value}`}
                                />
                            ) : (
                                <div className="w-[150px] h-[150px] bg-gray-300 rounded-full"></div>
                            )}
                        </div>

                        {/* <hr className="bg-gray-400 h-[1px] border-0" /> */}

                        {/* Informations */}
                        <div className="grid grid-cols-1 w-full px-6 bg-gray-900 gark:bg-gray-800 text-gray-300 pt-10 pb-24 pl-5 lg:grid-cols-2 gap-5 font-semibold">
                            {
                                userData.map((user) => (
                                    <p className={user.alias === "Photo" ? "hidden" : "block"}><span className="font-bold">{user.alias} :</span> {user.value}</p>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
