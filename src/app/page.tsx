import React from 'react';
import Layout from './components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-[24px] sm:text-[48px] font-bold text-[#171717]">Code search made fast</h1>
        <p className="text-[#666666] text-[14px] sm:text-[16px] text-center max-w-2xl">
          Effortlessly search for code, files, and paths across <span className='text-[var(--text-a)]'>My</span> repositories
        </p>
        <p className="text-[#666666] text-[14px] sm:text-[16px] mb-4 text-center max-w-2xl">
          <span className="line-through">as grep could not make it. lol</span>
        </p>
        <div className="w-full max-w-2xl">
          <form action="/search" method="GET">
            <input
              type="text"
              name="q"
              placeholder="Search"
              className="w-full px-4 py-2 text-sm border border-[var(--input)] bg-[var(--input)] hover:bg-[var(--accent)] rounded-md focus:outline-[var(--text-c)] focus:ring-4 focus:ring-[var(--accent)] transform transition-all duration-300 ease-in-out placeholder:text-xs sm:placeholder:text-sm"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

