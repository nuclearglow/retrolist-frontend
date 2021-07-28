import { useRouter } from 'next/router';
import styled from 'styled-components';
import CreateItems from './CreateItems';

const FooterStyles = styled.footer`
    grid-area: footer;

    img {
        height: 100%;
    }
`;

const Footer = () => {
    const { query } = useRouter();

    return (
        <FooterStyles>
            {query?.id && <CreateItems listId={query.id} />}
        </FooterStyles>
    );
};

export default Footer;
