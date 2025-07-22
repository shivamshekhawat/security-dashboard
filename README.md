# SecureSight CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software dashboard that allows monitoring of up to 3 CCTV feeds with computer vision-powered incident detection.

## Features

### Mandatory Features ✅
- **Navbar**: Clean navigation with SecureSight branding and controls
- **Incident Player**: Left-side video player with playback controls and incident details
- **Incident List**: Right-side scrollable list of incidents with filtering and actions
- **Database Integration**: SQLite database with Prisma ORM
- **API Routes**: RESTful endpoints for incident management
- **Responsive Design**: Works across different screen sizes

### Optional Features ✅
- **Incident Timeline**: Bottom timeline view showing 24-hour incident distribution
- **Real-time Updates**: Dynamic incident resolution and filtering
- **Advanced UI**: Modern dark theme with smooth animations
- **Detailed Incident Info**: Camera location, timestamps, and threat categorization

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **API**: Next.js API routes
- **Icons**: Lucide React

## Database Schema

### Camera Model
\`\`\`prisma
model Camera {
  id        String     @id @default(cuid())
  name      String
  location  String
  incidents Incident[]
}
\`\`\`

### Incident Model
\`\`\`prisma
model Incident {
  id           String   @id @default(cuid())
  cameraId     String
  camera       Camera   @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
}
\`\`\`

## API Endpoints

### GET /api/incidents
- **Query Parameters**: `resolved=true|false`
- **Response**: Array of incidents with camera details, sorted by newest first
- **Example**: `GET /api/incidents?resolved=false`

### PATCH /api/incidents/:id/resolve
- **Purpose**: Mark an incident as resolved
- **Response**: Updated incident object
- **Example**: `PATCH /api/incidents/clq123abc/resolve`

## Deployment Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development Setup

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd securesight-dashboard
   npm install
   \`\`\`

2. **Database Setup**
   \`\`\`bash
   npm run setup
   \`\`\`
   This command will:
   - Generate Prisma client
   - Create SQLite database
   - Run seed script with sample data

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000)

### Production Deployment

#### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables if needed
4. Deploy automatically

#### Docker Deployment
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Database Commands
\`\`\`bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database  
npm run db:seed      # Seed with sample data
npm run db:studio    # Open Prisma Studio
\`\`\`

## Sample Data

The seed script creates:
- **4 Cameras**: Shop Floor A, Vault, Entrance, Parking Lot
- **15+ Incidents** across 6 threat types:
  - Gun Threat (High Priority - Red)
  - Unauthorised Access (Medium Priority - Orange)  
  - Face Recognised (Low Priority - Yellow)
  - Suspicious Activity (Medium Priority - Purple)
  - Loitering (Low Priority - Gray)
  - Vandalism (Medium Priority - Gray)

Incidents span a realistic 24-hour period with varying durations and resolution states.

## Tech Decisions

### Why SQLite?
- **Simplicity**: No external database setup required
- **Portability**: Database file can be easily moved/backed up
- **Performance**: Sufficient for demo/development purposes
- **Prisma Support**: Excellent ORM integration

### Why Next.js?
- **Full-Stack**: API routes eliminate need for separate backend
- **TypeScript**: Built-in type safety
- **Performance**: Server-side rendering and optimization
- **Developer Experience**: Hot reload, built-in routing

### Why shadcn/ui?
- **Modern Design**: Clean, professional components
- **Customizable**: Easy to modify and extend
- **Accessibility**: Built-in ARIA support
- **TypeScript**: Full type safety

## If I Had More Time...

### Backend Improvements
- [ ] **Real-time Updates**: WebSocket integration for live incident feeds
- [ ] **Authentication**: User management with role-based access
- [ ] **Advanced Filtering**: Date ranges, camera-specific filters, severity levels
- [ ] **Export Features**: PDF reports, CSV exports, video clips
- [ ] **Notification System**: Email/SMS alerts for high-priority incidents
- [ ] **Database Optimization**: PostgreSQL with connection pooling
- [ ] **Caching Layer**: Redis for improved performance
- [ ] **API Rate Limiting**: Prevent abuse and ensure stability

### Frontend Enhancements  
- [ ] **Real Video Playback**: Integrate with actual video streaming
- [ ] **3D Camera Visualization**: Interactive facility map with camera positions
- [ ] **Advanced Analytics**: Charts, trends, and incident statistics
- [ ] **Mobile App**: React Native companion app
- [ ] **Keyboard Shortcuts**: Power user navigation
- [ ] **Drag & Drop**: Reorderable incident lists
- [ ] **Dark/Light Theme**: User preference toggle
- [ ] **Accessibility**: Screen reader optimization, keyboard navigation

### DevOps & Monitoring
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Error Monitoring**: Sentry integration
- [ ] **Performance Monitoring**: Application metrics and logging
- [ ] **Load Testing**: Ensure scalability under high incident volumes
- [ ] **Backup Strategy**: Automated database backups
- [ ] **Health Checks**: API endpoint monitoring

### Security Features
- [ ] **Audit Logging**: Track all user actions and system events
- [ ] **Data Encryption**: Encrypt sensitive incident data
- [ ] **Session Management**: Secure user sessions with timeout
- [ ] **Input Validation**: Comprehensive API input sanitization
- [ ] **HTTPS Enforcement**: SSL/TLS for all communications

## Project Structure

\`\`\`
securesight-dashboard/
├── app/
│   ├── api/incidents/          # API routes
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── incident-list.tsx      # Right sidebar component
│   ├── incident-player.tsx    # Main video player
│   ├── incident-timeline.tsx  # Bottom timeline
│   └── navbar.tsx             # Top navigation
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data generator
├── types/
│   └── index.ts               # TypeScript definitions
└── README.md                  # This file
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for demonstration purposes as part of a technical assessment.
