'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/lib/adminActions';

export default function EditProjectClient({ project }: { project: any }) {
    const [title, setTitle] = useState(project.title);
    const [client, setClient] = useState(project.client);
    const [type, setType] = useState(project.type);
    const [servicesProvided, setServicesProvided] = useState(project.servicesProvided);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(project.image || null);
    const [existingImage, setExistingImage] = useState(project.image || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = existingImage;

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                if (uploadData.url) imageUrl = uploadData.url;
            }

            // Using the server action from adminActions.ts (same pattern as services)
            await updateProject(project.id, { title, client, type, servicesProvided, image: imageUrl });

            router.push('/portfolio');
            router.refresh();
        } catch (error) {
            console.error('Error updating project:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '15px',
        backgroundColor: 'var(--color-black)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '1rem'
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--color-black)' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: 'var(--color-charcoal)', borderRadius: '8px' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Edit Project</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray-text)' }}>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray-text)' }}>Client</label>
                        <input value={client} onChange={(e) => setClient(e.target.value)} required style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray-text)' }}>Project Type</label>
                        <input value={type} onChange={(e) => setType(e.target.value)} required style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray-text)' }}>Services Provided</label>
                        <input value={servicesProvided} onChange={(e) => setServicesProvided(e.target.value)} required style={inputStyle} />
                    </div>

                    {/* Image Upload Area */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-gray-text)' }}>Project Image</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            style={{
                                border: `2px dashed ${dragActive ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)'}`,
                                borderRadius: '8px',
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: dragActive ? 'rgba(218,165,32,0.05)' : 'var(--color-black)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {imagePreview ? (
                                <div>
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                    <p style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>Click or drag to replace</p>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📁</div>
                                    <p style={{ color: 'var(--color-gray-text)', marginBottom: '0.3rem' }}>Drag & drop an image here</p>
                                    <p style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}>or click to browse</p>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '1rem',
                            backgroundColor: isSubmitting ? '#888' : 'var(--color-gold)',
                            color: 'var(--color-black)',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            marginTop: '1rem',
                            fontSize: '1rem'
                        }}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Project'}
                    </button>
                    <a href="/portfolio" style={{ display: 'block', textAlign: 'center', color: 'var(--color-gray-text)', textDecoration: 'none' }}>Cancel</a>
                </form>
            </div>
        </div>
    );
}
