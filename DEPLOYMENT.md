# 🎉 Valentine's Day Website - Deployment Guide

## ✅ What Was Done

### 1. **Force Desktop View on Mobile**
- Updated viewport meta tag to `width=1024` instead of `width=device-width`
- Added `min-width: 1024px` to body and html elements
- This ensures the website displays in desktop mode on all mobile devices

### 2. **Fixed Image Loading Issues**
- Removed `lazy loading` attribute from images
- Images now load immediately on page load
- Better compatibility with mobile browsers

## 📱 How It Works on Mobile

When someone opens the website on their phone:
1. The browser will render the page as if it's viewing a 1024px wide desktop screen
2. User can pinch to zoom in/out (min-scale: 0.1, max-scale: 5.0)
3. User can scroll left/right if needed
4. All images will load immediately
5. Desktop layout and effects are preserved

## 🚀 Deployment Options

### Option 1: GitHub Pages (Simplest)
**URL**: `https://stephane-merci.github.io/Dani/`

**Steps**:
1. Go to: https://github.com/Stephane-Merci/Dani
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `master`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes
6. Your site will be live at: `https://stephane-merci.github.io/Dani/`

### Option 2: Vercel (Recommended - Faster & Better)
**URL**: `https://dani.vercel.app` (or custom domain)

**Steps**:
1. Go to: https://vercel.com
2. Sign up with GitHub (1 click)
3. Click **"Add New..."** → **"Project"**
4. Import your **"Dani"** repository
5. Click **"Deploy"** (no configuration needed!)
6. Done! Your site will be live in 30-60 seconds

**Why Vercel is Better**:
- ⚡ Faster deployment (30 seconds vs 2-5 minutes)
- 📊 Built-in analytics (see when Dani visits!)
- 🔒 Automatic HTTPS
- 🌍 Faster global CDN
- 🔄 Auto-deploys when you push to GitHub

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to your project → **Settings** → **Domains**
2. Add your domain: `danid.com` or `www.danid.com`
3. Add these DNS records at your domain registrar:

**For apex domain (`danid.com`):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (`www.danid.com`):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For GitHub Pages:
1. Add DNS record at your domain registrar:

**For apex domain:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: stephane-merci.github.io
```

2. In GitHub Pages settings, add custom domain: `www.danid.com`
3. Enable "Enforce HTTPS"

## 📝 What's Changed

### Files Modified:
1. **index.html**
   - Changed viewport to force desktop rendering

2. **style.css**
   - Added `min-width: 1024px` to body and html
   - Ensures desktop layout on all devices

3. **script.js**
   - Removed lazy loading from images
   - Images load immediately for better mobile compatibility

## 🔄 Future Updates

To update the website:
1. Make changes locally
2. Commit: `git add . && git commit -m "your message"`
3. Push: `git push https://github.com/Stephane-Merci/Dani.git master`
4. Your deployment will auto-update! (Vercel: 30 sec, GitHub Pages: 1-2 min)

## ✨ Features Summary

- 💝 Valentine's popup with shy "No" button
- 🌹 3 switchable romantic messages
- 📸 14 beautiful photos in interactive gallery
- 💕 Floating hearts animation
- ✨ Sparkle cursor effects
- 🖼️ Lightbox for full-screen photo viewing
- 📱 Desktop view forced on mobile devices
- 🎨 Smooth animations and transitions

## 💕 Final Notes

The website is now optimized to display perfectly on:
- ✅ Desktop computers
- ✅ Mobile phones (in desktop view mode)
- ✅ Tablets
- ✅ All modern browsers

**Direct Links**:
- GitHub Repo: https://github.com/Stephane-Merci/Dani
- GitHub Pages: https://stephane-merci.github.io/Dani/ (once deployed)

Happy Valentine's Day! 💖
