const getItemsFromList = (list) => {
    if (!list?.items?.length > 0) {
        return 0;
    }
    return list.items.reduce(
        (accumulator, current) => accumulator + current.quantity,
        0
    );
};

export default getItemsFromList;
