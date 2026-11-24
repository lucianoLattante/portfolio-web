const github = "https://github.com/lucianoLattante";

export const projects = [
  {
    name: "CommerceFlow",
    href: `${github}/commerceflow`,
    verification: `${github}/commerceflow/actions/runs/45044196595`,
    detail: `${github}/commerceflow/blob/950b4c98f677847c48ec575ff3e2cd22ced22603/docs/CASE_STUDY.md`,
    stack: ["Java 21", "MySQL", "Kafka", "Redis"],
    es: {
      scope: "Comercio electrónico",
      description: "Órdenes y pagos simulados con reserva de stock, idempotencia y mensajería mediante outbox e inbox.",
      proof: "128 pruebas unitarias y 160 de integración",
    },
    en: {
      scope: "E-commerce",
      description: "Orders and simulated payments with stock reservation, idempotency, and outbox/inbox messaging.",
      proof: "128 unit tests and 160 integration tests",
    },
  },
  {
    name: "LedgerCore",
    href: `${github}/ledgercore`,
    verification: `${github}/ledgercore/actions/runs/45241679509`,
    detail: `${github}/ledgercore/blob/c6e26ff281e4bb80c72b25d10ba6ac2af74998d1/docs/adr-001-transfer-journal.md`,
    stack: ["Java 21", "Spring Boot", "PostgreSQL"],
    es: {
      scope: "Sistemas financieros",
      description: "Transferencias simuladas, asientos inmutables, reversos compensatorios y control de débitos concurrentes.",
      proof: "8 pruebas unitarias y 10 de integración",
    },
    en: {
      scope: "Financial systems",
      description: "Simulated transfers, immutable postings, compensating reversals, and concurrent debit checks.",
      proof: "8 unit tests and 10 integration tests",
    },
  },
  {
    name: "KnowledgeAI",
    href: `${github}/knowledgeai`,
    verification: `${github}/knowledgeai/actions/runs/45246199593`,
    detail: `${github}/knowledgeai/blob/2bd50a4bd8819921ba3b45d06395abbc91ca2831/docs/adr-001-local-retrieval.md`,
    stack: ["Java 21", "Spring AI", "pgvector"],
    es: {
      scope: "Búsqueda documental",
      description: "Búsqueda privada y respuestas extractivas con citas de un proveedor local, restringidas por organización y propietario.",
      proof: "7 pruebas de integración con pgvector",
    },
    en: {
      scope: "Document retrieval",
      description: "Private document search and cited excerpts from a local provider, scoped to tenant and owner.",
      proof: "7 integration tests with pgvector",
    },
  },
] as const;
