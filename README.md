# Information Used When Submitting

## Description

View your list of Live Twitch streamers, upcoming e-sports matches and a list of your favourite subreddits all in one place, the Hub.

## Permission Justifications

**storage**

```
The storage permission is used to save the user's extension options and sync it across their browsers. Option items are list of subreddits and Twitch user access token.
```

**host**

```
The hosts specified in the manifest.json are to fetch data. https://reddit.com/ is required to fetch subreddit JSON data from reddit.com. https://api.twitch.tv/ is used with an access token set in the options to retrieve the user's list of followed twitch streamers. https://www.vlr.gg/ is used to retrieve a list of live and upcoming esports matches. https://fonts.googleapis.com/ is used to fetch custom css fonts.

List of hosts used:
- https://reddit.com/
- https://api.twitch.tv/
- https://www.vlr.gg/
- https://fonts.googleapis.com/
```

## Install Steps For Reviewer

- Install dependencies by running the terminal command "yarn" from the project root.
- Build the app by running the terminal command "yarn buildprod" from the project root.
