# 📊 Personal Expense Tracker — Backend

A Django REST Framework backend for a personal expense tracking application with JWT authentication, providing secure APIs for managing expenses and generating reports.

---

## 📌 Features

- User Registration & Login (JWT Authentication)
- Add, Edit, Delete Expenses
- Filter Expenses by Category & Date
- Monthly Expense Reports API
- CORS-enabled for React frontend integration

---

## 📦 Tech Stack

- Python 3.x  
- Django 5.x  
- Django REST Framework  
- djangorestframework-simplejwt  
- PostgreSQL / SQLite (for development)  
- django-cors-headers  

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yara_alstouhy/expense-tracker-backend.git
cd expense-tracker-backend
```
### 2️⃣ Create & Activate Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```
###4️⃣ Apply Migrations
```bash
python manage.py migrate
```
###5️⃣ Run the Development Server
```bash
python manage.py runserver
```
### API Documentaion
```bash
https://documenter.getpostman.com/view/44682772/2sB2jAaTBN
```
