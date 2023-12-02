# File System Service

You can visit live demo here <https://file-system-service.onrender.com>

*Please note that after few minutes without receiving any request, the server will be shut down because of the free tier plan of Render. To start the server, just send new request with a few minutes delay (wakes server up).*

## Installation

```bash
npm install
```

## Running the app

### 1. Create environment file

Create *.env* file at root folder from *.env.template* file

### 2. Create database

* Please prepare a database with a name that you like. *Ex: interviewdb*
* PostgreSQL version: 14x

### 3. Run migration

```bash
# Build the source code first
npm run build

# Run migration up
npm run db:migration
```

### 4. Run app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### 5. Sample API

* Create new resource (***cr command***)

```http
POST /v1/resources HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 63

{
    "path": "/",
    "name": "file",
    "data": "size"
}
```

* Get file content (***cat command***)

```http
GET /v1/resources/content?path=/file HTTP/1.1
Host: localhost:5000
```

* List folder items (***ls command***)

```http
GET /v1/resources/children?path=/ HTTP/1.1
Host: localhost:5000
```

* Delete resource (***rm command***)

```http
DELETE /v1/resources/multiple?pathList=["/root1","/file"] HTTP/1.1
Host: localhost:5000
```

### 6. Deploy app

* Step 1: commit code
* Step 2: create pull request to master

## Stay in touch

* Author: [Huy Le Minh](https://github.com/huyleminh)
* Linkedin: [huyleminh-dev](https://linkedin.com/in/huyleminh-dev)
