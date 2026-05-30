# Quick Reference Guide: Updating Promotional Content

This website is designed with a **CMS-like structured data file** that makes it incredibly simple to update, add, or replace promotional content, featured destinations, and cruise lines. 

You do **not** need to touch any complex React page code. All content is managed in a single, clean file:
📍 `/client/src/const.ts`

---

## 1. How to Update Portfolio Specials (Deals)

To update the cruise specials displayed in the **Portfolio Specials** section, open `client/src/const.ts` and locate the `PROMOTIONS` array. 

Each promotion has this structure:

```typescript
{
  id: "princess",                    // Unique identifier (lowercase, no spaces)
  cruiseLine: "PRINCESS CRUISES",     // The name of the Cruise Line
  badge: "Up to 40% OFF",            // Top right badge highlighting the offer
  title: "The Premier Sea Escape",   // Captivating headline for the offer
  savings: "+ Up to $400...",        // Subheading detailing specific savings
  highlights: [                      // 3 bullet points showing value props
    "Premier Upgrade: Unlimited Drinks, Wi-Fi...",
    "Military Appreciation: Up to $250 Onboard Credit...",
    "Exclusive special rates for Solo Travelers"
  ],
  terms: "Select sailings & cabin categories...", // Small print terms
  actionText: "View Princess Sailings",           // CTA button text
  featured: true,                    // Set to true to show in the "Featured" tab
  priority: 1                        // Order of display (lower numbers show first)
}
```

Simply edit the text fields or copy-paste an existing block to add a new promotion!

---

## 2. How to Update Featured Destinations

To update the images, prices, or names of the destinations in the **Where Will You Sail Next?** section, locate the `DESTINATIONS` array in `client/src/const.ts`.

Each destination has this structure:

```typescript
{
  id: "mediterranean",               // Unique identifier
  name: "Mediterranean Fjord...",    // Name of the cruise destination
  region: "Southern Europe",         // Regional category badge
  startingPrice: "$579",             // Starting price
  duration: "7 Nights",              // Duration of the cruise
  image: "https://...",              // High-quality image URL (or local asset)
  featured: true                     // true = large card, false = smaller row card
}
```

---

## 3. Recommended Workflow for Deployment

Whenever you make changes to `client/src/const.ts`:

1. **Verify locally**: Check the preview in your workspace to ensure the formatting looks perfect.
2. **Create a Checkpoint**: Click **Save Checkpoint** in the Management UI.
3. **Deploy to Netlify**:
   * Build the project using `pnpm build`.
   * Upload the resulting `dist` folder to your Netlify site.
   * *Alternatively*, if you have connected your GitHub repository, simply push your changes to your main branch, and Netlify will build and deploy it automatically!
