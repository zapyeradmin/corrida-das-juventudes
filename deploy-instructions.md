# 🚀 Instruções de Deploy - Corrida das Juventudes

## 📋 Pré-requisitos
- Conta na Hostinger com plano que suporte Node.js/HTML estático
- Acesso ao painel do Supabase
- Domínio configurado na Hostinger

## 🛠️ Passo a Passo do Deploy

### 1. **Build do Projeto**
```bash
npm run build
```
Isso gerará a pasta `dist/` com todos os arquivos otimizados.

### 2. **Configuração do Supabase para Produção**

**No painel do Supabase:**
1. Acesse: https://supabase.com/dashboard/project/crjvvwpycfhztzhiasib/auth/url-configuration
2. Configure as URLs:
   - **Site URL**: `https://seudominio.com` (substitua pelo seu domínio)
   - **Redirect URLs**: Adicione:
     - `https://seudominio.com/admin-dashboard`
     - `https://seudominio.com/admin-login`
     - `https://seudominio.com/`

### 3. **Upload para Hostinger**

**Via File Manager:**
1. Acesse o painel da Hostinger
2. Vá em File Manager
3. Navegue até a pasta `public_html/` (ou equivalente)
4. **Faça upload de TODOS os arquivos da pasta `dist/`**
5. Certifique-se que o arquivo `.htaccess` foi incluído

**Via FTP:**
1. Use cliente FTP (FileZilla, WinSCP, etc.)
2. Conecte-se ao servidor da Hostinger
3. Navegue até `public_html/`
4. Faça upload de todos os arquivos da pasta `dist/`

### 4. **Verificação das Funcionalidades**

Teste no seu domínio:

✅ **Página Principal** (`/`)
- Formulário de inscrição funcionando
- Validação de CPF
- Redirecionamento para Mercado Pago após sucesso

✅ **Login Admin** (`/admin-login`)
- Login com: admin1@corridajuventudes.com
- Redirecionamento para dashboard

✅ **Dashboard Admin** (`/admin-dashboard`)
- Visualização de inscrições
- Estatísticas em tempo real
- Funcionalidades de edição/exclusão

### 5. **Configurações Adicionais**

**SSL/HTTPS:**
- A Hostinger geralmente configura SSL automaticamente
- Verifique se o site está acessível via HTTPS

**Domínio:**
- Configure o domínio/subdomínio no painel da Hostinger
- Aguarde a propagação DNS (pode levar até 24h)

## 🔧 Troubleshooting

### Problema: Rotas não funcionam (404)
**Solução:** Verifique se o arquivo `.htaccess` foi carregado corretamente.

### Problema: Erro de CORS no Supabase
**Solução:** 
1. Adicione seu domínio nas configurações do Supabase
2. Verifique se está usando HTTPS

### Problema: Login admin não funciona
**Solução:**
1. Verifique se as redirect URLs estão configuradas no Supabase
2. Confirme que o domínio está correto

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no console do navegador (F12)
2. Verifique as configurações de URL no Supabase
3. Confirme que todos os arquivos foram carregados

## 🎯 URLs Importantes

- **Projeto Supabase**: https://supabase.com/dashboard/project/crjvvwpycfhztzhiasib
- **Configurações de Auth**: https://supabase.com/dashboard/project/crjvvwpycfhztzhiasib/auth/url-configuration
- **Tabela de Inscrições**: https://supabase.com/dashboard/project/crjvvwpycfhztzhiasib/editor

---

**✨ Após o deploy, seu site estará 100% funcional com todas as integrações mantidas!**