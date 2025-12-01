"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faDollarSign, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { controllers, urlAPI } from "@/app/main";
export default function HomeComponent() {

    const [data, setData] = useState({
        usersNumber: 0,
        enterprisesNumber: 0,
        totalAmount: 200000
    });

    let HomeCard;

    useEffect(() => {
        (async () => {
            const users = await controllers.API.getAll(urlAPI, "getUsers", null);
            setData({
                ...data,
                usersNumber: users.length
            })
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const enterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);
            setData({
                ...data,
                enterprisesNumber: enterprises?.length
            })
        })()
    }, [data.usersNumber])

    HomeCard = [
        {
            icon: faUserGroup,
            value: data.usersNumber,
            title: "Collaborateurs",
            path: "/pages/dashboard/RH/usersList",
            color: "bg-blue-500"
        },
        {
            icon: faBuilding,
            value: data.enterprisesNumber,
            title: "Collaborateurs",
            path: "/pages/dashboard/OTHERS/enterprisesList",
            color: "bg-red-500"
        },
        {
            icon: faDollarSign,
            value: data.totalAmount,
            title: "Gain actuel",
            path: "",
            color: "bg-green-500"
        },
    ]

    return HomeCard
}