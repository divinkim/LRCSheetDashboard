"use client";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import HookComponentModal from "@/components/ComponentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { isValidElement, useEffect, useState } from "react";
import { urlAPI } from "@/app/main";

type RepportsValue = {
    title: string,
    content: string,
    files: string,
    UserId: number,
    EnterpriseId: number,
    monthIndice: number,
    createdAt: string,
    adminResponse: string,
    User: {
        firstname: string,
        lastname: string,
        email: string,
        photo: string,
    }
}

export default function Repports() {
    const ComponentModal = HookComponentModal();
    const [itemIndex, setItemIndex] = useState<number | null>(null);
    const [itemIndexOnWriting, setItemIndexOnWriting] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false);
    const [adminResponse, setAdminResponse] = useState("");
    const [monthIndice, setMonthIndice] = useState(new Date().getMonth());
    const [originalRepportsArray, setOriginalRepportsArray] = useState<RepportsValue[]>([]);
    const [originalRepportsArrayCloned, setOriginalRepportsArrayCloned] = useState<RepportsValue[]>([]);
    let EnterpriseId = localStorage.getItem("EnterpriseId");

    EnterpriseId ? parseInt(EnterpriseId) : null;

    useEffect(() => {
        (() => {
            setOriginalRepportsArray(ComponentModal.at(0)?.Repport?.repportsArray ?? []);
            setOriginalRepportsArrayCloned(ComponentModal.at(0)?.Repport?.repportsArray ?? []);
        })()
    }, [ComponentModal.at(0)?.Repport?.repportsArray]);

    useEffect(() => {
        (() => {
            
        })()
    }, [])

    const monthsOfYear = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ];

    function navigateBetweenMonths(repportArray: RepportsValue[], monthIndice: number, EnterpriseId: number) {
        const newRepportsArray = repportArray.filter(repport => repport.EnterpriseId === EnterpriseId && repport.monthIndice === monthIndice);
        return setOriginalRepportsArrayCloned(newRepportsArray)
    }

    function filterRepportsByUsersNames(value: string, monthIndice: number) {
        const repports = originalRepportsArray.filter(repport => (repport.User?.firstname.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || repport.User?.lastname.toLocaleLowerCase()?.includes(value.toLocaleLowerCase())) && repport.monthIndice === monthIndice);
        setOriginalRepportsArrayCloned(repports)
    }

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 dark:text-gray-300 text-gray-700 mt-6 mb-4 w-full">
                    <div className="flex justify-between mb-4 items-center">
                        <h1 className='font-bold text-[20px]'>{ComponentModal.at(0)?.Repport.titlePage}</h1>
                        <p className="text-blue-600">{ComponentModal.at(0)?.Repport.path}</p>
                    </div>
                    <hr className='bg-gray-400 border-0 h-[1px]' />
                    <div className="flex lg:justify-between mt-5 items-center flex-col space-y-4 lg:flex-row lg:space-y-0">
                        <div className='relative w-[300px]'>
                            <input onChange={(e) => {
                                filterRepportsByUsersNames(e.target.value, monthIndice)
                            }} type="text" className="bg-transparent border border-gray-400 p-3 rounded-md outline-none w-full" placeholder="Recherche par collaborateurs..." />
                            <FontAwesomeIcon icon={faSearch} className="absolute top-4 right-4 text-gray-400" />
                        </div>
                        <div>
                            <h1 className="text-[20px] dark:text-gray-300 font-bold">{monthsOfYear[monthIndice]} {new Date().getFullYear()}</h1>
                        </div>
                        <div className="flex item-center font-semibold text-white space-x-4">
                            <button type="button" onClick={() => {
                                const incrementedMonthIndex = monthIndice + 1;
                                setMonthIndice(incrementedMonthIndex);
                                navigateBetweenMonths(originalRepportsArray, incrementedMonthIndex, parseInt(EnterpriseId ?? ""))
                            }} className="bg-green-500 hover:scale-105 ease duration-500 px-6 py-2">Suivant</button>
                            <button type="button" onClick={() => {
                                const decrementedMonthIndex = monthIndice - 1;
                                setMonthIndice(decrementedMonthIndex)
                                navigateBetweenMonths(originalRepportsArray, decrementedMonthIndex, parseInt(EnterpriseId ?? ""))
                            }} className="bg-red-500 px-6 py-2 hover:scale-105 ease duration-500">Précédent</button>
                        </div>
                    </div>
                    <div className="mx-auto mt-8 w-full">
                        {
                            originalRepportsArrayCloned.filter(repport => repport.monthIndice === monthIndice).slice().reverse().map((repport, index) => (
                                <div className="w-full h-auto bg-white shadow-xl mb-6 dark:shadow-none dark:border dark:border-gray-400 p-4 rounded-xl dark:bg-transparent">
                                    <div className="flex justify-start items-center lg:justify-between flex-col lg:flex-row space-y-5 lg:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            {
                                                repport.User?.photo ? <img src={`${urlAPI}/images/${repport.User.photo}`} alt="" className="rounded-full w-[50px] h-[50px] object-cover" /> : <p className="text-[40px]">
                                                    🧑‍💼
                                                </p>
                                            }

                                            <h1 className="font-bold">{repport.User?.lastname} {repport.User?.firstname}</h1>
                                        </div>
                                        <div onClick={() => {
                                            setItemIndex(index);
                                            setIsVisible(!isVisible)
                                        }} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white ease duration-500 rounded-full px-4 py-2">
                                            <p>{itemIndex === index && isVisible ? "Voir moins" : "Voir plus"} <span className=""><FontAwesomeIcon className="" icon={itemIndex === index && isVisible ? faChevronUp : faChevronDown} />
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="my-6 flex flex-col space-y-2 font-bold">
                                        <h1> Objet: {repport.title}</h1>
                                        <h1>Date: {new Date(repport.createdAt).toLocaleDateString('fr-Fr', {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            weekday: "short"
                                        })}</h1>
                                        <hr className='bg-gray-400 border-0 h-[1px]' />
                                        <div className="flex flex-col space-y-5 pt-4">
                                            <p className="font-normal leading-loose  dark:text-gray-300  whitespace-pre-wrap">{itemIndex === index && isVisible ? repport.content : repport.content?.length > 255 ? repport.content.slice(0, 254) + "..." : repport.content}
                                            </p>

                                            <div className={itemIndex === index && isVisible ? "relative -top-2" : "hidden"}>
                                                <p className={repport.adminResponse ? "rounded-md border border-gray-400 p-4" : "hidden"}>
                                                    Commentaire de l'administrateur: {repport?.adminResponse}
                                                </p>
                                                <textarea value={itemIndexOnWriting === index ? adminResponse : ""} onChange={(e) => {
                                                    setAdminResponse(e.target.value);
                                                    setItemIndexOnWriting(index)
                                                }} name="" id="" placeholder="Laissez un commentaire!" className="w-full bg-transparent  border border-gray-400 my-4 rounded-md dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-300  h-[100px] p-4 outline-none">
                                                </textarea>
                                                <button type="button" className="text-white bg-blue-600 rounded-md hover:bg-blue-700 w-[100px] py-2">
                                                    Envoyer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

        </main>
    )
}