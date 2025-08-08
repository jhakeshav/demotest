# FastAPI + React + PostgreSQL CRUD (Local, No Docker)

## Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Update DATABASE_URL in main.py
uvicorn main:app --reload
```

## Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs on http://localhost:3000  
Backend runs on http://localhost:8000
