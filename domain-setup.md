# Domain Configuration Guide for HalalChain Marketplace

## Domain Settings

The HalalChain Marketplace is configured to use the following domains:
- Primary domain: `halal-chain.com`
- Secondary domain: `www.halal-chain.com`

## DNS Configuration

### For Vercel Hosting

1. Log in to your domain registrar (e.g., GoDaddy, Namecheap, etc.)
2. Add the following DNS records:

#### For apex domain (halal-chain.com):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600 (or Auto)
```

### For Netlify Hosting (Alternative)

1. Log in to your domain registrar
2. Add the following DNS records:

#### For apex domain:
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600 (or Auto)
```

#### For www subdomain:
```
Type: CNAME
Name: www
Value: halal-chain-marketplace.netlify.app.
TTL: 3600 (or Auto)
```

## Vercel Configuration

1. Go to your Vercel dashboard
2. Select the HalalChain Marketplace project
3. Navigate to Settings > Domains
4. Add both domains:
   - `halal-chain.com`
   - `www.halal-chain.com`
5. Follow the verification steps provided by Vercel

## SSL Certificate

The SSL certificate will be automatically provisioned by Vercel or Netlify once the DNS records are properly configured and propagated.

## Troubleshooting

If you encounter issues with domain configuration:

1. **DNS Propagation**: Wait 24-48 hours for DNS changes to fully propagate
2. **Verification Issues**: Ensure you've followed all verification steps from your hosting provider
3. **SSL Certificate Problems**: Check if there are any specific requirements from your domain registrar
4. **Custom Domain Not Working**: Verify that the DNS records are correctly set up

## Domain Verification

For Let's Encrypt SSL certificate verification, we've included the `.well-known/acme-challenge/` directory in the public folder. This allows the certificate authority to verify domain ownership.

## Redirects

We've configured redirects to ensure:
- All traffic is directed to the primary domain (`halal-chain.com`)
- All traffic uses HTTPS
- Default hosting subdomains redirect to the primary domain