# Enhanced Backend Architecture

## 🚀 Overview

The portfolio website now features a robust, production-ready backend with comprehensive security, monitoring, and scalability features.

## 🏗️ Architecture

### Core Components

1. **Validation Layer** (`src/lib/validation.js`)
   - Comprehensive Zod schemas for all API endpoints
   - Type-safe validation with detailed error messages
   - Centralized validation logic

2. **Middleware System** (`src/lib/middleware.js`)
   - Rate limiting with configurable windows
   - Security headers and CORS management
   - Request logging and analytics
   - Authentication middleware
   - Error handling and response time tracking

3. **Email Service** (`src/lib/email.js`)
   - Multi-provider email support (SMTP, SendGrid, etc.)
   - HTML and text email templates
   - Auto-reply functionality
   - Admin notifications
   - Mock mode for development

4. **Database Layer** (`src/lib/database.js`)
   - File-based storage with caching
   - Contact form submissions management
   - Analytics and logging
   - Backup and restore functionality
   - Health monitoring

## 🔧 API Endpoints

### Public Endpoints

#### `POST /api/contact`
- **Purpose**: Handle contact form submissions
- **Features**:
  - Rate limiting (100 requests per 15 minutes)
  - Comprehensive validation
  - Email notifications (admin + auto-reply)
  - Database storage
  - Analytics tracking

#### `GET /api/health`
- **Purpose**: System health monitoring
- **Features**:
  - Database health check
  - Email service status
  - System resource monitoring
  - Cache statistics

### Protected Endpoints (Require API Token)

#### `POST /api/save-content`
- **Purpose**: Update site content
- **Features**:
  - Authentication required
  - Comprehensive validation
  - Database storage
  - Analytics tracking

#### `GET /api/save-content`
- **Purpose**: Retrieve site content
- **Features**:
  - Cached responses
  - Error handling

#### `GET /api/analytics`
- **Purpose**: Retrieve system analytics
- **Features**:
  - Filtering by event type
  - Pagination support
  - Metrics calculation

#### `POST /api/analytics`
- **Purpose**: Log analytics events
- **Features**:
  - Event tracking
  - Metadata storage

#### `GET /api/contacts`
- **Purpose**: Retrieve contact submissions
- **Features**:
  - Pagination support
  - Status filtering
  - Metrics calculation

#### `PATCH /api/contacts`
- **Purpose**: Update contact status
- **Features**:
  - Status management
  - Audit trail

#### `POST /api/email/test`
- **Purpose**: Test email functionality
- **Features**:
  - Email service testing
  - Configuration validation

## 🔒 Security Features

### Rate Limiting
- **Window**: 15 minutes
- **Limit**: 100 requests per IP per endpoint
- **Storage**: In-memory (production: Redis recommended)

### Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy`: Comprehensive CSP

### Authentication
- Bearer token authentication for protected endpoints
- Environment variable configuration
- Secure token validation

### CORS Management
- Configurable allowed origins
- Preflight request handling
- Secure cross-origin communication

## 📧 Email System

### Features
- **SMTP Support**: Gmail, Outlook, custom SMTP
- **Templates**: HTML and text versions
- **Auto-reply**: Immediate user confirmation
- **Admin Notifications**: Real-time alerts
- **Mock Mode**: Development-friendly

### Templates
1. **Contact Notification**: Admin alert for new submissions
2. **Auto-reply**: User confirmation with links
3. **Admin Alert**: Dashboard notification

## 📊 Analytics & Monitoring

### Event Tracking
- Contact form submissions
- Content updates
- Error occurrences
- System health metrics

### Metrics
- Request counts by type
- Response times
- Error rates
- User agent analysis

## 🗄️ Database Features

### Storage
- **File-based**: JSON files with caching
- **Caching**: 5-minute TTL for performance
- **Backup**: Automated backup system
- **Restore**: Point-in-time recovery

### Data Management
- Contact submissions with status tracking
- Site content versioning
- Analytics event storage
- System health logs

## 🛠️ Configuration

### Environment Variables

```bash
# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
API_TOKEN=your-secure-api-token-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Recipients
ADMIN_EMAIL=trainedvk1@gmail.com
ADMIN_DASHBOARD_EMAIL=admin@example.com
ADMIN_DASHBOARD_URL=http://localhost:3000/admin

# Security
NODE_ENV=development
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Email Test
```bash
curl -X POST http://localhost:3000/api/email/test \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your-token' \
  -d '{"to":"test@example.com"}'
```

## 📈 Performance Features

### Caching
- **File Cache**: 5-minute TTL for database operations
- **Response Cache**: Intelligent caching for static content
- **Memory Management**: Automatic cache cleanup

### Optimization
- **Rate Limiting**: Prevents abuse
- **Request Logging**: Performance monitoring
- **Error Handling**: Graceful degradation
- **Health Checks**: Proactive monitoring

## 🔧 Maintenance

### Backup
```javascript
// Automated backup
await databaseService.createBackup();
```

### Cache Management
```javascript
// Clear cache
databaseService.clearCache();

// Get cache stats
const stats = databaseService.getCacheStats();
```

### Health Monitoring
```javascript
// Health check
const health = await databaseService.healthCheck();
```

## 🛡️ Security Best Practices

1. **Environment Variables**: Never commit secrets
2. **Rate Limiting**: Prevent abuse
3. **Input Validation**: Comprehensive schema validation
4. **Error Handling**: No sensitive data in errors
5. **CORS**: Proper origin configuration
6. **Headers**: Security headers enabled
7. **Authentication**: Bearer token for protected routes

## 📝 API Documentation

### Authentication
Protected endpoints require the `Authorization` header:
```
Authorization: Bearer your-api-token
```

### Error Responses
```json
{
  "error": "Error message",
  "details": "Additional details",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Success Responses
```json
{
  "success": true,
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔮 Future Enhancements

1. **Database Migration**: PostgreSQL/MongoDB support
2. **Redis Integration**: Distributed caching
3. **WebSocket Support**: Real-time notifications
4. **File Upload**: Image and document handling
5. **Advanced Analytics**: User behavior tracking
6. **A/B Testing**: Content optimization
7. **CDN Integration**: Global content delivery
8. **Monitoring**: Sentry, LogRocket integration

## 🐛 Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check SMTP configuration
   - Verify app passwords
   - Check firewall settings

2. **Rate Limiting**
   - Increase limits in environment
   - Check request patterns
   - Monitor abuse

3. **Authentication Errors**
   - Verify API token
   - Check environment variables
   - Ensure proper headers

4. **Database Errors**
   - Check file permissions
   - Verify data directory
   - Review error logs

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and logging. 