import { motion } from "framer-motion";

const Skills = ({ skills }) => {
    return (
        <section className="py-20 px-8 bg-black/20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto text-center"
            >
                <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="bg-gray-800/50 backdrop-blur border border-gray-700 px-6 py-4 rounded-xl flex flex-col items-center hover:border-primary/50 transition-colors cursor-default"
                        >
                            <span className="text-lg font-semibold text-white mb-2">{skill.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${skill.level === "Expert" ? "bg-green-500/20 text-green-400" :
                                    skill.level === "Advanced" ? "bg-blue-500/20 text-blue-400" :
                                        "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                {skill.level}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;
