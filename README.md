# YieldStreet code challange

This repo contains a Survey app build with ReactJS, Redux, Semantic UI and other usefull libs.

You can see this app running by cloning the repo and opening `example.html` in your web browser. A small HTML file that imports the React app static JS and CSS files and render the survey.

## The React App

You can navigate to the `survey-front` folder, where are located the React app source files and run:

 - `yarn` to install dependencies
 - `yarn start` to run development server
 - `yarn build` to generate a production version. The JS and CSS files are generated with the same name to prevent breaking other pages including the survey and get allway the most recent changes.
 - `yarn test` to run the unit tests.

### Folder structure
 - `/components` Components that render the UI. They contains a small fragment of code, usual, the style rules and can be reused.
 - `/containers` Components with the screen logic. They can connect with Redux, call some Service APIs, handle application flow and usually return the `/components` to build the screen style.
 - `/config` Some app static configs.
 - `/redux` React Redux config files. Each application logical separation have a `*Slice.js` file with redux settings. Usually, they are: initial state and actions to handle the state.
 - `/service` Functions to connect with service APIs. Usually, they are called by Redux actions or containers to do some CRUD operations with an API.