# Ana Small: Our Barebones Text-to-SQL Tool Beats Everyone

## Table of Contents
- [Introducing Ana Small](#introducing-ana-small)
- [Benchmark Performance](#benchmark-performance)
- [How Ana Small Works](#how-ana-small-works)
- [Try It Free](#try-it-free)
- [Ana Small vs Enterprise Ana](#ana-small-vs-enterprise-ana)
- [The Power of Simplicity](#the-power-of-simplicity)

![Conglomerate v1 lite results](/images/blog/ana-small/ana-small-image-06.png)

**Scores represent text-to-SQL accuracy*

## Introducing Ana Small

TextQL's pipeline, the entire system that turns a question into an answer, can seem complex. It is complex. To sanity check ourselves with the question "is any of this doing anything?" we built the most simple, barebones version of TextQL's Ana that we could: [**Ana Small**](https://small.textql.com). In short, it's really good.

## Benchmark Performance

We tested Ana Small alongside Enterprise Ana and all the major text-to-SQL tools on the market using our internal Conglomerate benchmark. Conglomerate is an algorithmically generated ontology with over 100 tables, paired with test questions that require complicated SQL to answer, often requiring many joins. It's primarily designed to test Ana's ability to search by overwhelming it with thousands of dimensions, measures, and metrics to pick from.

You can test some of the questions on [**Ana Small**](https://small.textql.com). Or check out the [**source**](https://github.com/TextQLLabs/ana-small).

![Conglomerate ontology](/images/blog/ana-small/ana-small-image04.png)

Ana Small's 76% didn't manage to beat Ana Enterprise's score of 91%, but it did manage to wipe the floor with everyone except Deepnote, who came in third with 74%. The only tool Ana Small has access to is "exec-sql", which lets it run a SQL query against our Amazon Redshift warehouse. Notably **it scores over twice as accurate as Amazon Q**, which serves as the SQL assistant in the Redshift web UI. In truth, the system is not much more than o3-mini with the "exec-sql" tool and a prompt that says "answer the question."

## How Ana Small Works

You'll see in its behavior, Ana Small is told NOTHING about the dataset except the schema name. It has to start its exploration by querying which tables even exist. If the question requires 20 SQL queries to find the right column, it'll do it. The problem solving capability is very impressive.

![Ana Small UI](/images/blog/ana-small/ana-small-image01.png)

When confronted with an empty result, it does what any logical human would do: Query the distinct values. Did I filter wrong? Oh. It appears I did.

![Ana Small encounters an error](/images/blog/ana-small/ana-small-image02.png)

## Try It Free

Given Ana Small exists and is so lightweight (there's no account required, everything persist is just stored in the browser), we decided to just publish it for free. It's just about the best text-to-SQL money can't buy, because it's free!

If you still think text-to-SQL is AI hype nonsense, [give it a spin](https://small.textql.com). You can play with sample warehouses or plug in your own Redshift credentials.

## Ana Small vs Enterprise Ana

So what's missing? Why does enterprise Ana exist? Sure, Ana Small can massively accelerate your workflow if you know your warehouse and if you know SQL, but otherwise the results are completely untrustworthy. On the other hand, Enterprise Ana ISN'T EVEN ALLOWED TO WRITE SQL! Enterprise Ana queries the warehouse through the Ontology, which has concrete definitions for objects and metrics. Imagine the difference between clicking dropdowns and buttons vs writing raw SQL. Which is more error prone for a human? The same applies to AI. This blocks it from trying to answer things it can't and otherwise ensures answers are correct and consistent.

![Comparison between sql and selecting from dropdowns](/images/blog/ana-small/ana-small-image03.png)

There's a ton of other things on top of the Ontology in Enterprise Ana. To relieve you from a wall of text, here's an unordered list:

- Automated, actionable insights and reports
- The expressiveness of Python for visualizing and forecasting
- Slack integration
- Tableau dashboard surfacing and analysis
- CSV and PDF upload
- On-prem deployments
- SOC2 and HIPAA compliant

## The Power of Simplicity

The foundation models are clearly getting extremely capable, to the point of being difficult to benchmark. The more capable they become the less help they need. Actually, past a certain point, more help only hurts. This is where Ana Small's power comes from: its simplicity.

This is where I have to give Amazon, Databricks, Hex, and Snowflake some leeway. This is a difficult problem and deploying at their scale compounds its difficulty. These organizations probably prioritize reliability over scoring well on a benchmark like this.

Similarly to how I trust AI to write TextQL's code more and more, I trust it to write SQL more. Obviously most enterprise data can't simply be hooked up to a sketchy website like Ana Small. If you're interested in bringing enterprise Ana to your team, [**book a meeting with our sales team**](https://textql.com/demo).