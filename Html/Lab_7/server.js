const http = require("http");

const PORT = 3000;
const routes = {
  "/health": { status: "ok", service: "backend-api" },
  "/items": { items: ["item1", "item2", "item3"] },
};

const server = http.createServer((req, res) => {
  const data = req.method === "GET" ? routes[req.url] : null;
  const payload = JSON.stringify(data || { error: "Not Found" });
  res.writeHead(data ? 200 : 404, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(payload);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
