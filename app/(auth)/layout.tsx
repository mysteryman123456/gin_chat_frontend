export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full mx-auto max-w-md">{children}</div>;
}
