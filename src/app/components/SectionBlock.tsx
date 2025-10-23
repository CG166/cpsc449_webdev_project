'use client';
import Link from 'next/link';

type SectionBlockProps = {
    title: string;
    content: string;
    href: string;
};

export default function SectionBlock ({ title, content, href }: SectionBlockProps) {
    return(
        <div className='bg-purple-300 py-5 h-[300] border-b border-b-purple-400'>
            <h1 className="flex justify-center text-white drop-shadow-md font-bold text-4xl pt-10">{ title }</h1>
            <div className='flex flex-row p-5 px-15'>
                <p className='text-xl font-medium text-white drop-shadow-md px-15'>{ content }</p>
                <Link href={href} className='text-white text-6xl drop-shadow-md'> → </Link>
            </div>
            <hr className="line" />
        </div>
    )
}