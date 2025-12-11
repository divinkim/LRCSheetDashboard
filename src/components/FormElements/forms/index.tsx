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
                    selectedInput: false,
                    alias: "startDate"

                },
                {
                    label: "Date de fin",
                    placeholder: "Sélectionnez la date de fin",
                    requireField: true,
                    type: "date",
                    selectedInput: false,
                    alias: "endDate"

                },
                {
                    label: "Durée",
                    placeholder: "Sélectionnez la durée",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
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
        }, addOrUpdateEnterprise: {
            navigationLinks: [

                {
                    title: "Liste des entreprises",
                    href: "/pages/dashboard/OTHERS/enterprisesList",
                    icon: faUsers
                },
                {
                    title: "Ajouter un ville",
                    href: "/pages/dashboard/ADMIN/addCity",
                    icon: faPlusCircle     // Poste = ajout → icône plus circle
                },
                {
                    title: "Ajouter un pays",
                    href: "/pages/dashboard/ADMIN/addCountry",
                    icon: faBuilding       // Département = bâtiment
                },
            ],

            navigateLinks: [
                {
                    title: "Liste des contrats",
                    href: "/pages/dashboard/ADMIN/listContrat",
                    icon: faFileContract
                },
            ],

            addEnterpriseTitleForm: "Formulaire d'enregistrement d'une entreprise",
            updateEnterpriseTitleForm: "Formulaire de modification d'une entreprise",

            inputs: [
                // ---- Inputs classiques ----
                {
                    label: "Nom de l'entreprise",
                    placeholder: "Saisissez le nom...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "name"
                },
                {
                    label: "Description de l'entreprise",
                    placeholder: "Saisissez une description",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "description"
                },
                {
                    label: "Domaine d'activité",
                    placeholder: "Saisissez un domaine...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "activityDomain"
                },
                {
                    label: "Téléphone",
                    placeholder: "Saisissez un numéro de téléphone",
                    requireField: true,
                    type: "tel",
                    selectedInput: false,
                    alias: "phone"
                },
                {
                    label: "email",
                    placeholder: "Saisissez un email...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "email"
                },
                {
                    label: "Adresse",
                    placeholder: "Saisissez une adresse...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "address"
                },
                {
                    label: "Site web",
                    placeholder: "Saisissez un lien...",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "website"
                },
                {
                    label: "Latitude",
                    placeholder: "Entrez la latitude...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "latitude"
                },
                {
                    label: "Longitude",
                    placeholder: "Entrez la longitude...",
                    requireField: true,
                    type: "text",
                    selectedInput: false,
                    alias: "longitude"
                },
                {
                    label: "Forme légale",
                    placeholder: "Sélectionnez une forme légale",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    alias: "legalForm",
                    dynamicOptions: {
                        status: false
                    }
                },
                {
                    label: "RCCM",
                    placeholder: "Entrez le RCCM...",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "rccm",
                    dynamicOptions: {
                        status: false
                    }
                },
                {
                    label: "NIU",
                    placeholder: "Entrez le NIU...",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "nui",
                    dynamicOptions: {
                        status: false
                    }
                },
                {
                    label: "Type d'abonnement",
                    placeholder: "Sélectionner le type d'abonnement",
                    requireField: false,
                    type: "text",
                    selectedInput: true,
                    alias: "subscriptionType",
                    dynamicOptions: {
                        status: false
                    }
                },
                {
                    label: "Status d'abonnement",
                    placeholder: "Sélectionner le status...",
                    requireField: false,
                    type: "text",
                    selectedInput: true,
                    alias: "subscriptionStatus",
                    dynamicOptions: {
                        status: false
                    }
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
                    label: "Logo de l'entreprise",
                    placeholder: "Sélectionnez un logo.",
                    requireField: true,
                    type: "file",
                    selectedInput: false,
                    alias: "logo"
                },
            ],
        },
        addOrUpdateSalary: {
            navigationLinks: [
                {
                    title: "Liste des salaires",
                    href: "/pages/dashboard/RH/usersList",
                    icon: faUsers
                },
            ],

            addSalaryTitleForm: "Ajouter un salaire",
            updateUserTitleForm: "Formulaire de modification d'un utilisateur",

            titleForm: "Formulaire d'ajout d'un salaire",

            inputs: [
                // ---- Inputs classiques ----
                {
                    label: "Salaire brute",
                    placeholder: "Entrez un montant ex:100000...",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "grossSalary"
                },
                {
                    label: "Salaire journalier",
                    placeholder: "Entrez un montant ex:100000...",
                    requireField: false,
                    type: "text",
                    selectedInput: false,
                    alias: "dailySalary"
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
                    selectedInput: false,
                    alias: "startDate"

                },
                {
                    label: "Date de fin",
                    placeholder: "Sélectionnez la date de fin",
                    requireField: true,
                    type: "date",
                    selectedInput: false,
                    alias: "endDate"

                },
                {
                    label: "Durée",
                    placeholder: "Sélectionnez la durée",
                    requireField: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true
                    },
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
