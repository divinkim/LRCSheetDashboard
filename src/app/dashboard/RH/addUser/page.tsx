'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { formElements } from "@/components/FormElements/forms";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { urlAPI } from "@/app/main";
import { controllers } from "@/app/main";
import { cn } from "@/lib/utils";
import AddUserHookModal from "./hook";

type InputsValue = {
    firstname: string | null,
    lastname: string | null,
    birthDate: string | null,
    gender: string | null,
    email: string | null,
    password: string | null,
    phone: string | null,
    EnterpriseId: number | null,
    PostId: number | null,
    SalaryId: number | null,
    ContractTypeId: number | null,
    ContractId: number | null,
    CountryId: number | null,
    CityId: number | null,
    DistrictId: number | null,
    QuarterId: number | null,
    photo: string | null,
    role: string | null,
    DepartmentPostId: number | null,
    maritalStatus: string | null,
    adminService: string | null,
    [key: string]: string | number | null,
}

export default function AddUser() {
    const { dynamicArrayDatas, staticArrayData } = AddUserHookModal();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<InputsValue>({
        firstname: null,
        lastname: null,
        birthDate: null,
        gender: null,
        email: null,
        password: null,
        phone: null,
        EnterpriseId: null,
        PostId: null,
        SalaryId: null,
        ContractTypeId: null,
        ContractId: null,
        CountryId: null,
        CityId: null,
        DistrictId: null,
        QuarterId: null,
        photo: null,
        role: null,
        DepartmentPostId: null,
        maritalStatus: null,
        adminService: null,
    });

    //Récupère les données de champs en mémoire
    
    useEffect(() => {
        (() => {
            const inputMemory = localStorage.getItem("inputMemory");
            const parseInputMemory = JSON.parse(inputMemory ?? "");
            setInputs(parseInputMemory)
        })()
    }, []);

    console.log("les données en mémoire", inputs)

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);
        const requireFields = {
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            gender: inputs.gender,
            password: inputs.password,
            EnterpriseId: inputs.EnterpriseId,
            email: inputs.email,
            role: inputs.role ?? null,
            phone: inputs.phone ? `+242${inputs.phone}` : undefined,
            DepartmentPostId: inputs.DepartmentPostId ?? null,
            PostId: inputs.PostId ?? null,
            ContractTypeId: inputs.ContractTypeId ?? null,
            ContractId: inputs.ContractId ?? null,
            marialStatus: inputs.maritalStatus ?? null,
            SalaryId: inputs.SalaryId ?? null,
            CountryId: inputs.CountryId ?? null,
            CityId: inputs.CityId ?? null,
            DistrictId: inputs.DistrictId ?? null,
            QuarterId: inputs.QuarterId ?? null,
            adminService: inputs.adminService ?? "aucune donnée",
        }

        console.log(requireFields);

        const response = await controllers.API.SendOne(urlAPI, "createUser", null, requireFields);

        if (response.status) localStorage.removeItem("inputMemory")

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/RH/addUser" : null
        );

        setIsLoading(false);
    };

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
                                    <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">Ajouter un nouveau collaborateur</h1>
                                    <p className="text-blue-700 dark:text-blue-600">Dashboard/RH/Ajouter un collaborateur</p>
                                </div>
                                <hr className='bg-gray-400 border-0 h-[1px]' />
                                <div className="flex flex-wrap py-4 lg:space-x-4 space-y-4 items-center">
                                    {
                                        element.addOrUpdateUser.navigationLinks.map((element, index) => (
                                            <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-3 px-4 relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-4 hover:bg-blue-900 ease duration-500 py-3 px-4 relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-3 px-4"}>
                                                <FontAwesomeIcon icon={element.icon} className="text-white" /> <span className='text-white'>{element.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                    <div className='dark:border mt-8 w-full font-semibold h-auto border-gray-400 dark:border-gray-300 rounded-[30px] border  dark:shadow-none p-4'>
                        {
                            formElements.map((element) => (

                                <div className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                    <h2 className="font-bold">{element.addOrUpdateUser.addUserTitleForm}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>
                            ))
                        }
                        <hr className='bg-gray-400 border-0 h-[1px]' />
                        <div className={inputs.photo ? "block w-[150px] h-[150px] mt-5" : "hidden"}>
                            <img src={`${urlAPI}/images/${inputs.photo}`} alt="" className="w-full rounded-full h-full object-cover" />
                        </div>
                        <div className='grid grid-cols-1 mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3 font-semibold w-full'>
                            {
                                formElements.map((element) => (
                                    element.addOrUpdateUser.inputs.map((e, index) => (
                                        <div className={cn('w-full mb-4',)}>
                                            <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700"><span className={e.requireField ? "text-red-600" : "hidden"}>*</span> {e.label}</label>
                                            {!e.selectedInput ?
                                                <input value={inputs[e.alias] ?? ""} onChange={async (v) => {
                                                    let field = e.alias;
                                                    for (const [key, _] of Object.entries(inputs)) {
                                                        if (key === field) {
                                                            if (e.type === "file") {
                                                                const files = v.target.files?.[0];
                                                                const response = await controllers.API.SendOne(urlAPI, "sendFiles", null, { files });
                                                                if (response.status) {
                                                                    setInputs({
                                                                        ...inputs,
                                                                        [field]: response.filename
                                                                    })
                                                                }
                                                            }
                                                            setInputs({
                                                                ...inputs,
                                                                [key]: v.target.value
                                                            });
                                                            localStorage.setItem("inputMemory", JSON.stringify({ ...inputs, [key]:v.target.value }))
                                                        }
                                                    }


                                                }} type={e.type} maxLength={e.type === "tel" ? 9 : undefined} placeholder={e.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 f dark:text-gray-300 text-gray-700" />
                                                :
                                                <select value={inputs[e.alias] ?? ""} onChange={(v) => {
                                                    let field = e.alias;
                                                    for (const [key, _] of Object.entries(inputs)) {
                                                        if (key === field) {
                                                            setInputs({
                                                                ...inputs,
                                                                [field]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                            })
                                                            localStorage.setItem("inputMemory", JSON.stringify({
                                                                ...inputs,
                                                                [field]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                            }))
                                                        }
                                                    }
                                                  
                                                }} name="" id="" className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300 dark:bg-gray-900 f dark:placeholder-gray-300 dark:text-gray-300 text-gray-700">
                                                    <option value="" selected disabled>
                                                        {e.placeholder}
                                                    </option>
                                                    {
                                                        e.dynamicOptions?.status ? dynamicArrayDatas
                                                            .find(item => item.alias === e.alias)
                                                            ?.arrayData
                                                            ?.map(option => (
                                                                <option value={option.value}>
                                                                    {option.title}
                                                                </option>
                                                            )) :
                                                            staticArrayData.find(item => item.alias === e.alias)?.arrayData.map(option => (
                                                                <option value={option.value}>
                                                                    {option.title}
                                                                </option>
                                                            ))
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