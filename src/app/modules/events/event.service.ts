import httpStatus from "http-status-codes";
import { prisma } from "../../../lib/prisma";
import AppError from "../../customizer/AppErrror";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { JwtPayload } from "jsonwebtoken";


const createEvent = async (hostId: string, payload: Prisma.EventCreateInput) => {
  console.log("payload_host:", payload);

  // Host validation
  const host = await prisma.user.findFirst({
    where: { id: hostId, role: "HOST" },
  });

  if (!host) {
    throw new AppError(httpStatus.FORBIDDEN, "Only hosts can create events");
  }

  const {
    name,
    type,
    date,
    time,
    location,
    minParticipants,
    maxParticipants,
    description,
    image,
    fee,
  } = payload;

  if (minParticipants > maxParticipants) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "minParticipants cannot be greater than maxParticipants"
    );
  }

  const eventDateTime = time
    ? new Date(`${date}T${time}`)
    : new Date(`${date}T00:00`);


  const event = await prisma.event.create({
    data: {
      name,
      type,
      date: eventDateTime,
      time,
      location,
      minParticipants,
      maxParticipants,
      description,
      image,
      fee,
      host: { connect: { id: hostId } },
    },
  });

  return event;
};


const getAllEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
}


const getMyEvents = async (userInfo: JwtPayload) => {

  const { id, role } = userInfo;

  if (role === "HOST") {
    const events = await prisma.event.findMany({
      where: { hostId: id },
      select: {
        id: true,
        name: true,
        date: true,
        time: true,
        location: true,
        participantCount: true,
        image: true,
        fee: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }

      }
    });
    return {
      type: "HOST_EVENTS",
      events,
    };
  }

  // === User Logic ===
  if (role === "USER") {
    const events = await prisma.eventParticipant.findMany({
      where: { userId: id },
      include: {
        event: {
          include: {
            host: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    });

    // শুধু ইভেন্টগুলো রিটার্ন করবো
    return {
      type: "JOINED_EVENTS",
      events: events.map((p) => p.event),
    };
  }

}


const getMyReview = async (userInfo: JwtPayload) => {

  const { id, role } = userInfo;

  if (role === "HOST") {
    const reviews = await prisma.review.findMany({
      where: { hostId: id },
      include: {
        event: true,
        reviewer: {
          select: {
            name: true,
            email: true,
            bio: true,
            image: true,
            interests: true,
            hobbies: true,
            location: true
          }
        }
      }
    });
    return {
      type: "HOST_REVIEWS",
      reviews,
    };
  }

  // === User Logic ===
  if (role === "USER") {
    const events = await prisma.review.findMany({
      where: { reviewerId: id },
      include: {
        event: true,
        host: {
          select: {
            name: true,
            email: true,
            bio: true,
            image: true,
            interests: true,
            hobbies: true,
            location: true
          }
        },
      },
        orderBy: { rating: "asc" },
      });

    return {
      type: "USER_REVIEW",
      events: events.map((p) => p.event),
    };
  }

}



export const EventService = {
  createEvent,
  getAllEvents,
  getMyEvents,
  getMyReview
};