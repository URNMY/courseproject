from fastapi import FastAPI
from pydantic import BaseModel
from neo4j import GraphDatabase, basic_auth
from fastapi.responses import RedirectResponse
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware

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
    # Проверка на уникальность почты и имени пользователя
    with driver.session() as session:
        query = """
        MATCH (u:User)
        WHERE u.email = $email OR u.username = $username
        RETURN u
        """
        result = session.run(query, email=user.email, username=user.username)
        if result.single():
            raise HTTPException(status_code=400, detail="Пользователь с такой почтой или именем уже зарегистрирован")

        # Создание нового пользователя
        query = """
        CREATE (u:User {username: $username, email: $email, password: $password})
        """
        session.run(query, username=user.username, email=user.email, password=user.password)

    return {"message": "Пользователь успешно зарегистрирован"}


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

origins = [
    "http://localhost:3000",
    "http://localhost:8000"
    # Другие разрешенные источники (если есть)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)