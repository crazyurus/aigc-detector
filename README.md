oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aigc-detector
$ aigc-detector COMMAND
running command...
$ aigc-detector (--version)
aigc-detector/0.0.0 darwin-x64 node-v18.19.0
$ aigc-detector --help [COMMAND]
USAGE
  $ aigc-detector COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aigc-detector hello PERSON`](#aigc-detector-hello-person)
* [`aigc-detector hello world`](#aigc-detector-hello-world)
* [`aigc-detector help [COMMAND]`](#aigc-detector-help-command)
* [`aigc-detector plugins`](#aigc-detector-plugins)
* [`aigc-detector plugins add PLUGIN`](#aigc-detector-plugins-add-plugin)
* [`aigc-detector plugins:inspect PLUGIN...`](#aigc-detector-pluginsinspect-plugin)
* [`aigc-detector plugins install PLUGIN`](#aigc-detector-plugins-install-plugin)
* [`aigc-detector plugins link PATH`](#aigc-detector-plugins-link-path)
* [`aigc-detector plugins remove [PLUGIN]`](#aigc-detector-plugins-remove-plugin)
* [`aigc-detector plugins reset`](#aigc-detector-plugins-reset)
* [`aigc-detector plugins uninstall [PLUGIN]`](#aigc-detector-plugins-uninstall-plugin)
* [`aigc-detector plugins unlink [PLUGIN]`](#aigc-detector-plugins-unlink-plugin)
* [`aigc-detector plugins update`](#aigc-detector-plugins-update)

## `aigc-detector hello PERSON`

Say hello

```
USAGE
  $ aigc-detector hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/crazyurus/aigc-detector/blob/v0.0.0/src/commands/hello/index.ts)_

## `aigc-detector hello world`

Say hello world

```
USAGE
  $ aigc-detector hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ aigc-detector hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/crazyurus/aigc-detector/blob/v0.0.0/src/commands/hello/world.ts)_

## `aigc-detector help [COMMAND]`

Display help for aigc-detector.

```
USAGE
  $ aigc-detector help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for aigc-detector.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.21/src/commands/help.ts)_

## `aigc-detector plugins`

List installed plugins.

```
USAGE
  $ aigc-detector plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ aigc-detector plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/index.ts)_

## `aigc-detector plugins add PLUGIN`

Installs a plugin into aigc-detector.

```
USAGE
  $ aigc-detector plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into aigc-detector.

  Uses bundled npm executable to install plugins into /Users/crazyurus/.local/share/aigc-detector

  Installation of a user-installed plugin will override a core plugin.

  Use the AIGC_DETECTOR_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AIGC_DETECTOR_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ aigc-detector plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ aigc-detector plugins add myplugin

  Install a plugin from a github url.

    $ aigc-detector plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ aigc-detector plugins add someuser/someplugin
```

## `aigc-detector plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ aigc-detector plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ aigc-detector plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/inspect.ts)_

## `aigc-detector plugins install PLUGIN`

Installs a plugin into aigc-detector.

```
USAGE
  $ aigc-detector plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into aigc-detector.

  Uses bundled npm executable to install plugins into /Users/crazyurus/.local/share/aigc-detector

  Installation of a user-installed plugin will override a core plugin.

  Use the AIGC_DETECTOR_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AIGC_DETECTOR_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ aigc-detector plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ aigc-detector plugins install myplugin

  Install a plugin from a github url.

    $ aigc-detector plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ aigc-detector plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/install.ts)_

## `aigc-detector plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ aigc-detector plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ aigc-detector plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/link.ts)_

## `aigc-detector plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aigc-detector plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aigc-detector plugins unlink
  $ aigc-detector plugins remove

EXAMPLES
  $ aigc-detector plugins remove myplugin
```

## `aigc-detector plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ aigc-detector plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/reset.ts)_

## `aigc-detector plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aigc-detector plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aigc-detector plugins unlink
  $ aigc-detector plugins remove

EXAMPLES
  $ aigc-detector plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/uninstall.ts)_

## `aigc-detector plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ aigc-detector plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ aigc-detector plugins unlink
  $ aigc-detector plugins remove

EXAMPLES
  $ aigc-detector plugins unlink myplugin
```

## `aigc-detector plugins update`

Update installed plugins.

```
USAGE
  $ aigc-detector plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.13/src/commands/plugins/update.ts)_
<!-- commandsstop -->
