import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="py-[12px] flex justify-center items-center">
        <div className="">
          <p className="text-[12px] text-center text-[var(--text-c)]">
            Built with Rust, Actix, <span className='line-through'>Diesel</span>, <span className='line-through'>Inferno</span>, Typescript, v0, ChatGPT, Cursor, and <a href='https://imcook.in' target='_blank' rel='noreferrer' className='hover:text-[var(--text-a)] hover:underline'>Me</a>
          </p>
        </div>
      </footer>

  )
}

export default Footer