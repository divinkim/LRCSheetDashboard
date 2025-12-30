"use client";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type User = {
    firstname: string | null,
    lastname: string | null,
    birthDate: string | null,
    gender: string | null,
    email: string | null,
    password: string | null,
    phone: string | null,
    photo: string | null,
    role: string | null,
    maritalStatus: string | null,
    adminService: string | null,
    status: string | null,
    Enterprise: {
        name: string | null,
        latitude: string | null,
        longitude: string | null,
    },
    Post: {
        title: string | null
    },
    DepartmentPost: {
        name: string | null
    },
    Contract: {
        title: string | null,
    },
    Country: {
        name: string | null
    },
    City: {
        name: string | null
    },
    District: {
        name: string | null
    },
    Quarter: {
        name: string | null
    }
}

export function GetUserHookModal() {
    const [user, setUser] = useState<User>({
        firstname: null,
        lastname: null,
        birthDate: null,
        gender: null,
        email: null,
        password: null,
        phone: null,
        photo: null,
        role: null,
        maritalStatus: null,
        adminService: null,
        status: null,
        Post: {
            title: ""
        },
        Enterprise: {
            name: "",
            latitude: "",
            longitude: ""
        },
        DepartmentPost: {
            name: ""
        },
        Contract: {
            title: "",
        },
        Country: {
            name: ""
        },
        City: {
            name: ""
        },
        District: {
            name: ""
        },
        Quarter: {
            name: ""
        }
    });

    useEffect(() => {
        (async () => {
            let userId = window.location.href.split("/").pop()
            userId ? parseInt(userId) : null
            const getUser = await controllers.API.getOne(urlAPI, 'getUser', userId);

            setUser({
                firstname: getUser.firstname ?? null,
                lastname: getUser.lastname ?? null,
                birthDate: getUser.birthDate ? new Date(getUser.birthDate).toISOString().split("T")[0] : null,
                gender: getUser.gender ?? null,
                email: getUser.email ?? null,
                password: getUser.password ?? null,
                phone: getUser.phone ?? null,
                photo: getUser.photo ?? null,
                role: getUser.role ?? null,
                maritalStatus: getUser.maritalStatus ?? null,
                adminService: getUser.adminService ?? null,
                status: getUser.status ?? null,
                Post: {
                    title: getUser?.Post?.title
                },
                Enterprise: {
                    name: getUser?.Enterprise?.name,
                    latitude: getUser?.Enterprise?.latitude,
                    longitude: getUser?.Enterprise?.longitude
                },
                DepartmentPost: {
                    name: getUser?.DepartmentPost?.name
                },
                Contract: {
                    title: getUser?.Contract?.title,
                },
                Country: {
                    name: getUser?.Country?.name
                },
                City: {
                    name: getUser?.City?.name
                },
                District: {
                    name: getUser?.District?.name
                },
                Quarter: {
                    name: getUser?.Quarter?.name
                }
            });
        })();
    }, []);

    const userDataArray = [
        {
            alias: "Noms",
            value: user.firstname ?? "",
        },
        {
            alias: "Prénoms",
            value: user.lastname ?? "",
        },
        {
            alias: "Date de naissance",
            value: user.birthDate
                ? new Date(user.birthDate).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                }) : ""
        },
        {
            alias: "Genre",
            value: user.gender ?? "",
        },
        {
            alias: "Email",
            value: user.email ?? "",
        },
        {
            alias: "Téléphone",
            value: user.phone ?? "",
        },
        {
            alias: "Photo",
            value: user.photo ?? "",
        },
        {
            alias: "Rôle",
            value: user.adminService !== null ? user.role : "Utilisateur client",
        },
        {
            alias: "Situation matrimoniale",
            value: user.maritalStatus ?? "",
        },
        {
            alias: "Service administratif",
            value: user.adminService ?? "",
        },
        {
            alias: "Statut",
            value: user.status ?? "",
        },
        {
            alias: "Poste",
            value: user?.Post?.title ?? "",
        },
        {
            alias: "Entreprise",
            value: user?.Enterprise?.name ?? "",
        },
        {
            alias: "Département",
            value: user?.DepartmentPost?.name ?? "",
        },
        {
            alias: "Contrat",
            value: user?.Contract?.title ?? "",
        },
        {
            alias: "Pays",
            value: user?.Country?.name ?? "",
        },
        {
            alias: "Ville",
            value: user?.City?.name ?? "",
        },
        {
            alias: "District",
            value: user?.District?.name ?? "",
        },
        {
            alias: "Quartier",
            value: user?.Quarter?.name ?? "",
        },
    ];

    return { userDataArray, user }
}