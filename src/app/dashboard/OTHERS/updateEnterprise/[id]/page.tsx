'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { controllers } from "@/app/main";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { formElements } from "@/components/FormElements/forms";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { urlAPI } from "@/app/main";
import { cn } from "@/lib/utils";

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

export default function UpdateEnterprise() {
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

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true);
        const getEnterpriseId = window.location.href.split('/').pop();
        const response = await controllers.API.UpdateOne(urlAPI, "updateEnterprise", getEnterpriseId, inputs);

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? `/pages/dashboard/OTHERS/updateEnterprise/${getEnterpriseId}` : null
        );

        setIsLoading(false);
    };

    const arrayOptions = [
        {
            alias: "CountryId",
            value: countries.filter(item => item.id && item.name).map(item => ({ id: item.id, value: item.name }))
        },
        {
            alias: "CityId",
            value: cities.filter(item => item.id && item.name).map(item => ({ id: item.id, value: item.name }))
        },
        {
            alias: "subscriptionType",
            value: [{ id: 0, value: "starter" }, { id: 1, value: "pro" }, { id: 2, value: "premium" }]
        },
        {
            alias: "subscriptionStatus",
            value: [{ id: 0, value: "expired" }, { id: 1, value: "onGoing" }]
        },
        {
            alias: "legalForm",
            value: [{ id: 0, value: "SARL" }, { id: 1, value: "SA" }, { id: 1, value: "SARLU" }, { id: 1, value: "ORGANISATION" }]
        },
    ]

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
                                    <h1 className="font-bold mb-3 text-[20px] dark:text-gray-300 text-gray-700">Modifier une entreprise existante</h1>
                                    <p className="text-blue-700 dark:text-blue-600">Dashboard/Autres/Modifier une entreprise</p>
                                </div>
                                <hr />
                                <div className="flex flex-wrap py-4 lg:space-x-4 space-y-4 items-center">
                                    {
                                        element.addOrUpdateEnterprise.navigationLinks.map((element, index) => (
                                            <Link href={element.href} className={index === 0 ? "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative top-2.5" : index === 5 ? "bg-blue-800 2xl:right-4 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded relative 2xl:top-2.5 " : "bg-blue-800 hover:bg-blue-900 ease duration-500 py-2 px-4 rounded"}>
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
                                    <h2 className="font-bold">{element.addOrUpdateEnterprise.updateEnterpriseTitleForm}</h2>
                                    <p className="font-semibold"> <span className="text-red-600">*</span> Champs obligatoires</p>
                                </div>
                            ))
                        }
                        <hr />
                        <div className='grid grid-cols-1 mt-4 gap-x-4 md:grid-cols-2 xl:grid-cols-3  w-full'>
                            {
                                formElements.map((element) => (
                                    element.addOrUpdateEnterprise.inputs.map((e, index) => (
                                        <div className={cn('w-full mb-4',)}>
                                            <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700"><span className={e.requireField ? "text-red-600" : "hidden"}>*</span> {e.label}</label>
                                            {!e.selectedInput ?
                                                <div>
                                                    <input value={e.type !== "file" ? inputs[e.alias] ?? "" : ""} onChange={async (v) => {
                                                        for (const [key, _] of Object.entries(inputs)) {
                                                            if (key === e.alias) {
                                                                if (e.type === "file") {
                                                                    const files = v.target.files?.[0];
                                                                    const response = await controllers.API.SendOne(urlAPI, "sendFiles", null, { files });
                                                                    console.log("L efichier image", response)
                                                                    if (response.status) {
                                                                        return setInputs({
                                                                            ...inputs,
                                                                            [e.alias]: response.filename
                                                                        })
                                                                    }
                                                                }
                                                                setInputs({
                                                                    ...inputs,
                                                                    [e.alias]: e.type === "tel" ? `242${v.target.value}` : v.target.value
                                                                })
                                                            }
                                                        }

                                                    }} type={e.type} maxLength={e.type === "tel" ? 9 : undefined} placeholder={e.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 font-normal dark:text-gray-300 text-gray-700" />
                                                    <div className={e.alias === "logo" && inputs.logo ? "h-[200px]" : "hidden"}>
                                                        <img src={`${urlAPI}/images/${inputs.logo}`} className='h-[200px] w-full object-contain' alt="" />
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <select value={inputs[e.alias] ?? ""} onChange={(v) => {
                                                        for (const [key, _] of Object.entries(inputs)) {
                                                            if (key === e.alias) {
                                                                setInputs({
                                                                    ...inputs,
                                                                    [e.alias]: e.type === "number" ? parseInt(v.target.value) : v.target.value
                                                                })
                                                            }
                                                        }

                                                    }} name="" id="" className="w-full mt-1 cursor-pointer outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border border-gray-400 dark:border-gray-300 dark:bg-gray-900 font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700">
                                                        <option value="" selected disabled>
                                                            {e.placeholder}
                                                        </option>
                                                        {
                                                            arrayOptions.find(item => item.alias === e.alias)
                                                                ?.value
                                                                ?.map(option => (
                                                                    <option value={e.type === "number" ? option.id : option.value}>
                                                                        {option.value === "expired" ? "expiré" : option.value === "onGoing" ? "en cours" : option.value}
                                                                    </option>
                                                                ))
                                                        }
                                                    </select>

                                                </div>
                                            }
                                        </div>
                                    ))
                                ))
                            }

                        </div>
                        <div className="flex w-full justify-end ">
                            <button type="button" onClick={(e) => {
                                handleSubmit(e)
                            }} className="bg-blue-600 my-2 hover:bg-blue-700 relative xl:right-5 rounded-md font-semibold ease duration-500 text-white py-2.5 px-8">
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