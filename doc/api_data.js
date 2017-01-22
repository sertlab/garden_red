define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/user/device",
    "title": "Adds a new device",
    "name": "AddDevice",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "Device",
            "description": "<p>attributes</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n\t\tmac \t\t\t: device_mac_address,\n\t\tname\t\t\t: device_name,\n\t\tmax_moist\t\t: device_max_moisture,\n\t\tmed_moist\t\t: device_med_moisture,\n\t\twater_period\t: watering_interval_to_days,\n\t\tdata_period\t\t: data_interval_to_minutes  \t\t\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Success message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{id : new_device_id}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{errorMessage: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/api/v1/user/device/:device_id",
    "title": "Gets device with id=device_id information",
    "name": "DeviceInfo",
    "group": "Device",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>Json object which contains user data</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\treports \t: report_data,\n\tmax_moist \t: device_max_moisture,\n\tmed_moist \t: device_med_moisture,\n\thistory   \t: last_watering,\n\tdata_period : watering_interval_to_days,\n\twater_period: data_interval_to_minutes}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{errorMessage: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/api/v1/user/device/:device_id",
    "title": "Edits device with id=device_id",
    "name": "EditDevice",
    "group": "Device",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "Device",
            "description": "<p>attributes</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n\t\tmac \t\t\t: device_mac_address,\n\t\tname\t\t\t: device_name,\n\t\tmax_moist\t\t: device_max_moisture,\n\t\tmed_moist\t\t: device_med_moisture,\n\t\twater_period\t: watering_interval_to_days,\n\t\tdata_period\t\t: data_interval_to_minutes  \t\t\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Success message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{newDev : new_device_vars}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{errorMessage: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "/api/v1/user",
    "title": "Gets user information",
    "name": "UserInfo",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>Json object which contains user data</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\t\n\tinfo\t:\t{\n\t\temail \t\t: USERS_EMAIL,\n\t\tusername\t: USER_USERNAME\n\t\tname\t\t: USERS_NAME,\n\t\tsurname\t\t: USERS_SURNAME,\n\t\tage\t\t\t: USERS_AGE\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{message: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/login",
    "title": "Logs user in the website",
    "name": "UserLogin",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "User",
            "description": "<p>'s username or email in the field username and password on password</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n\t\tusername : email_or_username,\n\t\tpassword : user_password\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Success message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{successMessage : SUCCESS_MESSAGE}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{errorMessage: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/v1/user/logout",
    "title": "Logs user out of the session",
    "name": "UserLogout",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Message with info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\tmessage : SUCCESS_STRING}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{errorMessage: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user",
    "title": "Sets user information",
    "name": "UserSetInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "Attributes",
            "description": "<p>to change for user</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n\t\tusername \t: username_to_change_it_with,\n\t\temail\t\t: email_to_change_it_with,\n\t\tname\t\t: name_to_change_it_with,\n\t\tsurname\t\t: surname_to_change_it_with,\n\t\tage\t\t\t: age_to_change_it_with  \t\t\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Success message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{successMessage : SUCCESS_MESSAGE}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Authorization Failed</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{message: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/signup",
    "title": "Registers user to the website",
    "name": "UserSignUp",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "Users",
            "description": "<p>' mail, username and password are mandatory. Name, surname, age are optional</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "   {\n\t\temail\t\t: USER_EMAIL,\n\t\tpassword\t: USER_PASSWORD,\n\t\tusername\t: USER_USERNAME,\n\t\tname\t\t: USER_NAME,\n\t\tsurname\t\t: USER_SURNAME,\n\t\tage\t\t\t: USER_AGE\n\t}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Success message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{successMessage : SUCCESS_MESSAGE}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>BAD REQUEST</p> "
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{message: ERROR_MESSAGE }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/api/gardenAPI.js",
    "groupTitle": "User"
  }
] });