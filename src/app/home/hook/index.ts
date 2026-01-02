"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCity,
  faDollar,
  faDollarSign,
  faGlobe,
  faHandHoldingDollar,
  faUserGroup,
  faUsers,
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
  const [EnterpriseId, setEnterpriseId] = useState<string | null>(null);
  const monthValue = new Date().getMonth();

  const [data, setData] = useState({
    usersArray: [],
    enterprisesArray: [],
    totalAmount: [],
    countriesArray: [],
    citiesArray: [],
  });

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

  useEffect(() => {
    (async () => {
      const users = await controllers.API.getAll(urlAPI, "getUsers", null);
      const EnterpriseId = window.localStorage.getItem("EnterpriseId");
      setEnterpriseId(EnterpriseId);
      if (parseInt(EnterpriseId ?? "") !== 1) {
        const filterUsersByEnterprisesId = users.filter((user: { EnterpriseId: number }) => user.EnterpriseId === parseInt(EnterpriseId ?? ""));
        return setData({
          ...data,
          usersArray: filterUsersByEnterprisesId
        })
      }
      setData({
        ...data,
        usersArray: users
      })
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const enterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);
      setData({
        ...data,
        enterprisesArray: enterprises
      })
    })()
  }, [data.usersArray]);

  useEffect(() => {
    (async () => {
      const attendances = await controllers.API.getAll(urlAPI, "getAllAttendances", null);
      if (parseInt(EnterpriseId ?? "") !== 1) {
        const filterAttendancesByEnterpriseId = attendances.filter((attendance: { EnterpriseId: number, mounth: number, createdAt: string }) => attendance.EnterpriseId === parseInt(EnterpriseId ?? "") && attendance.mounth === monthValue && new Date(attendance.createdAt).getFullYear() === new Date().getFullYear());
        return setAttendances(filterAttendancesByEnterpriseId);
      }
      const filterAttendancesByEnterpriseId = attendances.filter((attendance: { EnterpriseId: number, mounth: number, createdAt: string }) => [1, 2, 3, 4].includes(attendance.EnterpriseId) && attendance.mounth === monthValue && new Date(attendance.createdAt).getFullYear() === new Date().getFullYear());
      return setAttendances(filterAttendancesByEnterpriseId);
    })()
  }, [data.enterprisesArray])

  const cardComponent = [
    {
      icon: faUsers,
      backgroundColor: "#6366f1",
      path: "/dashboard/RH/usersList",
      title: "Collaborateurs",
      value: data.usersArray?.length || 0
    },
    {
      icon: faBuilding,
      backgroundColor: "#0ea5e9",
      path: "/dashboard/OTHERS/enterprisesList",
      title: "Entreprises",
      value: data.enterprisesArray?.length || 0
    },
    {
      icon: faHandHoldingDollar,
      backgroundColor: "#10b981",
      path: "/dashboard/STATS/annualGain",
      title: "Gain mensuel",
      value: getTotalAttendanceDeductions(attendances)
    }
  ];

  return { cardComponent }
}
