# stack_overflow
[![Continous Test Workflow](https://github.com/oluwatobiiloba/stack_overflow/actions/workflows/dev_stacklite-dev.yml/badge.svg)](https://github.com/oluwatobiiloba/stack_overflow/actions/workflows/dev_stacklite-dev.yml)
[![DeepScan grade](https://deepscan.io/api/teams/20281/projects/23746/branches/724603/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=20281&pid=23746&bid=724603)
[![Travis Build Status](https://app.travis-ci.com/oluwatobiiloba/stack_overflow.svg?branch=dev)](https://app.travis-ci.com/oluwatobiiloba/stack_overflow)
[![DeepSource](https://deepsource.io/gh/oluwatobiiloba/stack_overflow.svg/?label=active+issues&show_trend=true&token=z3yJ6jOpH5l6M6LtBXTwja5a)](https://deepsource.io/gh/oluwatobiiloba/stack_overflow/?ref=repository-badge)


# Stackoverflow_lite

This is a simple AI-Powered platform where users can ask and answer questions, generate answers using OpenAi Api, comment on answers, and vote answers/comments.

# Depenedencies

- [Redis Server](redis.io)
- [OpenAi](https://openai.com/)
- [Pm2](https://pm2.io/)
- [Sentry](https://sentry.io/welcome/)
- [HoneyBadger](https://www.honeybadger.io/)
- Sequelize
- MySql

# How To Install

- Clone the repository

  ```node
  git clone https://github.com/oluwatobiiloba/stack_overflow.git
  ```

- Install Dependencies

  ```node
  npm install pm2 -g
  npm install --save sequelize
  npm install --save mysql2
  ```

- Install Available Packages

  ```node
  npm install
  ```

- Setup Environment Variables and secrets, refer to `example.env` as a guide.
  
- Run Database Migrations

  ```node
  sequelize db:migrate
  ```

- run the application

  ```node
  npm run start 
  ```
  
# Testing

- Test is done using the Mocha Package.

  ```node
  npm run test
  ```
  
# Live Server

This app is hosted on Azure cloud alongside the database and the redis server.
  <https://stackoverflowlite-flw.herokuapp.com>
  
# DATABASE SCHEMA

![Database Schema](./Schema.png)

# Documentation

the base url is `/api/v1`and the main endpoints are:

- `/users`

- `/questions`

- `/answers`

- `/comments`

- `/votes`


# 📁 Postman Collection: USER

## End-point: Signup

Register Users with the provided payload.

### Method: POST
>
>```
>{{URL}}/api/v1/users/signup
>```
>
### Body (**raw**)

```json
{
        "username": "Documentation" ,
        "first_name": "Doc",
        "last_name": "Save",
        "phonenumber":"823322578",
        "email":"doc@email.com",
        "password":"password",
        "role": "1"
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "User registered",
    "data": {
        "newUser": {
            "respObj": {
                "id": 335,
                "uuid": "c2509fa1-e439-41c1-8ca5-d5bad030a045",
                "username": "Documentation",
                "first_name": "Doc",
                "last_name": "Save",
                "phonenumber": "823322578",
                "email": "doc@email.com",
                "role": "1",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM1LCJpYXQiOjE2NzYyOTcwMDMsImV4cCI6MTY3NjI5NzYwM30.uiVfPFj5AO55xfYcXztcVOSjMeRmhRP4bvDgHCI1bXA"
            }
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Sign in

User Sign-in

### Method: POST
>
>```
>{{URL}}/api/v1/users/signin
>```
>
### Body (**raw**)

```json
{
        "username": "Testreg2" ,
        "password":"password"
      
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "Logged in Succesfully",
    "token": <<token>>,
    "data": {
        "user": {
            "id": 20,
            "uuid": "492693a0-180d-45a9-a3ab-fd8d992d3db5",
            "username": "Testcollection",
            "first_name": "Test",
            "last_name": "Collection",
            "phonenumber": 823322528,
            "email": "test2@email.com",
            "role": 2,
            "stack": null,
            "nationality": null,
            "age": null,
            "sendToken": {
                "cookieOptions": {
                    "expires": "2023-02-13T14:14:27.123Z",
                    "httpOnly": false
                },
                "token": <<token>>
            }
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get User

Get all users

### Method: GET
>
>```
>{{URL}}/api/v1/users/
>```
>
### Body (**raw**)

```json
{
      
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Questions

## End-point: Ask Question

Post a question.

### Method: POST
>
>```
>{{URL}}/api/v1/questions/ask/
>```
>
### Body (**raw**)

```json
{
        "question": "Does the question services work?" 
        
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{token}}|string|

### Response: 201

```json
{
    "status": "Successful",
    "message": "Question posted successfully",
    "data": {
        "data": {
            "uuid": "86f9d0c1-b19b-466f-abab-447036c9eada",
            "status": 1,
            "question": "Does the question services work?",
            "updatedAt": "2023-02-13T14:05:13.237Z",
            "createdAt": "2023-02-13T14:05:13.237Z"
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all questions

View all Questions

### Method: GET
>
>```
>{{URL}}/api/v1/questions/all_questions
>```
>
### Body (**raw**)

```json

```

### Response: 201

```json
{
    "status": "success",
    "message": "169 questions found",
    "data": {
        "questions": [
           
            {
                "uuid": "f42bb3cd-b0f7-4ed2-9b12-330edee7010b",
                "question": "Another one?",
                "status": 1,
                "createdAt": "2022-10-18T20:40:05.000Z",
                "updatedAt": "2022-10-18T20:40:05.000Z",
                "user": {
                    "uuid": "2bdda0e4-a65e-47d9-8085-d06a0da5d51b",
                    "username": "Admin",
                    "first_name": "Admin",
                    "last_name": "Admin",
                    "phonenumber": 833322527,
                    "email": "admin@email.com",
                    "role": 1,
                    "stack": null,
                    "age": null,
                    "nationality": null,
                    "createdAt": "2022-10-18T20:36:49.000Z",
                    "updatedAt": "2022-10-18T20:36:49.000Z"
                }
            },
            {
                "uuid": "ba39bc85-333d-4aff-92ad-0ea9c3101dbf",
                "question": "is there dinner?",
                "status": 1,
                "createdAt": "2022-10-18T20:40:29.000Z",
                "updatedAt": "2022-10-18T20:40:29.000Z",
                "user": {
                    "uuid": "cce95f92-def6-4861-ad93-a6e6864e9288",
                    "username": "Hi",
                    "first_name": "Ridwan",
                    "last_name": "Momoh",
                    "phonenumber": 833322527,
                    "email": "Ridwan@email.com",
                    "role": 2,
                    "stack": null,
                    "age": null,
                    "nationality": null,
                    "createdAt": "2022-10-18T20:38:48.000Z",
                    "updatedAt": "2022-10-18T20:38:48.000Z"
                }
            }
            
           
            {
                "uuid": "9dd41980-f2a8-4e82-8744-9e33a6884067",
                "question": "Provide steps for creating a nodejs app with mongodb database",
                "status": 1,
                "createdAt": "2022-12-03T22:13:54.000Z",
                "updatedAt": "2022-12-03T22:13:54.000Z",
                "user": {
                    "uuid": "cb7ff02e-1ac1-4c4a-9da0-feb71973d462",
                    "username": "Tobi",
                    "first_name": "Tobi",
                    "last_name": "Momoh",
                    "phonenumber": 833322527,
                    "email": "Tobi@email.com",
                    "role": 2,
                    "stack": null,
                    "age": null,
                    "nationality": null,
                    "createdAt": "2022-10-18T20:39:31.000Z",
                    "updatedAt": "2022-10-18T20:39:31.000Z"
                }
            }
       
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Question By Id

View a specific question by question id

### Method: GET
>
>```
>{{URL}}/api/v1/questions/2
>```
>
### Body (**raw**)

```json
{
        "uuid": "eb814b83-4380-4bdf-a320-ca153f37eb9a"
        
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "Question found",
    "data": {
        "data": {
            "uuid": "f42bb3cd-b0f7-4ed2-9b12-330edee7010b",
            "question": "Another one?",
            "status": 1,
            "createdAt": "2022-10-18T20:40:05.000Z",
            "updatedAt": "2022-10-18T20:40:05.000Z",
            "user": {
                "uuid": "2bdda0e4-a65e-47d9-8085-d06a0da5d51b",
                "username": "Admin",
                "first_name": "Admin",
                "last_name": "Admin",
                "phonenumber": 833322527,
                "email": "admin@email.com",
                "role": 1,
                "stack": null,
                "age": null,
                "nationality": null,
                "createdAt": "2022-10-18T20:36:49.000Z",
                "updatedAt": "2022-10-18T20:36:49.000Z"
            },
            "answers": [
                {
                    "id": 2,
                    "uuid": "bd5196ec-c448-4875-a69a-ce46b79b79d8",
                    "answer": "I tried my best!",
                    "downvotes": 0,
                    "upvotes": 0,
                    "accepted": false,
                    "userId": 2,
                    "questionId": 2,
                    "createdAt": "2022-10-18T20:46:50.000Z",
                    "updatedAt": "2022-10-18T20:46:50.000Z"
                }
            ]
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get question by User

View questions by User Id

### Method: GET
>
>```
>{{URL}}/api/v1/questions/user/2
>```
>
### Body (**raw**)

```json
{
        "question": "Does my code work?" ,
        "userId": "2"
        
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "Hi has posted 1 Questions  🙋🏽\u200d♂️🙋\u200d♀️",
    "data": {
        "data": [
            {
                "uuid": "ba39bc85-333d-4aff-92ad-0ea9c3101dbf",
                "question": "is there dinner?",
                "status": 1,
                "createdAt": "2022-10-18T20:40:29.000Z",
                "updatedAt": "2022-10-18T20:40:29.000Z",
                "user": {
                    "uuid": "cce95f92-def6-4861-ad93-a6e6864e9288",
                    "username": "Hi",
                    "first_name": "Ridwan",
                    "last_name": "Momoh",
                    "phonenumber": 833322527,
                    "email": "Ridwan@email.com",
                    "role": 2,
                    "stack": null,
                    "age": null,
                    "nationality": null,
                    "createdAt": "2022-10-18T20:38:48.000Z",
                    "updatedAt": "2022-10-18T20:38:48.000Z"
                }
            }
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Ask AI

This route creates a question and calls openai api for AI generated answers.

`ai_assist_type` include:

- `slowcodegen`
- `fastcodegen`
- `tips`

Set `ai_assist` to `true` to generate auto answers(powered by OpenAi Api Library).

### Method: POST
>
>```
>{{URL}}/api/v1/questions/askAI
>```
>
### Headers

### Body (**raw**)

```json
{
    "question": "sample yml file for running mocha tests?",
    "ai_assist": true,
    "ai_assist_type": "fastcodegen"
}
```

### Response: 201

```json
{
    "status": "Successful",
    "message": "Question asked and answered successfully",
    "data": {
        "AI_status": "SmartAI 💡💡💡",
        "AI_Answer": "\n    #\n    # @return [Boolean]\n    def mocha?\n      @mocha ||= @config.fetch(:mocha, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration?\n      @mocha_integration ||= @config.fetch(:mocha_integration, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems?\n      @mocha_integration_gems ||= @config.fetch(:mocha_integration_gems, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_dev?\n      @mocha_integration_gems_dev ||= @config.fetch(:mocha_integration_gems_dev, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_prod?\n      @mocha_integration_gems_prod ||= @config.fetch(:mocha_integration_gems_prod, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_ci?\n      @mocha_integration_gems_ci ||= @config.fetch(:mocha_integration_gems_ci, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_dev_ci?\n      @mocha_integration_gems_dev_ci ||= @config.fetch(:mocha_integration_gems_dev_ci, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_prod_ci?\n      @mocha_integration_gems_prod_ci ||= @config.fetch(:mocha_integration_gems_prod_ci, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_no_bundler?\n      @mocha_integration_gems_no_bundler ||= @config.fetch(:mocha_integration_gems_no_bundler, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_dev_no_bundler?\n      @mocha_integration_gems_dev_no_bundler ||= @config.fetch(:mocha_integration_gems_dev_no_bundler, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_prod_no_bundler?\n      @mocha_integration_gems_prod_no_bundler ||= @config.fetch(:mocha_integration_gems_prod_no_bundler, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_ci_no_bundler?\n      @mocha_integration_gems_ci_no_bundler ||= @config.fetch(:mocha_integration_gems_ci_no_bundler, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_dev_ci_no_bundler?\n      @mocha_integration_gems_dev_ci_no_bundler ||= @config.fetch(:mocha_integration_gems_dev_ci_no_bundler, false)\n    end\n\n    # @return [Boolean]\n    def mocha_integration_gems_prod_ci_no_bundler?\n      @mocha_integration_gems_prod_ci_no_bundler ||= @config.fetch(:mocha_integration_gems_prod_ci_no_bundler, false)\n    end\n\n    # @return [Boo"
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Answers

## End-point: Create Answer

Create Answer to a question.

### Method: POST
>
>```
>{{URL}}/api/v1/answers/answer
>```
>
### Body (**raw**)

```json
{
    "answer": "chaining test again redo maybe",
    "questionId": "12"
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "Answer Created",
    "data": {
        "data": {
            "newAnswer": {
                "uuid": "5dcdaefd-e955-41bd-af86-53316c128c6e",
                "downvotes": 0,
                "upvotes": 0,
                "accepted": false,
                "id": 112,
                "answer": "chaining test again redo maybe",
                "questionId": 12,
                "userId": 20,
                "updatedAt": "2023-02-13T14:08:06.081Z",
                "createdAt": "2023-02-13T14:08:06.081Z"
            },
            "newVote": {
                "upvotes": false,
                "downvotes": false,
                "id": 139,
                "answerId": 112,
                "userId": 20,
                "updatedAt": "2023-02-13T14:08:06.085Z",
                "createdAt": "2023-02-13T14:08:06.085Z"
            }
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all answers

Get all answers available on the app.

### Method: GET
>
>```
>{{URL}}/api/v1/answers/all_answers
>```
>
### Body (**raw**)

```json
{}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{token}}|string|

### Response: 201

```json
{
    "status": "success",
    "message": "111 Answer(s) found",
    "fromCache": true,
    "data": [
        {
            "id": 26,
            "uuid": "86f41892-d0fe-4d16-84b7-74995eeaebc8",
            "answer": "Not availabale or selected",
            "downvotes": 0,
            "upvotes": 0,
            "accepted": false,
            "userId": 0,
            "questionId": 53,
            "createdAt": "2022-12-03T16:19:26.000Z",
            "updatedAt": "2022-12-03T16:19:26.000Z",
            "user": {
                "id": 0,
                "uuid": "2bdda0e4-a65e-47d9-8085-d06a0da5d51c",
                "username": "AI",
                "first_name": "OpenAI",
                "last_name": "Openai",
                "phonenumber": 123456789,
                "email": "openai@openai.com",
                "role": 1000,
                "stack": "all",
                "age": "1000",
                "nationality": "World",
                "createdAt": "2022-10-26T02:04:41.000Z",
                "updatedAt": "2022-10-26T02:04:41.000Z"
            },
            "question": {
                "id": 53,
                "uuid": "824dee60-e613-4c73-b67c-a056c53d28af",
                "question": "create a array of top scorers in worldcup",
                "status": 1,
                "userId": 3,
                "createdAt": "2022-12-03T16:19:23.000Z",
                "updatedAt": "2022-12-03T16:19:23.000Z"
            },
            "comments": [],
            "votes": [
                {
                    "id": 23,
                    "userId": 0,
                    "answerId": 26,
                    "upvotes": false,
                    "downvotes": false,
                    "createdAt": "2022-12-03T16:19:26.000Z",
                    "updatedAt": "2022-12-03T16:19:26.000Z"
                }
            ]
        },
        {
            "id": 27,
            "uuid": "968ea4f3-6399-4cdf-a119-102879c6592a",
            "answer": "\n\n1. Neymar\n2. Messi\n3. Ronaldo\n4. Suarez\n5. Iniesta\n6. Kroos\n7. Modric\n8. Ozil\n9. Rakitic\n10. Robben",
            "downvotes": 0,
            "upvotes": 0,
            "accepted": false,
            "userId": 0,
            "questionId": 54,
            "createdAt": "2022-12-03T16:20:09.000Z",
            "updatedAt": "2022-12-03T16:20:09.000Z",
            "user": {
                "id": 0,
                "uuid": "2bdda0e4-a65e-47d9-8085-d06a0da5d51c",
                "username": "AI",
                "first_name": "OpenAI",
                "last_name": "Openai",
                "phonenumber": 123456789,
                "email": "openai@openai.com",
                "role": 1000,
                "stack": "all",
                "age": "1000",
                "nationality": "World",
                "createdAt": "2022-10-26T02:04:41.000Z",
                "updatedAt": "2022-10-26T02:04:41.000Z"
            },
            "question": {
                "id": 54,
                "uuid": "0ece550c-cea6-44b6-8581-c8f07bf79185",
                "question": "create a array of top scorers in worldcup",
                "status": 1,
                "userId": 3,
                "createdAt": "2022-12-03T16:20:07.000Z",
                "updatedAt": "2022-12-03T16:20:07.000Z"
            },
            "comments": [],
            "votes": [
                {
                    "id": 24,
                    "userId": 0,
                    "answerId": 27,
                    "upvotes": false,
                    "downvotes": false,
                    "createdAt": "2022-12-03T16:20:09.000Z",
                    "updatedAt": "2022-12-03T16:20:09.000Z"
                }
            ]
        },
        
        
        }
    
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get answers by User Id and Question Id

### Method: GET
>
>```
>{{URL}}/api/v1/answers/3/1
>```
>
### Body (**raw**)

```json
{
    "userUuid": "3",
    "questionUuid": "2"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{token}}|string|

### Response: 201

```json
{
    "status": "success",
    "message": "1 Answer(s) found",
    "data": [
        {
            "id": 1,
            "isAi": false,
            "uuid": "177c388d-2ce4-4a42-ab6d-fddd00294f7a",
            "answer": "yes !",
            "downvotes": 1,
            "upvotes": 0,
            "accepted": false,
            "userId": 3,
            "questionId": 1,
            "createdAt": "2022-10-18T20:45:57.000Z",
            "updatedAt": "2023-02-13T13:04:42.000Z"
        }
    ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Comments

## End-point: Create Comment

Create a comment

### Method: POST
>
>```
>{{URL}}/api/v1/comments/comment
>```
>
### Body (**raw**)

```json
{
    "comment": "retry,bro",
    "answerId": "10"
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "Comment Posted 🙂",
    "data": {
        "data": {
            "uuid": "0c6df424-2784-41f4-b6be-20a62d4f6a17",
            "id": 1,
            "comment": "retry,bro",
            "userId": 20,
            "answerId": 10,
            "updatedAt": "2023-02-13T14:16:09.763Z",
            "createdAt": "2023-02-13T14:16:09.763Z"
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all comments

Get all comments

### Method: GET
>
>```
>{{URL}}/api/v1/comments/all_comments
>```
>
### Body (**raw**)

```json
{
        "question": "Does my code work?" ,
        "userId": "1"
        
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "1 comments found",
    "data": {
        "data": [
            {
                "id": 1,
                "uuid": "0c6df424-2784-41f4-b6be-20a62d4f6a17",
                "userId": 20,
                "answerId": 10,
                "comment": "retry,bro",
                "createdAt": "2023-02-13T14:16:09.000Z",
                "updatedAt": "2023-02-13T14:16:09.000Z",
                "user": {
                    "id": 20,
                    "uuid": "492693a0-180d-45a9-a3ab-fd8d992d3db5",
                    "username": "Testreg2",
                    "first_name": "Tobi",
                    "last_name": "Momoh",
                    "phonenumber": 823322528,
                    "email": "test2@email.com",
                    "role": 2,
                    "stack": null,
                    "age": null,
                    "nationality": null,
                    "createdAt": "2022-10-26T01:29:59.000Z",
                    "updatedAt": "2022-10-26T01:29:59.000Z"
                },
                "answers": {
                    "id": 10,
                    "uuid": "cde3c277-1e30-447b-baac-0ce3f6772e11",
                    "answer": "Redis test",
                    "downvotes": 0,
                    "upvotes": 0,
                    "accepted": false,
                    "userId": 3,
                    "questionId": 2,
                    "createdAt": "2022-12-03T10:20:59.000Z",
                    "updatedAt": "2022-12-03T10:20:59.000Z"
                }
            }
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all Comments by User

Get comments by user

### Method: GET
>
>```
>{{URL}}/api/v1/comments/user/20
>```
>
### Body (**raw**)

```json

```

### Response: 201

```json
{
    "status": "success",
    "message": "1 comments found",
    "data": {
        "data": [
            {
                "id": 1,
                "uuid": "0c6df424-2784-41f4-b6be-20a62d4f6a17",
                "userId": 20,
                "answerId": 10,
                "comment": "retry,bro",
                "createdAt": "2023-02-13T14:16:09.000Z",
                "updatedAt": "2023-02-13T14:16:09.000Z"
            }
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all Comments by Answer

Get comments by answer

### Method: GET
>
>```
>{{URL}}/api/v1/comments/answer/10
>```
>
### Body (**raw**)

```json

```

### Response: 201

```json
{
    "status": "success",
    "message": "1 comments found",
    "data": {
        "data": [
            {
                "id": 1,
                "uuid": "0c6df424-2784-41f4-b6be-20a62d4f6a17",
                "userId": 20,
                "answerId": 10,
                "comment": "retry,bro",
                "createdAt": "2023-02-13T14:16:09.000Z",
                "updatedAt": "2023-02-13T14:16:09.000Z"
            }
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: Vote

## End-point: Vote Answer

Vote an answer

### Method: PUT
>
>```
>{{URL}}/api/v1/answers/vote
>```
>
### Body (**raw**)

```json
{
    "upVote": true,
    "answer_id": "5"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|{{token}}|string|

### Response: 201

```json
{
    "status": "success",
    "message": "Vote logged",
    "data": {
        "data": [
            {
                "id": 5,
                "uuid": "90a6389f-7e43-468f-b7bf-cf733e3e17a9",
                "answer": "Refactoring Test",
                "downvotes": 0,
                "upvotes": 1,
                "accepted": false,
                "userId": 3,
                "questionId": 2,
                "createdAt": "2022-10-20T22:11:07.000Z",
                "updatedAt": "2023-02-13T13:05:41.000Z"
            },
            {
                "id": 136,
                "userId": 20,
                "answerId": 5,
                "upvotes": true,
                "downvotes": false,
                "createdAt": "2023-02-13T13:05:30.000Z",
                "updatedAt": "2023-02-13T13:05:41.000Z"
            }
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all votes

Get all votes

### Method: GET
>
>```
>{{URL}}/api/v1/votes
>```
>
### Body (**raw**)

```json
{
    
        
}
```

### Response: 201

```json
{
    "status": "success",
    "message": "116 votes found",
    "data": {
        "votes": [
            {
                "id": 1,
                "userId": 19,
                "answerId": 3,
                "upvotes": true,
                "downvotes": false,
                "createdAt": "2022-10-27T12:19:29.000Z",
                "updatedAt": "2022-10-27T13:01:27.000Z"
            },
            {
                "id": 2,
                "userId": 21,
                "answerId": 3,
                "upvotes": true,
                "downvotes": false,
                "createdAt": "2022-10-27T13:41:22.000Z",
                "updatedAt": "2022-10-27T13:41:27.000Z"
            },
            
        ]
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get vote count for Answer

Get vote count for an answer.

### Method: GET
>
>```
>{{URL}}/api/v1/votes/5
>```
>
### Body (**raw**)

```json
{
    
        
}
```

### Response: 201

```json
{
    "status": "success",
    "message": " votes found",
    "data": {
        "payload": {
            "Upvotes": 1,
            "Downvotes": 0,
            "Voters": 1,
            "AnswerUuid": "90a6389f-7e43-468f-b7bf-cf733e3e17a9",
            "Answer": "Refactoring Test",
            "Postedby": 3,
            "VotersId": [
                20
            ]
        }
    }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
