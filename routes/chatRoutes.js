const express = require("express");
const { askQuestion, getAllchat, deleteAllChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/chat",askQuestion);
router.get("/chats",getAllchat);
router.delete("/chats",deleteAllChats);

module.exports = router;