"use client"
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import { formElements } from "@/components/FormElements/forms";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners";
import AddContractHookModal from "./hook";

type ContratValues = {
    startDate: number | null,
    endDate: number | null,
    delay: number | null,
    ContractTypeId: number | null,
    EnterpriseId: number | null
    ContractType: string | null,
    Enterprise: string | null,
    

}

export default function AddContract() {

    const {dynamicArrayData, staticArrayData} = AddContractHookModal()
    const [isLoading, setIsLoading] = useState(false);
    const [inputsValues, setInputsValues] = useState<ContratValues>({
        startDate: null,
        endDate: null,
        delay: null,
        ContractTypeId: null,
        EnterpriseId: null,
        ContractType: null,
        Enterprise: null,
    })

   


    


    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);

        const requireField = {
            startDate: inputsValues.startDate,
            endDate: inputsValues.endDate,
            delay: inputsValues.delay,
            ContractType: inputsValues.ContractType,
            Enterprise: inputsValues.Enterprise,
            ContractTypeId: inputsValues.ContractTypeId ?? null,
            EnterpriseId: inputsValues.EnterpriseId ?? null

        }

        console.log("les données:", requireField)

        const methodName = "createContract"

        const response = await controllers.API.SendOne(urlAPI, methodName, null, requireField)

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/ADMIN/addContract" : null
        )


        setIsLoading(false);
    }




    return (

        <main className="bg-gray-100 dark:bg-transparent" >
            <Header />
            <div className="flex">
                <Sidebar />

                <div className="mx-4 mt-6 mb-4 w-full" >
                    {
                        formElements.map((e, index) => (

                            <div key={index} className="flex flex-wrap text-gray-700 w-full space-y-4 md:space-y-0 items-center justify-between" >
                                <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">
                                    Ajouter un contrat
                                </h1>

                                <div className="flex flex-wrap space-x-4 space-y-4 items-center ">
                                    {e.addOrUpdateUser.navigateLinks.map((item, index) => (
                                        <Link key={index} href={item.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative top-2.5" :
                                            index === 5 ? "bg-blue-800 2xl:right-5 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded"} >
                                            <FontAwesomeIcon icon={item.icon} className="text-white" />
                                            <span className='text-white'>{item.title}</span>
                                        </Link>
                                    ))}

                                </div>

                            </div>

                        ))
                    }

                    <div className='dark:border mt-12 w-full md:w-3/4 mx-auto h-auto border-gray-400 dark:border-gray-300 rounded-[30px] border  dark:shadow-none p-4'>
                        {
                            formElements.map((e, index) => (
                                <div key={index} className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                    <h2 className="font-bold">{e.addOrUpdateUser.tilteContract}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>

                            ))
                        }
                        <hr />

                        <div className='grid grid-cols-1 mt-4 md:grid-cols-2 gap-4 w-full '>
                            {
                                formElements.map((e, i) => (
                                    e.addOrUpdateUser.inputContrat.map((item, index) => (
                                        <div key={index} className="flex flex-col w-full ">
                                            <div className=''>
                                                <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700">
                                                    <span className={item.requireField ? "text-red-600" : "hidden"}>*</span>
                                                    {item.label}</label>
                                                {
                                                    !item.selectedInput ?
                                                        <input onChange={async (u) => {
                                                            for (const [key, _] of Object.entries(inputsValues)) {
                                                                if (key === item.alias) {
                                                                    setInputsValues({
                                                                        ...inputsValues,
                                                                        [item.alias]: u.target.value
                                                                    })
                                                                }
                                                            }

                                                        }} type={item.type} maxLength={item.type === "tel" ? 9 : undefined} placeholder={item.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border
                                                     border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 font-normal dark:text-gray-300 text-gray-700" />

                                                        :
                                                        <select onChange={async (u) => {
                                                            for (const [key, _] of Object.entries(inputsValues)) {
                                                                if (key === item.alias) {
                                                                    setInputsValues({
                                                                        ...inputsValues,
                                                                        [item.alias]: item.type === "number" ? parseInt(u.target.value) : u.target.value
                                                                    })
                                                                }
                                                            }
                                                        }} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent 
                                                       border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700" >

                                                            <option selected disabled >
                                                                {item.placeholder}
                                                            </option>

                                                            {

                                                                item.dynamicOptions?.status ? dynamicArrayData
                                                                    .find(items => items.alias === item.alias)?.value.map(option => (
                                                                        <option value={option.id}>
                                                                            {option.value}
                                                                        </option>
                                                                    )) :
                                                                    (

                                                                        staticArrayData.find(i => i.alias === item.alias)?.value.map((e) => (
                                                                            <option value={e.id}>
                                                                                {e.value}
                                                                            </option>
                                                                        ))

                                                                    )


                                                            }

                                                        </select>

                                                }

                                            </div>

                                        </div>
                                    ))
                                ))
                            }

                        </div>

                        {/** bouton exécuté */}
                        <div className="flex justify-end w-full mt-2">
                            <button type="button" onClick={(e) => {
                                handleSubmit(e)
                            }}
                                className="bg-blue-600 my-2 hover:bg-blue-700 relative xl:right-5 rounded-md font-semibold ease 
                              duration-500 text-white py-2.5 px-8">

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