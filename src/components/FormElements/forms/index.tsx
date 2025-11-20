import {
    faEye,
    faUsers,        // Liste des utilisateurs
    faPlusCircle,   // Ajouter un poste
    faBuilding,     // Ajouter un département
    faMoneyBillWave // Ajouter un salaire
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const formElements = [
    {
        addOrUpdateUser: {
            navigationLinks: [
                {
                    title: "Liste des utilisateurs",
                    href: "/dashboard/RH/usersList",
                    icon: faUsers
                },
                {
                    title: "Ajouter un poste",
                    href: "/dashboard/ADMIN/addPost",
                    icon: faPlusCircle
                },
                {
                    title: "Ajouter un département",
                    href: "/dashboard/ADMIN/addDepartment",
                    icon: faBuilding
                },
                {
                    title: "Ajouter un salaire",
                    href: "/dashboard/ADMIN/addSalary",
                    icon: faMoneyBillWave
                }
            ],

            titleForm: "Formulaire d'enregistrement d'un collaborateur",

            inputs: [
                // ---- Inputs classiques ----
                {
                    label: "Image",
                    placeholder: "Sélectionnez une image...",
                    requireField: false,
                    type: "file",
                    selectedInput: false,
                    alias: "photo"
                },
                {
                    label: "Rôle",
                    placeholder: "Sélectionnez un rôle",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },

                    alias: "role"
                },
                {
                    label: "Service à superviser",
                    placeholder: "Sélectionnez un service...",
                    requireField: false,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "adminService"
                },
                {
                    label: "Noms",
                    placeholder: "Saisissez un nom...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "firstname"
                },
                {
                    label: "Prénoms",
                    placeholder: "Saisissez un prénom...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "lastname"
                },
                {
                    label: "Date de naissance",
                    placeholder: "Sélectionnez une date...",
                    requireField: true,
                    type: "date",
                    selectedInput: false,
                    alias: "birthdate"
                },
                {
                    label: "Genre",
                    placeholder: "Sélectionnez un genre...",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false,
                    },
                    alias: "gender"
                },
                {
                    label: "Email",
                    placeholder: "Saisissez un email...",
                    requireField: true,
                    type: "email",
                    selectedInput: false,
                    alias: "email"
                },
                {
                    label: "Mot de passe",
                    placeholder: "Saisissez un mot de passe...",
                    requireField: false,
                    type: "password",
                    selectedInput: false,
                    alias: "password"
                },
                {
                    label: "Téléphone",
                    placeholder: "Saisissez un numéro...",
                    requireField: true,
                    type: "tel",
                    selectedInput: false,
                    alias: "phone"
                },

                // ---- Select Inputs ----
                {
                    label: "Entreprise",
                    placeholder: "Sélectionnez une entreprise...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "EnterpriseId"
                },
                {
                    label: "Département",
                    placeholder: "Sélectionnez un département...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "departmentPostId"
                },
                {
                    label: "Type de contrat",
                    placeholder: "Sélectionnez un type de contrat...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true,
                    },
                    alias: "ContractTypeId"
                },
                {
                    label: "Poste",
                    placeholder: "Sélectionnez un poste...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "PostId"
                },
                {
                    label: "Salaire",
                    placeholder: "Sélectionnez un salaire...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    alias: "SalaryId",
                    dynamicOptions: {
                        status: true
                    },
                },
                {
                    label: "Pays",
                    placeholder: "Sélectionnez un pays...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    alias: "CountryId"
                },
                {
                    label: "Ville",
                    placeholder: "Sélectionnez une ville...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    alias: "CityId"
                },
                {
                    label: "Arrondissement",
                    placeholder: "Sélectionnez un arrondissement...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "DistrictId"
                },
                {
                    label: "Quartier",
                    placeholder: "Sélectionnez un quartier...",
                    requireField: false,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "QuarterId"
                },
            ]
        }
    }
];
