import Link from 'next/link';
import '../Navbar.css'; // Ensure this CSS file does not have conditional styling

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="brand">
                    <Link href="/" className="nav-link">Home</Link>
                </div>
                <div className="nav-links">
                    <Link href="/admin/waitingroom" className="nav-link">Waiting Room</Link>
                    <Link href="/admin/user" className="nav-link">Users</Link>
                </div>
            </div>
        </nav>
    );
}
