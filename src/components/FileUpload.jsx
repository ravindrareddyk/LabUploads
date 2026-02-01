import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function FileUpload({ onUpload }) {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (fileList) => {
        const newFiles = Array.from(fileList).map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            id: Math.random().toString(36).substring(7),
            file: file
        }));
        setFiles(prev => [...prev, ...newFiles]);
        if (onUpload) onUpload(newFiles);
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={cn(
                    "relative h-64 w-full rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center p-6 text-center cursor-pointer overflow-hidden group",
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    multiple
                    onChange={handleChange}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="z-10 flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-background shadow-lg ring-1 ring-border group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-medium text-foreground">
                            Drop your lab programs here
                        </p>
                        <p className="text-sm text-muted-foreground">
                            or click to browse (PDF, DOCX, CPP, PY)
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 space-y-3"
                    >
                        <h4 className="text-sm font-medium text-muted-foreground ml-1">Uploaded Files</h4>
                        {files.map((file) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card/50 backdrop-blur-sm group"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 rounded-md bg-primary/10">
                                        <File className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">{file.size}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                    className="text-muted-foreground hover:text-destructive shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
