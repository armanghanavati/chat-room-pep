import { getConnection, createConnection } from "typeorm";
import { postMessageWithUsersService } from "./index";

jest.mock("typeorm", () => ({
  getConnection: jest.fn(),
  createConnection: jest.fn(),
}));

describe("postMessageWithUsersService", () => {
  let mockConnection: any;

  beforeEach(() => {
    mockConnection = {
      getRepository: jest.fn(),
    };
    (getConnection as jest.Mock).mockReturnValue(mockConnection);
  });

  it("should create a message when recieverId is null", async () => {
    // Mock behavior of repository
    const mockCreate = jest.fn().mockReturnValue({});
    const mockSave = jest.fn().mockResolvedValue({});

    mockConnection.getRepository.mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });

    const payload = {
      userId: "1",
      username: "Test User",
      title: "Test Message",
      recieverId: [],
    };

    const result = await postMessageWithUsersService(payload);

    expect(mockCreate).toHaveBeenCalledWith({
      userId: payload.userId,
      username: payload.username,
      title: payload.title,
      recieverId: null,
    });
    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it("should create messages for multiple recieverIds", async () => {
    const mockCreate = jest.fn().mockReturnValue({});
    const mockSave = jest.fn().mockResolvedValue({});

    mockConnection.getRepository.mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });

    const payload = {
      userId: "1",
      username: "Test User",
      title: "Test Message",
      recieverId: ["2", "3"],
    };

    const result = await postMessageWithUsersService(payload);

    expect(mockCreate).toHaveBeenCalledTimes(2); // برای هر recieverId
    expect(mockSave).toHaveBeenCalledTimes(2);
    expect(result).toEqual([{}, {}]); // باید با دو پیام ایجاد شده برگردد
  });
});
