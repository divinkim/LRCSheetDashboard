'use client';
import { Header } from "@/components/Layouts/header";

import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import {FormEvent ,useEffect, useState } from "react";


type input = {
    name: string | null,
    description: string | null,
    enterpriseId: number | null,
    enterprise: string | null,

};



export default function AddDepartment(){

    const [getEnterpriseId, setGetEnterpriseId] = useState<any[]>([])
    const [getEnterpriseIdOfAdmin, setGetEnterpriseIdOfAdmin] = useState<string | null>(null)
    const [getAdminRole, setGetAdminRole] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [inputs, setInputs] = useState<input>({
      name: null,
      description:  null,
      enterpriseId: null,
      enterprise: null,

    })

    //Récupération des entreprise
    useEffect(() =>{
        (async () => {

            const authToken = await localStorage.getItem("authToken")
            const role = await localStorage.getItem("role")
            const getEnterpriseIdOfAdmin = await localStorage.getItem("EnterpriseId")

            setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
            setGetAdminRole(role)

            const methodName = "getDepartmentPosts"

            const getEnterprise = await controllers.API.getAll(urlAPI, methodName, null)

            if(parseInt(getEnterpriseIdOfAdmin ?? "") !== 1){
            
                const filteredIdOfAdmin = getEnterprise.filter((item : {id: number}) => item.id === parseInt(getEnterpriseIdOfAdmin ?? "" ))

                setGetEnterpriseId(filteredIdOfAdmin)
                return;

            }
            setGetEnterpriseId(getEnterpriseId)
            console.log("l'id de l'entreprise", getEnterpriseId)
               
                
        })()
    }, [] )

    let arrayData = [
        {
            alias: "EnterpriseId",
            value: getEnterpriseId.filter(item => item.id === item.name).map(item => (
                {id: item.id, value: item.name}
            ))
        }
    ]

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true)

        const datas = {
            name : inputs.name,
            description: inputs.description,
            enterpriseId: inputs.enterpriseId,
            enterprise: inputs.enterprise
        }

        console.log("les données:", datas)

        const methodName = "creatDepartmentPost"
        const response = await controllers.API.SendOne(urlAPI, methodName, null)
        
       controllers.alertMessage(
        response.status,
        response.title,
        response.message,
        response.status ? "/dashboard/ADMIN/addDepartment" : null

       )

       setIsLoading(false)
       
    }
   

    return (
        <main className="bg-ray-100 dark:bg-transparent">
            <Header />
            
            <div className="flex">
                <Sidebar/>

                <div className="mx-4 mb-2 mt-4 w-full">

                     {
                      formElements.map((element) =>(
                          <div className="text-gray-700 space-y-4 md:space-y-0 w-full items-center">
                              <div className="flex justify-between flex-wrap">
                                  <h1 className="text-gray-700 text-[20pn] mb-3 font-bold dark:text-gray-300  ">
                                      Ajouter un départemnt
                                  </h1>
                                  <p className="text-blue-700 dark:text-blue-600" >
                                      Dashboard/ADMIN/Ajouter un départemnt
                                  </p>
                              </div>
                              
                              <hr className="bg-gray-400 h-[1px] boder-0 " />
                              <div className="flex flex-wrap py-4 itemq-center space-y-4 lg:space-x-4">
                                  {
                                      element.addOrUpdateUser.navigationLinks.map((element, index) => (
                                          <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-4 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative 2xl:top-2.5 " : 
                                              "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded"} >
                                              <FontAwesomeIcon icon={element.icon} className="text-white" /> <span className='text-white'>{element.title}</span>
                                          </Link>
                                          
                                      ))
                                  }
                                </div>
                            </div>
                          ))
                        }

                            <div className='dark:border mt-8 w-full font-semibold h-auto border-gray-400 dark:border-gray-300 
                                      rounded-[30px] border  dark:shadow-none p-4'>

                                        {
                                        formElements.map((item) => (

                                            <div className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                                <h2 className="font-bold">  </h2>
                                                <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p> 

                                            </div>

                                          ))
                                       }

                                      <hr className='bg-gray-400 border-0 h-[1px]' />
                                      <div className='grid grid-cols-1 mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3 font-semibold w-full'>
                                           {
                                             formElements.map((item) => (
                                              item.addOrUpdateUser.inputs.map((e, index) => (
                                                 <div key={index} className="w-full mb-4">
                                                     <label className="mb-4 font-semibold dark:text-gray-300 text-gray-700">
                                                         <span className={e.requireField ? "text-red-600" : "hidden"} >*</span>
                                                         {e.label}
                                                     </label>
                                                     {
                                                        !e.selectedInput ? 
                                                        <input onChange={(v) => {
                                                         setInputs({
                                                             ...inputs,
                                                             [e.alias]: v.target.value
                                                         })
                                                        }} className="w-full mt-1 outline-none rounded-md dark:shadow-none 
                                                        p-2.5 bg-transparent border-border-gray-400 dark:border-gray-300 dark:placeholder-gray-300 text-gray-700 dark:text-gray-300" 
                                                        type={e.type} placeholder={e.placeholder} />

                                                        :

                                                        <select onChange={(u) => {
                                                         setInputs({
                                                             ...inputs,
                                                             [e.alias]: u.target.value
                                                         })
                                                        }} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent 
                                                            border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700" >
                                                             <option selected>
                                                                 {e.placeholder}
                                                             </option>
                                                             {
                                                                e.dynamicOptions?.status && (
                                                                arrayData?.find(item => item.alias === e.alias)?.
                                                                value.map(option => (
                                                                    <option value={option.id}>
                                                                        {option.value}
                                                                    </option>
                                                                ))
                                                            )

                                                             }
                                                       </select>
                                                    }
                                                </div>
                                            ))
                                        ))
                                    }
                                </div>

                                <div className="flex w-full justify-end ">
                                    <button type="button" onClick={(e) => {
                                       handleSubmit(e)
                                       }} className="bg-blue-600 my-2 hover:bg-blue-700 relative 
                                          rounded-md font-semibold ease duration-500 text-white py-2.5 px-8">
                                            <p>Exécuter</p>
                                    </button>
                               </div>

                            </div>
                        </div>

            </div>
            
        </main>
    )
}