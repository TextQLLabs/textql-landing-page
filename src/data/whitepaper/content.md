# The Definitive Architecture for Novel Insights Discovery

## What is TextQL?

TextQL is an enterprise data intelligence platform that transforms natural language questions into precise, actionable insights.

## Imagine This:

You're a product manager. Your CEO asks, *"Why did customer retention drop last month?"*

## With TextQL:

You type the question into a chatbox.

## Behind the Scenes:

* TextQL's **Ontology Layer** understands "customer retention" means *active users divided by signups*, pulling data from 5 tables you've never heard of.
* The **Compute Layer** runs a script to clean messy subscription dates, merges datasets from Salesforce and your app's database, and checks permissions.
* The **Dakota Agent** guides the analysis: *"Comparing cohorts? Checking for payment failures?"*

---

## What You Get in 10 Seconds:

A clear answer:

*"Retention dropped 12%—driven by users who signed up during the holiday promo.*  
**Top Issue:** 40% didn't complete onboarding.  
**Recommendation:** Resend onboarding emails to this group."

No coding. No waiting for the data team. No deciphering dashboards. Maybe you really care about this result? Schedule this analysis and get the result in your inbox every week.

---

## TextQL Works Like This for Everyone:

1. Ask a question or run on a triggered event (like a revenue drop)
2. Get an insight (with evidence, not jargon).
3. Dig deeper (click a chart, ask a follow-up, share with your team, schedule a recurring analysis).

## Why It's Different:

* No "data prep" hell. It handles messy tables, multiple data sources broken joins, and stale metrics automatically.
* No blind trust. Every insight is backed by a summary of steps: "Compared Q1 vs. Q2, excluded test accounts, applied regional filters." Permissions and role-based access are automatically applied.
* No dead ends. If the data's incomplete or your question is unclear, TextQL asks clarifying questions—"Do you mean retention by plan tier or geography?"

---

## Moving Beyond SQL

One would think that to automate data-driven decision making, it'd be best to start with automating SQL. That's the most annoying part, isn't it?

Imagine all the pain you've experienced rewriting the same query dozens of times, just to get that correlated subquery running...

This is where the giants are going, with recent releases such as Snowflake Cortex Agent, Databricks Genie, and Amazon Q Generative SQL. Its legacy is even embedded in our own company name – TextQL.

And yet, our AI agents don't write SQL. What!?

## The Fundamental Flaws of Text-to-SQL in Enterprise Contexts

### 1. Semantic Ambiguity vs. Deterministic Requirements

LLMs like o3 or Gemini excel at syntax generation but fail to resolve contextual semantics critical to enterprises. Consider:

* **Term Disambiguation:** "Revenue" might map to sales.gross_revenue (GAAP) in Snowflake, erp.net_revenue (non-GAAP) in BigQuery, or a derived metric involving window functions.
* **Join Path Explosion:** With 10K+ tables, a JOIN between orders and customers could involve 15 valid paths (e.g., order.cust_id vs. customer.legacy_id), each with differing performance and correctness implications.

LLMs hallucinate paths or miss hidden constraints (e.g., WHERE tenant_id = {current_user} for row-level security). Scaling model size or fine-tuning on query logs doesn't solve this—it merely increases the probability of plausible (not correct) SQL.

### 2. Schema Dynamics and Training Data Decay

Enterprise schemas evolve constantly:

<!-- SchemaDynamicsVisual -->

Fine-tuned LLMs or few-shot context systems fed on historical queries become stale instantly and silently. Retraining requires curating thousands of new labeled examples—a Sisyphean task. Even retrieval-augmented generation (RAG) falters, as vector similarity can't guarantee referential integrity or permission-aware SQL.

### 3. Dialect Fragmentation and Execution Safety

Enterprises rarely standardize on one SQL dialect. A "simple" DATE_TRUNC call might require:

* Snowflake: DATE_TRUNC('MONTH', timestamp).
* BigQuery: DATE_TRUNC(timestamp, MONTH).
* Redshift: DATE_TRUNC('month', timestamp).

Worse, LLMs generate unsafe queries (e.g., Cartesian joins on terabyte-scale tables) or bypass security and permissioning systems.

And increasing model capability only goes so far. A correct query relies on far more than the IQ of the person or model writing it. It needs deep knowledge of definitions, business processes, physical properties of the data, correct join paths, security and permissioning rules, and more. Almost all of it lives only in the heads of business operators. An effective query AI needs to get it right every time, and even if it miraculously writes flawless, 200-line, 5-subquery SQL – how can a non-technical user even know it's right?

## TextQL's Architecture: A Graph-Based, Deterministic Alternative

The best parts of language models are their speed, creativity, and deep general knowledge of what they've seen in their training data, not holding together hundreds of precise rules and details internal a business.

So we built TextQL to take care of that, abstracting away semantic and execution constraints so that language models can focus on what they're best at:

### Layer 1: Ontology Layer – Formalizing Semantics as a Graph

TextQL introduces an Ontology Layer that provides semantic abstraction between human concepts and complex data assets. This layer defines a structured Ontology Query Language (OQL), abstracting away dialect differences, security considerations, and data complexity. Technical maintainers benefit from deterministic and verifiable SQL query compilation, dramatically reducing the overhead of manual query debugging and maintenance.

The Ontology Layer is a labeled property graph that codifies:

* **Object Types:** Entities (e.g., Customer, Order) mapped to physical tables/views.
* **Attributes:** Columns with business-aligned names/descriptions (e.g., Order.revenue → "Net Revenue after Returns").
* **Links:** Annotated edges defining valid joins. Each link specifies source/target objects, join keys, and cardinality (one-to-one, one-to-many, many-to-many)
* **Metrics:** Formulaic aggregations on top of objects, including level-of-detail calculations and window functions (e.g., Average Recharge Gap = AVG(lead (recharge_datetime) OVER (PARTITION BY recharge_id ORDER BY recharge_datetime) - recharge_datetime)).

![TextQL Ontology Visualization](/images/ontology/Conglomerate%20Ontology.png)

### Ontology Query Language (OQL)

OQL decouples logical intent from physical execution. A query like:

```
METRICS NetRevenue, CAC
DIMENSIONS ProductLine (QUARTER)
FILTER FiscalYear = 2023 AND Region = "NA"
```

Compiles to dialect-specific SQL via a rule-based engine that:

* **Resolves Metrics:** Expands NetRevenue to its formulaic definition, resolving attribute references in the base and joined object.
* **Enforces Joins:** Uses the link graph to select the ideal path between Orders and Products, taking into account link semantics (buyer vs. seller), indices, and path length.
* **Injects Permissions:** Applies row-level security (e.g., inheriting RLS roles or auto-adding filters WHERE tenant_id = {user}).
* **Performs Error-correction:** If 'NA' isn't found — apply similarity search to give alternate value suggestions to the agent.

<!-- OQLTransformation -->

### Layer 2: Compute Layer – Secure, High-Performance Execution

The Compute Layer forms the computational backbone of TextQL, featuring secure Python sandbox environments that execute analytical code safely. This layer employs a "Textables" abstraction, powered by Apache Arrow, enabling high-performance handling of large-scale tabular data from heterogeneous sources. Engineers can leverage this capability for efficient analytics and sophisticated data transformations at scale.

### Sandbox Environment

* **Isolation:** Each analytical task (Python, SQL, etc.) runs in a containerized sandbox with strict CPU/memory limits.
* **LRU Caching:** Pre-initialized sandboxes reduce cold-start latency from 8s → 1s. Inactive sandboxes are automatically cleared and reallocated for new runs on-demand.
* **Data Safety:** All sandboxes run in network isolated environments, and are provided warehouse credentials corresponding to the end user's mapped database / warehouse roles.

### Textables (Apache Arrow)

* **Columnar Batches:** Data is kept in Arrow format across the stack—SQL execution (Go), Python UDFs (Pandas), and visualization (Streamlit).
* **High Performance Cross-System Transfer:** Go's cgo binds to Arrow C Data Interface, eliminating a layer of serialization overhead. A 10GB DataFrame moves from Go → Python in 300ms (vs. 8s with pickle).
* **Universality:** convert any user context or ontology asset into Textable format - CSVs, storage blobs, DuckDB files, warehouse queries, API results, and more.

### Layer 3: Agent Layer – State Machines for Guaranteed Workflows

TextQL's Agent Layer utilizes the Dakota State Framework—a dynamic state-machine architecture that manages complex analytical workflows. It adapts seamlessly to changing contexts, executing a series of well-defined analytical steps such as query planning, data preparation, analysis, and visualization. This structured approach, visualized through an explicit Execution Graph, ensures transparency, reproducibility, and ease of debugging.

### Dakota State Framework

Ana, TextQL's agent, operates as a state machine with 10+ modes (e.g., Query, Cleanup, Visualize). Transitions are governed by rules:

* **Tool Use Scaling:** Prompt guidance per mode / tool is only fed in fully when Ana is in the corresponding mode, allowing for scaling to 20+ tools with minimal confusion or hallucination.
* **Automatic Recovery:** Use deterministic rules to control state transitions when unexpected outputs come back. During Analyze, if data quality scores < threshold → transition to Cleanup. During Query, if a requested value is not found, return to Search or ping the user in Help
* **Context Stacking:** As opposed to multi-agent frameworks, states retain compressed knowledge of retrieval and execution context generated by previous states, allowing for re-use of queries, functions, and discovered methodology.

### Execution Graph (DAG)

Analytical workflows are represented as a DAG of cells:

<!-- ExecutionGraph -->

Each cell is:

* **Reproducible:** Execution graphs can be replayed, including point-in-time query results and fed LLM context.
* **Convertible:** Ana runs can be trivially converted to Streamlit apps or Jupyter notebooks.
* **Inspectable:** Engineers can profile runtime, resource usage.

## Benchmark Validation: Conglomerate-Benchmark-V1-Lite

TextQL-ANA-Enterprise scored 94% accuracy on 18 complex queries across 109 tables, outperforming:

* **Amazon Q (62%):** Failed on multi-dialect joins (Snowflake + Redshift).
* **Databricks Genie (71%):** No native metric consistency checks.
* **Snowflake Cortex (48%):** Timeout on 5-table recursive joins.

Crucially, TextQL succeeded by:

* Leveraging the Ontology to ensure correct formulas, join paths, and value resolution (i.e. resolve "North America" to region_code IN ('US', 'CA')) across 4 disparate schemas.
* Ensuring multi-step coherence over complex questions using the Dakota state framework.

## Why This Matters

TextQL isn't a thin LLM wrapper—it's a deterministic system that:

* Embeds Domain Knowledge in a graph structure, sidestepping LLM hallucinations.
* Guarantees Safe and Performant Execution via sandboxing and Arrow-based vectorization.
* Improves long-term planning and enables introspection through state-machine-driven DAGs.

For enterprises, this means replacing probabilistic Text-to-SQL with a rules-based, auditable framework. For engineers, it's a blueprint for bridging semantic gaps in NLP-driven analytics. 