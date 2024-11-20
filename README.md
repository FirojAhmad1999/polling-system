# **Polling System with Kafka, Zookeeper, and WebSockets**

This project is a high-concurrency polling system leveraging **Kafka**, **Zookeeper**, **WebSockets**, and **PostgreSQL**. It supports fault-tolerant voting, real-time updates, and a dynamically updating leaderboard, all containerized using **Docker** for easy deployment.

---

## **Features**

1. **Poll Creation**:  
   - Users can create polls with multiple options.  
   - Poll data is stored in PostgreSQL.

2. **Poll Participation**:  
   - Votes are processed through Kafka and stored in PostgreSQL.  

3. **Real-Time Updates**:  
   - WebSockets broadcast real-time poll results without refreshing the page.

4. **Leaderboard**:  
   - Tracks and ranks the most popular poll options in real-time.  

5. **Fault Tolerance**:  
   - Kafka and Zookeeper ensure reliability and resilience during failures.

---

## **Tech Stack**

- **Backend Framework**: Node.js  
- **Message Broker**: Kafka (with Zookeeper)  
- **Database**: PostgreSQL  
- **Real-Time Communication**: WebSockets  
- **Containerization**: Docker  

---

## **Setup Instructions**

### **Prerequisites**
1. Install [Docker](https://www.docker.com/).  
2. Install [Docker Compose](https://docs.docker.com/compose/).  

---

### **Steps to Run the Project**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/polling-system.git
   cd polling-system


# **Setup and Execution Guide**

This guide provides step-by-step instructions for setting up, configuring, and testing the polling system with Kafka, Zookeeper, PostgreSQL, and WebSockets.

---

## **1. Configure Environment Variables**

1. Create a `.env` file in the root directory.
2. Use the provided `.env.sample` file as a reference for required variables.

---

## **2. Update Zookeeper Properties**

1. Locate the `zookeeper.properties` file in the Kafka configuration.
2. Modify the file with the following settings:
   ```properties
   tickTime=2000
   dataDir=/var/lib/zookeeper
   clientPort=2181
   initLimit=5
   syncLimit=2


3. Build and Start Containers
Open a terminal in the project directory.
Run the following command to build and start all services:
docker-compose up --build
4. Access the Application
Once the services are running, you can access the following:
API Base URL: http://localhost:5000
PgAdmin: http://localhost:5050
Email: admin@example.com
Password: admin
5. Test WebSocket Connectivity
Use a WebSocket client like wscat to test connectivity.
Install wscat globally if not already installed:

npm install -g wscat
Connect to the WebSocket server:

wscat -c ws://localhost:5000
6. API Endpoints
6.1 Poll Management
Create a Poll
Endpoint: POST /api/polls
Request Body:
json
Copy code
{
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"]
}
Vote on a Poll
Endpoint: POST /api/polls/{id}/vote
Request Body:
json
Copy code
{
  "option": "JavaScript"
}
Get Poll Results
Endpoint: GET /api/polls/{id}
Leaderboard
Endpoint: GET /api/leaderboard
7. Environment Variables
7.1 Create a .env File
Create a .env file in the root directory.
Define the necessary variables as per the .env.sample file.
7.2 Sample .env.sample File
env
Copy code
# PostgreSQL Database Configuration
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=postgres
DB_NAME=your_database_name
DB_PORT=5432

# Kafka Configuration
KAFKA_BROKER=kafka:9092

# Server Configuration
PORT=5000
8. Testing Instructions
8.1 Test API Endpoints
Use Postman or curl to test the endpoints.
Example for creating a poll:

curl -X POST http://localhost:5000/api/polls \
-H "Content-Type: application/json" \
-d '{"question":"What is your favorite programming language?", "options":["JavaScript", "Python"]}'
8.2 Test WebSocket Communication
Use a WebSocket client like wscat:
wscat -c ws://localhost:5000
