# Начало работы

### `yarn tsc:watch`

Запускает компилятор ts в режиме наблюдения за файлами и делает сборку в папку `build`

### `yarn dev`

Запускает сервер по порту `localhost:3000`

### API

## users

# user.create

`payload` представлен json-объектом со следующими полями:

| name     | type   | required | description         |
| -------- | ------ | -------- | ------------------- |
| email    | string | y        | почта пользователя  |
| name     | string | y        | имя пользователя    |
| password | string | y        | пароль пользователя |

Пример запроса:

```js
{
  "type": "",
  "method": "user.create",
  "payload": {
    "email": "bshelomanov@gmail.com",
    "name": "Bogdan",
    "password": "1111111",
  }
}
```

Пример ответа:

```js
{
  "type": "",
  "method": "user.create",
  "payload": {
    "email": "bshelomanov@gmail.com",
    "name": "Bogdan",
    "token": "some token",
    "_id": "UHJKMwqe123",
  }
}
```

# user.login

`payload` представлен json-объектом со следующими полями:

| name     | type   | required | description         |
| -------- | ------ | -------- | ------------------- |
| email    | string | y        | почта пользователя  |
| password | string | y        | пароль пользователя |

Пример запроса:

```js
{
  "type": "",
  "method": "user.login",
  "payload": {
    "email": "bshelomanov@gmail.com",
    "password": "1111111",
  }
}
```

Пример ответа:

```js
{
  "type": "",
  "method": "user.login",
  "payload": {
    "email": "bshelomanov@gmail.com",
    "name": "Bogdan",
    "token": "some token",
    "_id": "UHJKMwqe123",
  }
}
```

## Дефолтный ответ с ошибкой

```js
{
  "method": "user.login",
  "payload": null,
  "error": ["some error string"]
}
```
