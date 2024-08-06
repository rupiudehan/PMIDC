#!/bin/bash

  user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: '123',
    port: 5432,
  })

# Variables
SERVER_USER="postgres"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/your-app"
LOCAL_PATH="."

# Step 1: Build your project (if needed)
# npm run build

# Step 2: Copy files to the server
scp -r $LOCAL_PATH $SERVER_USER@$SERVER_IP:$SERVER_PATH

# Step 3: SSH into the server and restart the application
ssh $SERVER_USER@$SERVER_IP << 'EOF'
  cd $SERVER_PATH
  npm install --production
  pm2 stop all
  pm2 start ./bin/www
EOF

echo "Deployment completed successfully!"
