export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'breakfast' | 'lunch' | 'dinner';
    imageUrl?: string;
    isAvailable: boolean;
} 