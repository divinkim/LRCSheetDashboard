import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
import Swal from "sweetalert2";

type User = {
    lastname: string,
    firstname: string,
    photo: string | null,
    email: string,
    id: number,
    DepartmentPostId: number,
    EnterpriseId: number,
}

type Department = {
    EnterpriseId: number,
    id: number
    name: string
    Enterprise: {
        name: string
    }
}

export default function useSendNotification() {
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        EnterpriseId: 0,
        UserId: 0,
        emails: ["contact@lrcgroup-app.com"]
    });
    const [files, setFiles] = useState<any>(null)
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [usersCloned, setUsersCloned] = useState<User[]>([]);
    const [UserId, setUserId] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [EnterpriseId, setEnterpriseId] = useState<number | null>(null);
    const [departmentsArray, setDepartmentsArray] = useState<Department[]>([]);
    const [DepartmentId, setDepartmentId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");
            const UserId = localStorage.getItem("UserId");
            const email = localStorage.getItem("email");

            const getUsers = await controllers.API.getAll(urlAPI, "getUsers", null);
            const getDepartments = await controllers.API.getAll(urlAPI, "getDepartmentPosts", null)

            const filtersUsersById = getUsers.filter((user: { EnterpriseId: number, status: boolean }) => user.EnterpriseId === Number(EnterpriseId) && user.status);
            const getDepartmentsByEntrepriseId = getDepartments.filter((item: { EnterpriseId: number }) => item.EnterpriseId === Number(EnterpriseId));

            setUsers(filtersUsersById);
            setUsersCloned(getUsers);
            setUserId(Number(UserId));
            setDepartmentsArray(getDepartmentsByEntrepriseId)
            setEnterpriseId(Number(EnterpriseId));
            setEmail(email);
        })()
    }, []);

    useEffect(() => {
        (() => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");
            const getUsersByEnterpriseId = usersCloned.filter(item => item.DepartmentPostId === DepartmentId && item.EnterpriseId === Number(EnterpriseId));
            setUsers(getUsersByEnterpriseId)
        })()
    }, [DepartmentId])

    async function handleSubmit() {
        setIsLoading(true);

        if (!inputs.title || !inputs.content) {
            setTimeout(() => {
                setIsLoading(false);
                Swal.fire({
                    icon: "warning",
                    title: "Champs invalide",
                    text: "Veuillez sélectionner un titre et saisir un contenu"
                })
            }, 1000);
            return;
        }

        const data = {
            title: inputs.title,
            content: inputs.content,
            EnterpriseId: EnterpriseId,
            UserId: UserId,
            email,
            receiverEmails: inputs.emails,
            files,
            path: "/Dashboard/ADMIN/repportsList",
            adminSectionIndex: 2,
            adminPageIndex: 1,
        };

        await controllers.API.SendOne(urlAPI, "sendMail", null, {
            emails: inputs.emails,
            subject: inputs.title,
            content: inputs.content
        })

        const response = await controllers.API.SendOne(urlAPI, "sendNotificationToWebUser", null, {
            title: inputs.title,
            content: inputs.content,
            EnterpriseId: inputs.EnterpriseId,
            senderId: "",
            receiverId: inputs.UserId,
            path: "/dashboard/getRepports",
            adminSectionIndex: "2",
            adminPageIndex: "1",
        })

        // const response = await controllers.API.SendOne(urlAPI, "sendNotificationsToUser", null, {
        //     title: inputs.title,
        //     content: inputs.content,
        //     receiverId: inputs.UserId,
        //     file: files,
        //     messagingType: "notification",
        // });

        const status = response.status;
        const message = response.message;
        const title = response.title
        const iconType = status ? "success" : "error";

        if (status) {
            setIsLoading(false);
            setInputs({
                title: "",
                content: "",
                EnterpriseId: 0,
                UserId: 0,
                emails: [""]
            });
            setFiles(null);
        }

        return Swal.fire({
            icon: status ? "success" : "error",
            title: title,
            text: message,
        })
    }

    const onCheck = (email: string, EnterpriseId: number, UserId: number) => {
        const checkEmailInEmailsArray = inputs.emails.includes(email) ?
            inputs.emails.filter(item => item !== email) : [...inputs.emails, email];
        setInputs({
            ...inputs,
            emails: checkEmailInEmailsArray,
            EnterpriseId: EnterpriseId,
            UserId: UserId
        })
    }

    console.log(inputs)

    function filterUsersByFullName(value: string) {
        const users = usersCloned.filter(user => user.firstname.toLowerCase()?.includes(value.toLowerCase()) || user.lastname.toLowerCase()?.includes(value.toLowerCase()));
        setUsers(users);
    }

    function selectAllUser() {
        const getAllUsersEmails = users.filter(item => item.email).map(item => item.email);
        setInputs({
            ...inputs,
            emails: getAllUsersEmails
        })
        console.log(getAllUsersEmails);
    }

    function deselectAllUser() {
        setInputs({
            ...inputs,
            emails: []
        })
    }

    console.log(DepartmentId);
    console.log(users)
    return {
        isLoading, setIsLoading, inputs, handleSubmit, setInputs, showModal, setShowModal, users, urlAPI, onCheck, filterUsersByFullName, files, setFiles, departmentsArray, setEnterpriseId, setDepartmentId, selectAllUser, deselectAllUser
    }
}