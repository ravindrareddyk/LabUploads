import React, { useState, useEffect } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getMetadata } from 'firebase/storage';

export default function Dashboard() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch files from Firebase Storage
    const fetchFiles = async () => {
        setLoading(true);
        try {
            const listRef = ref(storage, 'uploads/');
            const res = await listAll(listRef);

            const filePromises = res.items.map(async (itemRef) => {
                // Get metadata for size and time
                try {
                    const metadata = await getMetadata(itemRef);
                    return {
                        id: itemRef.name, // unique filename
                        name: itemRef.name.substring(itemRef.name.indexOf('-') + 1), // remove timestamp
                        realName: itemRef.name,
                        size: (metadata.size / 1024).toFixed(2) + ' KB',
                        date: new Date(metadata.timeCreated).toLocaleString(),
                        status: 'Stored'
                    };
                } catch (e) {
                    return null;
                }
            });

            const fileList = await Promise.all(filePromises);
            // Filter nulls and sort
            const validFiles = fileList.filter(f => f !== null);
            validFiles.sort((a, b) => new Date(b.date) - new Date(a.date));

            setHistory(validFiles);
        } catch (error) {
            console.error("Failed to fetch files", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (files) => {
        if (files.length === 0) return;

        try {
            await Promise.all(files.map(async (f) => {
                if (!f.file) return;
                // Create a reference with timestamp to avoid name collisions
                const fileName = Date.now() + '-' + f.file.name;
                const storageRef = ref(storage, 'uploads/' + fileName);
                await uploadBytes(storageRef, f.file);
            }));

            setSuccess(true);
            fetchFiles(); // Refresh list
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error('Upload error', error);
            alert('Upload failed: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                        <p className="text-muted-foreground">Manage your lab submissions for the current semester.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>New Submission</CardTitle>
                                <CardDescription>Upload your program files (C++, Java, Python).</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {success ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                                        <div className="p-4 rounded-full bg-green-500/10 text-green-500">
                                            <CheckCircle className="h-12 w-12" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Upload Successful!</h3>
                                            <p className="text-muted-foreground">File stored in Firebase Cloud.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <FileUpload onUpload={handleUpload} />
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="h-full relative">
                            <CardHeader>
                                <CardTitle>Cloud Storage</CardTitle>
                                <CardDescription>Files saved in Firebase Storage.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                    {loading ? (
                                        <p className="text-center text-muted-foreground">Loading...</p>
                                    ) : history.length === 0 ? (
                                        <div className="text-center py-10 text-muted-foreground">
                                            No files on server.
                                        </div>
                                    ) : (
                                        <AnimatePresence initial={false}>
                                            {history.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                                                >
                                                    <div className="min-w-0 flex-1 mr-4">
                                                        <p className="font-medium truncate" title={item.name}>{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">{item.date} • {item.size}</p>
                                                    </div>
                                                    <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                                                        Cloud
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
