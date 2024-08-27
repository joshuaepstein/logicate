import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <div className="w-full border-t border-t-neutralgrey-500 py-8">
      <div className="container flex justify-between items-center">
        <p className="text-sm text-neutralgrey-1100/80">
          &copy; 2024 Logicate. All rights reserved.
        </p>
        <p className="text-sm text-neutralgrey-1100/80">
          Created by{" "}
          <Link
            className="font-[450] text-neutralgrey-1300 hover:text-neutralgrey-1200 hover:underline"
            href="https://joshepstein.co.uk"
          >
            Joshua Epstein
          </Link>
        </p>
      </div>
    </div>
  );
};
