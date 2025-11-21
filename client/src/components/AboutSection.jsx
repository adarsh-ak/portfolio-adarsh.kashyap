import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Web Developer pursuing a B.Tech in<span className="text-primary"> Information Technology</span>
            </h3>

            <p className="text-muted-foreground">
            I specialize in building responsive, accessible, and high-performance 
            web applications using modern technologies.
            With a deep interest in Data Structures and Algorithms, I 
            focus on crafting elegant, efficient, and scalable solutions 
            that merge creativity with logic.
            </p>

            <p className="text-muted-foreground">
              Curious by nature and driven by innovation, I constantly 
              explore new frameworks, tools, and design practices to 
              stay at the forefront of the ever-evolving tech landscape. 
              I enjoy transforming complex ideas into intuitive, real-world 
              digital experiences that make an impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Contact Me
              </a>

              <a
                href="https://drive.google.com/file/d/1BVRJP6d5xm0sxDYFEteBazn5r3_jgU2Y/view?usp=sharing"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Full-Stack Web Development (MERN Stack)</h4>
                  <p className="text-muted-foreground">
                    Building responsive, scalable, and modern 
                    web applications with clean architecture 
                    and efficient workflows.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Data Structures & Algorithms</h4>
                  <p className="text-muted-foreground">
                    Designing optimized, logical, and 
                    performance-driven solutions to tackle 
                    complex programming challenges.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Project Management</h4>
                  <p className="text-muted-foreground">
                    Leading projects from concept to completion 
                    using agile methodologies, ensuring 
                    collaboration, efficiency, and timely delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};