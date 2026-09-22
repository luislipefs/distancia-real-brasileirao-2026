# Distância Real — Brasileirão 2026

Visualização interativa da classificação do Campeonato Brasileiro Série A 2026. Cada ponto ocupa uma linha vertical, preservando os espaços entre os clubes e mantendo empates na mesma altura.

## Site

[Abrir o site publicado](https://luislipefs.github.io/distancia-real-brasileirao-2026/)

Os dados são atualizados automaticamente a cada hora pelo GitHub Actions. O site mantém o último dado válido caso a fonte esteja temporariamente indisponível.

## Fontes

- [ESPN Brasil — classificação](https://www.espn.com.br/futebol/classificacao/_/liga/bra.1)
- [CBF — tabela do Campeonato Brasileiro](https://www.cbf.com.br/futebol-brasileiro/tabelas/campeonato-brasileiro/serie-a)
- [ge — Brasileirão Série A](https://ge.globo.com/futebol/brasileirao-serie-a/)

A classificação automática é coletada da ESPN. CBF e ge ficam disponíveis como referências públicas da competição.

## Recursos

- escala vertical fixa de 48 px por ponto;
- linhas vazias preservadas entre clubes;
- empates na mesma altura, com a posição de desempate visível;
- escudos dos clubes, modo claro e escuro e versões em cinco idiomas;
- tabela tradicional opcional;
- seleção de clube e comparação de pontos;
- regras visuais do campeonato com configuração administrativa separada;
- acessibilidade, layout responsivo e fallback para o último dado válido.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm install
npm test
npm run build
npm run preview
```

`npm run update` consulta a classificação pública e grava os arquivos em `data/`. Nenhuma credencial é necessária. Segredos locais, chaves e certificados são ignorados pelo Git e nunca devem ser adicionados ao repositório.

## Estrutura

- `src/`: interface, componentes e regras da visualização;
- `scripts/update-standings.mjs`: atualização automática dos dados;
- `data/`: última classificação válida e estado da coleta;
- `.github/workflows/site.yml`: testes, atualização horária e publicação;
- `tests/`: testes de escala, empates, zonas e normalização.

Projeto independente, sem afiliação à CBF, ESPN, ge ou aos clubes.

