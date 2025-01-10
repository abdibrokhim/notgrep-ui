'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GitFork, LucideStars, Search, Share } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  showSearch?: boolean;
  query?: string;
}

export default function Header({ showSearch = false, query = '' }: HeaderProps) {
  const closeAllDropdowns = () => {
    document.getElementById('forkDropdown')?.classList.add('hidden');
    document.getElementById('starDropdown')?.classList.add('hidden');
  };

  const toggleDropdown = (dropdownId: string) => {
    if (document.getElementById(dropdownId)?.classList.contains('hidden')) {
      closeAllDropdowns();
      document.getElementById(dropdownId)?.classList.remove('hidden');
    } else {
      document.getElementById(dropdownId)?.classList.add('hidden');
    }
  };

  return (
    <header className="bg-white border-b border-[var(--border)] px-[24px] py-[12px]">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="https://imcook.in" className="flex items-center space-x-1" target='_blank' rel='noreferrer'>
            <Image src="/icons/oc-icon.svg" alt="oc" width={22} height={22} />
          </Link>
          <Image src="/icons/slash.svg" alt="slash" width={22} height={22} className='w-[22px] h-[22px]' />
          <Link href="/" className="flex items-center space-x-1 mb-[6px]">
            <Image src="/icons/notgrep-logo.svg" alt="!grep" width={90} height={80} />
          </Link>
        </div>
        {showSearch ? (
          <div className="w-full max-w-2xl">
            <form action="/search" method="GET">
              <input
                type="text"
                name="q"
                placeholder="Search"
                className="w-full px-4 py-2 text-sm border border-[var(--input)] bg-[var(--input)] hover:bg-[var(--accent)] rounded-md focus:outline-[var(--text-c)] focus:ring-4 focus:ring-[var(--accent)] transform transition-all duration-300 ease-in-out placeholder:text-xs sm:placeholder:text-sm"
                defaultValue={query}
              />
            </form>
          </div>
        ) : null}
        <div className='flex flex-row gap-2'>
          <div className="relative">
            <Button 
              onClick={() => toggleDropdown('forkDropdown')}
              variant="outline"
              className='shrink-0'
            >
              <GitFork className="w-3 h-3 mr-2" />
              <span>Fork</span>
            </Button>
            <div id="forkDropdown" className="hidden absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="p-2">
                <a href="https://github.com/abdibrokhim/notgrep/fork" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-[var(--text-a)] hover:bg-[var(--input)] hover:rounded-md transition duration-200">notgrep</a>
                <a href="https://github.com/abdibrokhim/notgrep-ui/fork" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-[var(--text-a)] hover:bg-[var(--input)] hover:rounded-md transition duration-200">notgrep-ui</a>
              </div>
            </div>
          </div>
          <div className="relative">
            <Button 
              onClick={() => toggleDropdown('starDropdown')}
              variant="outline"
              className='shrink-0'
            >
              <LucideStars className="w-3 h-3 mr-2" />
              <span>Star</span>
            </Button>
            <div id="starDropdown" className="hidden absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="p-2">
                <a href="https://github.com/abdibrokhim/notgrep/" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-[var(--text-a)] hover:bg-[var(--input)] hover:rounded-md transition duration-200">notgrep</a>
                <a href="https://github.com/abdibrokhim/notgrep-ui/" target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm text-[var(--text-a)] hover:bg-[var(--input)] hover:rounded-md transition duration-200">notgrep-ui</a>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => {
              const text = "this guy is cracked @abdibrokhim. pure cooker at imcook.in , akshfil..uwdbjs";
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
            }}
            variant="outline"
            className='shrink-0'
          >
            <Share className="w-3 h-3 mr-2" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
