"use client";

import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Enterprise = {
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
    Country: {
        name: string | null
    },
    City: {
        name: string | null
    },
    legalForm: string | null,
    rccm: string | null,
    nui: string | null,
    subscriptionType: string | null,
    subscriptionStatus: string | null,
}


export function GetEnterpriseHook() {
    const [enterpriseData, setEnterpriseData] = useState<Enterprise>({
        name: null,
        description: null,
        logo: null,
        activityDomain: null,
        phone: null,
        toleranceTime: null,
        pourcentageOfHourlyDeduction: null,
        email: null,
        address: null,
        website: null,
        latitude: null,
        longitude: null,
        legalForm: null,
        rccm: null,
        nui: null,
        subscriptionType: null,
        subscriptionStatus: null,
        Country: {
            name: null
        },
        City: {
            name: null
        }
    });

    useEffect(() => {
        (async () => {
            let EnterpriseId = window.location.href?.split("/")?.pop();
            EnterpriseId ? parseInt(EnterpriseId) : null;

            const getEnterprise = await controllers.API.getOne(urlAPI, "getEnterprise", EnterpriseId);

            setEnterpriseData({
                name: getEnterprise?.name ?? null,
                description: getEnterprise?.description ?? null,
                logo: getEnterprise?.logo ?? null,
                activityDomain: getEnterprise?.activityDomain ?? null,
                phone: getEnterprise?.phone ?? null,
                toleranceTime: null,
                pourcentageOfHourlyDeduction: null,
                email: getEnterprise?.email ?? null,
                address: getEnterprise?.address ?? null,
                website: getEnterprise?.website ?? null,
                latitude: getEnterprise?.latitude ?? null,
                longitude: getEnterprise?.longitude ?? null,
                legalForm: getEnterprise?.legalForm ?? null,
                rccm: getEnterprise?.rccm ?? null,
                nui: getEnterprise?.nui ?? null,
                subscriptionType: getEnterprise?.subscriptionType ?? null,
                subscriptionStatus: getEnterprise?.subscriptionStatus ?? null,
                Country: {
                    name: getEnterprise?.Country?.name
                },
                City: {
                    name: getEnterprise?.City?.name
                }
            });
        })();
    }, []);

    const enterpriseDataArray = [
        { label: "Logo", value: enterpriseData?.logo },
        { label: "Entreprise", value: enterpriseData?.name },
        { label: "Description", value: enterpriseData?.description },
        { label: "Domaine d'activité", value: enterpriseData?.activityDomain },
        { label: "Téléphone", value: enterpriseData?.phone },
        { label: "Email", value: enterpriseData?.email },
        { label: "Adresse", value: enterpriseData?.address },
        { label: "Site web", value: enterpriseData?.website },
        { label: "Forme juridique", value: enterpriseData?.legalForm },
        { label: "RCCM", value: enterpriseData?.rccm },
        { label: "NUI", value: enterpriseData?.nui },
        { label: "Type d'abonnement", value: enterpriseData?.subscriptionType },
        { label: "Statut d'abonnement", value: enterpriseData?.subscriptionStatus === "onGoing" ? "en cours ..." : "expiré" },
        { label: "Pays", value: enterpriseData?.Country?.name },
        { label: "Ville", value: enterpriseData?.City?.name },
        { label: "Latitude", value: enterpriseData?.latitude },
        { label: "Longitude", value: enterpriseData?.longitude },
    ];


    return { enterpriseDataArray };
}