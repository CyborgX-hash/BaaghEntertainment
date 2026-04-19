import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
    const services = [
        { title: 'Line Production', desc: 'Comprehensive budgeting, scheduling, and on-ground management for seamless shoots.', image: 'images/Poster.png' },
        { title: 'Location Management', desc: 'Scouting and securing elite locations across India with required permits.', image: 'images/Locations.png' },
        { title: 'Casting Coordination', desc: 'Arranging junior artists, extras, and specialized talents for any scale of production.', image: 'images/Casting.webp' },
        { title: 'Vanity Vans & Vehicles', desc: 'Premium vanity vans and logistics transport for cast, crew, and equipment.', image: 'images/Vanity.png' },
        { title: 'Equipment Logistics', desc: 'Sourcing and transporting top-tier camera, lighting, and grip equipment.', image: 'images/Logistic.jpeg' },
        { title: 'Shooting Permissions', desc: 'Fast-track government and local authority approvals across all states.', image: 'images/Permisssion.jpeg' },
    ];

    const stats = [
        { number: '3', label: 'Projects Completed' },
        { number: '33+', label: 'Cities Covered' },
        { number: '2+', label: 'Years Experience' },
        { number: '24/7', label: 'Production Support' },
    ];

    return (
        <>
            <section className={styles.hero}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.heroBackground}
                    poster= "images/Poster.png"
                >
                    <source src="https://cdn.pixabay.com/video/2021/08/25/86241-592750838_tiny.mp4" type="video/mp4" />
                </video>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1>BAAGH ENTERTAINMENT<br /><span style={{ color: 'var(--color-accent)' }}>STORIES THAT ROAR</span></h1>
                    {/* <p>Complete Film Production Support Across India. Your trusted partner for feature films, web series, commercials, and OTT projects.</p> */}
                    <div className={styles.heroButtons}>
                        <Link href="/services" className="btn-primary" style={{ display: 'inline-block' }}>Explore Services</Link>
                        <Link href="/contact" className="btn-secondary" style={{ display: 'inline-block' }}>Contact Us</Link>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionCharcoal}`}>
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <p className={styles.sectionSubtitle}>Everything you need for a flawless shoot</p>
                <div className={styles.servicesGrid}>
                    {services.map((srv, idx) => (
                        <div key={idx} className="image-card">
                            <img src={srv.image} alt={srv.title} />
                            <div className="image-card-overlay">
                                <h3 className="image-card-title">{srv.title}</h3>
                                <p className="image-card-desc">{srv.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionDark}`}>
                <div className={styles.statsContainer}>
                    {stats.map((stat, idx) => (
                        <div key={idx} className={styles.statItem}>
                            <h4>{stat.number}</h4>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionCharcoal}`}>
                <div className={styles.ctaBox}>
                    <h2>Ready to Start Your Next Project?</h2>
                    <p>Partner with Baagh Entertainment for world-class production support across India.</p>
                    <Link href="/contact"><button className="btn-primary">Let's Talk Production</button></Link>
                </div>
            </section>
        </>
    );
}
