import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Hero = ({ profile }) => {
    if (!profile) return null;

    const bgSkills = [
        "PYTHON", "REACT", "DJANGO", "FASTAPI", "POSTGRESQL", "AWS", "DOCKER", "GIT", "REST API",
        "JAVASCRIPT", "HTML", "CSS", "SQL", "LINUX", "REDUX"
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/50 -z-20" />

            {/* Background Scrolling Skills Banner */}
            <div className="absolute inset-0 -z-10 flex flex-col justify-center opacity-10 select-none pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, row) => (
                    <motion.div
                        key={row}
                        className="whitespace-nowrap text-6xl md:text-8xl font-black text-white/10 mb-8"
                        animate={{ x: row % 2 === 0 ? [0, -1000] : [-1000, 0] }}
                        transition={{ repeat: Infinity, duration: 20 + row * 5, ease: "linear" }}
                    >
                        {bgSkills.join(" • ")} • {bgSkills.join(" • ")}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl relative z-10"
            >
                <h2 className="text-primary font-mono text-xl mb-4">Hello, I'm</h2>
                <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 mb-6 drop-shadow-lg">
                    {profile.name}
                </h1>
                <h3 className="text-2xl md:text-3xl text-gray-400 mb-8">
                    {profile.role}
                </h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                    {profile.summary}
                </p>

                <div className="flex justify-center gap-6">
                    <a href={`mailto:${profile.contact.email}`} className="text-3xl hover:text-primary transition-colors hover:scale-110 transform">
                        <FaEnvelope />
                    </a>
                    <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors hover:scale-110 transform">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/shubhambharambe" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors hover:scale-110 transform">
                        <FaGithub />
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 animate-bounce cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-gray-500 text-sm">Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default Hero;
