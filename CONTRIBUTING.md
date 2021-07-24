# Contributing to Socketkit

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Atom and its packages,
which are hosted in the [Socketkit Organization](https://github.com/socketkit)
on GitHub.  These are mostly guidelines, not rules.  Use your best judgment,
and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Styleguides](#styleguides)

## Styleguides

It's best to stick with the most universally common standards and to avoid
weird stuff.

### Git Commit Messages

* Separate subject from body with a blank line
* Do not end the subject line with a period
* Capitalize the subject line and each paragraph
* Use the imperative mood in the subject ("Move cursor to..." not "Moves cursor to...")
* Use the present tense in the subject ("Add feature" not "Added feature")
* Wrap lines to 72 characters or less
* Use the body to explain what and why you have done something
* Reference issues and pull requests liberally in the body

Here are some documents about good Git practices:

* [OpenStack - Git Commit Good Practice](https://wiki.openstack.org/wiki/GitCommitMessages)

### JavaScript

All JavaScript code is linted with [ESLint](https://eslint.org/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

### Protocol Buffers

We are following Google's [Style Guide](https://developers.google.com/protocol-buffers/docs/style).
