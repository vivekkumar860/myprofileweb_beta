import { NextResponse } from 'next/server';
import { siteContentSchema } from '../../../lib/validation';
import { databaseService } from '../../../lib/database';

export async function POST(request) {
  try {
    // console.log('API: Received POST request');
    // console.log('API: Request headers:', Object.fromEntries(request.headers.entries()));
    
    // Validate request body
    const body = await request.json();
    // console.log('API: Received body:', body);
    
    // Enhanced validation for the new About section structure
    const validatedData = {
      profile: {
        name: body.profile?.name || "Vivek Kumar",
        titles: body.profile?.titles || ["Talent Acquisition Coordinator"],
        location: body.profile?.location || "Phagwara, Punjab",
        linkedinUrl: body.profile?.linkedinUrl || "https://www.linkedin.com/in/vivekkumar860/",
        email: body.profile?.email || "trainedvk1@gmail.com",
        phone: body.profile?.phone || "+91-XXXXXXXXXX",
        profileImage: body.profile?.profileImage || "/profile.jpg",
        coverImage: body.profile?.coverImage || "/about.jpg",
        socialLinks: body.profile?.socialLinks || {
          linkedin: "https://www.linkedin.com/in/vivekkumar860/",
          github: "https://github.com/vivekkumar860",
          twitter: "",
          instagram: "",
          website: ""
        },
        personalInfo: body.profile?.personalInfo || {
          dateOfBirth: "2002-XX-XX",
          nationality: "Indian",
          languages: ["English", "Hindi", "Punjabi"],
          interests: ["Coding", "Anime", "Technology", "Networking", "HR Tech"],
          availability: "Open to opportunities",
          relocation: "Willing to relocate",
          noticePeriod: "Immediate"
        }
      },
      about: {
        mainBio: body.about?.mainBio || body.bio || "Based in Phagwara, Punjab, I'm passionate about connecting talent with opportunity and building my skills at the intersection of technology and HR.",
        shortBio: body.about?.shortBio || "Talent Acquisition Coordinator with a passion for technology and HR innovation.",
        mission: body.about?.mission || "To bridge the gap between talent and technology, creating opportunities for growth and innovation.",
        values: body.about?.values || ["Continuous Learning", "Innovation", "Collaboration", "Excellence", "Integrity"],
        funFacts: body.about?.funFacts || [
          "Active member of Coding and Anime Clubs",
          "Certified in multiple networking technologies",
          "Passionate about HR Tech innovation",
          "Always eager to learn new technologies"
        ],
        testimonials: body.about?.testimonials || [
          {
            id: 1,
            name: "HR Manager",
            company: "Placify.ai",
            text: "Vivek has been instrumental in streamlining our recruitment process and improving candidate experience.",
            rating: 5
          },
          {
            id: 2,
            name: "Technical Lead",
            company: "University Project",
            text: "Excellent technical skills combined with strong communication abilities make Vivek a valuable team member.",
            rating: 5
          }
        ]
      },
      bio: body.bio || body.about?.mainBio || "Based in Phagwara, Punjab, I'm passionate about connecting talent with opportunity and building my skills at the intersection of technology and HR.",
      highlights: body.highlights || [],
      projects: body.projects || [],
      statistics: body.statistics || { 
        experience: "2+", 
        projects: "10+", 
        clients: "5+",
        skills: "15+",
        certifications: "4+",
        languages: "3+"
      },
      certificates: body.certificates || [],
      achievements: body.achievements || [],
      skills: body.skills || {
        technical: ["Java", "JavaScript", "Python", "C/C++", "HTML", "CSS"],
        tools: ["React", "Node.js", "Git", "VS Code", "Figma"],
        databases: ["MySQL", "MongoDB", "PostgreSQL"],
        cloud: ["AWS", "Google Cloud", "Azure"]
      },
      experience: body.experience || [],
      education: body.education || [],
      timeline: body.timeline || {
        experience: [
          {
            id: 1,
            year: "2024",
            title: "Talent Acquisition Coordinator",
            company: "Placify.ai",
            description: "Supporting end-to-end hiring processes",
            icon: "💼"
          }
        ],
        education: [
          {
            id: 1,
            year: "2022-2026",
            title: "B.Tech. CSE (AI & ML)",
            institution: "Lovely Professional University",
            description: "Computer Science & Engineering with AI & ML specialization",
            icon: "🎓"
          }
        ],
        certifications: [
          {
            id: 1,
            year: "2024",
            title: "TCP/IP & Advanced Topics",
            issuer: "Coursera",
            description: "Advanced networking certification",
            icon: "📜"
          }
        ]
      }
    };
    
    // console.log('API: Validated data:', validatedData);
    
    // Save to database
    await databaseService.saveSiteContent(validatedData);
    // console.log('API: Data saved successfully');
    
    return NextResponse.json({ 
      message: 'Content saved successfully!',
      success: true,
      timestamp: new Date().toISOString(),
      sections: Object.keys(validatedData)
    });
    
  } catch (error) {
    console.error('API: Save content error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to save content',
      message: error.message,
      details: error.stack
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // console.log('API: GET request received');
    const content = await databaseService.getSiteContent();
    
    if (!content) {
      // console.log('API: No content found, returning default structure');
      return NextResponse.json({
        profile: {
          name: "Vivek Kumar",
          titles: ["Talent Acquisition Coordinator", "B.Tech. CSE (AI & ML) Student"],
          location: "Phagwara, Punjab",
          linkedinUrl: "https://www.linkedin.com/in/vivekkumar860/",
          email: "trainedvk1@gmail.com",
          phone: "+91-XXXXXXXXXX",
          profileImage: "/profile.jpg",
          coverImage: "/about.jpg",
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/vivekkumar860/",
            github: "https://github.com/vivekkumar860",
            twitter: "",
            instagram: "",
            website: ""
          },
          personalInfo: {
            dateOfBirth: "2002-XX-XX",
            nationality: "Indian",
            languages: ["English", "Hindi", "Punjabi"],
            interests: ["Coding", "Anime", "Technology", "Networking", "HR Tech"],
            availability: "Open to opportunities",
            relocation: "Willing to relocate",
            noticePeriod: "Immediate"
          }
        },
        about: {
          mainBio: "Based in Phagwara, Punjab, I'm passionate about connecting talent with opportunity and building my skills at the intersection of technology and HR. Currently supporting end-to-end hiring at Placify.ai, I bring experience in job posting, candidate screening, and onboarding. I'm pursuing a B.Tech. in Computer Science & Engineering (AI & ML) at Lovely Professional University, and I'm active in the Coding and Anime Clubs. Certified in computer networking, web design, and more. Always eager to learn and collaborate on innovative projects.",
          shortBio: "Talent Acquisition Coordinator with a passion for technology and HR innovation.",
          mission: "To bridge the gap between talent and technology, creating opportunities for growth and innovation.",
          values: ["Continuous Learning", "Innovation", "Collaboration", "Excellence", "Integrity"],
          funFacts: [
            "Active member of Coding and Anime Clubs",
            "Certified in multiple networking technologies",
            "Passionate about HR Tech innovation",
            "Always eager to learn new technologies"
          ],
          testimonials: [
            {
              id: 1,
              name: "HR Manager",
              company: "Placify.ai",
              text: "Vivek has been instrumental in streamlining our recruitment process and improving candidate experience.",
              rating: 5
            },
            {
              id: 2,
              name: "Technical Lead",
              company: "University Project",
              text: "Excellent technical skills combined with strong communication abilities make Vivek a valuable team member.",
              rating: 5
            }
          ]
        },
        bio: "Based in Phagwara, Punjab, I'm passionate about connecting talent with opportunity and building my skills at the intersection of technology and HR.",
        highlights: [],
        projects: [],
        statistics: { 
          experience: "2+", 
          projects: "10+", 
          clients: "5+",
          skills: "15+",
          certifications: "4+",
          languages: "3+"
        },
        certificates: [],
        achievements: [],
        skills: {
          technical: ["Java", "JavaScript", "Python", "C/C++", "HTML", "CSS"],
          tools: ["React", "Node.js", "Git", "VS Code", "Figma"],
          databases: ["MySQL", "MongoDB", "PostgreSQL"],
          cloud: ["AWS", "Google Cloud", "Azure"]
        },
        experience: [],
        education: [],
        timeline: {
          experience: [
            {
              id: 1,
              year: "2024",
              title: "Talent Acquisition Coordinator",
              company: "Placify.ai",
              description: "Supporting end-to-end hiring processes",
              icon: "💼"
            }
          ],
          education: [
            {
              id: 1,
              year: "2022-2026",
              title: "B.Tech. CSE (AI & ML)",
              institution: "Lovely Professional University",
              description: "Computer Science & Engineering with AI & ML specialization",
              icon: "🎓"
            }
          ],
          certifications: [
            {
              id: 1,
              year: "2024",
              title: "TCP/IP & Advanced Topics",
              issuer: "Coursera",
              description: "Advanced networking certification",
              icon: "📜"
            }
          ]
        }
      });
    }
    
    // console.log('API: Returning content:', content);
    return NextResponse.json(content);
  } catch (error) {
    console.error('API: GET error:', error);
    return NextResponse.json({ 
      error: 'Failed to get content',
      message: error.message,
      details: error.stack
    }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({ message: 'OK' });
}
