"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Ciy = {
    name: string | null,
    CountriesTypeId: number,
    [key: string]: number | string | null,
}

export function AddCityHook() {
    const [countries, setCountries] = useState([]);

    const [inputs, setInputs] = useState<Ciy>({
        name: null,
        CountriesTypeId: 0,
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

        const response = await controllers.API.SendOne(urlAPI, "createCity", null, inputs);
        controllers.alertMessage(response.status,
            response.title, response.message,
            response.status ? "/dashboard/LOCALITY/citiesList" : null
        )
        setIsLoading(false);
    }

    let dynamicArrayDatas = [
        {
            alias: "CountriesTypeId",
            arrayData: countries.filter((item: { id: number, name: string }) => item.id && item.name).map((item: { id: number, name: string }) => ({ value: item.id, title: item.name }))
        },
    ];

    return { inputs, setInputs, isLoading, setIsLoading, handleSubmit, dynamicArrayDatas };
}