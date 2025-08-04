import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Coffee, Gift, Copy, Check, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileHeader } from '@/components/ui/mobile-header';
import { useToast } from '@/hooks/use-toast';

export default function SupportPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copiedPix, setCopiedPix] = useState(false);

  const pixKey = 'lukascloud222@gmail.com';

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopiedPix(true);
      toast({
        title: "PIX copiado!",
        description: "A chave PIX foi copiada para sua área de transferência.",
      });
      setTimeout(() => setCopiedPix(false), 3000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a chave PIX. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Apoie o Projeto"
        onBack={() => navigate('/')}
      />

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-gentle">
          <div className="p-6 text-center">
            <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Ajude a Manter Este Projeto
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              O app "Orações Católicas" é mantido com amor e dedicação para fortalecer a fé de milhares de pessoas. 
              Sua doação nos ajuda a manter o projeto funcionando e sempre atualizado.
            </p>
          </div>
        </Card>

        {/* PIX Donation */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-6 w-6 text-golden-soft" />
              <h2 className="text-lg font-semibold text-foreground">Doe via PIX</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Sua contribuição, mesmo que pequena, faz toda a diferença para manter este projeto funcionando.
            </p>

            <div className="bg-soft-gray rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chave PIX:</p>
                  <p className="font-mono text-foreground font-medium">{pixKey}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPix}
                  className="ml-2"
                >
                  {copiedPix ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleCopyPix}
              className="w-full bg-golden-soft hover:bg-golden-soft/90 text-golden-soft-foreground"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Chave PIX
            </Button>
          </div>
        </Card>

        {/* Coffee Support */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Coffee className="h-6 w-6 text-amber-600" />
              <h2 className="text-lg font-semibold text-foreground">Nos Pague um Café</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Cada linha de código foi escrita com muito carinho. Um cafézinho nos motiva a continuar 
              desenvolvendo novas funcionalidades para enriquecer sua experiência espiritual.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-soft-gray rounded-lg">
                <Coffee className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium">R$ 5,00</p>
                <p className="text-xs text-muted-foreground">Cafezinho</p>
              </div>
              <div className="text-center p-3 bg-soft-gray rounded-lg">
                <Coffee className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium">R$ 15,00</p>
                <p className="text-xs text-muted-foreground">Café Premium</p>
              </div>
              <div className="text-center p-3 bg-soft-gray rounded-lg">
                <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-medium">R$ 30,00</p>
                <p className="text-xs text-muted-foreground">Com Amor</p>
              </div>
            </div>
          </div>
        </Card>

        {/* How We Use Donations */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Como Usamos Suas Doações
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Hospedagem e Infraestrutura</p>
                  <p className="text-sm text-muted-foreground">Manter o app sempre disponível para você</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Desenvolvimento de Novas Funcionalidades</p>
                  <p className="text-sm text-muted-foreground">Novos recursos e melhorias constantes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Conteúdo Espiritual</p>
                  <p className="text-sm text-muted-foreground">Novas orações, devocionais e recursos bíblicos</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Entre em Contato
            </h2>
            
            <p className="text-muted-foreground mb-4">
              Tem sugestões, problemas ou quer colaborar? Entre em contato conosco!
            </p>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(`mailto:${pixKey}`, '_blank')}
              >
                <Mail className="h-4 w-4 mr-3" />
                {pixKey}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  const message = "Olá! Estou usando o app Orações Católicas e gostaria de entrar em contato.";
                  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                WhatsApp
              </Button>
            </div>
          </div>
        </Card>

        {/* Gratitude */}
        <Card className="bg-gradient-to-br from-golden-soft/10 to-golden-soft/5 border-golden-soft/20 shadow-golden">
          <div className="p-6 text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Muito Obrigado!
            </h2>
            <p className="text-muted-foreground">
              Que Deus abençoe abundantemente sua vida e sua família. 
              Suas orações e contribuições são um presente para toda nossa comunidade.
            </p>
          </div>
        </Card>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}