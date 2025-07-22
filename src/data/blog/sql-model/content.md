# What If The Model Isn't Good Enough?

## Table of Contents
- [SQL-to-Text on Query History](#sql-to-text-on-query-history)
- [100 Domain-Specific Pre-Trained Queries](#100-domain-specific-pre-trained-queries)
- [Power Laws](#power-laws)
- [Semantic Layers & DBT](#semantic-layers--dbt)
- [Data Dictionary Generation and Alation | Collibra](#data-dictionary-generation-and-alation--collibra)
- [Fine Tuning on APIs](#fine-tuning-on-apis)
- [Regex Error Catching](#regex-error-catching)
- [Unspecified Way of Adding More Context](#unspecified-way-of-adding-more-context)
- [If Nothing Else Works?](#if-nothing-else-works)
- [And if That Still Doesn't Work?](#and-if-that-still-doesnt-work)
- [You're Just Going to Say This Recursively Huh?](#youre-just-going-to-say-this-recursively-huh)

TL;DR: Give more context, let AI get better, repeat until it's good enough or money and willpower runs out.

So you've heard the pitch; "We're going to generate SQL for you using the schema in your warehouse/DB," and you think to yourself... How are we going to infer what prod_stripe_reports_<productname3>_q4_demo_final in the warehouse means or what sandbox_id ends up joining against? How are we going to get the context to begin to understand this without spending so much time crawling and onboarding that we're basically doing manual labor for every incremental customer. Good question…

## SQL-to-Text on Query History

All the banked queries that were previously run at the company, stored in Redshift, Snowflake, or Tableau, can be run through SQL-to-Text to understand what they did, what tables they referenced, who it was useful for, and manually checked off by the people who wrote it. Then, it is added as further context to the model.

## 100 Domain-Specific Pre-Trained Queries

CS, Marketing, and related teams often ask the same style of questions. Starting with a question bank of 100 questions per domain, we can poll our users on which ones they want to address first, providing them inspiration for what they can ask. From there, we can work with our model to create supervised SQL queries that we can fine-tune with validation.

## Power Laws

Calls to any warehouse table or database follow a power law distribution, where 80% of the calls are made to 20% of the tables. Going to the data team and documenting which 20% of the tables are called the most and identifying their sources is feasible.

## Semantic Layers & DBT

Provided by companies like dbt, this layer joins tables that are frequently used together, creating an overlay on top of Snowflake to simplify querying. This approach offers additional context to our model, enhancing its understanding and efficiency.

## Data Dictionary Generation and Alation | Collibra

The prior history of queries run and existing documentation enable us to automate data dictionary generation when onboarding a customer. We can manually refine the dictionary and continually scan their existing knowledge base to provide more context over time. A well-organized data dictionary from the customer significantly enhances our ability to leverage it for improved query quality.

## Fine Tuning on APIs

Every company has a segment of SFDC data in their warehouse, and many have Stripe data. These are usually stored in reliable formats, thanks to connectors like Fivetran, which send them with set labels and a few customizable columns. Publicly available documentation on these labels and their meanings allows us to fine-tune our model accordingly.

## Regex Error Catching

Yes, it's a basic approach, but effective. If the SQL produced calls on tables or columns that don't exist in the schema, we can quickly flag it and automatically re-run the query. This method helps ensure the accuracy of our SQL outputs.

## Unspecified Way of Adding More Context

We are in the process of developing a new method to add further context to our model, which will be detailed next week. This upcoming approach aims to enhance the model's understanding and accuracy, improving how it interacts with varying schemas and queries. Stay tuned for a comprehensive description of how we plan to execute this new context-adding strategy.

## If Nothing Else Works?

We iterate and improve the experience while continuing to do things that don't scale until GPT-4 comes in in a couple of months, which hopefully gets us there….

## And if That Still Doesn't Work?

We iterate and hire forward deployed engineers to spend more time onboarding customers and generating code documentation of their data (via GenAI), and then feed that documentation back into our model… for another 3 years… until GPT-5 comes out…. which hopefully gets us there.

## You're Just Going to Say This Recursively Huh?

Yes. We're technologists; we are investing our time and capital and lives into technology. What does it say about our faith in AI if we don't believe that we can get it to a state where it can understand and write SQL better than a human can…. when we've already seen it paint art?

There are 100s of levers we can pull to improve the fidelity of a model or allow a human to better tune and validate its outputs. We're going to keep pulling new ones until we solve this problem, we run out of cash, or we hit the heat death of the universe.