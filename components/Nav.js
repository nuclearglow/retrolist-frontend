import Link from 'next/link';
import { LogIn, UserPlus } from 'react-feather';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';
import SignOut from './SignOut';

const Nav = () => {
    const user = useUser();

    return (
        <nav className="terminal-menu">
            {user && (
                <ul>
                    {/* <Link href="/lists">Sell</Link> */}
                    {/* <Link href="/list/:id">Items</Link> */}
                    {/* <Link href="/profile">Profile</Link> */}
                    <li>
                        <SignOut />
                    </li>
                </ul>
            )}

            {!user && (
                <ul>
                    <Link href="/signin" className="terminal-item">
                        <LogIn />
                    </Link>
                    &nbsp;
                    <Link href="/signin" className="terminal-item">
                        <UserPlus />
                    </Link>
                </ul>
            )}
        </nav>
    );
};

export default Nav;
