import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { AdminAddButton, AdminItemControls } from '@/components/AdminControls';

export const dynamic = 'force-dynamic';

export default async function Services() {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === 'ADMIN';

    let dbServices: any[] = [];
    try {
        dbServices = await prisma.service.findMany({
            orderBy: { createdAt: 'asc' }
        });
    } catch (error) {
        console.error('Failed to fetch services from database:', error);
    }

    const staticServices = [
        {
            id: '1',
            title: 'Line Production',
            desc: 'Complete end-to-end execution',
            details: 'We handle everything from budgeting, scheduling, and crew hiring to equipment sourcing and daily operations. Our experienced line producers ensure your project runs on time and within budget, no matter the scale.',
            image: 'images/Poster.png',
            isStatic: true
        },
        {
            id: '2',
            title: 'Locations & Permits',
            desc: 'Access to exclusive locations across India',
            details: 'Our extensive database and strong government relationships allow us to secure permits for even the most restricted locations. We handle all paperwork, local liaising, and logistical planning.',
            image: 'images/Locations.png',
            isStatic: true
        },
        {
            id: '3',
            title: 'Casting & Talent Management',
            desc: 'Finding the perfect face for your vision',
            details: 'From lead actors to thousands of junior artists, our casting directors have a keen eye for talent. We manage auditions, contracts, and on-set coordination for all performers.',
            image: 'images/Casting.webp',
            isStatic: true
        },
        {
            id: '4',
            title: 'Camera & Equipment',
            desc: 'State-of-the-art gear delivered on set',
            details: 'We partner with premium rental houses to provide the latest cameras, lighting, and grip equipment. Our technical coordinators ensure all gear is tested and maintained properly.',
            image: 'images/Logistic.jpeg',
            isStatic: true
        },
        {
            id: '5',
            title: 'Vanity Van & Vehicles',
            desc: 'Premium vanity vans and logistics transport for cast, crew, and equipment.',
            details : '',
            image:'images/Vanity.png',
            isStatic : true
        },
        {
            id: '6',
            title: "Shooting Permission & Legal Contracts",
            desc: 'Fast-track government and local authority approvals across all states.',
            details: '',
            image : 'images/Permisssion.jpeg',
            isStatic: true
        }

    ];

    const defaultImage = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop';
    const allServices = [...staticServices, ...dbServices];

    return (
        <div className="page-container" style={{ backgroundColor: 'var(--color-charcoal)' }}>
            <section className="page-section">
                <h1 className="page-title">Core Services</h1>
                <p className="page-subtitle" style={{ marginBottom: '4rem' }}>End-to-End Production Logistics</p>

                <AdminAddButton isAdmin={isAdmin} href="/admin/services/new" label="New Service" />

                <div className="content-grid-lg" style={{ gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                    {allServices.map((srv: any) => {
                        const bgImage = srv.image || defaultImage;
                        return (
                        <div key={srv.id} className="image-card" style={{ minHeight: '450px', aspectRatio: 'auto' }}>
                            <img src={bgImage} alt={srv.title} />
                            <div className="image-card-overlay">
                                <AdminItemControls isAdmin={isAdmin} id={srv.id} type="service" isStatic={srv.isStatic} />
                                <h2 className="image-card-title" style={{ fontSize: '2.5rem' }}>{srv.title}</h2>
                                <p className="image-card-desc">
                                    <span style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>{srv.desc}</span>
                                    {srv.details}
                                </p>
                                <div className="image-card-desc" style={{ marginTop: '1.5rem', overflow: 'visible', maxHeight: 'none' }}>
                                    <Link href="/contact" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', backgroundColor: 'rgba(0,0,0,0.5)', display: 'inline-block' }}>Book Service</Link>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </section>
        </div>
    );
}
