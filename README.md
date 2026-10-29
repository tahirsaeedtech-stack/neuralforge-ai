# NeuralForge AI
Domain-specialized LLM fine-tuning and inference platform.

## Goal
Fine-tune an open-weight instruction model for technical-support troubleshooting, evaluate against a held-out baseline, optimize inference, and expose an API.

## Day 1
1. Inspect GPU availability and VRAM.
2. Select model compatible with hardware and license.
3. Acquire a permissively licensed technical-support dataset and document provenance.
4. Define train/validation/test splits and evaluation criteria.
5. Run baseline inference before fine-tuning.

## Planned stack
PyTorch, Transformers, PEFT, TRL, datasets, FastAPI, MLflow, Docker, pytest.

## Evaluation
Held-out issue-resolution correctness (human rubric), instruction adherence, hallucination rate, latency, and GPU memory. Compare base vs fine-tuned on the same test set.
