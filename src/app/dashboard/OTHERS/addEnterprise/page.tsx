'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { controllers } from "@/app/main";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { formElements } from "@/components/FormElements/forms";
import { urlAPI } from "@/app/main";
import { cn } from "@/lib/utils";

import { EnterpriseHookModal } from "./hook";

export default function AddEnterprise() {

    const { dynamicDatasArray, staticDatasArray, handleSubmit, setInputs, inputs, isLoading } = EnterpriseHookModal();

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 mt-6 mb-4 w-full font-semibold">
                    {
                        formElements.map((element) => (
                            <div className="text-gray-700 w-full space-y-4 md:space-y-0 items-center">
                                <div className="flex justify-between flex-wrap">
                                    <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">Ajouter une entreprise</h1>
                                    <p className="text-blue-700 dark:text-blue-600">Dashboard/Autres/Ajouter une entreprise</p>
                                </div>
                                <hr />
                                <div className="flex flex-wrap py-4 lg:space-x-4 space-y-4 items-center">
                                    {
                                        element.addOrUpdateEnterprise.navigationLinks.map((element, index) => (
                                            <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-3  px-4 relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-4 hover:bg-blue-900 ease duration-500 py-3  px-4 relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-3  px-4"}>
                                                <FontAwesomeIcon icon={element.icon} className="text-white" /> <span className='text-white'>{element.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}

                    <div className='dark:border mt-8 w-full h-auto border-gray-400 dark:border-gray-300 rounded-[30px] border  dark:shadow-none p-4'>
                        {
                            formElements.map((element) => (

                                <div className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                    <h2 className="font-bold">{element.addOrUpdateEnterprise.addEnterpriseTitleForm}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>
                            ))
                        }
                        <hr />
                        <div className='grid grid-cols-1 mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3  w-full'>
                            {
                                formElements.map((element) => (
                                    element.addOrUpdateEnterprise.inputs.map((e, index) => (
                                        <div className={cn('w-full mb-4',)}>
                                            <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700"><span className={e.requireField ? "text-red-600" : "hidden"}>*</span> {e.label}</label>
                                            {!e.selectedInput ?
                                                <div>
                                                    <input value={inputs[e.alias] ?? ""} onChange={async (v) => {
                                                        const field = e.alias;
                                                        let fieldValue;
                                                        if (e.type === "file") {
                                                            const files = v.target.files?.[0];
                                                            const response = await controllers.API.SendOne(urlAPI, "sendFiles", null, { files });

                                                            fieldValue = { ...inputs, [field]: response.filename }

                                                            if (response.status) {
                                                                setInputs(fieldValue);
                                                                window?.localStorage.setItem("inputMemoryAddEnterprisePage", JSON.stringify(fieldValue))
                                                            }
                                                            return
                                                        }
                                                        fieldValue = { ...inputs, [field]: v.target.value }
                                                        setInputs(fieldValue);
                                                        window?.localStorage.setItem("addEnterpriseFormDataStored", JSON.stringify(fieldValue))
                                                    }} type={e.type} maxLength={e.type === "tel" ? 9 : undefined} placeholder={e.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 font-normal dark:text-gray-300 text-gray-700" />
                                                    <div className={e.alias === "logo" && inputs.logo ? "h-[200px]" : "hidden"}>
                                                        <img src={`${urlAPI}/images/${inputs.logo}`} className='h-[200px] w-full object-cover' alt="" />
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <select value={inputs[e.alias] ?? ""} onChange={(v) => {
                                                        const field = e.alias;

                                                        let fieldValue = {
                                                            ...inputs,
                                                            [field]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                        }

                                                        setInputs(fieldValue)

                                                        window?.localStorage.setItem("inputMemoryAddEnterprisePage", JSON.stringify(fieldValue));
                                                    }} name="" id="" className="w-full mt-1 cursor-pointer outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700">
                                                        <option value="" selected disabled>
                                                            {e.placeholder}
                                                        </option>
                                                        {
                                                            e.dynamicOptions?.status ?
                                                                dynamicDatasArray.find(item => item.alias === e.alias)
                                                                    ?.arrayData
                                                                    ?.map(option => (
                                                                        <option value={option.value}>
                                                                            {option.title}
                                                                        </option>
                                                                    ))
                                                                :
                                                                staticDatasArray.find(item => item.alias === e.alias)
                                                                    ?.arrayData
                                                                    ?.map(option => (
                                                                        <option value={option.value}>
                                                                            {option.title}
                                                                        </option>
                                                                    ))
                                                        }
                                                    </select>

                                                </div>
                                            }
                                        </div>
                                    ))
                                ))
                            }

                        </div>
                        <div className="flex w-full justify-end ">
                            <button type="button" onClick={(e) => {
                                handleSubmit(e)
                            }} className="bg-blue-600 my-2 hover:bg-blue-700 relative rounded-md font-semibold ease duration-500 text-white py-2.5 px-8">
                                <p className={isLoading ? "hidden" : "block"}> Exécuter</p>
                                <p className={isLoading ? "block" : "hidden"}><ClipLoader color="#fff" size={16} /></p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}