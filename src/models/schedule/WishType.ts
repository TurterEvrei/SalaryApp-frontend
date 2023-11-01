export enum WishType {
    DAY_OFF,
    DAY_WORK,
}

export function convertWishTypeToString(wishType: WishType): string {
    return wishType.valueOf() === 0 ? 'DAY_OFF' : 'DAY_WORK';
}