import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import CreateItems from '../components/CreateItems';
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
    return (
        <ul>
            {user.lists?.map((list) => (
                <li key={list.id}>
                    <Link href={`/list/${list.id}`}>
                        <a>
                            {list.title} ({list.items.length} entries)
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Lists;
