import { login, register } from "../../src/controllers/authController";
import { Request, Response } from "express";
import User from "../../src/models/User";

jest.mock("../../src/models/User");
jest.mock("jsonwebtoken");

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Add this line to **ensure `findOne` exists**
(User as any).findOne = jest.fn();

describe("Auth Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should register a user", async () => {
    const req = {
      body: { username: "test", email: "test@example.com", password: "123456" }
    } as Request;
    const res = mockResponse();

    (User.prototype.save as jest.Mock) = jest.fn().mockResolvedValueOnce(true);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("should fail to login with invalid user", async () => {
    const req = {
      body: { email: "notfound@example.com", password: "wrong" }
    } as Request;
    const res = mockResponse();
    const next = jest.fn();

    // ✅ Add this to fix runtime error
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});
