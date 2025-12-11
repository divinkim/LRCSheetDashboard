'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { controllers } from "@/app/main";
import { cn } from "@/lib/utils";
import { urlAPI } from "@/app/main";

type Salary = {
    grossSalary: string | null,
    dailySalary: string | null,
    EnterpriseId: number,
    PostId: number,
}

export default function AddSalary() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<Salary>({
        grossSalary: null,
        dailySalary: null,
        EnterpriseId: 0,
        PostId: 0,
    });

    const [getEnterprises, setGetEnterprises] = useState<any[]>([]);
    const [getEnterpriseIdOfadmin, setEnterpriseIdOfAdmin] = useState<string | null>(null);
    const [getAdminRole, setAdminRole] = useState<string | null>(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const authToken = localStorage.getItem("authToken");
            const role = localStorage.getItem("adminRole");
            let getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId");

            setEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin);
            setAdminRole(role)

            // if (authToken === null) {
            //     return window.location.href = "/"
            // } else if (!requireRoles.includes(role ?? "")) {
            //     Swal.fire({
            //         icon: "warning",
            //         title: "Violation d'accès !",
            //         text: "Vous n'êtes pas autorisé à accéder à cette page. Veuillez vous rapprocher de votre administreur pour plus d'infos !",
            //     });
            //     setTimeout(() => {
            //         window.location.href = "/Dashboard"

            //     }, 2000);
            // }

            const getEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {

                const filterEnterpriseByEnterpriseId = getEnterprises.filter((enterprise: { id: number }) => enterprise.id === parseInt(getEnterpriseIdOfAdmin ?? ""));
                setGetEnterprises(filterEnterpriseByEnterpriseId);
                return
            }
            setGetEnterprises(getEnterprises);
            console.log(getEnterprises);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const getPosts = await controllers.API.getAll(urlAPI, "getPosts", null);
            const filteredPosts = getPosts.filter((post: { EnterpriseId: number }) => post.EnterpriseId === inputs.EnterpriseId);
            setPosts(filteredPosts)
            console.log(filteredPosts);
        })()
    }, [inputs.EnterpriseId]);

    const dynamicOptions = [
        {
            alias: "EnterpriseId",
            arrayMaped: getEnterprises.filter((enterprise: { id: number, name: string }) => enterprise.id?.toString() && enterprise.name).map((enterprise: { id: number, name: string }) => ({ value: enterprise.id?.toString(), title: enterprise.name }))
        },
        {
            alias: "PostId",
            arrayMaped: posts.filter((post: { id: number, title: string }) => post.id?.toString() && post.title).map((post: { id: number, title: string }) => ({ value: post.id?.toString(), title: post.title }))
        }
    ]


    const handleSubmit = async () => {
        setIsLoading(true);
        const data = {
            ...inputs,
            netSalary:inputs.grossSalary
        }
       
        const response = await controllers.API.SendOne(urlAPI, "addSalary", null, data);
        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/pages/dashboard/COMPTA/addSalary" : null
        );

        setIsLoading(false);
    };

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 mt-6 mb-4 w-full">
                    {
                        formElements.map((element) => (
                            <div className="text-gray-700 w-full space-y-4 md:space-y-0 items-center">
                                <div className="flex justify-between flex-wrap">
                                    <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">Ajouter un salaire</h1>
                                    <p className="text-blue-700 dark:text-blue-600">Dashboard/COMPTA/Ajouter un salaire</p>
                                </div>
                                <hr className='bg-gray-400 border-0 h-[1px]' />
                                <div className="flex flex-wrap py-4 lg:space-x-4 space-y-4 items-center">
                                    {
                                        element.addOrUpdateSalary.navigationLinks.map((element, index) => (
                                            <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-4 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded"}>
                                                <FontAwesomeIcon icon={element.icon} className="text-white" /> <span className='text-white'>{element.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <div className='dark:border mt-8 w-full xl:w-[55%] mx-auto font-semibold h-auto border-gray-400 dark:border-gray-300 rounded-[30px] border  dark:shadow-none px-4 py-8'>
                        {
                            formElements.map((element) => (

                                <div className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                    <h2 className="font-bold">{element.addOrUpdateUser.addUserTitleForm}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>
                            ))
                        }
                        <hr className='bg-gray-400 border-0 h-[1px]' />

                        <div className='grid grid-cols-1  mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-2 font-semibold w-full'>
                            {
                                formElements.map((element) => (
                                    element.addOrUpdateSalary.inputs.map((e, index) => (
                                        <div className={cn('w-full mb-4',)}>
                                            <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700"><span className={e.requireField ? "text-red-600" : "hidden"}>*</span> {e.label}</label>
                                            {!e.selectedInput ?
                                                <input onChange={async (v) => {
                                                    for (const [key, _] of Object.entries(inputs)) {
                                                        if (key === e.alias) {
                                                            if (e.type === "file") {
                                                                const files = v.target.files?.[0];
                                                                const response = await controllers.API.SendOne(urlAPI, "sendFiles", null, { files });
                                                                console.log("L efichier image", response)
                                                                if (response.status) {
                                                                    setInputs({
                                                                        ...inputs,
                                                                        [e.alias]: response.filename
                                                                    })
                                                                }
                                                            }
                                                            setInputs({
                                                                ...inputs,
                                                                [e.alias]: v.target.value
                                                            })
                                                        }
                                                    }

                                                }} type={e.type} maxLength={e.type === "tel" ? 9 : undefined} placeholder={e.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 f dark:text-gray-300 text-gray-700" />
                                                :
                                                <select onChange={(v) => {
                                                    for (const [key, _] of Object.entries(inputs)) {
                                                        if (key === e.alias) {
                                                            setInputs({
                                                                ...inputs,
                                                                [e.alias]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                            })
                                                        }
                                                    }

                                                }} name="" id="" className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300 dark:bg-gray-900 f dark:placeholder-gray-300 dark:text-gray-300 text-gray-700">
                                                    <option value="" selected disabled>
                                                        {e.placeholder}
                                                    </option>
                                                    {
                                                        e.dynamicOptions?.status ? dynamicOptions.find(item => item.alias === e.alias)
                                                            ?.arrayMaped
                                                            ?.map(option => (
                                                                <option value={option.value}>
                                                                    {option.title}
                                                                </option>
                                                            )) :
                                                            <div>
                                                            </div>
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