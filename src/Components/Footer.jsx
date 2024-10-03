export default function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-10">
            <nav>
                <a>About us</a>
                <a>Contact</a>
            </nav>
            <div>
                <p>Copyright © {new Date().getFullYear()} - No Copyright</p>
            </div>
        </footer>
    );
}
