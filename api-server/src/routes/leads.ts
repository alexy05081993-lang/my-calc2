import { Router } from "express";
import { db } from "@workspace/db";
import { leadsTable } from "@workspace/db/schema";
import { CreateLeadBody } from "@workspace/api-zod";
import { z } from "zod/v4";

const router = Router();

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Неверные данные", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  try {
    const [lead] = await db
      .insert(leadsTable)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        baseSize: String(data.baseSize),
        leadsCount: String(data.leadsCount),
        salesCount: String(data.salesCount),
        avgCheck: String(data.avgCheck),
        lostRevenue: String(data.lostRevenue),
      })
      .returning();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: "Ошибка сохранения заявки" });
  }
});

export default router;
