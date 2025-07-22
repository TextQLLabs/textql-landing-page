# Why We Use an Ontology for Text to SQL

## Table of Contents
- [The Problem: Data is Complex](#the-problem-data-is-complex)
- [The Solution: An Ontology Architecture](#the-solution-an-ontology-architecture)
- [What Inspired Us](#what-inspired-us)

We spent our first 12 months learning the hard way that LLM generated text-to-SQL doesn't work.

Today, we still talk to dozens of Fortune 500 companies who are attempting this and are burning millions of dollars fine tuning and building custom models. So I wanted to take a minute to share why we no longer use this approach and the better approach to solve for it.

## The Problem: Data is Complex

No matter how much table and column metadata we fed in – schemas, documentation from dbt, Alation, and more – it wasn't enough. LLMs would still generate unreliable SQL queries because they lacked the right context. Without structure, these models had too much freedom, like giving a self-driving car no road to follow.

So, we went back to the drawing board.

## The Solution: An Ontology Architecture

What we ended up building was an ontology architecture. You can think of it as a map that defines the key objects in your business – tables, actions, metrics, and dashboards – and how they relate to one another. This map gives the LLM much-needed guidance. When a query request comes in, the ontology acts like tracks for the model to follow, ensuring the output is accurate and relevant. Without it, the LLM is prone to going off the rails.

It's a bit like autonomous driving: Waymo spent years and billions solving self-driving cars. But what if you gave those cars better tracks to follow? That's exactly what an ontology does for LLMs generating SQL.

Now we're seeing how LLMs, when properly guided by an ontology, can reliably generate SQL and solve real-world challenges.

![RAG vs Ontology Comparison](/images/blog/why-ontology/ragvsontology.jpeg)

This table highlights the key differences between traditional methods and an ontology-driven approach for AI-powered data solutions:

| Approach | Description | Key Characteristics |
|----------|-------------|-------------------|
| Catalog, RAG & Fine-tuning | Table & column schemas with additional documentation | • Verification of the output SQL requires manual intervention<br>• No reliable performance increase with more docs or re-training ($$)<br>• Schema changes require full-model re-trainings<br>• You cannot tell why an LLM hallucinated a specific line of code<br>• Can never guarantee it won't make up a formula for a metric |
| Ontology | A structured representation of concepts and their relationships | • Queries are visually presented in a natural language DSL<br>• Each improvement predictably expands the question space<br>• Schema changes require deterministic configuration changes<br>• Every line of code generated with transparent logic<br>• Always uses defined specific formulas for key business metrics |

## What Inspired Us

When we realized we needed an ontology, we borrowed the best ideas from existing systems:

• Palantir Technologies: Their intuitive UI lets users visualize entities on a canvas.

• Tobiko's SQLGlot: A powerful tool for translating SQL across different syntaxes.

• Looker's LookML: A pioneer in metric and dimension modeling.

• Tableau's LOD Expressions: Brilliant at managing complex joins and fan-out paths.

![TextQL Ontology Architecture](/images/blog/why-ontology/comparison.png)

The data space is full of great concepts, but architects often over-focus on individual improvements and miss the bigger picture. A truly effective ontology captures everything – every asset, table, metric, and dashboard – combining the best ideas from across platforms.