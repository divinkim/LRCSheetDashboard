import { icon } from "@fortawesome/fontawesome-svg-core";
import {
    faUsers,
    faPlusCircle,
    faBuilding,
    faMoneyBillWave,
    faMapMarkedAlt,
    faMapPin, faFileContract
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { title } from "process";

export const formElements = [
    {
        addOrUpdateUser: {
            navigationLinks: [

                {
                    title: "Liste des utilisateurs",
                    href: "/pages/dashboard/RH/usersList",
                    icon: faUsers
                },
                {
                    title: "Ajouter un poste",
                    href: "/pages/dashboard/ADMIN/addPost",
                    icon: faPlusCircle     // Poste = ajout → icône plus circle
                },
                {
                    title: "Ajouter un département",
                    href: "/pages/dashboard/ADMIN/addDepartment",
                    icon: faBuilding       // Département = bâtiment
                },
                {
                    title: "Ajouter un salaire",
                    href: "/pages/dashboard/COMPTA/addSalary",
                    icon: faMoneyBillWave  // Salaire = billet
                },
                {
                    title: "Ajouter un arrondissement",
                    href: "/pages/dashboard/OTHERS/addDistrict",
                    icon: faMapMarkedAlt   // Arrondissement = zone / map
                },
                {
                    title: "Ajouter un quartier",
                    href: "/pages/dashboard/OTHERS/addQuarter",
                    icon: faMapPin         // Quartier = pin/point sur la carte
                }
            ],

            navigateLinks: [
                {
                    title: "Liste des contrats",
                    href: "/pages/dashboard/ADMIN/listContrat",
                    icon: faFileContract
                },
            ],

            addUserTitleForm: "Formulaire d'enregistrement d'un collaborateur",
            updateUserTitleForm: "Formulaire de modification d'un utilisateur",

            tilteContract: "Formulaire de création de contrat",

            inputs: [
                // ---- Inputs classiques ----
                {
                    label: "Statut du collaborateur",
                    placeholder: "Sélectionnez un statut...",
                    requireField: false,
                    type: "text",
                    selectedInput: true,
                    alias: "status"
                },
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
                    alias: "birthDate"
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
                {
                    label: "Etat civil",
                    placeholder: "Choisissez un état",
                    requireField: false,
                    type: "text",
                    selectedInput: true,
                    alias: "maritalStatus"
                },

                // ---- Select Inputs ----
                {
                    label: "Entreprise",
                    placeholder: "Sélectionnez une entreprise...",
                    requireField: true,
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
                    alias: "DepartmentPostId"
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
                    requireField: true,
                    type: "number",
                    selectedInput: true,
                    alias: "CountryId",
                    dynamicOptions: {
                        status: true
                    },
                },
                {
                    label: "Ville",
                    placeholder: "Sélectionnez une ville...",
                    requireField: true,
                    type: "number",
                    selectedInput: true,
                    alias: "CityId",
                    dynamicOptions: {
                        status: true
                    },
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
            ],

            inputContrat: [
                {
                    label: "Nom contrat",
                    placeholder: "Saisissez le nom du contrat ",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "ContractType"

                },
                {
                    label: "Type de contrat",
                    placeholder: "Sélectionnez un type de contrat...",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "ContractTypeId"

                },
                {
                    label: "Date de début",
                    placeholder: "Sélectionnez la date de début",
                    requireField: true,
                    type: "date",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "startDate"

                },
                {
                    label: "Date de fin",
                    placeholder: "Sélectionnez la date de fin",
                    requireField: true,
                    type: "date",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "endDate"

                },
                {
                    label: "Durée",
                    placeholder: "Saisissez la durée",
                    requireField: true,
                    type: "date",
                    selectedInput: false,
                    alias: "delay"

                },

                {
                    label: "Entreprise",
                    placeholder: "Sélectionnez une entreprise",
                    requireField: true,
                    type: "number",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
                    alias: "EnterpriseId"

                },

            ]
        }
    }
];
