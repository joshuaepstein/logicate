import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <div className="border-t-neutralgrey-500 w-full border-t py-8">
      <div className="container flex items-center justify-between">
        <p className="text-neutralgrey-1100/80 text-sm">&copy; 2024 Logicate. All rights reserved.</p>
        <p className="text-neutralgrey-1100/80 text-sm">
          Created by{' '}
          <Link className="text-neutralgrey-1300 hover:text-neutralgrey-1200 font-[450] hover:underline" href="https://joshepstein.co.uk">
            Joshua Epstein
          </Link>
        </p>
      </div>
    </div>
  );
};
