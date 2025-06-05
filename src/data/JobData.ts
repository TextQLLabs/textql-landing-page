export interface JobData {
  id: string;
  url: string;
  title: string;
  department: string;
  type: string;
  location: string;
  companyInfo: CompanyInfo; // Changed back to required
  roleDescription: string;
  responsibilities: string[];
  requirements: string[];
  additionalInfo?: string;
  applicationInfo?: string;
  process?: string[];
}

export interface CompanyInfo {
  intro: string;
  culture: string;
}

export const defaultCompanyInfo: CompanyInfo = {
  intro: "TextQL's mission is to drive the cost of a data-driven decision to zero. We sell proactive deep research for structured data. We have just raised our Series A and are actively hiring for roles throughout the organization.",
  culture: ""
};

export const jobs: JobData[] = [
  {
    id: 'member-of-technical-staff-data-engineering',
    url: '/careers/member-of-technical-staff-data-engineering',
    title: 'Member of Technical Staff (Data Engineering)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'NYC, FIDI',
    companyInfo: defaultCompanyInfo, // Reference the shared company info
    roleDescription: "If you've worked on open source data infrastructure and/or like functional programming (specifically Haskell) this one's for you. We're looking for someone who identifies strongly with one and doesn't hate the other. As Member of Technical Staff focusing on data engineering, you'll lead our data architecture efforts and help build a culture of speed and innovation.",
    responsibilities: [
      "Data Engineering Architecture Leadership: Know more about data architecture than anyone else on the team, as the leader who sets the culture at TextQL",
      "Bias Towards Speed: Prioritize rapid development, emphasizing speed in building and building that culture with the team",
      "Excited about AI use cases: Solve previously impossible problems using AI-generated code for tasks like dynamic preprocessing of datatypes",
      "Grow into the powerhouse of the team - gaining unique skills for high-level positions or entrepreneurial ventures"
    ],
    requirements: [
      "Strong opinions about the way data architecture should be designed and what accurate self-serve analytics needs to look like",
      "Excitement to work in person 5 days/week in our NYC Office in FIDI",
      "Ownership mindset, accepting everything as part of your job - focused on achieving the spirit of the task and not ticking a box",
      "Comfort with autonomy and a complete lack of guardrails, and ability to work with a great deal of ambiguity"
    ],
    additionalInfo: "Tech stack is Haskell + Typescript (Svelte) + Nix right now. You probably won't have a great time if you've never thought about touching any kind of functional programming before.\n\nNice to haves:\n- Strong opinions on the right way to build out data infrastructure\n- Previous founding or independent contracting experience\n\nOur commitment to you:\n- VERY competitive pay and benefits - along with revenue share to maximize exposure to our future success\n- Equity - duh\n- Complete autonomy over how you prioritize your time, and a perpetual right to tell us why we're wrong",
    process: [
      "Initial 30-45 minute conversation with Ethan",
      "A 45 minute interview with Mark - 15 minutes quick coding question and 30 minutes talking about experience and interests",
      "An onsite interview or remote superday"
    ],
    applicationInfo: "We prefer to do a 2-4 week work trial after this for us to both evaluate the fit. We understand that this might not be possible for some people, so for those people 2-3 reference checks should be enough.\n\nHow to Apply:\nEmail us at engineering@textql.com\n- Include the role's title in your subject line.\n- Send along links that best showcase the relevant things you've built and done."
  },
  {
    id: 'member-of-technical-staff-customer-facing',
    url: '/careers/member-of-technical-staff-customer-facing',
    title: 'Member of Technical Staff (Customer-Facing)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'NYC, FIDI',
    companyInfo: defaultCompanyInfo, // Reference the shared company info
    roleDescription: "If you've been an ex-founder CTO, data engineering consultant, forward deployed engineer, or have otherwise worked with customers to build out data infrastructure solutions... and want to start a company in the future - you'll be perfect for this role. The truth is this is a Software Engineer x Product Manager x Data Consultant rolled into one.",
    responsibilities: [
      "Frontline Customer Interactions: We don't have product managers - we trust engineers in this role to interface with our customers directly, going beyond engineering to facilitate successful product deployment and integration",
      "Product Ownership: Through your interactions with customers, you will be trusted to make product roadmap decisions on how we should integrate the TextQL product with customer's existing data tools",
      "Revenue Share and Commission: Immediate financial incentives through revenue share and commission for every successful feature rollout and production deployment participated in",
      "Pathway to Leadership and Beyond: Potential for rapid career growth, evolving into a regional or industry-specific leadership role, and gaining unique skills for high-level positions or entrepreneurial ventures"
    ],
    requirements: [
      "Experience working directly with customers to develop software products, ideally independently or as a part of a small team",
      "Comfort talking to customers",
      "Excitement to work in person 5 days/week in our NYC Office in FIDI",
      "Ownership mindset, accepting everything as part of your job - focused on achieving the spirit of the task and not ticking a box",
      "Comfort with autonomy and a complete lack of guardrails, and ability to work with a great deal of ambiguity"
    ],
    additionalInfo: "Tech stack is Haskell + Typescript (Svelte) + Nix right now. Tech stack experience not necessary if you're willing to learn.\n\nNice to haves:\n- Strong opinions on the right way to build out data infrastructure\n- Previous founding or independent contracting experience\n\nOur commitment to you:\n- VERY competitive pay and best-in-class benefits - along with revenue share to maximize exposure to our future success\n- Equity - duh\n- Complete autonomy over how you prioritize your time, and a perpetual right to tell us why we're wrong",
    process: [
      "Initial 30-45 minute conversation with Ethan",
      "A 45 minute interview with Mark - 15 minutes quick coding question and 30 minutes talking about experience and interests",
      "An onsite interview or remote superday"
    ],
    applicationInfo: "We prefer to do a 2-4 week work trial after this for us to both evaluate the fit. We understand that this might not be possible for some people, so for those people 2-3 reference checks should be enough.\n\nHow to Apply:\nEmail us at engineering@textql.com\n- Include the role's title in your subject line.\n- Send along links that best showcase the relevant things you've built and done."
  },
  {
    id: 'member-of-technical-staff-generalist',
    url: '/careers/member-of-technical-staff-generalist',
    title: 'Member of Technical Staff (Generalist)',
    department: 'Engineering',
    type: 'Full-time',
    location: 'NYC, FIDI',
    companyInfo: defaultCompanyInfo, // Reference the shared company info
    roleDescription: "We're looking for a Member of Technical Staff to join our engineering team. You'll work directly with our customers and be responsible for the development and integration of our cutting-edge data analysis platform.",
    responsibilities: [
      "Frontline Customer Interactions: We don't have product managers - we trust engineers in this role to interface with our customers directly, going beyond engineering to facilitate successful product deployment and integration",
      "Product Ownership: Through your interactions with customers, you will be trusted to make product roadmap decisions on how we should integrate the TextQL product with customer's existing data tools",
      "Revenue Share and Commission: Immediate financial incentives through revenue share and commission for every successful feature rollout and production deployment participated in",
      "Pathway to Leadership and Beyond: Potential for rapid career growth, evolving into a regional or industry-specific leadership role, and gaining unique skills for high-level positions or entrepreneurial ventures"
    ],
    requirements: [
      "Are excited to work in person 5 days/week in our NYC Office in FIDI",
      "Take ownership, and accept everything as part of their job - are focused on achieving the spirit of the task and not ticking a box",
      "Enjoy autonomy and a complete lack of guardrails, and are comfortable working with a great deal of ambiguity"
    ],
    additionalInfo: "Tech stack is Haskell + Typescript (Svelte) + Nix right now. Tech stack experience not necessary if you're willing to learn.\n\nNice to haves:\n- Strong opinions on the right way to build out data infrastructure\n\nOur commitment to you:\n- VERY competitive pay and best-in-class benefits - along with revenue share to maximize exposure to our future success\n- Equity - duh\n- Complete autonomy over how you prioritize your time, and a perpetual right to tell us why we're wrong",
    process: [
      "Initial 30-45 minute conversation with Ethan",
      "A 45 minute interview with Mark - 15 minutes quick coding question and 30 minutes talking about experience and interests",
      "An onsite interview or remote superday"
    ],
    applicationInfo: "How to Apply:\nEmail us at engineering@textql.com\n- Include the role's title in your subject line.\n- Send along links that best showcase the relevant things you've built and done."
  },
  {
    id: 'chief-of-staff',
    url: '/careers/chief-of-staff',
    title: 'Chief of Staff',
    department: 'Operations',
    type: 'Full-time',
    location: 'NYC, FIDI',
    companyInfo: defaultCompanyInfo, // Reference the shared company info
    roleDescription: "This is a role best served by an ex-founder, finance or consulting hustler, former founding GTM operator (who's comfortable with pre-PMF GTM), or scrappy engineer that prioritizes speed over scale. This role should grow you into a force multiplier of the CEO. Similar to Palantir's Echo role, we're looking for a Growth x Sales x CX x PM x Operations hybrid function.",
    responsibilities: [
      "Absolute ownership: You'll be the only non-product person at the entire company, which means everything necessary to make the company successful is in-scope for your responsibilities",
      "Fixer mindset: You'll almost certainly be asked to do a bunch of things you've never learned how to do - you need to be able to figure things out from scratch very quickly",
      "Grow into a clone of the CEO: In a non-lossy way, if the CEO gets hit by a truck in 12 months, the ideal candidate should be comfortable taking over with no loss-of-competency at that point",
      "Technical capability: You'll probably be asked to do somewhat technical things - opening up a terminal should not intimidate you"
    ],
    requirements: [
      "Excitement to work in person 5 days/week in our NYC Office in FIDI",
      "Ownership mindset, accepting everything as part of your job - focused on achieving the spirit of the task and not ticking a box",
      "Comfort with autonomy and a complete lack of guardrails, and ability to work with a great deal of ambiguity"
    ],
    additionalInfo: "Nice to haves:\n- Rolodex of potential data leaders, or an opinion on how you'd approach getting customers\n\nOur commitment to you:\n- VERY competitive pay and best-in-class benefits - along with revenue share to maximize exposure to our future success\n- Equity - duh\n- Complete autonomy over how you prioritize your time, and a perpetual right to tell us why we're wrong",
    process: [
      "Initial 30-45 minute conversation with Ethan",
      "Completion of our Field Interview",
      "An onsite interview or remote superday"
    ],
    applicationInfo: "How to Apply:\nEmail us at ethan@textql.com\n- Include the role's title in your subject line.\n- Send along links that best showcase the relevant things you've built and done."
  }
];