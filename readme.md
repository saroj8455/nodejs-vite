# Quick Setup Nodejs and Typescript Project

- [x] `npm install --save-dev typescript`
- [x] `npx tsc --init`
- [x] `npm install express`
- [x] `npm install --save-dev @types/express @types/node`

- [x] optimize devlopment
- [x] `npm i concurrently @types/concurrently -D`

# Setup Link

@ https://blog.logrocket.com/how-to-set-up-node-typescript-express/

# Using concurrently package

`nodemon.json` <br>

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
}
```
