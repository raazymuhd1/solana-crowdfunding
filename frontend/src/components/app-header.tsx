'use client'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const headRef = useRef<HTMLDivElement>(null);

  function switchingShadows() {
    console.log(`body bg color ${document.body.style.backgroundColor.match(/#1d0131/)}`)
  }

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header 
        onClick={switchingShadows}
        ref={headRef}
        className="sticky z-[2] w-[80%] mx-auto text-[#fff] dark:text-[#000] top-[20px] rounded-[20px] moving_shadows z-50 px-4 py-2 bg-[#1d0131] dark:bg-[#8617e8] dark:text-neutral-400">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex gap-[40px] items-baseline gap-4">
          <Link className="text-xl font-extrabold hover:text-neutral-500 dark:hover:text-white" href="/">
            <span>CrowdFunds101</span>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-4 flex-nowrap items-center">
              {links.map(({ label, path }) => (
                <li key={path} className="">
                  <Link
                    className={`p-[5px] rounded-[10px] hover:bg-[#8617e8] hover:dark:bg-[#1d0131] text-[#fff] font-semibold  ${isActive(path) ? 'bg-[#8617e8] dark:bg-[#1d0131]' : ''}`}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton className='bg-[#8617e8] dark:bg-[#1d0131]' />
          <ClusterUiSelect />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t dark:border-neutral-800">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      className={`hover:text-neutral-500 dark:hover:text-white block text-lg py-2  ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''} `}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <WalletButton />
                <ClusterUiSelect />
                <ThemeSelect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
