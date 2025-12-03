"use client";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown, faChevronUp, faUser, faUserGroup, faBell, faPaperPlane, faList, faFileAlt, faShieldAlt,
  faUserClock, faUsers, faUserPlus, faClipboardList,
  faClipboardCheck, faCalendarCheck, faUserShield, faFileLines, faCheckCircle, faFileContract, faSuitcaseRolling,
  faCalendarDay, faUmbrellaBeach, faFileSignature, faIdBadge, faBuilding,
  faMoneyBill1Wave,
  faFileInvoiceDollar,
  faBuildingCircleCheck,
  faBuildingColumns
} from "@fortawesome/free-solid-svg-icons";
import { title } from "process";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { messaging } from "@/firebase/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { controllers, urlAPI } from "@/app/main";

type AdminNotification = {
  path: string;
  adminSectionIndex: string,
  adminPageIndex: string,
};

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [toggleAsideSections, setToggleAsideSections] = useState<number[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  };

  const adminFcmToken = localStorage.getItem("adminFcmToken");
  const [adminNotificationStored, setAdminNotificationStored] = useState<AdminNotification[]>([]);

  useEffect(() => {
    (() => {
      const getAdminNotificationStored = localStorage.getItem("adminNotificationStored");
      if (getAdminNotificationStored !== null) {
        const parseAdminNotificationStored = JSON.parse(getAdminNotificationStored);
        return setAdminNotificationStored(parseAdminNotificationStored);
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("id");
      const adminRole = localStorage.getItem("adminRole");
      const EnterpriseId = localStorage.getItem("EnterpriseId");
      const adminService = localStorage.getItem("adminService");

      const datas = {
        fcmToken: adminFcmToken,
        id,
        adminRole,
        adminEnterpriseId: EnterpriseId,
        adminService
      }
      // Mise à jour du token de l'administrateur
      const updateFcmTokenAdmin = await controllers.API.SendOne(urlAPI, "sendFcmToken", null, datas);
      console.log(updateFcmTokenAdmin.message);
      return
    })()
  }, []);
  //Ecoute des notifications entrantes
  useEffect(() => {
    (() => {
      if (!messaging) return
      onMessage(messaging, (payload) => {
        console.log("Notification reçue (foreground):", payload);

        const adminNotificationStored = localStorage.getItem("adminNotificationStored");
        const getAdminNotificationStored = adminNotificationStored ? JSON.parse(adminNotificationStored) : []

        const newObject = [
          ...getAdminNotificationStored,
          {
            path: payload.data?.path ?? "",
            adminSectionIndex: "2",
            adminPageIndex: "1",
          }
        ]
        setAdminNotificationStored(newObject);
        localStorage.setItem("adminNotificationStored", JSON.stringify(newObject))

        // const { title, body } = payload?.notification
        // Swal.fire({
        //     icon: "info",
        //     title: "Notification entrante!",
        //     cancelButtonText: "Annuler",
        //     confirmButtonText: "Voir plus",
        //     showCancelButton: true,
        // }).then((confirm) => {
        //     if (confirm.isConfirmed) window.location.href = payload?.data?.path ?? ""
        // })
      });
    })()
  }, []);

  console.log("Notifs sauvegardés", adminNotificationStored)

  useEffect(() => {
    // Keep collapsible open, when it's subpage is active
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }

            // Break the loop
            return true;
          }
        });
      });
    });
  }, [pathname]);


  const ItemAside = [
    // Onglet notifications
    {
      index: 0,
      title: "🔔 Notification",
      ItemLists: [
        {
          index: 0,
          title: "Envoyer une notification",
          href: "pages/dashboard/notification/sendNotification",
          icon: faPaperPlane
        },
        {
          index: 1,
          title: "Liste de notification",
          href: "pages/dashboard/notifications/getAllNotifications",
          icon: faBell
        },
      ]
    },

    // Onglet Ressources humaines
    {
      index: 2,
      title: "💼 Ressources humaines",
      ItemLists: [
        {
          index: 0,
          title: "Présences au poste",
          href: "/pages/dashboard/RH/presencesList",
          icon: faClipboardCheck
        },
        {
          index: 1,
          title: "Ajouter un collaborateur",
          href: "/pages/dashboard/RH/addUser",
          icon: faUserPlus
        },
        {
          index: 2,
          title: "Liste des collaborateurs",
          href: "/pages/dashboard/RH/usersList",
          icon: faUsers
        },
        {
          index: 3,
          title: "Liste des collaborateurs au planning",
          href: "/pages/dashboard/RH/collaboratorsAssociateList",
          icon: faCalendarCheck
        },
      ]
    },

    // Onglet Administration
    {
      index: 2,
      title: "👩‍💼 Administration",
      adminService: "ADMINISTRATION",
      ItemLists: [
        {
          index: 0,
          title: "Permissions",
          href: "/pages/dashboard/ADMIN/permission",
          icon: faUserShield
        },
        {
          index: 1,
          title: "Rapports",
          href: "/pages/dashboard/ADMIN/repportsList",
          icon: faFileLines
        },
        {
          index: 2,
          title: "Tâche",
          href: "/pages/dashboard/ADMIN/task",
          icon: faCheckCircle
        },
        {
          index: 3,
          title: "Ajouter un contrat",
          href: "/pages/dashboard/ADMIN/addContract",
          icon: faFileSignature
        },
        {
          index: 4,
          title: "Liste de contrat",
          href: "/pages/dashboard/ADMIN/listContrat",
          icon: faFileContract
        },
        {
          index: 5,
          title: "Type de contrat",
          href: "/pages/dashboard/ADMIN/typeContrat",
          icon: faFileContract
        },
        {
          index: 6,
          title: "Liste de Type de contrat",
          href: "/pages/dashboard/ADMIN/listTypeContrat",
          icon: faFileContract
        },
        {
          index: 7,
          title: "Poste",
          href: "/pages/dashboard/ADMIN/poste",
          icon: faIdBadge
        },
        {
          index: 8,
          title: "Liste de poste",
          href: "/pages/dashboard/ADMIN/listPost",
          icon: faSuitcaseRolling
        },
        {
          index: 9,
          title: "Département",
          href: "/pages/dashboard/ADMIN/departement",
          icon: faBuilding
        },
        {
          index: 10,
          title: "Liste de département",
          href: "/pages/dashboard/ADMIN/listDepartement",
          icon: faSuitcaseRolling
        }
      ]
    },

    // Onglet Comptabilité
    {
      index: 3,
      title: "💵 Comptabilité",
      ItemLists: [
        {
          index: 0,
          title: "Ajouter un salaire",
          href: "/pages/dashboard/COMPTA/addSalary",
          icon: faMoneyBill1Wave
        },
        {
          index: 1,
          title: "Liste de salaire",
          href: "/pages/dashboard/COMPTA/salaryList",
          icon: faFileInvoiceDollar
        },
      ]
    },

    // Onglet Statistiques
    {
      index: 4,
      title: "📊 Statistiques",
      ItemLists: [
        {
          index: 0,
          title: "",
          href: "",
          icon: faBuildingCircleCheck
        },
        {
          index: 1,
          title: "",
          href: "",
          icon: faBuildingColumns
        },
      ]
    },

    // Onglet Autres
    {
      index: 5,
      title: "🧿 Autres",
      ItemLists: [
        {
          index: 0,
          title: "Enregistrer une entreprise",
          href: "/pages/dashboard/OTHERS/addEnterprise",
          icon: faBuildingCircleCheck
        },
        {
          index: 1,
          title: "Liste des entreprises",
          href: "/pages/dashboard/OTHERS/enterprisesList",
          icon: faBuildingColumns
        },
      ]
    },
  ];

  console.log("le comportement de", toggleAsideSections);

  function getAdminSectionNotificationCount(adminNotificationStored: AdminNotification[], index: number) {
    const adminNotificationCount = adminNotificationStored.filter(item => parseInt(item.adminSectionIndex) === index);
    return adminNotificationCount.length
  }

  function getAdminPageNotificationCount(adminSectionIndex: number, adminPageIndex: number) {
    // const verifyItem = ItemAside.find(item => item.index === parseInt(adminSectionIndex))?.ItemLists.find(item => item?.index === parseInt(adminPageIndex));
    const adminPageNotificationCount = adminNotificationStored.filter(item => parseInt(item.adminPageIndex) === adminPageIndex && parseInt(item.adminSectionIndex) === adminSectionIndex);

    return adminPageNotificationCount.length;
  }

  function removeAdminPageNotificationCount(adminSectionIndex: number, adminPageIndex: number) {
    const adminPageNotificationCount = adminNotificationStored.filter(item => parseInt(item.adminPageIndex) !== adminPageIndex && parseInt(item.adminSectionIndex) !== adminSectionIndex);
    setAdminNotificationStored(adminPageNotificationCount);
    localStorage.setItem("adminNotificationStored", JSON.stringify(adminPageNotificationCount))
    return adminPageNotificationCount.length;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[270px] overflow-hidden  transition-[width] duration-200 ease-linear dark:border-gray-900 bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "top-0 h-screen sticky",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[14px] pr-[7px]">
          {/* Navigation */}
          <div className="custom-scrollbar  flex-1 overflow-y-auto pr-3">

            <div className="w-[100px] h-[100px] mx-auto mb-5">
              <img src="/images/logo/logo.png" alt="" className='w-full h-full object-cover' />
            </div>
            <Link href="/pages/home" className="font-bold hover:text-gray-400 text-gray-300 ease duration-500">
              🏠 ACCUEIL
            </Link>
            <h1 className="font-bold text-[17px] mt-5 text-gray-300">Menu général</h1>
            <div className="mt-5">
              {
                ItemAside.map((aside, index) => (
                  <div className="mb-4">
                    <div onClick={() => {
                      setToggleAsideSections(
                        toggleAsideSections.includes(index) ?
                          toggleAsideSections.filter(item => item !== index)
                          : [...toggleAsideSections, index]
                      )
                    }} className={toggleAsideSections.includes(index) ? "flex cursor-pointer p-2 bg-gray-900 text-gray-300 ease duration-700 flex-row items-center justify-between   dark:text-gray-300" : "flex cursor-pointer p-2 bg-gray-800 hover:bg-gray-900 ease duration-500 text-gray-300 flex-row items-center justify-between"}>
                      <h3 className="font-bold">{aside.title ?? ""} <span className={getAdminSectionNotificationCount(adminNotificationStored, index) <= 0 ? "hidden" : 'bg-red-500 relative left-2 text-white rounded-full px-[6px]'}>
                        {getAdminSectionNotificationCount(adminNotificationStored, index)}
                      </span>
                      </h3>
                      <FontAwesomeIcon icon={toggleAsideSections.includes(index) ? faChevronUp : faChevronDown} className="" />
                    </div>
                    <div className={toggleAsideSections.includes(index) ? "flex flex-col ease duration-700 space-y-2 pl-8 pt-3" : "ease duration-500 hidden"}>

                      {aside.ItemLists.map((list) => (
                        <Link href={list.href ?? "/"} onClick={() => {
                          removeAdminPageNotificationCount(aside.index, list.index)
                        }} className=" flex flex-col">
                          <li className="hover:text-blue-600 pb-2  text-gray-300 ease duration-500"><span><FontAwesomeIcon icon={list.icon} /></span> {list.title} <span className={getAdminPageNotificationCount(aside.index, list?.index) <= 0 ? "hidden" : 'bg-red-500 relative left-2 text-white font-semibold rounded-full px-[6px]'}>
                            {getAdminPageNotificationCount(aside.index, list?.index)}
                          </span>
                          </li>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
