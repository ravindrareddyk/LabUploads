import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, UploadCloud, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Code2 className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold tracking-tight">LabVault</span>
                </div>
                <div className="space-x-4">
                    <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
                    <Button onClick={() => navigate('/dashboard')}>Get Started</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 pt-20 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-accent/50 border border-accent/20 text-sm font-medium text-accent-foreground mb-4">
                        New: Academic Semester 2024 is now live.
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                        Submit your lab programs with confidence.
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        The modern way to manage academic submissions. Fast, secure, and designed for students.
                        Drag, drop, and done.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button size="lg" className="h-12 px-8 text-lg group" onClick={() => navigate('/dashboard')}>
                            Start Uploading
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                            View Documentation
                        </Button>
                    </div>
                </motion.div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    {[
                        {
                            icon: UploadCloud,
                            title: "Instant Upload",
                            desc: "Drag & drop interface supporting all major code formats."
                        },
                        {
                            icon: ShieldCheck,
                            title: "Verified Security",
                            desc: "Your code is encrypted and safely stored in our private cloud."
                        },
                        {
                            icon: Code2,
                            title: "Syntax Highlighting",
                            desc: "Preview your submissions with beautiful syntax highlighting."
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                            <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                                <feature.icon className="h-12 w-12 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
