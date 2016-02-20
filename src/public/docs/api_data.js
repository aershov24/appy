define({ "api": [
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
    "title": "Local (username, email) authentification",
    "name": "AuthLogin",
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
    "url": "/auth/signup",
    "title": "User signup using username, email and password",
    "name": "AuthSignup",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "src/controllers/auth.js",
    "groupTitle": "Authentication"
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
    "title": "Render profile oage",
    "name": "UserProfile",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/controllers/users.js",
    "groupTitle": "User"
  }
] });
