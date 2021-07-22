import { useUser } from '../hooks/useUser';

const Lists = () => {
    const user = useUser();

    console.log({ user });
    return <p>{user}</p>;
};

export default Lists;
