import Link from 'next/link';

interface LogoProps {
  isArabic: boolean;
  isDarkMode: boolean;
}

export const Logo = ({ isArabic, isDarkMode }: LogoProps) => {
  return (
    <Link href="/" className={`text-lg md:text-xl lg:text-2xl font-bold transition-colors hover:opacity-80 cursor-pointer ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {isArabic ? (
        <><span className="text-[#C7AB6C]">المتجر</span> العالمي</>
      ) : (
        <>Global <span className="text-[#C7AB6C]">Shop</span></>
      )}
    </Link>
  );
};