"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PresencesListHookModal } from "../hook";
import { controllers, urlAPI } from "@/app/main";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

type AddPresence = {
    arrivalTime: string | null,
    createdAt: string | null,
    usersIds: number[],
    salariesIds: number[],
    enterprisesIds: number[],
}

export default function AddPresenceModal() {
    const { presencesListCloned, onSearch, onSelectAllUser } = PresencesListHookModal();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<AddPresence>({
        arrivalTime: null,
        createdAt: null,
        usersIds: [],
        salariesIds: [],
        enterprisesIds: []
    });

    const handleAddPresence = async () => {
        setIsLoading(true);

        const requireField = {
            arrivalTime: inputs.arrivalTime,
            createdAt: inputs.createdAt,
            usersIds: inputs.usersIds,
        }

        for (const [_, value] of Object.entries(requireField)) {
            if (value === null || (Array.isArray(value)) && value.length <= 0) {
                return setTimeout(() => {
                    controllers.alertMessage(false, "Champ invalide!", "Veuillez sélectionner au moins un utilisateur, y compris une date", null);
                    setIsLoading(false);
                }, 1000)
            }
        }

        const response = await controllers.API.SendOne(urlAPI, "addAttendanceFromAdmin", null, inputs)

        const status = response.status;
        const title = response.title;
        const message = response.message;
        const path = status ? "/dashboard/RH/presencesList" : null

        controllers.alertMessage(status, title, message, path);
        setIsLoading(false);
        if (status) {
            setInputs({
                arrivalTime: "",
                createdAt: "",
                usersIds: [],
                salariesIds: [],
                enterprisesIds: [],
            })
        }
    }

    function onSelect(UserId: number, EnterpriseId: number, SalaryId: number) {
        setInputs({
            ...inputs,
            usersIds: inputs.usersIds.includes(UserId) ? inputs.usersIds.filter(item => item !== UserId) : [...inputs.usersIds, UserId],
            enterprisesIds: inputs.enterprisesIds.includes(EnterpriseId) ? inputs.enterprisesIds.filter(item => item !== EnterpriseId) : [...inputs.enterprisesIds, EnterpriseId],
            salariesIds: inputs.salariesIds.includes(SalaryId) ? inputs.salariesIds.filter(item => item !== SalaryId) : [...inputs.usersIds, SalaryId],
        })
    }

    function selectAllUser() {
        setInputs({
            ...inputs,
            usersIds: onSelectAllUser().getUsersIds,
            enterprisesIds: onSelectAllUser().getEnterprisesIds,
            salariesIds: onSelectAllUser().getSalariesIds
        })
    }

    function deselectAllUser() {
        setInputs({
            ...inputs,
            usersIds: [],
            enterprisesIds: [],
            salariesIds: [],
        })
    }
    return (
        <div className=" bg-black/80 fixed w-screen h-screen overflow-hidden z-20">
            <div className="flex-1 dark:bg-gray-800 shadow-md flex duration-500 rounded-xl ease  sm:top-[20%]  w-[35%] mx-auto xl:w-[35%]  z-20 overflow-hidden  p-5  bg-gray-100 lg:ml-[200px] xl:ml-[250px] 2xl:ml-[350px] mt-10">
                <form action="" className="w-full mt-2">
                    <div className="flex justify-center">
                        <h1 className="text-center dark:text-gray-300  font-semibold text-xl mb-4">Ajouter une présence
                        </h1>
                    </div>

                    <span className="relative">
                        <span className="text-red-500 mb-1">* Champs obligatoires</span>
                    </span>
                    <div className="w-full lg:flex mt-4 flex-col">
                        <div className="flex flex-col mb-3 w-full relative">
                            <label htmlFor="" className="mb-2 dark:text-gray-300">Rechercher un collaborateur</label>
                            <input placeholder="Recherche..." className="border outline dark:bg-transparent border-gray-400 dark:placeholder-gray-300 dark:text-gray-300 rounded p-3 w-full outline-none" onChange={(e) => {
                                onSearch(e.target.value, "addPresenceModal")
                            }} type="text" />
                            <FontAwesomeIcon icon={faSearch} className="absolute text-gray-700 dark:text-gray-300 bottom-4 right-4 " />
                        </div>
                        <div className="flex flex-col space-x-3 lg:flex-row mb-3 w-full">
                            <div className="w-full">
                                <label htmlFor="" className="mb-2 dark:text-gray-300">Arrivée <span className="text-red-500">* </span> </label>
                                <input onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        arrivalTime: e.target.value
                                    })
                                }} className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" type="time" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="" className="mb-2 dark:text-gray-300">Date<span className="text-red-500">* </span> </label>
                                <input onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        createdAt: e.target.value
                                    })
                                }} className="border dark:bg-transparent border-gray-400 outline-none dark:text-gray-300 rounded p-3 w-full" type="date" />
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-5 space-x-4 justify-between flex-row">
                        <div className="flex flex-col overflow-y-auto space-y-4">
                            <div className="flex space-x-2 mb-2">
                                <div>
                                    <button onClick={selectAllUser} type="button" className="bg-green-600 text-white font-semibold p-2.5  hover:scale-105 ease duration-500">Tout sélectionner</button>
                                </div>

                                <div>
                                    <button onClick={deselectAllUser} type="button" className="bg-red-600 text-white font-semibold p-2.5  hover:scale-105 ease duration-500">Tout déselectionner</button>
                                </div>
                            </div>
                            <div className='h-[50px]'>
                                {
                                    presencesListCloned.map((user) => (
                                        <div className="flex flex-row space-y-4 mb-4 dark:text-gray-300 items-center space-x-3">
                                            {user?.User?.photo ? <img src={`${urlAPI}/images/${user?.User?.photo}`} className="w-10 h-10 object-cover rounded-full" alt="" /> : <p className="text-[40px]"> 👮</p>}
                                            <p>{user?.User?.firstname?.slice(0, 5) + "..."} {user?.User?.lastname}</p>
                                            <input checked={inputs.usersIds.includes(user?.UserId)} onChange={() => {
                                                onSelect(user?.UserId, user?.EnterpriseId, user?.SalaryId)
                                            }} className="dark:bg-transparent" type="checkbox" value={user?.UserId ?? ""} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                    </div>
                    <button onClick={handleAddPresence} className="bg-blue-700 ease hover:bg-blue-800 duration-500 text-white px-5 py-2 rounded mt-6" type="button">
                        <p className={isLoading ? "hidden" : "font-semibold"}> + Ajouter</p>
                        <p className={isLoading ? "block relative top-0.5" : "hidden"}>
                            <ClipLoader size={16} color="#fff" />
                        </p>
                    </button>
                </form>
            </div>
        </div>
    )
}