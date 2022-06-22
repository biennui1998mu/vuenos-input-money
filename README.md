# vuenos-input-money

> description

## Prerequisites

This project using NodeJS (version 16.10.0 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
7.24.0
v16.10.0
```

## Table of contents

- [vuenos-input-money](#vuenos-input-money)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Import component](#import-component)
    - [Get value input](#get-value-input)
    - [Set value input](#set-value-input)
    - [Trigger blur action](#trigger-blur-action)
  - [Variables binding](#variables-binding)
  - [Versioning](#versioning)
  - [Author](#author)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation
To install and set up the library, run:
```sh
npm install vuenos-input-money
```

## Usage

### Import component

```html

<VuenosInputMoney ref="InputMoneyRef"
                  @getValue="getMoneyVal"
                  @blur="blurInput"
                  :placeholder="'Số tiền'"
                  :suffix="'VNĐ'"
                  :maxLength="14"
                  :disabled="true"
                  :error="true"
                  :showText="true">
</VuenosInputMoney>
```

```typescript
import VuenosInputMoney from "vuenos-input-money";
```

### Get value input

```typescript
const getMoneyVal = (val) => {
    console.log(val);
}
```

### Set value input

```typescript
const InputMoneyRef = ref<null | { setInput: (val) => null }>(null)
const setInputMoneyVal = (val) => {
    InputMoneyRef.value?.setInput(val)
}
return {
    InputMoneyRef
}
```

### Trigger blur action

```typescript
const blurInput = async () => {
    //do something
}
```

### Variables binding

| ATTRIBUTE   | DESCRIPTION                 | REQUIRED |  TYPE   | ACCEPTED VALUES | DEFAULT |
|:------------|:----------------------------|:--------:|:-------:|----------------:|--------:|
| placeholder | placeholder of input        |          | String  |       'Số tiền' |   empty |
| suffix      | suffix of input             |          | String  |           'VNĐ' |   empty |
| maxLength   | maxlength of input          |          | Number  |              14 |   empty |
| showText    | show convert number to text |          | Boolean |      true/false |   false |
| disabled    | disable input               |          | Boolean |      true/false |   false |
| error       | error style input           |          | Boolean |      true/false |   empty |


## Versioning

v1.0.3

## Author

* **Sơn Nguyễn** - *Initial work* - [Sơn Nguyễn](https://github.com/biennui1998mu)
