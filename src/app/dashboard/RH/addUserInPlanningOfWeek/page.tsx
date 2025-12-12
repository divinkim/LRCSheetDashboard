'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import AddOrEditUserPlanningOfWeek from "@/components/addEditUserPlanningOfWeek";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type Users = {
    lastname: string | null,
    firstname: string | null,
    id: number,
    PlanningId: number,
    EnterpriseId: number,
    photo: string | null
}

export default function addUserInPlanningOfWeek() {
    const [usersArray, setUsersArray] = useState<Users[]>([]);
    const [usersArrayCloned, setUsersArrayCloned] = useState<Users[]>([]);
    const { users, addEditUserPlanningOfWeek, weekDays } = AddOrEditUserPlanningOfWeek();

    useEffect(() => {
        (() => {
            setUsersArray(users);
            setUsersArrayCloned(users);
        })();
    }, [users]);

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 font-semibold mt-6 mb-4 w-full">
                    <div className="flex mb-5 justify-between items-center">
                        <h1 className="text-[20px] font-bold dark:text-gray-300 text-gray-700">
                            {addEditUserPlanningOfWeek?.addUserInPlanningOfWeek?.titlePage}
                        </h1>
                        <p className="text-blue-500">
                            {addEditUserPlanningOfWeek.addUserInPlanningOfWeek?.path}
                        </p>
                    </div>

                    <hr className='bg-gray-400 border-0 h-[1px]' />

                    <div className="mt-8 grid  grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="border h-[500px] border-gray-400 p-4">

                            <div className="mb-5 px-2">
                                <div className="w-[300px] relative">
                                    <input
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
                                        className="dark:bg-gray-800/90 bg-white shadow-xl p-3 dark:shadow-none"
                                    >
                                        <div className='flex items-center space-x-4'>
                                            {user.photo ? (
                                                <img
                                                    className="w-10 h-10 object-cover rounded-full"
                                                    src={`${urlAPI}/images/${user.photo}`}
                                                    alt={`${user.firstname} ${user.lastname}`}
                                                />
                                            ) : (
                                                <p className="text-[40px]">👤</p>
                                            )}

                                            <p className="dark:text-gray-300 text-gray-700">
                                                {user.lastname} {user.firstname}
                                            </p>

                                            <input
                                                type="checkbox"
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="border h-[500px] border-gray-400 p-4">

                            <div className="px-2">
                                <h1 className="dark:text-gray-300 text-gray-700 mb-5">Les jours de la semaines</h1>
                                <hr className='bg-gray-400 border-0 h-[1px]' />
                            </div>
  
                            <div className="grid grid-cols-1 h-[400px] mt-5 overflow-auto gap-y-4 px-2">
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
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 bg-blue-600 ease duration-500 text-white hover:bg-blue-700">
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
