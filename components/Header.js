import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';

const HeaderStyles = styled.header`
    grid-area: header;
    height: 32px;

    img {
        height: 100%;
    }
`;

const Header = () => (
    <HeaderStyles>
        <Link href="/">Retrolist</Link>
        <Nav />
    </HeaderStyles>
);

export default Header;
