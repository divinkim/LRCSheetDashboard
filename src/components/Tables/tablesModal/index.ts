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
                    { title: "Profils", alias: "" },
                    { title: "Noms & prénoms", alias: "" },
                    { title: "Téléphones", alias: "" },
                    { title: "Emails", alias: "" },
                    { title: "Genres", alias: "" },
                    { title: "Entreprises", alias: "" },
                    { title: "Status", alias: "" },
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
                    { title: "Profils", alias: "" },
                    { title: "Noms & prénoms", alias: "" },
                    { title: "Arrivées & pauses", alias: "" },
                    { title: "Reprises & départs", alias: "" },
                    //  { title: "Horaires", alias: "" },
                    { title: "Jours et date", alias: "" },
                    { title: "Entreprises", alias: "" },
                    { title: "Statuts", alias: "" },
                    { title: "Actions", alias: "" }
                ]
            }
        }
    }
]