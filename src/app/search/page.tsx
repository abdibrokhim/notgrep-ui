'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Share, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../components/ui/button';

interface SearchResult {
  avatar_url: string;
  hits: {
    hits: Array<{
      content: {
        full: string;
        snippet: string;
      };
      path: {
        raw: string;
      };
      repo: {
        raw: string;
      };
      total_matches: {
        raw: number;
      };
    }>;
    time: string;
  };
  total_matches: number;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [fullCodeVisible, setFullCodeVisible] = useState(false);
  const [repoListVisible, setRepoListVisible] = useState(true);
  const [pathListVisible, setPathListVisible] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      console.log('data', data);
      setSearchResults(data);
    };

    fetchResults();
  }, [query]);

  if (!searchResults) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="h-full overflow-hidden">
        <div className="flex h-full px-4">
          <div className="w-1/3 pr-4 border-r border-[var(--border)] overflow-hidden">
            <div className="h-1/2 overflow-hidden flex flex-col py-4">
              <h2 className="text-[14px] text-[var(--text-a)] mb-2 flex items-center ml-2 shrink-0">
                <button 
                  onClick={() => setRepoListVisible(!repoListVisible)}
                  className="mr-2 transition-transform duration-200"
                >
                  <ChevronDown 
                    size={20} 
                    className={`transform ${repoListVisible ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
                Repository
              </h2>
              {repoListVisible ? (
                <ul className="overflow-y-auto flex-1 scrollbar-hide">
                  {searchResults.hits.hits.map((hit, index) => (
                    <li key={index} className="flex mb-2 items-center justify-between text-[13px]">
                      <div className="flex items-center">
                        <Image
                          src={searchResults.avatar_url}
                          alt="Avatar"
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <a 
                          href={`https://github.com/${hit.repo.raw}`}
                          className="hover:underline"
                          target='_blank'
                          rel='noreferrer'
                        >
                          {hit.repo.raw}
                        </a>
                      </div>
                      <span className="bg-[var(--input)] px-3 py-0.5 rounded-full text-[10px]">
                        {hit.total_matches.raw}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[#666666] text-sm italic">
                  here could be placed Ad, but... 
                  <a 
                    href={`https://lovido.lol`}
                    className="hover:underline ml-1 hover:text-[var(--text-a)]"
                    target='_blank'
                    rel='noreferrer'
                  > lol
                  </a>
                </div>
              )}
            </div>
            <div className="h-1/2 border-t border-dashed border-[var(--border)] py-4 overflow-hidden flex flex-col">
              <h2 className="text-[14px] text-[var(--text-a)] mb-2 flex items-center ml-2 shrink-0">
                <button 
                  onClick={() => setPathListVisible(!pathListVisible)}
                  className="mr-2 transition-transform duration-200"
                >
                  <ChevronDown 
                    size={20} 
                    className={`transform ${pathListVisible ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
                Path
              </h2>
              {pathListVisible ? (
                <ul className="overflow-y-auto flex-1 scrollbar-hide">
                  {searchResults.hits.hits.map((hit, index) => (
                    <li key={index} className="flex mb-2 items-center justify-between text-[13px]">
                      <a 
                        href={`https://github.com/${hit.repo.raw}/blob/main/${hit.path.raw}`}
                        className="hover:underline text-[#666666]"
                        target='_blank'
                        rel='noreferrer'
                      >
                        {hit.path.raw}
                      </a>
                      <span className="bg-[var(--input)] px-3 py-0.5 rounded-full text-[10px]">
                        {hit.total_matches.raw}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[#666666] text-sm italic">
                  this space is intentionally 
                  <a 
                    href={`https://www.justmakethings.cc`}
                    className="hover:underline mx-1 hover:text-[var(--text-a)]"
                    target='_blank'
                    rel='noreferrer'
                  > left blank 
                  </a>
                  (jk, no budget for 
                    <a 
                    href={`https://www.imcook.in/OpenCommunity`}
                    className="hover:underline ml-1 hover:text-[var(--text-a)]"
                    target='_blank'
                    rel='noreferrer'
                  > ads
                  </a>
                  )
                </div>
              )}
            </div>
          </div>
          <div className="w-2/3 overflow-hidden flex flex-col">
            <div className="shrink-0 py-4 border-b border-[var(--border)] pl-4">
              <span className="text-[13px] text-[var(--text-c)]">
                {searchResults.total_matches} total matches
              </span>
            </div>
            <div className="overflow-y-auto pl-4 pt-4 flex-1 scrollbar-hide">
              {searchResults.hits.hits.map((hit, index) => (
                <div key={index} className="border border-[var(--border)] rounded-md mb-4">
                  <div className="flex items-center justify-between bg-[var(--light-bg)] p-4 border-b rounded-t-md border-[var(--border)]">
                    <div className="flex items-center">
                      <Image
                        src={searchResults.avatar_url}
                        alt="Avatar"
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      <a href={`https://github.com/${hit.repo.raw}`} className="font-semibold mr-2 hover:underline" target='_blank' rel='noreferrer'>{hit.repo.raw}</a>
                      <a href={`https://github.com/${hit.repo.raw}/blob/main/${hit.path.raw}`} className="text-[#666666] hover:underline" target='_blank' rel='noreferrer'>{hit.path.raw}</a>
                    </div>
                    <span className='text-[13px]'>{hit.total_matches.raw} matches</span>
                  </div>
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => {
                      setSelectedRepo(hit.repo.raw);
                      setFullCodeVisible(true);
                    }}
                  >
                    <pre className="whitespace-pre-wrap text-[13px]">
                      <code dangerouslySetInnerHTML={{ __html: hit.content.snippet }} />
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {fullCodeVisible && selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 h-3/4 rounded-lg relative flex flex-col">
            <div className="flex justify-end p-2 border-b border-[var(--border)]">
              <Button 
                onClick={() => setFullCodeVisible(false)}
                variant="destructive"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 p-4 overflow-hidden">
              <div className="h-full border border-[var(--border)] rounded-md">
                <div className="flex items-center justify-between bg-[var(--light-bg)] p-4 border-b rounded-t-md border-[var(--border)]">
                  <div className="flex items-center">
                    <Image
                      src={searchResults.avatar_url}
                      alt="Avatar"
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                    <a href={`https://github.com/${searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.repo.raw!}`} className="font-semibold mr-2 hover:underline" target='_blank' rel='noreferrer'>{searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.repo.raw!}</a>
                    <a href={`https://github.com/${searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.repo.raw!}/blob/main/${searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.path.raw!}`} className="text-[#666666] hover:underline" target='_blank' rel='noreferrer'>{searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.path.raw!}</a>
                  </div>
                  <span className='text-[13px]'>{searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.total_matches.raw!} matches</span>
                </div>
                <div className="overflow-y-auto h-[calc(100%-64px)]">
                  <pre className="whitespace-pre-wrap text-[13px] p-4">
                    <code>
                      {searchResults.hits.hits.find((hit) => hit.repo.raw === selectedRepo)?.content.full}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
