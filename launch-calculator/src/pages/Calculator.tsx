import { useState, useMemo, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import InputSection from "@/components/InputSection";
import ResultsSection from "@/components/ResultsSection";
import DiagnosticsSection from "@/components/DiagnosticsSection";
import CtaSection from "@/components/CtaSection";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function trackEvent(eventType: string) {
  try {
    await fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType }),
    });
  } catch {}
}

export interface CalcInputs {
  baseSize: string;
  leads: string;
  sales: string;
  avgCheck: string;
}

export interface CalcResults {
  conversionToLead: number;
  conversionToSale: number;
  currentRevenue: number;
  potentialLeads: number;
  potentialSales: number;
  potentialRevenue: number;
  lostRevenue: number;
  yearlyLost: number;
  hasData: boolean;
}

function calcResults(inputs: CalcInputs): CalcResults {
  const base = parseFloat(inputs.baseSize) || 0;
  const leads = parseFloat(inputs.leads) || 0;
  const sales = parseFloat(inputs.sales) || 0;
  const check = parseFloat(inputs.avgCheck) || 0;

  const hasData = base > 0 && leads > 0 && sales > 0 && check > 0;

  const conversionToLead = base > 0 ? (leads / base) * 100 : 0;
  const conversionToSale = leads > 0 ? (sales / leads) * 100 : 0;
  const currentRevenue = sales * check;

  const potentialLeads = base * 0.04;
  const potentialSales = potentialLeads * 0.12;
  const potentialRevenue = potentialSales * check;
  const lostRevenue = Math.max(0, potentialRevenue - currentRevenue);
  const yearlyLost = lostRevenue * 4;

  return {
    conversionToLead,
    conversionToSale,
    currentRevenue,
    potentialLeads,
    potentialSales,
    potentialRevenue,
    lostRevenue,
    yearlyLost,
    hasData,
  };
}

export default function Calculator() {
  const [inputs, setInputs] = useState<CalcInputs>({
    baseSize: "",
    leads: "",
    sales: "",
    avgCheck: "",
  });

  const results = useMemo(() => calcResults(inputs), [inputs]);
  const trackedCalc = useRef(false);

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  useEffect(() => {
    if (results.hasData && !trackedCalc.current) {
      trackedCalc.current = true;
      trackEvent("calc_completed");
    }
  }, [results.hasData]);

  const scrollToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResults = () => {
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  const calcData = {
    baseSize: parseFloat(inputs.baseSize) || 0,
    leadsCount: parseFloat(inputs.leads) || 0,
    salesCount: parseFloat(inputs.sales) || 0,
    avgCheck: parseFloat(inputs.avgCheck) || 0,
    lostRevenue: results.lostRevenue,
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onCta={scrollToCalc} />
      <InputSection inputs={inputs} onChange={setInputs} results={results} onCalculate={scrollToResults} />
      {results.hasData && (
        <>
          <ResultsSection results={results} inputs={inputs} />
          <DiagnosticsSection results={results} />
          <CtaSection
            lostRevenue={results.lostRevenue}
            calcData={calcData}
            onCtaClick={() => trackEvent("cta_clicked")}
          />
        </>
      )}
    </div>
  );
}
