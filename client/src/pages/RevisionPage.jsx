import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Home, Mic, RotateCcw, Gift, ArrowRight, Bell,
    CheckCircle2, Code2, Layers, Database
} from 'lucide-react';
import RevisionSession from '../components/revision/RevisionSession';
import RevisionResults from '../components/revision/RevisionResults';
import { dsaCourseData } from '../data/dsaCourse';
import { courseData as sdCourseData } from '../data/systemDesignCourse';
import { dbmsCourseData } from '../data/dbmsCourse';

export default function RevisionPage() {
    const { user } = useAuth();
    const [step, setStep] = useState('selection');
    const [selectedCourse, setSelectedCourse] = useState('dsa');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [duration, setDuration] = useState(30);
    const [sessionResults, setSessionResults] = useState(null);

    const userName = user?.name?.split(' ')[0] || 'Coder';

    const courses = [
        { id: 'dsa', name: 'DSA', icon: Code2, data: dsaCourseData },
        { id: 'system-design', name: 'System Design', icon: Layers, data: sdCourseData },
        { id: 'dbms', name: 'DBMS', icon: Database, data: dbmsCourseData }
    ];

    const getTopics = () => courses.find(c => c.id === selectedCourse)?.data.sections || [];

    const handleStart = () => {
        if (!selectedTopic) return;
        setStep('session');
    };

    const handleFinish = (results) => {
        setSessionResults(results);
        setStep('results');
    };

    const handleRetry = () => {
        setStep('selection');
        setSessionResults(null);
        setSelectedTopic(null);
    };

    return (
        <div className="min-h-screen bg-[#111111] text-gray-200">

            {/* Subtle grain overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>

            {/* Top Navigation - Same as Dashboard */}
            <header className="relative z-50 bg-[#0a0a0a] border-b border-gray-800/50 sticky top-0">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/favicon.png" alt="Adhyaya Logo" className="w-10 h-10 object-contain" />
                        <div className="hidden md:block">
                            <div className="font-semibold text-white text-sm">ADHYAYA</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Humara Platform</div>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-900/50 border border-gray-800/50 rounded-lg">
                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                            <Home className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link to="/mock-interview" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                            <Mic className="w-4 h-4" />
                            Mock Interview
                        </Link>
                        <Link to="/revision" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-gray-800 text-white">
                            <RotateCcw className="w-4 h-4" />
                            Revision
                        </Link>
                        <Link to="/how-to-earn" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                            <Gift className="w-4 h-4" />
                            Rewards
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="relative text-gray-500 hover:text-gray-300 p-2 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                        </button>
                        <Link to="/profile" className="flex items-center gap-3 group">
                            <div className="text-right hidden md:block">
                                <div className="text-gray-200 font-medium text-sm">{userName}</div>
                                <div className="text-gray-500 text-xs">Student</div>
                            </div>
                            <div className="w-9 h-9 bg-gray-700 rounded-md flex items-center justify-center text-gray-300 font-medium text-sm">
                                {userName.charAt(0)}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 py-10">

                {step === 'selection' && (
                    <div className="max-w-5xl mx-auto">

                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="text-2xl font-semibold text-gray-100 mb-2">
                                Revision Session
                            </h1>
                            <p className="text-gray-500 text-sm">Practice a topic in interview-style format</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10">

                            {/* Left Panel: Controls */}
                            <div className="space-y-8">

                                {/* Choose Domain */}
                                <div>
                                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        Choose a domain
                                    </h3>
                                    <div className="space-y-1">
                                        {courses.map(course => {
                                            const isSelected = selectedCourse === course.id;
                                            return (
                                                <button
                                                    key={course.id}
                                                    onClick={() => { setSelectedCourse(course.id); setSelectedTopic(null); }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-left ${isSelected
                                                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                                                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                                                        }`}
                                                >
                                                    <course.icon className="w-4 h-4" />
                                                    <span className="font-medium text-sm">{course.name}</span>
                                                    {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Session Length */}
                                <div>
                                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        Session length
                                    </h3>
                                    <div className="flex gap-2">
                                        {[20, 30].map(mins => (
                                            <button
                                                key={mins}
                                                onClick={() => setDuration(mins)}
                                                className={`flex-1 py-3 rounded-md font-medium text-sm transition-all ${duration === mins
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-800/50 text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                                                    }`}
                                            >
                                                {mins} min
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Begin Button */}
                                <button
                                    onClick={handleStart}
                                    disabled={!selectedTopic}
                                    className={`w-full py-4 rounded-md flex items-center justify-center gap-2 font-medium text-sm transition-all ${!selectedTopic
                                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                                            : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-[0.98]'
                                        }`}
                                >
                                    Begin Revision
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                {/* How it works - simplified */}
                                <div className="pt-6 border-t border-gray-800/50">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                                        How this session works
                                    </h4>
                                    <ul className="text-xs text-gray-500 space-y-2">
                                        <li>• Questions generated from your selected topic</li>
                                        <li>• Mix of MCQ, code, and conceptual prompts</li>
                                        <li>• Timed session, no pauses allowed</li>
                                        <li>• Focus on syllabus-relevant content only</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Panel: Topic Selection */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Select a topic
                                    </h3>
                                    <span className="text-xs text-gray-600">{getTopics().length} available</span>
                                </div>

                                <div className="max-h-[500px] overflow-y-auto pr-1">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getTopics().map((topic, idx) => {
                                            const isSelected = selectedTopic?.id === topic.id;
                                            return (
                                                <button
                                                    key={topic.id}
                                                    onClick={() => setSelectedTopic(topic)}
                                                    className={`group p-3 rounded-md text-left transition-all ${isSelected
                                                            ? 'bg-orange-500/10 border border-orange-500/30'
                                                            : 'bg-gray-900/30 hover:bg-gray-800/50 border border-transparent'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between mb-1">
                                                        <span className={`text-[10px] font-mono ${isSelected ? 'text-orange-400' : 'text-gray-600'
                                                            }`}>
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </span>
                                                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                                                    </div>
                                                    <h4 className={`font-medium text-xs leading-snug line-clamp-2 ${isSelected ? 'text-orange-300' : 'text-gray-400 group-hover:text-gray-200'
                                                        }`}>
                                                        {topic.title}
                                                    </h4>
                                                    {topic.lessons && (
                                                        <p className={`text-[10px] mt-1.5 ${isSelected ? 'text-orange-400/60' : 'text-gray-600'}`}>
                                                            {topic.lessons.length} lessons
                                                        </p>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Session Mode */}
                {(step === 'session' || step === 'results') && (
                    <div className="max-w-4xl mx-auto">
                        {step === 'session' && selectedTopic && (
                            <RevisionSession
                                course={courses.find(c => c.id === selectedCourse)?.name}
                                topic={selectedTopic}
                                topicData={selectedTopic}
                                duration={duration}
                                onFinish={handleFinish}
                                themeColor="orange"
                            />
                        )}

                        {step === 'results' && sessionResults && (
                            <RevisionResults
                                results={sessionResults}
                                onRetry={handleRetry}
                                themeColor="orange"
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
