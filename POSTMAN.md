# Postman API Documentation

## Base URL
`http://localhost:3000/api/v1`

---

## 1. Analyze Question
### POST `/analysis/`
**Request Body:**
```
{
  "question": "What are the risks in this code?"
}
```
**Response:**
```
{
  "success": true,
  "answer": "<LLM generated answer>"
}
```

---

## 2. Ingest Tool Documentation
### POST `/analysis/upload`
**Request Body:**
```
{
  "toolName": "Semgrep",
  "docText": "<documentation text>"
}
```
**Response:**
```
{
  "success": true
}
```

---

## 3. AI Scan Analysis (Raw Output)
### POST `/scan/`
**Request Body:**
```
{
  "tool": "Semgrep",
  "scanOutput": "<scan output text>",
  "objective": "Find vulnerabilities"
}
```
**Response:**
```
{
  "response": "<LLM generated analysis>"
}
```

---

## 4. AI Scan Analysis (File Upload)
### POST `/scan/upload`
**Form Data:**
- `tool`: (string) e.g. "Semgrep"
- `objective`: (string) e.g. "Find vulnerabilities"
- `file`: (file) Upload scan output file

**Response:**
```
{
  "response": "<LLM generated analysis>"
}
```

---

## 5. Health Check
### GET `/health`
**Response:**
```
Cybersecurity Knowledge Assitant is Running
``` 