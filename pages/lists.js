import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useUser } from '../hooks/useUser';

const Lists = () => {
    const user = useUser();

    if (!user) {
        return (
            <p>
                You need to login to access your lists. Click{' '}
                <Link href="/signin">here</Link>
            </p>
        );
    }
    return <p>lists</p>;
};

export default Lists;
