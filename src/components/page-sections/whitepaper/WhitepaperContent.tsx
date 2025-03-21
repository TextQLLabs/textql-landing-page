import { Text } from '../../ui';
import { OQLTransformation, SchemaDynamicsVisual } from './visualizations';

export function WhitepaperContent() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6">
      <div className="max-w-[1200px] mx-auto">
        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8">
          Why Text-to-SQL Fails Enterprises—and How TextQL's Three-Layer Architecture Fixes It
        </Text>

        <Text color="secondary" theme="light" className="mb-6">
          Enterprise data teams know the drill: a stakeholder asks, "Why did Q3 margins drop?" and suddenly you're spelunking through 12 databases, 50 dashboards, and a dozen half-baked SQL scripts. Large language models (LLMs) promised to automate this chaos, but Text-to-SQL alone can't scale. We're releasing a comprehensive report on TextQL's technical architecture, and how we try to solve these problems – you can read it here, or keep going for a short explainer:
        </Text>

        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8 mt-16">Moving Beyond SQL</Text>
        <Text color="secondary" theme="light" className="mb-4">
          One would think that to automate data-driven decision making, it'd be best to start with automating SQL. That's the most annoying part, isn't it?
        </Text>
        <Text color="secondary" theme="light" className="mb-4">
          Imagine all the pain you've experienced rewriting the same query dozens of times, just to get that correlated subquery running...
        </Text>
        <Text color="secondary" theme="light" className="mb-4">
          This is where the giants are going, with recent releases such as Snowflake Cortex Agent, Databricks Genie, and Amazon Q Generative SQL. Its legacy is even embedded in our own company name – TextQL.
        </Text>
        <Text color="secondary" theme="light" className="mb-8">
          And yet, our AI agents don't write SQL. What!?
        </Text>

        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8 mt-16">The Fundamental Flaws of Text-to-SQL in Enterprise Contexts</Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">1. Semantic Ambiguity vs. Deterministic Requirements</Text>
        <Text color="secondary" theme="light" className="mb-4">
          LLMs like o3 or Gemini excel at syntax generation but fail to resolve contextual semantics critical to enterprises. Consider:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Term Disambiguation:</strong></span> <span className="text-[#4A665C]">"Revenue" might map to sales.gross_revenue (GAAP) in Snowflake, erp.net_revenue (non-GAAP) in BigQuery, or a derived metric involving window functions.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Join Path Explosion:</strong></span> <span className="text-[#4A665C]">With 10K+ tables, a JOIN between orders and customers could involve 15 valid paths (e.g., order.cust_id vs. customer.legacy_id), each with differing performance and correctness implications.</span></li>
        </ul>
        <Text color="secondary" theme="light" className="mb-8">
          LLMs hallucinate paths or miss hidden constraints (e.g., WHERE tenant_id = {'{current_user}'} for row-level security). Scaling model size or fine-tuning on query logs doesn't solve this—it merely increases the probability of plausible (not correct) SQL.
        </Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">2. Schema Dynamics and Training Data Decay</Text>
        <Text color="secondary" theme="light" className="mb-4">
          Enterprise schemas evolve constantly:
        </Text>
        <SchemaDynamicsVisual />
        <Text color="secondary" theme="light" className="mb-8">
          Fine-tuned LLMs or few-shot context systems fed on historical queries become stale instantly and silently. Retraining requires curating thousands of new labeled examples—a Sisyphean task. Even retrieval-augmented generation (RAG) falters, as vector similarity can't guarantee referential integrity or permission-aware SQL.
        </Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">3. Dialect Fragmentation and Execution Safety</Text>
        <Text color="secondary" theme="light" className="mb-4">
          Enterprises rarely standardize on one SQL dialect. A "simple" DATE_TRUNC call might require:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]">Snowflake: DATE_TRUNC('MONTH', timestamp).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]">BigQuery: DATE_TRUNC(timestamp, MONTH).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]">Redshift: DATE_TRUNC('month', timestamp).</span></li>
        </ul>
        <Text color="secondary" theme="light" className="mb-8">
          Worse, LLMs generate unsafe queries (e.g., Cartesian joins on terabyte-scale tables) or bypass security and permissioning systems.
        </Text>
        <Text color="secondary" theme="light" className="mb-8">
          And increasing model capability only goes so far. A correct query relies on far more than the IQ of the person or model writing it. It needs deep knowledge of definitions, business processes, physical properties of the data, correct join paths, security and permissioning rules, and more. Almost all of it lives only in the heads of business operators. An effective query AI needs to get it right every time, and even if it miraculously writes flawless, 200-line, 5-subquery SQL – how can a non-technical user even know it's right?
        </Text>

        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8 mt-16">TextQL's Architecture: A Graph-Based, Deterministic Alternative</Text>
        <Text color="secondary" theme="light" className="mb-8">
          The best parts of language models are their speed, creativity, and deep general knowledge of what they've seen in their training data, not holding together hundreds of precise rules and details internal a business.
        </Text>
        <Text color="secondary" theme="light" className="mb-8">
          So we built TextQL to take care of that, abstracting away semantic and execution constraints so that language models can focus on what they're best at:
        </Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Layer 1: Ontology Layer – Formalizing Semantics as a Graph</Text>
        <Text color="secondary" theme="light" className="mb-4">
          TextQL introduces an Ontology Layer that provides semantic abstraction between human concepts and complex data assets. This layer defines a structured Ontology Query Language (OQL), abstracting away dialect differences, security considerations, and data complexity. Technical maintainers benefit from deterministic and verifiable SQL query compilation, dramatically reducing the overhead of manual query debugging and maintenance.
        </Text>

        <Text color="secondary" theme="light" className="mb-4">
          The Ontology Layer is a labeled property graph that codifies:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Object Types:</strong></span> <span className="text-[#4A665C]">Entities (e.g., Customer, Order) mapped to physical tables/views.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Attributes:</strong></span> <span className="text-[#4A665C]">Columns with business-aligned names/descriptions (e.g., Order.revenue → "Net Revenue after Returns").</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Links:</strong></span> <span className="text-[#4A665C]">Annotated edges defining valid joins. Each link specifies source/target objects, join keys, and cardinality (one-to-one, one-to-many, many-to-many)</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Metrics:</strong></span> <span className="text-[#4A665C]">Formulaic aggregations on top of objects, including level-of-detail calculations and window functions (e.g., Average Recharge Gap = AVG(lead (recharge_datetime) OVER (PARTITION BY recharge_id ORDER BY recharge_datetime) - recharge_datetime)).</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Ontology Query Language (OQL)</Text>
        <Text color="secondary" theme="light" className="mb-4">
          OQL decouples logical intent from physical execution. A query like:
        </Text>
        <pre className="bg-gray-800 p-4 rounded-md mb-6 text-sm font-mono overflow-x-auto text-white">
          {`METRICS NetRevenue, CAC
DIMENSIONS ProductLine (QUARTER)
FILTER FiscalYear = 2023 AND Region = "NA"`}
        </pre>

        <Text color="secondary" theme="light" className="mb-4">
          Compiles to dialect-specific SQL via a rule-based engine that:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Resolves Metrics:</strong></span> <span className="text-[#4A665C]">Expands NetRevenue to its formulaic definition, resolving attribute references in the base and joined object.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Enforces Joins:</strong></span> <span className="text-[#4A665C]">Uses the link graph to select the ideal path between Orders and Products, taking into account link semantics (buyer vs. seller), indices, and path length.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Injects Permissions:</strong></span> <span className="text-[#4A665C]">Applies row-level security (e.g., inheriting RLS roles or auto-adding filters WHERE tenant_id = {'{user}'}).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Performs Error-correction:</strong></span> <span className="text-[#4A665C]">If 'NA' isn't found — apply similarity search to give alternate value suggestions to the agent.</span></li>
        </ul>
        
        <OQLTransformation />
        
        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Layer 2: Compute Layer – Secure, High-Performance Execution</Text>
        <Text color="secondary" theme="light" className="mb-4">
          The Compute Layer forms the computational backbone of TextQL, featuring secure Python sandbox environments that execute analytical code safely. This layer employs a "Textables" abstraction, powered by Apache Arrow, enabling high-performance handling of large-scale tabular data from heterogeneous sources. Engineers can leverage this capability for efficient analytics and sophisticated data transformations at scale.
        </Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Sandbox Environment</Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Isolation:</strong></span> <span className="text-[#4A665C]">Each analytical task (Python, SQL, etc.) runs in a containerized sandbox with strict CPU/memory limits.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>LRU Caching:</strong></span> <span className="text-[#4A665C]">Pre-initialized sandboxes reduce cold-start latency from 8s → 1s. Inactive sandboxes are automatically cleared and reallocated for new runs on-demand.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Data Safety:</strong></span> <span className="text-[#4A665C]">All sandboxes run in network isolated environments, and are provided warehouse credentials corresponding to the end user's mapped database / warehouse roles.</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Textables (Apache Arrow)</Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Columnar Batches:</strong></span> <span className="text-[#4A665C]">Data is kept in Arrow format across the stack—SQL execution (Go), Python UDFs (Pandas), and visualization (Streamlit).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>High Performance Cross-System Transfer:</strong></span> <span className="text-[#4A665C]">Go's cgo binds to Arrow C Data Interface, eliminating a layer of serialization overhead. A 10GB DataFrame moves from Go → Python in 300ms (vs. 8s with pickle).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Universality:</strong></span> <span className="text-[#4A665C]">convert any user context or ontology asset into Textable format - CSVs, storage blobs, DuckDB files, warehouse queries, API results, and more.</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Layer 3: Agent Layer – State Machines for Guaranteed Workflows</Text>
        <Text color="secondary" theme="light" className="mb-4">
          TextQL's Agent Layer utilizes the Dakota State Framework—a dynamic state-machine architecture that manages complex analytical workflows. It adapts seamlessly to changing contexts, executing a series of well-defined analytical steps such as query planning, data preparation, analysis, and visualization. This structured approach, visualized through an explicit Execution Graph, ensures transparency, reproducibility, and ease of debugging.
        </Text>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Dakota State Framework</Text>
        <Text color="secondary" theme="light" className="mb-4">
          Ana, TextQL's agent, operates as a state machine with 10+ modes (e.g., Query, Cleanup, Visualize). Transitions are governed by rules:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Tool Use Scaling:</strong></span> <span className="text-[#4A665C]">Prompt guidance per mode / tool is only fed in fully when Ana is in the corresponding mode, allowing for scaling to 20+ tools with minimal confusion or hallucination.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Automatic Recovery:</strong></span> <span className="text-[#4A665C]">Use deterministic rules to control state transitions when unexpected outputs come back. During Analyze, if data quality scores &lt; threshold → transition to Cleanup. During Query, if a requested value is not found, return to Search or ping the user in Help</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Context Stacking:</strong></span> <span className="text-[#4A665C]">As opposed to multi-agent frameworks, states retain compressed knowledge of retrieval and execution context generated by previous states, allowing for re-use of queries, functions, and discovered methodology.</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-2xl mb-4 mt-8">Execution Graph (DAG)</Text>
        <Text color="secondary" theme="light" className="mb-4">
          Analytical workflows are represented as a DAG of cells:
        </Text>
        <pre className="bg-gray-800 p-4 rounded-md mb-6 text-sm font-mono overflow-x-auto text-white">
          {`PythonCell (Clean Data)
  → MetricExplorer (Apply CAC Formula)
  → JoinCell (Merge CRM + ERP via OQL)
  → StreamlitCell (Render Dashboard)`}
        </pre>

        <Text color="secondary" theme="light" className="mb-4">
          Each cell is:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Reproducible:</strong></span> <span className="text-[#4A665C]">Execution graphs can be replayed, including point-in-time query results and fed LLM context.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Convertible:</strong></span> <span className="text-[#4A665C]">Ana runs can be trivially converted to Streamlit apps or Jupyter notebooks.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Inspectable:</strong></span> <span className="text-[#4A665C]">Engineers can profile runtime, resource usage.</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8 mt-16">Benchmark Validation: Conglomerate-Benchmark-V1-Lite</Text>
        <Text color="secondary" theme="light" className="mb-4">
          TextQL-ANA-Enterprise scored 94% accuracy on 18 complex queries across 109 tables, outperforming:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Amazon Q (62%):</strong></span> <span className="text-[#4A665C]">Failed on multi-dialect joins (Snowflake + Redshift).</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Databricks Genie (71%):</strong></span> <span className="text-[#4A665C]">No native metric consistency checks.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]"><strong>Snowflake Cortex (48%):</strong></span> <span className="text-[#4A665C]">Timeout on 5-table recursive joins.</span></li>
        </ul>
        <Text color="secondary" theme="light" className="mb-4">
          Crucially, TextQL succeeded by:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]">Leveraging the Ontology to ensure correct formulas, join paths, and value resolution (i.e. resolve "North America" to region_code IN ('US', 'CA')) across 4 disparate schemas.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]">Ensuring multi-step coherence over complex questions using the Dakota state framework.</span></li>
        </ul>

        <Text variant="header" theme="light" className="text-3xl md:text-4xl mb-8 mt-16">Why This Matters</Text>
        <Text color="secondary" theme="light" className="mb-4">
          TextQL isn't a thin LLM wrapper—it's a deterministic system that:
        </Text>
        <ul className="list-disc pl-8 mb-6">
          <li className="mb-2"><span className="text-[#2A3B35]">Embeds Domain Knowledge in a graph structure, sidestepping LLM hallucinations.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]">Guarantees Safe and Performant Execution via sandboxing and Arrow-based vectorization.</span></li>
          <li className="mb-2"><span className="text-[#2A3B35]">Improves long-term planning and enables introspection through state-machine-driven DAGs.</span></li>
        </ul>
        <Text color="secondary" theme="light" className="mb-8">
          For enterprises, this means replacing probabilistic Text-to-SQL with a rules-based, auditable framework. For engineers, it's a blueprint for bridging semantic gaps in NLP-driven analytics.
        </Text>
      </div>
    </div>
  );
} 