import Link from "next/link";

type AppCardProps = {
  title: string;
  description: string;
  href: string;
  bgColor: string;
};

export default function AppCard({
  title,
  description,
  href,
  bgColor,
}: AppCardProps) {
  return (
    <Link
      href={href}
      className="`${bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-xl font-bold mbd-2 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}
