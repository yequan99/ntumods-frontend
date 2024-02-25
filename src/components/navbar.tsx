import Link from 'next/link';
export default function NavBar() {
    return (
        <div className="h-full flex items-center border-b-2 border-slate-200 pl-10 hover:cursor-pointer">
            <Link href="/">NTUMODS</Link>
        </div>
    )
}