'use client';
import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import { urlAPI } from "../main";

const socket = io(urlAPI, { transports:['websocket'] });

export default function useSocket() {
    const [usersIdConnected, setUsersIdConnected] = useState<any[]>([]);

    useEffect(() => {
        //Ecoute et récupération des id des utilisateurs connectés
        socket.on("usersConnected", (usersIdArray) => {
            setUsersIdConnected(usersIdArray);
        });

        return () => {
            socket.off("usersConnected");
            socket.disconnect();
        }
    }, []);

    return { usersIdConnected };
}