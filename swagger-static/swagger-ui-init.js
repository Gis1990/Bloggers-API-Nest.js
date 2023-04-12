
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/blogger/blogs/comments": {
        "get": {
          "operationId": "getAllCommentsForAllPostsForBloggersBlogs",
          "summary": "Returns all comments for all posts inside all current user blogs",
          "parameters": [
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "schema": {
                "default": "createdAt",
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "schema": {
                "default": "desc",
                "enum": [
                  "asc",
                  "desc"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CommentViewModelForBloggerPaginationClass"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/blogs/{id}": {
        "put": {
          "operationId": "updateBlog",
          "summary": "Update existing Blog by id with InputModel",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InputModelForUpdatingBlog"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No content"
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/APIErrorResult"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Blogs"
          ]
        },
        "delete": {
          "operationId": "deleteBlog",
          "summary": "Delete blog specified by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "No content"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/blogs": {
        "post": {
          "operationId": "createBlog",
          "summary": "Create new blog",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InputModelForCreatingBlog"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Returns the newly created blog",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogViewModelClass"
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/APIErrorResult"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Blogs"
          ]
        },
        "get": {
          "operationId": "getAllBlogs",
          "summary": "Returns blogs (for which current user is owner) with paging",
          "parameters": [
            {
              "name": "searchNameTerm",
              "required": false,
              "in": "query",
              "description": "The search term for a name",
              "schema": {
                "default": null,
                "type": "string"
              }
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "schema": {
                "default": "createdAt",
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "schema": {
                "default": "desc",
                "enum": [
                  "asc",
                  "desc"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogViewModelClassPagination"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/blogs/{id}/posts": {
        "post": {
          "operationId": "createNewPostForSpecificBlog",
          "summary": "Create new post for specific blog",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InputModelForCreatingAndUpdatingNewPostForSpecificBlog"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Returns the newly created post",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PostViewModelClass"
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/APIErrorResult"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "If user try to add post to blog that doesn't belong to current user"
            },
            "404": {
              "description": "If specific blog doesn't exists"
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/blogs/{blogId}/posts/{postId}": {
        "put": {
          "operationId": "updatePostForSpecificBlog",
          "summary": "Update existing post by id with InputModel",
          "parameters": [
            {
              "name": "postId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "blogId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InputModelForCreatingAndUpdatingNewPostForSpecificBlog"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No content"
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/APIErrorResult"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "If user try to update post that belongs to blog that doesn't belong to current user"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Blogs"
          ]
        },
        "delete": {
          "operationId": "deletePost",
          "summary": "Delete post specified by id",
          "parameters": [
            {
              "name": "postId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "blogId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "No content"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "If user try to update post that belongs to blog that doesn't belong to current user"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/users/{id}/ban": {
        "put": {
          "operationId": "banUnbanUserByBloggerForBlog",
          "summary": "Ban/unban user",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "User Id that should be banned",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InputModelForBanUnbanUserByBloggerForBlog"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "No content"
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/APIErrorResult"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/blogger/users/blog/{id}": {
        "get": {
          "operationId": "GetAllBannedUsersForBlog",
          "summary": "Returns all banned users for blog",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchLoginTerm",
              "required": false,
              "in": "query",
              "description": "The search term for a login",
              "schema": {
                "default": null,
                "type": "string"
              }
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "schema": {
                "default": "createdAt",
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "schema": {
                "default": "desc",
                "enum": [
                  "asc",
                  "desc"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserViewModelForBannedUsersByBloggerPaginationClass"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/blogger/blogs/{id}/images/wallpaper": {
        "get": {
          "operationId": "getImage",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Blogs"
          ]
        },
        "post": {
          "operationId": "uploadMainImageForBlog",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      },
      "/blogger/blogs/{blogId}/posts/{postId}/images/main": {
        "post": {
          "operationId": "uploadMainImageForPost",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Blogs"
          ]
        }
      }
    },
    "info": {
      "title": "Bloggers API",
      "description": "The Bloggers API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "OwnerInfoClass": {
          "type": "object",
          "properties": {
            "userId": {
              "type": "string",
              "example": "48aefe41-9588-4e8e-ac31-5881a374619c",
              "description": "The unique identifier for the user"
            },
            "userLogin": {
              "type": "string",
              "example": "user1",
              "description": "The username for the user"
            }
          },
          "required": [
            "userId",
            "userLogin"
          ]
        },
        "PostInfoClass": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "4c441388-5f49-428e-98c9-f32b05a8c3e0",
              "description": "The unique identifier for the post"
            },
            "title": {
              "type": "string",
              "example": "My post",
              "description": "The title of the post"
            },
            "blogId": {
              "type": "string",
              "example": "ca5e701d-7874-4e9f-834f-2f9e0318c1fc",
              "description": "The unique identifier for the blog that the post belongs to"
            },
            "blogName": {
              "type": "string",
              "example": "My Blog",
              "description": "The name of the blog that the post belongs to"
            }
          },
          "required": [
            "id",
            "title",
            "blogId",
            "blogName"
          ]
        },
        "CommentViewModelForBloggerClass": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "d55d0c31-1582-4b5e-9e3b-08204f034d95",
              "description": "The unique identifier for the comment"
            },
            "content": {
              "type": "string",
              "example": "This is a comment",
              "description": "The content of the comment"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "example": "2023-04-12T15:31:16.192Z",
              "description": "The date and time the comment was created"
            },
            "commentatorInfo": {
              "description": "Information about the commentator",
              "allOf": [
                {
                  "$ref": "#/components/schemas/OwnerInfoClass"
                }
              ]
            },
            "postInfo": {
              "description": "Information about the post the comment was made on",
              "allOf": [
                {
                  "$ref": "#/components/schemas/PostInfoClass"
                }
              ]
            }
          },
          "required": [
            "id",
            "content",
            "createdAt",
            "commentatorInfo",
            "postInfo"
          ]
        },
        "CommentViewModelForBloggerPaginationClass": {
          "type": "object",
          "properties": {
            "pagesCount": {
              "type": "number",
              "example": 5,
              "description": "The total number of pages"
            },
            "page": {
              "type": "number",
              "example": 1,
              "description": "The current page number"
            },
            "pageSize": {
              "type": "number",
              "example": 10,
              "description": "The number of items per page"
            },
            "totalCount": {
              "type": "number",
              "example": 50,
              "description": "The total number of items across all pages"
            },
            "items": {
              "description": "The array of comments on the current page",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CommentViewModelForBloggerClass"
              }
            }
          },
          "required": [
            "pagesCount",
            "page",
            "pageSize",
            "totalCount",
            "items"
          ]
        },
        "InputModelForUpdatingBlog": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "maxLength": 15
            },
            "description": {
              "type": "string",
              "maxLength": 500
            },
            "websiteUrl": {
              "type": "string",
              "example": "https://www.somesite.com/",
              "maxLength": 100,
              "pattern": "/^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$/"
            }
          },
          "required": [
            "name",
            "description",
            "websiteUrl"
          ]
        },
        "FieldError": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "description": "Message with error explanation for certain field",
              "nullable": true
            },
            "field": {
              "type": "string",
              "description": "What field/property of input model has error",
              "nullable": true
            }
          },
          "required": [
            "message",
            "field"
          ]
        },
        "APIErrorResult": {
          "type": "object",
          "properties": {
            "errorsMessages": {
              "description": "Array of error messages for specific fields/properties of input model",
              "nullable": true,
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/FieldError"
              }
            }
          },
          "required": [
            "errorsMessages"
          ]
        },
        "InputModelForCreatingBlog": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "maxLength": 15
            },
            "description": {
              "type": "string",
              "maxLength": 500
            },
            "websiteUrl": {
              "type": "string",
              "example": "https://www.somesite.com/",
              "maxLength": 100,
              "pattern": "/^https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$/"
            }
          },
          "required": [
            "name",
            "description",
            "websiteUrl"
          ]
        },
        "ImagesForBlogsClass": {
          "type": "object",
          "properties": {
            "main": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/"
              }
            },
            "wallpaper": {
              "$ref": "#/components/schemas/"
            }
          },
          "required": [
            "main",
            "wallpaper"
          ]
        },
        "BlogViewModelClass": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "f76f6679-bda8-4173-9305-a38f153ad1b8",
              "description": "The Id of the blog"
            },
            "name": {
              "type": "string",
              "description": "The name of the blog",
              "maxLength": 15
            },
            "description": {
              "type": "string",
              "description": "The description of the blog",
              "maxLength": 500
            },
            "websiteUrl": {
              "type": "string",
              "example": "https://www.myblog.com",
              "description": "The website URL of the blog"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "example": "2023-04-12T15:31:16.167Z",
              "description": "The date and time the blog was created"
            },
            "isMembership": {
              "type": "boolean",
              "example": true,
              "description": "Whether the user is a member or not"
            },
            "images": {
              "description": "Images for blog",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ImagesForBlogsClass"
                }
              ]
            }
          },
          "required": [
            "id",
            "name",
            "description",
            "websiteUrl",
            "createdAt",
            "isMembership",
            "images"
          ]
        },
        "InputModelForCreatingAndUpdatingNewPostForSpecificBlog": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "The title of the post",
              "maxLength": 30
            },
            "shortDescription": {
              "type": "string",
              "description": "The short description of the post",
              "maxLength": 100
            },
            "content": {
              "type": "string",
              "description": "The content of the post",
              "maxLength": 1000
            }
          },
          "required": [
            "title",
            "shortDescription",
            "content"
          ]
        },
        "NewestLikesClass": {
          "type": "object",
          "properties": {
            "addedAt": {
              "format": "date-time",
              "type": "string",
              "example": "2023-04-12T15:31:16.069Z",
              "description": "The date and time the like was added"
            },
            "userId": {
              "type": "string",
              "example": "d4aecdc0-6e50-493c-83b9-7df602dc01c6",
              "description": "The ID of the user who added the like"
            },
            "login": {
              "type": "string",
              "description": "The login of the user who added the like"
            }
          },
          "required": [
            "addedAt",
            "userId",
            "login"
          ]
        },
        "ExtendedLikesInfoClass": {
          "type": "object",
          "properties": {
            "likesCount": {
              "type": "number",
              "example": 10,
              "description": "The number of likes received by the comment or post"
            },
            "dislikesCount": {
              "type": "number",
              "example": 2,
              "description": "The number of dislikes received by the comment or post"
            },
            "myStatus": {
              "type": "string",
              "example": "None",
              "description": "The status of the current user in relation to the comment or post (e.g. \"Liked\", \"Disliked\", \"None\")",
              "enum": [
                "Liked",
                "Disliked",
                "None"
              ]
            },
            "newestLikes": {
              "description": "The newest likes received by the post",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/NewestLikesClass"
              }
            }
          },
          "required": [
            "likesCount",
            "dislikesCount",
            "myStatus",
            "newestLikes"
          ]
        },
        "ImagesForPostsClass": {
          "type": "object",
          "properties": {
            "main": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/"
              }
            }
          },
          "required": [
            "main"
          ]
        },
        "PostViewModelClass": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "6d91d370-8678-4534-b726-b8f4b26fef7c",
              "description": "The ID of the post"
            },
            "title": {
              "type": "string",
              "description": "The title of the post"
            },
            "shortDescription": {
              "type": "string",
              "description": "The short description of the post"
            },
            "content": {
              "type": "string",
              "description": "The content of the post"
            },
            "blogId": {
              "type": "string",
              "example": "babe8562-08b1-45d8-9124-ede6784a40fd",
              "description": "The ID of the blog that the post belongs to"
            },
            "blogName": {
              "type": "string",
              "description": "The name of the blog that the post belongs to"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "example": "2023-04-12T15:31:16.137Z",
              "description": "The date and time the post was created"
            },
            "extendedLikesInfo": {
              "description": "Information about the likes received by the post",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ExtendedLikesInfoClass"
                }
              ]
            },
            "images": {
              "description": "Images for post",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ImagesForPostsClass"
                }
              ]
            }
          },
          "required": [
            "id",
            "title",
            "shortDescription",
            "content",
            "blogId",
            "blogName",
            "createdAt",
            "extendedLikesInfo",
            "images"
          ]
        },
        "BlogViewModelClassPagination": {
          "type": "object",
          "properties": {
            "pagesCount": {
              "type": "integer",
              "example": 5,
              "description": "The total number of pages",
              "format": "int32"
            },
            "page": {
              "type": "integer",
              "example": 1,
              "description": "The current page number",
              "format": "int32"
            },
            "pageSize": {
              "type": "integer",
              "example": 10,
              "description": "The number of items per page",
              "format": "int32"
            },
            "totalCount": {
              "type": "integer",
              "example": 50,
              "description": "The total number of items across all pages",
              "format": "int32"
            },
            "items": {
              "description": "The array of comments on the current page",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/BlogViewModelClass"
              }
            }
          },
          "required": [
            "pagesCount",
            "page",
            "pageSize",
            "totalCount",
            "items"
          ]
        },
        "InputModelForBanUnbanUserByBloggerForBlog": {
          "type": "object",
          "properties": {
            "isBanned": {
              "type": "boolean",
              "example": true,
              "description": "Specifies if the user is banned or not"
            },
            "banReason": {
              "type": "string",
              "description": "The reason why the user was banned",
              "maxLength": 20
            },
            "blogId": {
              "type": "string",
              "description": "BlogId Id that should be banned"
            }
          },
          "required": [
            "isBanned",
            "banReason",
            "blogId"
          ]
        },
        "BanInfoClass": {
          "type": "object",
          "properties": {
            "isBanned": {
              "type": "boolean",
              "example": true,
              "description": "Specifies if the user is banned or not"
            },
            "banDate": {
              "format": "date-time",
              "type": "string",
              "description": "nullable: true"
            },
            "banReason": {
              "type": "string",
              "description": "nullable: true"
            }
          },
          "required": [
            "isBanned"
          ]
        },
        "UserViewModelForBannedUsersByBloggerClass": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "aed1e875-6292-41c7-a5ff-b7e02757c8e5",
              "description": "The Id of the user"
            },
            "login": {
              "type": "string",
              "description": "The login of the user"
            },
            "banInfo": {
              "description": "Information about the user ban",
              "allOf": [
                {
                  "$ref": "#/components/schemas/BanInfoClass"
                }
              ]
            }
          },
          "required": [
            "id",
            "login",
            "banInfo"
          ]
        },
        "UserViewModelForBannedUsersByBloggerPaginationClass": {
          "type": "object",
          "properties": {
            "pagesCount": {
              "type": "integer",
              "example": 5,
              "description": "The total number of pages",
              "format": "int32"
            },
            "page": {
              "type": "integer",
              "example": 1,
              "description": "The current page number",
              "format": "int32"
            },
            "pageSize": {
              "type": "integer",
              "example": 10,
              "description": "The number of items per page",
              "format": "int32"
            },
            "totalCount": {
              "type": "integer",
              "example": 50,
              "description": "The total number of items across all pages",
              "format": "int32"
            },
            "items": {
              "description": "The array of comments on the current page",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/UserViewModelForBannedUsersByBloggerClass"
              }
            }
          },
          "required": [
            "pagesCount",
            "page",
            "pageSize",
            "totalCount",
            "items"
          ]
        }
      }
    }
  },
  "customOptions": {
    "urls": [
      {
        "url": "http://localhost:500/swagger-json",
        "name": "Bloggers API"
      },
      {
        "url": "http://localhost:500/swagger1-json",
        "name": "Super-admin API"
      },
      {
        "url": "http://localhost:500/swagger2-json",
        "name": "Public API"
      }
    ]
  }
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
