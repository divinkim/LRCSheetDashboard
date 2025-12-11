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

type EnterpriseProps = {
    id: number,
    name: string | null,
    description: string | null,
    logo: string | null,
    activityDomain: string | null,
    phone: string | null,
    toleranceTime: string | null,
    pourcentageOfHourlyDeduction: string | null,
    email: string | null,
    address: string | null,
    website: string | null,
    latitude: string | null,
    longitude: string | null,
    CityId: number,
    CountryId: number,
    legalForm: string | null,
    rccm: string | null,
    nui: string | null,
    subscriptionType: string | null,
    subscriptionStatus: string | null,
    [key: string]: string | number | null | undefined,
}

export default function UsersList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page
    const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([]);
    const [enterprisesListSaved, setEnterprisesListSaved] = useState<EnterpriseProps[]>([])
    const [getAdminRole, setAdminRole] = useState<string|null>()
    const [loading, setIsLoading] = useState(false);
    const requireRoles = ['Super-Admin', 'Supervisor-Admin'];

    useEffect(() => {
        (() => {
            if (typeof (window) === "undefined") return;
            const authToken = localStorage.getItem("authToken");
            const getAdminRole = localStorage.getItem("adminRole");

            if (authToken === null) {
                window.location.href = "/"
            }
            setAdminRole(getAdminRole);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const getAllEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);
            setEnterprisesListSaved(getAllEnterprises);
            setEnterprises(getAllEnterprises);
        })()
    }, []);

    // 🔎 Filtrer par recherche
    function onSearch(value: string) {
        let filteredEntreprises = enterprisesListSaved.filter(item => item?.name?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()));
        setEnterprises(filteredEntreprises);
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(enterprises.length / limit);

    return (
        <div>
            <Header />
            <div className="flex justify-center w-full mx-auto">
                <Sidebar />

                <main className='m-4 bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-transparent'>
                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">{e.enterprisesList.pageTitle}  </h1>
                                <p className='text-blue-700 dark:text-blue-600 hidden xl:block'>{e.enterprisesList.path}</p>
                            </div>
                        ))
                    }
                    <hr />
                    <div className="flex flex-col space-y-4 xl:space-y-0  lg:flex-row items-center justify-between">
                        <div className="relative w-[250px]">
                            <input
                                type="text"
                                placeholder="Rechercher un profil..."
                                className="border shadow-xl outline-none dark:border-gray-200 dark:bg-transparent px-3 py-2.5 rounded-xl my-6 w-full"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    onSearch(e.target.value)
                                    setPage(1); // reset page quand on tape
                                }}
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute text-gray-400 right-3 top-[38px]" />
                        </div>
                        {
                            tablesModal.map((e) => (
                                e.enterprisesList.links.map((item) => (
                                    <Link href={item.href} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded">
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
                                        e.enterprisesList.table.titles.map((item) => (
                                            <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-300  2xl:px-10 px-2 dark:text-gray-300">{item.title}</th>
                                        ))
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="w-full font-semibold">

                            {

                                enterprises.length > 0 ? enterprises.slice(start, start + limit).map((enterprise) => (
                                    <tr className="">

                                        <td className="border p-2 border-gray-400 dark:border-gray-300">
                                            {enterprise.logo ? <img src={`${urlAPI}/images/${enterprise.logo}`} className="w-[50px] mx-auto h-[50px] object-cover rounded-full" alt="" /> : <p className="text-center text-[40px]">
                                                🏭
                                            </p>}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            {enterprise.description}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            {(enterprise?.activityDomain ?? "")?.length > 10 ? enterprise.activityDomain?.slice(0, 9) + "..." : enterprise.activityDomain}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            {(enterprise?.phone ?? "")?.length > 7 ? enterprise.phone?.slice(0, 7) + "..." : enterprise.phone}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            {(enterprise?.email ?? "")?.length > 7 ? enterprise.email?.slice(0, 7) + "..." : enterprise.email}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            {enterprise.subscriptionType}
                                        </td>
                                        <td className="border p-2 border-gray-400 text-center dark:border-gray-300">
                                            <p className={enterprise.subscriptionStatus === "expired" ? "bg-red-500 text-white text-center rounded-full p-3" : "bg-green-500 text-white text-center rounded-full p-3"}>
                                                {enterprise.subscriptionStatus === "expired" ? "expiré" : "en cours..."}
                                            </p>
                                        </td>
                                        <td className="text-center py-5 font-semibold border-b border-r  space-x-3 flex  h-auto p-2 border-gray-400 dark:border-gray-300">
                                            <Link href={`../RH/getUserProfil/${enterprise.id}`} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">👁️</p>
                                            </Link>
                                            <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" onClick={() => {
                                                if (!requireRoles.includes(getAdminRole ?? "")) {
                                                    return Swal.fire({
                                                        icon: "warning",
                                                        title: "Vioaltion d'accès!",
                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                    })
                                                }
                                                window.location.href = "/pages/dashboard/OTHERS/updateEnterprise/" + enterprise.id
                                            }}>
                                                <p className="text-center">🖊️</p>
                                            </button>
                                            <button type="button" onClick={() => {
                                                if (!requireRoles.includes(getAdminRole ?? "")) {
                                                    return Swal.fire({
                                                        icon: "warning",
                                                        title: "Vioaltion d'accès!",
                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                    })
                                                }
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Voulez-vous supprimer cette entreprise? ",
                                                    showCancelButton: true,
                                                    cancelButtonText: "Annuler",
                                                    confirmButtonText: "Oui"
                                                }).then(async (confirmed) => {
                                                    if (confirmed.isConfirmed) {
                                                        const response = await controllers.API.deleteOne(urlAPI, "deleteEnterprise", enterprise.id, {});
                                                        controllers.alertMessage(response.status, response.title, response.message, "/pages/dashboard/OTHERS/enterprisesList")
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
