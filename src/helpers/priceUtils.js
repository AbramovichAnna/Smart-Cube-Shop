

export const calculateNewPrice = (product) => {
    if (product.discount && product.discount > 0) {
        const discountAmount = product.originalPrice * (product.discount / 100);
        return { newPrice: product.originalPrice - discountAmount, hasDiscount: true };
    }
    return { newPrice: product.originalPrice, hasDiscount: false };
};