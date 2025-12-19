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
        name: string | null
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
            name: ""
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
            const id = window.location.href.split("/").pop()
            if (!id) return;
            const getUser = await controllers.API.getOne(urlAPI, 'getUser', parseInt(id));

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
                    name: getUser?.Enterprise?.name
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

    const userData = [
        {
            alias: "Noms",
            value: user.firstname ?? null,
        },
        {
            alias: "Prénoms",
            value: user.lastname ?? null,
        },
        {
            alias: "Date de naissance",
            value: user.birthDate
                ? new Date(user.birthDate).toLocaleDateString("fr-FR", {
                    day:"2-digit",
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                }) : ""
        },
        {
            alias: "Sexe",
            value: user.gender ?? null,
        },
        {
            alias: "Email",
            value: user.email ?? null,
        },
        {
            alias: "Téléphone",
            value: user.phone ?? null,
        },
        {
            alias: "Photo",
            value: user.photo ?? null,
        },
        {
            alias: "Rôle",
            value: user.role ?? null,
        },
        {
            alias: "Situation matrimoniale",
            value: user.maritalStatus ?? null,
        },
        {
            alias: "Service administratif",
            value: user.adminService ?? null,
        },
        {
            alias: "Statut",
            value: user.status ?? null,
        },
        {
            alias: "Poste",
            value: user?.Post?.title ?? null,
        },
        {
            alias: "Entreprise",
            value: user?.Enterprise?.name ?? null,
        },
        {
            alias: "Département",
            value: user?.DepartmentPost?.name ?? null,
        },
        {
            alias: "Contrat",
            value: user?.Contract?.title ?? null,
        },
        {
            alias: "Pays",
            value: user?.Country?.name ?? null,
        },
        {
            alias: "Ville",
            value: user?.City?.name ?? null,
        },
        {
            alias: "District",
            value: user?.District?.name ?? null,
        },
        {
            alias: "Quartier",
            value: user?.Quarter?.name ?? null,
        },
    ];

    return { userData }
}