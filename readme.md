# Base Wiki Backend

This project is the backend for the Base Wiki AI application. It provides endpoints for the frontend app and utilizes Google Gemini 1.5 Pro LLM model to generate responses for chat requests.

## Technologies Used

* **Programming Language:** Typescript
* **Framework:** Genkit 
* **Database:** MongoDB (with Mongoose library)
* **Testing:** Mocha & Chai
* **Build & Deployment:** Github Actions

## Project Structure

src
├── chat
│   ├── flow: Contains logic for creating application flows.
│   ├── handler: Handles interactions with the AI model.
│   ├── models: Mongoose models for data persistence.
│   ├── tools: Functions for fetching additional information from external sources.
│   └── models: Additional Mongoose models.
├── providers: Providers for various functionalities.
├── test: (Currently empty) Folder for unit tests.
├── utils: Utility functions.
└── lib: Contains the main application entry point (index.js).
└── package.json: Defines dependencies, scripts, and project metadata.

## Dependencies

This project relies on various dependencies. You can find the full list in `package.json`. Here are some key ones:

* `@genkit-ai/*`: Genkit framework libraries.
* `express`: Web framework for building APIs.
* `mongoose`: Object Data Modeling (ODM) library for MongoDB.
* `typescript`: Superset of JavaScript for static typing.
* `winston`: Logging library.
* `zod`: Data validation library.

## Scripts

Several scripts are defined in `package.json`:

* `start`: Starts the application in development mode.
* `build`: Compiles Typescript code.
* `dev`: Runs `build` and `start` scripts sequentially (useful for development).
* `genkit`: Starts the Genkit development server.
* `build:watch`: Compiles Typescript code in watch mode.
* `database:dev`: Starts a MongoDB container using Docker Compose (for development).
* `database:dev:remove`: Stops the MongoDB container using Docker Compose.
* `test`: Currently prints an error message indicating tests are not yet implemented.

## Deployment

## Google Cloud Authentication (Secure!)

The application utilizes Google Cloud credentials for authentication. Here's a secure approach to set them up:

### Create a Service Account:

1. Visit the Google Cloud Platform Console.
2. Navigate to "IAM & Admin" -> "Service Accounts."
3. Click "Create Service Account."
4. Give your service account a descriptive name (e.g., base-wiki-backend).
5. Grant it the following roles (search for them in the search bar):
    * Cloud Run Developer
    * Cloud Run Source Developer (crucial for source deployments!)
    * Storage Object Admin
    * Artifact Registry Administrator
    * Service Account User
    * Service Usage Admin
    * Cloud Build Editor
    * Vertex AI User

### Enable Required APIs:

1. Go to "APIs & Services" -> "Library."
2. Enable the following APIs (search for them in the search bar):
    * Cloud Run API
    * Cloud Build API
    * Cloud Storage API
    * Vertex AI API
    * Google Artifact Registry API
    * Google AI Platform Training & Prediction API

### Generate and Secure Credentials:

1. Click on the newly created service account.
2. Under "Keys," click "Add Key" and choose "JSON."
3. Download the generated JSON file (keep this extremely confidential!).
4. **Never share or commit this file to a public repository.**

### Store Credentials Securely:

1. Create a local folder named `.keys` (preceding the dot makes it hidden).
2. Rename the downloaded JSON file to `gcp-credentials.json`.
3. Place this file within the `.keys` folder.
4. Ignore the `.keys` folder in your version control system (e.g., `.gitignore`) to prevent accidental exposure.

## Security (Crucial!)

Storing your Google Cloud credentials directly in the `.keys` folder poses a significant security risk. During deployment, we need to utilize GitHub Actions Secrets for secure credential management.

### Create GitHub Secrets:

1. In your project's settings on GitHub, navigate to "Settings" -> "Secrets."
2. Create two secrets:
    * **MONGO_URI:** This secret should contain your valid MongoDB URI for storing persistent data.
    * **GCP_CREDENTIALS:** This secret should contain the content of your Google Cloud service account JSON key file. 

**Important:**  Never hardcode sensitive information like database credentials or API keys directly into your code. Always use environment variables or secrets management tools like GitHub Actions Secrets for secure storage.

## Getting Started

1. Clone the repository.
2. Install dependencies (`npm install`).
3. (Optional) Start a MongoDB instance using `npm run database:dev`.
4. Run the application in development mode using `npm run dev`.
5. To use the Genkit playground, run `npm run genkit`, and visit `http://localhost:4000` in your browser.
5. Implement unit tests in the `test` folder.

## API documentation

The API documentation is available at the (base-wiki-backend) [API documentation](https://documenter.getpostman.com/view/3459003/2sA3XWcyrv).

## Contributing

Pull requests are welcome. Please make sure your code adheres to the project's coding style and includes unit tests.

## License

This project is licensed under the ISC License. See LICENSE for details.
