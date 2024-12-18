# BITS UNPLUGGED BACKEND

## Authentication

GET /auth/
POST /auth/login
POST /auth/signup

## topic

GET /topics/
GET /topics/:id
GET /topics/:id/series
POST /topics/
PUT /topics/:id
DELETE /topics/:id

## series

GET /series/
GET /series/:id
GET /series/:id/problems

- `GET /series/:id/problems?solved=false`

POST /series/
PUT /series/:id
DELETE /series/:id

## canvas

GET /canvases/
GET /canvases/:id
POST /canvases/
PUT /canvases/:id
DELETE /canvases/:id

## problem

GET /problems -> Setter: My Problems, Admin: Submitted Problems

- `GET /problems?recommended=true`
- `GET /problems?solved=false`

POST /problems/
GET /problems/:id
GET /problems/:id/submissions -> Don't allow to users - `GET /problems/:id/submissions?user=2`

PUT /problems/:id -> Setter: Edit problem, Admin: Edit Live Problem

POST /problems/:id/submit -> User: Submit Solution, Setter: Submit for approval
POST /problems/:id/approve

DELETE /problems/:id

## Submissions

GET /submissions/:user_id -> User: All submissions

<!-- GET /submissions/my_stats/:problemId
GET /submissions/all_stats/:problemId
****
POST /submissions/submit/:problemId
POST /submissions/rate_me/:problemId
GET /submissions/unsolved -->

## Sequelize

### Installation

npm install --save sequelize
npm install --save pg pg-hstore

### Initial Setup

Drop database: `npx sequelize db:drop`
Create database: `npx sequelize db:create`
Create schema: `npx sequelize db:migrate`
Populate tables: `npx sequelize db:seed:all`

### Creating Model

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string

### Creating Seed

npx sequelize seed:generate --name demo-user

### Changing schema

Creating a migration file: `npx sequelize migration:create --name alter-user-image`
Edit the file and migrate: `npx sequelize db:migrate --name *****-alter-user-image`

### Changing table data

Creating a seeder file: `npx sequelize seed:generate --name add-problems`
Edit the file and seed: `npx sequelize db:seed --seed *****-add-problems`

### Updating remote

--- sensitive ---

### Repository Pattern

CREATE - Returns created row on success, otherwise null.
READ - Returns selected rows.
UPDATE - Returns updated row on success, otherwise null.
DELETED - Returns deleted row on success, otherwise null.
