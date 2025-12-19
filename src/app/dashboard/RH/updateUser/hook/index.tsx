"use client";
import { useState, useEffect } from "react";
import { controllers, urlAPI } from "@/app/main";

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

export function UpdateUserHookModal() {
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
            console.log("l'utilisateur", getUser);
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
                status: getUser.status ? "Actif" : "Inactif"
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

    const dynamicOptions = [
        {
            alias: "EnterpriseId",
            arrayData: getEnterprises.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "departmentPostId",
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

    const staticsOptions = [
        {
            alias: "gender",
            arrayData: [{ title: "Homme", value: "Homme" }, { title: "Femme", value: "Femme" }, { title: "Aucun", value: "Aucun" }]
        },
        {
            alias: "status",
            arrayData: [{ title: "Actif", value: "Actif" }, { title: "Inactif", value: "Inactif" }]
        },
        {
            alias: "role",
            arrayData: [{ title: "Super-Admin", value: "Super-Admin" }, { title: "Controller-Admin", value: "Administrateur de contôle" }, { title: "Supervisor-Admin", value: "Administrateur de supervision" }, { title: "Client-User", value: "Utilisateur client" }]
        },
    ]

    const handleSubmit = async () => {
        setIsLoading(true);
        const userId = window.location.href?.split('/').pop();

        const requireFields = {
            firstname: inputs.firstname,
            lastname: inputs.lastname,
            gender: inputs.gender,
            password: inputs.password,
            EnterpriseId: inputs.EnterpriseId,
            birthDate: new Date(inputs.birthDate ?? "").toISOString(),
            address: inputs.address,
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
            adminService: inputs.adminService ?? null,
            status: inputs.status === "Actif" ? true : false
        }

        console.log(requireFields);
        const response = await controllers.API.UpdateOne(urlAPI, "updateUser", userId, requireFields);

        controllers.alertMessage(
            response.status,
            response.title,
            requireRoles.includes(requireFields.role ?? "") ? "L'administrateur a bien été enregistré" : response.message,
            response.status ? "/pages/dashboard/RH/updateUser/" + userId : null
        );

        setIsLoading(false);
    };

    return { dynamicOptions, staticsOptions, setInputs, inputs, handleSubmit, isLoading, setIsLoading }
}