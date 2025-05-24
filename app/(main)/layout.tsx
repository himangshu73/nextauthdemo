import NavbarWrapper from "@/components/NavbarWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWrapper />
      {children}
    </div>
  );
}
