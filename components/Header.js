import styled from 'styled-components';
import Nav from './Nav';
import Title from './Title';

const HeaderStyles = styled.header`
    grid-area: header;
    height: 32px;

    img {
        height: 100%;
    }
`;

const Header = () => (
    <HeaderStyles>
        <Title />
        <Nav />
    </HeaderStyles>
);

export default Header;
