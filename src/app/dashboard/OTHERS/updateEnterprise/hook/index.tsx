"use client";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { controllers } from "@/app/main";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { formElements } from "@/components/FormElements/forms";
import { urlAPI } from "@/app/main";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type EnterpriseProps = {
    name: string | null,
    description: string | null,
    logo: string | null,
    activityDomain: string | null,
    phone: string | null,
    // toleranceTime: string | null,
    // pourcentageOfHourlyDeduction: string | null,
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
    [key: string]: string | number | null | undefined,
}

export function UpdateEnterpriseHook() {
    const [inputs, setInputs] = useState<EnterpriseProps>({
        name: null,
        description: null,
        logo: null,
        activityDomain: null,
        phone: null,
        // toleranceTime: null,
        // pourcentageOfHourlyDeduction: null,
        email: null,
        address: null,
        website: null,
        latitude: null,
        longitude: null,
        CityId: 0,
        CountryId: 0,
        legalForm: null,
        rccm: null,
        nui: null,
        subscriptionType: null,
        subscriptionStatus: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const getEnterpriseId = window.location.href.split('/').pop();
            const getEnterprise = await controllers.API.getOne(urlAPI, "getEnterprise", parseInt(getEnterpriseId ?? ""));

            setInputs({
                name: getEnterprise?.name ?? inputs.name,
                description: getEnterprise?.description ?? inputs.description,
                logo: getEnterprise?.logo ?? inputs.logo,
                activityDomain: getEnterprise?.activityDomain ?? inputs.activityDomain,
                phone: getEnterprise?.phone?.length === 13 ? getEnterprise?.phone : inputs.phone,
                // toleranceTime: getEnterprise?.toleranceTime ?? null,
                // pourcentageOfHourlyDeduction: getEnterprise?.pourcentageOfHourlyDeduction ?? null,
                email: getEnterprise?.email ?? inputs.email,
                address: getEnterprise?.address ?? inputs.address,
                website: getEnterprise?.website ?? inputs.website,
                latitude: getEnterprise?.latitude ?? inputs.latitude,
                longitude: getEnterprise?.longitude ?? inputs.longitude,

                CityId: getEnterprise?.CityId ?? inputs.CityId,
                CountryId: getEnterprise?.CountryId ?? inputs.CountryId,

                legalForm: getEnterprise?.legalForm ?? inputs.legalForm,
                rccm: getEnterprise?.rccm ?? inputs.rccm,
                nui: getEnterprise?.nui ?? inputs.nui,
                subscriptionType: getEnterprise?.subscriptionType ?? inputs.subscriptionType,
                subscriptionStatus: getEnterprise?.subscriptionStatus ?? inputs.subscriptionStatus,
            });

        })()
    }, [])

    useEffect(() => {
        (async () => {
            const getCountries = await controllers.API.getAll(urlAPI, "getCountries", null);
            setCountries(getCountries)
        })();
    }, []);

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

    const handleSubmit = async () => {
        setIsLoading(true);
        const getEnterpriseId = window.location.href.split('/').pop();
        const response = await controllers.API.UpdateOne(urlAPI, "updateEnterprise", getEnterpriseId, inputs);

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? `/dashboard/OTHERS/updateEnterprise/${getEnterpriseId}` : null
        );

        setIsLoading(false);
    };

    const dynamicOptions = [
        {
            alias: "CountryId",
            arrayData: countries.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "CityId",
            arrayData: cities.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },

    ];

    const staticOptions = [
        {
            alias: "subscriptionType",
            arrayData: [{ title: "Offre starter", value: "starter" }, { title: "Offre pro", value: "pro" }, { title: "Offre premium", value: "premium" }]
        },
        {
            alias: "subscriptionStatus",
            arrayData: [{ title: "Expiré", value: "expired" }, { title: "En cours..", value: "onGoing" }]
        },
        {
            alias: "legalForm",
            arrayData: [{ title: "SARL", value: "SARL" }, { title: "SA", value: "SA" }, { title: "SARLU", value: "SARLU" }, { title: "ORGANISATION", value: "ORGANISATION" }]
        },
    ]

    return { dynamicOptions, staticOptions, inputs, setInputs, isLoading, handleSubmit }
}