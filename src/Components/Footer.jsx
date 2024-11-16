export default function Footer() {
    return (
      <footer className="footer footer-center bg-base-200 text-base-content p-10">
        <nav className="flex gap-10">
          <a href="#" onClick={(e) => e.preventDefault()}>About us</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
        </nav>
        <div>
          <p>Copyright © {new Date().getFullYear()} - No Copyright</p>
        </div>
      </footer>
    );
  }
  