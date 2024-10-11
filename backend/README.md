# KinGuru - Backend 🎬
___

## Стек технологий 📝
- Python >= 3.10

___

## Инструкции 🧑‍💻
### Как запустить
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
