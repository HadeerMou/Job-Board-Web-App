import Link from "next/link";

function Footer() {
  return (
    <div className="shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500 dark:text-gray-300 flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="hover:text-gray-700 dark:hover:text-gray-100"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-700 dark:hover:text-gray-100"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-gray-700 dark:hover:text-gray-100"
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
