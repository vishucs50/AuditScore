type AuditRiskResult = {
  score: number;
  summary: string;
  factors: string[];
};

export function calculateAuditRiskWithExplanation(
  protocol: any
): AuditRiskResult {
  const factors: string[] = [];

  // 🎯 Start from neutral baseline
  let risk = 50;

  /* --------------------
     1. Audit coverage
  -------------------- */
  const audits = protocol.audits ?? 0;

  if (audits === 0) {
    risk += 20;
    factors.push("No publicly verifiable audits found");
  } else if (audits === 1) {
    risk += 10;
    factors.push("Only one public audit available");
  } else if (audits >= 2) {
    risk -= 10;
    factors.push("Multiple independent audits conducted");
  }

  /* --------------------
     2. Auditor credibility
  -------------------- */
  const links = protocol.audit_links ?? [];
  const joined = links.join(" ").toLowerCase();

  const TOP_AUDITORS = [
    "openzeppelin",
    "trail of bits",
    "consensys",
    "quantstamp",
    "peckshield",
    "halborn",
    "certik",
    "security"
  ];

  const hasTopAuditor = TOP_AUDITORS.some((a) => joined.includes(a));

  if (!links.length) {
    risk += 10;
    factors.push("Audit reports are not publicly disclosed");
  } else if (hasTopAuditor) {
    risk -= 15;
    factors.push("Audited by reputable security firms");
  } else {
    risk += 5;
    factors.push("Audits conducted by less-established firms");
  }

  /* --------------------
     3. Protocol maturity (confidence signal)
  -------------------- */
  if (protocol.listedAt) {
    const ageYears =
      (Date.now() / 1000 - protocol.listedAt) / (365 * 24 * 3600);

    if (ageYears < 0.5) {
      risk += 10;
      factors.push("Protocol is relatively new with limited battle-testing");
    } else if (ageYears > 2) {
      risk -= 5;
      factors.push("Protocol has multiple years of production history");
    }
  }

  /* --------------------
     4. Audit disclosure notes
  -------------------- */
  const note = protocol.audit_note?.toLowerCase() ?? "";

  if (note.includes("unaudited") || note.includes("no audit")) {
    risk += 15;
    factors.push("Audit notes indicate missing or incomplete audits");
  } else if (
    note.includes("partial") ||
    note.includes("outdated") ||
    note.includes("fork")
  ) {
    risk += 8;
    factors.push("Audit notes mention partial or outdated coverage");
  }

  /* --------------------
     Clamp score
  -------------------- */
  const score = Math.max(0, Math.min(100, Math.round(risk)));

  /* --------------------
     Human-readable summary
  -------------------- */
  let summary = "Low audit-related risk.";

  if (score >= 75) {
    summary =
      "High audit-related risk due to insufficient or weak security auditing.";
  } else if (score >= 50) {
    summary = "Moderate audit-related risk with some security uncertainties.";
  } else if (score >= 25) {
    summary =
      "Relatively low audit-related risk with generally good audit coverage.";
  }

  return { score, summary, factors };
}
