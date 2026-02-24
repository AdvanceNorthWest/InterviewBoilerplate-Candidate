const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const DEFAULT_PORT = 4000;

// Middleware
// Allow any localhost origin so the client works regardless of which port Vite picks
app.use(cors({ origin: /^http:\/\/localhost(:\d+)?$/ }));
app.use(express.json());

// Health check — leave this as-is
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount task routes
app.use(router);

function startServer(port) {
  app.listen(port)
    .on('listening', () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Health check available at http://localhost:${port}/health`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is in use, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        throw err;
      }
    });
}

startServer(DEFAULT_PORT);
