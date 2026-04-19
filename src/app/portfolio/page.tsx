import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { AdminAddButton, AdminItemControls } from '@/components/AdminControls';

export const dynamic = 'force-dynamic';

export default async function Portfolio() {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === 'ADMIN';
    let dbProjects: any[] = [];
    try {
        dbProjects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('Failed to fetch projects from database:', error);
    }

    // const staticProjects = [
    //     { id: '1', title: 'Panchayat', type: 'Web Series', client: 'Amazon Prime', image: '/images/gram_panchayat.png', isStatic: true },
    // ];

    const projects = [...dbProjects];

    return (
        <div className="page-container" style={{ backgroundColor: 'var(--color-black)' }}>
            <section className="page-section">
                <h1 className="page-title">Our Portfolio</h1>
                <p className="page-subtitle" style={{ marginBottom: '4rem' }}>Excellence On Screen</p>

                <AdminAddButton isAdmin={isAdmin} href="/admin/portfolio/new" label="New Project" />

                <div className="content-grid">
                    {projects.map((proj: any) => (
                        <div key={proj.id} className="portfolio-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', cursor: 'pointer' }}>
                            <AdminItemControls isAdmin={isAdmin} id={proj.id} type="project" isStatic={proj.isStatic} />
                            <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} className="portfolio-img" />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', textAlign: 'left' }}>
                                <p style={{ color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '0.5rem' }}>{proj.type} &bull; {proj.client}</p>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-white)' }}>{proj.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
