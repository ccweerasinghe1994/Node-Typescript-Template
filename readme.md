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
