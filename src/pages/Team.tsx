import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../utils/theme-utils';

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

export default function Team() {
  const theme = useComponentTheme();
  const teamMembers: TeamMember[] = [
    {
      name: "Ethan Ding",
      title: "Founder, CEO",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/653fdcbffcf0c216090b62f0_ethan_final-p-1080.jpg"
    },
    {
      name: "Mark Hay",
      title: "Founder, CTO",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/653fdb1bbabfed99e06b37f7_mark_final-p-500.jpg"
    },
    {
      name: "Dylan Gochie-Amaro",
      title: "Head of BizOps",
      image: "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/426b1b9c-8f87-4271-d774-87588c200500/public"
    },
    {
      name: "J. Ben Mains",
      title: "Member of Technical Staff",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/679a7d1f58b970f9972c1d3e_PNG%20image%20(1)-p-800.png"
    },
    {
      name: "Gabriel Tomitsuka",
      title: "Member of Technical Staff",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/653fdc5f4fa18f1eceadcdb6_DSCF0671-2-p-800.jpg"
    },
    {
      name: "Matthew Abate",
      title: "Member of Technical Staff",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/677eff605b45bceb25f60b36_Screenshot%202025-01-08%20at%205.42.32%E2%80%AFPM-p-800.png"
    },
    {
      name: "Armaan Kapoor",
      title: "Member of Technical Staff",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/679abaa2ff53477a0271627e_pic_720.png"
    },
    {
      name: "Joseph Ma",
      title: "Member of Technical Staff",
      image: "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fe713f70-e45f-4e47-f24d-92e93ed16500/public"
    },
    {
      name: "Arman Rayatsanaati",
      title: "Machine Learning Scientist",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/677f00a559a3058be44d4eef_Screenshot%202025-01-08%20at%205.47.43%E2%80%AFPM-p-500.png"
    },
      {
      name: "Parsa Bahraminejad",
      title: "Intern of Technical Staff",
      image: "https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/03df511d-e5d7-4be3-caec-2e4defc74c00/public"
    },
    {
      name: "Braxton Wright",
      title: "GTM",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/677f0010e41d20d362770857_Screenshot%202025-01-08%20at%205.45.08%E2%80%AFPM-p-500.png"
    },
    {
      name: "Raghu Chandra",
      title: "Strategic Advisor",
      image: "https://cdn.prod.website-files.com/65233261a2e59a440d833232/678a8c4aed2472877c2f7fa6_raghu-p-800.png"
    },
    
  ];

  return (
    <div className={`min-h-screen ${themeBackgroundSecondary(theme)}`}>
      <SEO 
        title="Our Team | TextQL"
        description="Meet the team building the future of data at TextQL."
        canonical="https://textql.com/team/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <Section
        variant="wider"
        paddingTop="navbar"
        paddingBottom="md"
        overflow="hidden"
        className="relative min-h-[300px]"
      >
        {/* Background with gradient */}
        <div className={`absolute inset-0 ${themeBackgroundSecondary(theme)}`} />
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extralight mb-6 text-[#B8D8D0]">
            Team
          </h1>
          <p className="text-2xl text-[#729E8C] font-light max-w-3xl mx-auto mb-8">
            Meet the people behind TextQL.
          </p>
        </div>
        
        {/* Bottom Gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${theme === 'light' ? 'from-[#F7F7F7]' : 'from-black'} to-transparent z-20`} />
      </Section>

      {/* Team Members Grid */}
      <Section 
        variant="content"
        padding="md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white/70' : 'from-black/70'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-light text-[#B8D8D0]">{member.name}</h3>
                <p className="text-[#729E8C] font-light">{member.title}</p>
              </div>
            ))}
        </div>
      </Section>
    </div>
  );
}