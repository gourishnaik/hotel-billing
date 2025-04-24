export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks';
    imageUrl?: string;
    isAvailable: boolean;
} 