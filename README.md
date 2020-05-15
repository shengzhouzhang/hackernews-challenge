This project was set up with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). It contains two parts: 

- `hackernews-ui`, it is a [create-create-app](https://github.com/facebook/create-react-app) with `typescrpit`
- `hackernews-bff`, it is written with `express` and `typescrpit`

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