# Modificações

Registro simples das alterações editoriais/comerciais do site.

1. 2026-05-25 - Contato real da Vertical Cor
   - Adicionar endereço completo: Rua Paulo Cesar Lira, 106 - Alecrim, Vila Velha - ES, 29118-115, Brasil.
   - Adicionar ponto de referência: Atrás do Supermercado Economia.
   - Trocar todos os telefones fictícios pelo telefone real: (27) 99935-1626.
   - Fazer botões e telefone abrirem o WhatsApp com mensagem do site: "Olá, vim do site da VERTICAL COR e quero mais informações."
   - Fazer o formulário do rodapé enviar os dados preenchidos para o WhatsApp.
   - Trocar o mapa por link direto do Google Maps com o endereço real, sem depender de API externa no navegador.

2. 2026-05-25 - Organização das pendências
   - Separar pendências internas do projeto em `PENDENCIAS.md`.
   - Criar `PENDENCIAS-PEDRO.md` para o que precisa ser pedido ou confirmado com o cliente.
   - Registrar decisões atuais: manter imagem principal por enquanto, manter vídeo aprovado e manter mapa como link direto.

3. 2026-05-25 - Rodapé e páginas legais mínimas
   - Atualizar ano do rodapé para 2026.
   - Criar página mínima de Política de Privacidade.
   - Criar página mínima de Termos de Uso.
   - Linkar as duas páginas no rodapé.

4. 2026-05-25 - Documento executivo do projeto
   - Criar `DOCUMENTO-EXECUTIVO-SITE-VERTICAL-COR.md`.
   - Explicar, em linguagem leiga, as etapas e bastidores envolvidos na criação do site.
   - Registrar pontos de valor: estrutura, contato, localização, confiança, SEO, publicação e melhorias futuras.

5. 2026-05-25 - Preparação do documento executivo para PDF
   - Adicionar a ideia do site como extensão poderosa do cartão de visitas.
   - Reformatar o documento com capa, seções numeradas e quebras de página sugeridas.
   - Adicionar assinatura/rodapé: Fabio Pantoja - Consultor de IA para Empresas.
   - Criar versão HTML imprimível do documento para facilitar a conversão em PDF.

6. 2026-05-25 - Imagens reais no slider Antes/Depois
   - Substituição das imagens ilustrativas externas do Unsplash pelas imagens WebP reais fornecidas pelo cliente (`antes.webp` e `depois.webp`) no `BeforeAfterSlider`.
   - Atualização da legenda para "Antes e Depois real de pintura executada pela Vertical Cor".
   - Correção de layout: Adicionado `max-w-4xl mx-auto` ao container de borda externa do slider no `App.tsx` para eliminar as colunas vazias laterais detectadas no print do usuário.
   - Correção visual nos selos do Slider: Implementada opacidade dinâmica com transição suave nos selos "ANTES" e "DEPOIS" em `BeforeAfterSlider.tsx`, fazendo-os desaparecer progressivamente quando a barra de arrastar atinge as extremidades (evitando que o selo "DEPOIS" fique visível quando 100% do "ANTES" está em exibição).

