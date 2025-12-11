"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCity,
  faDollarSign,
  faGlobe,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { controllers, urlAPI } from "@/app/main";

type Attendances = {
  status: string;
  Salary: {
    dailySalary: string;
  };
  EnterpriseId: number | null;
  mounth: number;
};

export default function HomeComponent() {
  const [attendances, setAttendances] = useState<Attendances[]>([]);
  const [EnterpriseId, setEnterpriseId] = useState<string | null>(null)
  const monthIndex = new Date().getMonth();
  const [data, setData] = useState({
    usersNumber: 0,
    enterprisesNumber: 0,
    totalAmount: 0,
    countriesNumber: 0,
    citiesNumber: 0,
  });

  let HomeCard;
  // Nombre d'utilisateur par entreprise
  useEffect(() => {
    (async () => {
        const EnterpriseId =localStorage.getItem("EnterpriseId");
        const users = await controllers.API.getAll(urlAPI, "getUsers", null);
        if (parseInt(EnterpriseId ?? "") !== 1) {
          const filterUsersByEnterpriseId = users.filter(
            (item: { EnterpriseId: number }) =>
              item.EnterpriseId === parseInt(EnterpriseId ?? ""),
          );
          return setData({
            ...data,
            usersNumber: filterUsersByEnterpriseId.length,
          });
        }
        setData({
          ...data,
          usersNumber: users.length,
        });
        setEnterpriseId(EnterpriseId)
      })();
  }, []);
  //Nombre d'entreprise
  useEffect(() => {
    (async () => {
      const enterprises = await controllers.API.getAll(
        urlAPI,
        "getEnterprises",
        null,
      );
      setData({
        ...data,
        enterprisesNumber: enterprises?.length,
      });
    })();
  }, [data.usersNumber]);

  useEffect(() => {
    (async () => {
      const attendances = await controllers.API.getAll(
        urlAPI,
        "getAllAttendances",
        null,
      );
      if (parseInt(EnterpriseId ?? "") === 1) {
        const getAttendancesByEnterprise = attendances.filter(
          (attendance: { EnterpriseId: number | null; mounth: number }) =>
            [1, 2, 3, 4, null].includes(attendance.EnterpriseId) &&
            attendance.mounth === monthIndex,
        );
        return setAttendances(getAttendancesByEnterprise);
      }
      const getAttendancesByEnterprise = attendances.filter(
        (attendance: { EnterpriseId: number; mounth: number }) =>
          attendance.EnterpriseId === parseInt(EnterpriseId ?? "") &&
          attendance.mounth === monthIndex,
      );
      setAttendances(getAttendancesByEnterprise);
    })();
  }, [data.enterprisesNumber]);

  useEffect(() => {
    (async () => {
      const getCountries = await controllers.API.getAll(
        urlAPI,
        "getCountries",
        null,
      );
      setData({
        ...data,
        countriesNumber: getCountries.length,
      });
    })();
  }, [attendances]);

  useEffect(() => {
    (async () => {
      const getCities = await controllers.API.getAll(urlAPI, "getCities", null);
      setData({
        ...data,
        citiesNumber: getCities.length,
      });
    })();
  }, [data.countriesNumber]);

  function getTotalAttendanceDeductions(attendances: Attendances[]) {
    let totalAmount: number = 0;
    let totalLates: number = 0;
    let totalAbsences: number = 0;

    for (const attendance of attendances) {
      if (attendance.status === "En retard") {
        totalLates += parseInt(attendance.Salary.dailySalary) / 2;
      } else if (attendance.status === "Absent") {
        totalAbsences += parseInt(attendance.Salary?.dailySalary);
      }
    }

    return (totalAmount = totalLates + totalAbsences);
  }

  HomeCard = [
    {
      icon: faUserGroup,
      value: data.usersNumber,
      title: "Collaborateurs",
      path: "/pages/dashboard/RH/usersList",
      backgroundColor: "#3B82F6", // blue-500
    },
    {
      icon: faBuilding,
      value: data.enterprisesNumber,
      title: "Entreprises",
      path: "/pages/dashboard/OTHERS/enterprisesList",
      backgroundColor: "#EF4444", // red-500
    },
    {
      icon: faDollarSign,
      value: getTotalAttendanceDeductions(attendances),
      title: "Gain mensuel actuel",
      path: "/pages/dashboard/STATS/annualGain",
      backgroundColor: "#22C55E", // green-500
    },
    {
      icon: faGlobe,
      value: data.countriesNumber,
      title: "Pays",
      path: "/pages/dashboard/OTHERS/getCountries",
      backgroundColor: "#6B7280", // gray-500
    },
    {
      icon: faCity,
      value: data.citiesNumber,
      title: "Villes",
      path: "/pages/dashboard/OTHERS/getCities",
      backgroundColor: "#0EA5E9",
    },
  ];

  return HomeCard;
}
