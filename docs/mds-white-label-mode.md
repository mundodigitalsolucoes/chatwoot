# MDS White Label Mode

Este arquivo é o contrato operacional do fork usado pelo produto **Atendimento MDS**.

## Regra principal

O Chatwoot é dependência técnica interna. Nenhuma identificação visual, chamada de atualização, link de suporte ou ação administrativa do upstream deve ser exposta ao usuário final quando `MDS_WHITE_LABEL_MODE=true`.

Isso NÃO significa renomear classes, APIs, tabelas, webhooks, namespaces ou outras referências técnicas internas a Chatwoot. Essas referências são parte da dependência e devem permanecer intactas para reduzir regressões e facilitar upgrades.

## Flag

O modo MDS é controlado exclusivamente por:

```env
MDS_WHITE_LABEL_MODE=true
```

O layout Rails expõe a flag para o dashboard como `window.chatwootConfig.mdsWhiteLabelMode`. O frontend deve consumir a flag pelo helper `app/javascript/dashboard/helper/mdsWhiteLabel.js`.

## Feature registry

As customizações MDS devem ser centralizadas em `app/javascript/dashboard/helper/mdsWhiteLabelFeatures.js`.

Features homologadas/herdadas da v4.12.1:

- `HIDE_CAPTAIN_MENU`: oculta Captain da navegação.
- `HIDE_HELP_CENTER_MENU`: oculta Help Center/Portals da navegação.
- `HIDE_CAMPAIGNS_MENU`: oculta Campaigns da navegação.
- `HIDE_SETTINGS_MENU`: oculta Settings da navegação operacional.
- `HIDE_USER_MENU_ITEMS`: oculta suporte/documentação/changelog/logout do upstream, preservando preferências úteis ao operador e o logout oficial do CRM.
- `HIDE_PROFILE_SECURITY`: oculta Change Password e Access Token/API Token, sem alterar autenticação, API ou backend.
- `HIDE_CHATWOOT_LOGO`: oculta o logo do upstream na sidebar.

Features adicionadas na migração v4.17.0:

- `HIDE_UPDATE_BANNER`: impede o banner de atualização do upstream quando o modo MDS está ativo.
- `HIDE_CHATWOOT_METADATA`: impede metadata, favicons/manifest padrão e branding de bootstrap do upstream quando o modo MDS está ativo.

## Branding de bootstrap

Quando `MDS_WHITE_LABEL_MODE=true`:

- título do dashboard: `Atendimento MDS`;
- manifest/favicons padrão do upstream não devem ser renderizados pelo layout;
- o favicon `LOGO_THUMBNAIL` padrão do upstream não deve ser renderizado;
- o banner de nova versão do upstream nunca deve ser exibido;
- o carregamento inicial não deve apresentar logo, nome ou link do upstream.

A intenção é impedir inclusive exposições transitórias durante o carregamento do iframe.

## Escopo deliberadamente NÃO alterado

O modo MDS é uma camada de apresentação e permissão de frontend. Não alterar por causa do white-label:

- banco de dados;
- modelos Rails;
- APIs;
- webhooks;
- SSO;
- workers/Sidekiq;
- inbox lifecycle;
- mensagens;
- provider lifecycle;
- autenticação técnica;
- nomes internos como `ChatwootConversation`, `chatwootConfig`, URLs internas ou namespaces usados pela aplicação.

Eliminar referências técnicas internas apenas para esconder o nome Chatwoot aumenta muito o delta do fork e é proibido sem uma necessidade funcional comprovada.

# Política de atualização do fork

## Base permitida

Toda versão MDS deve nascer de uma TAG oficial exata do upstream.

Exemplo atual:

- upstream: `chatwoot/chatwoot@v4.17.0`;
- commit upstream: `b34f5b71a4d7f41fa87cf2b32260e2c887817e54`;
- branch MDS: `mds/v4.17.0-white-label`;
- imagem final prevista: `ghcr.io/mundodigitalsolucoes/chatwoot:v4.17.0-mds`.

## Proibido

- usar `develop` como base de produção;
- usar imagem `latest`;
- atualizar somente o container web e deixar Sidekiq em outra versão;
- editar código diretamente dentro do container;
- recriar banco, Redis ou volumes para realizar update de imagem;
- fazer upgrade sem imagem anterior conhecida para rollback;
- carregar hacks de versões antigas sem revisar compatibilidade com a nova tag.

## Procedimento obrigatório para cada nova versão

1. identificar a TAG oficial alvo;
2. registrar o commit exato da TAG;
3. criar `mds/vX.Y.Z-white-label` a partir desse commit, nunca de `develop`;
4. auditar o delta da versão MDS anterior;
5. portar somente as customizações MDS ainda necessárias;
6. revisar alterações upstream nos mesmos componentes antes de substituir arquivos;
7. garantir que o `MDS_WHITE_LABEL_MODE=false` continue preservando o comportamento upstream;
8. buildar uma imagem GHCR versionada `vX.Y.Z-mds`;
9. atualizar web e Sidekiq para a MESMA tag MDS;
10. validar Atendimento pelo CRM;
11. somente após homologação registrar a nova imagem como versão estável;
12. preservar a imagem estável anterior para rollback.

## Checklist mínimo de homologação

- iframe abre sem logo/nome Chatwoot durante bootstrap;
- nenhuma faixa de atualização do upstream aparece;
- Captain oculto;
- Help Center oculto;
- Campaigns oculto;
- Settings oculto para operador;
- documentação/changelog/suporte Chatwoot ocultos;
- logout interno oculto quando o CRM fornece o logout oficial;
- Profile Settings útil permanece acessível;
- Change Password e Access Token ocultos;
- tema claro/escuro funciona;
- conversas carregam;
- envio e recebimento funcionam;
- Evolution API funciona;
- Cloud API, se habilitada, funciona;
- Instagram, se habilitado, funciona;
- agentes/times/inboxes funcionam;
- webhook Atendimento -> CRM funciona;
- SSO/credenciais do iframe funcionam;
- Sidekiq processa jobs;
- não há erro relevante no console/logs.

## Rollback

Enquanto `v4.17.0-mds` não estiver homologada, a versão estável é:

```text
ghcr.io/mundodigitalsolucoes/chatwoot:v4.12.1-mds
```

Rollback operacional:

1. restaurar a imagem estável anterior no serviço web;
2. restaurar a mesma imagem no Sidekiq;
3. redeploy sem apagar volumes ou banco;
4. validar login/iframe, conversas, webhook e envio/recebimento.

## Regra de manutenção

O objetivo permanente é manter o menor delta possível em relação ao upstream. Toda customização nova deve preferir feature flag + helper central e alteração localizada. Refactors cosméticos, renomeações internas e remoção de código upstream são evitados.
