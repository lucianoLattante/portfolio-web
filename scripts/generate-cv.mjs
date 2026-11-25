import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const career = JSON.parse(readFileSync(new URL("../content/career.json", import.meta.url), "utf8"));
const destination = new URL("../public/cv/", import.meta.url);
mkdirSync(destination, { recursive: true });

const bytes = (text) => Buffer.byteLength(text, "latin1");
const pdfString = (text) => text.replace(/[–—]/g, "-").replace(/[\\()]/g, "\\$&");
const paragraphs = {
  es: {
    skills: "Tecnologías y calidad",
    tools: "Java, Spring Boot, REST, MySQL, PostgreSQL, Quarkus, AWS, DynamoDB, Kafka, Redis, Docker, Git, JUnit y Testcontainers.",
    training: "Formación e idiomas",
    schools: "Aceleración Java - Alkemy (2022) · Bootcamp Full Stack - Egg Education (2021)",
    languages: "Español nativo. Inglés: lectura técnica avanzada, conversación intermedia (autoevaluación).",
    portfolio: "Proyectos personales",
    projects: [
      ["CommerceFlow", "Reservas de stock e idempotencia en MySQL. Outbox/inbox con Kafka y pagos simulados.", "commerceflow"],
      ["LedgerCore", "Transferencias simuladas, reversos y roles PostgreSQL separados para migración y ejecución.", "ledgercore"],
      ["KnowledgeAI", "Búsqueda privada con Spring AI y pgvector, citas autorizadas y cupo concurrente por propietario.", "knowledgeai"],
    ],
  },
  en: {
    skills: "Technologies and testing",
    tools: "Java, Spring Boot, REST, MySQL, PostgreSQL, Quarkus, AWS, DynamoDB, Kafka, Redis, Docker, Git, JUnit and Testcontainers.",
    training: "Training and languages",
    schools: "Java acceleration program - Alkemy (2022) · Full Stack Bootcamp - Egg Education (2021)",
    languages: "Native Spanish. English: advanced technical reading and intermediate conversation (self-assessed).",
    portfolio: "Personal projects",
    projects: [
      ["CommerceFlow", "MySQL stock reservations and idempotency. Kafka outbox/inbox and simulated payments.", "commerceflow"],
      ["LedgerCore", "Simulated transfers, reversals, and separate PostgreSQL migration and runtime roles.", "ledgercore"],
      ["KnowledgeAI", "Private Spring AI and pgvector retrieval with authorized citations and concurrent per-owner quotas.", "knowledgeai"],
    ],
  },
};

function wrap(text, width = 83) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else {
      line = line ? line + " " + word : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function build(locale) {
  const content = career[locale];
  const detail = paragraphs[locale];
  const commands = ["0.14 0.31 0.21 rg 0 834 595 8 re f"];
  const links = [];
  let y = 787;
  function text(value, size = 11, font = "F1", color = "0.12 0.17 0.15", space = size + 4, url) {
    commands.push(`BT /${font} ${size} Tf ${color} rg 48 ${y} Td (${pdfString(value)}) Tj ET`);
    if (url) {
      links.push({ y, width: Math.min(499, value.length * size * 0.61), url });
    }
    y -= space;
  }
  function section(label) {
    y -= 9;
    commands.push(`0.77 0.83 0.78 RG 48 ${y + 12} m 547 ${y + 12} l S`);
    text(label, 14, "F2", "0.14 0.31 0.21", 26);
  }

  text(career.name, 32, "F2", "0.14 0.31 0.21", 41);
  text(content.role, 16, "F2", undefined, 27);
  text(`${content.location} · ${career.email}`, 10);
  text(career.linkedin.replace("https://", ""), 10, "F1", undefined, 14, career.linkedin);
  text(career.github.replace("https://", ""), 10, "F1", undefined, 14, career.github);
  const portfolioUrl = `https://lucianolattante.github.io/portfolio-web/${locale === "en" ? "en/" : ""}`;
  text(portfolioUrl.replace("https://", ""), 10, "F1", undefined, 20, portfolioUrl);
  for (const line of wrap(content.intro)) text(line);
  section(content.experience);
  for (const [company, title, dates, summary] of content.jobs) {
    text(company, 13, "F2", undefined, 18);
    for (const line of wrap(`${title} · ${dates}`, 88)) text(line, 10, "F1", "0.29 0.38 0.34", 15);
    for (const line of wrap(summary)) text(line);
    y -= 5;
  }
  section(detail.skills);
  for (const line of wrap(detail.tools)) text(line);
  section(detail.portfolio);
  for (const [name, summary, repository] of detail.projects) {
    const [firstLine, ...continuation] = wrap(`${name} · ${summary}`, 91);
    text(firstLine, 10, "F1", undefined, 14, `${career.github}/${repository}`);
    for (const line of continuation) text(line, 10, "F1", undefined, 14);
  }
  section(detail.training);
  for (const line of wrap(detail.schools, 83)) text(line, 10);
  for (const line of wrap(detail.languages, 90)) text(line, 10);
  if (y < 42) throw new Error("Résumé content exceeds the page");
  const stream = commands.join("\n") + "\n";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [${links.map((_, i) => (i + 7) + " 0 R").join(" ")}] >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${bytes(stream)} >>\nstream\n${stream}endstream`,
  ];
  for (const link of links) {
    objects.push(`<< /Type /Annot /Subtype /Link /Rect [48 ${link.y - 2} ${48 + link.width} ${link.y + 10}] /Border [0 0 0] /A << /S /URI /URI (${pdfString(link.url)}) >> >>`);
  }
  let pdf = "%PDF-1.4\n%âãÏÓ\n";
  const offsets = objects.map((object, index) => {
    const offset = bytes(pdf);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    return offset;
  });
  const xref = bytes(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  writeFileSync(new URL(`luciano-lattante-${locale}.pdf`, destination), pdf, "latin1");
}

for (const locale of ["es", "en"]) build(locale);
