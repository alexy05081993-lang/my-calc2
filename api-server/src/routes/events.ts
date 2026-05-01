import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db/schema";
import { TrackEventBody } from "@workspace/api-zod";

const router = Router();

router.post("/events", async (req, res) => {
  const parsed = TrackEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Неверные данные" });
    return;
  }
  try {
    await db.insert(eventsTable).values({ eventType: parsed.data.eventType });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Ошибка записи события" });
  }
});

export default router;
