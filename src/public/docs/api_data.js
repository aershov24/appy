define({ "api": [
  {
    "type": "get",
    "url": "/admin/addUserRoles",
    "title": "Add a user to a role",
    "name": "AddUserRoles",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/manageUsers",
    "title": "Check permissions for user manage",
    "name": "ManageUsers",
    "group": "Admin",
    "version": "0.0.0",
    "filename": "src/controllers/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/auth/linkedin",
    "title": "LinkedIn authentification",
    "name": "AuthFacebook",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/facebook",
    "title": "Facebook authentification",
    "name": "AuthFacebook",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/facebook/callback",
    "title": "Facebook authentification callback",
    "name": "AuthFacebookCallback",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/linkedin/callback",
    "title": "LinkedIn authentification callback",
    "name": "AuthLinkedInCallback",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/login",
    "title": "Get user info by token",
    "name": "AuthLogin",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/login",
    "title": "Local (username, email) authentification",
    "name": "AuthLogin",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/auth/signup",
    "title": "User signup using username, email and password",
    "name": "AuthSignup",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/authentification",
    "title": "User authentification",
    "name": "Authentification",
    "group": "Authentification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "details",
            "description": "<p>Login details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\"      : \"aershov24@gmail.com\",\n  \"password\"  : \"demo\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>User token object or error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucess-Response:",
          "content": "{\n  \"success\": true,\n  \"message\": \"User authentificated\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403",
            "description": "<p>Failed authentification info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"success\": false,\n  \"message\": \"Authentication failed. Wrong password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/api.js",
    "groupTitle": "Authentification"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/docs/main.js",
    "group": "C__Work_Appy_src_public_docs_main_js",
    "groupTitle": "C__Work_Appy_src_public_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/sendEmailWithAttachments",
    "title": "Send an email with attachments to a current user",
    "name": "SendEmailWithAttachments",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/api.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/api/sendRawEmail",
    "title": "Send raw email to a current user",
    "name": "SendRawEmail",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/api.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/api/sendWelcomeEmail",
    "title": "Send welcome email to a current user",
    "name": "SendWelcomeEmail",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/api.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/api/sendSMSMessage",
    "title": "Send SMS message to a phone number",
    "name": "SendSMSMessage",
    "group": "SMS",
    "version": "0.0.0",
    "filename": "src/controllers/api.js",
    "groupTitle": "SMS"
  },
  {
    "type": "get",
    "url": "/users/getUserInfo",
    "title": "Get user info by token",
    "name": "GetUserInfo",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/getUserInfo",
    "title": "Get user info by token",
    "name": "GetUserInfo",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/login",
    "title": "Render login page",
    "name": "UserLogin",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/logout",
    "title": "Logout from current session",
    "name": "UserLogout",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/profile",
    "title": "Render profile page",
    "name": "UserProfile",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  }
] });
