# Apply Livingdocs Guides

Whenever new commits land on master the CI Server will pick up the changes and
send a pull request to apply our guides
to all repos found in `repos.json`.

Please send a pull request for every change you want to be distributed.

If you're proposing changes to the script or its configuration itself add
`[skip ci]` to your commit message body to avoid unnecessary pull requests
being sent out to all repos.
