# User flow

1. User goes to index page or a specific UUID page.
2. User is shown the join screen, asking them to give themselves a name.
3. If user is in index page, show them an option to create a new room. If they click it, then get a fresh UUID from server and redirect to that page. They will immediately open camera/audio, and also a button to copy URL to clipboard.
4. Alternatively, there will be a join room button with an input to fill in the UUID.
5. They will have the option to toggle their camera/audio
6. If user goes to a UUID page, then ping server to see if a room is already created. If so, then show a page to ask them for their screen name before joining
7. If the UUID is not an active room, then show a 404 screen saying that room was not found. Add a button to redirect them to home page

git subtree push --prefix server heroku main
