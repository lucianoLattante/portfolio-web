const github = "https://github.com/lucianoLattante";

export const projects = [
  {
    name: "CommerceFlow",
    href: `${github}/commerceflow`,
    verification: `${github}/commerceflow/actions/runs/45541230478`,
    caseStudy: `${github}/commerceflow/blob/cc82414bbcd5063e281d7e0e8baac4e9157ca70d/docs/CONTENTION.md#pages-between-commits-and-concurrent-writes`,
    detail: `${github}/commerceflow/blob/cc82414bbcd5063e281d7e0e8baac4e9157ca70d/docs/CASE_STUDY.md`,
    stack: ["Java 21", "MySQL", "Kafka", "Redis"],
    es: {
      scope: "Comercio electrónico",
      description: "Órdenes y pagos simulados con reserva de stock, idempotencia y mensajería mediante outbox e inbox.",
      proof: "128 pruebas unitarias y 160 de integración",
      caseStudyLabel: "Experimento de paginación",
    },
    en: {
      scope: "E-commerce",
      description: "Orders and simulated payments with stock reservation, idempotency, and outbox/inbox messaging.",
      proof: "128 unit tests and 160 integration tests",
      caseStudyLabel: "Pagination experiment",
    },
  },
  {
    name: "LedgerCore",
    href: `${github}/ledgercore`,
    verification: `${github}/ledgercore/actions/runs/45541202715`,
    caseStudy: `${github}/ledgercore/blob/afe6f05b5dce9c22b15b6226c06ae92b3a60daba/docs/DATABASE_ROLES.md`,
    detail: `${github}/ledgercore/blob/afe6f05b5dce9c22b15b6226c06ae92b3a60daba/docs/adr-001-transfer-journal.md`,
    stack: ["Java 21", "Spring Boot", "PostgreSQL"],
    es: {
      scope: "Sistemas financieros",
      description: "Transferencias simuladas, asientos inmutables, reversos compensatorios y control de débitos concurrentes.",
      proof: "8 pruebas unitarias y 12 de integración",
      caseStudyLabel: "Roles de base de datos",
    },
    en: {
      scope: "Financial systems",
      description: "Simulated transfers, immutable postings, compensating reversals, and concurrent debit checks.",
      proof: "8 unit tests and 12 integration tests",
      caseStudyLabel: "Database roles",
    },
  },
  {
    name: "KnowledgeAI",
    href: `${github}/knowledgeai`,
    verification: `${github}/knowledgeai/actions/runs/45620226691`,
    caseStudy: `${github}/knowledgeai/blob/046993307578b52b4dcba5f61f9362d7951e9a82/docs/RETRIEVAL_EVALUATION.md`,
    detail: `${github}/knowledgeai/blob/046993307578b52b4dcba5f61f9362d7951e9a82/docs/adr-001-local-retrieval.md`,
    stack: ["Java 21", "Spring AI", "pgvector"],
    es: {
      scope: "Búsqueda documental",
      description: "Búsqueda privada y respuestas con citas. PostgreSQL aplica un cupo por propietario incluso cuando dos cargas compiten por el último lugar.",
      proof: "12 pruebas de integración con pgvector",
      caseStudyLabel: "Evaluación de recuperación",
    },
    en: {
      scope: "Document retrieval",
      description: "Private document search and cited answers. PostgreSQL enforces per-owner storage limits under concurrent uploads.",
      proof: "12 integration tests with pgvector",
      caseStudyLabel: "Retrieval evaluation",
    },
  },
] as const;
