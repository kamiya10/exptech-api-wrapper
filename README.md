# ExpTech API Wrapper
## Installation
```bash
npm install @kamiya4047/exptech-api-wrapper
```

## Usage
API documentation can be found [here](https://github.com/ExpTechTW/API/blob/master/RULE.md).
```js
const ExpTech = require("@kamiya4047/exptech-api-wrapper").default;
const api = new ExpTech(/* YOUR API KEY HERE */);
```

### Versions
Different api versions are stored under the `ExpTech` class.
```js
api.v0 // v0
api.v1 // v1
```

### Example
urlChecker
```js
console.log(await api.v0.isURLSafe("https://google.com"));
// true
```

### Making a direct request to the api
if you want to make a direct request to the api, you can use `get()` and `post()` methods
```js
await api.v1.get(endpoint, params);
```

## API Support
- [x] API v0
- [ ] API v1 (Partially Supported)
