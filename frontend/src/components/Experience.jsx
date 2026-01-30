import { motion } from "framer-motion";

const Experience = ({ experiences }) => {
    return (
        <section className="py-20 px-8 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center"
            >
                Work Experience
            </motion.h2>

            <div className="relative border-l border-gray-700 ml-4 md:ml-10 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-gray-900" />

                        <div className="glass-card p-6 md:p-8 hover:bg-white/5 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                                <span className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded-full mt-2 md:mt-0">
                                    {exp.period}
                                </span>
                            </div>
                            <h4 className="text-xl text-gray-400 mb-4">{exp.company}</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {exp.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
