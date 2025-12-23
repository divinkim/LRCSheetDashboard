'use client';
import { urlAPI } from "@/app/main";
import { controllers } from "@/app/main";
import { FormEvent, useEffect, useState } from "react";

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

export default function AddUserHookModal() {
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
    });

    const [isLoading, setIsLoading] = useState(false);


    //Récupère les données de champs en mémoire

    useEffect(() => {
        (() => {
            const inputMemory = window?.localStorage.getItem("inputMemoryOfAddUserPage");
            const parseInputMemory = JSON.parse(inputMemory ?? "");
            setInputs(parseInputMemory)
        })()
    }, []);

    console.log("les données en mémoire", inputs)

    // Récupération des entreprises et filtrage en fonction de l'id de l'administrateur courant
    useEffect(() => {
        if (typeof (window) === "undefined") return; // important
        (async () => {
            const role = window?.localStorage.getItem("adminRole");
            const getEnterpriseIdOfAdmin = window?.localStorage.getItem("EnterpriseId");

            setEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin);
            setAdminRole(role);

            const getEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {
                const filterEnterpriseByEnterpriseId = getEnterprises.filter(
                    (enterprise: { id: number }) => enterprise.id === parseInt(getEnterpriseIdOfAdmin ?? "")
                );
                setGetEnterprises(filterEnterpriseByEnterpriseId);
                return;
            }

            setGetEnterprises(getEnterprises);
        })();
    }, []);

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
    // const role = window?.localStorage.getItem("adminRole") ?? "";

    let dynamicArrayDatas = [
        {
            alias: "EnterpriseId",
            arrayData: getEnterprises.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "DepartmentPostId",
            arrayData: getDepartmentPosts.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "PostId",
            arrayData: getPosts.filter(item => item.id && item.title).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "SalaryId",
            arrayData: getSalary.filter(item => item.id && item.netSalary).map(item => ({ value: item.id, title: item.netSalary }))
        },
        {
            alias: "ContractTypeId",
            arrayData: getContractTypes.filter(item => item.id && item.title).map(item => ({ value: item.id, title: item.title }))
        },
        {
            alias: "ContractId",
            arrayData: getContracts.filter(item => item.id && item.delay).map(item => ({ value: item.id, title: item.delay }))
        },
        {
            alias: "CountryId",
            arrayData: getCountry.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "CityId",
            arrayData: getCity.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "DistrictId",
            arrayData: getDistrict.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "QuarterId",
            arrayData: getQuarter.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        }
    ];

    let staticArrayData = [
        {
            alias: "gender",
            arrayData: [
                { title: "Homme", value: "Homme" },
                {
                    title: "Femme",
                    value: "Femme"
                },
                {
                    title: "Aucun",
                    value: "Aucun"
                }
            ]

        },

        {
            alias: "role",
            arrayData: [
                {
                    title: "Super administrateur",
                    value: "Super-Admin"
                },
                {
                    title: "Administrateur de gestion",
                    value: "Supervisor-Admin"
                },
                {
                    title: "Administrateur de contrôle",
                    value: "Controllor-Admin"
                }
            ]
        },
    ]

    const handleSubmit = async () => {
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

        if (response.status) window?.localStorage.removeItem("inputMemory")

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/RH/addUser" : null
        );

        setIsLoading(false);
    };

    return { dynamicArrayDatas, staticArrayData, handleSubmit, inputs, setInputs, isLoading }
}