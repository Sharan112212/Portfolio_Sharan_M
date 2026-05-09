export interface Certificate {
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  link?: string;
}

export const certificates: Certificate[] = [
  {
    title: "Database Management Systems",
    organization: "NPTEL",
    date: "2023",
    description: "Comprehensive certification covering relational databases, SQL, and normalization techniques.",
    image: "/certificates/nptel-dbms.jpg",
    link: "#"
  },
  {
    title: "Gamethon Hackathon",
    organization: "Innovation Council",
    date: "2024",
    description: "Awarded for exceptional performance and innovation in game development and system design.",
    image: "/certificates/gamethon-hackathon.jpg",
    link: "#"
  },
  {
    title: "Capture The Flag (CTF)",
    organization: "Cyber Security Challenge",
    date: "2024",
    description: "Recognized for excellence in solving complex cybersecurity challenges and penetration testing tasks.",
    image: "/certificates/ctf-certificate.jpg",
    link: "#"
  },
  {
    title: "Web Security Academy",
    organization: "PortSwigger",
    date: "2025",
    description: "Advanced certification focused on modern web vulnerability research and secure coding practices.",
    image: "/certificates/portswigger-web-security-academy.jpg",
    link: "#"
  }
];
