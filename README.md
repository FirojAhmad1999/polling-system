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



Configure Environment Variables:

Create a .env file in the root directory.
Use the provided .env.sample file as a reference.
Update Zookeeper Properties:

Modify the zookeeper.properties file with the following:
properties
Copy code
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181
initLimit=5
syncLimit=2
Build and Start Containers:

Run the following command:
bash
Copy code
docker-compose up --build
Access the Application:

API Base URL: http://localhost:5000
PgAdmin: http://localhost:5050
Email: admin@example.com
Password: admin
Test WebSocket Connectivity:

Use a WebSocket client like wscat:
bash
Copy code
wscat -c ws://localhost:5000
API Endpoints
Poll Management
Create a Poll:

POST /api/polls
Request Body:
json
Copy code
{
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"]
}
Vote on a Poll:

POST /api/polls/{id}/vote
Request Body:
json
Copy code
{
  "option": "JavaScript"
}
Get Poll Results:

GET /api/polls/{id}
Leaderboard:

GET /api/leaderboard
Environment Variables
Create a .env file in the root directory.
Refer to the .env.sample file for the required keys.
Sample .env.sample
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
Testing Instructions
Test API Endpoints:

Use Postman or curl for testing.
Example for creating a poll:
bash
Copy code
curl -X POST http://localhost:5000/api/polls \
-H "Content-Type: application/json" \
-d '{"question":"What is your favorite programming language?", "options":["JavaScript", "Python"]}'
Test WebSocket Communication:

Install wscat:
bash
Copy code
npm install -g wscat
Connect to the WebSocket server:
bash
Copy code
wscat -c ws://localhost:5000
