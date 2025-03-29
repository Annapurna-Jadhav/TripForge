const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const killProcessOnPort = async (port) => {
  try {
    // For Windows
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    if (stdout) {
      const pid = stdout.split(/\s+/)[4];
      await execAsync(`taskkill /F /PID ${pid}`);
      console.log(`Killed process ${pid} on port ${port}`);
    }
  } catch (error) {
    // Process not found or other error
    console.log(`No process found on port ${port}`);
  }
};

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000;
    await killProcessOnPort(port);
    
    // Start the server
    require('./src/index.js');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 