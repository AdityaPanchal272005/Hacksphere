# Hacksphere Backend API

Backend API for the Hacksphere marketplace application.

## Features

- User authentication with JWT
- Shopping cart management
- Product listings and categories
- Order processing
- Email notifications

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
MONGO_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

3. Start the development server:
```bash
npm run dev
```

## Deployment on Render

### Step 1: Prepare your repository
1. Make sure your code is pushed to GitHub
2. Ensure all dependencies are in `package.json`
3. Verify that `start` script is defined in `package.json`

### Step 2: Deploy on Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: hacksphere-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (for testing)

### Step 3: Add Environment Variables
In the Render dashboard, add these environment variables:
- `MONGO_CONNECTION_STRING`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `NODE_ENV`: production

### Step 4: Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your application
- Your API will be available at: `https://your-service-name.onrender.com`

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create listing
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user orders

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_CONNECTION_STRING` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `EMAIL_USER` | Gmail address for sending emails | Yes |
| `EMAIL_PASS` | Gmail app password | Yes |
| `PORT` | Server port (auto-set by Render) | No |

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for emails
- Bcrypt for password hashing
