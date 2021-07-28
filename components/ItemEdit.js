import styled from 'styled-components';
import { ItemStyles } from './Item';

const AmountStyles = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .more {
        color: var(--subtitle-color);
    }
`;

const AmountButtonStyles = styled.button`
    border: 0;
    padding: 0 20px;
    font-size: calc(var(--global-font-size) * 2);
`;

const ItemEdit = ({ quantity, title, onChange }) => {
    // trigger parent handler - updates props and triggers save on "Enter"
    const change = (newQuantity, newTitle, triggerSave) => {
        onChange(newQuantity, newTitle, triggerSave);
    };

    const handleChange = (e) => {
        if (e.target.value.endsWith('+')) {
            change(quantity + 1, title, false);
        } else if (e.target.value.endsWith('-')) {
            change(Math.max(1, quantity - 1), title, false);
        } else {
            change(quantity, e.target.value, false);
        }
        e.preventDefault();
    };

    // keyboard handler for speedy mobile keyboard entries
    const handleKeyEvent = (e) => {
        if (e.key === '+') {
            // + ups the amount, but will not be printed
            change(quantity + 1, title, false);
            e.preventDefault();
        } else if (e.key === '-') {
            // - downs the amount, but not below 1, and will not be printed
            change(Math.max(1, quantity - 1), title, false);
            e.preventDefault();
        } else if (e.key === 'Enter' && e.target.checkValidity()) {
            // on enter, if the input field is valid, save (checks minLength / maxLength)
            change(quantity, title, true);
            e.preventDefault();
        }
    };

    return (
        <ItemStyles>
            <AmountStyles>
                <AmountButtonStyles
                    type="button"
                    className="button btn btn-primary btn-ghost"
                    onClick={() => change(quantity + 1, title, false)}
                >
                    +
                </AmountButtonStyles>

                <span className={quantity > 1 ? 'more' : ''}>{quantity}x</span>

                <AmountButtonStyles
                    type="button"
                    className="btn btn-primary btn-ghost"
                    onClick={() => change(quantity - 1, title, false)}
                >
                    -
                </AmountButtonStyles>

                <input
                    id="edit"
                    name="edit"
                    type="text"
                    minLength="1"
                    required
                    placeholder="I need..."
                    value={title}
                    onChange={handleChange}
                    onKeyPress={handleKeyEvent}
                />
            </AmountStyles>
        </ItemStyles>
    );
};

export default ItemEdit;
