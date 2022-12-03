import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import NavBar from './navbar'

export default function RootLayout({ children }) {

  return (
    <html>
      <head></head>
      <body>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  )
}
