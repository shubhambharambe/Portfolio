import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const SmartChat = () => {
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi! I'm Shubham's virtual assistant. Ask me anything about his skills or experience." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Only scroll if there's more than the initial greeting, or if it's a user action
        if (messages.length > 1) {
            scrollToBottom();
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            // Updated URL to point to backend port 8001
            const response = await axios.post(`${API_URL}/api/chat`, { message: input });
            const botMsg = { role: "bot", content: response.data.response };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMsg = { role: "bot", content: "Oops! I couldn't reach the server. Please check your backend connection." };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 px-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Talk to My AI
            </h2>

            <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden shadow-2xl h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`p-3 rounded-full ${msg.role === "bot" ? "bg-primary/20 text-primary" : "bg-blue-500/20 text-blue-400"}`}>
                                    {msg.role === "bot" ? <FaRobot /> : <FaUser />}
                                </div>
                                <div className={`p-4 rounded-xl max-w-[80%] ${msg.role === "bot"
                                    ? "bg-gray-800 text-gray-200 rounded-tl-none"
                                    : "bg-blue-600 text-white rounded-tr-none"
                                    }`}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                            <div className="p-3 rounded-full bg-primary/20 text-primary"><FaRobot /></div>
                            <div className="flex gap-1 items-center bg-gray-800 p-4 rounded-xl rounded-tl-none">
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                />
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                />
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className="p-4 border-t border-gray-700 bg-gray-900/50 flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about my Python experience..."
                        className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-teal-600 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SmartChat;
