import { useLocation } from "@tanstack/react-router";

export function Footer() {
  const location = useLocation();
  const isSubPage =
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/journey");

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs">
              SJ
            </span>
            <span className="font-bold text-heading">Shadab Jamadar</span>
          </div>
          <p className="text-sm text-body max-w-xs leading-relaxed">
            AI Engineer building systems that teach, reason and automate real work.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
            Sitemap
          </div>
          <ul className="space-y-2 text-sm font-semibold">
            <li>
              <a href={isSubPage ? "/#home" : "#home"} className="text-body hover:text-heading">
                Home
              </a>
            </li>
            <li>
              <a href={isSubPage ? "/#about" : "#about"} className="text-body hover:text-heading">
                About
              </a>
            </li>
            <li>
              <a href="/journey" className="text-body hover:text-heading">
                Journey
              </a>
            </li>
            <li>
              <a href="/products" className="text-body hover:text-heading">
                Products
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
            Connect
          </div>
          <ul className="space-y-2 text-sm font-semibold">
            <li>
              <a
                href="https://github.com/UnbeatableBann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/shadab-jamadar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@shadabjamadar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body hover:text-heading"
              >
                Medium
              </a>
            </li>
            <li>
              <a href="mailto:shadabjamadar4@gmail.com" className="text-body hover:text-heading">
                Email
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
            Philosophy
          </div>
          <p className="text-sm text-body leading-relaxed">
            Restraint over noise. Whitespace over content. Better typography over gradients.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted font-semibold">
          <div>© {new Date().getFullYear()} Shadab Jamadar. All rights reserved.</div>
          <div>Crafted with restraint · Built for products.</div>
        </div>
      </div>
    </footer>
  );
}
