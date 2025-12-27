'use client';
import { Header } from "@/components/Layouts/header";

import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import { FormEvent, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import AddDepartmentHookUser from "./hook/page";
import { parse } from "path";


export default function AddDepartment() {


     const { isLoading, dynamicArrayDatasCloned, inputs, setInputs, handleSubmit } = AddDepartmentHookUser()



     return (
         <main className="bg-ray-100 dark:bg-transparent">
             <Header />

             <div className="flex">
                 <Sidebar />

                 <div className="mx-4 mb-2 mt-4 w-full">

                     {
                         formElements.map((element) => (
                             <div className="text-gray-700 space-y-4 md:space-y-0 w-full items-center">
                                 <div className="flex justify-between flex-wrap">
                                     <h1 className="text-gray-700 text-[20pn] mb-3 font-bold dark:text-gray-300  ">
                                         {element.addDepartmentUser.titleDept}
                                     </h1>
                                     <p className="text-blue-700 dark:text-blue-600" >
                                         Dashboard/ADMIN/Ajouter un départemnt
                                     </p>
                                 </div>

                                <hr className="bg-gray-400 h-[1px] boder-0 " />
                                <div className="flex flex-wrap py-4 itemq-center space-y-4 lg:space-x-4">
                                    {
                                        element.addDepartmentUser.navigationDeptLinks.map((element, index) => (
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
                                     <h2 className="font-bold"> {item.addDepartmentUser.titleformDept} </h2>
                                     <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>

                                 </div>

                             ))
                         }

                         <hr className='bg-gray-400 border-0 h-[1px]' />
                         <div className='grid grid-cols-1 mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3 font-semibold w-full'>
                             {
                                 formElements.map((item) => (
                                     item.addDepartmentUser.inputDept.map((e, index) => (
                                         <div key={index} className="w-full mb-4">
                                             <label className="mb-4 font-semibold dark:text-gray-300 text-gray-700">
                                                 <span className={e.requireField ? "text-red-600" : "hidden"} >*</span>
                                                 {e.label}
                                             </label>
                                             {
                                                 e.selectedInput && !e.textarea ?
                                                     <input value={inputs[e.alias] ?? ""} onChange={async (v) => {
                                                         const field = e.alias
                                                         let fieldValue

                                                         if (e.type == "files") {
                                                             const files = v.target.files?.[0]
                                                             const methodName = "sendFiles"
                                                             const response = await controllers.API.SendOne(urlAPI, methodName, null, { files })
                                                             if (response.status) {
                                                                 fieldValue = {
                                                                     ...inputs,
                                                                     [field]: response.filename
                                                                 }

                                                                 setInputs(fieldValue)
                                                                 localStorage.setItem("inputMemory", JSON.stringify(fieldValue))
                                                             }
                                                             return
                                                         }
                                                         fieldValue = {
                                                             ...inputs,
                                                             [field]: v.target.value
                                                         }

                                                         setInputs(fieldValue)
                                                         localStorage.setItem("inputMemory", JSON.stringify(fieldValue))

                                                     }} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border
                                                      border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 font-normal dark:text-gray-300 text-gray-700"
                                                         type={e.type} placeholder={e.placeholder} />

                                                     :

                                                     !e.textarea && !e.selectedInput ?
                                                         <textarea placeholder={e.placeholder ?? ""} value={inputs[e.alias] ?? ""} onChange={(u) => {
                                                             const field = e.alias
                                                             const fieldValue = { ...inputs, [field]: u.target.value }
                                                             setInputs(fieldValue)

                                                             localStorage.setItem("inputMemory", JSON.stringify(fieldValue))

                                                         }}
                                                             className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 h-[100px] 
                                                         bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300
                                                         dark:text-gray-300 text-gray-700">

                                                         </textarea>

                                                         :

                                                         <select value={inputs[e.alias] ?? ""} onChange={(u) => {
                                                             const field = e.alias

                                                             const fieldValue = {
                                                                 ...inputs,
                                                                 [field]: e.type === "number" ? parseInt(u.target.value) : u.target.value
                                                             }

                                                             setInputs(fieldValue)
                                                             localStorage.setItem("inputMemory", JSON.stringify(fieldValue))

                                                        }} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent 
                                                            border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700" >
                                                            <option selected>
                                                                {e.placeholder}
                                                            </option>
                                                            {
                                                                e.dynamicOptions?.status && (
                                                                    dynamicArrayDatasCloned.find(item => item.alias === e.alias)?.
                                                                        arrayData.map(option => (
                                                                            <option value={option.value}>
                                                                                {option.title}
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
                             <button type="button" onClick={() => {

                                handleSubmit()

                             }} className="bg-blue-600 my-2 hover:bg-blue-700 relative 
                                 rounded-md font-semibold ease duration-500 text-white py-2.5 px-8">

                                 <p className={isLoading ? "hidden" : "block"} >Exécuter</p>
                                  <p className={isLoading ? "hidden" : "block"} ><ClipLoader color="#fff" size={16} /></p>

                             </button>
                         </div>

                     </div>
                 </div>
             </div>

         </main>
     )
}