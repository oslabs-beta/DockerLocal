
![DockerLocal Demo](/images/phlippy_icon.png)
# DockerLocal

DockerLocal is a GUI application that allows you to keep an up-to-date version of the docker compose file for interconnected repositories while doing development work on a single repository.

![DockerLocal Demo](/demoScreenshot.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them

```
Mac/Linux or Windows 10+
A Github Personal Access Token
```

### Instructions

A step by step series of examples that tell you how to get a development env running

1. Head to our [website](dockerlocal.io) and click the download button.
2. Get a personal access token from [Github](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
3. Use the .env.template to add your personal access token
4. Add a Project
5. Add Repos to your project and click Compose when you're ready!

## Running the tests

Run npm test in the terminal. 

```
$ npm test
```

Currently, Jest CLI has set up to run all test suites and display individual test results with the test suite hierarchy.

### Testing React Components
We're using: 
- Jest, a test runner
- Enzyme, a testing utility for React

In jest.config.js file:
- ts-jest preset to compile Typescript to JavaScript 
- enzyme-to-json to convert Enzyme wrappers for Jest snappshot matcher.

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Typescript](https://www.typescriptlang.org/) - Language used
* [Electron](https://www.electronjs.org/) - Native Desktop Application Framework
* [React.js](https://reactjs.org/) - Front end library used
* [Node.js](https://nodejs.org/en/) - The web framework used
* [npm](https://www.npmjs.com/) - Package Manager
* [Webpack](https://webpack.js.org/) - Dependency Management
* [Bulma](https://bulma.io/) - CSS Framework
* [TSlint](https://palantir.github.io/tslint/) - Linter


## Contributing

Please read [CONTRIBUTING.md](https://github.com/oslabs-beta/DockerLocal/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Vivian Cermeno** - *Co-creator* - [Vcermeno](https://github.com/vcermeno)
* **Kate Chanthakaew** - *Co-creator* - [KateChantha](https://github.com/KateChantha)
* **Tom Lutz** - *Co-creator* - [tlutz888](https://github.com/tlutz888)
* **Katty Polyak** - *Co-creator* - [KattyPolyak](https://github.com/KattyPolyak)
* **Louis Xavier Sheid III** - *Co-creator* - [louisxsheid](https://github.com/louisxsheid)

See also the list of [contributors](https://github.com/oslabs-beta/DockerLocal/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to everyone who helped support the project.
