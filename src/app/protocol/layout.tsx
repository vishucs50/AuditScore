
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <div className="relative flex min-h-screen w-full flex-col group/design-root">
          {children}
        </div>
      
  );
}
