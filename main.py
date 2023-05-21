from fastapi import FastAPI
from pydantic import BaseModel
from neo4j import GraphDatabase, basic_auth
from fastapi.responses import RedirectResponse
from fastapi import HTTPException

app = FastAPI()


# Класс модели для данных регистрации
class UserRegistration(BaseModel):
    username: str
    email: str
    password: str


# Класс модели для данных авторизации
class UserLogin(BaseModel):
    username: str
    password: str


# Настройка соединения с базой данных Neo4j
uri = "bolt://localhost:7687"
auth = basic_auth("neo4j", "coursework")
driver = GraphDatabase.driver(uri, auth=auth)


# Маршрут для регистрации пользователя
@app.post("/register")
async def register_user(user: UserRegistration):
    with driver.session() as session:
        session.run(
            "CREATE (u:User {username: $username, email: $email, password: $password})",
            username=user.username,
            email=user.email,
            password=user.password
        )
    return {"message": "Пользователь зарегистрирован"}


# Маршрут для авторизации пользователя
@app.post("/login")
async def login_user(user: UserLogin):
    with driver.session() as session:
        result = session.run(
            "MATCH (u:User {username: $username, password: $password}) RETURN count(u) AS count",
            username=user.username,
            password=user.password
        )
        count = result.single()["count"]
        if count == 1:
            # Если авторизация успешна, перенаправляем пользователя на страницу /recipes
            return RedirectResponse("/recipes")
        else:
            # Если авторизация неуспешна, возбуждаем исключение HTTPException
            raise HTTPException(status_code=401, detail="Неверные имя пользователя или пароль")

# Другие маршруты и функции обработчиков запросов...
