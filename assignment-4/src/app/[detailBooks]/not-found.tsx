'use client'
import Link from 'next/link'
import LayoutBookstore from '../../components/LayoutBookstore/LayoutBookstore'
import { ThemeProvider } from '../../Context'

export default function NotFound() {
  return (
    <ThemeProvider>
      <LayoutBookstore>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-[72px]">404</span>
          <p>Could not find this book</p>
          <Link href="/">
            <span className='hover:opacity-50'>Back Home</span>
          </Link>
        </div>
      </LayoutBookstore>
    </ThemeProvider>
  )
}
