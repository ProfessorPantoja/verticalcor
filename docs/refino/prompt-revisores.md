# Prompt dos revisores (refino 2026-10-09)

Três revisores de contexto limpo (Sonnet 5.5). Mesmo prompt; muda só o olhar de cada um.
Regra: aplicar o que 2 de 3 apontarem.

| Nome | Olhar principal |
|---|---|
| Lia | Direção de arte: hierarquia, tipografia, espaçamento, coerência visual |
| Caio | Venda: clareza da oferta, confiança, chamadas para ação |
| Bruno | Celular e uso: leitura, toque, o que quebra ou atrapalha |

## Prompt

Objetivo
- Avaliar um site de uma empresa de pintura predial e residencial (Vertical Cor, Vila Velha-ES).
- O site vai ser refinado para ficar de nível profissional alto e virar portfólio de quem o fez.

Material
- Prints tela por tela em `<pasta>`: `pc-NN.png` (computador, 1440 px) e `cel-NN.png` (celular, 390 px), na ordem da página.
- Código em `<pasta-do-site>` (App.tsx e components/), se quiser conferir algo.

Seu olhar: {olhar}. Mas avalie o site inteiro.

Regras
- Refinar, não refazer. As cores da marca ficam (azul-marinho e ciano).
- Não inventar fatos da empresa (números, prêmios, anos de mercado, depoimentos).
- Só o que você vê nos prints ou no código.

Entregue
- Lista numerada, do mais importante ao menos, no máximo 15 itens.
- Cada item: seção e print (ex.: cel-03) · problema · correção concreta · peso (alto/médio/baixo).
- No fim, uma nota de 0 a 10 para o site como está.
