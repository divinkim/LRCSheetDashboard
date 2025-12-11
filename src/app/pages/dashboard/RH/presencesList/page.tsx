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
import { getOriginalStackFrames } from "next/dist/next-devtools/shared/stack-frame";
import Swal from "sweetalert2";

type PresencesDatas = {
    arrivalTime: string | null,
    departureTime: string | null,
    breakStartTime: string | null,
    resumeTime: string | null,
    UserId: number,
    mounth: number | null,
    day: string | null,
    createdAt: string | null
    updatedAt: string | null,
    status: string | null
    EnterpriseId: number,
    SalaryId: number,
    PlanningId: number,
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

type UpdatePresenceProps = {
    usersIds: number[],
    arrivalTime: string | null,
    departureTime: string | null,
    resumeTime: string | null,
    breakStartTime: string | null,
    createdAt: string | null,
}

export default function PresencesList() {
    const [presencesList, setPresencesList] = useState<PresencesDatas[]>([]);
    const [savedPresencesList, setSavedPresencesList] = useState<PresencesDatas[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page
    const [currentMonthValue, setCurrenMonthValue] = useState(new Date().getMonth());
    const [isLoading, setIsLoading] = useState(false);
    const [showAddPresenceModal, setShowAddPresenceModal] = useState(false);
    const [showUpdatePresenceModal, setShowUpdatePresenceModal] = useState(false);
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'];

    const [createdAt, setCreatedAt] = useState<string | null>(null);
    const [adminRole, setAdminRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("adminRole");;
        setAdminRole(role);
    }, []);

    const [addPresenceInputs, setAddPresenceInputs] = useState<AddPresenceProps>({
        arrivalTime: "",
        createdAt: "",
        usersIds: [],
        salariesIds: [],
        enterprisesIds: [],
    });

    const [updatePresenceInputs, setUpdatePresenceInputs] = useState<UpdatePresenceProps>({
        usersIds: [],
        arrivalTime: "",
        breakStartTime: "",
        resumeTime: "",
        departureTime: "",
        createdAt,
    })

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
        var filteredUserAttendances;

        if ((showAddPresenceModal || !showAddPresenceModal) && !showUpdatePresenceModal) {
            filteredUserAttendances = presencesList.filter(item => item.User?.lastname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || item.User?.firstname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()));
            if (showAddPresenceModal) {
                const getLastElement = filteredUserAttendances.at(-1)
                if (value === "") {
                    return setSavedPresencesList(presencesList)
                }
                return setSavedPresencesList(getLastElement ? [getLastElement] : presencesList);

            }
            return setSavedPresencesList(filteredUserAttendances);
        }

        let filterUser = presencesList.filter(user => (user.UserId === parseInt(value) && user.createdAt === createdAt) || (user.User?.lastname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || user.User?.firstname?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()))).at(0);
        if (value === "") {
            return setSavedPresencesList(presencesList)
        }
        setSavedPresencesList(filterUser && filterUser.EnterpriseId !== null ? [filterUser] : presencesList)
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(savedPresencesList.length / limit);

    const handleAddPresence = async () => {
        setIsLoading(true);
        console.log(addPresenceInputs)
        const response = await controllers.API.SendOne(urlAPI, "addAttendanceFromAdmin", null, addPresenceInputs)

        const status = response.status;
        const title = response.title;
        const message = response.message;
        const path = status ? "/pages/dashboard/RH/presencesList" : null

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
    const handleUpdatePresence = async () => {
        setIsLoading(true);

        if (!updatePresenceInputs.createdAt) {
            controllers.alertMessage(
                false, "Champs invalides", "Veuillez saisir la date à modifier", null
            );
            setIsLoading(false);
            return;
        }

        const response = await controllers.API.UpdateOne(urlAPI, "updateAttendance", null, updatePresenceInputs)

        const status = response.status;
        const title = response.title;
        const message = response.message;
        const path = status ? "/pages/dashboard/RH/presencesList" : null

        controllers.alertMessage(status, title, message, path);
        setIsLoading(false);
        if (status) {
            setUpdatePresenceInputs({
                usersIds: [],
                arrivalTime: "",
                breakStartTime: "",
                resumeTime: "",
                departureTime: "",
                createdAt: ""
            })
        }
    }

    const selectAllUser = () => {
        const allIds = presencesList.filter(user => user.UserId && user?.EnterpriseId && user?.SalaryId);
        const getEnterprisesIds = allIds.map(item => item.EnterpriseId);
        const getUsersIds = allIds.map(item => item.UserId);
        const getSalariesIds = allIds.map(item => item.SalaryId);

        setAddPresenceInputs({
            ...addPresenceInputs,
            usersIds: getUsersIds,
            enterprisesIds: getEnterprisesIds,
            salariesIds: getSalariesIds
        }
        );
        setUpdatePresenceInputs({
            ...updatePresenceInputs,
            usersIds: getUsersIds
        })
    }
    const deselectAllUser = () => {
        setAddPresenceInputs({
            ...addPresenceInputs,
            usersIds: [],
            enterprisesIds: [],
            salariesIds: []
        });
        setUpdatePresenceInputs({
            ...updatePresenceInputs,
            usersIds: [],
        })
    }

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <main className=' bg-gray-100 dark:bg-transparent text-gray-700 dark:text-gray-300'>
                    {/*Modal d'ajout de présence */}
                    {
                        showAddPresenceModal ?
                            <div className=" bg-black/80 fixed w-screen h-screen overflow-hidden z-20">
                                <div className="flex-1 dark:bg-gray-800 shadow-md flex duration-500 rounded-xl ease  sm:top-[20%]  w-[35%] mx-auto xl:w-[35%]  z-20 overflow-hidden  p-5  bg-gray-100 lg:ml-[200px] xl:ml-[250px] 2xl:ml-[350px] mt-10">
                                    <form action="" className="w-full mt-2">
                                        <div>
                                            <h1 className="text-center dark:text-gray-300  font-semibold text-xl mb-4">Ajouter une présence <span className="cursor-pointer relative top-1 left-1" onClick={() => { setShowAddPresenceModal(!showAddPresenceModal) }}>  <FontAwesomeIcon icon={faTimes} className="text-[20px]" /></span>
                                            </h1>

                                        </div>

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
                                                        <button onClick={selectAllUser} type="button" className="bg-green-600 text-white font-semibold p-2 rounded-md hover:scale-105 ease duration-500">Tout sélectionner</button>
                                                    </div>

                                                    <div>
                                                        <button onClick={deselectAllUser} type="button" className="bg-red-600 text-white font-semibold p-2 rounded-md hover:scale-105 ease duration-500">Tout déselectionner</button>
                                                    </div>
                                                </div>
                                                <div className='h-[50px]'>
                                                    {
                                                        savedPresencesList.map((user) => (
                                                            <div className="flex flex-row space-y-4 mb-4 dark:text-gray-300 items-center space-x-3">
                                                                {user.User?.photo ? <img src={`${urlAPI}/images/${user?.User?.photo}`} className="w-10 h-10 object-cover rounded-full" alt="" /> : <p className="text-[40px]"> 👮</p>}
                                                                <p>{user?.User?.firstname?.slice(0, 5) + "..."} {user?.User?.lastname}</p>
                                                                <input checked={addPresenceInputs.usersIds.includes(user.UserId)} className="dark:bg-transparent" type="checkbox" value={user.UserId ?? ""} onChange={(e) => {
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
                                            <p className={isLoading ? "hidden" : "font-semibold"}> + Ajouter</p>
                                            <p className={isLoading ? "block relative top-0.5" : "hidden"}>
                                                <ClipLoader size={16} color="#fff" />
                                            </p>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            : <div></div>
                    }
                    {/*Modal d de présence */}
                    {
                        showUpdatePresenceModal ?
                            <div className=" bg-black/80 fixed w-screen h-screen overflow-hidden z-20">
                                <div className="flex-1 dark:bg-gray-800 mt-5 shadow-md flex duration-500 rounded-xl ease sm:top-[20%] 2xl:top-[15%]  w-[35%] mx-auto xl:w-[35%]  z-20 overflow-hidden lg:ml-[200px] xl:ml-[250px] 2xl:ml-[350px] p-5  bg-gray-100 2">
                                    <form action="" className="w-full mt-2">
                                        <h1 className="text-center dark:text-gray-300  font-semibold text-xl mb-4">Modifier une présence
                                            <span className="cursor-pointer relative top-0.5 left-2" onClick={() => { setShowUpdatePresenceModal(!showUpdatePresenceModal) }}>  <FontAwesomeIcon icon={faTimes} className="text-[20px]" /></span>
                                        </h1>
                                        {/* <span className="relative">
                                    <span className="text-red-500 mb-1">* Champs obligatoires</span>
                                </span> */}
                                        <div className="flex flex-col mb-3 w-full relative">
                                            <label htmlFor="" className="mb-2 dark:text-gray-300">Rechercher un collaborateur</label>
                                            <input placeholder="Recherche..." className="border outline dark:bg-transparent border-gray-400 dark:placeholder-gray-300 dark:text-gray-300 rounded p-3 w-full outline-none" onChange={(e) => {
                                                setSearch(e.target.value)
                                                onSearch(e.target.value)
                                                setPage(1); // reset page quand on tape
                                            }} type="text" />
                                            <FontAwesomeIcon icon={faSearch} className="absolute text-gray-700 dark:text-gray-300 bottom-4 right-4 " />
                                        </div>
                                        <div className="w-full lg:flex mt-4 flex-col">
                                            <div className="flex flex-col space-x-3 lg:flex-row mb-3 w-full">
                                                <div className="w-full">
                                                    <label htmlFor="" className="mb-2 dark:text-gray-300">Arrivée </label>
                                                    <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={updatePresenceInputs.arrivalTime ?? ""} onChange={(e) => {
                                                        setUpdatePresenceInputs({
                                                            ...updatePresenceInputs,
                                                            arrivalTime: e.target.value
                                                        })
                                                    }} type="time" />
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="" className="mb-2 dark:text-gray-300">Pause</label>
                                                    <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={updatePresenceInputs.breakStartTime ?? ""} onChange={(e) => {
                                                        setUpdatePresenceInputs({
                                                            ...updatePresenceInputs,
                                                            breakStartTime: e.target.value
                                                        })
                                                    }} type="time" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-x-3 lg:flex-row mb-3 w-full">
                                                <div className="w-full">
                                                    <label htmlFor="" className="mb-2 dark:text-gray-300">Reprise </label>
                                                    <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={updatePresenceInputs.resumeTime ?? ""} onChange={(e) => {
                                                        setUpdatePresenceInputs({
                                                            ...updatePresenceInputs,
                                                            resumeTime: e.target.value
                                                        })
                                                    }} type="time" />
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="" className="mb-2 dark:text-gray-300">Départ</label>
                                                    <input className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" value={updatePresenceInputs.departureTime ?? ""} onChange={(e) => {
                                                        setUpdatePresenceInputs({
                                                            ...updatePresenceInputs,
                                                            departureTime: e.target.value
                                                        })
                                                    }} type="time" />
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="" className="mb-2 dark:text-gray-300">Date</label>
                                                    <input value={updatePresenceInputs.createdAt ?? ""} onChange={(e) => {
                                                        setUpdatePresenceInputs({
                                                            ...updatePresenceInputs,
                                                            createdAt: e.target.value
                                                        })
                                                    }} className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" type="date" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mt-5 space-x-4 justify-between flex-row">
                                            <div className="flex flex-col overflow-y-auto space-y-4">
                                                <div className="flex space-x-2 mb-2 font-semibold">
                                                    <div>
                                                        <button onClick={selectAllUser} type="button" className="bg-green-600 text-white p-2 rounded-md hover:scale-105 ease duration-500 font-semibold">Tout sélectionner</button>
                                                    </div>

                                                    <div>
                                                        <button onClick={deselectAllUser} type="button" className="bg-red-600 text-white p-2 rounded-md hover:scale-105 ease duration-500 font-semibold">Tout déselectionner</button>
                                                    </div>
                                                </div>
                                                <div className='h-[50px]'>
                                                    {
                                                        savedPresencesList.map((user) => (
                                                            <div className="flex flex-row space-y-4 mb-4 dark:text-gray-300 items-center space-x-3">
                                                                {user.User?.photo ? <img src={`${urlAPI}/images/${user?.User?.photo}`} className="w-10 h-10 object-cover rounded-full" alt="" /> : <p className="text-[40px]"> 👮</p>}
                                                                <p>{user?.User?.firstname?.slice(0, 5) + "..."} {user?.User?.lastname}</p>
                                                                <input checked={updatePresenceInputs.usersIds.includes(user.UserId)} className="dark:bg-transparent" type="checkbox" value={user.UserId ?? ""} onChange={(e) => {
                                                                    setUpdatePresenceInputs({
                                                                        ...updatePresenceInputs,
                                                                        usersIds: updatePresenceInputs.usersIds.includes(parseInt(e.target.value)) ? updatePresenceInputs.usersIds.filter(UserId => parseInt(e.target.value) !== UserId) : [
                                                                            ...updatePresenceInputs.usersIds,
                                                                            parseInt(e.target.value)
                                                                        ],
                                                                        createdAt: user.createdAt,
                                                                        arrivalTime: user.arrivalTime,
                                                                    })
                                                                }} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>


                                        </div>
                                        <button className="bg-blue-700 ease hover:bg-blue-800 duration-500 text-white px-5 py-2 rounded mt-6" type="button" onClick={() => {
                                            handleUpdatePresence()
                                        }}>
                                            <p className={isLoading ? "hidden" : "block font-semibold"}>Modifier</p>
                                            <p className={isLoading ? "block relative top-0.5" : "hidden"}>
                                                <ClipLoader size={16} color="#fff" />
                                            </p>
                                        </button>
                                    </form>
                                </div> </div> : <div></div>
                    }
                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between px-4 items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300">{e.presencesList.pageTitle}  </h1>
                                <button className='text-blue-700 dark:text-blue-600 hidden xl:block'>{e.presencesList.path}</button>
                            </div>
                        ))
                    }
                    <div className="px-4 mx-auto">
                        <hr className='bg-gray-400 border-0 h-[1px]' />
                        <div className="flex flex-col space-y-4 xl:space-y-0  lg:flex-row items-center justify-between">
                            <div className="relative z-10 w-[250px]">
                                <input
                                    type="text"
                                    placeholder="Rechercher un profil..."
                                    className="border border-gray-400 outline-none dark:border-gray-300 dark:bg-transparent px-3 py-2.5 rounded-xl my-6 w-full"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        onSearch(e.target.value)
                                        setPage(1); // reset page quand on tape
                                    }}
                                />
                                <FontAwesomeIcon icon={faSearch} className="absolute text-gray-400 right-3 top-[38px]" />
                            </div>
                            <div className="flex items-center space-x-4">
                                {
                                    tablesModal.map((e) => (
                                        e.presencesList.links.map((item) => (
                                            <Link href={item.href} onClick={() => {
                                                if (item.href === "") {
                                                    item.modal === "addPresenceModal" ? setShowAddPresenceModal(!showAddPresenceModal) : setShowUpdatePresenceModal(!showUpdatePresenceModal)
                                                }
                                            }} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={item.icon} className="text-white" />
                                                <span className='text-white font-semibold'> {item.title}</span>
                                            </Link>
                                        ))

                                    ))
                                }
                            </div>
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
                                                {u.User?.photo ? <img src={`${urlAPI}/images/${u.User?.photo}`} className="w-[50px] mx-auto h-[50px] object-cover rounded-full" alt="" /> : <p className="text-center text-[40px]">
                                                    🧑‍💼
                                                </p>}
                                            </td>
                                            <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{u.User?.lastname} {u.User?.firstname}</td>
                                            <td className="border p-2 border-gray-400 dark:border-gray-300 dark:text-gray-300 text-center font-semibold">{u.arrivalTime} - {u?.breakStartTime ?? "--"}</td>
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
                                                    if (!requireAdminRoles.includes(adminRole ?? "")) {
                                                        return controllers.alertMessage(false, "violation d'accès!", "Vous n'avez aucun droit d'effectuer cette action. Veuillez contacter votre administrateur local.", null)
                                                    }
                                                    window.location.href = "/pages/dashboard/RH/getAllPresencesOfUser/" + u.UserId
                                                }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                    <p className="text-center">👁️</p>
                                                </button>

                                                {/* <button onClick={() => {
                                                if (!requireAdminRoles.includes(adminRole ?? "")) {
                                                    return controllers.alertMessage(false, "violation d'accès!", "Vous n'avez aucun droit d'effectuer cette action. Veuillez contacter votre administrateur local.", null)
                                                }
                                                setShowUpdatePresenceModal(!showUpdatePresenceModal);
                                                setCreatedAt(u.createdAt);
                                                onSearch(u.UserId?.toString() ?? "");
                                            }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
                                                <p className="text-center">🖊️</p>
                                            </button> */}

                                                <button onClick={async () => {
                                                    if (!requireAdminRoles.includes(adminRole ?? "")) {
                                                        return controllers.alertMessage(false, "violation d'accès!", "Vous n'avez aucun droit d'effectuer cette action. Veuillez contacter votre administrateur local.", null)
                                                    }
                                                    const response = await controllers.API.deleteOne(urlAPI, "deleteUserAttendance", u.UserId, { createdAt: u.createdAt });
                                                    controllers.alertMessage(response.status, response.title, response.message, response.status ? "/pages/dashboard/RH/presencesList" : null);
                                                }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
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
                    </div>
                </main>
            </div>
        </div>
    );
}
