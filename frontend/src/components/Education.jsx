import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Education = ({ education }) => {
    if (!education || education.length === 0) return null;

    return (
        <section className="py-20 px-8 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center"
            >
                Education
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-card p-8 flex flex-col items-center text-center hover:bg-white/5 transition-colors group"
                    >
                        <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 text-3xl group-hover:scale-110 transition-transform">
                            <FaGraduationCap />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                        <h4 className="text-lg text-primary mb-4">{edu.institution}</h4>
                        <span className="text-gray-400 text-sm mb-4 block">{edu.period}</span>
                        <p className="text-gray-300">{edu.details}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Education;
