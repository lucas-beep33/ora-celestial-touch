export interface UserFavorite {
  id: string;
  type: 'prayer' | 'devotional' | 'verse';
  itemId: string;
  dateAdded: string;
}

// Mock localStorage-based favorites system
export class FavoritesService {
  private static readonly STORAGE_KEY = 'catholic_app_favorites';

  static getFavorites(): UserFavorite[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static addFavorite(type: UserFavorite['type'], itemId: string): void {
    const favorites = this.getFavorites();
    const exists = favorites.some(fav => fav.type === type && fav.itemId === itemId);
    
    if (!exists) {
      const newFavorite: UserFavorite = {
        id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        itemId,
        dateAdded: new Date().toISOString()
      };
      
      favorites.push(newFavorite);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  static removeFavorite(type: UserFavorite['type'], itemId: string): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(fav => !(fav.type === type && fav.itemId === itemId));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  static isFavorite(type: UserFavorite['type'], itemId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.type === type && fav.itemId === itemId);
  }

  static getFavoritesByType(type: UserFavorite['type']): UserFavorite[] {
    return this.getFavorites().filter(fav => fav.type === type);
  }

  static getRecentFavorites(limit: number = 5): UserFavorite[] {
    const favorites = this.getFavorites();
    return favorites
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, limit);
  }
}