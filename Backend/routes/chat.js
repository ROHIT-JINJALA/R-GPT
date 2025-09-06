import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz2",
      title: "Testing New ",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB ", err });
  }
});

//Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    //descending order of updatedAt...most recent data on top
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

//get perticular chat
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Threrad not found" });
    }
    res.json(thread.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch" });
  }
});

//to delete thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedthread = await Thread.findOneAndDelete({ threadId });
    if (!deletedthread) {
      res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ success: "Thread deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, messages } = req.body;
  if (!threadId || !messages) {
    res.status(400).json({ error: "missing riquired fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: messages,
        messages: [{ role: "user", content: messages }],
      });
    } else {
      thread.messages.push({ role: "user", content: messages });
    }

    const assistantReply = await getOpenAIAPIResponse(messages);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "somethig went wrong from chat route" });
  }
});

export default router;
