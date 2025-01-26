
    const schema = {
  "asyncapi": "2.6.0",
  "info": {
    "title": "WebSocket API приложения MyPixe",
    "version": "1.0.0",
    "description": "WebSocket API предоставляет доступ к функционалу приложения MyPixe.\n",
    "contact": {
      "name": "Разработчик",
      "url": "https://t.me/voplik"
    }
  },
  "tags": [
    {
      "name": "User",
      "description": "Методы для работы с пользователями"
    },
    {
      "name": "Pixes",
      "description": "Методы для работы с пикселями"
    }
  ],
  "servers": {
    "PROD": {
      "url": "ws://mypixe.ru/api/v1/ws/",
      "protocol": "ws",
      "description": "Основной сервер приложения MyPixe"
    },
    "DEV": {
      "url": "ws://developers.mypixe.ru/api/v1/ws/",
      "protocol": "ws",
      "description": "Сервер для разработки и тестирования"
    },
    "HTTP-PROD": {
      "url": "https://mypixe.ru/api/v1/",
      "protocol": "http",
      "description": "HTTP сервер для работы с REST API"
    },
    "HTTP-DEV": {
      "url": "https://developers.mypixe.ru/api/v1/",
      "protocol": "http",
      "description": "HTTP сервер для работы с REST API"
    }
  },
  "channels": {
    "/auth/sendVerificationMessage": {
      "description": "Отправка сообщения для проверки телефона",
      "bindings": {
        "http": {
          "type": "request",
          "method": "post",
          "bindingVersion": "1.0.0"
        }
      },
      "publish": {
        "operationId": "sendVerificationMessage",
        "summary": "Отправка сообщения с кодом подтверждения на номер телефона",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "phone"
            ],
            "properties": {
              "phone": {
                "type": "string",
                "description": "Номер телефона для отправки сообщения",
                "example": "+79991234567",
                "x-parser-schema-id": "<anonymous-schema-2>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "x-parser-message-name": "<anonymous-message-1>"
        }
      },
      "subscribe": {
        "operationId": "receiveVerificationMessageResponse",
        "summary": "Ответ на запрос с результатом отправки",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "error",
              "status"
            ],
            "properties": {
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке (если ошибка отсутствует — пустая строка)",
                "example": "",
                "x-parser-schema-id": "<anonymous-schema-4>"
              },
              "status": {
                "type": "string",
                "description": "Статус операции (например, `OK`)",
                "example": "OK",
                "x-parser-schema-id": "<anonymous-schema-5>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-3>"
          },
          "x-parser-message-name": "<anonymous-message-2>"
        }
      }
    },
    "/auth/checkVerificationStatus": {
      "description": "Проверка статуса верификации",
      "bindings": {
        "http": {
          "type": "request",
          "method": "post",
          "bindingVersion": "1.0.0"
        }
      },
      "publish": {
        "operationId": "sendCheckVerificationStatusRequest",
        "summary": "Отправка кода верификации",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "code"
            ],
            "properties": {
              "code": {
                "type": "string",
                "description": "Код верификации для проверки",
                "example": "123456",
                "x-parser-schema-id": "<anonymous-schema-7>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-6>"
          },
          "x-parser-message-name": "<anonymous-message-3>"
        }
      },
      "subscribe": {
        "operationId": "receiveCheckVerificationStatusResponse",
        "summary": "Получение результата проверки верификации",
        "message": {
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "error",
              "status"
            ],
            "properties": {
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке (если ошибка отсутствует — пустая строка)",
                "example": "",
                "x-parser-schema-id": "<anonymous-schema-9>"
              },
              "status": {
                "type": "string",
                "description": "Статус проверки (например, `OK`)",
                "example": "OK",
                "x-parser-schema-id": "<anonymous-schema-10>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-8>"
          },
          "x-parser-message-name": "<anonymous-message-4>"
        }
      }
    },
    "getPixeById": {
      "description": "[Pixe] Получение пикселя по уникальному идентификатору\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root, admin, user]`.\n",
      "publish": {
        "operationId": "sendGetPixeByIdRequest",
        "summary": "Отправка запроса на получение пикселя",
        "message": {
          "name": "GetPixeByIdRequest",
          "summary": "Запрос на получение пикселя по ID",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-12>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-11>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetPixeByIdResponse",
        "summary": "Получение ответа с данными о пикселе",
        "message": {
          "name": "GetPixeByIdResponse",
          "summary": "Ответ с данными о пикселе",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-14>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-15>"
              },
              "data": {
                "oneOf": [
                  {
                    "type": "object",
                    "required": [
                      "id",
                      "name",
                      "color",
                      "isHidden",
                      "isMain",
                      "creatorId",
                      "depth",
                      "users",
                      "ownerId",
                      "createdAt",
                      "updatedAt"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Уникальный идентификатор пикселя",
                        "x-parser-schema-id": "<anonymous-schema-17>"
                      },
                      "name": {
                        "type": "string",
                        "description": "Название пикселя",
                        "x-parser-schema-id": "<anonymous-schema-18>"
                      },
                      "color": {
                        "type": "string",
                        "description": "Цвет пикселя",
                        "x-parser-schema-id": "<anonymous-schema-19>"
                      },
                      "isHidden": {
                        "type": "boolean",
                        "description": "Указывает, скрыт ли пиксель",
                        "x-parser-schema-id": "<anonymous-schema-20>"
                      },
                      "isMain": {
                        "type": "boolean",
                        "description": "Указывает, является ли пиксель главным",
                        "x-parser-schema-id": "<anonymous-schema-21>"
                      },
                      "parentId": {
                        "type": "string",
                        "nullable": true,
                        "description": "Идентификатор родительского пикселя (null, если это корневой пиксель)",
                        "x-parser-schema-id": "<anonymous-schema-22>"
                      },
                      "mainId": {
                        "type": "string",
                        "nullable": true,
                        "description": "Идентификатор главного пикселя",
                        "x-parser-schema-id": "<anonymous-schema-23>"
                      },
                      "ownerId": {
                        "type": "integer",
                        "description": "Идентификатор пользователя-владельца пикселя",
                        "x-parser-schema-id": "<anonymous-schema-24>"
                      },
                      "creatorId": {
                        "type": "integer",
                        "description": "Идентификатор пользователя-создателя пикселя",
                        "x-parser-schema-id": "<anonymous-schema-25>"
                      },
                      "depth": {
                        "type": "integer",
                        "description": "Глубина пикселя в иерархии",
                        "x-parser-schema-id": "<anonymous-schema-26>"
                      },
                      "users": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "required": [
                            "id",
                            "role"
                          ],
                          "properties": {
                            "id": {
                              "type": "integer",
                              "description": "Уникальный идентификатор пользователя",
                              "x-parser-schema-id": "<anonymous-schema-29>"
                            },
                            "role": {
                              "type": "string",
                              "enum": [
                                "root",
                                "admin",
                                "user",
                                "guest",
                                "widget",
                                "removed"
                              ],
                              "description": "Роль пользователя",
                              "x-parser-schema-id": "<anonymous-schema-30>"
                            },
                            "widgetId": {
                              "type": "string",
                              "nullable": true,
                              "description": "Поле предназначено для role widget",
                              "x-parser-schema-id": "<anonymous-schema-31>"
                            }
                          },
                          "x-parser-schema-id": "<anonymous-schema-28>"
                        },
                        "description": "Список пользователей, связанных с пикселем",
                        "x-parser-schema-id": "<anonymous-schema-27>"
                      },
                      "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Дата создания пикселя",
                        "x-parser-schema-id": "<anonymous-schema-32>"
                      },
                      "updatedAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Дата последнего обновления пикселя",
                        "x-parser-schema-id": "<anonymous-schema-33>"
                      }
                    },
                    "x-parser-schema-id": "Pixe"
                  }
                ],
                "description": "Данные пикселя (или null, если не найден или ошибка)",
                "x-parser-schema-id": "<anonymous-schema-16>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-13>"
          }
        }
      }
    },
    "createWidget": {
      "description": "[User] Создание нового виджета\n- Основная роль пользователя (`user.role`) — `[*]`.\n",
      "publish": {
        "operationId": "sendCreateWidgetRequest",
        "summary": "Отправка запроса на создание виджета",
        "message": {
          "name": "CreateWidgetRequest",
          "summary": "Запрос на создание виджета",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "countryCode",
              "firstName",
              "lastName",
              "patronymic",
              "photoUrl",
              "phone",
              "description"
            ],
            "properties": {
              "countryCode": {
                "type": "string",
                "enum": [
                  "RU",
                  "UA",
                  "BY",
                  "KZ",
                  "UZ",
                  "KG",
                  "TJ",
                  "TM"
                ],
                "description": "Код страны",
                "x-parser-schema-id": "<anonymous-schema-35>"
              },
              "firstName": {
                "type": "string",
                "description": "Имя",
                "x-parser-schema-id": "<anonymous-schema-36>"
              },
              "lastName": {
                "type": "string",
                "description": "Фамилия",
                "x-parser-schema-id": "<anonymous-schema-37>"
              },
              "patronymic": {
                "type": "string",
                "description": "Отчество",
                "x-parser-schema-id": "<anonymous-schema-38>"
              },
              "photoUrl": {
                "type": "string",
                "description": "URL фотографии",
                "x-parser-schema-id": "<anonymous-schema-39>"
              },
              "phone": {
                "type": "string",
                "description": "Номер телефона",
                "x-parser-schema-id": "<anonymous-schema-40>"
              },
              "description": {
                "type": "string",
                "description": "Описание",
                "x-parser-schema-id": "<anonymous-schema-41>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-34>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveCreateWidgetResponse",
        "summary": "Получение ответа с созданным виджетом",
        "message": {
          "name": "CreateWidgetResponse",
          "summary": "Ответ с данными о созданном виджете",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "example": 200,
                "x-parser-schema-id": "<anonymous-schema-43>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "example": "",
                "x-parser-schema-id": "<anonymous-schema-44>"
              },
              "data": {
                "type": "object",
                "required": [
                  "id",
                  "photoUrl",
                  "firstName",
                  "lastName",
                  "patronymic",
                  "phone",
                  "countryCode",
                  "createdAt",
                  "updatedAt",
                  "role"
                ],
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Уникальный идентификатор пользователя",
                    "x-parser-schema-id": "<anonymous-schema-45>"
                  },
                  "photoUrl": {
                    "type": "string",
                    "description": "Ссылка на фотографию пользователя",
                    "x-parser-schema-id": "<anonymous-schema-46>"
                  },
                  "firstName": {
                    "type": "string",
                    "description": "Имя пользователя",
                    "x-parser-schema-id": "<anonymous-schema-47>"
                  },
                  "lastName": {
                    "type": "string",
                    "description": "Фамилия пользователя",
                    "x-parser-schema-id": "<anonymous-schema-48>"
                  },
                  "patronymic": {
                    "type": "string",
                    "description": "Отчество пользователя",
                    "x-parser-schema-id": "<anonymous-schema-49>"
                  },
                  "phone": {
                    "type": "string",
                    "description": "Номер телефона",
                    "x-parser-schema-id": "<anonymous-schema-50>"
                  },
                  "countryCode": {
                    "type": "string",
                    "enum": [
                      "RU",
                      "UA",
                      "BY",
                      "KZ",
                      "UZ",
                      "KG",
                      "TJ",
                      "TM"
                    ],
                    "description": "Код страны",
                    "x-parser-schema-id": "<anonymous-schema-51>"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Дата создания",
                    "x-parser-schema-id": "<anonymous-schema-52>"
                  },
                  "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Дата последнего обновления",
                    "x-parser-schema-id": "<anonymous-schema-53>"
                  },
                  "description": {
                    "type": "string",
                    "description": "Краткое описание",
                    "x-parser-schema-id": "<anonymous-schema-54>"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "root",
                      "user",
                      "widget",
                      "guest"
                    ],
                    "description": "Роль пользователя",
                    "x-parser-schema-id": "<anonymous-schema-55>"
                  }
                },
                "x-parser-schema-id": "User"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-42>"
          }
        }
      }
    },
    "createUser": {
      "description": "[User] Создание нового пользователя\n- Основная роль пользователя (`user.role`) — `[*]`.\n",
      "publish": {
        "operationId": "sendCreateUserRequest",
        "summary": "Отправка запроса на создание пользователя",
        "message": {
          "name": "CreateUserRequest",
          "summary": "Запрос на создание пользователя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "countryCode",
              "firstName",
              "lastName",
              "patronymic",
              "photoUrl",
              "phone"
            ],
            "properties": {
              "countryCode": {
                "type": "string",
                "enum": [
                  "RU",
                  "UA",
                  "BY",
                  "KZ",
                  "UZ",
                  "KG",
                  "TJ",
                  "TM"
                ],
                "description": "Код страны",
                "x-parser-schema-id": "<anonymous-schema-57>"
              },
              "firstName": {
                "type": "string",
                "description": "Имя",
                "x-parser-schema-id": "<anonymous-schema-58>"
              },
              "lastName": {
                "type": "string",
                "description": "Фамилия",
                "x-parser-schema-id": "<anonymous-schema-59>"
              },
              "patronymic": {
                "type": "string",
                "description": "Отчество",
                "x-parser-schema-id": "<anonymous-schema-60>"
              },
              "photoUrl": {
                "type": "string",
                "description": "URL фотографии",
                "x-parser-schema-id": "<anonymous-schema-61>"
              },
              "phone": {
                "type": "string",
                "description": "Номер телефона",
                "x-parser-schema-id": "<anonymous-schema-62>"
              },
              "description": {
                "type": "string",
                "nullable": true,
                "description": "Дополнительное описание (необязательное поле)",
                "x-parser-schema-id": "<anonymous-schema-63>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-56>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveCreateUserResponse",
        "summary": "Получение ответа с созданным пользователем",
        "message": {
          "name": "CreateUserResponse",
          "summary": "Ответ с данными о созданном пользователе",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-65>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-66>"
              },
              "data": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data"
            },
            "x-parser-schema-id": "<anonymous-schema-64>"
          }
        }
      }
    },
    "getUserById": {
      "description": "[User] Получение пользователя по его уникальному идентификатору\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetUserByIdRequest",
        "summary": "Отправка запроса на получение данных пользователя",
        "message": {
          "name": "GetUserByIdRequest",
          "summary": "Запрос на получение пользователя по ID",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "description": "Уникальный идентификатор пользователя",
                "x-parser-schema-id": "<anonymous-schema-68>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-67>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetUserByIdResponse",
        "summary": "Получение ответа с данными о пользователе",
        "message": {
          "name": "GetUserByIdResponse",
          "summary": "Ответ с данными о пользователе",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-70>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-71>"
              },
              "data": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data"
            },
            "x-parser-schema-id": "<anonymous-schema-69>"
          }
        }
      }
    },
    "getUsersByIds": {
      "description": "[User] Получение данных пользователей по массиву идентификаторов\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetUsersByIdsRequest",
        "summary": "Отправка запроса на получение данных пользователей",
        "message": {
          "name": "GetUsersByIdsRequest",
          "summary": "Запрос на получение пользователей по массиву ID",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "ids"
            ],
            "properties": {
              "ids": {
                "type": "array",
                "items": {
                  "type": "integer",
                  "description": "Уникальный идентификатор пользователя",
                  "x-parser-schema-id": "<anonymous-schema-74>"
                },
                "description": "Массив идентификаторов пользователей",
                "x-parser-schema-id": "<anonymous-schema-73>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-72>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetUsersByIdsResponse",
        "summary": "Получение ответа с данными пользователей",
        "message": {
          "name": "GetUsersByIdsResponse",
          "summary": "Ответ с данными пользователей",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-76>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-77>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data",
                "description": "Массив объектов пользователей",
                "x-parser-schema-id": "<anonymous-schema-78>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-75>"
          }
        }
      }
    },
    "updateUserInfo": {
      "description": "[User] Обновление информации о пользователе\n",
      "publish": {
        "operationId": "sendUpdateUserInfoRequest",
        "summary": "Отправка запроса на обновление информации пользователя",
        "message": {
          "name": "UpdateUserInfoRequest",
          "summary": "Запрос на обновление информации пользователя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "info"
            ],
            "properties": {
              "info": {
                "type": "object",
                "properties": {
                  "firstName": {
                    "type": "string",
                    "description": "Новое имя пользователя",
                    "x-parser-schema-id": "<anonymous-schema-81>"
                  },
                  "lastName": {
                    "type": "string",
                    "description": "Новая фамилия пользователя",
                    "x-parser-schema-id": "<anonymous-schema-82>"
                  },
                  "patronymic": {
                    "type": "string",
                    "description": "Новое отчество пользователя",
                    "x-parser-schema-id": "<anonymous-schema-83>"
                  },
                  "photoUrl": {
                    "type": "string",
                    "description": "Новый URL фотографии пользователя",
                    "x-parser-schema-id": "<anonymous-schema-84>"
                  },
                  "description": {
                    "type": "string",
                    "nullable": true,
                    "description": "Новое описание пользователя",
                    "x-parser-schema-id": "<anonymous-schema-85>"
                  }
                },
                "description": "Обновляемая информация о пользователе",
                "x-parser-schema-id": "<anonymous-schema-80>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-79>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateUserInfoResponse",
        "summary": "Получение ответа с обновленными данными пользователя",
        "message": {
          "name": "UpdateUserInfoResponse",
          "summary": "Ответ с обновленными данными пользователя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-87>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-88>"
              },
              "data": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data"
            },
            "x-parser-schema-id": "<anonymous-schema-86>"
          }
        }
      }
    },
    "createChildren": {
      "description": "[Pixe] Создание дочернего пикселя\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root, admin]`.\n",
      "publish": {
        "operationId": "sendCreateChildrenRequest",
        "summary": "Отправка запроса на создание дочернего пикселя",
        "message": {
          "name": "CreateChildrenRequest",
          "summary": "Запрос на создание дочернего пикселя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "name",
              "parentId"
            ],
            "properties": {
              "name": {
                "type": "string",
                "description": "Название пикселя",
                "x-parser-schema-id": "<anonymous-schema-90>"
              },
              "parentId": {
                "type": "string",
                "description": "Уникальный идентификатор родительского пикселя",
                "x-parser-schema-id": "<anonymous-schema-91>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-89>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveCreateChildrenResponse",
        "summary": "Получение ответа с данными созданного пикселя",
        "message": {
          "name": "CreateChildrenResponse",
          "summary": "Ответ с данными созданного пикселя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-93>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-94>"
              },
              "data": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]"
            },
            "x-parser-schema-id": "<anonymous-schema-92>"
          }
        }
      }
    },
    "createCompany": {
      "description": "[Pixe] Создание новой компании (пиксель на уровне 0)\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n",
      "publish": {
        "operationId": "sendCreateCompanyRequest",
        "summary": "Отправка запроса на создание компании",
        "message": {
          "name": "CreateCompanyRequest",
          "summary": "Запрос на создание новой компании",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "name"
            ],
            "properties": {
              "name": {
                "type": "string",
                "description": "Название компании",
                "x-parser-schema-id": "<anonymous-schema-96>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-95>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveCreateCompanyResponse",
        "summary": "Получение ответа с данными созданной компании",
        "message": {
          "name": "CreateCompanyResponse",
          "summary": "Ответ с данными о созданной компании",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-98>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-99>"
              },
              "data": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]"
            },
            "x-parser-schema-id": "<anonymous-schema-97>"
          }
        }
      }
    },
    "updateUserRoleFromPixe": {
      "description": "[Pixe] Обновление роли пользователя в пикселе\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendUpdateUserRoleFromPixeRequest",
        "summary": "Отправка запроса на обновление роли пользователя в пикселе",
        "message": {
          "name": "UpdateUserRoleFromPixeRequest",
          "summary": "Запрос на обновление роли пользователя в пикселе",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "user"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-101>"
              },
              "user": {
                "type": "object",
                "required": [
                  "id",
                  "role"
                ],
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Уникальный идентификатор пользователя",
                    "x-parser-schema-id": "<anonymous-schema-103>"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "root",
                      "creator",
                      "admin",
                      "moderator",
                      "user",
                      "guest",
                      "spectator",
                      "developer",
                      "removed"
                    ],
                    "description": "Новая роль пользователя",
                    "x-parser-schema-id": "<anonymous-schema-104>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-102>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-100>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateUserRoleFromPixeResponse",
        "summary": "Получение ответа с обновленным пикселем",
        "message": {
          "name": "UpdateUserRoleFromPixeResponse",
          "summary": "Ответ с обновленным пикселем",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-106>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-107>"
              },
              "data": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]"
            },
            "x-parser-schema-id": "<anonymous-schema-105>"
          }
        }
      }
    },
    "updateUserRoleInPixeAndChildrens": {
      "description": "[Pixe] Обновление роли пользователя в пикселе и его потомках\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendUpdateUserRoleInPixeAndChildrensRequest",
        "summary": "Отправка запроса на обновление роли пользователя в пикселе и его потомках",
        "message": {
          "name": "UpdateUserRoleInPixeAndChildrensRequest",
          "summary": "Запрос на обновление роли пользователя в пикселе и его потомках",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "user"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-109>"
              },
              "user": {
                "type": "object",
                "required": [
                  "id",
                  "role"
                ],
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Уникальный идентификатор пользователя",
                    "x-parser-schema-id": "<anonymous-schema-111>"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "root",
                      "creator",
                      "admin",
                      "moderator",
                      "user",
                      "guest",
                      "spectator",
                      "developer",
                      "removed"
                    ],
                    "description": "Новая роль пользователя",
                    "x-parser-schema-id": "<anonymous-schema-112>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-110>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-108>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateUserRoleInPixeAndChildrensResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "UpdateUserRoleInPixeAndChildrensResponse",
          "summary": "Ответ с данными обновленных пикселей",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-114>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-115>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-116>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-113>"
          }
        }
      }
    },
    "moveWidgetToPixe": {
      "description": "[Pixe] Перемещение виджета из одного пикселя в другой\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`\n",
      "publish": {
        "operationId": "sendMoveWidgetToPixeRequest",
        "summary": "Отправка запроса на перемещение виджета между пикселями",
        "message": {
          "name": "MoveWidgetToPixeRequest",
          "summary": "Запрос на перемещение виджета между пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "sourceId",
              "targetId",
              "widgetId"
            ],
            "properties": {
              "sourceId": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя, из которого перемещается виджет",
                "x-parser-schema-id": "<anonymous-schema-118>"
              },
              "targetId": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя, в который перемещается виджет",
                "x-parser-schema-id": "<anonymous-schema-119>"
              },
              "widgetId": {
                "type": "string",
                "description": "Уникальный идентификатор перемещаемого виджета",
                "x-parser-schema-id": "<anonymous-schema-120>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-117>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveMoveWidgetToPixeResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "MoveWidgetToPixeResponse",
          "summary": "Ответ с обновленными пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-122>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-123>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-124>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-121>"
          }
        }
      }
    },
    "moveUserToPixe": {
      "description": "[Pixe] Перемещение пользователя из одного пикселя в другой\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendMoveUserToPixeRequest",
        "summary": "Отправка запроса на перемещение пользователя между пикселями",
        "message": {
          "name": "MoveUserToPixeRequest",
          "summary": "Запрос на перемещение пользователя между пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "sourceId",
              "targetId",
              "userId"
            ],
            "properties": {
              "sourceId": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя, из которого перемещается пользователь",
                "x-parser-schema-id": "<anonymous-schema-126>"
              },
              "targetId": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя, в который перемещается пользователь",
                "x-parser-schema-id": "<anonymous-schema-127>"
              },
              "userId": {
                "type": "integer",
                "description": "Уникальный идентификатор пользователя",
                "x-parser-schema-id": "<anonymous-schema-128>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-125>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveMoveUserToPixeResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "MoveUserToPixeResponse",
          "summary": "Ответ с обновленными пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-130>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-131>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-132>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-129>"
          }
        }
      }
    },
    "addUserFromPixe": {
      "description": "[Pixe] Добавление пользователя в указанный пиксель\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendAddUserFromPixeRequest",
        "summary": "Отправка запроса на добавление пользователя в пиксель",
        "message": {
          "name": "AddUserFromPixeRequest",
          "summary": "Запрос на добавление пользователя в пиксель",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "userId"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя, в который добавляется пользователь",
                "x-parser-schema-id": "<anonymous-schema-134>"
              },
              "user": {
                "type": "object",
                "required": [
                  "id",
                  "role"
                ],
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Уникальный идентификатор пользователя",
                    "x-parser-schema-id": "<anonymous-schema-136>"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "root",
                      "creator",
                      "admin",
                      "moderator",
                      "user",
                      "guest",
                      "spectator",
                      "developer",
                      "removed"
                    ],
                    "description": "Роль пользователя",
                    "x-parser-schema-id": "<anonymous-schema-137>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-135>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-133>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveAddUserFromPixeResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "AddUserFromPixeResponse",
          "summary": "Ответ с обновленными пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-139>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-140>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-141>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-138>"
          }
        }
      }
    },
    "addUserToPixeAndChildrens": {
      "description": "[Pixe] Добавление пользователя в пиксель и его дочерние пиксели\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendAddUserToPixeAndChildrensRequest",
        "summary": "Отправка запроса на добавление пользователя в пиксель и его дочерние пиксели",
        "message": {
          "name": "AddUserToPixeAndChildrensRequest",
          "summary": "Запрос на добавление пользователя в пиксель и его дочерние пиксели",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "user"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-143>"
              },
              "user": {
                "type": "object",
                "required": [
                  "id",
                  "role"
                ],
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Уникальный идентификатор пользователя",
                    "x-parser-schema-id": "<anonymous-schema-145>"
                  },
                  "role": {
                    "type": "string",
                    "enum": [
                      "root",
                      "creator",
                      "admin",
                      "moderator",
                      "user",
                      "guest",
                      "spectator",
                      "developer",
                      "removed"
                    ],
                    "description": "Роль пользователя",
                    "x-parser-schema-id": "<anonymous-schema-146>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-144>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-142>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveAddUserToPixeAndChildrensResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "AddUserToPixeAndChildrensResponse",
          "summary": "Ответ с данными обновленных пикселей",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-148>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-149>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-150>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-147>"
          }
        }
      }
    },
    "removeUserFromPixe": {
      "description": "[Pixe] Удаление пользователя из указанного пикселя\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendRemoveUserFromPixeRequest",
        "summary": "Отправка запроса на удаление пользователя из пикселя",
        "message": {
          "name": "RemoveUserFromPixeRequest",
          "summary": "Запрос на удаление пользователя из пикселя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "userId"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-152>"
              },
              "userId": {
                "type": "integer",
                "description": "Уникальный идентификатор пользователя",
                "x-parser-schema-id": "<anonymous-schema-153>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-151>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveRemoveUserFromPixeResponse",
        "summary": "Получение ответа с обновленными пикселями",
        "message": {
          "name": "RemoveUserFromPixeResponse",
          "summary": "Ответ с обновленными пикселями",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-155>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-156>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
                "description": "Массив обновленных пикселей",
                "x-parser-schema-id": "<anonymous-schema-157>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-154>"
          }
        }
      }
    },
    "removeUserFromPixeAndChildrens": {
      "description": "[Pixe] Удаление пользователя из пикселя и его дочерних пикселей\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendRemoveUserFromPixeAndChildrensRequest",
        "summary": "Запрос на удаление пользователя из пикселя и его дочерних пикселей",
        "message": {
          "name": "RemoveUserFromPixeAndChildrensRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "userId"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-159>"
              },
              "userId": {
                "type": "integer",
                "description": "Уникальный идентификатор пользователя",
                "x-parser-schema-id": "<anonymous-schema-160>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-158>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveRemoveUserFromPixeAndChildrensResponse",
        "summary": "Ответ с обновленными пикселями",
        "message": {
          "name": "RemoveUserFromPixeAndChildrensResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-161>"
          }
        }
      }
    },
    "hidePixeAndChildrensToOldParent": {
      "description": "[Pixe] Скрытие пикселя и передача детей старому родителю\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[ro]`.\n",
      "publish": {
        "operationId": "sendHidePixeAndChildrensToOldParentRequest",
        "summary": "Запрос на скрытие пикселя и передачу детей старому родителю",
        "message": {
          "name": "HidePixeAndChildrensToOldParentRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-163>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-162>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveHidePixeAndChildrensToOldParentResponse",
        "summary": "Ответ с обновленными пикселями",
        "message": {
          "name": "HidePixeAndChildrensToOldParentResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-164>"
          }
        }
      }
    },
    "hidePixeAndChildrens": {
      "description": "[Pixe] Скрытие пикселя и его дочерних пикселей\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendHidePixeAndChildrensRequest",
        "summary": "Запрос на скрытие пикселя и его дочерних пикселей",
        "message": {
          "name": "HidePixeAndChildrensRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-166>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-165>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveHidePixeAndChildrensResponse",
        "summary": "Ответ с обновленными пикселями",
        "message": {
          "name": "HidePixeAndChildrensResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-167>"
          }
        }
      }
    },
    "getCompanies": {
      "description": "[Pixe] Получение всех компаний\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetCompaniesRequest",
        "summary": "Запрос на получение списка компаний",
        "message": {
          "name": "GetCompaniesRequest",
          "contentType": "application/json",
          "payload": {
            "x-parser-schema-id": "<anonymous-schema-168>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetCompaniesResponse",
        "summary": "Ответ с данными компаний",
        "message": {
          "name": "GetCompaniesResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-169>"
          }
        }
      }
    },
    "getMapPixesWithMinMaxDepth": {
      "description": "[Pixe] Получение карты пикселей с фильтрацией по глубине\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetMapPixesWithMinMaxDepthRequest",
        "summary": "Запрос на получение карты пикселей с учетом глубины",
        "message": {
          "name": "GetMapPixesWithMinMaxDepthRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "mapDepth",
              "minDepth"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор компании",
                "x-parser-schema-id": "<anonymous-schema-171>"
              },
              "mapDepth": {
                "type": "integer",
                "description": "Максимальная глубина",
                "x-parser-schema-id": "<anonymous-schema-172>"
              },
              "minDepth": {
                "type": "integer",
                "description": "Минимальная глубина",
                "x-parser-schema-id": "<anonymous-schema-173>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-170>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetMapPixesWithMinMaxDepthResponse",
        "summary": "Ответ с картой пикселей",
        "message": {
          "name": "GetMapPixesWithMinMaxDepthResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-174>"
          }
        }
      }
    },
    "getMapPixes": {
      "description": "[Pixe] Получение полной карты пикселей компании\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetMapPixesRequest",
        "summary": "Запрос на получение карты пикселей компании",
        "message": {
          "name": "GetMapPixesRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор компании",
                "x-parser-schema-id": "<anonymous-schema-176>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-175>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetMapPixesResponse",
        "summary": "Ответ с картой пикселей",
        "message": {
          "name": "GetMapPixesResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-177>"
          }
        }
      }
    },
    "updateParentFromPixe": {
      "description": "[Pixe] Изменение родительского пикселя\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendUpdateParentFromPixeRequest",
        "summary": "Запрос на изменение родителя пикселя",
        "message": {
          "name": "UpdateParentFromPixeRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "parentId"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-179>"
              },
              "parentId": {
                "type": "string",
                "description": "Уникальный идентификатор нового родительского пикселя",
                "x-parser-schema-id": "<anonymous-schema-180>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-178>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateParentFromPixeResponse",
        "summary": "Ответ с обновленным пикселем",
        "message": {
          "name": "UpdateParentFromPixeResponse",
          "contentType": "application/json",
          "payload": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]"
        }
      }
    },
    "updateParentAndChildrensToOldParent": {
      "description": "[Pixe] Изменение родителя пикселя и передача детей старому родителю\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendUpdateParentAndChildrensToOldParentRequest",
        "summary": "Запрос на изменение родителя пикселя и передачу детей старому родителю",
        "message": {
          "name": "UpdateParentAndChildrensToOldParentRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "parentId"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-182>"
              },
              "parentId": {
                "type": "string",
                "description": "Уникальный идентификатор нового родительского пикселя",
                "x-parser-schema-id": "<anonymous-schema-183>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-181>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateParentAndChildrensToOldParentResponse",
        "summary": "Ответ с обновленными пикселями",
        "message": {
          "name": "UpdateParentAndChildrensToOldParentResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-184>"
          }
        }
      }
    },
    "updateNamePixe": {
      "description": "[Pixe] Изменение названия пикселя\n- Основная роль пользователя (`user.role`) — `[root, user]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendUpdateNamePixeRequest",
        "summary": "Запрос на изменение названия пикселя",
        "message": {
          "name": "UpdateNamePixeRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id",
              "name"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-186>"
              },
              "name": {
                "type": "string",
                "description": "Новое название пикселя",
                "x-parser-schema-id": "<anonymous-schema-187>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-185>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveUpdateNamePixeResponse",
        "summary": "Ответ с обновленным названием пикселя",
        "message": {
          "name": "UpdateNamePixeResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
            "x-parser-schema-id": "<anonymous-schema-188>"
          }
        }
      }
    },
    "getUsersPixe": {
      "description": "[Pixe, User] Получение пользователей, связанных с пикселем\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n- Роль пользователя в пикселе (`pixe.users.role`) — `[root, admin, user, widget]`.\n",
      "publish": {
        "operationId": "sendGetUsersPixeRequest",
        "summary": "Запрос на получение пользователей пикселя",
        "message": {
          "name": "GetUsersPixeRequest",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Уникальный идентификатор пикселя",
                "x-parser-schema-id": "<anonymous-schema-190>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-189>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetUsersPixeResponse",
        "summary": "Ответ с данными пользователей",
        "message": {
          "name": "GetUsersPixeResponse",
          "contentType": "application/json",
          "payload": {
            "type": "array",
            "items": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data",
            "x-parser-schema-id": "<anonymous-schema-191>"
          }
        }
      }
    },
    "getUserByPhone": {
      "description": "[User] Получение пользователя по номеру телефона\n- Основная роль пользователя (`user.role`) — `[root]`.\n",
      "publish": {
        "operationId": "sendGetUserByPhoneRequest",
        "summary": "Отправка запроса на получение пользователя по номеру телефона",
        "message": {
          "name": "GetUserByPhoneRequest",
          "summary": "Запрос на получение пользователя по номеру телефона",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "phone"
            ],
            "properties": {
              "phone": {
                "type": "string",
                "description": "Номер телефона пользователя",
                "x-parser-schema-id": "<anonymous-schema-193>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-192>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveGetUserByPhoneResponse",
        "summary": "Получение ответа с данными пользователя",
        "message": {
          "name": "GetUserByPhoneResponse",
          "summary": "Ответ с данными пользователя",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "x-parser-schema-id": "<anonymous-schema-195>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "x-parser-schema-id": "<anonymous-schema-196>"
              },
              "data": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data"
            },
            "x-parser-schema-id": "<anonymous-schema-194>"
          }
        }
      }
    },
    "searchWidgetByName": {
      "description": "[User] Поиск виджетов по имени\n- Основная роль пользователя (`user.role`) — `[root, user, widget]`.\n",
      "publish": {
        "operationId": "sendSearchWidgetByNameRequest",
        "summary": "Отправка запроса на поиск виджетов по имени",
        "message": {
          "name": "SearchWidgetByNameRequest",
          "summary": "Запрос на поиск виджетов по имени",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "name"
            ],
            "properties": {
              "name": {
                "type": "string",
                "description": "Имя для поиска виджетов",
                "example": "exampleWidget",
                "x-parser-schema-id": "<anonymous-schema-198>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-197>"
          }
        }
      },
      "subscribe": {
        "operationId": "receiveSearchWidgetByNameResponse",
        "summary": "Получение ответа с данными виджетов",
        "message": {
          "name": "SearchWidgetByNameResponse",
          "summary": "Ответ с данными виджетов",
          "contentType": "application/json",
          "payload": {
            "type": "object",
            "required": [
              "status",
              "error",
              "data"
            ],
            "properties": {
              "status": {
                "type": "integer",
                "description": "HTTP-статус ответа",
                "example": 200,
                "x-parser-schema-id": "<anonymous-schema-200>"
              },
              "error": {
                "type": "string",
                "nullable": true,
                "description": "Сообщение об ошибке",
                "example": "",
                "x-parser-schema-id": "<anonymous-schema-201>"
              },
              "data": {
                "type": "array",
                "items": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data",
                "description": "Массив пользователей, связанных с виджетами",
                "x-parser-schema-id": "<anonymous-schema-202>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-199>"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "RoleAccess": {
        "type": "http",
        "scheme": "bearer",
        "description": "Валидация пользователя по его роли в API (`user.role`) и роли в пикселе (`pixe.users.role`).\n"
      }
    },
    "messages": {
      "GetPixeByIdRequest": "$ref:$.channels.getPixeById.publish.message",
      "GetPixeByIdResponse": "$ref:$.channels.getPixeById.subscribe.message",
      "CreateWidgetRequest": "$ref:$.channels.createWidget.publish.message",
      "CreateWidgetResponse": "$ref:$.channels.createWidget.subscribe.message",
      "CreateUserRequest": "$ref:$.channels.createUser.publish.message",
      "CreateUserResponse": "$ref:$.channels.createUser.subscribe.message",
      "GetUserByIdRequest": "$ref:$.channels.getUserById.publish.message",
      "GetUserByIdResponse": "$ref:$.channels.getUserById.subscribe.message",
      "GetUsersByIdsRequest": "$ref:$.channels.getUsersByIds.publish.message",
      "GetUsersByIdsResponse": "$ref:$.channels.getUsersByIds.subscribe.message",
      "UpdateUserInfoRequest": "$ref:$.channels.updateUserInfo.publish.message",
      "UpdateUserInfoResponse": "$ref:$.channels.updateUserInfo.subscribe.message",
      "CreateChildrenRequest": "$ref:$.channels.createChildren.publish.message",
      "CreateChildrenResponse": "$ref:$.channels.createChildren.subscribe.message",
      "CreateCompanyRequest": "$ref:$.channels.createCompany.publish.message",
      "CreateCompanyResponse": "$ref:$.channels.createCompany.subscribe.message",
      "UpdateUserRoleFromPixeRequest": "$ref:$.channels.updateUserRoleFromPixe.publish.message",
      "UpdateUserRoleFromPixeResponse": "$ref:$.channels.updateUserRoleFromPixe.subscribe.message",
      "UpdateUserRoleInPixeAndChildrensRequest": "$ref:$.channels.updateUserRoleInPixeAndChildrens.publish.message",
      "UpdateUserRoleInPixeAndChildrensResponse": "$ref:$.channels.updateUserRoleInPixeAndChildrens.subscribe.message",
      "MoveWidgetToPixeRequest": "$ref:$.channels.moveWidgetToPixe.publish.message",
      "MoveWidgetToPixeResponse": "$ref:$.channels.moveWidgetToPixe.subscribe.message",
      "MoveUserToPixeRequest": "$ref:$.channels.moveUserToPixe.publish.message",
      "MoveUserToPixeResponse": "$ref:$.channels.moveUserToPixe.subscribe.message",
      "AddUserFromPixeRequest": "$ref:$.channels.addUserFromPixe.publish.message",
      "AddUserFromPixeResponse": "$ref:$.channels.addUserFromPixe.subscribe.message",
      "AddUserToPixeAndChildrensRequest": "$ref:$.channels.addUserToPixeAndChildrens.publish.message",
      "AddUserToPixeAndChildrensResponse": "$ref:$.channels.addUserToPixeAndChildrens.subscribe.message",
      "RemoveUserFromPixeRequest": "$ref:$.channels.removeUserFromPixe.publish.message",
      "RemoveUserFromPixeResponse": "$ref:$.channels.removeUserFromPixe.subscribe.message",
      "RemoveUserFromPixeAndChildrensRequest": "$ref:$.channels.removeUserFromPixeAndChildrens.publish.message",
      "RemoveUserFromPixeAndChildrensResponse": "$ref:$.channels.removeUserFromPixeAndChildrens.subscribe.message",
      "HidePixeAndChildrensToOldParentRequest": "$ref:$.channels.hidePixeAndChildrensToOldParent.publish.message",
      "HidePixeAndChildrensToOldParentResponse": "$ref:$.channels.hidePixeAndChildrensToOldParent.subscribe.message",
      "HidePixeAndChildrensRequest": "$ref:$.channels.hidePixeAndChildrens.publish.message",
      "HidePixeAndChildrensResponse": "$ref:$.channels.hidePixeAndChildrens.subscribe.message",
      "GetCompaniesRequest": "$ref:$.channels.getCompanies.publish.message",
      "GetCompaniesResponse": "$ref:$.channels.getCompanies.subscribe.message",
      "GetMapPixesWithMinMaxDepthRequest": "$ref:$.channels.getMapPixesWithMinMaxDepth.publish.message",
      "GetMapPixesWithMinMaxDepthResponse": "$ref:$.channels.getMapPixesWithMinMaxDepth.subscribe.message",
      "GetMapPixesRequest": "$ref:$.channels.getMapPixes.publish.message",
      "GetMapPixesResponse": "$ref:$.channels.getMapPixes.subscribe.message",
      "UpdateParentFromPixeRequest": "$ref:$.channels.updateParentFromPixe.publish.message",
      "UpdateParentFromPixeResponse": "$ref:$.channels.updateParentFromPixe.subscribe.message",
      "UpdateParentAndChildrensToOldParentRequest": "$ref:$.channels.updateParentAndChildrensToOldParent.publish.message",
      "UpdateParentAndChildrensToOldParentResponse": "$ref:$.channels.updateParentAndChildrensToOldParent.subscribe.message",
      "UpdateNamePixeRequest": "$ref:$.channels.updateNamePixe.publish.message",
      "UpdateNamePixeResponse": "$ref:$.channels.updateNamePixe.subscribe.message",
      "GetUsersPixeRequest": "$ref:$.channels.getUsersPixe.publish.message",
      "GetUsersPixeResponse": "$ref:$.channels.getUsersPixe.subscribe.message",
      "GetUserByPhoneRequest": "$ref:$.channels.getUserByPhone.publish.message",
      "GetUserByPhoneResponse": "$ref:$.channels.getUserByPhone.subscribe.message",
      "SearchWidgetByNameRequest": "$ref:$.channels.searchWidgetByName.publish.message",
      "SearchWidgetByNameResponse": "$ref:$.channels.searchWidgetByName.subscribe.message"
    },
    "schemas": {
      "User": "$ref:$.channels.createWidget.subscribe.message.payload.properties.data",
      "Pixe": "$ref:$.channels.getPixeById.subscribe.message.payload.properties.data.oneOf[0]",
      "ApiResponse": {
        "type": "object",
        "required": [
          "status",
          "error",
          "data"
        ],
        "properties": {
          "status": {
            "type": "integer",
            "description": "HTTP-статус ответа",
            "example": 200,
            "x-parser-schema-id": "<anonymous-schema-203>"
          },
          "error": {
            "type": "string",
            "nullable": true,
            "description": "Сообщение об ошибке (пустая строка, если ошибки нет)",
            "example": "",
            "x-parser-schema-id": "<anonymous-schema-204>"
          },
          "data": {
            "type": "object",
            "nullable": true,
            "description": "Данные ответа (null, если данных нет)",
            "example": null,
            "x-parser-schema-id": "<anonymous-schema-205>"
          }
        },
        "x-parser-schema-id": "ApiResponse"
      }
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":true},"sidebar":{"showOperations":"byDefault"}};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  