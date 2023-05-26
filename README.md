# Requirements:

1. This project was bootstrapped using NODE JS version`v19.6.0` it does not mean that it won't work on other version but it has not been tested.
2. Client is bootstrapped with[CRA](https://create-react-app.dev/) and it should run on the available port.
3. Server is a tiny express server which runs on port`3001`,**please make sure that port is available on local machine.** Alternatively you can set your own port using`.env` file.

### How to run?

Install all dependencies

1. `cd ./client && npm i`
2. `cd ./client && npm i`

Run both `Client` and `Server`

1. While in`/client` dir run`npm run start`
2. While in`/server` dir run`npm run start`

### TechStack:

- React JS with JS for single page app development
- Node JS with Express to serve as a server
- OpenWeather api to get weather data
- Tailwind CSS for styling

### Why React and why JS (not TS)?

React is my personal preference as at the moment I find myself the most productive. Same goes with JS over TS, as mush as TS brings type safety it is also adding more boilerplate code, which for this small prototype is not ideal.

### Why Tailwind?

Because of the rapid prototyping abilities.

### Why Express JS?

I needed a way to hide OpenWeather API key. No matter how it is done on the client, it will always be exposed. This server is doing two things:

- proxying requests to openWeather.
- Serialize that data in a way that is as simple as possible to parse on the UI.

### Why OpenWeather?

It has very well documented API and it is free, however it does return more than you need and you are also forced to make multiple request to get all the data needed.
Please be aware that OpenWeather API has 85% up time, in case you are getting 404 pages please wait a bit and to make sure you can always check `/server` routes like so:

- `http://localhost:3001/weather?q=${someLocationName}&units=metric`
- `http://localhost:3001/forecast?q=${someLocationName}&units=metric`

### What would I do differently if this is to go live?

- Use TS to add type safety (or at least using react run time type checking )
- Use fetching libs like`react query` or`react swr` or`RTK Query`
- Use`css modules` with`scss` support instead of`tailwind`
- Standardized the way errors are handled across the app
- Have more appropriate weather data as free tier of openWeather is not great
- Refactor the`locationGridList` not to rely on clint side unique ID
- Refactor the`locationItem` to have more separation between the UI and render logic so that it can be tested
- Unit test core functionality such as`data transforms` under`/server` and UI components with heavy render logic such as`LocationItem`,`addNewLocationItem` and`react router loaders`
- Use shared layout for all pages so that I can make ues of react router`loading state` and show the users loading indicator
