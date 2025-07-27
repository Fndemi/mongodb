# Books API

A RESTful API for managing a books collection built with Node.js, Express.js, and MongoDB.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete books
- **Pagination**: Get books with pagination support
- **MongoDB Integration**: Uses MongoDB Atlas for data storage
- **Input Validation**: Validates MongoDB ObjectIds
- **Error Handling**: Comprehensive error handling for all endpoints

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Driver** - Official MongoDB driver for Node.js
- **Nodemon** - Development tool for auto-restarting the server

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd books-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Update the MongoDB connection string in `db.js`
   - Replace the existing URI with your MongoDB Atlas connection string or local MongoDB URI

4. **Start the server**
   ```bash
   # For development (with nodemon)
   npx nodemon app.js
   
   # For production
   node app.js
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### GET /books
Retrieve all books with pagination support.

**Query Parameters:**
- `p` (optional): Page number (default: 0)
- Books per page: 3 (configurable in code)

**Example:**
```bash
GET http://localhost:3000/books?p=0
```

**Response:**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "pages": 180,
    "rating": 8
  }
]
```

### GET /books/:id
Retrieve a specific book by ID.

**Example:**
```bash
GET http://localhost:3000/books/64a1b2c3d4e5f6789abcdef0
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6789abcdef0",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "pages": 180,
  "rating": 8
}
```

### POST /books
Create a new book.

**Request Body:**
```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "pages": 281,
  "rating": 9
}
```

**Example:**
```bash
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "pages": 281,
  "rating": 9
}
```

### PATCH /books/:id
Update an existing book by ID.

**Request Body:** (partial update supported)
```json
{
  "rating": 10
}
```

**Example:**
```bash
PATCH http://localhost:3000/books/64a1b2c3d4e5f6789abcdef0
Content-Type: application/json

{
  "rating": 10
}
```

### DELETE /books/:id
Delete a book by ID.

**Example:**
```bash
DELETE http://localhost:3000/books/64a1b2c3d4e5f6789abcdef0
```

## Project Structure

```
books-api/
│
├── app.js              # Main application file with routes
├── db.js               # Database connection configuration
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependency versions
└── README.md          # Project documentation
```

## Database Schema

Books are stored with the following structure:

```javascript
{
  _id: ObjectId,        // MongoDB auto-generated ID
  title: String,        // Book title
  author: String,       // Book author
  pages: Number,        // Number of pages
  rating: Number        // Book rating
  // Add any other fields as needed
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server or database errors

Common error responses:
```json
{
  "error": "Not a valid doc id"
}
```

```json
{
  "error": "Could not fetch the documents"
}
```

## Development

### Running in Development Mode

Use nodemon for automatic server restarts during development:

```bash
npx nodemon app.js
```

### Testing the API

You can test the API using tools like:
- **Postman** - GUI-based API testing
- **curl** - Command-line HTTP client
- **Thunder Client** - VS Code extension

Example curl commands:

```bash
# Get all books
curl http://localhost:3000/books

# Get a specific book
curl http://localhost:3000/books/BOOK_ID

# Create a new book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","pages":328,"rating":9}'

# Update a book
curl -X PATCH http://localhost:3000/books/BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{"rating":10}'

# Delete a book
curl -X DELETE http://localhost:3000/books/BOOK_ID
```

## Configuration

### Database Configuration

Update the MongoDB connection string in `db.js`:

```javascript
let uri = 'your-mongodb-connection-string'
```

### Server Configuration

The server runs on port 3000 by default. To change the port, modify the `app.listen()` call in `app.js`:

```javascript
app.listen(3001, () => {
  console.log('app listening on port 3001')
})
```
