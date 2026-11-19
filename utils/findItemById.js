export const findItemById = (itemId, itemArr) => {
    return itemArr.find((item) => item.id === Number(itemId))
}