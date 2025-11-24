"use client";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { tablesModal } from "@/components/Tables/tablesModal";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PresencesDatas = {
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
    EnterpriseId: number,
    SalaryId: number,
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

type AddPresenceProps = {
    arrivalTime: string | null,
    createdAt: string | null,
    usersIds: number[],
    salariesIds: number[],
    enterprisesIds: number[],
}

export default function PresencesList() {
    const [presencesList, setPresencesList] = useState<PresencesDatas[]>([]);
    const [savedPresencesList, setSavedPresencesList] = useState<PresencesDatas[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page
    const [currentMonthValue, setCurrenMonthValue] = useState(new Date().getMonth());
    const [isLoading, setIsLoading] = useState(false);
    const [showAddPresenceModal, setShowAddPresenceModal] = useState(false)

    const [addPresenceInputs, setAddPresenceInputs] = useState<AddPresenceProps>({
        arrivalTime: "",
        createdAt: "",
        usersIds: [],
        salariesIds: [],
        enterprisesIds: [],
    });

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

    // 🔎 Filtrer par recherche

    function onSearch(value: string) {
        let filtered = presencesList.filter(item => item.User?.lastname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || item.User?.firstname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()));
        setSavedPresencesList(filtered)
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(savedPresencesList.length / limit);

    const handleAddPresence = async () => {
        setIsLoading(true);
        const response = await controllers.API.SendOne(urlAPI, "addAttendanceFromAdmin", null, addPresenceInputs)

        const status = response.status;
        const title = response.title;
        const message = response.message;
        const path = status ? "/pages/dashboard/listPresences" : null

        controllers.alertMessage(status, title, message, path);
        setIsLoading(false);
        if (status) {
            setAddPresenceInputs({
                arrivalTime: "",
                createdAt: "",
                usersIds: [],
                salariesIds: [],
                enterprisesIds: [],
            })
        }
    }

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className='m-4 bg-gray-100 dark:bg-transparent text-gray-700 dark:text-gray-300'>
                    {/*Modal d'ajout de présence */}
                    {
                        showAddPresenceModal ? <div className="flex-1 dark:bg-gray-800 shadow-md flex duration-500 rounded-xl ease fixed sm:top-[20%] 2xl:top-[15%]  w-[35%] mx-auto xl:w-[35%]  z-20 overflow-hidden md:left-[43%]  p-5  bg-gray-100 2xl:left-[40%]">
                            <button onClick={() => {
                                setShowAddPresenceModal(!showAddPresenceModal)
                            }} className="absolute dark:text-gray-300 text-gray-700 right-6 top-[30px]">
                                <FontAwesomeIcon icon={faTimes} className="text-[20px]" />
                            </button>
                            <form action="" className="w-full mt-2">
                                <h1 className="text-center dark:text-gray-300  font-semibold text-xl mb-4">Ajouter une présence</h1>
                                <span className="relative">
                                    <span className="text-red-500 mb-1">* Champs obligatoires</span>
                                </span>
                                <div className="w-full lg:flex mt-4 flex-col">
                                    <div className="flex flex-col mb-3 w-full relative">
                                        <label htmlFor="" className="mb-2 dark:text-gray-300">Rechercher un collaborateur</label>
                                        <input placeholder="Recherche..." className="border outline dark:bg-transparent border-gray-400 dark:placeholder-gray-300 dark:text-gray-300 rounded p-3 w-full outline-none" onChange={(e) => {
                                            setSearch(e.target.value)
                                            onSearch(e.target.value)
                                            setPage(1); // reset page quand on tape
                                        }} type="text" />
                                        <FontAwesomeIcon icon={faSearch} className="absolute text-gray-700 dark:text-gray-300 bottom-4 right-4 " />
                                    </div>
                                    <div className="flex flex-col space-x-3 lg:flex-row mb-3 w-full">
                                        <div className="w-full">
                                            <label htmlFor="" className="mb-2 dark:text-gray-300">Arrivée <span className="text-red-500">* </span> </label>
                                            <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={addPresenceInputs.arrivalTime ?? ""} onChange={(e) => {
                                                setAddPresenceInputs({
                                                    ...addPresenceInputs,
                                                    arrivalTime: e.target.value
                                                })
                                            }} type="time" />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="" className="mb-2 dark:text-gray-300">Date<span className="text-red-500">* </span> </label>
                                            <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={addPresenceInputs.createdAt ?? ""} onChange={(e) => {
                                                setAddPresenceInputs({
                                                    ...addPresenceInputs,
                                                    createdAt: e.target.value
                                                })
                                            }} type="date" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mt-5 space-x-4 justify-between flex-row">
                                    <div className="flex flex-col overflow-y-auto space-y-4">
                                        <div className="flex space-x-2 mb-2">
                                            <div>
                                                <button type="button" className="bg-green-600 text-white p-2 rounded-md hover:scale-105 ease duration-500">Tout sélectionner</button>
                                            </div>

                                            <div>
                                                <button type="button" className="bg-red-600 text-white p-2 rounded-md hover:scale-105 ease duration-500">Tout déselectionner</button>
                                            </div>
                                        </div>
                                        <div className='h-[50px]'>
                                            {
                                                savedPresencesList.map((user) => (
                                                    <div className="flex flex-row space-y-4 mb-4 dark:text-gray-300 items-center space-x-3">
                                                        <img src={user?.User?.photo ? `${urlAPI}/images/${user?.User?.photo}` : "/images/logo.png"} className="w-10 h-10 object-cover rounded-full" alt="" />
                                                        <p>{user?.User?.firstname?.slice(0, 5) + "..."} {user?.User?.lastname}</p>
                                                        <input className="dark:bg-transparent" type="checkbox" value={user.UserId ?? ""} onChange={(e) => {
                                                            setAddPresenceInputs({
                                                                ...addPresenceInputs,
                                                                usersIds: addPresenceInputs.usersIds.includes(parseInt(e.target.value)) ? addPresenceInputs.usersIds.filter(UserId => parseInt(e.target.value) !== UserId) : [
                                                                    ...addPresenceInputs.usersIds,
                                                                    parseInt(e.target.value)
                                                                ],
                                                                salariesIds:
                                                                    addPresenceInputs.salariesIds.includes(user?.SalaryId) ? addPresenceInputs.salariesIds.filter(UserId => user.SalaryId !== UserId) : [
                                                                        ...addPresenceInputs.salariesIds,
                                                                        user.SalaryId
                                                                    ],
                                                                enterprisesIds: addPresenceInputs.enterprisesIds.includes(user?.EnterpriseId) ? addPresenceInputs.enterprisesIds.filter(UserId => user.EnterpriseId !== UserId) : [
                                                                    ...addPresenceInputs.enterprisesIds,
                                                                    user.EnterpriseId
                                                                ],
                                                            })
                                                        }} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>


                                </div>
                                <button className="bg-blue-700 ease hover:bg-blue-800 duration-500 text-white px-5 py-2 rounded mt-6" type="button" onClick={() => {
                                    handleAddPresence()
                                }}>
                                    <p className={isLoading ? "hidden" : "block"}> + Ajouter</p>
                                    <p className={isLoading ? "block relative top-0.5" : "hidden"}>
                                        <ClipLoader size={16} color="#fff" />
                                    </p>
                                </button>
                            </form>
                        </div> : <div></div>
                    }

                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">{e.presencesList.pageTitle}  </h1>
                                <button className='text-blue-700 dark:text-blue-600 hidden xl:block'>{e.presencesList.path}</button>
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
                                e.presencesList.links.map((item) => (
                                    <Link href={item.href} onClick={() => {
                                        if (item.href === "") {
                                            setShowAddPresenceModal(!showAddPresenceModal)
                                        }
                                    }} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded">
                                        <FontAwesomeIcon icon={item.icon} className="text-white" />
                                        <span className='text-white font-semibold'> {item.title}</span>
                                    </Link>
                                ))

                            ))
                        }
                    </div>


                    {/* 🧾 Tableau */}
                    <table className="border w-full">
                        <thead>
                            <tr className="bg-gray-800 dark:bg-transparent ">

                                {
                                    tablesModal.map((item) => (
                                        item.presencesList.table.titles.map((e) => (
                                            <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-200  2xl:px-10 px-2 dark:text-gray-300">{e.title}</th>
                                        ))
                                    ))
                                }
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
                                        {/* <td className="border p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.Planning?.startTime ? u.Planning.startTime.slice(0, 5) : "--"} - {u.Planning?.endTime ? u.Planning.endTime.slice(0, 5) : "--"}</td> */}
                                        <td className="border w-[155px] p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{new Date(u.createdAt ?? "").toLocaleDateString('fr-Fr', {
                                            day: "numeric",
                                            weekday: "short",
                                            month: "short",
                                            year: "numeric",
                                        })}</td>
                                        <td className="p-2 border border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.Enterprise?.logo ? <img src={`${urlAPI}/images/${u.Enterprise?.logo}`} className="w-[50px] mx-auto h-[50px] object-cover rounded-full" alt="" /> : u.Enterprise?.name}</td>

                                        <td className="p-2 border border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.status === "A temps" ? "✅ A temps" : u.status === "En retard" ? "⏳ En retard" : "❌ Absent"}</td>


                                        <td className="text-center font-semibold border w-[155px]  space-x-3  h-auto p-2 border-gray-400 dark:border-gray-300">
                                            
                                            <button onClick={() => {
                                            }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
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
