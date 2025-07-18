# CyberSecurity AI Assistant

A full-stack, Gemini-based Cybersecurity Knowledge Assistant designed to analyze security scan results, support advanced prompt engineering, and leverage retrieval-augmented generation (RAG) for contextual, accurate answers. Built with Bun, Express, TypeScript, Prisma, and Docker.

---

## Overview

This project is a backend service that acts as an intelligent cybersecurity assistant. It can:
- Analyze outputs from security tools (e.g., Semgrep, Gitleaks).
- Accept both plain text and file uploads for analysis.
- Ingest and use custom tool documentation for more accurate, context-aware answers.
- Log all queries and responses for auditing.
- Support prompt engineering and RAG to enhance answer quality.
- Provide a clean, scalable architecture ready for production.

---

## Architecture & Implementation

**Tech Stack:**
- **Bun**: Fast JavaScript runtime for development and production.
- **Express**: Web server framework.
- **TypeScript**: Type safety and maintainability.
- **Prisma**: ORM for PostgreSQL, used for logging queries.
- **ChromaDB**: Vector database for storing and retrieving document embeddings.
- **Google Gemini**: LLM for generating answers.
- **HuggingFace Transformers**: For generating embeddings (MiniLM).
- **Docker**: For easy deployment and local development.

**Key Features:**

1. **Analysis Endpoint**  
   - `POST /api/v1/analysis/`  
     Accepts a `question` and returns an answer from Gemini, optionally enhanced with RAG (retrieving relevant context from ingested docs).

2. **Tool Documentation Ingestion**  
   - `POST /api/v1/analysis/upload`  
     Accepts `toolName` and `docText` to ingest documentation, which is chunked, embedded, and stored for future context retrieval.

3. **Prompt Engineering & RAG**  
   - Prompts are dynamically constructed using context retrieved from ingested docs, improving answer relevance.
   - Embeddings are generated using HuggingFace MiniLM and stored in memory (or ChromaDB for scalable setups).

4. **Logging**  
   - All queries and answers are logged in a PostgreSQL database for auditing and traceability.

5. **Security & Middleware**  
   - Includes security middleware (Helmet, rate limiting, sanitization).
   - Logs all requests and errors.

6. **Health Check**  
   - `GET /api/v1/health` returns a simple status message.

**Directory Structure:**
- `src/controllers/`: Route handlers for analysis, ingestion, and (future) AI scan.
- `src/services/`: Business logic for Gemini, embeddings, vector storage, etc.
- `src/rag/`: RAG implementation (chunking, embedding, retrieval).
- `src/prompts/`: Prompt templates for different analysis types.
- `src/config/`: Configuration for environment, logging, and database.
- `prisma/`: Database schema and migrations.

---

## Setup & Usage

1. **Clone the repo and install dependencies:**
   ```sh
   bun install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in:
     - `DATABASE_URL` (PostgreSQL)
     - `GEMINI_API_KEY` (Google Generative AI)
     - (Optional) `HUGGINGFACE_TOKEN` for advanced embedding

3. **Run the database:**
   ```sh
   docker-compose up -d
   npx prisma migrate deploy
   ```

4. **Start the server:**
   ```sh
   bun run src/server.ts
   ```

5. **API Usage:**
   - Use `/api/v1/analysis/` to analyze questions or scan results.
   - Use `/api/v1/analysis/upload` to ingest tool documentation.

---

## Future Improvements

- **Persistent Vector Store:**  
  Current in-memory storage for embeddings can be replaced with ChromaDB for scalability and persistence.
- **More Endpoints:**  
  Add endpoints for direct scan uploads, multi-tool analysis, and threat intelligence integration.
- **User Authentication:**  
  Add user management and authentication for multi-user environments.
- **Frontend UI:**  
  Build a web dashboard for easier interaction and visualization.
- **Advanced RAG:**  
  Integrate more sophisticated retrieval and ranking algorithms.
- **Automated Testing:**  
  Add unit and integration tests for all endpoints and services.
- **Cloud Deployment:**  
  Provide scripts and docs for deploying to AWS/GCP/Azure.

---

## Tips for Efficiency

- **Batch Ingestion:**  
  Ingest multiple tool docs in one request to save time.
- **Use ChromaDB:**  
  For large-scale or production use, enable ChromaDB for persistent, fast vector search.
- **Prompt Tuning:**  
  Experiment with prompt templates in `src/prompts/` to improve answer quality.
- **Monitor Logs:**  
  Use the logs for debugging and improving prompt/response quality.
- **Environment Variables:**  
  Keep secrets and config in `.env` and never commit them to version control.

---

## Contributing

- Fork the repo and create a feature branch.
- Add tests for new features.
- Open a pull request with a clear description.

---

**Contact:**  
For questions or support, open an issue or contact the maintainer.


