import { prisma } from "../../../lib/prisma";


export const SavedEventService = {

  saveEvent: async (userId: string, eventId: string) => {
    return prisma.savedEvent.create({
      data: {
        userId,
        eventId,
      },
    });
  },

  removeSavedEvent: async (userId: string, eventId: string) => {
    return prisma.savedEvent.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
  },

  getMySavedEvents: async (userId: string) => {
    return prisma.savedEvent.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            host: true,
            participants: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

};
