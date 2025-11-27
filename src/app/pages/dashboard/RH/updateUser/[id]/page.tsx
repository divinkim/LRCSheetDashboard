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
    status: any,
    [key: string]: string | number | null | undefined,
}

export default function UpdateUser() {
    const [getEnterprises, setGetEnterprises] = useState<any[]>([]);
    const [getDepartmentPosts, setGetDepartmentPosts] = useState<any[]>([]);
    const [getPosts, setPosts] = useState<any[]>([]);
    const [getSalary, setSalary] = useState<any[]>([]);
    const [getContractTypes, setContractTypes] = useState<any[]>([]);
    const [getContracts, setContracts] = useState<any[]>([]);
    const [getCountry, setCountry] = useState<any[]>([]);
    const [getCity, setCity] = useState<any[]>([]);
    const [getDistrict, setDistrict] = useState<any[]>([]);
    const [getQuarter, setQuarter] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [getEnterpriseIdOfadmin, setEnterpriseIdOfAdmin] = useState<string | null>(null)
    const [getAdminRole, setAdminRole] = useState<string | null>(null)
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
        status: ""
    });

    const requireRoles = ['Super-Admin', 'Supervisor-Admin', 'Moderator-Admin'];

    // Récupération des entreprises et filtrage en fonction de l'id de l'administrateur courant
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

    //Récupération des données de l'utilisateur en fonction de l'id sur le navigateur

    useEffect(() => {
        (async () => {
            const getUserId = window.location.href.split('/').pop();
            const getUser = await controllers.API.getOne(urlAPI, "getUser", parseInt(getUserId ?? ""));
            console.log("l'utilisateur", getUser)
            setInputs({
                firstname: getUser.firstname ?? null,
                lastname: getUser.lastname ?? null,
                birthDate: new Date(getUser.birthDate)?.toISOString()?.split("T")[0] ?? null,
                gender: getUser.gender ?? null,
                email: getUser.email ?? null,
                password: getUser.password ?? null,
                phone: getUser.phone ?? null,
                EnterpriseId: getUser.EnterpriseId ?? null,
                PostId: getUser.PostId ?? null,
                SalaryId: getUser.SalaryId ?? null,
                ContractTypeId: getUser.ContractTypeId ?? null,
                ContractId: getUser.ContractId ?? null,
                CountryId: getUser.CountryId ?? null,
                CityId: getUser.CityId ?? null,
                DistrictId: getUser.DistrictId ?? null,
                QuarterId: getUser.QuarterId ?? null,
                photo: getUser.photo ?? null,
                role: getUser.role ?? null,
                DepartmentPostId: getUser.DepartmentPostId ?? null,
                maritalStatus: getUser.marialStatus ?? null,
                adminService: getUser.adminService ?? null,
                status: getUser.status ?? null
            })
        })()
    }, [getAdminRole])

    // Récupération des départements d'entreprises
    useEffect(() => {
        (async () => {
            const getDepartmentPosts = await controllers.API.getAll(urlAPI, "getDepartmentPosts", null);
            if (getAdminRole !== "Super-Admin") {
                const filteredDepartmentPosts = getDepartmentPosts.filter((department: { EnterpriseId: number }) => department.EnterpriseId === inputs.EnterpriseId);
                setGetDepartmentPosts(filteredDepartmentPosts)
            } else {
                setGetDepartmentPosts(getDepartmentPosts)
            }
        })()
    }, [inputs.EnterpriseId]);

    // // Récupération des postes d'entreprises
    useEffect(() => {
        (async () => {
            const getPosts = await controllers.API.getAll(urlAPI, "getPosts", null);
            const filteredPosts = getPosts.filter((post: { EnterpriseId: number, DepartmentPostId: number }) => post.DepartmentPostId === inputs.DepartmentPostId && post.EnterpriseId === inputs.EnterpriseId);
            setPosts(filteredPosts)
            console.log(filteredPosts);
        })()
    }, [inputs.DepartmentPostId, inputs.EnterpriseId]);

    // // Récupération des salaires
    useEffect(() => {
        (async () => {
            const getSalaries = await controllers.API.getAll(urlAPI, "getSalaries", null);
            const filteredSalries = getSalaries.filter((salary: { EnterpriseId: number, DepartmentId: number, PostId: number }) => salary.PostId === inputs.PostId && salary.EnterpriseId === inputs.EnterpriseId);
            setSalary(filteredSalries)
            console.log(filteredSalries);
        })()
    }, [inputs.PostId]);

    // Récupération des type de Contrat
    useEffect(() => {
        (async () => {
            const getContractTypes = await controllers.API.getAll(urlAPI, "getContractTypes", null);
            const filterContractTypes = getContractTypes.filter((contractType: { EnterpriseId: number, ContractTypeId: number }) => contractType.EnterpriseId === inputs.EnterpriseId)
            setContractTypes(filterContractTypes)
            console.log(filterContractTypes);
        })()
    }, [inputs.EnterpriseId]);

    // // Récupération des Contrat
    useEffect(() => {
        (async () => {
            const getContracts = await controllers.API.getAll(urlAPI, "getContracts", null);
            const filterContracts = getContracts.filter((contract: { EnterpriseId: number, ContractTypeId: number }) => contract.ContractTypeId === inputs.ContractTypeId && contract.EnterpriseId === inputs.EnterpriseId)
            setContracts(filterContracts)
            console.log(filterContracts);
        })()
    }, [inputs.ContractTypeId]);

    // // Récupération des type des pays
    useEffect(() => {
        (async () => {
            setTimeout(async () => {
                const getCountries = await controllers.API.getAll(urlAPI, "getCountries", null);
                setCountry(getCountries);
                console.log(getCountries)
            }, 2000)
        })();
    }, []);

    // // Récupération des type des villes en fonction du pays
    useEffect(() => {
        (async () => {

            const getCities = await controllers.API.getAll(urlAPI, "getCities", null);
            const filteredCities = getCities.filter((city: any) => city.CountriesTypeId === inputs.CountryId)
            setCity(filteredCities)
        })()
    }, [inputs.CountryId]);

    // // Récupération des arrondissements en fonction de la ville
    useEffect(() => {
        (async () => {
            const getDistricts = await controllers.API.getAll(urlAPI, "getDistricts", null);
            const filteredDistricts = getDistricts.filter((district: any) => district.CityId === inputs.CityId)
            setTimeout(() => {
                setDistrict(filteredDistricts)
            }, 2000)
            console.log(filteredDistricts);
        })()
    }, [inputs.CityId]);

    // // Récupération des quartiers en fonction de la ville
    useEffect(() => {
        (async () => {
            const getQuarters = await controllers.API.getAll(urlAPI, "getQuarters", null);
            const filteredQuarters = getQuarters.filter((quarter: any) => quarter.DistrictId === inputs.DistrictId)
            setTimeout(() => {
                setQuarter(filteredQuarters)
            }, 2000)
            console.log(filteredQuarters);
        })()
    }, [inputs.DistrictId]);

    // const adminRoles = ['Super-Admin', 'Supervisor-Admin'];
    // const role = localStorage.getItem("adminRole") ?? "";

    let arrayDatas = [
        {
            alias: "EnterpriseId",
            value: getEnterprises.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        },
        {
            alias: "departmentPostId",
            value: getDepartmentPosts.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        },
        {
            alias: "PostId",
            value: getPosts.filter(item => item.id && item.title).map(item => ({ id: item.id, title: item.title }))
        },
        {
            alias: "SalaryId",
            value: getSalary.filter(item => item.id && item.netSalary).map(item => ({ id: item.id, title: item.netSalary }))
        },
        {
            alias: "ContractTypeId",
            value: getContractTypes.filter(item => item.id && item.title).map(item => ({ id: item.id, title: item.title }))
        },
        {
            alias: "ContractId",
            value: getContracts.filter(item => item.id && item.delay).map(item => ({ id: item.id, title: item.delay }))
        },
        {
            alias: "CountryId",
            value: getCountry.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        },
        {
            alias: "CityId",
            value: getCity.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        },
        {
            alias: "DistrictId",
            value: getDistrict.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        },
        {
            alias: "QuarterId",
            value: getQuarter.filter(item => item.id && item.name).map(item => ({ id: item.id, title: item.name }))
        }
    ];

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
            adminService: inputs.adminService ?? "no data",
            status: inputs.status === "Actif" ? true : false
        }

        console.log(requireFields);

        const response = await controllers.API.SendOne(urlAPI, "createUser", null, requireFields);

        controllers.alertMessage(
            response.status,
            response.title,
            requireRoles.includes(requireFields.role ?? "") ? "L'administrateur a bien été enregistré" : response.message,
            response.status ? "/dashboard/RH/addUser" : null
        );

        setIsLoading(false);
    };

    const staticsOptions = [
        {
            alias: "gender",
            value: [{ title: "Homme", value: "Homme" }, { title: "Femme", value: "Femme" }, { title: "Aucun", value: "Aucun" }]
        },
        {
            alias: "status",
            value: [{ title: "Actif", value: "Actif" }, { title: "Inactif", value: "Inactif" }]
        },
        {
            alias: "role",
            value: [{ title: "Super-Admin", value: "Super-Admin" }, { title: "Controller-Admin", value: "Administrateur de contôle" }, { title: "Supervisor-Admin", value: "Administrateur de supervision" }, { title: "Client-User", value: "Utilisateur client" }]
        },
    ]

    return (
        <main className="bg-gray-100 text-gray-700 font-semibold dark:text-gray-300 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 mt-6 mb-4 w-full">
                    {
                        formElements.map((element) => (
                            <div className="flex-col flex-wrap text-gray-700 w-full space-y-4 md:space-y-0 items-center justify-between">
                                <div className="flex w-full justify-between flex-wrap">
                                    <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">Modifier un collaborateur existant</h1>
                                    <p className="text-blue-700 dark:text-blue-600">Dashboard/RH/Modifier un collaborateur</p>
                                </div>
                                <hr className="bg-gray-400 h-[1px] border-0" />
                                <div className="flex flex-wrap p-4 font-normal space-x-4 space-y-4 items-center">
                                    {
                                        element.addOrUpdateUser.navigationLinks.map((element, index) => (
                                            <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-5 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded"}>
                                                <FontAwesomeIcon icon={element.icon} className="text-white" /> <span className='text-white'>{element.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }

                    <div className='dark:border mt-8 w-full h-auto border-gray-400 dark:border-gray-300 rounded-[30px] border  dark:shadow-none p-4'>
                        {
                            formElements.map((element) => (

                                <div className="flex flex-wrap space-y-4 justify-between mb-2 items-center dark:text-gray-300 text-gray-700">
                                    <h2 className="font-bold">{element.addOrUpdateUser.updateUserTitleForm}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>
                            ))
                        }
                        <hr className="bg-gray-400 h-[1px] border-0" />
                        <div className={inputs.photo ? "block w-[150px] mt-4 h-[150px]" : "hidden"}>
                            <img src={`${urlAPI}/images/${inputs.photo}`} alt="" className="w-full rounded-full h-full object-cover" />
                        </div>
                        <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3 w-full'>

                            {
                                formElements.map((element) => (
                                    element.addOrUpdateUser.inputs.map((e, index) => (
                                        <div key={index} className="w-full">
                                            <div className='w-full'>

                                                <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700"><span className={e.requireField ? "text-red-600" : "hidden"}>*</span> {e.label}</label>
                                                {!e.selectedInput ?
                                                    <input value={e.type !== "file" && e.type !== "password" ? (inputs[e.alias] ?? "") : ""} onChange={async (v) => {
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

                                                    }} type={e.type} maxLength={e.type === "tel" ? 9 : undefined} placeholder={e.placeholder} className="w-full mt-1 outline-none rounded-md font-semibold dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300  dark:text-gray-300 text-gray-700" />
                                                    :
                                                    <select value={inputs[e.alias] ?? ""} onChange={(v) => {
                                                        for (const [key, _] of Object.entries(inputs)) {
                                                            if (key === e.alias) {
                                                                setInputs({
                                                                    ...inputs,
                                                                    [e.alias]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                                })
                                                            }
                                                        }

                                                    }} name="" id="" className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-semibold dark:placeholder-gray-300 dark:text-gray-300 text-gray-700">
                                                        <option value="" selected disabled>
                                                            {e.placeholder}
                                                        </option>
                                                        {
                                                            e.dynamicOptions?.status ? arrayDatas
                                                                .find(item => item.alias === e.alias)
                                                                ?.value
                                                                ?.map(option => (
                                                                    <option value={option.id}>
                                                                        {option.title}
                                                                    </option>
                                                                )) :
                                                                // staticsOptions.map((v) => (
                                                                //     v.value.map((item) => (
                                                                //         <option value={item.value} className={e.alias !== v.alias ? "hidden" : "block"}>
                                                                //             {item.value}
                                                                //         </option>
                                                                //     ))
                                                                // ))
                                                                staticsOptions.find(item => item.alias === e.alias)?.value.map((item) => (
                                                                    <option value={item.title}>
                                                                        {item.value}
                                                                    </option>
                                                                ))
                                                        }
                                                    </select>
                                                }

                                            </div>
                                        </div>

                                    ))
                                ))
                            }

                        </div>
                        <div className="flex w-full justify-end ">
                            <button type="button" onClick={(e) => {
                                handleSubmit(e)
                            }} className="bg-blue-600 my-2 hover:bg-blue-700 relative mt-5 rounded-md font-semibold ease duration-500 text-white py-2.5 px-8">
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