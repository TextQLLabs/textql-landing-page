In this post you're going to learn: 
- What TextQL is and how it can help you explore your data better
- How it performs better than existing, pure-LLM systems
- Why AI advances alone won't completely solve the problem
- How exactly TextQL works from the inside

## What is TextQL?

TextQL is an enterprise data intelligence platform that transforms natural language questions into precise, actionable insights.

**Imagine This:**
You're a product manager. Your CEO asks, *"Why did customer retention drop last month?"*

**With TextQL:**
You type the question into a chatbox.

### Behind the Scenes:

* TextQL's **Ontology Layer** understands "customer retention" means *active users divided by signups*, pulling data from 5 tables you've never heard of.
* The **Compute Layer** runs a script to clean messy subscription dates, merges datasets from Salesforce and your app's database, and checks permissions.
* The **Dakota Agent** guides the analysis: *"Comparing cohorts? Checking for payment failures?"*

---

**What You Get in 10 Seconds:**

A clear answer:

*"Retention dropped 12%—driven by users who signed up during the holiday promo.*  
**Top Issue:** 40% didn't complete onboarding.  
**Recommendation:** Resend onboarding emails to this group.

<!-- ExecutionGraph -->

No coding. No waiting for the data team. No deciphering dashboards. Maybe you really care about this result? Schedule this analysis and get the result in your inbox every week.

---

### TextQL Works Like This for Everyone:

1. **Ask a question or run on a triggered event** (like a revenue drop)
2. **Get an insight** (with evidence, not jargon).
3. **Dig deeper** (click a chart, ask a follow-up, share with your team, schedule a recurring analysis).

### Why It's Different:

* **No "data prep" hell**. It handles messy tables, multiple data sources broken joins, and stale metrics automatically.
* **No blind trust**. Every insight is backed by a summary of steps: "Compared Q1 vs. Q2, excluded test accounts, applied regional filters." Permissions and role-based access are automatically applied.
* **No dead ends**. If the data's incomplete or your question is unclear, TextQL asks clarifying questions—"Do you mean retention by plan tier or geography?"

---

## Conglomerate Benchmark: Why TextQL Outperforms Competitors

In our Conglomerate-Benchmark—a test simulating a multi-industry enterprise with **109** interconnected tables—TextQL's Ana agent achieved **93%** accuracy on complex queries, outperforming rivals like Amazon Q (**35%**), Databricks Genie (**26%**), and Snowflake Cortex (**0%**).

#### Why competitors falter:
* **AI Notebooks (Hex, Deepnote):** Struggle with multi-step workflows (e.g., joining tables, applying metrics) without manual coding.
* **Semantic Layers (Cube, LookML):** Require pre-curated data models, limiting flexibility.
* **Raw LLM SQL Tools:** Hallucinate joins, mishandle dialects, and fail on schema changes.

TextQL's edge comes from its layered architecture, which ensures provable correctness, consistency, explainability, and security all in one platform.

---

## The Achilles’ Heel of LLM-Written SQL
Today’s AI tools for SQL generation face *three fatal flaws*:
* **Dialect Fragmentation**: LLMs trained on public SQL data often botch proprietary dialects (Snowflake, BigQuery).
* **Schema Brittleness**: A single column rename breaks months of fine-tuning.
* **Complex Logic Gaps**: Window functions, permissions, and multi-system joins require human oversight.

Example: Asking, “Which product categories grew YoY?” might trigger an incorrect join across disjoint systems, returning garbage. TextQL’s Ontology Layer blocks such errors by design.


LLMs like o3 or Gemini **excel at syntax generation** but fail to resolve **contextual semantics** critical to enterprises. 

Fine-tuned LLMs or few-shot context systems fed on historical queries become stale instantly and silently. Retraining requires curating thousands of new labeled examples—a Sisyphean task. Even retrieval-augmented generation (RAG) falters, as vector similarity can't guarantee referential integrity or permission-aware SQL.

<!-- SchemaDynamicsVisual -->

---

## Why Better AI Models Won't Fix This (Alone)

A common counterargument is that these challenges will be solved by more advanced AI models. After all, models like Grok can process real-time data and stay current with world events. However, we believe that even hypothetical superintelligent AI faces fundamental limitations in this domain:

* **Tacit Knowledge Gap**: Business logic and semantic correctness cannot be inferred from schema alone. The "right way" to calculate revenue, choose join paths, and handle deduplication lives in the institutional knowledge of data teams. Even a superintelligent model needs a structured way to capture and apply these domain-specific rules.

* **Explainability Requirements**: Enterprise environments demand reproducible, auditable queries that business users can trust. While an advanced AI might generate technically perfect SQL, non-technical stakeholders still need to verify that the output matches their intent. This fundamental need for transparency and validation remains regardless of model capability.

* **Governance & Control**: Organizations need systematic ways to encode business rules, security policies, and compliance requirements. Ad-hoc generation, even if technically correct, bypasses these critical governance layers.

---

## Why Data Companies Can't Compete

Major data platforms (Snowflake, Databricks) face two structural barriers:

* **System Lock-In**: They're incentivized to keep users within their ecosystems. Building a cross-platform tool would undermine their business models.
* **Legacy Baggage**: Their semantic layers (e.g., Snowflake Cortex) are bolted onto existing architectures, lacking TextQL's native multi-source agnosticism.

TextQL thrives where others won't venture: it treats all data sources—SQL warehouses, REST APIs, even competitors' systems—as equal citizens.

---


## TextQL's Architecture: A Graph-Based, Deterministic Alternative

The best parts of language models are their speed, creativity, and deep general knowledge of what they've seen in their training data, not holding together hundreds of precise rules and details internal a business.

So we built TextQL to take care of that, abstracting away semantic and execution constraints so that language models can focus on what they're best at:


### Layer 1: Ontology Layer: Your Business, Not Your Database

The Ontology Layer is a labeled property graph that codifies:

* **Object Types**: Entities (e.g., Customer, Order) mapped to physical tables/views.

* **Attributes**: Columns with business-aligned names/descriptions (e.g., Order.revenue → "Net Revenue after Returns").

* **Links**: Annotated edges defining valid joins. Each link specifies source/target objects, join keys, and cardinality (one-to-one, one-to-many, many-to-many).

* **Metrics**: Formulaic aggregations on top of objects, including level-of-detail calculations and window functions (e.g., Average Recharge Gap = AVG(lead (recharge_datetime) OVER (PARTITION BY recharge_id ORDER BY recharge_datetime) - recharge_datetime)).

![TextQL Ontology Visualization](/images/ontology/Conglomerate%20Ontology.png)



### What Users Experience

* **Ask in Plain English, Get Answers—Not SQL**
  - Users don't get 200-line SQL queries back or wrestle with data definitions
  - Instead, they ask questions like "What's our highest-margin product this quarter?" or "Which regions are underperforming?"

* **No Schema Expertise Needed**
  - The Ontology Layer maps natural language to business concepts (e.g., "revenue" = sales.amount - returns.refund)
  - Handles concepts that span multiple tables or systems

* **Trust Through Transparency**
  - Every answer is backed by an OQL query (Ontology Query Language)
  - Users can review queries in business terms


### Ontology Query Language (OQL)


* **Resolves Metrics:** Expands NetRevenue to its formulaic definition, resolving attribute references in the base and joined object.
* **Enforces Joins:** Uses the link graph to select the ideal path between Orders and Products, taking into account link semantics (buyer vs. seller), indices, and path length.
* **Injects Permissions:** Applies row-level security (e.g., inheriting RLS roles or auto-adding filters WHERE tenant_id = {user}).
* **Performs Error-correction:** If 'NA' isn't found — apply similarity search to give alternate value suggestions to the agent.

<!-- OQLTransformation -->

---

### Layer 2: Compute – Secure, High-Performance Execution

The Compute Layer forms the computational backbone of TextQL, featuring secure Python sandbox environments that can query across multiple data sources simultaneously and execute analytical code safely. 

### What Users Experience

* **Instant Results, Zero Infrastructure Headaches**
  - Users don't see sandboxes, Apache Arrow, or Python containers—they just get answers
  - Even complex tasks (e.g., merging CRM data with a CSV upload) feel seamless

* **Trust Built-in**
  - Results are consistent and secure:
    - **No data leaks**: Sandboxing isolates sensitive data. All unauthorized network calls are blocked
    - **No "oops" moments**: Compute workers are initialized with the exact credentials and permissioning rules of the human user viewing the insight

* **Handles Scale Effortlessly** 
  - Whether analyzing 100 rows or 100 million, performance feels identical

### Layer 3: Dakota Agent Framework: Your Data Copilot

TextQL’s Agent Layer utilizes the Dakota State Framework—a dynamic state-machine architecture that manages complex analytical workflows. It adapts seamlessly to changing contexts, executing a series of well-defined analytical steps such as query planning, data preparation, analysis, and visualization. 

### What Users Experience

* **Guided Workflows, Not Dead Ends**
  - Dakota's state machine quietly manages complexity
  - Need to clean data? Dakota auto-triggers Cleanup Mode, suggesting transformations (e.g., "Remove duplicates in 'customer_id'?")
  - Stuck? Help Mode asks clarifying questions ("Do you mean FY2023 or calendar 2023?")
  - From question to dashboard: A query like "Show sales trends" becomes a Visualize Mode output—no manual plotting

* **Auditable, Not Opaque**
  - Users see a plain-English summary of steps taken (e.g., "Joined orders + customers, filtered for Q4, applied regional discounts")
  - No complex DAG of code cells to decipher


## Why This Matters

TextQL isn't a thin LLM wrapper—it's a **deterministic system** that:

* **Embeds Domain Knowledge** in a graph structure, sidestepping LLM hallucinations.
* **Guarantees Safe and Performant Execution** via sandboxing and Arrow-based vectorization.
* **Improves Long-term Planning** and enables introspection through state-machine-driven DAGs.

Read the [Full Technical Report](https://textql.com/pdf/ana-whitepaper-3-21.pdf) for OQL’s formal semantics, sandboxing internals, and benchmark methodology.
