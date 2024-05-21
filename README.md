# MERN Blog

This repository contains a blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is designed to provide a full-fledged blogging platform with features such as user authentication, post creation, and post management.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Post Management**: Users can create, read, update, and delete blog posts.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Dispenser254/MERN-Blog.git
   cd MERN-Blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the application.
2. Register a new account or log in with existing credentials.
3. Create, edit, and manage your blog posts through the user interface.

## Project Structure

- `api/`: Contains the backend code (Express.js server).
- `client/`: Contains the frontend code (React.js application).
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Lists dependencies and scripts for both backend and frontend.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or issues, please open an issue on the GitHub repository or contact the repository owner.

---

Feel free to visit the live application [here](https://mern-blog-ng2t.onrender.com).
