# Recipe Finder App

A web app where you enter ingredients and macro goals (protein, calories, etc.), and it searches YouTube for recipe videos, ranks and summarizes them with estimated macros, and displays results in a clean UI.

**Stack:** Node.js + Express (backend) · React (frontend) · YouTube Data API v3 · Claude API (AI summaries + macro estimation)

---

## Project Phases

### Phase 1 — Project Setup
**Goal:** Get a working skeleton with a backend and frontend talking to each other.

Tasks:
- [x] Initialize the Node/Express backend (`/server`)
- [x] Initialize the React frontend (`/client`)
- [x] Connect them with a simple test API call (frontend calls backend, backend returns "hello")
- [x] Set up `.env` for secrets (API keys)

**What you'll learn:** How a full-stack app is structured, what npm/package.json does, what a REST API is, how frontend and backend communicate.

---

### Phase 2 — YouTube Search API
**Goal:** Backend can search YouTube for recipe videos given a list of ingredients.

Tasks:
- [x] Get a YouTube Data API v3 key from Google Cloud Console
- [x] Build a `/api/search` endpoint in Express that accepts ingredients and calls the YouTube API
- [x] Return the top N video results (title, thumbnail, URL, description)
- [x] Test the endpoint with a tool like Postman or Thunder Client

**What you'll learn:** How to call third-party APIs from a backend, how to use environment variables safely, how Express routes and request/response work.

---

### Phase 3 — AI Summaries + Macro Estimation
**Goal:** Use the Claude API to summarize each video and estimate its macros.

Tasks:
- [x] Get a Claude API key from console.anthropic.com
- [x] Build a `/api/analyze` endpoint that takes video metadata (title, description) and returns a summary + estimated macros
- [x] Rank results by how well they match the user's macro goals

---

### Phase 4 — React Frontend (Basic)
**Goal:** Build a UI where the user can enter ingredients + macro goals and see results.

Tasks:
- [ ] Build an input form (ingredients list, protein/calorie goals)
- [ ] Call the backend search endpoint on form submit
- [ ] Display video cards (thumbnail, title, estimated macros, summary)

---

### Phase 5 — UI Polish
**Goal:** Make the app look clean and feel good to use.

Tasks:
- [ ] Add a loading state while results are fetching
- [ ] Add error handling for bad inputs or API failures
- [ ] Style with Tailwind CSS or a component library (e.g. shadcn/ui)
- [ ] Add sorting/filtering by macro values


---

## Folder Structure (target end state)

```
1st_AI_Project/
├── client/          # React frontend
│   ├── src/
│   └── package.json
├── server/          # Node + Express backend
│   ├── routes/
│   ├── index.js
│   └── package.json
├── .env             # Secret keys — NEVER commit this
├── .gitignore
└── README.md
```

---
