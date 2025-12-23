'use client';
import { FormEvent, useEffect, useState } from "react";
import { urlAPI } from "@/app/main";
import { controllers } from "@/app/main";

type DynamicOrStaticArrayData = {
    alias: string,
    arrayData: {
        value: any,
        title: string,
    }[],
}

type EnterpriseProps = {
    name: string | null,
    description: string | null,
    logo: string | null,
    activityDomain: string | null,
    phone: string | null,
    toleranceTime: string | null,
    pourcentageOfHourlyDeduction: string | null,
    email: string | null,
    address: string | null,
    website: string | null,
    latitude: string | null,
    longitude: string | null,
    CityId: number,
    CountryId: number,
    legalForm: string | null,
    rccm: string | null,
    nui: string | null,
    subscriptionType: string | null,
    subscriptionStatus: string | null,
    [key: string]: string | null | number
}

export function EnterpriseHookModal() {
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [inputs, setInputs] = useState<EnterpriseProps>({
        name: "",
        description: "",
        logo: "",
        activityDomain: "",
        phone: "",
        toleranceTime: "",
        pourcentageOfHourlyDeduction: "",
        email: "",
        address: "",
        website: "",
        latitude: "",
        longitude: "",
        CityId: 0,
        CountryId: 0,
        legalForm: "",
        rccm: "",
        nui: "",
        subscriptionType: "",
        subscriptionStatus: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (() => {
            const inputMemory = window?.localStorage.getItem("inputMemoryAddEnterprisePage");
            inputMemory ? setInputs(JSON.parse(inputMemory ?? "")) : setInputs({ ...inputs });
        })();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);

        const requireField = {
            name: inputs.name,
            description: inputs.description,
            activityDomain: inputs.activityDomain,
            address: inputs.address,
            logo: inputs.logo,
            legalForm: inputs.legalForm,
            email: inputs.name,
            CountryId: inputs.CountryId,
            CityId: inputs.CityId
        }

        for (const field of Object.entries(requireField)) {
            if (!field) {
                return setTimeout(() => {
                    controllers.alertMessage(false, "Champs invalides!", "Veuillez remplir tous les champs obligatoitres.", null);
                    setIsLoading(false);
                }, 1500)
            }
        }

        const response = await controllers.API.SendOne(urlAPI, "createEnterprise", null, inputs);

        if (response.status) window?.localStorage.removeItem("inputMemory");

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/OTHERS/addEnterprise" : null
        );

        setIsLoading(false);
    };

    useEffect(() => {
        (async () => {
            const getCountries = await controllers.API.getAll(urlAPI, "getCountries", null);
            setCountries(getCountries)
        })();
    }, []);

    //Récupération des villes en fonction de valeur du nombre
    useEffect(() => {
        (async () => {
            const getCities = await controllers.API.getAll(urlAPI, "getCities", null);
            if (getCities?.length > 0) {
                const filteredCities = getCities.filter((item: { CountriesTypeId: number }) => item.CountriesTypeId === inputs.CountryId);
                setCities(filteredCities);
                console.log(filteredCities)
            }
        })();
    }, [inputs.CountryId]);

    const dynamicDatasArray: DynamicOrStaticArrayData[] = [
        {
            alias: "CountryId",
            arrayData: countries.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "CityId",
            arrayData: cities.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        }
    ];

    const staticDatasArray: DynamicOrStaticArrayData[] = [
        {
            alias: "subscriptionType",
            arrayData: [{ value: "starter", title: "starter" }, { value: "pro", title: "pro" }, { value: "premium", title: "premium" }]
        },
        {
            alias: "subscriptionStatus",
            arrayData: [{ title: "expiré", value: "expired" }, { title: "en cours", value: "onGoing" }]
        },
        {
            alias: "legalForm",
            arrayData: [{ title: "SARL", value: "SARL" }, { title: "SA", value: "SA" }, { title: "SARLU", value: "SARLU" }, { title: "ORGANISATION", value: "ORGANISATION" }]
        },
    ]

    return {
        dynamicDatasArray, staticDatasArray, handleSubmit, setInputs, isLoading, inputs
    }
}