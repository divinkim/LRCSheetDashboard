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
  faClipboardCheck,faCalendarCheck, faUserShield, faFileLines, faCheckCircle, faFileContract, faSuitcaseRolling,
  faCalendarDay, faUmbrellaBeach, faFileSignature, faIdBadge, faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { title } from "process";
import { icon } from "@fortawesome/fontawesome-svg-core";

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
          title: "Envoyer une notification",
          href: "pages/dashboard/notification/sendNotification",
          icon: faPaperPlane           // Icône d’envoi
        },
        {
          title: "Liste de notification",
          href: "pages/dashboard/notifications/getAllNotifications",
          icon: faBell                 // Icône de notification
        },
      ]
    },

    // Onglet Administration

    // Onglet Ressources humaines
    {
      index: 2,
      title: "🧑‍💼 Ressources humaines",
      ItemLists: [
        {
          title: "Présences au poste",
          href: "../RH/presencesList",
          icon: faClipboardCheck        // Feuille de présence (présences)
        },
        {
          title: "Ajouter un collaborateur",
          href: "../RH/addUser",
          icon: faUserPlus              // Ajouter un utilisateur
        },
        
        {
          title: "Liste des collaborateurs",
          href: "../RH/usersList",
          icon: faUsers                 // Liste des utilisateurs
        },
        {
          title: "Liste des collaborateurs au planning",
          href: "../RH/collaboratorsAssociateList",
          icon: faCalendarCheck         // Planning des utilisateurs
        },
      ]
    },

     {
      index: 3,
      title: "👩‍💼 Administration",
      ItemLists: [
        {
          title: "Permissions",
          href: "dashboard/ADMIN/permission",
          icon: faUserShield
        },
        {
          title: "Rapport",
          href: "dashboard/ADMIN/rapport",
          icon: faFileLines
        },
        {
          title: "Tâche",
          href: "dashboard/ADMIN/task",
          icon: faCheckCircle
        },
        {
          title: "Contrat",
          href: "dashboard/ADMIN/contrat",
          icon: faFileSignature
        },
        {
          title: "Liste de contrat",
          href: "dashboard/ADMIN/listContrat",
          icon: faFileContract
        },
        {
          title: "Type de contrat",
          href: "dashboard/ADMIN/typeContrat",
          icon: faFileContract
        },
        {
          title: "Liste de Type de contrat",
          href: "dashboard/ADMIN/listTypeContrat",
          icon: faFileContract
        },
        {
          title: "Poste",
          href: "dashboard/ADMIN/poste",
          icon: faIdBadge
        },
        {
          title: "Liste de poste",
          href: "dashboard/ADMIN/listPost",
          icon: faSuitcaseRolling
        },
        {
          title: "Département",
          href: "dashboard/ADMIN/departement",
          icon: faBuilding
        },
        {
          title: "Liste de département",
          href: "dashboard/ADMIN/listDepartement",
          icon: faSuitcaseRolling
        },
        

      ]
    }
   

  ];

  console.log("le comportement de", toggleAsideSections)
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
          "max-w-[270px] overflow-hidden bg-gray-800 transition-[width] duration-200 ease-linear dark:border-gray-900 dark:bg-gray-dark",
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
            <h1 className="font-bold text-[17px]">Menu général</h1>
            <div className="mt-4">
              {
                ItemAside.map((aside, index) => (
                  <div className="mb-3">
                    <div onClick={() => {
                      setToggleAsideSections(
                        toggleAsideSections.includes(index) ?
                          toggleAsideSections.filter(item => item !== index)
                          : [...toggleAsideSections, index]
                      )
                    }} className={toggleAsideSections.includes(index) ? "flex cursor-pointer p-2 bg-gray-200 dark:bg-gray-900  ease duration-700 flex-row items-center justify-between text-gray-600  dark:text-gray-300" : "flex cursor-pointer p-2 hover:bg-gray-200 hover:dark:bg-gray-900 ease duration-500 text-gray-300 hover:text-gray-600 dark:hover:text-gray-300 flex-row items-center justify-between"}>
                      <h3 className={toggleAsideSections.includes(index) ? "font-bold" : "font-bold"}>{aside.title ?? ""}</h3>
                      <FontAwesomeIcon icon={toggleAsideSections.includes(index) ? faChevronUp : faChevronDown} className="" />
                    </div>
                    <div className={toggleAsideSections.includes(index) ? "flex flex-col ease duration-700 space-y-2 pl-8 pt-3" : "ease duration-500 hidden"}>

                      {aside.ItemLists.map((list) => (
                        <Link href={list.href ?? "/"} className=" flex flex-col">
                          <li className="hover:text-blue-600 pb-2  text-gray-300 ease duration-500"><span><FontAwesomeIcon icon={list.icon} /></span> {list.title}
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
