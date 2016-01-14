# Apply Livingdocs Guides

Whenever new commits land on master the CI Server will pick up the changes and
send a pull request to apply our [guides](https://github.com/upfrontIO/guides)
to all repos found in `repos.json`.

Because of this it is not possible to push to master directly, so please send a pull request for every change you want to be distributed.

Each pull request requires at least one "LGTM"-comment so things can't get accidentally distributed.

If you're proposing changes to the script or its configuration itself add
`[skip ci]` to your commit message body to avoid unnecessary pull requests
being sent out to all repos.
