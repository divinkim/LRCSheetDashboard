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
import { title } from "process";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { messaging } from "@/firebase/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { controllers, urlAPI } from "@/app/main";
import SidebarHook from "./hook";
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

  const { ItemAside, getPageNotificationsCount, getSectionNotificationsCount } = SidebarHook();

  useEffect(() => {
    (async () => {
      const id = localStorage.getItem("id");
      const adminRole = localStorage.getItem("adminRole");
      const EnterpriseId = localStorage.getItem("EnterpriseId");
      const adminService = localStorage.getItem("adminService");
      const adminFcmToken = localStorage.getItem("adminFcmToken");

      const datas = {
        fcmToken: adminFcmToken,
        id,
        adminRole,
        adminEnterpriseId: EnterpriseId,
        adminService
      }
      // Mise à jour du token de l'administrateur
      const updateFcmTokenAdmin = await controllers.API.SendOne(urlAPI, "sendFcmToken", null, datas);
      console.log("le token admin", updateFcmTokenAdmin.message);

    })()
  }, []);
  //Ecoute des notifications entrantes

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

  const EnterpriseId = localStorage.getItem("EnterpriseId");
  const requiresRole = ['Super-Admin', 'Supervisor-Admin'];
  const adminRole = localStorage.getItem("adminRole");

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
            <Link href="/home" className="font-bold hover:text-gray-400 text-gray-300 ease duration-500">
              🏠 ACCUEIL
            </Link>
            <h1 className="font-bold text-[17px] mt-5 text-gray-300">Menu général</h1>
            <div className="mt-5">
              {
                ItemAside.map((aside, sectionIndex) => (
                  <div key={sectionIndex} className="mb-4">
                    <div onClick={() => {
                      setToggleAsideSections(
                        toggleAsideSections.includes(sectionIndex) ?
                          toggleAsideSections.filter(item => item !== sectionIndex)
                          : [...toggleAsideSections, sectionIndex]
                      )
                    }} className="flex cursor-pointer p-2 bg-gray-800 hover:bg-gray-900 ease  text-gray-300 flex-row items-center justify-between">
                      <div>
                        <h3 className="font-bold">{aside.title ?? ""} <span className='relative left-2 text-white rounded-full px-[6px]'>
                        </span>
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2 flex-row">
                        <div className={getPageNotificationsCount(sectionIndex) > 0 ? "bg-red-500 px-[9px] text-white rounded-full" : "hidden"}>
                          {getPageNotificationsCount.length}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={toggleAsideSections.includes(sectionIndex) ? faChevronUp : faChevronDown} className="" />
                        </div>
                      </div>
                    </div>

                    <div className={`transition-all duration-500 ease opacity-0, ${toggleAsideSections.includes(sectionIndex) ? "flex flex-col ease opacity-1 space-y-2 pl-8 pt-3" : "opacity-0 hidden"}`}>
                      {aside.ItemLists.map((list, pageIndex) => (
                        <Link href={list.href ?? "/"} onClick={() => {

                        }} className="flex flex-row justify-between items-center">
                          <div className="">
                            <li className="hover:text-orange-400/90 ease duration-500 pb-2 text-gray-300">
                              <FontAwesomeIcon icon={list.icon} /> <span className='relativetext-gray-300'>{list.title}</span>
                            </li>
                          </div>
                          <div className={getPageNotificationsCount(pageIndex) > 0 ? "bg-red-500 px-[9px] text-white rounded-full" : "hidden"}>
                            {getPageNotificationsCount(pageIndex)}
                          </div>
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
