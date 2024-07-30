# ExpTech API Wrapper

## Installation

```bash
npm install @kamiya4047/exptech-api-wrapper
```

## Usage

API documentation can be found [here](https://docs.exptech.dev/).

You can use default exported instance

```ts
// with CJS require

const ExpTech = require("@kamiya4047/exptech-api-wrapper").default;
await ExpTech.getReportList();

// with ESM import

import ExpTech from "@kamiya4047/exptech-api-wrapper";
await ExpTech.getReportList();
```

or create an instance with ExpTechApi class

```ts
// with CJS require

const { ExpTechApi } = require("@kamiya4047/exptech-api-wrapper");
const api = new ExpTechApi(/* YOUR API KEY HERE */);

// with ESM import

import { ExpTechApi } from "@kamiya4047/exptech-api-wrapper";
const api = new ExpTechApi(/* YOUR API KEY HERE */);
```

### Example

getReportList

```js
import ExpTech from "@kamiya4047/exptech-api-wrapper";

(async () => {
  console.log(await ExpTech.getReportList(10));
})();
```
