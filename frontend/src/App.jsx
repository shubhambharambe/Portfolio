import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SmartChat from "./components/SmartChat";

function App() {
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    loading: true
  });

  const chatRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, eduRes, projRes, skillsRes] = await Promise.all([
          axios.get(`${API_URL}/api/profile`),
          axios.get(`${API_URL}/api/experience`),
          axios.get(`${API_URL}/api/education`),
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/api/skills`)
        ]);

        setData({
          profile: profileRes.data,
          experiences: expRes.data,
          education: eduRes.data,
          projects: projRes.data,
          skills: skillsRes.data,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);



  // Force scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (data.loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-primary">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-primary selection:text-white bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-fixed bg-center bg-no-repeat">
      {/* Dark Overlay for readability */}
      <div className="fixed inset-0 bg-black/80 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Hero profile={data.profile} />

        {/* Chat Section prominently placed */}
        <div ref={chatRef} className="scroll-mt-20">
          <SmartChat />
        </div>

        <Projects projects={data.projects} />
        <Experience experiences={data.experiences} />
        <Education education={data.education} />
        <Skills skills={data.skills} />

        <footer className="bg-black/40 py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shubham Bharambe. Built with React & FastAPI.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
