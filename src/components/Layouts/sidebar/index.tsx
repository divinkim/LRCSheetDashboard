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
  faUserClock, faUsers, faUserPlus, faClipboardList
} from "@fortawesome/free-solid-svg-icons";

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
          li: "Envoyer une notification",
          href: "pages/dashboard/notification/sendNotification",
          icon: faPaperPlane           // Icône d’envoi
        },
        {
          li: "Liste de notification",
          href: "pages/dashboard/notifications/getAllNotifications",
          icon: faBell                 // Icône de notification
        },
      ]
    },

    // Onglet Administration
    {
      index: 1,
      title: "📑 Administration",
      ItemLists: [
        {
          li: "Rapports",
          href: "pages/dashboard/repports",
          icon: faFileAlt              // Icône de rapport/document
        },
        {
          li: "Permissions",
          href: "pages/dashboard/permissions",
          icon: faShieldAlt            // Icône de sécurité/autorisations
        },
        {
          li: "Attribuer un congé",
          href: "pages/dashboard/permissions",
          icon: faUserClock            // Icône congé / temps
        },
        {
          li: "Liste de congé",
          icon: faList                 // Liste de congés
        },
      ]
    },

    // Onglet Ressources humaines
    {
      index: 2,
      title: "🧑‍💼 Ressources humaines",
      ItemLists: [
        {
          li: "Présences au poste",
          href: "dashboard/RH/presencesList",
          icon: faClipboardList        // Feuille de présence
        },
        {
          li: "Liste des collaborateurs",
          icon: faUsers,
          href:"dashboard/RH/usersList"
        },
        {
          li: "Ajouter un collaborateur",
          href: "dashboard/RH/addUser",
          icon: faUserPlus             // Ajouter un utilisateur
        },
        {
          li: "Liste de congé",
          icon: faList                 // Liste
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
          "max-w-[290px] overflow-hidden bg-gray-800 transition-[width] duration-200 ease-linear dark:border-gray-900 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          {/* <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div> */}

          {/* Navigation */}
          <div className="custom-scrollbar flex-1 overflow-y-auto pr-3">
            {/* {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5  text-sm font-medium text-dark-4 dark:text-dark-6">
                  Menu général
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(
                                ({ url }) => url === pathname,
                              )}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              <item.icon
                                className="size-6 shrink-0"
                                aria-hidden="true"
                              />

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(item.title) &&
                                    "rotate-0",
                                )}
                                aria-hidden="true"
                              />
                            </MenuItem>

                            {expandedItems.includes(item.title) && (
                              <ul
                                className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                role="menu"
                              >
                                {item.items.map((subItem) => (
                                  <li key={subItem.title} role="none">
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={pathname === subItem.url}
                                    >
                                      <span>{subItem.title}</span>
                                    </MenuItem>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href =
                              "url" in item
                                ? item.url + ""
                                : "/" +
                                  item.title.toLowerCase().split(" ").join("-");

                            return (
                              <MenuItem
                                className="flex items-center gap-3 py-3"
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                <item.icon
                                  className="size-6 shrink-0"
                                  aria-hidden="true"
                                />

                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))} */}
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
                    }} className={toggleAsideSections.includes(index) ? "flex cursor-pointer p-2 bg-gray-200 dark:bg-gray-900  ease duration-700 flex-row items-center justify-between dark:text-gray-300" : "flex cursor-pointer p-2 hover:bg-gray-200 hover:dark:bg-gray-900 ease duration-500 text-gray-300 hover:text-gray-600 dark:hover:text-gray-300 flex-row items-center justify-between"}>
                      <h3 className={toggleAsideSections.includes(index) ? "font-bold" : "font-bold"}>{aside.title ?? ""}</h3>
                      <FontAwesomeIcon icon={toggleAsideSections.includes(index) ? faChevronUp : faChevronDown} className="" />
                    </div>
                    <div className={toggleAsideSections.includes(index) ? "flex flex-col ease duration-700 space-y-2 pl-8 pt-3" : "ease duration-500 hidden"}>

                      {aside.ItemLists.map((list) => (
                        <Link href={list.href ?? "/"} className=" flex flex-col">
                          <li className="hover:text-blue-700 pb-2 dark:hover:text-blue-700 text-gray-300 ease duration-500"><span><FontAwesomeIcon icon={list.icon} /></span> {list.li}
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
