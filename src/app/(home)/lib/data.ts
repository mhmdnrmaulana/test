// "use server";

// import prisma from "../../../../lib/prisma";

// export const getCityFilter = async () => {
// 	try {
// 		// Log untuk memastikan koneksi ke database berhasil
// 		console.log('Connecting to database...');

// 		const data = await prisma.flight.groupBy({
// 			by: ["departureCity", "destinationCity"],
// 			where: {
// 				departureDate: {
// 					gt: new Date(),
// 				},
// 			},
// 			_count: {
// 				departureCity: true,
// 				destinationCity: true,
// 			},
// 		});

// 		// Log untuk menampilkan data yang didapatkan
// 		console.log('Data fetched:', data);

// 		return data;
// 	} catch (error) {
// 		// Log untuk menampilkan error jika terjadi
// 		console.error('Error fetching data:', error);
// 		return [];
// 	} finally {
// 		// Menutup koneksi Prisma
// 		await prisma.$disconnect();
// 	}
// };

// export const getAirplanes = async () => {
// 	try {
// 		const data = await prisma.airplane.findMany({
// 			where: {
// 				flight: {
// 					every: {
// 						id: undefined,
// 					},
// 				},
// 			},
// 		});

// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		return [];
// 	}
// };

// export const getFlightById = async (id: string) => {
// 	try {
// 		const data = await prisma.flight.findFirst({
// 			where: {
// 				id: id,
// 			},
// 			include: {
// 				seats: {
// 					orderBy: {
// 						seatNumber: "asc",
// 					},
// 				},
// 				plane: true,
// 			},
// 		});

// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		return null;
// 	}
// };

"use server"

import prisma from "../../../../lib/prisma"

export const getCityFilter = async () => {
  try {
    console.log("Connecting to database...")

    const data = await prisma.flight.groupBy({
      by: ["departureCity", "destinationCity"],
      where: {
        departureDate: {
          gt: new Date(),
        },
      },
      _count: {
        departureCity: true,
        destinationCity: true,
      },
    })

    console.log("Data fetched:", data)

    return data === null ? [] : data
  } catch (error) {
    console.error("Error fetching data:", error)
    return []
  } finally {
    await prisma.$disconnect()
  }
}

export const getAirplanes = async () => {
  try {
    const data = await prisma.airplane.findMany({
      where: {
        flight: {
          some: {
            id: { not: undefined },
          },
        },
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching airplanes:", error)
    return []
  }
}

export const getFlightById = async (id: string) => {
  try {
    const data = await prisma.flight.findFirst({
      where: {
        id: id,
      },
      include: {
        seats: {
          orderBy: {
            seatNumber: "asc",
          },
        },
        plane: true,
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching flight by ID:", error)
    return null
  }
}
