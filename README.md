# **Polling System with Kafka, Zookeeper, and WebSockets**

This project implements a scalable polling system designed for high-concurrency environments. It leverages **Kafka** for fault-tolerant message handling, **Zookeeper** for broker management, **WebSockets** for real-time updates, and **PostgreSQL** for persistent data storage. The system is fully containerized using **Docker** to simplify setup and deployment.

---

## **Features**

1. **Poll Creation**  
   Users can create polls with multiple options, and the poll data is stored in a PostgreSQL database.

2. **Poll Participation**  
   Each user vote is processed via Kafka, ensuring reliability and resilience. The votes are eventually stored in the database.

3. **Real-Time Poll Updates**  
   Using WebSockets, the system provides real-time updates for poll results. Users can see updates dynamically without refreshing their browser.

4. **Leaderboard**  
   A global leaderboard dynamically ranks the most popular poll options across all active polls in real time.

5. **Fault Tolerance & Scalability**  
   The system is designed to handle high-concurrency voting scenarios using Kafka partitions. Zookeeper ensures the system remains functional during broker failures.

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

Ensure you have the following installed on your system:

1. [Docker](https://www.docker.com/)  
2. [Docker Compose](https://docs.docker.com/compose/)  

---

### **Steps to Run the Project**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/<your-username>/polling-system.git
   cd polling-system
 Configure Environment Variables

Create a .env file in the root directory.
Refer to the .env.sample file for the required configuration variables.
Update Zookeeper Properties
Modify the zookeeper.properties file to include:

properties
Copy code
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181
initLimit=5
syncLimit=2
Build and Start Containers
Run the following command to build and start all services:

bash
Copy code
docker-compose up --build
Access the Application

API Base URL: http://localhost:5000
PgAdmin: http://localhost:5050
Email: admin@example.com
Password: admin
Test WebSocket Connectivity
Use a WebSocket client like wscat:

bash
Copy code
wscat -c ws://localhost:5000
API Endpoints
Poll Management
Create a Poll
POST /api/polls
Request Body:

json
Copy code
{
  "question": "What is your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"]
}
Vote on a Poll
POST /api/polls/{id}/vote
Request Body:

json
Copy code
{
  "option": "JavaScript"
}
Get Poll Results
GET /api/polls/{id}

Leaderboard
GET /api/leaderboard

Environment Variables
Create a .env file in the root directory with the following variables. Refer to .env.sample for configuration.

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
Test API Endpoints
Use Postman or curl to test the API endpoints.
Example for creating a poll:

bash
Copy code
curl -X POST http://localhost:5000/api/polls \
-H "Content-Type: application/json" \
-d '{"question":"What is your favorite language?", "options":["JavaScript", "Python"]}'
Test WebSocket
Install wscat (if not already installed):

bash
Copy code
npm install -g wscat
Connect to the WebSocket server:



