# Site Vertical Cor (cliente Pedro)

## Como mexer e publicar (decidido pelo Fábio em 2026-10-15)
- **`main` = site no ar.** A Vercel está ligada ao GitHub: todo push no `main` publica `www.verticalcor.com.br` na hora (em ~10 s). Não existe `vercel --prod` aqui.
- **`refino` = área de trabalho fixa.** Toda alteração vai no `refino`. Cada push no `refino` gera sozinho um **link de prévia** na Vercel (ver com `npx vercel ls verticalcor`), sem mexer no site no ar.
- **Fluxo:** alterar no `refino` → push → mandar o link da prévia ao Fábio → ele aprova → juntar ao `main` (`git merge --ff-only refino` no `main`) → push → conferir no ar.
- **Não juntar nem fazer push no `main` sem o Fábio aprovar**, nem só de documento (publica o site de novo).
- Conferir no ar em `https://www.verticalcor.com.br` (o endereço sem `www` redireciona).
- Voltar atrás: `npx vercel rollback` (volta a publicação anterior) ou `git revert <commit>` no `refino` e juntar de novo.

## Regras
- Copy só muda com o Fábio.
- Onde paramos e pendências: `docs/backlog.html`.
