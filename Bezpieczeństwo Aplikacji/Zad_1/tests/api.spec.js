import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../index.js";

describe("backend API", () => {
  it("GET /health should return service status and runtime metrics", async () => {
    const app = createApp({ instanceId: "test-instance" });

    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "ok");
    assert.equal(typeof response.body.uptime, "number");
    assert.equal(typeof response.body.requestsCount, "number");
    assert.equal(typeof response.body.serverTime, "string");
  });

  it("GET /stats should include extended metrics and incremented request counter", async () => {
    const app = createApp({ instanceId: "test-instance" });

    await request(app).get("/health");
    const response = await request(app).get("/stats");

    assert.equal(response.status, 200);
    assert.equal(response.body.totalProducts, 3);
    assert.equal(response.body.categoriesCount, 2);
    assert.equal(response.body.instanceId, "test-instance");
    assert.equal(typeof response.body.serverTime, "string");
    assert.equal(typeof response.body.startedAt, "string");
    assert.equal(typeof response.body.uptime, "number");
    assert.ok(response.body.requestsCount >= 2);
  });
});
