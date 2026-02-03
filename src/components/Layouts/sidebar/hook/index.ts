import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown, faChevronUp, faUser, faUserGroup, faBell, faPaperPlane, faList, faFileAlt, faShieldAlt,
    faUserClock, faUsers, faUserPlus, faClipboardList,
    faClipboardCheck, faCalendarCheck, faUserShield, faFileLines, faCheckCircle, faFileContract, faSuitcaseRolling,
    faCalendarDay, faUmbrellaBeach, faFileSignature, faIdBadge, faBuilding, faChartLine, faCreditCard,
    faMoneyBill1Wave,
    faFileInvoiceDollar,
    faBuildingCircleCheck,
    faBuildingColumns,
    faFileInvoice,
    faFileCircleCheck,
    faMoneyCheckDollar,
    faReceipt,
    faBalanceScale,
    faCalendarPlus,
    faGlobe,
    faCity,
    faHouseChimney
} from "@fortawesome/free-solid-svg-icons";
import { messaging } from "@/firebase/firebaseConfig";
import { onMessage } from "firebase/messaging";
import Swal from "sweetalert2";

type notificationProps = {
    path: string | undefined,
    adminSectionIndex: string | undefined,
    adminPageIndex: string | undefined
}

export default function SidebarHook() {
    const [storedNotificationsArray, setStoredNotificationsArray] = useState<notificationProps[]>([]);
    //Réception des notifs entrantes
    useEffect(() => {
        (() => {
            const storedNotificationsArray = localStorage.getItem("storedNotificationsArray");
            storedNotificationsArray ? setStoredNotificationsArray(JSON.parse(storedNotificationsArray)) : setStoredNotificationsArray([]);
        })();

        const unSubscribe = onMessage(messaging, (remoteMessage) => {
            const EnterpriseId = localStorage.getItem("EnterpriseId")
            console.log(remoteMessage)
            if (Number(remoteMessage.data?.EnterpriseId) === Number(EnterpriseId)) {
                const notification = {
                    path: remoteMessage.data?.path,
                    adminSectionIndex: remoteMessage.data?.adminSectionIndex,
                    adminPageIndex: remoteMessage.data?.adminPageIndex,
                }

                setStoredNotificationsArray((prevNotifications) => [...prevNotifications, notification]);
                localStorage.setItem("storedNotificationsArray", JSON.stringify([...storedNotificationsArray, notification]));

                Swal.fire({
                    icon: "info",
                    title: "Notification entrante!",
                    text: "Vous avez une nouvelle notification.",
                    showCancelButton: true,
                    cancelButtonText: "Pas maintenant",
                    confirmButtonText: "Voire plus",
                }).then((confirm) => {
                    if (confirm.isConfirmed) {
                        window.location.href = `${remoteMessage.data?.path}`
                    }
                })

            }
        });

        return () => { unSubscribe }
    }, [])

    const ItemAside = [
        // Onglet notifications
        {
            index: 0,
            title: "🔔 Notification",
            ItemLists: [
                {
                    index: 0,
                    title: "Envoyer une notification",
                    href: "/dashboard/notification/sendNotification",
                    icon: faPaperPlane
                },
                {
                    index: 1,
                    title: "Liste de notification",
                    href: "/dashboard/notifications/getAllNotifications",
                    icon: faBell
                },
            ]
        },

        // Onglet Ressources humaines
        {
            index: 2,
            title: "💼 RH",
            ItemLists: [
                {
                    index: 0,
                    title: "Présences au poste",
                    href: "/dashboard/RH/presencesList",
                    icon: faClipboardCheck
                },
                {
                    index: 1,
                    title: "Ajouter un collaborateur",
                    href: "/dashboard/RH/addUser",
                    icon: faUserPlus
                },
                {
                    index: 2,
                    title: "Liste des collaborateurs",
                    href: "/dashboard/RH/usersList",
                    icon: faUsers
                },
                {
                    index: 3,
                    title: "Ajouter un collaborateur au planning",
                    href: "/dashboard/RH/addUserInPlanningOfWeek",
                    icon: faCalendarPlus
                },
                {
                    index: 4,
                    title: "Liste des collaborateurs au planning",
                    href: "/dashboard/RH/weekDaysPlanningsList",
                    icon: faCalendarCheck
                },
            ]
        },

        // Onglet Administration
        {
            index: 2,
            title: "🗂️ Administration",
            adminService: "ADMINISTRATION",
            ItemLists: [
                {
                    index: 0,
                    title: "Permissions",
                    href: "/dashboard/ADMIN/permission",
                    icon: faUserShield
                },
                {
                    index: 1,
                    title: "Rapports",
                    href: "/dashboard/ADMIN/repportsList",
                    icon: faFileLines
                },
    
                {
                    index: 2,
                    title: "Ajouter un contrat",
                    href: "/dashboard/ADMIN/addContract",
                    icon: faFileSignature
                },
                {
                    index: 3,
                    title: "Liste de contrat",
                    href: "/dashboard/ADMIN/listContrat",
                    icon: faFileContract
                },
                {
                    index: 4,
                    title: "Type de contrat",
                    href: "/dashboard/ADMIN/typeContrat",
                    icon: faFileContract
                },
                {
                    index: 5,
                    title: "Liste de Type de contrat",
                    href: "/dashboard/ADMIN/listTypeContrat",
                    icon: faFileContract
                },
                {
                    index: 6,
                    title: "Ajouter un poste",
                    href: "/dashboard/ADMIN/addPost",
                    icon: faIdBadge
                },
                {
                    index: 7,
                    title: "Liste de poste",
                    href: "/dashboard/ADMIN/postesList",
                    icon: faSuitcaseRolling
                },
                {
                    index: 8,
                    title: "Ajouter un département",
                    href: "/dashboard/ADMIN/addDepartement",
                    icon: faBuilding
                },
                {
                    index: 9,
                    title: "Liste de départements",
                    href: "/dashboard/ADMIN/departmentsList",
                    icon: faSuitcaseRolling
                }
            ]
        },

        // Onglet Comptabilité
        {
            index: 11,
            title: "💵 Comptabilité",
            ItemLists: [
                {
                    index: 0,
                    title: "Ajouter un salaire",
                    href: "/dashboard/COMPTA/addSalary",
                    icon: faMoneyBill1Wave  // salaire / paie
                },
                {
                    index: 1,
                    title: "Liste des salaires",
                    href: "/dashboard/COMPTA/salaryList",
                    icon: faFileInvoiceDollar  // récapitulatif des paies
                },
                {
                    index: 2,
                    title: "Factures clients",
                    href: "/dashboard/COMPTA/clientInvoices",
                    icon: faFileInvoice  // suivi des factures émises
                },
                {
                    index: 3,
                    title: "Factures fournisseurs",
                    href: "/dashboard/COMPTA/vendorInvoices",
                    icon: faFileCircleCheck  // suivi des paiements fournisseurs
                },
                {
                    index: 4,
                    title: "Dépenses",
                    href: "/dashboard/COMPTA/expenses",
                    icon: faMoneyCheckDollar  // gestion des dépenses courantes
                },
                {
                    index: 5,
                    title: "Rapports financiers",
                    href: "/dashboard/COMPTA/financialReports",
                    icon: faChartLine  // bilans, comptes de résultat, cash flow
                },
                {
                    index: 6,
                    title: "Taxes & TVA",
                    href: "/dashboard/COMPTA/taxes",
                    icon: faReceipt  // déclarations fiscales, TVA, impôts
                },
                {
                    index: 7,
                    title: "Bilan annuel",
                    href: "/dashboard/COMPTA/annualBalance",
                    icon: faBalanceScale  // bilan comptable
                },
            ]
        },
        // Onglet Statistiques
        {
            index: 12,
            title: "📊 Statistiques",
            ItemLists: [
                {
                    index: 0,
                    title: "Gain sur déduction",
                    href: "/home",
                    icon: faChartLine   // graphique linéaire pour gains/performances
                },
                {
                    index: 1,
                    title: "Gain sur abonnement",
                    href: "/dashboard/STATS/subscriptionRevenue",
                    icon: faCreditCard  // abonnement/revenu, carte de paiement
                },
                {
                    index: 2,
                    title: "Bilan général",
                    href: "/dashboard/STATS/generalPlan",
                    icon: faFileAlt      // bilan/rapport général
                },
            ]
        },
        {
            index: 13,
            title: "🌍 Localités",
            ItemLists: [
                {
                    index: 0,
                    title: "Villes enregistrées",
                    href: "/dashboard/LOCALITY/citiesList",
                    icon: faCity
                },
                {
                    index: 1,
                    title: "Arrondissements enregistrées",
                    href: "/dashboard/LOCALITY/districtsList",
                    icon: faBuildingColumns
                },
                {
                    index: 2,
                    title: "Quartiers enregistrées",
                    href: "/dashboard/LOCALITY/quartersList",
                    icon: faHouseChimney
                },
            ]
        },
        // Onglet Autres
        {
            index: 14,
            title: "🧿 Autres",
            ItemLists: [
                {
                    index: 0,
                    title: "Enregistrer une entreprise",
                    href: "/dashboard/OTHERS/addEnterprise",
                    icon: faBuildingCircleCheck
                },
                {
                    index: 1,
                    title: "Liste des entreprises",
                    href: "/dashboard/OTHERS/enterprisesList",
                    icon: faBuildingColumns
                },
            ]
        },
    ];

    function getSectionNotificationsCount(sectionIndex: number) {
        const notificationArray = storedNotificationsArray.filter(notification => Number(notification.adminSectionIndex) === sectionIndex);
        return notificationArray.length;
    };

    function getPageNotificationsCount(pageIndex: number) {
        const notificationArray = storedNotificationsArray.filter(notification => Number(notification.adminPageIndex) === pageIndex);

        return notificationArray.length;
    }

    return { ItemAside, storedNotificationsArray, setStoredNotificationsArray, getSectionNotificationsCount, getPageNotificationsCount };
}