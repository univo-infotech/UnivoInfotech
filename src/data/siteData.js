const siteData = {
  hero: {
    title: 'We Build Digital Experiences That Matter',
    subtitle: 'CodeVia transforms your ideas into powerful, scalable software solutions. From web apps to mobile platforms, we code the future.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'View Our Work'
  },
  stats: [
    { number: 150, suffix: '+', label: 'Projects Delivered' },
    { number: 50, suffix: '+', label: 'Happy Clients' },
    { number: 25, suffix: '+', label: 'Team Members' },
    { number: 5, suffix: '+', label: 'Years Experience' }
  ],
  services: [
    {
      id: 1,
      icon: 'FiMonitor',
      title: 'Web Development',
      description: 'Custom, responsive websites and scalable web applications built with modern frameworks.',
      features: ['React & Next.js', 'High Performance', 'SEO Optimized']
    },
    {
      id: 2,
      icon: 'FiSmartphone',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile experiences that users love.',
      features: ['iOS & Android', 'Flutter & React Native', 'Intuitive UX']
    },
    {
      id: 3,
      icon: 'FiPenTool',
      title: 'UI/UX Design',
      description: 'Beautiful, user-centric interfaces that drive engagement and conversions.',
      features: ['Wireframing', 'Prototyping', 'User Testing']
    },
    {
      id: 4,
      icon: 'FiCloud',
      title: 'Cloud Solutions',
      description: 'Secure and scalable cloud architectures tailored to your business needs.',
      features: ['AWS & Azure', 'Serverless', 'Migration']
    },
    {
      id: 5,
      icon: 'FiCpu',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions that automate processes and provide deep insights.',
      features: ['Data Analysis', 'Predictive Models', 'NLP']
    },
    {
      id: 6,
      icon: 'FiSettings',
      title: 'DevOps & Automation',
      description: 'Streamlined deployment pipelines and automated operations.',
      features: ['CI/CD', 'Docker & K8s', 'Infrastructure as Code']
    }
  ],
  about: {
    title: 'Innovating the Digital Frontier',
    description: 'CodeVia is a forward-thinking technology company dedicated to creating cutting-edge software solutions. We bridge the gap between complex problems and elegant, efficient digital products.\n\nOur team of passionate developers, designers, and strategists work collaboratively to transform your vision into reality. We believe in writing clean code, designing intuitive interfaces, and building platforms that scale.',
    mission: 'To empower businesses through innovative technology, delivering exceptional digital products that drive growth and success.',
    vision: 'To be the global leader in software engineering and design, setting new standards for digital excellence.',
    values: [
      { icon: 'FiTarget', title: 'Excellence', description: 'We strive for perfection in every line of code we write.' },
      { icon: 'FiUsers', title: 'Collaboration', description: 'We work as an extension of your team, aligned with your goals.' },
      { icon: 'FiZap', title: 'Innovation', description: 'We continuously adopt new technologies to stay ahead.' }
    ]
  },
  portfolio: [
    {
      id: 1,
      title: 'FinTech Dashboard',
      category: 'Web',
      description: 'A comprehensive analytics dashboard for financial institutions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      tags: ['React', 'TypeScript', 'Tailwind'],
      link: '#'
    },
    {
      id: 2,
      title: 'HealthTrack Mobile',
      category: 'Mobile',
      description: 'Cross-platform mobile app for tracking daily fitness and nutrition.',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600',
      tags: ['Flutter', 'Firebase', 'Node.js'],
      link: '#'
    },
    {
      id: 3,
      title: 'Smart Retail AI',
      category: 'AI',
      description: 'Inventory prediction system using machine learning models.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      tags: ['Python', 'TensorFlow', 'AWS'],
      link: '#'
    },
    {
      id: 4,
      title: 'E-Commerce Platform',
      category: 'Web',
      description: 'Scalable headless commerce solution with ultra-fast performance.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      tags: ['Next.js', 'Shopify', 'GraphQL'],
      link: '#'
    },
    {
      id: 5,
      title: 'Logistics Cloud Portal',
      category: 'Cloud',
      description: 'Global supply chain management and tracking portal.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
      tags: ['Vue.js', 'AWS', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 6,
      title: 'AI Customer Support',
      category: 'AI',
      description: 'NLP-powered chatbot integrating with existing CRM systems.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600',
      tags: ['OpenAI', 'Node.js', 'React'],
      link: '#'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'CTO',
      company: 'TechFlow Inc.',
      content: 'CodeVia transformed our legacy systems into a modern, scalable architecture. Their team\'s expertise and dedication to quality is unmatched.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0066FF&color=fff',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Founder',
      company: 'StartupX',
      content: 'Working with CodeVia was seamless. They delivered our MVP ahead of schedule and the code quality was superb. Highly recommended!',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=00B4D8&color=fff',
      rating: 5
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Director of Product',
      company: 'GlobalRetail',
      content: 'The e-commerce platform built by CodeVia increased our conversion rate by 45%. Their focus on UX and performance made all the difference.',
      avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=1A2B4A&color=fff',
      rating: 5
    },
    {
      id: 4,
      name: 'David Smith',
      role: 'CEO',
      company: 'HealthPlus',
      content: 'Professional, communicative, and exceptionally skilled. CodeVia is our go-to partner for all complex software engineering challenges.',
      avatar: 'https://ui-avatars.com/api/?name=David+Smith&background=0066FF&color=fff',
      rating: 5
    }
  ],
  techStack: [
    { name: 'React', icon: 'SiReact' },
    { name: 'Node.js', icon: 'SiNodedotjs' },
    { name: 'MongoDB', icon: 'SiMongodb' },
    { name: 'Python', icon: 'SiPython' },
    { name: 'AWS', icon: 'SiAmazonwebservices' },
    { name: 'Docker', icon: 'SiDocker' },
    { name: 'TypeScript', icon: 'SiTypescript' },
    { name: 'Next.js', icon: 'SiNextdotjs' },
    { name: 'Flutter', icon: 'SiFlutter' },
    { name: 'PostgreSQL', icon: 'SiPostgresql' },
    { name: 'Redis', icon: 'SiRedis' },
    { name: 'Kubernetes', icon: 'SiKubernetes' }
  ],
  team: [
    {
      id: 1,
      name: 'Alex Mercer',
      role: 'Founder & CEO',
      bio: 'Visionary leader with 10+ years in software engineering and product strategy.',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Mercer&background=0066FF&color=fff',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Head of Engineering',
      bio: 'Cloud architecture expert and open-source contributor.',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=00B4D8&color=fff',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Lead Designer',
      bio: 'Award-winning UI/UX designer focused on human-centric digital experiences.',
      avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=1A2B4A&color=fff',
      social: { linkedin: '#', github: '#', twitter: '#' }
    },
    {
      id: 4,
      name: 'Sophie Lin',
      role: 'AI Research Lead',
      bio: 'Ph.D. in Machine Learning, passionate about integrating AI into everyday products.',
      avatar: 'https://ui-avatars.com/api/?name=Sophie+Lin&background=0066FF&color=fff',
      social: { linkedin: '#', github: '#', twitter: '#' }
    }
  ],
  company: {
    name: 'CodeVia',
    tagline: 'Code. Innovate. Elevate.',
    email: 'hello@codevia.dev',
    phone: '+91 98765 43210',
    address: 'Tech Hub, Sector 62, Noida, UP, India',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      instagram: 'https://instagram.com'
    }
  },
  blog: [
    {
      id: 1,
      title: 'The Future of Web Development in 2024',
      excerpt: 'Exploring the latest trends, frameworks, and paradigms shaping the modern web landscape.',
      content: 'Full content goes here...',
      author: 'Alex Mercer',
      date: '2023-10-15',
      category: 'Engineering',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Demystifying AI for Enterprise Businesses',
      excerpt: 'How traditional companies can practically implement machine learning to drive real ROI.',
      content: 'Full content goes here...',
      author: 'Sophie Lin',
      date: '2023-11-02',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600',
      readTime: '8 min'
    },
    {
      id: 3,
      title: 'Building Scalable Architectures with Serverless',
      excerpt: 'A deep dive into transitioning from monoliths to serverless microservices.',
      content: 'Full content goes here...',
      author: 'Priya Sharma',
      date: '2023-11-20',
      category: 'Cloud',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600',
      readTime: '6 min'
    }
  ]
};

export default siteData;
