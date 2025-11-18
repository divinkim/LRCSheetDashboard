"use client";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type PresencesDats = {
    arrivalTime: string | null,
    departureTime: string | null,
    breakingStartTime: string | null,
    resumeTime: string | null,
    UserId: number | null,
    mounth: number | null,
    day: string | null,
    createdAt: string | null
    updatedAt: string | null,
    status: string | null
    EnterpriseId: number | null,
    User: {
        firstname: string | null,
        lastname: string | null,
        photo: string | null,
    },
    Planning: {
        startTime: string | null,
        breakingStartTime: string | null,
        resumeEndTime: string | null,
        endTime: string | null,
    },
    Enterprise: {
        name: string | null,
        logo: string | null,
    }
}

export default function PresencesList() {
    const [presencesList, setPresencesList] = useState<PresencesDats[]>([]);
    const [savedPresencesList, setSavedPresencesList] = useState<PresencesDats[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page
    const [currentMonthValue, setCurrenMonthValue] = useState(new Date().getMonth())

    useEffect(() => {
        (async () => {
            const presencesList = await controllers.API.getAll(urlAPI, "getAllAttendances", null);
            if (Array.isArray(presencesList)) {
                const filterPresencesByMonth = presencesList.filter(presence => presence.mounth === currentMonthValue)
                setSavedPresencesList(filterPresencesByMonth);
                setPresencesList(presencesList);
            }
        })()
    }, []);
    console.log("la putain de liste", presencesList)
    // 🔎 Filtrer par recherche

    function onSearch(value: string) {
        let filtered = presencesList.filter(item => item.User?.lastname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || item.User?.firstname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()));
        setSavedPresencesList(filtered)
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(savedPresencesList.length / limit);

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className='m-4 bg-gray-100 dark:bg-transparent'>
                    <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">Liste des présences enregistrées</h1>
                    <hr />
                    <div className="relative w-[250px]">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="border shadow-xl outline-none dark:border-gray-200 dark:bg-transparent px-3 py-2.5 rounded-full my-4 w-full"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                onSearch(e.target.value)
                                setPage(1); // reset page quand on tape
                            }}
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute text-gray-400 right-3 top-8" />
                    </div>


                    {/* 🧾 Tableau */}
                    <table className="border w-full">
                        <thead>
                            <tr className="bg-gray-800 dark:bg-transparent ">
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Profil</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Noms</th>
                                <th className="border  py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Arrivée & pause</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Reprise et départ</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Planning horaire</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Date et jour</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">satuts</th>
                                <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="w-full">
                            {
                                savedPresencesList.length > 0 ? savedPresencesList.slice(start, start + limit).map((u) => (
                                    <tr className="">
                                        <td className="border p-2 border-gray-400 dark:border-gray-300">
                                            {u.User.photo ? <img src={`${urlAPI}/images/${u.User.photo}`} className="w-[50px] mx-auto h-[50px] object-cover rounded-full" alt="" /> : <p className="text-center text-[40px]">
                                                🧑‍💼
                                            </p>}
                                        </td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u.User?.lastname} {u.User?.firstname}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.arrivalTime} - {u?.breakingStartTime ?? "--"}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u?.resumeTime ?? "--"} - {u?.departureTime ?? "--"}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.Planning?.startTime ? u.Planning.startTime.slice(0, 5) : "--"} - {u.Planning?.endTime ? u.Planning.endTime.slice(0, 5) : "--"}</td>
                                        <td className="border w-[155px] p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{new Date(u.createdAt ?? "").toLocaleDateString('fr-Fr', {
                                            day: "numeric",
                                            weekday: "short",
                                            month: "short",
                                            year: "numeric",
                                        })}</td>
                                        <td className="p-2 border border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.status === "A temps" ? "✅ A temps" : u.status === "⏳ En retard" ? "En retard" : "❌ Absent"}</td>


                                        <td className="text-center font-semibold border w-[155px]  space-x-3  h-auto p-2 border-gray-400 dark:border-gray-300">
                                            <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">👁️</p>
                                            </button>
                                            <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">🖊️</p>
                                            </button>
                                            <button className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">🗑️</p>
                                            </button>
                                        </td>
                                    </tr>
                                )) :
                                    <p className="text-center absolute left-1/2 right-1/2 w-[200px] mt-3">
                                        Aucune donnée trouvée
                                    </p>
                            }

                        </tbody>
                    </table>

                    {/* 🔄 Pagination */}
                    <div className="flex items-center justify-center  gap-4 mt-10">
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
    );
}
