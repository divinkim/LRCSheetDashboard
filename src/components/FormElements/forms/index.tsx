import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const formElements = [
    {
        addOrUpdateUser: {
            navigationLinks: [
                {
                    title: "Liste des utilisateurs",
                    href: "/dashboard/RH/usersList",
                    icon: faEye
                },
                {
                    title: "Ajouter un poste",
                    href: "/dashboard/ADMIN/addPost",
                    icon: faEye
                }
            ],

            titleForm: "Formulaire d'enregistrement d'un collaborateur",

            inputs: [
                // ---- Inputs classiques ----
                {
                    label: "Noms",
                    placeholder: "Saisissez un nom...",
                    inputStatus: true,
                    type: "text",
                    selectedInput: false,
                    alias: "firstname"
                },
                {
                    label: "Prénoms",
                    placeholder: "Saisissez un prénom...",
                    inputStatus: true,
                    type: "text",
                    selectedInput: false,
                    alias: "lastname"
                },
                {
                    label: "Date de naissance",
                    placeholder: "Sélectionnez une date...",
                    inputStatus: true,
                    type: "date",
                    selectedInput: false,
                    alias: "birthdate"
                },
                {
                    label: "Genre",
                    placeholder: "Sélectionnez un genre...",
                    inputStatus: true,
                    type: "text",
                    selectedInput: true,
                    dynamicOptions: {
                        status: true,
                        options: {
                            option1: "Homme",
                            option2: "Femme",
                            option3: "Aucun",
                        }
                    },
                    alias: "gender"
                },
                {
                    label: "Email",
                    placeholder: "Saisissez un email...",
                    inputStatus: true,
                    type: "email",
                    selectedInput: false,
                    alias: "email"
                },
                {
                    label: "Mot de passe",
                    placeholder: "Saisissez un mot de passe...",
                    inputStatus: false,
                    type: "password",
                    selectedInput: false,
                    alias: "password"
                },
                {
                    label: "Téléphone",
                    placeholder: "Saisissez un numéro...",
                    inputStatus: false,
                    type: "tel",
                    selectedInput: false,
                    alias: "phone"
                },

                // ---- Select Inputs ----
                {
                    label: "Entreprise",
                    placeholder: "Sélectionnez une entreprise...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "EnterpriseId"
                },
                {
                    label: "Département",
                    placeholder: "Sélectionnez un département...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "departmentPostId"
                },
                {
                    label: "Type de contrat",
                    placeholder: "Sélectionnez un type de contrat...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "ContractTypeId"
                },
                {
                    label: "Poste",
                    placeholder: "Sélectionnez un poste...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "PostId"
                },
                {
                    label: "Salaire",
                    placeholder: "Saisissez un salaire...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    alias: "SalaryId"
                },
                {
                    label: "Pays",
                    placeholder: "Sélectionnez un pays...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    alias: "CountryId"
                },
                {
                    label: "Ville",
                    placeholder: "Sélectionnez une ville...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    alias: "CityId"
                },
                {
                    label: "Arrondissement",
                    placeholder: "Sélectionnez un arrondissement...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "DistrictId"
                },
                {
                    label: "Quartier",
                    placeholder: "Sélectionnez un quartier...",
                    inputStatus: false,
                    type: "",
                    selectedInput: true,
                    dynamicOptions: {
                        status: false
                    },
                    alias: "QuarterId"
                },
            ]
        }
    }
];
