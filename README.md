# onetemplate
A multi-purpose, adjustable, light-weight HTML/CSS template for web development.
Built with CSS Grid and custom rules for responsiveness; no bulky, major responsive framework is used.
Utilizes node, npm, webpack and gulp for repeated tasks and build cycle.
Written in ES2015+ and LESS for CSS preprocessing.

## Installation & Build
- Clone this repository
- run `npm install`
- run `gulp watch-dev` for development
- run `gulp build-prod` to create the distribution

- Generate favicons: https://www.favicon-generator.org/
- If Google APIs and Services are used, obtain keys: https://console.cloud.google.com/home/dashboard
- Integrate it to a Content Management System

## Deployment
- Update the domain name servers at your domain registrar
- Upload to a web server
- Enable SSL/TLS
- Comply to EU Cookie law: http://www.cookiechoices.org/ or https://cookiepolicygenerator.com/
- Speed evaluation and optimization guide: https://gtmetrix.com/ or https://www.pingdom.com/product/page-speed/

## SEO
- Google Analytics: https://analytics.google.com/
- Google Search Console: https://search.google.com/search-console
- Fill out the meta tags in the index.html
- Include microdata: https://schema.org/
- Generate a sitemap.xml: https://www.xml-sitemaps.com/
- Use dns prefetch to resolve multiple domains like `<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">` and `<link rel="dns-prefetch" href="https://maps.google.com">`

## Optional
- Create a Progressive Web App (PWA) for users to be able to add site to their Home Screen: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#0
- Visitor location detection: https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095
- Mobile detection: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
