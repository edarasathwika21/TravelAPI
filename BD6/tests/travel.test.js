const request = require("supertest");
const {
  app,
  getPackages,
  getPackageByDestination,
  getBookingsByPackageId,
  addBookings,
  updateSeats,
} = require("../index.js");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getPackages: jest.fn(),
  getPackageByDestination: jest.fn(),
  getBookingsByPackageId: jest.fn(),
  addBookings: jest.fn(),
  updateSeats: jest.fn(),
}));

describe("travel and bookings function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retrieves all travel packages", async () => {
    let mockData = [
      {
        packageId: 1,
        destination: "Paris",
        price: 1500,
        duration: 7,
        availableSlots: 10,
      },
      {
        packageId: 2,
        destination: "Rome",
        price: 1200,
        duration: 5,
        availableSlots: 15,
      },
      {
        packageId: 3,
        destination: "Tokyo",
        price: 2000,
        duration: 10,
        availableSlots: 8,
      },
      {
        packageId: 4,
        destination: "New York",
        price: 1700,
        duration: 7,
        availableSlots: 12,
      },
      {
        packageId: 5,
        destination: "Dubai",
        price: 1100,
        duration: 4,
        availableSlots: 20,
      },
      {
        packageId: 6,
        destination: "Sydney",
        price: 2500,
        duration: 12,
        availableSlots: 5,
      },
      {
        packageId: 7,
        destination: "Cape Town",
        price: 1800,
        duration: 8,
        availableSlots: 6,
      },
      {
        packageId: 8,
        destination: "Bangkok",
        price: 800,
        duration: 3,
        availableSlots: 25,
      },
      {
        packageId: 9,
        destination: "Barcelona",
        price: 1400,
        duration: 6,
        availableSlots: 10,
      },
      {
        packageId: 10,
        destination: "Bali",
        price: 1300,
        duration: 5,
        availableSlots: 15,
      },
      {
        packageId: 11,
        destination: "Istanbul",
        price: 1000,
        duration: 4,
        availableSlots: 18,
      },
      {
        packageId: 12,
        destination: "London",
        price: 1900,
        duration: 9,
        availableSlots: 7,
      },
      {
        packageId: 13,
        destination: "Hawaii",
        price: 2200,
        duration: 10,
        availableSlots: 8,
      },
      {
        packageId: 14,
        destination: "Moscow",
        price: 1600,
        duration: 8,
        availableSlots: 10,
      },
      {
        packageId: 15,
        destination: "Athens",
        price: 1200,
        duration: 6,
        availableSlots: 12,
      },
    ];
    getPackages.mockReturnValue(mockData);
    const response = await request(app).get("/packages");
    expect(response.statusCode).toEqual(200);
    expect(response.body.packages).toHaveLength(15);
    expect(response.body.packages).toEqual(mockData);
  });
  it("retrieves all packages by destination", async () => {
    let mockData = {
      packageId: 1,
      destination: "Paris",
      price: 1500,
      duration: 7,
      availableSlots: 10,
    };
    getPackageByDestination.mockReturnValue(mockData);
    const response = await request(app).get("/packages/Paris");
    expect(response.statusCode).toEqual(200);
    expect(response.body.package).toEqual(mockData);
  });
  it("add a booking", async () => {
    let mockData = {
      bookingId: 6,
      packageId: 4,
      customerName: "Raj Kulkarni",
      bookingDate: "2024-12-20",
      seats: 2,
    };
    addBookings.mockReturnValue(mockData);
    const response = await request(app).post("/bookings").send({
      packageId: 4,
      customerName: "Raj Kulkarni",
      bookingDate: "2024-12-20",
      seats: 2,
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.booking).toEqual(mockData);
  });
  it("update seats", async () => {
    let mockData = {
      packageId: 1,
      destination: "Paris",
      price: 1500,
      duration: 7,
      availableSlots: 8,
    };
    updateSeats.mockReturnValue(mockData);
    const response = await request(app).post("/packages/update-seats").send({
      packageId: 1,
      seatsBooked: 2,
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body.package).toEqual(mockData);
  });
  it("retrieves all bookings by package", async () => {
    let mockData = {
      bookingId: 1,
      packageId: 1,
      customerName: "Anjali Seth",
      bookingDate: "2024-12-01",
      seats: 2,
    };
    getBookingsByPackageId.mockReturnValue(mockData);
    const response = await request(app).get("/bookings/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body.bookings).toEqual(mockData);
  });
});
