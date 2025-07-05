# CodeQuest Backend - Quick Start Guide

## 🚀 Immediate Next Steps

### 1. Project Setup
```bash
# Create backend directory
mkdir codequest-backend
cd codequest-backend

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install pg redis socket.io express-session connect-redis
npm install multer nodemailer express-rate-limit express-validator

# Install dev dependencies
npm install -D nodemon jest supertest eslint prettier
```

### 2. Environment Variables (.env)
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/codequest
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=codequest-files

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Code Execution
DOCKER_SOCKET_PATH=/var/run/docker.sock
```

### 3. Basic Project Structure
```
codequest-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── problemsController.js
│   │   ├── submissionsController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   ├── problems.js
│   │   └── ...
│   ├── services/
│   │   ├── codeExecutionService.js
│   │   ├── emailService.js
│   │   └── ...
│   ├── utils/
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── ...
│   ├── websocket/
│   │   ├── socketHandlers.js
│   │   └── ...
│   └── app.js
├── tests/
├── docker/
├── migrations/
├── package.json
└── README.md
```

### 4. Priority Implementation Order

#### Week 1: Core Infrastructure
- [ ] Set up Express server with basic middleware
- [ ] Configure PostgreSQL connection and basic models
- [ ] Set up Redis for session management
- [ ] Implement basic authentication (register/login/logout)
- [ ] Create user profile management endpoints

#### Week 2: Problem Management
- [ ] Create problems CRUD endpoints
- [ ] Implement basic code execution service
- [ ] Set up submission system
- [ ] Create test case validation
- [ ] Add problem filtering and search

#### Week 3: User Progress & Analytics
- [ ] Implement user progress tracking
- [ ] Create statistics calculation
- [ ] Add analytics endpoints
- [ ] Build dashboard data aggregation
- [ ] Set up achievement system

#### Week 4: Real-time Features
- [ ] Implement WebSocket connection handling
- [ ] Create multiplayer room management
- [ ] Add real-time code execution feedback
- [ ] Build notification system
- [ ] Add live leaderboards

### 5. Essential Services to Implement First

#### Authentication Service
```javascript
// Example structure
class AuthService {
  async register(userData) { }
  async login(credentials) { }
  async verifyToken(token) { }
  async refreshToken(token) { }
}
```

#### Code Execution Service
```javascript
// Example structure
class CodeExecutionService {
  async executeCode(language, code, testCases) { }
  async validateSubmission(problemId, code, language) { }
  async getExecutionResult(executionId) { }
}
```

#### Problem Service
```javascript
// Example structure
class ProblemService {
  async getProblems(filters, pagination) { }
  async getProblemById(id) { }
  async submitSolution(problemId, userId, code) { }
}
```

### 6. Database Migration Scripts

Create initial migration files for:
- Users and user profiles
- Problems and test cases
- Submissions and results
- User progress tracking

### 7. Docker Configuration

#### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=codequest
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

### 8. Testing Strategy

#### Unit Tests
- Controllers logic
- Service methods
- Utility functions
- Database models

#### Integration Tests
- API endpoints
- Database operations
- Authentication flows
- Code execution pipeline

#### Performance Tests
- Load testing for API endpoints
- Database query optimization
- WebSocket connection handling
- Code execution under load

### 9. Development Workflow

1. **Local Development**
   - Use nodemon for auto-restart
   - Set up ESLint and Prettier
   - Configure pre-commit hooks

2. **API Documentation**
   - Use Swagger/OpenAPI
   - Document all endpoints
   - Provide example requests/responses

3. **Error Handling**
   - Centralized error handling middleware
   - Proper HTTP status codes
   - Detailed error logging

4. **Security**
   - Input validation on all endpoints
   - Rate limiting per user/IP
   - CORS configuration
   - Helmet for security headers

### 10. Frontend Integration

Update the frontend `authService.js` to point to your backend:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
```

This quick start guide provides the immediate steps needed to begin implementing the backend infrastructure for CodeQuest. Follow the detailed todo list in `BACKEND_TODO.md` for complete implementation specifications.