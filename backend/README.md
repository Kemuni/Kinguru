# KinGuru - Backend 🎬
___

## Стек технологий 📝
- Python >= 3.10
- [FastAPI](https://fastapi.tiangolo.com/) для создания API
- [SQLModel](https://sqlmodel.tiangolo.com/) для взаимодействия с БД (ORM)
- [Pydantic](https://docs.pydantic.dev/), используется FastAPI, для валидации данных и настроек
- PostgreSQL как база данных

___

## Инструкции 🧑‍💻
### Как запустить сервер для разработки
1. Запустить Postgres
2. Создать БД `KinguruDB`
3. Добавить локальный интерпретатор Python в `backend` 
4. Скачать все необходимые библиотеки командой
    ```shell
    pip install -r requirements.txt
    ```
5. Запустить сервер командой
    ```shell
    fastapi run --reload app/main.py
    ```

P.S. В случае если IDE жалуется на ошибки в импортах со словами,
что указан неверный путь, то необходимо в настройках IDE указать
рабочую директорию.\
В случае `Pycharm`переходим в Settings -> Project: Kinguru -> Project Structure
-> Нажимаете на папку `backend` -> Сверху нажимаете на синюю папку `Sources`.


### Как запустить миграции
1. Изменить модели в соответствующих файлах
2. Создать новую ревизию. Команда ниже автоматически сгенерирует 
новый файл с изменениями моделей
   ```shell
   alembic revision --autogenerate -m "текст_ревизии"
   ```
3. Запускаем миграцию
   ```shell
   alembic upgrade head
   ```

### Как запустить тесты
1. Написать соответствующие тесты в папке app/tests/*
2. Запустить тесты командой:
   ```shell
     coverage run --source=app -m pytest
   ```


### Как проверить покрытие кода тестами
1. Запустить команду:
   ```shell
     coverage html
   ```
2. В новой директории `htmlcov` открыть файл `index.html`