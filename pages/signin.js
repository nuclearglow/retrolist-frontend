import styled from 'styled-components';
import Login from '../components/Login';
import RequestReset from '../components/RequestReset';
import Register from '../components/Register';

const GridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 2rem;
`;

const SignInPage = () => (
    <GridStyles>
        <Login />
        <Register />
        <RequestReset />
    </GridStyles>
);

export default SignInPage;
