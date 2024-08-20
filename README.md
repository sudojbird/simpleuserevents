## Simple User Events

This project is a quick example of how to track user events and log them in database. It's a simple and cheap alternative to using overly complex, expensive, and robust user event tracking platforms. 

This example only tracks events for wallet-connected or authenticated users. 

- useLogEvent: Hook to track any custom event (button clicks, form submissions, etc)
- useLogView: Hook that automatically logs where a user navigates to (page views)

## Getting Started

Clone the repo, set-up & connect your own database, add local env variables, & deploy. 

```bash
# install dependencies
npm i
# start local server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.