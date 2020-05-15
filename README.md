This project was set up with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). It contains two parts: 

- `hackernews-ui`, it is a [create-react-app](https://github.com/facebook/create-react-app) with `typescript`
- `hackernews-bff`, it is written with `express` and `typescript`

### Run Unit Tests

- Run `yarn` to install dependencies.
- Run `yarn test` for unit testing on both ui and bff.

*Note: the commands can be run in the project root folder*

### Run Program

- Run `yarn` to install dependencies.
- Run `yarn start` to start both ui and bff.

##### Alternately

- Run `yarn start:bff` to start bff.
- Run `yarn start:ui` to start ui.

#### Files Overview

```
hackernews-bff/
-- src/
---- server.ts            // express server file
---- routes/              // endpoints
---- services/            // request client for hackernews api

hackernews-ui/
-- src/
---- index.tsx            // entry file
---- components/          // react components
---- hooks/               // react hooks
---- views/               // web pages
---- types/               // types definition
---- services/            // request client for bff api
```

*Note: Unit test files are named as `.spec.ts(x)` next to the target file.*