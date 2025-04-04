import { getCategories } from "../../src/controllers/categoryController";
import Category from "../../src/models/Category";
import { Request, Response } from "express";

describe("Category Controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as any;

  it("should return a nested category tree", async () => {
    const req = {} as Request;

    const mockLean = jest.fn().mockResolvedValue([
      { _id: "1", name: "Electronics", status: "active", parent: null },
      { _id: "2", name: "Tablet", status: "active", parent: "1" },
      { _id: "3", name: "Tablet Baby", status: "active", parent: "2" },
      { _id: "4", name: "Tablet Children", status: "active", parent: "1" },
      { _id: "5", name: "New Category", status: "inactive", parent: null },
      { _id: "6", name: "mobile Inner 1", status: "inactive", parent: "5" }
    ]);

    jest.spyOn(Category, "find").mockReturnValueOnce({ lean: mockLean } as any);

    await getCategories(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        _id: "1",
        name: "Electronics",
        status: "active",
        parent: null,
        children: [
          {
            _id: "2",
            name: "Tablet",
            status: "active",
            parent: "1",
            children: [
              {
                _id: "3",
                name: "Tablet Baby",
                status: "active",
                parent: "2",
                children: []
              }
            ]
          },
          {
            _id: "4",
            name: "Tablet Children",
            status: "active",
            parent: "1",
            children: []
          }
        ]
      },
      {
        _id: "5",
        name: "New Category",
        status: "inactive",
        parent: null,
        children: [
          {
            _id: "6",
            name: "mobile Inner 1",
            status: "inactive",
            parent: "5",
            children: []
          }
        ]
      }
    ]);
  });
});
