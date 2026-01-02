"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Quarter = {
    name: string | null,
    CountryId: number,
    CityId: number,
    [key: string]: number | string | null,
}

export function AddQuarterHook() {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [inputs, setInputs] = useState<Quarter>({
        name: null,
        CountryId: 0,
        CityId: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    // // Récupération des type des villes en fonction du pays
    useEffect(() => {
        (async () => {
            const getCountries = await controllers.API.getAll(urlAPI, "getCountries", null);
            setCountries(getCountries);
            console.log(getCountries)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const getCities = await controllers.API.getAll(urlAPI, "getCities", null);
            const filteredCities = getCities.filter((city: any) => city.CountriesTypeId === inputs.CountryId)
            setCities(filteredCities)
        })()
    }, [inputs.CountryId]);

    async function handleSubmit() {
        setIsLoading(true);
    
        const fieldControlor = controllers.verifyRequireField(inputs);

        if (!fieldControlor.status) {
            setTimeout(() => {
                fieldControlor.message;
                setIsLoading(false);
            }, 1000)
            return
        }

        const response = await controllers.API.SendOne(urlAPI, "createDistrict", null, inputs);
        controllers.alertMessage(response.status,
            response.title, response.message,
            response.status ? "/dashboard/LOCALITY/districtsList" : null
        )
        setIsLoading(false);
    }

    let dynamicArrayDatas = [
        {
            alias: "CountryId",
            arrayData: countries.filter((item: { id: number, name: string }) => item.id && item.name).map((item: { id: number, name: string }) => ({ value: item.id, title: item.name }))
        },
        {
            alias: "CityId",
            arrayData: cities.filter((item: { id: number, name: string }) => item.id && item.name).map((item: { id: number, name: string }) => ({ value: item.id, title: item.name }))
        },

    ];

    return { inputs, setInputs, isLoading, setIsLoading, handleSubmit, dynamicArrayDatas };
}