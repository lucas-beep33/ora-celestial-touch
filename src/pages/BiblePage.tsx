import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MobileHeader } from '@/components/ui/mobile-header';

interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  testament: 'old' | 'new';
}

const bibleBooks: BibleBook[] = [
  // Antigo Testamento
  { id: 'genesis', name: 'Gênesis', chapters: 50, testament: 'old' },
  { id: 'exodus', name: 'Êxodo', chapters: 40, testament: 'old' },
  { id: 'leviticus', name: 'Levítico', chapters: 27, testament: 'old' },
  { id: 'numbers', name: 'Números', chapters: 36, testament: 'old' },
  { id: 'deuteronomy', name: 'Deuteronômio', chapters: 34, testament: 'old' },
  { id: 'psalms', name: 'Salmos', chapters: 150, testament: 'old' },
  { id: 'proverbs', name: 'Provérbios', chapters: 31, testament: 'old' },
  { id: 'ecclesiastes', name: 'Eclesiastes', chapters: 12, testament: 'old' },
  
  // Novo Testamento
  { id: 'matthew', name: 'Mateus', chapters: 28, testament: 'new' },
  { id: 'mark', name: 'Marcos', chapters: 16, testament: 'new' },
  { id: 'luke', name: 'Lucas', chapters: 24, testament: 'new' },
  { id: 'john', name: 'João', chapters: 21, testament: 'new' },
  { id: 'acts', name: 'Atos', chapters: 28, testament: 'new' },
  { id: 'romans', name: 'Romanos', chapters: 16, testament: 'new' },
  { id: '1corinthians', name: '1 Coríntios', chapters: 16, testament: 'new' },
  { id: '2corinthians', name: '2 Coríntios', chapters: 13, testament: 'new' },
  { id: 'galatians', name: 'Gálatas', chapters: 6, testament: 'new' },
  { id: 'ephesians', name: 'Efésios', chapters: 6, testament: 'new' },
  { id: 'philippians', name: 'Filipenses', chapters: 4, testament: 'new' },
  { id: 'colossians', name: 'Colossenses', chapters: 4, testament: 'new' },
  { id: '1thessalonians', name: '1 Tessalonicenses', chapters: 5, testament: 'new' },
  { id: '2thessalonians', name: '2 Tessalonicenses', chapters: 3, testament: 'new' },
  { id: '1timothy', name: '1 Timóteo', chapters: 6, testament: 'new' },
  { id: '2timothy', name: '2 Timóteo', chapters: 4, testament: 'new' },
  { id: 'titus', name: 'Tito', chapters: 3, testament: 'new' },
  { id: 'philemon', name: 'Filemom', chapters: 1, testament: 'new' },
  { id: 'hebrews', name: 'Hebreus', chapters: 13, testament: 'new' },
  { id: 'james', name: 'Tiago', chapters: 5, testament: 'new' },
  { id: '1peter', name: '1 Pedro', chapters: 5, testament: 'new' },
  { id: '2peter', name: '2 Pedro', chapters: 3, testament: 'new' },
  { id: '1john', name: '1 João', chapters: 5, testament: 'new' },
  { id: '2john', name: '2 João', chapters: 1, testament: 'new' },
  { id: '3john', name: '3 João', chapters: 1, testament: 'new' },
  { id: 'jude', name: 'Judas', chapters: 1, testament: 'new' },
  { id: 'revelation', name: 'Apocalipse', chapters: 22, testament: 'new' }
];

export default function BiblePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<'all' | 'old' | 'new'>('all');

  const filteredBooks = bibleBooks.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = selectedTestament === 'all' || book.testament === selectedTestament;
    return matchesSearch && matchesTestament;
  });

  const oldTestamentBooks = filteredBooks.filter(book => book.testament === 'old');
  const newTestamentBooks = filteredBooks.filter(book => book.testament === 'new');

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Bíblia Sagrada"
        onBack={() => navigate('/')}
        onFavorites={() => navigate('/favorites')}
      />

      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar livros da Bíblia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white shadow-gentle border-0 h-12"
          />
        </div>

        {/* Testament Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedTestament === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTestament('all')}
            className="whitespace-nowrap"
          >
            Todos os Livros
          </Button>
          <Button
            variant={selectedTestament === 'old' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTestament('old')}
            className="whitespace-nowrap"
          >
            Antigo Testamento
          </Button>
          <Button
            variant={selectedTestament === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTestament('new')}
            className="whitespace-nowrap"
          >
            Novo Testamento
          </Button>
        </div>

        {/* Construction Notice */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-gentle">
          <div className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Bíblia em Construção
            </h2>
            <p className="text-muted-foreground mb-4">
              Estamos trabalhando para disponibilizar todos os livros da Bíblia Católica. 
              Em breve você poderá ler e meditar sobre a Palavra de Deus diretamente no app.
            </p>
            <Button 
              variant="outline"
              onClick={() => navigate('/favorites')}
            >
              <Heart className="h-4 w-4 mr-2" />
              Ver Favoritos
            </Button>
          </div>
        </Card>

        {/* Antigo Testamento */}
        {(selectedTestament === 'all' || selectedTestament === 'old') && oldTestamentBooks.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Antigo Testamento ({oldTestamentBooks.length} livros)
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {oldTestamentBooks.map((book) => (
                <Card 
                  key={book.id}
                  className="bg-white shadow-gentle border-0 cursor-pointer hover:shadow-divine transition-all duration-300"
                  onClick={() => {
                    // Futura navegação para o livro
                    console.log(`Navegar para ${book.name}`);
                  }}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{book.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {book.chapters} {book.chapters === 1 ? 'capítulo' : 'capítulos'}
                      </p>
                    </div>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Novo Testamento */}
        {(selectedTestament === 'all' || selectedTestament === 'new') && newTestamentBooks.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Novo Testamento ({newTestamentBooks.length} livros)
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {newTestamentBooks.map((book) => (
                <Card 
                  key={book.id}
                  className="bg-white shadow-gentle border-0 cursor-pointer hover:shadow-divine transition-all duration-300"
                  onClick={() => {
                    // Futura navegação para o livro
                    console.log(`Navegar para ${book.name}`);
                  }}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{book.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {book.chapters} {book.chapters === 1 ? 'capítulo' : 'capítulos'}
                      </p>
                    </div>
                    <BookOpen className="h-5 w-5 text-golden-soft" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum livro encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente buscar por outros termos
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