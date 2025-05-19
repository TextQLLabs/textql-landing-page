# Embedding Models and When to Use Them

There's a severely underrated capability that embedding models offer in supporting reasoning — one that almost everyone seems to overlook. In today's AI landscape, LLMs (large language models) dominate the conversation, but many are overusing them and chaining them in ways that increase both the probability of failure and the overall cost, while also slowing down response times.

LLMs operate by reading text, converting it into numerical representations, and then translating those numbers back into text. This works well for generating human-readable outputs like code, natural language responses, or search results. However, for many intermediate reasoning steps, you don't need a natural language response at all — and that's where embedding models shine.

## Embedding Models: The Smart Alternative for Decision Logic

As an industry, we are overusing LLMs to carry out every step, even though certain intermediate steps don't require human-readable output. This not only wastes compute resources but also introduces unnecessary complexity. That's why we leverage embedding models for around 50% of our decision-making steps.

Here's why embedding models outperform LLMs in specific contexts:

- **Deterministic Output**: Unlike LLMs, which can produce variable or non-reproducible results, embedding models provide consistent outcomes. This is invaluable for logical operations where precision matters.
- **Speed**: Embedding calls are fast, minimizing latency in workflows.
- **Context-Efficient**: They don't consume valuable space in the context window, allowing LLMs to focus on tasks that truly require language generation.
- **Logical Gates and Reasoning**: Embedding models can act as logic gates. For example, an embedding model processing "negation" can flip "causes for a metric going up" into "causes for a metric going down" without needing to generate natural language output.

The table below highlights key differences between LLMs and embedding models, reinforcing their respective strengths and use cases.

| Aspect | LLMs | Embedding Models |
|--------|------|-----------------|
| Use Case | Write essays | Solve multiple choice questions |
| Error Handling | Hallucinations propagate when LLMs are chained together | Errors are deterministic, but less interpretable |
| Performance | Large and slow | Simple, lightweight, fast |
| Cost | Expensive ($0.075 – $2.5 / 1M input tokens) | 10–250x cheaper ($0.01 / 1M input tokens) |
| Local Deployment | Local models bring performance drop for agentic behavior with complex deployment | Local models well-suited for agentic behaviors with easy deployment |
| Customization | Tailored with prompt engineering, or fine-tuning for deeper applications | Tailored with prompt engineering, and thresholding embedding distance |

## The Future of AI: Smarter Chaining with Embeddings

By integrating embedding models at critical decision points, we reduce reliance on expensive LLM calls, control costs, and create more reliable systems. This hybrid approach of embedding-driven reasoning combined with selective use of LLMs ensures faster performance, greater accuracy, and lower failure rates.

![LLMs vs Embedding Models](/images/blog/embedding-models/embeddings.jpeg)

If you're exploring nontraditional uses of language models, especially in ways that involve embeddings to enhance AI workflows, we'd love to connect. There's a lot of untapped potential in using these tools creatively and with critical thinking, and would love to hear how others are pushing the boundaries in this AI space.