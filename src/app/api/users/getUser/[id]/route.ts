
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const getUser = await prisma.employees.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!getUser) {
            return NextResponse.json({
                title: "Opération réussie",
                message: "Aucun utilisateur trouvé",
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            title: "Opération réussie",
            message: "L'utilisateur a été récupéré avec succès",
            data: getUser,
        })
    } catch (error) {
        return NextResponse.json({ error: "Une erreur est survenue lors de l'exécution de ce processus" }, { status: 500 });
    }
}