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
    "url": "/mail/sendEmailWithAttachments",
    "title": "Send an email with attachments to a current user",
    "name": "SendEmailWithAttachments",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/mail.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/mail/sendRawEmail",
    "title": "Send raw email to a current user",
    "name": "SendRawEmail",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/mail.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/mail/sendWelcomeEmail",
    "title": "Send welcome email to a current user",
    "name": "SendWelcomeEmail",
    "group": "Email",
    "version": "0.0.0",
    "filename": "src/controllers/mail.js",
    "groupTitle": "Email"
  },
  {
    "type": "get",
    "url": "/foursquare/callbacks",
    "title": "Foursquare token callback",
    "name": "Callback",
    "group": "Foursquare",
    "version": "0.0.0",
    "filename": "src/controllers/foursquare.js",
    "groupTitle": "Foursquare"
  },
  {
    "type": "get",
    "url": "/foursquare/",
    "title": "Get Foursquare token",
    "name": "GetToken",
    "group": "Foursquare",
    "version": "0.0.0",
    "filename": "src/controllers/foursquare.js",
    "groupTitle": "Foursquare"
  },
  {
    "type": "get",
    "url": "/foursquare/search",
    "title": "Search venues",
    "name": "Search",
    "group": "Foursquare",
    "version": "0.0.0",
    "filename": "src/controllers/foursquare.js",
    "groupTitle": "Foursquare"
  },
  {
    "type": "get",
    "url": "/foursquare/venue",
    "title": "Get venue's details",
    "name": "VenueDetails",
    "group": "Foursquare",
    "version": "0.0.0",
    "filename": "src/controllers/foursquare.js",
    "groupTitle": "Foursquare"
  },
  {
    "type": "get",
    "url": "/foursquare/venue/tips",
    "title": "Get venue's tips",
    "name": "VenueTips",
    "group": "Foursquare",
    "version": "0.0.0",
    "filename": "src/controllers/foursquare.js",
    "groupTitle": "Foursquare"
  },
  {
    "type": "get",
    "url": "/history/getDiff",
    "title": "Get diff between two objects from history db",
    "name": "GetDiff",
    "group": "History",
    "version": "0.0.0",
    "filename": "src/controllers/history.js",
    "groupTitle": "History"
  },
  {
    "type": "get",
    "url": "/history/getHistory/:objectId",
    "title": "Get object's history",
    "name": "GetObjectHistory",
    "group": "History",
    "version": "0.0.0",
    "filename": "src/controllers/history.js",
    "groupTitle": "History"
  },
  {
    "type": "get",
    "url": "/mail/sendSMSMessage",
    "title": "Send SMS message to a phone number",
    "name": "SendSMSMessage",
    "group": "SMS",
    "version": "0.0.0",
    "filename": "src/controllers/mail.js",
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
