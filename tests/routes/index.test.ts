import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../../src/app";

describe("[Route]: /", () => {
  it("works", async () => {
    const response = await request(app).get("/");
    expect(response.text).toContain("Welcome to Express");
  });
});
