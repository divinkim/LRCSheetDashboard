'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import AddOrEditUserPlanningOfWeek from "@/components/addEditUserPlanningOfWeek";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

type Users = {
    lastname: string | null,
    firstname: string | null,
    id: number,
    PlanningId: number,
    EnterpriseId: number,
    photo: string | null
}
type Plannings = {
    startTime: string,
    breakingStartTime: string,
    resumeEndTime: string,
    endTime: string,
    EnterpriseId: number,
    id: number,
    PlanningType: {
        title: string,
        description: string
    }
}
type Datas = {
    usersId: number[],
    weekDaysId: number[],
    PlanningId: number,
    enterprisesId: number[],
}

export default function UpdateUserInPlanningOfWeek() {
    const [usersArray, setUsersArray] = useState<Users[]>([]);
    const [usersArrayCloned, setUsersArrayCloned] = useState<Users[]>([]);
    const { users, addEditUserPlanningOfWeek, weekDays, plannings } = AddOrEditUserPlanningOfWeek();
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState<Datas>({
        usersId: [],
        weekDaysId: [],
        enterprisesId: [],
        PlanningId: 0,
    })

    useEffect(() => {
        (() => {
            setUsersArray(users);
            setUsersArrayCloned(users);
        })();
    }, [users]);

    function onSearch(value: string) {
        const findUser = usersArray.filter(user => user.lastname?.toLowerCase().includes(value?.toLowerCase()) || user.firstname?.toLowerCase()?.includes(value?.toLocaleLowerCase()));
        setUsersArrayCloned(findUser)
    }

    async function handleSubmit() {
        setIsLoading(true);
        if (datas.usersId.length <= 0 || datas.weekDaysId.length <= 0 || datas.PlanningId === 0) {
            return setTimeout(() => {
                controllers.alertMessage(false, "Champs incorrectes", "Veuillez sélectionner au moins un utilisateur, un jour de la semaine y compris un planning", null);
                setIsLoading(false)
            }, 1000)
        }
        const response = await controllers.API.UpdateOne(urlAPI, "updateUsersPlanningsOfWeek", null, datas);
        controllers.alertMessage(response.status, response.title, response.message, response.status ? "/dashboard/RH/updateUserInPlanningOfWeek" : null);
        setIsLoading(false);
    }

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 font-semibold mt-6 b-4 w-full">
                    <div className="flex mb-5 justify-between items-center">
                        <h1 className="text-[20px] font-bold dark:text-gray-300 text-gray-700">
                            {addEditUserPlanningOfWeek?.updateUserInPlanningOfWeek?.titlePage}
                        </h1>
                        <p className="text-blue-500">
                            {addEditUserPlanningOfWeek.updateUserInPlanningOfWeek?.path}
                        </p>
                    </div>

                    <hr className='bg-gray-400 border-0 h-[1px]' />
                    <div className="flex justify-end space-x-4 mt-4 item-center">
                        {
                            addEditUserPlanningOfWeek.updateUserInPlanningOfWeek.links.map((elm) => (
                                <Link href={elm.path} className="bg-blue-600 hover:bg-blue-700 ease duration-500 text-white  py-3 px-8">
                                    {elm.title} <span><FontAwesomeIcon icon={elm.icon} /></span>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="mt-8 grid  grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="border h-[500px] rounded-xl border-gray-400 p-4">

                            <div className="mb-5 px-2">
                                <div className="w-full relative">
                                    <input onChange={(e) => {
                                        onSearch(e.target.value)
                                    }}
                                        className="p-3 bg-transparent outline-none rounded-md border border-gray-400 w-full"
                                        placeholder="Recherchez un collaborateur"
                                    />
                                    <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-4" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 h-[400px] overflow-auto gap-y-4 px-2">
                                {usersArrayCloned.map((user) => (
                                    <div
                                        key={user.id}
                                        className="dark:bg-gray-800/90 h-[70px] bg-white shadow-xl p-3 dark:shadow-none"
                                    >
                                        <div className='flex items-center space-x-4'>
                                            {user.photo ? (
                                                <img
                                                    className="w-10 h-10 object-cover rounded-full"
                                                    src={`${urlAPI}/images/${user.photo}`}
                                                    alt={`${user.firstname} ${user.lastname}`}
                                                />
                                            ) : (
                                                <p className="text-[30px]">👤</p>
                                            )}

                                            <p className="dark:text-gray-300 text-gray-700">
                                                {user.lastname} {user.firstname}
                                            </p>

                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    setDatas({
                                                        ...datas,
                                                        usersId: datas.usersId.includes(user.id) ? datas.usersId.filter(item => item !== user.id) : [...datas.usersId, user.id],
                                                        enterprisesId: datas.enterprisesId.includes(user.EnterpriseId) ? datas.enterprisesId.filter(item => item !== user.EnterpriseId) : [...datas.enterprisesId, user.EnterpriseId]
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSubmit} type="button" className="mt-8 relative right-4 bg-blue-600 ease duration-500 text-white py-3 px-10 hover:bg-blue-700">
                                <p className={isLoading ? "hidden" : "block"}>Modifier</p>
                                <p className={isLoading ? 'block' : "hidden"}><ClipLoader size={16} color="#fff" /></p>
                            </button>
                        </div>
                        <div className="border h-[500px] rounded-xl border-gray-400 p-4">
                            <div className="mb-5">
                                <select value={datas.PlanningId} onChange={(e) => {
                                    setDatas({
                                        ...datas,
                                        PlanningId: Number(e.target.value)
                                    })
                                }} className="bg-transparent border dark:text-gray-300 dark:bg-gray-900 border-gray-400 w-full p-4">
                                    <option disabled selected value="">
                                        Sélectionner un planning
                                    </option>
                                    {
                                        plannings.map((planning) => (
                                            <option value={planning.id}>
                                                {planning.startTime?.slice(0, 5)} - {planning.breakingStartTime?.slice(0, 5)} - {planning.resumeEndTime?.slice(0, 5)} - {planning.endTime?.slice(0, 5)} ({planning.PlanningType.title})
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="px-2">
                                <h1 className="dark:text-gray-300 text-gray-700 mb-5">Les jours de la semaines</h1>
                                <hr className='bg-gray-400 border-0 h-[1px]' />
                            </div>

                            <div className="grid grid-cols-1 h-[320px] py-4 overflow-auto gap-y-4 px-2">
                                {weekDays.map((weekDay) => (
                                    <div
                                        key={weekDay.id}
                                        className="dark:bg-gray-800/90 bg-white shadow-xl p-3 dark:shadow-none"
                                    >
                                        <div className='flex items-center space-x-4'>
                                            <p className="dark:text-gray-300 text-gray-700">
                                                {weekDay.day}
                                            </p>
                                            <input
                                                type="checkbox"
                                                onChange={() => {
                                                    setDatas({
                                                        ...datas,
                                                        weekDaysId: datas.weekDaysId.includes(weekDay.id) ? datas.weekDaysId.filter(item => item !== weekDay.id) : [...datas.weekDaysId, weekDay.id]
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
