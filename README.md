It looks like there were still some formatting issues with the Markdown. Here’s the fully cleaned-up and properly formatted version of your README file. You can now copy and paste this directly into your `README.md` file:

# Barter Base

**Barter Base** is a web platform that allows users to trade items, with the option to negotiate and complete transactions using USD. The application features a like-based interaction system and a real-time messaging feature for users to discuss trades.

## Features

- **User Authentication**: Sign up and log in securely to create a user profile.
- **Item Listings**: Post items you want to trade, complete with images and descriptions.
- **Liking System**: Like and interact with other users' items.
- **Real-time Messaging**: Use a WebSocket-powered messaging system to negotiate trades.
- **Responsive UI**: Optimized for both desktop and mobile platforms.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Real-time Communication**: WebSockets, Socket.io
- **Cloud Storage**: Firebase (for image uploads)
- **State Management**: React's Context API
- **Version Control**: Git, GitHub

## Installation

### Prerequisites
- Node.js
- PostgreSQL

## Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/barter-base.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a PostgreSQL database for Barter Base.
   - Update the `.env` file with your database credentials.

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Run the application in development mode:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `http://localhost:8000` in your browser.
2. Sign up or log in.
3. Browse, like, and trade items.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
