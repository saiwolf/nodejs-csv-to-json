# CSV <-> JSON in ExpressJS

This is a sample repository showing an API that takes a CSV file and outputs its contents as JSON.

This project uses the following:
* ExpressJS
* Typescript
* Winston (for logging)
* Morgan (for logging)
* Bootstrap 5.3 (for client UI)
* CSV Parser

## Running the code

Ensure you have the latest `npm` or `yarn`.

Check-out the code:
```
git clone https://github.com/saiwolf/nodejs-csv-to-json.git
```

Change into the directory.
```
cd nodejs-csv-to-json
```

Rename `.env.example` to `.env`

Install node packages
```
npm install
```

Run the server
```
npm run dev
```

In a browser, navigate to http://localhost:4000 and try to upload a CSV file.