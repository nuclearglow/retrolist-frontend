import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import Item from './Item';

export const QUERY_LIST_BY_ID = gql`
    query QUERY_LIST_BY_ID($id: ID!) {
        List(where: { id: $id }) {
            title
            subtitle
            items {
                id
                title
                quantity
            }
        }
    }
`;

const ListStyles = styled.section`
    padding: 0 10px;

    .items {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        align-content: flex-start;
    }
`;

const List = ({ id }) => {
    const { data, loading, error } = useQuery(QUERY_LIST_BY_ID, {
        variables: { id },
    });
    const list = data?.List;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    const itemsNeeded =
        list?.items?.reduce(
            (accumulated, current) => accumulated + current.quantity,
            0
        ) ?? 0;

    return (
        <ListStyles>
            {list?.items?.length === 0 && (
                <h3>Ready to go! What do you need?</h3>
            )}

            {itemsNeeded > 0 && (
                <h3>
                    I need {itemsNeeded} thing{itemsNeeded > 1 ? 's' : ''}:
                </h3>
            )}

            <div className="items">
                {list?.items?.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </ListStyles>
    );
};

export default List;
