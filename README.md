# Nest Js Crud Application


### Objective:
Develop a basic NESTjs application to manage a PostgreSQL database with two tables: `Users` and `WalletAddress`. Implement CRUD operations for these tables.

### Tables:
1. **Users**
   - Define the attributes for the `Users` table.

2. **WalletAddress**
   - Define the attributes for the `WalletAddress` table.

### Requirements:
1. **API Endpoints:**
   - Implement basic CRUD operations for both `Users` and `WalletAddress` tables.

2. **Validation:**
   - Implement basic validation for input data to ensure data integrity.

3. **Error Handling:**
   - Handle basic errors and provide appropriate responses.

4. **Documentation:**
   - Provide basic documentation for the API endpoints and any setup instructions.

### Instructions:
1. **Database Setup:**
   - Set up a PostgreSQL database with two tables: `Users` and `WalletAddress`. Define appropriate attributes for each table.

2. **NESTjs Application:**
   - Develop a NESTjs application to handle CRUD operations for the `Users` and `WalletAddress` tables.

3. **API Development:**
   - Implement simple API endpoints for CRUD operations on both tables.

4. **Testing:**
   - Test the API endpoints using tools like Postman or curl to ensure basic functionality.

5. **Code Quality:**
   - Write simple, well-commented code following basic NESTjs conventions.

6. **Submission:**
   - Submit the code along with basic documentation and any necessary setup instructions.

Prerequisites: NestJSCli
Create a .env file and configure your PostGres environment variables:

> POSTGRES_HOST=127.0.0.1
> POSTGRES_PORT=5432
> POSTGRES_USER=postgres
> POSTGRES_PASSWORD=password
> POSTGRES_DATABASE=catOff

> npm install

Note: For development purposes the host is localhost, but this will need to be updated if you decide to deploy the application. By Default, PostGres gives the user 'postgres' with all privileges. You can change this to another user if desired. In this application we named our database 'linkedin', however, if you went with a different name this will need to be changed.

> $ npm run start:dev


