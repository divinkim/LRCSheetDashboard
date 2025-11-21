import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons"
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


        }
    }
]