"use client";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { faEllipsis, faMessage, faPaperclip, faPaperPlane, faPhone, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAllNotification } from "./hook";
import { urlAPI } from "@/app/main";
import { useRef, useEffect } from "react";

export default function GetAllNotifications() {
    const { filterUserByName, setUserData, userData, groupedNotifications, adminId, getLatestMessage, reduceTextLength, storedUsers, handleSubmit, setInputs, inputs, usersIdConnected, setStoredNotificationsArray, storedNotificationsArray, getUserNotificationsCount } = useAllNotification();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        (() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTo({
                    behavior: "smooth",
                    top: messagesEndRef.current.scrollHeight
                })
            }
        })()
    }, [groupedNotifications, userData.receiverId])

    // console.log("les utilisateurs", usersIdConnected)

    // console.log("la liste de notification groupé", groupedNotifications)
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="w-full">

                    {/* <div className="fixed inset-0 opacity-5">
                        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
                    </div> */}

                    <div className="flex justify-between fixed h-[650px] w-full  px-5 z-10">
                        {/* <!-- Sidebar --> */}
                        <div className="w-80 h-full overflow-auto  bg-gray-800 border-r border-gray-700 flex flex-col perspective-card">
                            <div className="card-3d pb-10 h-full">

                                <div className="p-4 border-b border-gray-700 glass-effect">
                                    {/* <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <img src="https://lh3.googleusercontent.com/a/ACg8ocKglmNZhp-djrEiWhstceJqG7kyby7hUn0m3nix2w-WRmkjuTOH=s96-c"
                                                    alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-green-400 floating" />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 online-indicator"></div>
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-white">Nicole Shalom</h2>
                                                <p className="text-xs text-gray-400">Developer</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                                                <i className="fas fa-ellipsis-v text-gray-400"></i>
                                            </button>
                                        </div>
                                    </div> */}


                                    <div className="relative">
                                        <input onChange={(input) => {
                                            filterUserByName(input.target.value)
                                        }} type="text" placeholder="Rechercher un profil"
                                            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 outline-none transition-all" />
                                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto pb-10 custom-scrollbar">
                                    {
                                        storedUsers?.map((item) => (
                                            <div onClick={() => {
                                                setUserData({
                                                    firstname: item?.User.firstname,
                                                    lastname: item?.User.lastname,
                                                    fcmToken: item.fcmToken,
                                                    receiverId: String(item.UserId),
                                                    photo: item?.User.photo
                                                });
                                                setInputs({
                                                    ...inputs,
                                                    fcmToken: item.fcmToken,
                                                    receiverId: String(item.UserId),
                                                    senderId: String(adminId),
                                                    EnterpriseId: item.UserEnterpriseId
                                                });
                                                const deleteNotificationsCount = storedNotificationsArray.map((elem: { senderId: string }) => {
                                                    if (elem.senderId === String(item.UserId)) {
                                                        return {};
                                                    }
                                                    else return elem;
                                                });
                                                setStoredNotificationsArray(deleteNotificationsCount);
                                                localStorage.setItem("storedNotificationsArray", JSON.stringify(deleteNotificationsCount));
                                            }} className="chat-hover ease-in-out hover:bg-gray-800 p-4 border-b border-gray-700 cursor-pointer bg-gray-900 bg-opacity-20 border-l-4 ">
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        {item?.User?.photo ? <img src={`${urlAPI}/images/${item?.User.photo}`}
                                                            alt="Sarah" className="w-12 h-12 rounded-full object-cover" /> : <p className="text-[35px]">🧑‍💼</p>}

                                                        <div className={usersIdConnected.includes(item.UserId) ? "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800" : "absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-800"}>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-semibold text-white truncate">{item.User.lastname} {item?.User.firstname}</h3>

                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex justify-between relative top-1 w-full items-center space-x-2">
                                                                {/* <div className="typing-indicator w-2 h-2 bg-green-400 rounded-full"></div> */}
                                                                <div className="flex items-center space-x-1">
                                                                    <p className="text-sm text-gray-400">{
                                                                        reduceTextLength(String(getLatestMessage(String(item.UserId)).content), 14)}
                                                                    </p>
                                                                    <p className={getUserNotificationsCount(String(item.UserId)) > 0 ? "bg-red-500 text-white rounded-full py-0.5 px-2.5 text-sm" : "hidden"}>{getUserNotificationsCount(String(item.UserId))}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-[10px] text-gray-400">
                                                                        {getLatestMessage(String(item.UserId)).date}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <i className="fas fa-check-double text-blue-400"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Chat */}
                        <div className="flex-1 bg-gray-900 flex flex-col h-full perspective-card">
                            {
                                userData.receiverId ?
                                    <div className="card-3d flex flex-col relative pb-24 h-full">
                                        <div className="p-4 border-b border-gray-700 glass-effect">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center relative space-x-3">
                                                    <div className="relative">
                                                        {
                                                            userData.photo ? <img src={`${urlAPI}/images/${userData.photo}`}
                                                                alt="Sarah" className="w-10 h-10 object-cover rounded-full floating" /> : <p className='text-[40px]'>🧑‍💼</p>
                                                        }
                                                        <div className={usersIdConnected.includes(Number(userData.receiverId)) ? "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800" : "absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-800"}></div>
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold text-white">{userData.lastname} {userData.firstname}</h3>
                                                        <p className={usersIdConnected.includes(Number(userData.receiverId)) ? "text-sm text-green-500 font-normal" : "text-sm text-red-500 font-normal"}>{usersIdConnected.includes(Number(userData.receiverId)) ? "En ligne" : "Hors ligne"} </p>
                                                    </div>

                                                </div>
                                                {/* Icone header espace de chat */}
                                                <div className="flex relative lg:right-60 items-center space-x-4">
                                                    <button className="py-2 px-2.5 hover:bg-gray-700 rounded-full transition-colors">
                                                        <FontAwesomeIcon icon={faVideo} className="text-gray-400 hover:text-white" />
                                                    </button>
                                                    <button className="py-2 px-2.5 hover:bg-gray-700 rounded-full transition-colors">
                                                        <FontAwesomeIcon icon={faPhone} className="text-gray-400 hover:text-white" />
                                                    </button>
                                                    <button className="py-2 px-2.5 hover:bg-gray-700 rounded-full transition-colors">
                                                        <FontAwesomeIcon icon={faEllipsis} className="text-gray-400 hover:text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div ref={messagesEndRef} className="flex-1 xl:w-[650px] 2xl:w-[890px] overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                            {
                                                Object.entries(groupedNotifications).map(([label, notificationsArray]) => (
                                                    <div className="mt-6">
                                                        <h1 className="relative xl:right-32 text-center mb-4">{label}</h1>
                                                        {
                                                            notificationsArray.map((notification, index) => (
                                                                <div className={userData.receiverId === notification.senderId ? "flex mb-4 justify-start relative space-x-2 message-bubble" : notification.senderId === adminId ? "flex mb-4 justify-end  space-x-2 message-bubble relative lg:right-0 2xl:" : "hidden"}>
                                                                    {userData.photo && userData.receiverId === notification.senderId ? <img src={`${urlAPI}/images/${userData.photo}`}
                                                                        alt="" className="w-8 h-8 rounded-full object-cover" /> : notification.senderId === adminId ? "" : <p className="text-[32px]">🧑‍💼</p>
                                                                    }

                                                                    <div className="max-w-xs lg:max-w-md">
                                                                        <div className="bg-gray-700 rounded-2xl rounded-tl-sm p-3 shadow-lg">
                                                                            <div className={userData.receiverId === notification.senderId ? "border-b border-gray-600 mb-3" : notification.senderId === adminId ? "hidden" : "hidden"}>
                                                                                <p className="text-white text-[17px] font-bold">{notification.title}</p>
                                                                            </div>
                                                                            <p className="text-white whitespace-pre-line">{notification.content}</p>
                                                                        </div>
                                                                        <p className="text-xs text-gray-400 mt-1 ml-2">{new Date(notification.createdAt).toLocaleTimeString("fr-FR", { minute: "2-digit", hour: "2-digit" })}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }

                                        </div>

                                        <div className="p-4 border-t bg-gray-900 absolute w-full bottom-4 border-gray-700 glass-effect">
                                            <div className="flex items-center space-x-3">
                                                <button className="py-2 px-2.5 hover:bg-gray-700 rounded-full transition-colors">
                                                    <FontAwesomeIcon icon={faPaperclip} className="text-gray-400 hover:text-blue-400" />
                                                </button>
                                                <div className="flex items-center w-full">
                                                    <textarea value={inputs.content} onChange={(e) => {
                                                        setInputs({
                                                            ...inputs,
                                                            content: e.target.value
                                                        })
                                                    }}
                                                        placeholder="Ecrivez quelque chose..."
                                                        className="w-[70%] bg-gray-700 text-white placeholder-gray-400 rounded-md pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                                        id="messageInput">
                                                    </textarea>
                                                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 py-2 px-2.5 hover:bg-gray-600 rounded-full transition-colors">
                                                        <FontAwesomeIcon icon={faSmile} className="text-gray-400 hover:text-blue-400" />

                                                    </button>
                                                    <button onClick={handleSubmit} className="relative left-5 py-2 px-2.5 bg-gray-600 chat-gradient rounded-full  shadow-lg" id="sendButton">
                                                        <FontAwesomeIcon icon={faPaperPlane} className="text-white hover:text-blue-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center w-[75%] h-full justify-center">
                                        <div>
                                            <h2 className="font-semibold">Intéragissez avec vos collaborateurs en temps réel!</h2>
                                            <p className="text-center mt-3">
                                                <FontAwesomeIcon icon={faMessage} className="text-[40px] text-gray-400" />
                                            </p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}