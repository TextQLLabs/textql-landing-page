# Our Ontology-Based Text to SQL Generation Process

## Table of Contents
- [Process Summary](#process-summary)
  - [1. Create a Company-Specific Ontology](#1-create-a-company-specific-ontology)
  - [2. Identify Relevant Attributes with NLP](#2-identify-relevant-attributes-with-nlp)
  - [3. Map Attributes to Ontology](#3-map-attributes-to-ontology)
  - [4. Compile SQL Based on Pre-Defined Actions](#4-compile-sql-based-on-pre-defined-actions)
- [Conclusion](#conclusion)

At TextQL, we've taken a unique approach to generating SQL queries, relying on ontology-based methods instead of LLMs.

This post will walk you through the four steps we use to transform natural language questions into SQL queries using an ontology that maps business concepts to database structures—like organizing a library to make finding books easier.

![TextQL Ontology Overview](/images/blog/sql-process/ontology101.jpeg)

## Process Summary

### 1. Create a Company-Specific Ontology

**Analogy:**

Setting up a library using the Dewey Decimal System helps organize books into categories, so finding the right one becomes easier.

**In Practice:**

We create a business ontology that maps out key business objects (e.g., customers, orders, products) and defines their relationships. For example, it records that customers place orders, and each order contains products. This structured map provides the backbone for our SQL generation.

### 2. Identify Relevant Attributes with NLP

**Analogy:**

When searching for a specific book, you input the title, subject, or author into the library system, which returns the corresponding Dewey Decimal value to help you locate it.

**In Practice:**

Natural Language Processing (NLP) identifies key elements from the user's query. For instance, if someone asks, "What were the top 5 products by sales last month?", NLP extracts the core components: "product," "sales," and "last month." This ensures the system understands exactly what data the user wants.

### 3. Map Attributes to Ontology

**Analogy:**

With the Dewey Decimal code in hand, you navigate the library sections to find the exact book you need.

**In Practice:**

We match the identified attributes (like "product") with the corresponding database fields (e.g., product_name). This is done through an embedding space that performs semantic and lexical matches. Pre-defined join paths in the ontology help the system link fields such as product_id across multiple tables.

### 4. Compile SQL Based on Pre-Defined Actions

**Analogy:**

Imagine telling the librarian, "Find books on this subject, order them by publication date, and show me only the top 5." The librarian follows these steps to provide a precise list.

**In Practice:**

Using a domain-specific language (DSL), the system translates user requirements into SQL. It defines metrics (like sales), dimensions (like products), filters (like last month), ordering rules (e.g., rank by sales), and limits (e.g., top 5). The end result is a SQL query ready to run:

```sql
SELECT p.product_name, SUM(s.sale_amount) AS total_sales
FROM Sales s
JOIN Products p ON s.product_id = p.product_id
WHERE s.sale_date BETWEEN '2023-09-01' AND '2023-09-30'
GROUP BY p.product_name
ORDER BY total_sales DESC
LIMIT 5;
```

## Conclusion

Our approach offers several advantages over LLM-based methods. By leveraging an ontology, we provide consistent, predictable, and interpretable SQL generation without the unpredictability of AI-driven models. Think of it like a highly organized library—you always know where to find what you need.