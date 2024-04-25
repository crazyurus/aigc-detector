# AIGC Detector

![publish](https://github.com/crazyurus/aigc-detector/actions/workflows/publish.yaml/badge.svg)
[![GPL-3.0](https://img.shields.io/badge/license-GPL3-blue.svg)](LICENSE)
[![npm](https://badgen.net/npm/v/aigc-detector)](https://www.npmjs.com/package/aigc-detector)
[![npm dependents](https://badgen.net/npm/dependents/aigc-detector)](https://www.npmjs.com/package/aigc-detector?activeTab=dependents)
[![npm downloads](https://badgen.net/npm/dt/aigc-detector)](https://www.npmjs.com/package/aigc-detector)

## Install

```sh
$ npm install aigc-detector -g
```

## Usage

First, you need to configure the large model platform and its API Key that the tool depends on. Currently, the following platforms are supported:

- [OpenAI](https://platform.openai.com/)
- [Moonshot](https://platform.moonshot.cn/)

You can log in to the above platform to apply for an API Key.

Then, you need to configure the API Key you have applied for in the tool. For example:

```sh
$ aigc-detector config -p moonshot -k pl_f23***********************73f4ee
```

Finally, tell us the content that needs to be detected and we can proceed.

```sh
$ aigc-detector detect [CONTENT]
```

For more ways to use `aigc-detector`, please refer to the help command.

```sh
$ aigc-detector help
```

## Develop

You need to execute 'npm link' to create a local debugging cli tool, and then you can use `aigc-detector-dev` for debugging. For example:

```sh
$ aigc-detector-dev config
```

## License

[GPL-3.0](./LICENSE)