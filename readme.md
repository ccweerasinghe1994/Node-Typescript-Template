# Node Typescript Template

## initialize the project

```bash
npm init -y
```

## install dependencies

```bash
npm install express
```

```bash
npm install -D typescript 
```

```bash
npm i -D @types/express
```

## create a tsconfig.json file

```bash
npx tsc --init
```

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node 16",
  "_version": "16.1.0",

  "compilerOptions": {
    "lib": ["es2021"],
    "module": "node16",
    "target": "es2021",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```

```json
{
  // This is an alias to @tsconfig/node16: https://github.com/tsconfig/bases
  "extends": "ts-node/node16/tsconfig.json",
  // Most ts-node options can be specified here using their programmatic names.
  "ts-node": {
    // It is faster to skip typechecking.
    "files": true,
    "compilerOptions": {
      // compilerOptions specified here will override those declared below,
      // but *only* in ts-node.  Useful if you want ts-node and tsc to use
      // different options with a single tsconfig.json.
    }
  },
  "compilerOptions": {
    "sourceMap": true, 
    "outDir": "./dist",
    "forceConsistentCasingInFileNames": true, 
    "strict": true, 
    "noImplicitAny": true, 
    "strictNullChecks": true, 
    "strictFunctionTypes": true, 
  }
}
```

let's add a build script to the package.json file

```json
"scripts": {
    "build": "tsc --build"
  }
```

and a start script

```json
"scripts": {
    "start": "node dist/index.js"
  }
```

let's install nodemon to watch for changes

```bash
npm install -D nodemon ts-node
```

let's add a dev script to the package.json file

```json
"scripts": {
    "start:dev": "nodemon src/index.ts"
  }
```

## create a src folder and an index.ts file

```bash
mkdir src
```

```bash
touch src/index.ts
```

```typescript
import { createApp } from './createApp';

const app = createApp();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

let's create the `createApp` function

```bash
touch src/createApp.ts
```

```typescript
import express, { Express } from 'express';
import userRouter from './routes/users';

export function createApp(): Express {
    const app = express();

    app.use('/users', userRouter);

    return app;
}
```

routes folder

```bash
mkdir src/routes
```

```bash
touch src/routes/users.ts
```

```typescript
import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../handlers/users';


const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
export default userRouter;
```

handlers folder

```bash
mkdir src/handlers
```

```bash
touch src/handlers/users.ts
```

```typescript
import { Request, Response } from 'express';
import { ICreateUserDto } from '../dtos/users/createUser.dto';
import { ICreateUserQueryParam } from '../types/user/query-param';
import { IUser } from '../types/user/user';

export function getUsers(req: Request, res: Response) {
    res.send([]);
}

export function getUserById(req: Request, res: Response) {
    res.send({});
}

export function createUser(req: Request<{}, {}, ICreateUserDto, ICreateUserQueryParam>, res: Response<IUser>) {
    req.body;
    res.send({
        email: 'abc@gmail.com',
        id: '1',
        username: 'abc'
    });
}
```

let's create the dtos folder

```bash
mkdir src/dtos
```

```bash
mkdir src/dtos/users
```

```bash
touch src/dtos/users/createUser.dto.ts
```

```typescript
export interface ICreateUserDto {
    username: string;
    email: string;
    password: string;

}
```

create the types folder

```bash
mkdir src/types
```

```bash
mkdir src/types/user
```

```bash
touch src/types/user/query-param.ts
```

```typescript
export interface ICreateUserQueryParam {
    id: string;
}
```

```bash
touch src/types/user/user.ts
```

```typescript
export interface IUser {
    id: string;
    username: string;
    email: string;
}
```

let's modify the `Request` type in the `Express` module

```bash
touch src/types/express/index.d.ts
```

```typescript
declare namespace Express {
    export interface Request {
       customField?: string
    }
 }
```

let's run the project

```bash
npm run start:dev
```

## create a test

```bash
npm install -D jest ts-jest @types/jest
```

```bash
npx ts-jest config:init.
```
```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

```bash
npm install -D supertest
```

```bash
mkdir src/__tests__
```

```bash
touch src/__tests__/users.test.ts
```

```typescript

import { Request, Response } from 'express';
import { getUsers } from '../../handlers/users';

describe('getUsers', () => {
    it('should send an empty array as response', () => {
        const req = {} as Request;
        const res = {
            send: jest.fn(),
        } as unknown as Response;

        getUsers(req, res);

        expect(res.send).toHaveBeenCalledWith([]);
    });
});
```

let's add a test script to the package.json file

```json
"scripts": {
    "test": "jest"
  }
```

let's run the test

```bash
npm test
```

## let's write a integration test

```bash
touch src/e2e/users.test.ts
```

```typescript
import { Express } from 'express';
import request from 'supertest';
import { createApp } from '../createApp';

// let's close the server after all tests are done


describe('Integration tests', () => {

    let underTest: Express;
    beforeAll(() => {
      // we can use async/await here
        underTest = createApp();
    });


    it('should return status 200 for GET /users', async () => {
        const response = await request(underTest).get('/users');
        expect(response.status).toBe(200);
    });
});

```

let's add a test:e2e script to the package.json file

```json
"scripts": {
   "test:e2e": "jest --testPathPattern=src/e2e",
  }
```

## create a dockerfile

```bash
touch Dockerfile
```

```dockerfile
FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
```
