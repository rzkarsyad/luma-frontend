import React from 'react';
import '../app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Luma AI</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
