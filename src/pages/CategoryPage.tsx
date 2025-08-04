import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
import { PrayerCard } from '@/components/ui/prayer-card';
import { prayers, getPrayersByCategory, Prayer } from '@/data/prayers';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNames = {
    traditional: 'Orações Tradicionais',
    powerful: 'Orações Poderosas',
    saints: 'Orações aos Santos',
    situation: 'Orações por Situação'
  };

  const categoryName = categoryNames[categoryId as keyof typeof categoryNames] || 'Orações';
  const categoryPrayers = categoryId ? getPrayersByCategory(categoryId as Prayer['category']) : [];

  const filteredPrayers = searchQuery
    ? categoryPrayers.filter(prayer =>
        prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prayer.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prayer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : categoryPrayers;

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title={categoryName}
        onBack={() => navigate('/')}
      />

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar nesta categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white shadow-gentle border-0 h-12"
            />
          </div>
          <Button 
            variant="outline"
            size="icon"
            className="h-12 w-12 bg-white shadow-gentle border-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredPrayers.length} oração{filteredPrayers.length !== 1 ? 'ões' : ''} encontrada{filteredPrayers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Prayer List */}
        <div className="space-y-4">
          {filteredPrayers.map((prayer) => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              onClick={() => navigate(`/prayer/${prayer.id}`)}
            />
          ))}
        </div>

        {filteredPrayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Nenhuma oração encontrada
            </p>
            <Button 
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Limpar busca
            </Button>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}