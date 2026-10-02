import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import { cn } from "../lib/utils";

// ✏️ Images live in /public/certificates/ (already generated for you).
// 🔗 Paste your profile URLs here so the "View profile" button works.
const LEETCODE_URL = "https://leetcode.com/u/ak_adarshkashyap/"; // e.g. "https://leetcode.com/u/your-username"
const HACKERRANK_URL = "https://www.hackerrank.com/profile/adarshspn2005"; // e.g. "https://www.hackerrank.com/profile/your-username"

// Order matters: the first 9 show up before "Show all", so best ones go on top.
const certificates = [
  // ---- Highlights ----
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2026", id: "4a8751794d264aaaaaeee8e8e25472f8", category: "Cloud", image: "/certificates/aws-ccp.jpg", link: "https://aws.amazon.com/verification" },
  { title: "LeetCode 365 Days Badge", issuer: "LeetCode", category: "Coding Profiles", image: "/certificates/leetcode-365.png", link: LEETCODE_URL },
  { title: "Virtual Internship — Web, Mobile Development & Marketing", issuer: "IBM (IBMCEP)", date: "Mar 2026", id: "1172997f06e044c58e6445e7ab6b5044", category: "Web Dev", image: "/certificates/ibm-internship.jpg", link: "https://courses.ibmmooc.skillsnetwork.site/certificates/1172997f06e044c58e6445e7ab6b5044" },
  { title: "Web Development Internship", issuer: "CodSoft", date: "Sep 2025", id: "ba71d1a", category: "Web Dev", image: "/certificates/codsoft.jpg", link: "#" },
  { title: "Technology Job Simulation", issuer: "Deloitte Australia (Forage)", date: "Jun 2025", id: "8gwM2smnhjc47RrxZ", category: "Events", image: "/certificates/deloitte.jpg", link: "#" },
  { title: "Network Technician Career Path", issuer: "Cisco Networking Academy", date: "Dec 2025", id: "8586ea0e-1f31-492e-9e5e-b203c1e8b7fd", category: "Networking", image: "/certificates/network-technician.jpg", link: "#" },
  { title: "HackerRank C++ — 3 Star", issuer: "HackerRank", category: "Coding Profiles", image: "/certificates/hackerrank-cpp.png", link: HACKERRANK_URL },
  { title: "Postman API Fundamentals — Student Expert", issuer: "Postman", date: "Aug 2025", category: "Web Dev", image: "/certificates/postman.png", link: "#" },
  { title: "Become a Full-Stack Web Developer", issuer: "LinkedIn Learning", date: "Oct 2024", id: "fde01e7fe8bbf484986a94d3a4d4387ccd3a9d578d6d31c7cf3ad5711d684123", category: "Web Dev", image: "/certificates/fullstack.jpg", link: "#" },

  // ---- Cloud ----
  { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy", date: "Sep 2025", category: "Cloud", image: "/certificates/aws-academy.jpg", link: "https://www.credly.com/go/KPmE3DpX" },

  // ---- Coding profiles ----
  { title: "LeetCode 200 Days Badge", issuer: "LeetCode", category: "Coding Profiles", image: "/certificates/leetcode-200.png", link: LEETCODE_URL },
  { title: "LeetCode 100 Days Badge", issuer: "LeetCode", category: "Coding Profiles", image: "/certificates/leetcode-100.png", link: LEETCODE_URL },
  { title: "LeetCode 50 Days Badge", issuer: "LeetCode", category: "Coding Profiles", image: "/certificates/leetcode-50.png", link: LEETCODE_URL },
  { title: "LeetCode SQL 50 Badge", issuer: "LeetCode", category: "Coding Profiles", image: "/certificates/leetcode-sql50.png", link: LEETCODE_URL },
  { title: "HackerRank SQL — 4 Star", issuer: "HackerRank", category: "Coding Profiles", image: "/certificates/hackerrank-sql.png", link: HACKERRANK_URL },
  { title: "SQL (Basic) Certificate", issuer: "HackerRank", id: "be4767710aca", category: "Coding Profiles", image: "/certificates/hackerrank-sql-basic.png", link: "https://www.hackerrank.com/certificates/be4767710aca", verify: true },
  { title: "HackerRank Python — 2 Star", issuer: "HackerRank", category: "Coding Profiles", image: "/certificates/hackerrank-python.png", link: HACKERRANK_URL },

  // ---- Web & backend ----
  { title: "React.js Essential Training", issuer: "LinkedIn Learning", date: "Oct 2024", id: "2ed7c1d28a04bfd3964fc9c0567779d9f5ac9a04b2adeca428ca82e962e65f60", category: "Web Dev", image: "/certificates/react.jpg", link: "#" },
  { title: "Node.js Essential Training", issuer: "LinkedIn Learning", date: "Oct 2024", id: "d05357cfb29a0649850e0f3e54596f1ce5dc7423e0c96ccea423f84a9a66f20b", category: "Web Dev", image: "/certificates/node.jpg", link: "#" },
  { title: "Git Essential Training", issuer: "LinkedIn Learning", date: "Oct 2024", id: "bdf6206f18294b260c1ff57a12000bd5835dd419c5d4d6e174cbfb28506246ec", category: "Web Dev", image: "/certificates/git.jpg", link: "#" },

  // ---- Database ----
  { title: "Database Application Development Training", issuer: "Infosys Springboard", date: "Nov 2025", category: "Database", image: "/certificates/dbapp.jpg", link: "https://verify.onwingspan.com" },
  { title: "NoSQL Training — MongoDB Developer", issuer: "Infosys Springboard", date: "Sep 2025", category: "Database", image: "/certificates/nosql.jpg", link: "https://verify.onwingspan.com" },
  { title: "SQL Essential Training", issuer: "LinkedIn Learning", date: "Oct 2024", id: "dffdf88bbf73b310a3c16f82f85fe78ee7fa58755fc94fa41d6a65e16133e3ed", category: "Database", image: "/certificates/sql.jpg", link: "#" },
  { title: "Introduction to MongoDB", issuer: "MongoDB", date: "Jan 2025", id: "MDB1420034ptz", category: "Database", image: "/certificates/mongodb.jpg", link: "#" },

  // ---- Networking ----
  { title: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "Jun 2026", id: "4f78f551-989b-4911-813b-e93497c10973", category: "Networking", image: "/certificates/ccna1.jpg", link: "#" },
  { title: "CCNA: Switching, Routing & Wireless Essentials", issuer: "Cisco Networking Academy", date: "Jun 2026", id: "7a08b5ef-0097-40a3-915c-921251d0c49f", category: "Networking", image: "/certificates/ccna2.jpg", link: "#" },
  { title: "CCNA: Enterprise Networking, Security & Automation", issuer: "Cisco Networking Academy", date: "Jun 2026", id: "42e739c5-5869-4906-87f1-b17c556ee08e", category: "Networking", image: "/certificates/ccna3.jpg", link: "#" },

  // ---- Security ----
  { title: "Cybersecurity Foundation", issuer: "Palo Alto Networks Academy", date: "Jun 2025", id: "8bvEPwbv80", category: "Security", image: "/certificates/cyber-pa.jpg", link: "https://paloaltonetworksacademy.net/mod/customcert/verify_certificate.php" },
  { title: "Cyber Security & Applied Ethical Hacking", issuer: "Infosys Springboard", date: "Apr 2025", category: "Security", image: "/certificates/cyber-eh.jpg", link: "https://verify.onwingspan.com" },

  // ---- AI / ML ----
  { title: "Introduction to Data Science", issuer: "Cisco Networking Academy", date: "May 2026", id: "dfe07212-9752-4e1e-8ef9-6023db7abe3e", category: "AI/ML", image: "/certificates/datascience.jpg", link: "#" },
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy", date: "May 2026", id: "17d81708-3ba8-4df3-804f-ff284bb33458", category: "AI/ML", image: "/certificates/modern-ai.jpg", link: "#" },
  { title: "Hands-on Supervised Machine Learning with Python", issuer: "Infosys Springboard", date: "Sep 2025", category: "AI/ML", image: "/certificates/ml-sup.jpg", link: "https://verify.onwingspan.com" },
  { title: "TechA Machine Learning with Python", issuer: "Infosys Springboard", date: "Nov 2025", category: "AI/ML", image: "/certificates/techa-ml.jpg", link: "https://verify.onwingspan.com" },

  // ---- Programming & systems ----
  { title: "Python Essentials 1", issuer: "Cisco Networking Academy × Python Institute", date: "May 2026", id: "b68cbd32-8830-4481-aa93-3a6645b5a2e8", category: "Programming", image: "/certificates/python1.jpg", link: "#" },
  { title: "Python Essentials 2", issuer: "Cisco Networking Academy × Python Institute", date: "Jun 2026", id: "920ce4fb-21f6-484e-b1d0-db5607027af2", category: "Programming", image: "/certificates/python2.jpg", link: "#" },
  { title: "Hands-On OOP with Java 11", issuer: "Infosys Springboard", date: "Apr 2025", category: "Programming", image: "/certificates/java.jpg", link: "https://verify.onwingspan.com" },
  { title: "Unix & Linux OS Fundamentals", issuer: "Infosys Springboard", date: "May 2025", category: "Programming", image: "/certificates/linux.jpg", link: "https://verify.onwingspan.com" },

  // ---- Open source & events ----
  { title: "Adobe India Hackathon — Round 1", issuer: "Adobe × Unstop", date: "2025", category: "Events", image: "/certificates/adobe.jpg", link: "#" },
  { title: "GSSoC 2025 — Tech Contributor", issuer: "GirlScript Summer of Code", date: "2025", category: "Events", image: "/certificates/gssoc.jpg", link: "#" },
  { title: "Innotech'25 — Certificate of Achievement", issuer: "KIET Group of Institutions", date: "Nov 2025", category: "Events", image: "/certificates/innotech.jpg", link: "#" },
];

const categories = ["All", ...new Set(certificates.map((c) => c.category))];
const INITIAL_COUNT = 9;

const gradient = { background: "linear-gradient(135deg, hsl(var(--lime) / .85), hsl(var(--lime) / .15))" };
const meta = (c) => [c.issuer, c.date].filter(Boolean).join(" · ");

export const CertificatesSection = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = certificates.filter((c) => active === "All" || c.category === active);
  const collapsed = active === "All" && !showAll && filtered.length > INITIAL_COUNT;
  const list = collapsed ? filtered.slice(0, INITIAL_COUNT) : filtered;

  return (
    <section id="certificates" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
          My <span className="text-gradient">Certificates</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Courses, credentials and coding badges that back up the skills above. Click a card to view it in full.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300",
                active === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.div
                layout
                key={c.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={() => setSelected(c)}
                className="glass-card cursor-pointer overflow-hidden text-left"
              >
                <div className="relative h-44 flex items-center justify-center overflow-hidden" style={gradient}>
                  <Award className="h-12 w-12 text-foreground/70" />
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{c.category}</span>
                  <h3 className="font-semibold text-lg mt-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{meta(c)}</p>
                  {c.id && <p className="text-xs text-muted-foreground/80 mt-1 truncate">Credential ID: {c.id}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {(collapsed || (active === "All" && showAll && filtered.length > INITIAL_COUNT)) && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll((s) => !s)} className="cosmic-button">
              {collapsed ? `Show all ${filtered.length}` : "Show less"}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              className="relative bg-card rounded-xl max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} aria-label="Close" className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:text-primary">
                <X size={20} />
              </button>

              {selected.image ? (
                <>
                  <div className="w-full h-72 rounded-lg flex items-center justify-center" style={gradient}><Award className="h-16 w-16" /></div>
                  <img src={selected.image} alt={selected.title} className="w-full max-h-[70vh] object-contain rounded-lg -mt-72 relative" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </>
              ) : (
                <div className="w-full h-56 rounded-lg flex flex-col items-center justify-center gap-3" style={gradient}>
                  <Award className="h-16 w-16" />
                  <span className="font-semibold text-lg px-6 text-center">{selected.title}</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 px-2 gap-4">
                <div className="text-left">
                  <h3 className="font-semibold">{selected.title}</h3>
                  <p className="text-sm text-muted-foreground">{meta(selected)}</p>
                </div>
                {selected.link && selected.link !== "#" && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="cosmic-button flex items-center gap-2 shrink-0">
                    {selected.category === "Coding Profiles" && !selected.verify ? "View profile" : "Verify"} <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};