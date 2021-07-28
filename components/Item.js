import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Edit2, Save } from 'react-feather';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../hooks/useUser';
import ItemEdit from './ItemEdit';
import { QUERY_LIST_BY_ID } from './List';

export const ItemStyles = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 5px;

    > div {
        padding: 0 0 0 5px;
    }

    .quantity {
        color: var(--subtitle-color);
    }

    .submit {
        padding: 0 20px;
    }
`;

// TODO
const SAVE_ITEM_MUTATION = gql`
    mutation SAVE_ITEM_MUTATION($id: ID!, $title: String!, $quantity: Int!) {
        updateItem(id: $id, data: { title: $title, quantity: $quantity }) {
            id
        }
    }
`;

const Item = ({ item }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [quantity, setQuantity] = useState(item.quantity);
    const [save, { loading, error, data }] = useMutation(SAVE_ITEM_MUTATION, {
        variables: {
            id: item.id,
            title,
            quantity,
        },
        refetchQueries: [
            {
                query: CURRENT_USER_QUERY,
            },
        ],
    });

    const handleSave = async () => {
        const res = await save();
        if (res?.data?.updateItem?.id) {
            setEditMode(false);
        }
    };

    // child component change handler
    const handleChange = (newQuantity, newTitle, triggerSave) => {
        setQuantity(Math.max(1, newQuantity));
        setTitle(newTitle);
        if (triggerSave) {
            handleSave();
        }
    };

    const readOnlyItem = (
        <ItemStyles className="terminal-alert terminal-alert-primary">
            <div className="quantity">
                <span className="quantity">{`${item.quantity}x `}</span>
            </div>
            <div>{item.title}</div>
            <div>
                <Edit2 onClick={() => setEditMode(true)} size="16" />
            </div>
        </ItemStyles>
    );

    const editableItem = (
        <ItemStyles className="terminal-alert terminal-alert-primary">
            <ItemEdit
                title={title}
                quantity={quantity}
                onChange={handleChange}
            />

            <div className="submit">
                <Save onClick={handleSave} />
            </div>
        </ItemStyles>
    );

    return editMode ? editableItem : readOnlyItem;
};

export default Item;
