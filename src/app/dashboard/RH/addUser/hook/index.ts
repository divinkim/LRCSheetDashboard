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
    const [getEnterprises, setEnterprises] = useState<any[]>([]);
    const [getDepartmentPosts, setDepartmentPosts] = useState<any[]>([]);
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

    // Récupération des entreprises et filtrage en fonction de l'id de l'administrateur courant
    useEffect(() => {
        (async () => {
            const getInputMemory = localStorage.getItem("inputMemoryOfAddUserPage");
            getInputMemory ? setInputs(JSON.parse(getInputMemory ?? "")) : setInputs({ ...inputs });

            const role = localStorage.getItem("adminRole");
            const enterpriseIdOfAdmin = localStorage.getItem("EnterpriseId");

            const getEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);

            const getEnterpriseByAdminEnterpriseId = getEnterprises;

            setEnterprises(getEnterpriseByAdminEnterpriseId);
            setEnterpriseIdOfAdmin(enterpriseIdOfAdmin);
            setAdminRole(role);
        })();
    }, []);
    console.log("les entreprises", getEnterprises)
    // Récupération des départements d'entreprises
    useEffect(() => {
        (async () => {
            const getDepartmentPosts = await controllers.API.getAll(urlAPI, "getDepartmentPosts", null);
            const filterDepartmentsByAdminEnterpriseId = getDepartmentPosts.filter((department: { EnterpriseId: number }) => department.EnterpriseId === inputs.EnterpriseId);
            setDepartmentPosts(filterDepartmentsByAdminEnterpriseId)
        })()
    }, [inputs.EnterpriseId]);

    // // Récupération des postes d'entreprises
    useEffect(() => {
        (async () => {
            const getPosts = await controllers.API.getAll(urlAPI, "getPosts", null);
            const filteredPosts = getPosts.filter((post: { EnterpriseId: number, DepartmentPostId: number }) => post.DepartmentPostId === inputs.DepartmentPostId && post.EnterpriseId === inputs.EnterpriseId);
            setPosts(filteredPosts)
            console.log("Voici la liste des postes", filteredPosts);
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
    }, [inputs.PostId, inputs.EnterpriseId]);

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
            arrayData: getPosts.filter(item => item.id && item.title).map(item => ({ value: item.id, title: item.title }))
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
                },
                {
                    title: "Utilisateur client",
                    value: "Client-User"
                }
            ]
        },
        {
            alias: "adminService",
            arrayData: [
                { title: "Administration", value: "ADMINISTRATION" },
                { title: "Ressouces humaines", value: "RH" },
                { title: "Comptabilité", value: "COMPTA" },
            ]
        },
        {
            alias: "maritalStatus",
            arrayData: [
                { title: "Célibataire", value: "Célibataire" },
                { title: "Fiancé", value: "Fiancé" },
                { title: "En couple", value: "En couple" },
                { title: "Divorcé(e)", value: "Divorcé(e)" }
            ]
        }
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
            CountryId: inputs.CountryId ?? null,
            CityId: inputs.CityId ?? null,
        }

        const validation = controllers.verifyRequireField(requireFields);

        if (!validation.status) {
            validation.message;
            setIsLoading(false);
            return;
        }

        const response = await controllers.API.SendOne(urlAPI, "createUser", null, inputs);

        if (response.status) localStorage.removeItem("inputMemoryOfAddUserPage");

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/RH/addUser" : null
        );

        setIsLoading(false);
    };

    console.log("les datas",inputs);

    return { dynamicArrayDatas, staticArrayData, handleSubmit, inputs, setInputs, isLoading }
}