"use client";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import HookComponentModal from "@/components/ComponentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { isValidElement, useState } from "react";
import { urlAPI } from "@/app/main";

export default function Repports() {
    const ComponentModal = HookComponentModal();
    const [itemIndex, setItemIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false)
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
                        <div>
                            <input type="text" className="bg-transparent border border-gray-400 p-3 rounded-md outline-none w-[300px]" placeholder="Recherche par noms.." />
                        </div>
                        <div className="flex item-center text-white space-x-4">
                            <button className="bg-green-500 hover:scale-105 ease duration-500 px-6 py-2">Suivant</button>
                            <button className="bg-red-500 px-6 py-2 hover:scale-105 ease duration-500">Précédent</button>
                        </div>
                    </div>
                    <div className="mx-auto mt-8 w-full">
                        {
                            ComponentModal.map((item) => (
                                item.Repport.repportsArray.slice().reverse().map((repport, index) => (
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
                                                <p className="font-normal dark:text-gray-300  whitespace-pre-wrap">{itemIndex === index && isVisible ? repport.content : repport.content?.length > 255 ? repport.content.slice(0, 254) + "..." : repport.content}
                                                </p>

                                                <div className={itemIndex === index && isVisible ? "relative -top-2" : "hidden"}>
                                                    <p className={repport.adminResponse ? "rounded-md border border-gray-400 p-4" : "hidden"}>
                                                        Commentaire de l'administrateur: {repport?.adminResponse}
                                                    </p>
                                                    <textarea name="" id="" placeholder="Commentaire de l'administrateur!" className="w-full bg-transparent  border border-gray-400 my-4 rounded-md dark:text-gray-300 placeholder-gray-600 dark:placeholder-gray-300  h-[100px] p-4 outline-none">
                                                    </textarea>
                                                    <button type="button" className="text-white bg-blue-600 rounded-md hover:bg-blue-700 w-[100px] py-2">
                                                        Envoyer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))
                        }

                    </div>
                </div>
            </div>

        </main>
    )
}