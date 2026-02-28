'use client';
import { controllers, urlAPI } from "@/app/main";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useSocket from "@/app/socket";
import SidebarHook from "@/components/Layouts/sidebar/hook";

type UserByFcmToken = {
    fcmToken: string,
    User: {
        lastname: string,
        firstname: string,
        photo: string
    }
    UserEnterpriseId: number,
    adminService: string | null,
    UserId: number,
}

type adminNotification = {
    title: string,
    content: string,
    EnterpriseId: number,
    senderId: string,
    receiverId: string,
    file: string | null,
    createdAt: string
}

export function useAllNotification() {
    const [usersByFcmTokens, setUsersByFcmTokens] = useState<UserByFcmToken[]>([]);
    const [usersByFcmTokensCloned, setUsersByFcmTokensCloned] = useState<UserByFcmToken[]>([]);
    const [storedUsers, setStoredUsers] = useState<UserByFcmToken[]>([]);
    const [getAdminNotifications, setAdminNotifications] = useState<adminNotification[]>([]);
    const [getNotificationsByCureentUser, setNotificationsByCurrentUser] = useState<adminNotification[]>([]);
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        fcmToken: "",
        receiverId: "",
        photo: ""
    });
    const [adminId, setAdminId] = useState("");
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        senderId: "",
        receiverId: "",
        fcmToken: "",
        file: "",
        EnterpriseId: 0,
        messagingType: "notification"
    });
    const { usersIdConnected } = useSocket();
    const { getUserNotificationsCount, setStoredNotificationsArray, storedNotificationsArray } = SidebarHook()

    const filterUserByName = (value: string) => {
        const usersFiltered = usersByFcmTokensCloned.filter(user => user?.User.firstname.toLowerCase().includes(value.toLowerCase()) || user?.User.lastname.toLowerCase().includes(value.toLowerCase()));

        setUsersByFcmTokens(usersFiltered);
    }

    const getLatestMessage = (UserId: string) => {
        const getLatestMessageByUserId = getAdminNotifications.filter(notification => (notification.senderId === UserId && notification.receiverId === adminId) || (notification.senderId === adminId && notification.receiverId === UserId)).at(-1);

        return {
            content: getLatestMessageByUserId?.content || "",
            date: getLatestMessageByUserId?.createdAt ? new Date(String(getLatestMessageByUserId?.createdAt)).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
                minute: "2-digit",
                hour: "2-digit"
            }) : ""
        }
    }

    const getLatestTimeStamp = (UserId: string) => {
        const messages = getAdminNotifications.filter(notification => (notification.senderId === UserId && notification.receiverId === adminId) || (notification.senderId === adminId && notification.receiverId === UserId));
        if (messages.length <= 0) return 0;
        const onLatestMessage = messages.reduce((latest, current) => {
            return new Date(latest.createdAt).getTime() > new Date(current.createdAt).getTime() ? latest : current;
        });

        return new Date(onLatestMessage.createdAt).getTime();
    }

    const reduceTextLength = (text: string, limit: number) => {
        if (text.trim().length > limit) {
            return text.slice(0, limit) + "..."
        }
        return text;
    }

    const handleSubmit = async () => {
        if (!inputs.content && !inputs.file) {
            return Swal.fire({
                icon: "warning",
                title: "Champ invalide!",
                text: "Veuillez écrire quelque chose ou sélectionner un fichier."
            });
        }

        const formValues = {
            title: "La direction",
            content: inputs.content,
            senderId: inputs.senderId,
            receiverId: inputs.receiverId,
            fcmTokens: [inputs.fcmToken],
            file: inputs.file,
            EnterpriseId: inputs.EnterpriseId,
            messagingType: "notification"
        }

        const response = await controllers.API.SendOne(urlAPI, "sendNotificationToUsers", null, formValues);

        if (response.status) {
            setAdminNotifications(prevData => [...prevData, {
                title: inputs.title,
                content: inputs.content,
                senderId: inputs.senderId,
                receiverId: inputs.receiverId,
                createdAt: new Date().toISOString(),
                EnterpriseId: inputs.EnterpriseId,
                file: inputs.file
            }]);
            setInputs({
                ...inputs,
                title: "",
                content: "",
                file: ""
            });
        }
    }

    useEffect(() => {
        (async () => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");

            const getUsersByFcmTokens = await controllers.API.getAll(urlAPI, "getFcmTokens", null);

            const filterUserByEnterpriseId = getUsersByFcmTokens.filter((user: { UserEnterpriseId: number, adminService: string | null }) => user.UserEnterpriseId === Number(EnterpriseId) && !user.adminService);

            setUsersByFcmTokens(filterUserByEnterpriseId);
            setUsersByFcmTokensCloned(filterUserByEnterpriseId);
        })();
    }, []);

    useEffect(() => {
        (() => {
            const notifications = getAdminNotifications.filter(notification =>
                (notification.senderId === userData.receiverId && notification.receiverId === adminId)
                || (notification.senderId === adminId && notification.receiverId === userData.receiverId)
            );
            setNotificationsByCurrentUser(notifications)
        })()
    }, [userData.receiverId])

    useEffect(() => {
        (async () => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");
            const adminId = localStorage.getItem("id");

            const adminNotifications = await controllers.API.getAll(urlAPI, "getAllAdminNotifications", null);
            const getAdminNotificationsByEnterpriseId = adminNotifications.filter((item: { EnterpriseId: number }) => item.EnterpriseId === Number(EnterpriseId));

            setAdminNotifications(getAdminNotificationsByEnterpriseId);
            setAdminId(String(adminId));
        })();
    }, [usersByFcmTokens]);

    useEffect(() => {
        (() => {
            if (getAdminNotifications.length > 0) {
                const storedUsers = [...usersByFcmTokens].sort((a, b) => {
                    const dateA = getLatestTimeStamp(String(a.UserId));
                    const dateB = getLatestTimeStamp(String(b.UserId));
                    return dateB - dateA
                });
                setStoredUsers(storedUsers)
            }
        })();
    }, [getAdminNotifications])

    const groupedNotifications = getNotificationsByCureentUser.reduce((adminNotifications, item) => {
        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);
        const currentDay = new Date(item.createdAt);

        let label = "";

        if (today.toDateString() === currentDay.toDateString()) {
            label = "Aujourd'hui";
        } else if (yesterday.toDateString() === currentDay.toDateString()) {
            label = "Hier";
        } else {
            label = currentDay.toLocaleDateString();
        }

        if (!adminNotifications[label]) {
            adminNotifications[label] = [];
        }

        adminNotifications[label].push(item);

        return adminNotifications;
    }, {} as Record<string, adminNotification[]>)

    return { usersByFcmTokens, filterUserByName, userData, setUserData, getAdminNotifications, groupedNotifications, adminId, getLatestMessage, reduceTextLength, storedUsers, handleSubmit, setInputs, inputs, usersIdConnected, getUserNotificationsCount, setStoredNotificationsArray, storedNotificationsArray }
}