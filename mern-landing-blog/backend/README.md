# Backend README

# MERN Landing Blog

This is the backend for the MERN Landing Blog project, which serves as a blog for a local business. The project is built using the MERN stack (MongoDB, Express, React, Node.js) and will eventually include e-commerce features and a scheduling system.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-landing-blog/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the `backend` directory and add your MongoDB connection string and any other necessary configurations.

4. Start the server:
   ```
   npm start
   ```

## Usage

The backend server will run on `http://localhost:5000` by default. You can use tools like Postman or Insomnia to test the API endpoints.

## API Endpoints

- **Blog Posts**
  - `GET /api/posts` - Retrieve all blog posts
  - `POST /api/posts` - Create a new blog post
  - `GET /api/posts/:id` - Retrieve a single blog post
  - `PUT /api/posts/:id` - Update a blog post
  - `DELETE /api/posts/:id` - Delete a blog post

- **E-commerce Products**
  - `GET /api/products` - Retrieve all products
  - `POST /api/products` - Create a new product
  - `GET /api/products/:id` - Retrieve a single product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

- **Appointments**
  - `GET /api/appointments` - Retrieve all appointments
  - `POST /api/appointments` - Create a new appointment
  - `GET /api/appointments/:id` - Retrieve a single appointment
  - `PUT /api/appointments/:id` - Update an appointment
  - `DELETE /api/appointments/:id` - Delete an appointment

## Folder Structure

```
backend
├── src
│   ├── controllers       # Business logic for routes
│   ├── models            # Mongoose models
│   ├── routes            # API endpoints
│   ├── middleware        # Middleware functions
│   ├── utils             # Utility functions
│   └── app.js            # Entry point for the application
├── package.json          # Backend dependencies
└── README.md             # Documentation for the backend
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.