# Gutenberg LLM App

Gutenberg LLM App is a book exploration platform that integrates with the Groq LLM API to analyze book titles, summaries, and content, offering users insights and a modern browsing experience.

## Features

- Explore a library of books.
- Analyze books using the Groq LLM API.
- Save favorite books. (soon to be released)
- Interactive and modern UI using React and ShadCN.

---

## Table of Contents

- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend-setup)
  - [Frontend](#frontend-setup)
- [Usage](#usage)
- [License](#license)

---

## Requirements

- **Global Dependencies**:
  - [Node.js](https://nodejs.org): v18+ (recommended: LTS version)
  - [Python](https://www.python.org/): 3.12+
  - [Docker](https://www.docker.com/) (optional, for containerized development)
  - [Git](https://git-scm.com/)

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/R1tter/gutenberg-llm-app.git
cd gutenberg-llm-app
```

---

### Backend Setup

1. Navigate to the Backend Directory:

   ```bash
   cd backend
   ```

2. Create a Python Virtual Environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install Dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set Up Environment Variables:

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   GROQ_API_KEY=your_groq_api_key
   ```

5. Run Database Migrations:

   ```bash
   alembic upgrade head
   ```

6. Start the Backend Server:

   ```bash
   uvicorn main:app --reload
   ```

   The backend will be available at `http://127.0.0.1:8000`.

---

### Frontend Setup

1. Navigate to the Frontend Directory:

   ```bash
   cd frontend
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Set Up Environment Variables:

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   VITE_BACKEND_URL=http://127.0.0.1:8000/api
   ```

4. Start the Frontend Development Server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://127.0.0.1:5173`.

---

## Usage

- Access the application at `http://127.0.0.1:5173`.
- Explore books and view details.
- Analyze book titles and save favorite books.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.