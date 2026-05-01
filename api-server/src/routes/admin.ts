import { Router } from "express";
import { db } from "@workspace/db";
import { leadsTable, eventsTable } from "@workspace/db/schema";
import { desc, count, sql } from "drizzle-orm";

const router = Router();

const ADMIN_KEY = process.env["ADMIN_KEY"] || "margoAdmin2026";

function requireKey(req: any, res: any, next: any) {
  if (req.query.key !== ADMIN_KEY) {
    res.status(401).json({ error: "Неверный ключ доступа" });
    return;
  }
  next();
}

router.get("/admin/leads", requireKey, async (_req, res) => {
  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt))
      .limit(200);
    res.json({ leads });
  } catch {
    res.status(500).json({ error: "Ошибка получения заявок" });
  }
});

router.get("/admin/stats", requireKey, async (_req, res) => {
  try {
    const [{ totalLeads }] = await db
      .select({ totalLeads: count() })
      .from(leadsTable);

    const eventCounts = await db
      .select({ eventType: eventsTable.eventType, count: count() })
      .from(eventsTable)
      .groupBy(eventsTable.eventType);

    const eventMap: Record<string, number> = {};
    for (const e of eventCounts) {
      eventMap[e.eventType] = Number(e.count);
    }

    res.json({
      totalLeads: Number(totalLeads),
      pageViews: eventMap["page_view"] ?? 0,
      calculatorUsed: eventMap["calc_completed"] ?? 0,
      ctaClicked: eventMap["cta_clicked"] ?? 0,
      formSubmitted: eventMap["form_submitted"] ?? 0,
    });
  } catch {
    res.status(500).json({ error: "Ошибка получения статистики" });
  }
});

export default router;
