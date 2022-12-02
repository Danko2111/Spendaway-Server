const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

// const warehouseRoutes = require('./routes/warehouseRoute');
// const inventoryRoutes = require('./routes/inventoryRoute');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/warehouses", placeholder);
app.use("/inventories", placeholder);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
