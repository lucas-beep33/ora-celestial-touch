import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileHeader } from '@/components/ui/mobile-header';
import { PrayerCard } from '@/components/ui/prayer-card';
import { searchPrayers, Prayer } from '@/data/prayers';
import { Badge } from '@/components/ui/badge';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Prayer[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'traditional', label: 'Tradicionais' },
    { id: 'powerful', label: 'Poderosas' },
    { id: 'saints', label: 'Santos' },
    { id: 'situation', label: 'Por Situação' }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      let searchResults = searchPrayers(searchQuery);
      
      if (selectedCategories.length > 0) {
        searchResults = searchResults.filter(prayer => 
          selectedCategories.includes(prayer.category)
        );
      }
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery, selectedCategories]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchResults = searchPrayers(searchQuery);
      setResults(searchResults);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Buscar Orações"
        onBack={() => navigate('/')}
      />

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar orações, santos, situações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-white shadow-gentle border-0 h-12"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="h-12 px-6 bg-primary hover:bg-primary-dark shadow-gentle"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Filtrar por categoria:</h3>
            {(selectedCategories.length > 0 || searchQuery) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <Filter className="h-3 w-3 mr-1" />
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Resultados da busca
              </h2>
              <p className="text-sm text-muted-foreground">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((prayer) => (
                  <PrayerCard
                    key={prayer.id}
                    prayer={prayer}
                    onClick={() => navigate(`/prayer/${prayer.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhuma oração encontrada
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente buscar por outros termos ou ajustar os filtros
                </p>
                <Button 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Limpar busca
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Search suggestions when no query */}
        {!searchQuery && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Sugestões de busca:
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Pai Nosso',
                'São Jorge',
                'Cura',
                'Proteção',
                'Emprego',
                'Família',
                'Ansiedade',
                'Santo Antônio'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(suggestion)}
                  className="justify-start text-left"
                >
                  <Search className="h-3 w-3 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}