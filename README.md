# Website Key Color Fetch

Get the six most prominent colors on a website.

- Get a headless screenshot with `puppeteer`
- Analyze the screenshot's colors with `node-vibrant`
- Return an object with the RGB and HSL colors for the site

## Getting Started
`npm install`

or

`yarn install`

Start server with `npm start` or `yarn start`

Requests to localhost:3000/url=YOUR_URL_HERE will respond with the six most prominent colors for the provided URL.