import { prisma } from "../../../lib/prisma";


interface EventFilter {
    type?: string;
    date?: string;
    location?: string;
}

// interface HostInfo {
//     id: string;
//     name: string;
//     image: string;
// }

// interface EventWithHost {
//     id: string;
//     type: string;
//     date: Date;
//     location: string;
//     status: string;
//     host: HostInfo;
//     // Add other event fields as needed
// }

const getAllEvents = async (filters: EventFilter) => {
    const { type, date, location } = filters;

    const events = await prisma.event.findMany({
        where: {
            ...(type && { type: { contains: type, mode: "insensitive" } }),
            ...(location && { location: { contains: location, mode: "insensitive" } }),
            ...(date && {
                date: {
                    gte: new Date(date + "T00:00:00"),
                    lte: new Date(date + "T23:59:59"),
                },
            }),
            status: "OPEN",
        },

        include: {
            host: {
                select: { id: true, name: true, image: true },
            },
        },

        orderBy: { date: "asc" },
    });

    return events
}

export const AdminService = {
    getAllEvents
}
