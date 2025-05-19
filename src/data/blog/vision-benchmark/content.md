# Benchmarking AI Vision with Puzzles

Vision models are a core component in our agent flow. Ana uses vision to inspect every figure she generates, and to learn business context from user datasets and dashboards.

As part of a wider assessment of AI vision, we recently benchmarked 5 multimodal AI models from OpenAI, Google and Anthropic on their ability to solve puzzles provided as image files. The benchmark was constructed from twitter posts, using 10 accounts that post daily puzzles. The puzzles mainly feature:

- simple algebra and linear algebra questions,
- matchstick puzzles,
- trigonometry and geometry questions,
- spot-the-pattern puzzles, and
- chess puzzles.

<div style="display: flex; gap: 1rem; align-items: flex-end; margin-bottom: 2rem;">
  <figure style="width: 48%; margin: 0;">
    <img src="/images/blog/vision-benchmark/benchmark_result.png" alt="Benchmark Result" style="width: 100%; height: auto;" />
    <figcaption style="text-align: center; font-size: 0.9em; color: #666;">Model accuracy across puzzle types</figcaption>
  </figure>
  <figure style="width: 48%; margin: 0;">
    <img src="/images/blog/vision-benchmark/example_puzzle.png" alt="Example Puzzle" style="width: 100%; height: auto;" />
    <figcaption style="text-align: center; font-size: 0.9em; color: #666;">Example puzzle</figcaption>
  </figure>
</div>

The model that performed best: Google’s <span style="font-family: monospace; background: #f9f2f4; color: #c7254e; padding: 0.1em 0.4em; border-radius: 4px;">gemini-2.5-pro-preview</span> which answered 73 out of 75 questions correctly on its first try.

Click <a href="https://www.kaggle.com/datasets/mattabate7/twitter-math-puzzles-ai-vision-benchmark" style="text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px;">here for the dataset</a>, which is now public through Kaggle.
