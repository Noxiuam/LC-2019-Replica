# LC-2019-Replica
A recreation of the original Lunar Client launcher.

## Server Setup

Set `ServerURL` in `home.js` to your link.

### Client
You will need to create a blank file titled "latest", and paste the SHA1 hash of the client zip into it. You can also serve this using express by responding with text, instead of making a blank file.

I will not be providing a download for the client zip, as it would be redistributing Lunar Client. You are on your own for that part.

### News
For the news, its a simple JSON file.

We will use the original blog post as an example.

```json
{
    "title": "Welcome to Lunar Client",
    "content": "Lunar Client Is a modpack and a client-side anticheat built for Minecraft 1.7.10. <br><br>The goal and mission of Lunar Clent Is to help facilitate a fun, cheat-free gameplay environment for all. Lunar Client offers the most up-to-date mods and fully customizable settings all built into a sleek GUI that can be edited with a click of a button.<br><br><br>In the early stages of release, players may encounter Issues related to gameplay, mods, or anything in between. <br><br>Thank you to everyone who made this possible! We will be pushing out multiple updates in the coming days to make this an even better experience.",
    "author": "macguy8"
}
```