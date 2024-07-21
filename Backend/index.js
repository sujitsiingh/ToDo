const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const todosRoutes = require('./routes/todoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Set up Global configuration access
require('dotenv').config();
dbConnect();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/server', (req, res) => {
  res.send('Server is running...');
});

// Import routes
app.use('/api/user', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 5000;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API Backend',
      version: '1.0.0',
      description: 'Todo API Information',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Listening to the server
app.listen(PORT, () => {
  console.log(`------- Server running on port ${PORT} --------`);
});

module.exports = app;