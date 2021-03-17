# Baleen 3 Front End

This is the front end application for the Baleen server.

## Development

> 🚧 Getting Started
>
> The main maven build script must be run first to generate the file `src/types/server-types.ts`. This generates the typescript types from the server API and helps to highlight any introduced issues when modifying the server.
> For instructions see main project [Readme](../../../README.md).
> It will also install the software dependencies of this project.

In the `src/main/app` directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

This will attempt to proxy to the baleen server on http://localhost:6413, so will need a local instance of the server running for correct function. See main project [Readme](../../../README.md).

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test -u`

Launches the test runner in the interactive watch mode and updates the snapshots.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Runs the tests, in `CI` mode, with coverage. Coverage is printed to the console and will be output to the `coverage` directory.

### `yarn test:ci`

Runs the tests, in `CI` mode for use in a CI build.

### `yarn lint`

Runs linting over the project to look for issues such as inconsistent style and possible bugs.

### `yarn format`

Runs the formatter over the code and applies standard formatting using [prettier](https://prettier.io/).

#### `yarn format:check`

Will check the current formatting and error if any files do not conform. This can be used in CI to ensure the formatting is being applied.

### `yarn storybook`

Starts a local server hosting a [Storybook](https://storybook.js.org/) that demonstrates the components of the UI.
This is accessible on http://localhost:9009.

### `yarn generate`

This is a development utility to create templated files for common development tasks, such as adding a new component.
For further information see the library [documentation](https://plopjs.com/documentation/) and the `generators` directory.

### `yarn build`

Builds the app for production to the `build` directory.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Note the maven build process for the main project will automatically build this UI and bundle it into the server.
The UI can be accessed directly from the server, http://localhost:6413, when the server is running.

## Git Hooks

To ensure project standards we run formatting, linting and testing pre-push.
The linting rules are quite strict, adding explicit `// eslint-disable-next-line` comments in the code is the preferred way of marking false positives and ensures new outputs are noticed.
