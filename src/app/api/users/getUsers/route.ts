
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const getUsers = await prisma.employees.findMany();

        if (getUsers.length === 0) {
            return NextResponse.json({
                title: "Opération réussie",
                message: "Aucune donnée trouvée",
                data: getUsers
            }, {
                status: 404,
            })
        }
        return NextResponse.json({
            title: "Opération réussie",
            message: "Vopici la liste des utilisateurs",
            data: getUsers
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Une erreur est survenue lors de l'exécution de ce processus" }, { status: 500 });
    }
}