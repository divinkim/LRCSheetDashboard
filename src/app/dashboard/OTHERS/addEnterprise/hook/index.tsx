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

type InputsValue = {
    EnterpriseId: number | null,
    DepartmentPostId: number | null,
    title: string | null,
    description: string | null,
    [key: string]: string | number | null
}

type DynamicOrStaticArrayData = {
    alias: string,
    arrayData: {
        value: any,
        title: string,
    }[],
}

export function EnterpriseHookModal() {
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [numberValue, setNumberValue] = useState(0);

    function getNumberValue(numberValue: number, alias: string) {
        if (alias === "CountryId") {
            setNumberValue(numberValue);
        }
    }

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
                const filteredCities = getCities.filter((item: { CountriesTypeId: number }) => item.CountriesTypeId === numberValue);
                setCities(filteredCities);
                console.log(filteredCities)
            }
        })();
    }, [numberValue]);

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
        dynamicDatasArray, staticDatasArray, getNumberValue
    }
}