export const urlAPI = "https://vps101055.serveur-vps.net:8500";

import { json } from "stream/consumers";
import Swal from "sweetalert2";

export const validateFields = (input: any) => {
    if (input === "" || input === undefined) {
        return false
    }
    else {
        return true
    }
}

export const speak = (text: string) => {
    const synth = window.speechSynthesis;

    const speakNow = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "fr-FR";

        // Choisir une voix française si dispo
        const voices = synth.getVoices();
        const frenchVoice = voices.find(v => v.lang.startsWith("fr"));
        if (frenchVoice) {
            utterance.voice = frenchVoice;
        }

        utterance.rate = 1.5;
        utterance.pitch = 1.5;
        synth.speak(utterance);
    };

    // Voix déjà prêtes ?
    if (synth.getVoices().length > 0) {
        speakNow();
    } else {
        // Attendre le chargement des voix
        synth.onvoiceschanged = () => speakNow();
    }
};

function alertMessage(status: boolean, title: string, message: string, path: string | null) {
    setTimeout(async () => {
        return Swal.fire({
            icon: status ? "success" : "error",
            title,
            text: message,
        }).then((confirm) => {
            if (confirm.isConfirmed && path !== null) {
                window.location.href = `${path}`;
            }
        });
    }, 1000)
}

function navigateBetweenMonths(array: any[], monthIndice: number) {
    const filterDatasByCurrentmonth = array.filter((data: { monthIndice: number }) => data.monthIndice === monthIndice);
    return filterDatasByCurrentmonth;
}

const filterDataOfAdministrationSection = (array: any[], input: string, monthIndice: number, getAdminEnterpriseId: number) => {
    const datas = array.filter((data: { monthIndice: number, EnterpriseId: number, User: { lastname: string, firstname: string } }) => data.monthIndice === monthIndice && data.EnterpriseId === getAdminEnterpriseId && (data.User?.firstname.toLowerCase()?.includes(input.toLowerCase())) || data.User?.lastname?.toLowerCase().includes(input.toLowerCase()));
    return datas;
}

const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export class Api {
    async getOne(url: string, methodName: string, id: any) {
        console.log(id)
        try {
            const response = await fetch(`${url}/api/${methodName}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.log("Erreur:", error.message);
                return
            }

            const result = await response.json();
            return result.datas;

        } catch (error) {
            console.error({ message: "Erreur réseau veuillez réessayer", error: error });
            // Swal.fire({
            //     title: "Erreur",
            //     icon: 'error',
            //     text: "Une erreur est survenue lors de l'exécution de cette opération veuillez réessayer à nouveau!"
            // });
            console.log(error)
        }
    }

    async getAll(url: string, methodName: string, id: any) {
        try {
            const request = id !== null ? `${url}/api/${methodName}/${id}` : `${url}/api/${methodName}`;

            const response = await fetch(request, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.log({ Erreur: error.message });
                return [];
            }

            const result = await response.json();
            console.log(result.datas);
            return result.datas;

        } catch (error) {
            console.error({ message: "Une erreur est survenue lors de l'exécution de cette opération veuillez réessayer à nouveau!", error: error });
            // Swal.fire({
            //     title: "Erreur",
            //     icon: 'error',
            //     text: "Une erreur est survenue lors de l'exécution de cette opération veuillez réessayer à nouveau!"
            // });

        }
    }

    async UpdateOne(fullUrl: string, methodName: string, id: any, data: Record<string, any> = {}) {
        try {
            let headers: any = {};
            let body: any
            let formData = new FormData();

            fullUrl = id !== null ? `${urlAPI}/api/${methodName}/${id}` : `${urlAPI}/api/${methodName}`;

            // Vérifie s'il y a au moins un fichier ou blob dans les valeurs de data
            const isPresentFile = Object.entries(data).some(([_, value]) =>
                value instanceof File || value instanceof Blob
            );
            // if (token !== null) {
            //     headers['Authorization'] = `Bearer ${token}`
            // }

            if (isPresentFile) {
                for (const [key, value] of Object.entries(data)) {
                    // if (value === null || value === undefined || value === "") {
                    //     return {
                    //         status: false,
                    //         title: "Champs invalides",
                    //         message: "Veuillez saisir tous les champs obligatoires"
                    //     }
                    // }
                    formData.append(key, value);
                }

                body = formData;

            } else {

                headers['Content-Type'] = "application/json";
                body = JSON.stringify(data);
            }

            const response = await fetch(fullUrl, {
                method: 'PUT',
                headers,
                body,
            });

            const result = await response.json();
            return result;


        } catch (error) {
            console.log(error)
            return {
                title:"Une erreur est survenue lors de l'exécution de cette opération!",
                message: "Veuillez contacter le service technique pour plus d'infos",
                status: false,
            }
        }
    }

    async SendOne(url: string, methodName: string, token = null, data = {}) {
        try {
            const isPresentFile = Object.entries(data).some(([_, value]) => typeof value === "object" && (value instanceof File || value instanceof Blob));

            console.log(`${url}/api/${methodName}`)

            let formData = new FormData();
            let body: any;
            let headers: any = {};

            if (token !== null) {
                headers['Authorization'] = `Bearer ${token}`
            }

            if (isPresentFile) {
                for (const [key, value] of Object.entries(data)) {
                    if (value === null || value === undefined || value === "") {
                        return {
                            status: false,
                            title: "Champs invalides",
                            message: "Veuillez saisir tous les champs obligatoires"
                        };
                    }
                    if (value instanceof File || value instanceof Blob) {
                        formData.append(key, value);
                    } else if (typeof value === "object") {
                        formData.append(key, JSON.stringify(value));
                    } else {
                        formData.append(key, String(value));
                    }
                }

                body = formData;
            } else {
                console.log("Pas de fichier envoyé")
                for (const [_, value] of Object.entries(data)) {
                    if (value === undefined || value === "") {
                        return {
                            status: false,
                            title: "Champs invalides",
                            message: "Veuillez saisir tous les champs obligatoires"
                        }
                    }
                }
                headers['Content-Type'] = "application/json";
                body = JSON.stringify(data);
            }

            const response = await fetch(`${url}/api/${methodName}`, {
                method: 'POST',
                headers,
                body,
            });

            const result = await response.json();
            return result;

        } catch (error) {
            console.error({ message: "Une erreur est survenue lors de l'exécution de cette opération veuillez réessayer à nouveau!", error: error });
            return {
                title: "Une erreur est survenue lors de l'exécution de cette opération",
                message: "Veuillez contacter le service technique pour plus d'infos",
                status: false,
            }
        }
    }

    // async deleteOne(url, methodName, id) {
    //     try {

    //         const response = await fetch(`${url}/api/${methodName}/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'Application/json'
    //             }
    //         });

    //         if (!response.ok) {
    //             const error = await response.json();
    //             console.log("Erreur:", error.message);
    //             Alert.alert("Erreur", error.message);
    //             return;
    //         }

    //         const result = await response.json()

    //         Alert.alert("Bravo", result.message);
    //         return true;

    //     } catch (error) {
    //         console.error({ message: "Erreur réseau veuillez réessayer à nouveau!", error: error });
    //         Alert.alert("Erreur", "Erreur réseau veuillez réessayer à nouveau!");
    //         return;
    //     }
    // }

    async deleteOne(urlAPI: string | null, methodName: string | null, UserId: number | null, data: {}) {
        try {
            let endPoint = `${urlAPI}/api/${methodName}/${UserId}`;

            console.log(endPoint);

            const request = await fetch(endPoint, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const response = await request.json();

            if (!request.ok) {
                return response;
            }

            return response;

        } catch (error) {
            return {
                message: "Veuillez vérifier votre connexion au réseau !",
                title: "Une erreur est survenue lors de l'exécution de ce processus.",
                status: false,
            }
        }
    }
}

export const API = new Api();

export const controllers = { alertMessage, API, navigateBetweenMonths, daysOfWeek, filterDataOfAdministrationSection }



