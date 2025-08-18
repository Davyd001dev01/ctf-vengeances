// panel/app/layout.tsx
import "./globals.css"

export const metadata = {
  title: "TechCorp PM Panel",
  description: "TechCorp PM administrative panel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Helvetica, Arial, sans-serif",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
