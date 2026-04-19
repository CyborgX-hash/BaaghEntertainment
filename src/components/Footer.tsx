import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand-section">
                    <h2>BAAGH <span>ENTERTAINMENT</span></h2>
                    <p>Baagh Entertainment Stories That Roar.</p>
                </div>
                <div className="footer-section links-section">
                    <h3>Quick Links</h3>
                    <Link href="/about">About Us</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/portfolio">Portfolio</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className="footer-section contact-section">
                    <h3>Location</h3>
                    <p>Ward No. 12 Garra Chowk near toll plaza garra Balaghat - 481001</p>
                    <p>Email: Baaghentertainment@gmail.com</p>
                    <p>Phone: +91 9244831011</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Baagh Entertainment. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
