# ExpTech API Wrapper
## Installation
```bash
npm install @kamiya4047/exptech-api-wrapper
```

## Usage
API documentation can be found [here](https://github.com/ExpTechTW/API/blob/master/RULE.md).
```js
const { ExptechAPI } = require("@kamiya4047/exptech-api-wrapper");
const api = new ExptechAPI(/* YOUR API KEY HERE */);
```

### Versions
Different api versions are stored under the `ExpTech` class.
```js
api.v1 // v1
```

### Example
getReports
```js
(async () => {
    console.log(await api.v1.earthquake.getReports(10));
})();
```

### Making a direct request to the api
if you want to make a direct request to the api, you can use `get()` and `post()` methods
```js
await api.v1.get(endpoint, params);
```

## API Support
- [x] API v1 (Partially Supported)
