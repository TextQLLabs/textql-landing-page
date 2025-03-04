# Haskell in Production: TextQL's Ontology Service

The TextQL platform is split into three core services:

1. The frontend and web backend packaged together as a Sveltekit Typescript app, containing all user facing interaction through both the web app and API, all direct app database access and communication with other services.
2. The sandbox manager, which controls the high-memory compute instances attached to each user session. All direct queries to the user data warehouse are run here to preserve the memory of the other services. This is written in Go and Python.
3. The Ontology service, which is what this article is about.

The ontology is a knowledge graph describing all of a TextQL customer's key business concepts and how they map onto the user's data warehouse. Think of it as a mix of an ERD diagram and a semantic layer UI where the data team can map business concepts onto the ontology's core set of data types: Nouns, links, measures, dimensions, and metrics.

![A sample ontology](/images/blog/haskell-in-production/sample.png)

Building out this Data Warehouse ontology is the core of the TextQL platform; it's how we're able to construct consistent, accurate queries from natural language, and when things go wrong fail in a confusion-free way for non-technical business analysts:

"We couldn't find a definition for revenue, so we're going with the sum of order values."

"We couldn't break down retention by industry, because there's no link path from user to industry. Click here to file a ticket to the data team."

All of this is powered by TextQL's Ontology service, written in Haskell. Its duties include:

- Defining the core ontology data types, including the base metadata and how they map onto whatever backing system the customer is using (SQL data warehouse, semantic layer, BI tool, etc.).
- A DSL for writing queries on top of the ontology along with compiler from the DSL into the customer's backing system; either the SQL dialect of the data warehouse or whatever query DSL that the underlying data interface provides.
- The LLM and embeddings-powered system for traversing the ontology and constructing the DSL query. Using a DSL instead of raw SQL allows us to leave a trail of evidence of what parts of the user question mapped to what parts of the ontology and what parts it couldn't find.
- Synthetic example generation (not LLM powered, more like random trees) to make LLM-powered parts of the ontology query algorithm function more smoothly.
- A Scotty app that provides access to all the above functionality. These are manipulable by the web service and frontend in a strongly-typed fashion through an automatically generated Typescript API (using aeson-typescript).

This is an intricate service where we need correctness and reliability without being able to afford a huge amount of testers and QA, while also needing to iterate fast to keep up with customer needs; in filling our need to "move fast with a stable foundation", Haskell has been an excellent choice:

## Strong Types

A strong, flexible type system that can model the valid set of operations, and exclude the invalid ones at compile time is the most oft-touted benefit of Haskell, and it's no different for us. In the ontology service, it's impossible to confuse a ColumnName for an AttributeRef for an ObjectRef, because they're different types, despite all of them having Text as their underlying representation.

![Strong type system example](/images/blog/haskell-in-production/strong-types.png)

We're also big fans of Copilot and ChatGPT for of programming, and believe that it gets even better with Haskell despite there being probably less of it in the training set than i.e. Python. All the safety features of Haskell become even more important when reviewing AI-generated completions: Just as I can be more sure of my own type-checked code, I can also be more aggressive accepting AI completions, knowing that the type checker will catch any obvious errors. And when an error does get raised, the type mismatch is a great starting point for fixing up something that's mostly right.

And because of our Typescript auto-generation, much of this safety rolls over to the frontend and web service! While the level of validity guarantees is much lower, having fully unified type definitions on the frontend means that we can build out features on the other side of the service boundary with full confidence.

## ADTs

In the ontology service, everything is trees of sum types and performing every possible operation you can think of on those trees: parsing the ontology tree from the flat database format (construction), flattening the tree so it can be put back into the database (destruction), resolving name references into their backing objects, expanding attribute trees to simulate traversing a join, emitting SQL from ontology query trees (traversal), generating random trees to serve as test data, etc.

![ADTs in action](/images/blog/haskell-in-production/adts.png)

This is the kind of operation that Haskell is best at! Algebraic data types allow us to model the complex structure of the ontology service in a concise and expressive way without sacrificing correctness. Deriving instances (on the construction side) and pattern matching (on the destruction side), in addition to being incredibly ergonomic, catches any missing case at compile time.

## Recruiting

This is separate from the language itself, but Haskell has helped us take on a team of smart, motivated individuals who care about the tools they use; our first three backend hires are all from the Haskell community. As a relatively unknown, risky, early stage startup, we need any hiring edge we can get, however idiosyncratic. Even if the chance to work with their favorite tool isn't what gets them to accept the offer, it gets candidates through the door and gives them a signal about our engineering culture.

The one caveat is that it's important to filter for customer obsession and a love for shipping: the one weakness that us Haskell engineers can have is a bias for finding the most elegant abstraction over shipping the best product.

## Conclusion / TL;DR

Haskell's strong type system and algebraic data types have proven invaluable in building and maintaining the complex ontology service of the TextQL platform. The ability to model operations with trees of sum types ensures correctness and allows for concise and expressive code. Additionally, Haskell has provided a hiring advantage, attracting smart and motivated individuals from the community who value the tools they work with. It's important to balance elegance with shipping the best product, and Haskell has been a stable and reliable foundation for achieving that.