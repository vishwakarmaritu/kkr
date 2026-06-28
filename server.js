const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const readData = (filename) => {
  const filePath = path.join(__dirname, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeData = (filename, data) => {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/api/players", (req, res) => {
  try {
    const players = readData("squad.json");
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Could not read squad file." });
  }
});

app.post("/api/players", (req, res) => {
  const { name, role, image, bio, stats } = req.body;
  
  if (!name || !role) {
    return res.status(400).json({ error: "Player name and role are mandatory fields." });
  }

  const players = readData("squad.json");
  
  const newPlayer = {
    name,
    role,
    nationality: req.body.nationality || "DOMESTIC",
    image: image || "https://placehold.co/300x300/000000/B3A123?text=NO+IMAGE&font=Impact",
    bio: bio || "NO BIOGRAPHY REVEALED YET.",
    stats: stats || { matches: 0, runs: 0, wickets: 0 }
  };

  players.push(newPlayer);
  writeData("squad.json", players);
  res.json({ success: true, message: "Player cataloged successfully." });
});

app.get("/api/quiz", (req, res) => {
  try {
    const questions = readData("questions.json");
    res.json(questions); 
  } catch (error) {
    res.status(500).json({ error: "Could not resolve questions bank." });
  }
});

app.post("/api/leaderboard", (req, res) => {
  const { username, score } = req.body;

  if (!username || score === undefined) {
    return res.status(400).json({ error: "Username and score variables are missing." });
  }

  const leaderboard = readData("leaderboard.json");
  leaderboard.push({ username: username.toUpperCase(), score: parseInt(score) });
  
  leaderboard.sort((a, b) => b.score - a.score);
  const top10 = leaderboard.slice(0, 10);

  writeData("leaderboard.json", top10);
  res.json(top10);
});

app.get("/api/leaderboard", (req, res) => {
  try {
    const leaderboard = readData("leaderboard.json");
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Could not read leaderboard." });
  }
});

app.get("/api/products", (req, res) => {
  try {
    const products = readData("products.json");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Could not load merchandise data." });
  }
});

app.post("/api/order", (req, res) => {
  const { name, phone, address, cart } = req.body;

  if (!name || !phone || !address || !cart || cart.length === 0) {
    return res.status(400).json({ error: "Incomplete order details." });
  }

  const products = readData("products.json");
  let totalAmount = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      totalAmount += (product.price * cartItem.quantity);
    }
  });

  const newOrder = {
    orderId: "KKR-ORD-" + Math.floor(Math.random() * 900000 + 100000),
    orderDate: new Date().toISOString(),
    name,
    phone,
    address,
    items: cart,
    totalAmount
  };

  const orders = readData("orders.json");
  orders.push(newOrder);
  writeData("orders.json", orders);

  res.json({ success: true, orderId: newOrder.orderId, totalAmount: newOrder.totalAmount });
});

app.listen(3000, () => {
  console.log("ENGINE STARTED RUNNING ON PORT 3000");
});