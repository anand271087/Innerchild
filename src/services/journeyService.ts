import prisma from '../lib/prisma';

export interface SaveJourneyResponse {
  heading: string;
  response: string;
  audioUrl?: string;
}

export async function saveJourney(userId: number, prompt: string, responses: SaveJourneyResponse[]) {
  return await prisma.$transaction(async (tx) => {
    // Create the journey
    const journey = await tx.journey.create({
      data: {
        prompt,
        userId,
        responses: {
          create: responses.map(response => ({
            heading: response.heading,
            response: response.response,
            audioUrl: response.audioUrl
          }))
        }
      },
      include: {
        responses: true
      }
    });

    return journey;
  });
}

export async function getJourneyHistory(userId: number) {
  return await prisma.journey.findMany({
    where: {
      userId
    },
    include: {
      responses: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function updateJourneyResponse(
  journeyId: number,
  heading: string,
  response: string,
  audioUrl?: string
) {
  return await prisma.journeyResponse.upsert({
    where: {
      journeyId_heading: {
        journeyId,
        heading
      }
    },
    update: {
      response,
      audioUrl
    },
    create: {
      journeyId,
      heading,
      response,
      audioUrl
    }
  });
}