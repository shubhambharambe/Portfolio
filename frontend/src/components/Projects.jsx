import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";

const Projects = ({ projects }) => {
    if (!projects || projects.length === 0) return null;

    return (
        <section className="py-20 px-8 max-w-6xl mx-auto bg-black/20">
            <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center"
            >
                Featured Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-card p-8 hover:border-primary/50 transition-all group"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 text-2xl">
                                {project.title.includes("Mobile") || project.title.includes("Asset") ? <FaMobileAlt /> : <FaLaptopCode />}
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                        </div>

                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.split(", ").map((t, i) => (
                                    <span key={i} className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
