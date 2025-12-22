"use client";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { tablesModal } from "@/components/Tables/tablesModal";
import Swal from "sweetalert2";
import TablesPage from "@/app/tables/page";
import { PostsListHook } from "./hook";


export default function SalariesList() {

    const { salariesListCloned, start, maxPage, onSearch, requireAdminRoles, getAdminRole, limit, setPage, page } = PostsListHook();

    return (
        <div>
            <Header />
            <div className="flex justify-center w-full mx-auto">
                <Sidebar />

                <main className='m-4 bg-gray-100 font-semibold text-gray-700 dark:text-gray-300 dark:bg-transparent w-full'>
                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">{e.salariesList.pageTitle}  </h1>
                                <p className='text-blue-700 dark:text-blue-600 hidden xl:block'>{e.salariesList.path}</p>
                            </div>
                        ))
                    }
                    <hr className='bg-gray-400 border-0 h-[1px]' />
                    <div className="flex flex-col space-y-4 xl:space-y-0  lg:flex-row items-center justify-between">
                        <div className="relative w-[250px]">
                            <input
                                type="text"
                                placeholder="Rechercher par poste..."
                                className="border  outline-none border-gray-300 dark:bg-transparent px-3 py-2.5 rounded-md my-6 w-full"
                                onChange={(e) => {
                                    onSearch(e.target.value)
                                }}
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute text-gray-400 right-3 top-[38px]" />
                        </div>
                        {
                            tablesModal.map((e) => (
                                e.salariesList.links.map((item) => (
                                    <Link href={item.href} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-3 px-4">
                                        <FontAwesomeIcon icon={item.icon} className="text-white" />
                                        <span className='text-white font-semibold'> {item.title}</span>
                                    </Link>
                                ))

                            ))
                        }
                    </div>

                    {/* 🧾 Tableau */}
                    <table className="border w-full  mx-auto">
                        <thead>
                            <tr className="bg-gray-800 dark:bg-transparent ">
                                {
                                    tablesModal.map((e) => (
                                        e.salariesList.table.titles.map((item) => (
                                            <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-300  2xl:px-10 px-2 dark:text-gray-300">{item.title}</th>
                                        ))
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="w-full">
                            {
                                salariesListCloned.length > 0 ? salariesListCloned.slice(start, start + limit).map((u) => (
                                    <tr className="">
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u.grossSalary + " FCFA"}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u.dailySalary + " FCFA"}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u?.Enterprise.name}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u?.Post.title}</td>
                                        <td className="text-center py-5 font-semibold border-b border-r  space-x-3 flex justify-center h-auto p-2 border-gray-400 dark:border-gray-300">
                                            <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" onClick={() => {
                                                if (!requireAdminRoles.includes(getAdminRole ?? "")) {
                                                    return Swal.fire({
                                                        icon: "warning",
                                                        title: "Violation d'accès!",
                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                    });
                                                }
                                            }}>
                                                <Link href={`/dashboard/ADMIN/updateSalary/${u.id}`} >
                                                    <p className="text-center">🖊️</p>
                                                </Link>
                                            </button>
                                            <button type="button" onClick={() => {
                                                if (!requireAdminRoles.includes(getAdminRole ?? "")) {
                                                    return Swal.fire({
                                                        icon: "warning",
                                                        title: "Vioaltion d'accès!",
                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                    })
                                                }
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Voulez-vous supprimer ce poste ?",
                                                    showCancelButton: true,
                                                    cancelButtonText: "Annuler",
                                                    confirmButtonText: "Oui"
                                                }).then(async (confirmed) => {
                                                    if (confirmed.isConfirmed) {
                                                        const response = await controllers.API.deleteOne(urlAPI, "deletePost", u.id, {});
                                                        controllers.alertMessage(response.status, response.title, response.message, "/pages/dashboard/ADMIN/postsList")
                                                    }
                                                })
                                            }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">🗑️</p>
                                            </button>
                                        </td>
                                    </tr>

                                )) :
                                    <tr>
                                        <td>
                                            <p className="text-center absolute left-1/2 right-1/2 w-[200px] mt-3">
                                                Aucune donnée trouvée
                                            </p>
                                        </td>
                                    </tr>

                            }

                        </tbody>
                    </table>

                    {/* 🔄 Pagination */}
                    <div className="flex items-center justify-center space-x-4 mt-14">
                        <button
                            className="px-4 py-2 bg-green-500 ease duration-500 hover:bg-green-600 text-white font-semibold rounded disabled:opacity-40"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Suivant
                        </button>

                        <span>Page {page} / {maxPage}</span>

                        <button
                            className="px-4 py-2  font-semibold text-white ease duration-500 hover:bg-red-600 bg-red-500 rounded disabled:opacity-40"
                            onClick={() => setPage(page + 1)}
                            disabled={page === maxPage}
                        >
                            Précédent
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
