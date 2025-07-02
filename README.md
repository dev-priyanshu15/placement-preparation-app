# 🎓 EduSphere: Interactive Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.0+-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue)](https://www.typescriptlang.org/)

> **Empowering careers through interactive placement preparation**

EduSphere is a comprehensive, modern e-learning platform specifically designed for placement preparation. Built with cutting-edge technologies, it provides an immersive learning experience that bridges the gap between academic knowledge and industry requirements.

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start](#-quick-start)
- [📖 Detailed Setup](#-detailed-setup)
- [🎯 Usage Guide](#-usage-guide)
- [📚 API Documentation](#-api-documentation)
- [🏗️ Architecture](#️-architecture)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support & Contact](#-support--contact)

---

## 🌟 Overview

EduSphere revolutionizes placement preparation by offering:

- **Comprehensive Curriculum**: Covers technical skills, aptitude, HR preparation, and soft skills
- **Industry-Aligned Content**: Updated regularly to match current market demands
- **Interactive Learning**: Engaging multimedia content and hands-on practice
- **Performance Analytics**: Detailed insights into learning progress and weak areas
- **Community Learning**: Collaborative environment with peer discussions and mentorship

### 🎯 Mission Statement
To democratize quality placement preparation and help students achieve their career aspirations through technology-driven, accessible education.

---

## ✨ Key Features

### 👤 **User Experience**
- **🔐 Advanced Authentication**: Multi-factor authentication with social login options
- **📱 Responsive Design**: Seamless experience across all devices
- **🌙 Dark/Light Mode**: Customizable UI themes
- **🔔 Smart Notifications**: Personalized reminders and updates
- **♿ Accessibility**: WCAG 2.1 compliant for inclusive learning

### 📚 **Learning Management**
- **📖 Dynamic Course Catalog**: Categorized courses with difficulty levels
- **🎥 Rich Media Content**: HD videos, interactive coding environments, and visual aids
- **📝 Adaptive Assessments**: AI-powered quizzes that adjust to learning pace
- **📊 Progress Analytics**: Detailed performance tracking and insights
- **🏆 Gamification**: Badges, leaderboards, and achievement systems

### 💬 **Community & Collaboration**
- **💭 Discussion Forums**: Topic-based forums with threaded conversations
- **👥 Study Groups**: Form and join study groups with peers
- **🎯 Mentorship Program**: Connect with industry professionals
- **📋 Doubt Resolution**: 24/7 doubt clearing sessions

### 🔧 **Administrative Tools**
- **📊 Analytics Dashboard**: Comprehensive insights for administrators
- **👥 User Management**: Advanced user roles and permissions
- **📚 Content Management**: Drag-and-drop course builder
- **💰 Revenue Tracking**: Integrated payment and revenue analytics

### 🔌 **Integrations**
- **💳 Payment Gateway**: Secure payments via Stripe and Razorpay
- **📧 Email Service**: Automated notifications via SendGrid
- **☁️ Cloud Storage**: AWS S3 for media content
- **📊 Analytics**: Google Analytics and custom tracking

---

## 🛠️ Technology Stack

### **Frontend**
- **⚛️ React 18** - Modern React with Concurrent Features
- **🔄 Next.js 13** - App Router with Server Components
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first styling
- **📊 Recharts** - Interactive data visualizations
- **🔄 React Query** - Powerful data synchronization
- **📱 Framer Motion** - Smooth animations

### **Backend**
- **🟢 Node.js** - Runtime environment
- **⚡ Express.js** - Web application framework
- **🗄️ MongoDB** - NoSQL database with Mongoose ODM
- **🔒 JWT & Passport.js** - Authentication and authorization
- **📧 Nodemailer** - Email services
- **🔍 Elasticsearch** - Advanced search capabilities

### **DevOps & Deployment**
- **🐳 Docker** - Containerization
- **☁️ AWS/Vercel** - Cloud hosting
- **🔄 GitHub Actions** - CI/CD pipeline
- **📊 Monitoring** - Sentry for error tracking
- **🗄️ Redis** - Caching and session storage

### **Development Tools**
- **📏 ESLint & Prettier** - Code quality and formatting
- **🧪 Jest & React Testing Library** - Comprehensive testing
- **📚 Storybook** - Component documentation
- **🔍 Husky** - Git hooks for code quality

---

## 🚀 Quick Start

Get EduSphere running locally in 5 minutes:

```bash
# Clone the repository
git clone https://github.com/spriyanshucoder/edusphere.git
cd edusphere

# Install dependencies and start development
npm run setup && npm run dev
```

Access the application at `http://localhost:3000`

**Default Admin Credentials:**
- Email: `admin@edusphere.com`
- Password: `admin123`

---

## 📖 Detailed Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Docker** (optional) - [Download](https://www.docker.com/)

### Environment Configuration

Create environment files for different environments:

#### `.env.development`
```env
# Application
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGO_URI=mongodb://localhost:27017/edusphere_dev
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Payment Gateway
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Cloud Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=edusphere-media

# External APIs
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=your_sentry_dsn
```

### Installation Steps

1. **Clone and Setup**
   ```bash
   git clone https://github.com/spriyanshucoder/edusphere.git
   cd edusphere
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client && npm install
   
   # Install backend dependencies
   cd ../server && npm install
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Seed the database with initial data
   npm run seed
   ```

4. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:client  # Frontend only
   npm run dev:server  # Backend only
   ```

### Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

---

## 🎯 Usage Guide

### For Students

1. **Getting Started**
   - Sign up with email or social login
   - Complete profile setup and skill assessment
   - Browse recommended courses based on your goals

2. **Learning Path**
   - Follow personalized learning paths
   - Complete modules in sequence or skip to specific topics
   - Practice with coding challenges and mock interviews

3. **Track Progress**
   - Monitor completion rates and performance scores
   - Review detailed analytics and improvement suggestions
   - Earn certificates upon course completion

### For Instructors

1. **Content Creation**
   - Use the intuitive course builder
   - Upload videos, create quizzes, and assignments
   - Set up automated grading and feedback

2. **Student Management**
   - Monitor student progress and engagement
   - Provide personalized feedback and mentorship
   - Conduct live sessions and webinars

### For Administrators

1. **Platform Management**
   - Access comprehensive analytics dashboard
   - Manage users, courses, and content
   - Configure system settings and integrations

2. **Business Intelligence**
   - Track revenue and user growth metrics
   - Analyze course effectiveness and student outcomes
   - Generate custom reports and insights

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.edusphere.com/v1
```

### Authentication
All API requests require authentication via JWT tokens:
```bash
Authorization: Bearer <your_jwt_token>
```

### Core Endpoints

#### Authentication
```bash
POST /auth/register          # User registration
POST /auth/login            # User login
POST /auth/refresh          # Refresh JWT token
POST /auth/forgot-password  # Password reset request
PUT  /auth/reset-password   # Reset password
```

#### Users
```bash
GET    /users/profile       # Get user profile
PUT    /users/profile       # Update user profile
GET    /users/progress      # Get learning progress
POST   /users/avatar        # Upload profile picture
```

#### Courses
```bash
GET    /courses             # List all courses
GET    /courses/:id         # Get course details
POST   /courses/:id/enroll  # Enroll in course
GET    /courses/:id/content # Get course content
POST   /courses/:id/review  # Add course review
```

#### Assessments
```bash
GET    /assessments/:courseId    # Get course assessments
POST   /assessments/submit       # Submit assessment
GET    /assessments/results/:id  # Get assessment results
```

For complete API documentation with examples, visit: [API Docs](https://docs.edusphere.com)

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│   Next.js API   │───▶│   Express API   │
│   (Frontend)    │    │   (Middleware)  │    │   (Backend)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                       ┌─────────────────┐            │
                       │     Redis       │◀───────────┤
                       │   (Caching)     │            │
                       └─────────────────┘            │
                                                       │
                       ┌─────────────────┐            │
                       │    MongoDB      │◀───────────┘
                       │   (Database)    │
                       └─────────────────┘
```

### Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    skills: [String],
    experience: String
  },
  role: String, // 'student', 'instructor', 'admin'
  preferences: {
    theme: String,
    notifications: Boolean,
    language: String
  },
  progress: {
    coursesEnrolled: [ObjectId],
    coursesCompleted: [ObjectId],
    totalPoints: Number,
    achievements: [ObjectId]
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  instructor: ObjectId,
  category: String,
  level: String, // 'beginner', 'intermediate', 'advanced'
  duration: Number, // in hours
  price: Number,
  thumbnail: String,
  curriculum: [{
    module: String,
    lessons: [{
      title: String,
      type: String, // 'video', 'article', 'quiz'
      content: String,
      duration: Number,
      resources: [String]
    }]
  }],
  ratings: {
    average: Number,
    count: Number
  },
  enrollmentCount: Number,
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm run test -- --testNamePattern="User Authentication"
```

### Test Structure

```
tests/
├── unit/           # Unit tests for individual functions
├── integration/    # Integration tests for API endpoints
├── e2e/           # End-to-end tests with Cypress
└── __mocks__/     # Mock files for testing
```

### Testing Strategy

- **Unit Tests**: Jest for business logic and utility functions
- **Component Tests**: React Testing Library for UI components
- **Integration Tests**: Supertest for API endpoint testing
- **E2E Tests**: Cypress for complete user workflows
- **Performance Tests**: Lighthouse CI for performance monitoring

---

## 🚀 Deployment

### Production Deployment

#### Using Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Using Docker

```bash
# Build production images
docker build -t edusphere-client ./client
docker build -t edusphere-server ./server

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

#### Environment Variables for Production

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edusphere
REDIS_URL=redis://redis-server:6379
JWT_SECRET=your_production_jwt_secret
# ... other production variables
```

### Monitoring & Logging

- **Error Tracking**: Sentry integration for real-time error monitoring
- **Performance**: New Relic for application performance monitoring
- **Logs**: Winston for structured logging
- **Uptime**: Pingdom for service availability monitoring

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/edusphere.git
   cd edusphere
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow our coding standards
   - Add tests for new features
   - Update documentation

4. **Submit Pull Request**
   ```bash
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

### Development Guidelines

#### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages using [Conventional Commits](https://conventionalcommits.org/)
- Maintain test coverage above 80%

#### Commit Message Format
```
type(scope): subject

body

footer
```

Example:
```
feat(auth): add social login integration

- Implement Google OAuth 2.0
- Add Facebook login support
- Update user schema for social profiles

Closes #123
```

### Issue Templates

- 🐛 **Bug Report**: Report bugs with detailed reproduction steps
- ✨ **Feature Request**: Suggest new features or improvements
- 📚 **Documentation**: Improvements to documentation
- ❓ **Question**: Ask questions about the project

### Recognition

Contributors are recognized in our [Hall of Fame](https://edusphere.com/contributors) and receive special badges on the platform.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

✅ Commercial use  
✅ Modification  
✅ Distribution  
✅ Private use  

❌ Liability  
❌ Warranty  

---

## 📞 Support & Contact

### 🆘 Getting Help


- **🐛 Bug Reports**: [GitHub Issues](https://github.com/spriyanshucoder/edusphere/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/spriyanshucoder/edusphere/discussions)

### 📧 Direct Contact

- **Project Maintainer**: [s.priyanshu.coder@gmail.com](mailto:s.priyanshu.coder@gmail.com)

### 🌐 Social Media

- **LinkedIn**: 
- **Twitter**: 
- **YouTube**: 

---

<div align="center">

### 🌟 Star this repository if you find it helpful!

**Made with ❤️ by the EduSphere Team**

[⬆ Back to Top](#-edusphere-interactive-learning-platform)

</div>
