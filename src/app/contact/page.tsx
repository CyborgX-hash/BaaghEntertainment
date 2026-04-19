'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', service: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="page-container" style={{ backgroundColor: 'var(--color-black)' }}>
            <section className="page-section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="two-col-grid">

                    <div style={{ textAlign: 'left' }}>
                        <h1 className="page-title" style={{ textAlign: 'left' }}>Get in Touch</h1>
                        <p className="page-subtitle" style={{ textAlign: 'left' }}>Let's Discuss Your Next Shoot</p>
                        <p style={{ color: 'var(--color-gray-text)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            Whether you need full line production or specific location permits, our team is ready to assist.
                            Fill out the form and a production coordinator will contact you within 24 hours.
                        </p>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--color-white)', marginBottom: '0.5rem' }}>Address</h3>
                            <p style={{ color: 'var(--color-gray-text)' }}>Ward No. 12 Garra Chowk near toll plaza garra Balaghat - 481001<br />India</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--color-white)', marginBottom: '0.5rem' }}>Direct Contact</h3>
                            <p style={{ color: 'var(--color-gray-text)' }}>Email: Baaghentertainment@gmail.com<br />Phone: +91 9244831011</p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--color-charcoal)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '2rem' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--color-gray-text)' }}>Our production coordinator will contact you shortly.</p>
                                <button onClick={() => setStatus('')} className="btn-secondary" style={{ marginTop: '2rem' }}>Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your Name or Production Company" style={{ width: '100%', padding: '15px', backgroundColor: 'var(--color-black)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '4px', fontSize: '1rem' }} />
                                <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Email Address" style={{ width: '100%', padding: '15px', backgroundColor: 'var(--color-black)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '4px', fontSize: '1rem' }} />
                                <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{ width: '100%', padding: '15px', backgroundColor: 'var(--color-black)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '4px', appearance: 'none', fontSize: '1rem' }}>
                                    <option value="">Select Service Needed</option>
                                    <option value="Line Production">Line Production</option>
                                    <option value="Locations">Locations & Permits</option>
                                    <option value="Casting">Casting Coordination</option>
                                    <option value="Equipment">Equipment & Logistics</option>
                                </select>
                                <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project..." rows={5} style={{ width: '100%', padding: '15px', backgroundColor: 'var(--color-black)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '4px', resize: 'vertical', fontSize: '1rem' }}></textarea>
                                <button disabled={status === 'loading'} type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', opacity: status === 'loading' ? 0.7 : 1 }}>
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                                {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Failed to send. Please try again.</p>}
                            </form>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
