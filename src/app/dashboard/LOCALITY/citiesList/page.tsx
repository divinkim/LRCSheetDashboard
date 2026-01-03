"use client";
import { GetDistrictsHook } from "./hook";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { tablesModal } from "@/components/Tables/tablesModal";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { controllers, urlAPI } from "@/app/main";
import AddQuarter from "../addQuarter/page";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AddCity from "../addCity/page";

export default function GetCities() {
    const { citiesArrayCloned, page, setPage, limit, requireAdminRoles, getAdminRole } = GetDistrictsHook();
    const [isVisibleFormQuarter, setIsVisibleFormAddQuarter] = useState(false);
    const [isVisibleFormDistrict, setIsVisibleFormAddDistrict] = useState(false);
    const [isVisibleFormCountry, setIsVisibleFormAddCountry] = useState(false);
    const [isVisibleFormCity, setIsVisibleFormAddCity] = useState(false);

    const start = (page - 1) * limit;
    const maxPage = Math.ceil(citiesArrayCloned.length / limit);
    return (
        <div>
            <Header />
            <div className="flex justify-center w-full mx-auto">
                <Sidebar />

                <main className='bg-gray-100 z-1 relative w-full text-gray-700 dark:text-gray-300 dark:bg-transparent'
                >
                    <div onClick={() => {
                        setIsVisibleFormAddCountry(false);
                        setIsVisibleFormAddCity(false);
                    }} className={!isVisibleFormCity ? "hidden" : "absolute cursor-pointer text-white top-8 right-8 z-30"}>
                        <FontAwesomeIcon className="text-[20px]" icon={faTimes} />
                    </div>
                    <AddCity isVisibleForm={isVisibleFormCity} />
                    <div className="px-4">
                        {
                            tablesModal.map((e) => (
                                <div className="flex justify-between font-semibold items-center">
                                    <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">{e.citiesList.pageTitle}  </h1>
                                    <p className='text-blue-700 font-semibold dark:text-blue-600 hidden xl:block'>{e.citiesList.path}</p>
                                </div>
                            ))
                        }
                        <hr className='' />
                        <div className="flex flex-col  space-y-4 lg:space-y-0 lg:space-x-4 my-6 lg:flex-row items-center justify-end">
                            {/* <div className="relative w-[250px]">
                        <input
                            type="text"
                            placeholder="Rechercher un profil..."
                            className="border  outline-none border-gray-300 dark:bg-transparent px-3 py-2.5 rounded-md my-6 w-full"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                onSearch(e.target.value)
                                setPage(1); // reset page quand on tape
                            }}
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute text-gray-400 right-3 top-[38px]" />
                    </div> */}
                            {
                                tablesModal.map((e) => (
                                    e.citiesList.links.map((item) => (
                                        <Link href="" onClick={() => {
                                            if (item.title === "Ajouter une ville") {
                                               return setIsVisibleFormAddCity(true);
                                            }
                                        }} className="bg-blue-800 font-semibold hover:bg-blue-900 ease duration-500 py-3 px-4">
                                            <FontAwesomeIcon icon={item.icon} className="text-white" />
                                            <span className='text-white font-semibold'> {item.title}</span>
                                        </Link>
                                    ))

                                ))
                            }
                        </div>

                        {/* 🧾 Tableau */}
                        <table className="border w-full mx-auto">
                            <thead>
                                <tr className="bg-gray-800 dark:bg-transparent ">
                                    {
                                        tablesModal.map((e) => (
                                            e.citiesList.table.titles.map((item) => (
                                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-300  2xl:px-10 px-2 dark:text-gray-300">{item.title}</th>
                                            ))
                                        ))
                                    }
                                </tr>
                            </thead>

                            <tbody className="w-full">

                                {

                                    citiesArrayCloned.length > 0 ? citiesArrayCloned.slice(start, start + limit).map((u) => (
                                        <tr className="">
                                            <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u.name}</td>
                                            <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u?.Country?.name}</td>

                                            <td className="text-center py-5 font-semibold border-b border-r  space-x-3 flex justify-center h-auto p-2 border-gray-400 dark:border-gray-300">
                                                {/* <Link onClick={() => {
                                                    if (!requireAdminRoles.includes(getAdminRole ?? "")) {
                                                        Swal.fire({
                                                            icon: 'warning',
                                                            title: "Violation d'accès!",
                                                            text: "Vous n'avez aucun droit d'effectuer cette action. Contacter votre administrateur de gestion",
                                                        });
                                                    }
                                                }} href={requireAdminRoles.includes(getAdminRole ?? "") ? `/dashboard/RH/getUserProfil/${u.id}` : ""} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                    <p className="text-center">👁️</p>
                                                </Link> */}
                                                {/* <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" onClick={() => {
                                                    if (!requireAdminRoles.includes(getAdminRole ?? "")) {
                                                        return Swal.fire({
                                                            icon: "warning",
                                                            title: "Vioaltion d'accès!",
                                                            text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                        });
                                                    }
                                                }}>
                                                    <Link href={requireAdminRoles.includes(getAdminRole ?? "") ? `/dashboard/RH/updateUser/${u.id}` : ""} >
                                                        <p className="text-center">🖊️</p>
                                                    </Link>
                                                </button> */}
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
                                                        title: "Voulez-vous supprimer ce collaborateur? ",
                                                        showCancelButton: true,
                                                        cancelButtonText: "Annuler",
                                                        confirmButtonText: "Oui"
                                                    }).then(async (confirmed) => {
                                                        if (confirmed.isConfirmed) {
                                                            const response = await controllers.API.deleteOne(urlAPI, "deleteQuarter", u.id, {});
                                                            controllers.alertMessage(response.status, response.title, response.message, "")
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
                    </div>
                </main>
            </div>
        </div>
    )

}