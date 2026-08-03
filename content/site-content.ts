import type { DetailContent, PageContent } from "./types";

const approval = "Client approval required";

export const services: DetailContent[] = [
  {
    slug: "software-development",
    title: "Custom software development",
    description: "Secure web and mobile systems designed around complex operations.",
    intro:
      "A delivery partnership for organizations replacing fragmented tools with maintainable digital products.",
    href: "/services/software-development",
    meta: "Software engineering",
    status: "placeholder",
    seo: {
      title: "Custom Software Development",
      description: "Explore InnovGen's custom software delivery approach.",
    },
    tags: ["Next.js", "Cloud", "API design", "Quality engineering"],
    sections: [
      {
        title: "Challenges we address",
        content: [
          "Disconnected workflows and manual processing.",
          "Legacy systems that limit integration and growth.",
          "Digital products that are difficult to maintain or scale.",
        ],
      },
      {
        title: "Capabilities",
        content: [
          "Product discovery and technical planning.",
          "Web, mobile, API and integration delivery.",
          "Quality engineering, deployment and continuous improvement.",
        ],
      },
      {
        title: "Delivery approach",
        content: [
          "Discover the operating context and success criteria.",
          "Design an accessible, secure and scalable solution.",
          "Build in measurable increments, validate and transfer knowledge.",
        ],
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI and intelligent automation",
    description: "Practical AI workflows that improve decisions and reduce repetitive work.",
    intro:
      "A focused path from opportunity assessment to governed, human-centered automation.",
    href: "/services/ai-automation",
    meta: "Artificial intelligence",
    status: "placeholder",
    seo: {
      title: "AI and Intelligent Automation",
      description: "Explore responsible AI and automation services from InnovGen.",
    },
    tags: ["AI strategy", "Workflow automation", "Data", "Governance"],
    sections: [
      {
        title: "Challenges we address",
        content: [
          "High-volume manual tasks and inconsistent decisions.",
          "Unclear AI priorities or return on investment.",
          "Data and governance concerns slowing responsible adoption.",
        ],
      },
      {
        title: "Capabilities",
        content: [
          "Opportunity discovery and feasibility assessment.",
          "AI-assisted workflows and knowledge experiences.",
          "Evaluation, governance and human review patterns.",
        ],
      },
      {
        title: "Delivery approach",
        content: [
          "Prioritize a measurable use case.",
          "Prototype with realistic data and operational constraints.",
          "Validate quality, safety and adoption before scaling.",
        ],
      },
    ],
  },
  {
    slug: "cloud-cybersecurity",
    title: "Cloud and cybersecurity",
    description: "Resilient cloud foundations with security designed into every layer.",
    intro:
      "Architecture, modernization and operational guidance for secure digital growth.",
    href: "/services/cloud-cybersecurity",
    meta: "Cloud and security",
    status: "placeholder",
    seo: {
      title: "Cloud and Cybersecurity",
      description: "Explore InnovGen cloud modernization and security capabilities.",
    },
    tags: ["Cloud architecture", "Security", "DevOps", "Resilience"],
    sections: [
      {
        title: "Challenges we address",
        content: [
          "Infrastructure that is costly or difficult to operate.",
          "Security controls added too late in delivery.",
          "Limited visibility across cloud and application environments.",
        ],
      },
      {
        title: "Capabilities",
        content: [
          "Cloud readiness and target architecture.",
          "Secure delivery pipelines and operational observability.",
          "Resilience reviews and modernization roadmaps.",
        ],
      },
      {
        title: "Delivery approach",
        content: [
          "Assess the current platform, risk and operational model.",
          "Prioritize improvements by business impact.",
          "Implement, document and enable internal teams.",
        ],
      },
    ],
  },
];

export const products: DetailContent[] = [
  {
    slug: "operations-hub",
    title: "Operations Hub",
    description: "A configurable workspace for requests, approvals and operational insight.",
    intro:
      "A product concept for unifying cross-team processes without losing governance or accountability.",
    href: "/products/operations-hub",
    meta: `Product concept · ${approval}`,
    status: "placeholder",
    seo: {
      title: "Operations Hub",
      description: "Preview the provisional Operations Hub product concept.",
    },
    tags: ["Workflows", "Approvals", "Dashboards", "Integrations"],
    sections: [
      {
        title: "Core features",
        content: [
          "Configurable requests, routing and service-level rules.",
          "Role-aware dashboards and operational reporting.",
          "Integration-ready APIs and audit history.",
        ],
      },
      {
        title: "Typical workflow",
        content: [
          "A user submits a guided request.",
          "Rules route the request to the appropriate team and approver.",
          "Stakeholders track ownership, status and outcomes in one workspace.",
        ],
      },
      {
        title: "Deployment and security",
        content: [
          "Cloud and private deployment options are subject to technical validation.",
          "Role-based access, audit logging and data policies are planned capabilities.",
        ],
      },
    ],
  },
  {
    slug: "insight-ai",
    title: "Insight AI",
    description: "A governed knowledge assistant for faster access to trusted information.",
    intro:
      "A product concept for helping teams discover, summarize and act on internal knowledge.",
    href: "/products/insight-ai",
    meta: `Product concept · ${approval}`,
    status: "placeholder",
    seo: {
      title: "Insight AI",
      description: "Preview the provisional Insight AI product concept.",
    },
    tags: ["Knowledge search", "AI assistant", "Permissions", "Evaluation"],
    sections: [
      {
        title: "Core features",
        content: [
          "Permission-aware knowledge discovery.",
          "Source-linked answers and reusable workflows.",
          "Quality evaluation and administrator controls.",
        ],
      },
      {
        title: "Typical workflow",
        content: [
          "Teams connect approved knowledge sources.",
          "Users ask questions in natural language.",
          "Answers retain source context for review and action.",
        ],
      },
      {
        title: "Deployment and security",
        content: [
          "Source permissions remain the basis for access.",
          "Hosting and model options require client-specific architecture review.",
        ],
      },
    ],
  },
];

export const projects: DetailContent[] = [
  {
    slug: "service-delivery-modernization",
    title: "Service delivery modernization",
    description:
      "A representative case-study structure for a multi-team operational platform.",
    intro:
      "This placeholder demonstrates how an approved project story will connect the original challenge to delivery decisions and measurable results.",
    href: "/projects/service-delivery-modernization",
    meta: `Enterprise operations · ${approval}`,
    status: "placeholder",
    seo: {
      title: "Service Delivery Modernization Case Study",
      description: "A provisional InnovGen project case-study template.",
    },
    tags: ["Discovery", "Product design", "Platform engineering", "Cloud"],
    sections: [
      {
        title: "Challenge",
        content: [
          "Teams relied on disconnected channels and manual status tracking.",
          "Leaders lacked a consistent view of demand, ownership and performance.",
        ],
      },
      {
        title: "Strategy and solution",
        content: [
          "Map the operating model before defining the platform.",
          "Create a shared workflow, role model and integration boundary.",
          "Deliver the highest-value service journeys in controlled increments.",
        ],
      },
      {
        title: "Results",
        content: [
          `Outcome metrics and client attribution are pending approval. ${approval}.`,
          "The final case study will include verified baseline, result and measurement period.",
        ],
      },
    ],
  },
  {
    slug: "secure-customer-portal",
    title: "Secure customer portal",
    description:
      "A representative case-study structure for a secure self-service experience.",
    intro:
      "This placeholder illustrates the planned story format for customer-facing transformation work.",
    href: "/projects/secure-customer-portal",
    meta: `Digital experience · ${approval}`,
    status: "placeholder",
    seo: {
      title: "Secure Customer Portal Case Study",
      description: "A provisional InnovGen project case-study template.",
    },
    tags: ["UX", "Identity", "API integration", "Accessibility"],
    sections: [
      {
        title: "Challenge",
        content: [
          "Customers needed a clearer route to complete common service tasks.",
          "Legacy integration and identity constraints affected experience quality.",
        ],
      },
      {
        title: "Strategy and solution",
        content: [
          "Prioritize the journeys with the highest customer and operational impact.",
          "Design accessible flows around a secure integration layer.",
          "Test with representative users before broad rollout.",
        ],
      },
      {
        title: "Results",
        content: [
          `Outcome metrics and client attribution are pending approval. ${approval}.`,
          "Only verified results will be published.",
        ],
      },
    ],
  },
];

export const blogs: DetailContent[] = [
  {
    slug: "designing-ai-workflows-for-trust",
    title: "Designing AI workflows people can trust",
    description:
      "A practical framework for keeping source context, review and accountability in AI-assisted work.",
    intro:
      "Responsible AI experience design begins with the decision being supported—not the model being used.",
    href: "/blogs/designing-ai-workflows-for-trust",
    meta: "AI & automation · 6 min read",
    status: "placeholder",
    author: `InnovGen editorial team · ${approval}`,
    published: "2026-06-18",
    updated: "2026-06-18",
    seo: {
      title: "Designing AI Workflows People Can Trust",
      description: "A practical approach to trustworthy AI-assisted workflows.",
    },
    tags: ["AI", "Governance", "Experience design"],
    sections: [
      {
        title: "Start with the decision",
        content: [
          "Define who is making the decision, what evidence they need and what happens when confidence is low.",
          "This keeps automation connected to a real operational outcome.",
        ],
      },
      {
        title: "Keep sources visible",
        content: [
          "Useful AI experiences make supporting material easy to inspect.",
          "Source context helps users verify an answer and understand its limits.",
        ],
      },
      {
        title: "Design human review",
        content: [
          "High-impact actions need clear approval boundaries and escalation paths.",
          "Evaluation should measure accuracy, usefulness, safety and adoption over time.",
        ],
      },
    ],
  },
  {
    slug: "modernization-without-disruption",
    title: "Modernization without unnecessary disruption",
    description:
      "How to sequence platform change around business value, risk and team capacity.",
    intro:
      "Modernization works best as a managed portfolio of outcomes rather than a single technology replacement.",
    href: "/blogs/modernization-without-disruption",
    meta: "Cloud & platforms · 5 min read",
    status: "placeholder",
    author: `InnovGen editorial team · ${approval}`,
    published: "2026-05-22",
    updated: "2026-05-22",
    seo: {
      title: "Modernization Without Unnecessary Disruption",
      description: "A value-led approach to platform modernization.",
    },
    tags: ["Cloud", "Modernization", "Delivery"],
    sections: [
      {
        title: "Map value and risk",
        content: [
          "Identify where current systems restrict customers, operations or growth.",
          "Pair business impact with technical and organizational risk.",
        ],
      },
      {
        title: "Create safe increments",
        content: [
          "Use clear boundaries, observability and rollback paths.",
          "Deliver capabilities that can be validated before the next dependency moves.",
        ],
      },
      {
        title: "Invest in ownership",
        content: [
          "Documentation, training and operating models are part of the product.",
          "A modern platform is sustainable only when teams can confidently own it.",
        ],
      },
    ],
  },
];

export const careers: DetailContent[] = [
  {
    slug: "senior-software-engineer",
    title: "Senior software engineer",
    description: "Help design and deliver reliable digital products for complex organizations.",
    intro:
      "This provisional role profile describes the intended responsibilities and hiring format.",
    href: "/careers/senior-software-engineer",
    meta: `Engineering · ${approval}`,
    status: "placeholder",
    location: `Location and work model pending · ${approval}`,
    type: `Employment type pending · ${approval}`,
    seo: {
      title: "Senior Software Engineer Career",
      description: "View the provisional Senior Software Engineer role at InnovGen.",
    },
    tags: ["TypeScript", "React", "APIs", "Cloud"],
    sections: [
      {
        title: "The role",
        content: [
          "Shape maintainable technical solutions with product and design partners.",
          "Deliver accessible, tested software and improve engineering practices.",
        ],
      },
      {
        title: "What you bring",
        content: [
          "Strong software engineering fundamentals and clear technical communication.",
          "Experience taking web products from discovery through production.",
          "A pragmatic approach to quality, security and team learning.",
        ],
      },
      {
        title: "Hiring process",
        content: [
          "Introductory conversation.",
          "Practical technical discussion based on real work.",
          "Team conversation and transparent offer stage.",
        ],
      },
    ],
  },
  {
    slug: "product-designer",
    title: "Product designer",
    description: "Turn complex service and product challenges into clear digital experiences.",
    intro:
      "This provisional role profile describes the planned product design opportunity.",
    href: "/careers/product-designer",
    meta: `Design · ${approval}`,
    status: "placeholder",
    location: `Location and work model pending · ${approval}`,
    type: `Employment type pending · ${approval}`,
    seo: {
      title: "Product Designer Career",
      description: "View the provisional Product Designer role at InnovGen.",
    },
    tags: ["Research", "Service design", "Prototyping", "Accessibility"],
    sections: [
      {
        title: "The role",
        content: [
          "Frame user and business needs through research and collaborative discovery.",
          "Design and validate accessible end-to-end experiences.",
        ],
      },
      {
        title: "What you bring",
        content: [
          "A portfolio showing clear reasoning across complex product work.",
          "Strong interaction, content and visual design judgment.",
          "Comfort working closely with engineering and client stakeholders.",
        ],
      },
      {
        title: "Hiring process",
        content: [
          "Introductory conversation.",
          "Portfolio discussion focused on decisions and outcomes.",
          "Team conversation and transparent offer stage.",
        ],
      },
    ],
  },
];

const commonCta = {
  title: "Ready to define the next step?",
  description:
    "Share the outcome you are working toward. We will help frame a practical starting point.",
  label: "Get free consultation",
  href: "/consultation",
};

export const pages: Record<string, PageContent> = {
  home: {
    eyebrow: "Enterprise technology partner",
    title: "Build secure digital systems that move your business forward.",
    description:
      "InnovGen brings strategy, design and engineering together to turn complex technology priorities into scalable outcomes.",
    seo: {
      title: "Enterprise IT Infrastructure Company UAE | InnovGen",
      description:
        "InnovGen delivers managed IT services, cloud solutions, cybersecurity, enterprise networking and data center modernization for organizations across the UAE.",
    },
    sections: [
      {
        eyebrow: "Capabilities",
        title: "Connected expertise, focused on outcomes",
        description:
          "Explore a provisional view of InnovGen's service portfolio.",
        items: services,
      },
      {
        eyebrow: "Industries",
        title: "Designed for complex operating environments",
        items: [
          { title: "Government", description: "Accessible digital public services.", status: "placeholder" },
          { title: "Financial services", description: "Secure, governed customer and operational systems.", status: "placeholder" },
          { title: "Healthcare", description: "Connected experiences built around privacy and trust.", status: "placeholder" },
          { title: "Enterprise", description: "Scalable platforms that simplify complex work.", status: "placeholder" },
        ],
      },
      {
        eyebrow: "Why InnovGen",
        title: "A clear path from ambition to operation",
        items: [
          { title: "Business-first", description: "Success criteria before solution design." },
          { title: "Secure by design", description: "Risk and governance considered from the start." },
          { title: "Built to evolve", description: "Modular foundations and transferable ownership." },
        ],
      },
      {
        eyebrow: "Product concepts",
        title: "Reusable solutions for recurring challenges",
        items: products,
      },
      {
        eyebrow: "Selected work",
        title: "Proof will live in the outcomes",
        description: `Representative project structures are shown pending client approval.`,
        items: projects,
      },
      {
        eyebrow: "Delivery",
        title: "A transparent working rhythm",
        items: ["Discover", "Design", "Build", "Validate", "Deploy", "Optimize"].map(
          (title, index) => ({
            title: `${index + 1}. ${title}`,
            description: "A measurable stage with shared decisions and clear ownership.",
          }),
        ),
      },
      {
        eyebrow: "Insights",
        title: "Ideas for responsible digital progress",
        items: blogs,
      },
    ],
    cta: commonCta,
  },
  about: {
    eyebrow: "About InnovGen",
    title: "Technology progress, grounded in clarity and trust.",
    description:
      "InnovGen is being shaped as an enterprise technology partner for organizations navigating complex digital change.",
    seo: {
      title: "About",
      description: "Learn about InnovGen's purpose, values and delivery principles.",
    },
    sections: [
      {
        eyebrow: "Our story",
        title: "Created to connect strategy with delivery",
        description: `Company history and founding details are pending client approval.`,
        items: [
          { title: "Mission", description: `Turn technology complexity into sustainable business progress. ${approval}.`, status: "placeholder" },
          { title: "Vision", description: `Become a trusted long-term digital partner across the region. ${approval}.`, status: "placeholder" },
        ],
      },
      {
        eyebrow: "Values",
        title: "How we intend to work",
        items: ["Innovation", "Integrity", "Ownership", "Excellence", "Partnership"].map((title) => ({
          title,
          description: `${title} principle and supporting proof pending client approval.`,
          status: "placeholder",
        })),
      },
      {
        eyebrow: "Leadership & milestones",
        title: "Verified company proof will appear here",
        items: [
          { title: "Leadership", description: `Profiles and approved imagery pending. ${approval}.`, status: "placeholder" },
          { title: "Milestones", description: `Dates and achievements pending verification. ${approval}.`, status: "placeholder" },
          { title: "Certifications", description: `No certification claims will publish until verified. ${approval}.`, status: "placeholder" },
        ],
      },
      {
        eyebrow: "Culture",
        title: "Built for learning and shared ownership",
        items: [
          { title: "Curiosity", description: "Understand the problem before prescribing the answer." },
          { title: "Craft", description: "Care about accessibility, maintainability and the details users feel." },
          { title: "Candor", description: "Make trade-offs visible and decisions easy to understand." },
        ],
      },
    ],
    cta: { ...commonCta, title: "Build what comes next with us" },
  },
  services: {
    eyebrow: "Services",
    title: "One partner across strategy, delivery and improvement.",
    description:
      "Explore a connected set of technology capabilities designed to improve efficiency, security, scalability and growth.",
    seo: {
      title: "Enterprise IT Services UAE | InnovGen Technology Solutions",
      description:
        "InnovGen delivers enterprise IT infrastructure, managed IT services, cloud computing, cybersecurity and AI infrastructure for UAE organizations in Dubai, Abu Dhabi and the GCC.",
    },
    sections: [
      { eyebrow: "Service navigator", title: "Find the capability you need", items: services },
      {
        eyebrow: "Business outcomes",
        title: "Technology connected to measurable progress",
        items: ["Efficiency", "Security", "Scalability", "Growth"].map((title) => ({
          title,
          description: `Target measures and proof points pending engagement scope. ${approval}.`,
          status: "placeholder",
        })),
      },
      {
        eyebrow: "Engagement models",
        title: "Flexible ways to work together",
        items: [
          { title: "Defined project", description: "A clear outcome, scope and delivery plan." },
          { title: "Dedicated team", description: "A blended team aligned to a sustained product roadmap." },
          { title: "Managed service", description: "Ongoing operation and improvement against agreed service levels." },
        ],
      },
    ],
    cta: commonCta,
  },
  products: {
    eyebrow: "Products",
    title: "Practical products for better digital operations.",
    description:
      "Provisional product concepts that turn recurring business challenges into configurable solutions.",
    seo: {
      title: "Digital Products",
      description: "Explore provisional InnovGen digital product concepts.",
    },
    sections: [
      { eyebrow: "Product explorer", title: "Solutions designed around real work", items: products },
      {
        eyebrow: "Benefits",
        title: "A faster route to an adaptable foundation",
        items: [
          { title: "Configurable", description: "Adapt core workflows without starting from zero." },
          { title: "Integration-ready", description: "Connect with the systems teams already use." },
          { title: "Governed", description: "Design roles, audit and policy into the experience." },
        ],
      },
      {
        eyebrow: "Deployment",
        title: "Architecture shaped around your constraints",
        items: [
          { title: "Cloud", description: `Public cloud options subject to architecture review. ${approval}.`, status: "placeholder" },
          { title: "Private environment", description: `Private deployment options subject to validation. ${approval}.`, status: "placeholder" },
          { title: "Integration", description: "API-first boundaries for enterprise interoperability." },
        ],
      },
    ],
    cta: { ...commonCta, title: "Request a product walkthrough", label: "Request a demonstration" },
  },
  projects: {
    eyebrow: "Projects",
    title: "Complex problems, translated into clear delivery stories.",
    description:
      "Representative case-study templates show how verified challenges, decisions and outcomes will be presented.",
    seo: {
      title: "Projects and Case Studies",
      description: "Explore provisional InnovGen project and case-study structures.",
    },
    sections: [
      { eyebrow: "Selected work", title: "Case studies pending client approval", items: projects },
      {
        eyebrow: "Results",
        title: "Evidence before claims",
        description:
          "Aggregate metrics will be added only when source, baseline and measurement period are verified.",
        items: [
          { title: "Outcome", description: approval, status: "placeholder" },
          { title: "Measurement", description: approval, status: "placeholder" },
          { title: "Client quote", description: approval, status: "placeholder" },
        ],
      },
    ],
    cta: { ...commonCta, title: "Have a similar challenge?" },
  },
  partners: {
    eyebrow: "Partners",
    title: "Stronger delivery through trusted ecosystems.",
    description:
      "InnovGen's partner program is intended to connect technology platforms, regional expertise and shared delivery capability.",
    seo: {
      title: "Partners",
      description: "Learn about InnovGen's provisional technology and alliance partner program.",
    },
    sections: [
      {
        eyebrow: "Technology ecosystem",
        title: "Partner identities pending permission",
        items: [
          { title: "Cloud platforms", description: approval, status: "placeholder" },
          { title: "Business applications", description: approval, status: "placeholder" },
          { title: "Security platforms", description: approval, status: "placeholder" },
        ],
      },
      {
        eyebrow: "Strategic alliances",
        title: "More capability, closer to the client",
        items: [
          { title: "Regional delivery", description: "Local context combined with specialist expertise." },
          { title: "Joint solutions", description: "Integrated offerings shaped around recurring needs." },
          { title: "Knowledge exchange", description: "Shared standards, enablement and continuous learning." },
        ],
      },
      {
        eyebrow: "Become a partner",
        title: "Build complementary value together",
        items: [
          { title: "Fit", description: "Aligned ethics, quality and client outcomes." },
          { title: "Capability", description: "Complementary expertise with clear ownership." },
          { title: "Trust", description: "Transparent commercial and delivery practices." },
        ],
      },
    ],
    cta: { ...commonCta, title: "Start a partner conversation", label: "Discuss partnership" },
  },
  blogs: {
    eyebrow: "Insights",
    title: "Clear thinking for responsible digital progress.",
    description:
      "Provisional articles and practical perspectives across AI, cloud, cybersecurity, software and transformation.",
    seo: {
      title: "Insights and Articles",
      description: "Read provisional InnovGen insights on technology and transformation.",
    },
    sections: [
      { eyebrow: "Featured", title: "Latest thinking", items: blogs },
      {
        eyebrow: "Topics",
        title: "Explore by area",
        items: ["AI", "Cloud", "Cybersecurity", "Software", "Transformation"].map((title) => ({
          title,
          description: "Editorial category with additional articles planned.",
          status: "placeholder",
        })),
      },
      {
        eyebrow: "Resources",
        title: "Practical guides are planned",
        items: [
          { title: "AI opportunity checklist", description: approval, status: "placeholder" },
          { title: "Modernization readiness guide", description: approval, status: "placeholder" },
          { title: "Digital product brief", description: approval, status: "placeholder" },
        ],
      },
    ],
    cta: { ...commonCta, title: "Turn an idea into a practical next step" },
  },
  careers: {
    eyebrow: "Careers",
    title: "Do meaningful work with people who care about the outcome.",
    description:
      "Explore provisional opportunities to build thoughtful, accessible technology for complex organizations.",
    seo: {
      title: "Careers",
      description: "Explore provisional career opportunities at InnovGen.",
    },
    sections: [
      {
        eyebrow: "Why InnovGen",
        title: "A culture of learning and ownership",
        items: [
          { title: "Meaningful problems", description: "Work on challenges connected to real operational outcomes." },
          { title: "Visible growth", description: "Learn through feedback, mentoring and increasing responsibility." },
          { title: "Shared craft", description: "Improve how the whole team designs and delivers." },
        ],
      },
      {
        eyebrow: "Benefits",
        title: "Benefits pending formal approval",
        items: [
          { title: "Flexible work", description: approval, status: "placeholder" },
          { title: "Learning support", description: approval, status: "placeholder" },
          { title: "Wellbeing", description: approval, status: "placeholder" },
        ],
      },
      { eyebrow: "Open roles", title: "Provisional opportunities", items: careers },
      {
        eyebrow: "Hiring process",
        title: "Transparent from the first conversation",
        items: ["Introduction", "Role discussion", "Team conversation", "Offer"].map((title, index) => ({
          title: `${index + 1}. ${title}`,
          description: "Clear expectations and time to ask questions at every stage.",
        })),
      },
    ],
    cta: { ...commonCta, title: "Do not see the right role?", label: "Join the talent community" },
  },
};

export const allDetails = {
  services,
  products,
  projects,
  blogs,
  careers,
};

export const approvalLabel = approval;
