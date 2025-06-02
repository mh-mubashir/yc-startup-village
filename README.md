# 🏠 YC Hotel Share

<div align="center">

**The exclusive community platform connecting YC AI Startup School attendees**

*Find accommodation, coordinate flights, and build lasting connections with fellow founders*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

### 🚨 **Important Disclaimer**
This platform is **NOT officially affiliated with Y Combinator**. It's a community project built by fellow YC attendees to help each other during the startup school experience.

</div>

## 🌟 **What is YC Hotel Share?**

YC Hotel Share is a comprehensive community platform designed specifically for **YC AI Startup School attendees**. It solves the common challenges of finding accommodation, coordinating travel, and connecting with fellow founders during the event.

### ✨ **Key Features**

🏠 **Smart Accommodation Matching**
- Find verified YC attendees offering space
- Create listings for your extra accommodation
- Secure contact sharing system with host approval
- Direct communication via phone, email, and LinkedIn

✈️ **Flight Coordination**
- Connect with attendees flying from your city
- Share flight details and coordinate travel
- Find travel companions and split costs
- Airport ride coordination

📅 **Date-Based Groups**
- Join groups based on your stay dates
- Plan activities and explore SF together
- Group messaging and coordination
- Local recommendations and meetups

🔐 **Verified Community**
- Exclusive access for YC attendees only
- Verification system with insider knowledge questions
- LinkedIn profile validation
- Safe and trusted environment

💬 **Advanced Messaging System**
- Contact request approval system
- Privacy controls for sharing information
- Host dashboard for managing requests
- Direct contact exchange when approved

## 🛠️ **Tech Stack**

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom access code system
- **Email**: Resend API
- **Deployment**: Vercel-ready
- **Forms**: React Hook Form with Zod validation

## 🚀 **Quick Start**

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Resend account (for emails)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/yc-hotel-share.git
cd yc-hotel-share
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service (Optional - for code recovery)
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

**Step 1**: Create a new Supabase project

**Step 2**: Run the database schema (copy and paste in Supabase SQL Editor):

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  linkedin_url TEXT,
  access_code VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(20),
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accommodations table
CREATE TABLE accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  available_spots INTEGER NOT NULL,
  amenities TEXT[],
  house_rules TEXT,
  available_from DATE NOT NULL,
  available_until DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact requests table
CREATE TABLE contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender_phone VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact shares table
CREATE TABLE contact_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  guest_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  host_phone VARCHAR(20) NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  shared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight groups table
CREATE TABLE flight_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_city VARCHAR(100) NOT NULL UNIQUE,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flight participants table
CREATE TABLE flight_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES flight_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flight_date DATE,
  flight_time TIME,
  airline VARCHAR(100),
  notes TEXT,
  phone VARCHAR(20) NOT NULL,
  show_phone BOOLEAN DEFAULT true,
  show_email BOOLEAN DEFAULT true,
  show_linkedin BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Date groups table
CREATE TABLE date_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(start_date, end_date)
);

-- Date participants table
CREATE TABLE date_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES date_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notes TEXT,
  phone VARCHAR(20) NOT NULL,
  show_phone BOOLEAN DEFAULT true,
  show_email BOOLEAN DEFAULT true,
  show_linkedin BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_accommodations_host ON accommodations(host_id);
CREATE INDEX idx_contact_requests_to_user ON contact_requests(to_user_id);
CREATE INDEX idx_flight_participants_group ON flight_participants(group_id);
CREATE INDEX idx_date_participants_group ON date_participants(group_id);
```

**Step 3**: Disable Row Level Security (since we handle auth in our API):

```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_shares DISABLE ROW LEVEL SECURITY;
ALTER TABLE flight_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE flight_participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE date_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE date_participants DISABLE ROW LEVEL SECURITY;
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the application!

## 📝 **How It Works**

### For New Users

1. **Verification**: Answer questions only YC attendees would know
2. **Access Code**: Receive a unique access code via email
3. **Profile Setup**: Complete your profile with LinkedIn
4. **Start Connecting**: Browse accommodations, join flight groups, or create listings

### For Hosts

1. **Create Listings**: Add your accommodation details
2. **Manage Requests**: Review contact requests from interested guests
3. **Approve Connections**: Share contact info with approved guests
4. **Direct Communication**: Connect via phone, email, or LinkedIn

### For Groups

1. **Flight Buddies**: Join groups based on departure city
2. **Date Groups**: Connect with people staying the same dates
3. **Share Details**: Add flight info, notes, and contact preferences
4. **Coordinate**: Plan travel and activities together

## 🎨 **Customization**

### Verification Questions

Update the verification questions in `src/app/api/verify-attendee/route.ts`:

```typescript
const CORRECT_ANSWERS = {
  // Update these with your event-specific questions
  question1: 'correct_answer1',
  question2: 'correct_answer2',
  // ...
}
```

### Styling

The app uses Tailwind CSS with custom animations. Key files:
- `src/app/globals.css` - Global styles
- `src/app/page.tsx` - Homepage with premium animations
- Component-level styles using Tailwind classes

### Email Templates

Customize email templates in:
- `src/app/api/verify-attendee/route.ts` - Welcome emails
- `src/app/api/recover-code/route.ts` - Recovery emails

## 🔧 **Deployment**

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Environment Variables**: Add your `.env.local` variables to Vercel
3. **Deploy**: Automatic deployment on push to main

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 **Contributing**

We welcome contributions from the YC community! Here's how to help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- **Code Style**: Use TypeScript and follow existing patterns
- **Components**: Create reusable UI components in `src/components/`
- **API Routes**: Follow REST conventions in `src/app/api/`
- **Database**: Use proper migrations for schema changes
- **Testing**: Test your changes thoroughly before submitting

### Ideas for Contributions

- 🌐 **Internationalization**: Add support for multiple languages
- 📱 **Mobile App**: React Native version
- 🔔 **Real-time Notifications**: WebSocket integration
- 📊 **Analytics Dashboard**: Usage statistics for admins
- 🎨 **Themes**: Dark mode and custom color schemes
- 🔍 **Advanced Search**: Better filtering and search capabilities
- 📍 **Maps Integration**: Location-based features
- 🤖 **AI Matching**: Smart recommendation system

## 🐛 **Issues & Support**

### Reporting Issues

Found a bug? Please check existing issues first, then create a new one with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and community chat
- **LinkedIn**: Contact the creator directly

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Y Combinator**: For creating an amazing community (though this project is not officially affiliated)
- **YC AI Startup School Attendees**: For being the inspiration and first users
- **Open Source Community**: For the incredible tools and libraries used
- **Contributors**: Everyone who helps make this platform better

## 📞 **Contact**

**Project Creator**: [Your Name]
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]
- **Email**: [Your Email]

**Project Links**:
- **Live Demo**: [Your Deployed URL]
- **Repository**: [This GitHub Repo]
- **Documentation**: [Wiki/Docs Link]

---

<div align="center">

**Made with ❤️ by the YC community, for the YC community**

*Built by founders, for founders*

⭐ **Star this repo** if you find it useful!

</div>