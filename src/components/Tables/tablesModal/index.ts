import { faCalendarPlus, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const tablesModal = [
    {
        usersList: {
            pageTitle: "Liste des collaborateurs enregistrées",
            path: "Dashboard/RH/Liste des utilisateurs",
            links: [
                {
                    title: "Ajouter un collaborateur",
                    href: "../RH/addUser",
                    icon: faUserPlus
                }
            ],
            table: {
                titles: [
                    { title: "Profils", alias: "photo" },
                    { title: "Noms & prénoms", alias: "firstname" },
                    { title: "Téléphones", alias: "phone" },
                    { title: "Emails", alias: "email" },
                    { title: "Genres", alias: "gender" },
                    { title: "Entreprises", alias: "EnterpriseId" },
                    { title: "Status", alias: "status" },
                    { title: "Actions", alias: "" },
                ]
            }
        },
        presencesList: {
            pageTitle: "Liste de présence enregistrée",
            path: "Dashboard/RH/Liste de présence",
            links: [
                {
                    title: "Ajouter une présence",
                    href: "",
                    icon: faCalendarPlus
                },
            ],
            table: {
                titles: [
                    { title: "Noms & prénoms", alias: "photo" },
                    { title: "Arrivées & pauses", alias: "firstname" },
                    { title: "Reprises & départs", alias: "phone" },
                    { title: "Jours et date", alias: "email" },
                    { title: "Status", alias: "gender" },
                    { title: "Actions", alias: "EnterpriseId" },
                ]
            }
        }
    }
]