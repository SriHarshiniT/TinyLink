import './globals.css'

export const metadata = {
  title: 'TinyLink',
  description: 'TinyLink - URL shortener assignment'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding: '1rem', borderBottom: '1px solid #eee'}}>
          <div style={{maxWidth: 900, margin: '0 auto'}}>
            <h1 style={{margin: 0}}>TinyLink</h1>
          </div>
        </header>
        <main style={{maxWidth: 900, margin: '1rem auto', padding: '0 1rem'}}>
          {children}
        </main>
        <footer style={{padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem'}}>
          <div style={{maxWidth:900, margin:'0 auto', fontSize: 14, color: '#666'}}>
            TinyLink — Take-home assignment
          </div>
        </footer>
      </body>
    </html>
  )
}
