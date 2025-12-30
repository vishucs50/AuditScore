
type AuditRiskResult = {
  score: number;
  summary: string;
  factors: string[];
};

export function calculateAuditRiskWithExplanation(
  protocol: any
): AuditRiskResult {
  const factors: string[] = [];
  let risk = 0;

  // 1️ Audit coverage
  const audits = protocol.audits ?? 0;
  if (audits === 0) {
    risk += 45;
    factors.push("Protocol has no publicly verifiable audits");
  } else if (audits === 1) {
    risk += 25;
    factors.push("Only one public audit available");
  } else if (audits === 2) {
    risk += 15;
    factors.push("Multiple audits conducted, but limited coverage");
  } else {
    risk += 5;
    factors.push("Multiple independent audits completed");
  }

  // 2️ Auditor credibility
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
  ];

  const hasTopAuditor = TOP_AUDITORS.some((a) => joined.includes(a));

  if (!links.length) {
    risk += 25;
    factors.push("Audit reports are not publicly disclosed");
  } else if (hasTopAuditor) {
    risk += 5;
    factors.push("Audited by reputable security firms");
  } else {
    risk += 12;
    factors.push("Audits conducted by less-established firms");
  }

  // 3️ Audit freshness (protocol age proxy)
  if (protocol.listedAt) {
    const ageYears =
      (Date.now() / 1000 - protocol.listedAt) / (365 * 24 * 3600);

    if (ageYears < 0.5) {
      risk += 15;
      factors.push("Protocol is relatively new with limited battle-testing");
    } else if (ageYears < 1) {
      risk += 10;
      factors.push("Protocol has less than one year of production history");
    } else if (ageYears < 2) {
      risk += 6;
      factors.push("Protocol has moderate production history");
    } else {
      risk += 3;
      factors.push("Protocol has multiple years of production history");
    }
  }

  // 4️ Disclosure / audit notes
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

  // Clamp score
  const score = Math.min(100, Math.round(risk));

  //  Generate summary sentence
  let summary = "Low audit-related risk.";
  if (score >= 75)
    summary = "High audit-related risk due to insufficient or weak auditing.";
  else if (score >= 40)
    summary = "Moderate audit-related risk with some security gaps.";
  else if (score >= 20)
    summary = "Relatively low audit-related risk with good security coverage.";

  return { score, summary, factors };
}
