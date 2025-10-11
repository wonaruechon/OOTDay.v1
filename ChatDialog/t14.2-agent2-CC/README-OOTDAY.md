# OOTDay Agent - Outfit Recommendation System

## Overview
The `ootday2` agent provides personalized outfit recommendations from Central Online's product catalog. This agent acts as a professional fashion stylist, creating complete, shoppable outfits with direct product links.

## How It Works

### 1. Agent Configuration
- **Agent file**: `.claude/agents/ootday2.md`
- **Trigger**: When users ask for outfit recommendations or fashion advice
- **Model**: Claude Sonnet
- **Color**: Red

### 2. Product Inventory
The agent uses real product data from Central Online stored in JSON files:

```
products/
├── central-men-clothing.json      # Men's apparel inventory
├── central-women-dresses.json     # Women's apparel inventory
├── test_output.json               # Testing data
└── men_playwright.json            # Additional men's products
```

Each product includes:
- Product name (Thai language)
- Product description
- **Product link** (Central Online URL)
- Product size
- Product price (in THB)
- Product image

### 3. How to Use

#### As a User (Customer)
Simply indicate you're a customer looking for outfit recommendations:

```
"I'm a customer that wants outfit for [occasion]"
"I need outfit recommendations for [event]"
"What should I wear to [location/event]?"
```

#### Example Conversations

**Beach Trip:**
```
User: "I'm going to Hua Hin this weekend, what should I wear?"
Agent: Creates 1-3 complete beach outfits with:
- Breathable tops (polo shirts, t-shirts)
- Comfortable bottoms (shorts, light pants)
- Appropriate footwear (sandals)
- Accessories
- All with Central Online product URLs
```

**Team Outing:**
```
User: "I'm a customer that wants outfit for outing trip with team"
Agent: Provides smart-casual outfits suitable for team activities
```

### 4. What You Get

For each outfit recommendation, the agent provides:

1. **Outfit Title** (e.g., "Beach Chic for Hua Hin")
2. **Complete Item List**:
   - Item name and brand
   - Category (top/bottom/footwear/accessory)
   - Size recommendation
   - Price in THB
   - **Central Online product URL** ⭐
   - Reason why the item works
3. **Total Price**
4. **Style Rationale** (why this outfit works)
5. **Alternative Options** (swap suggestions with URLs)

### 5. Key Features

✅ **Real Product Links**: Every item includes a clickable Central Online URL
✅ **Complete Outfits**: Top, bottom, footwear minimum (accessories when relevant)
✅ **Budget Conscious**: Calculates total price for transparency
✅ **Style Rationale**: Explains why outfits work for the occasion
✅ **Alternatives**: Provides swap options for key pieces
✅ **Occasion-Appropriate**: Considers weather, location, and event type

### 6. Product URL Format

All product URLs follow this format:
```
https://www.central.co.th/th/[product-slug]-[product-id]
```

Example:
```
https://www.central.co.th/th/blue-men-s-slim-fit-stretch-piqu-polo-shirt-grmkppr000087261
```

### 7. Inventory Management

**Current Inventory:**
- Men's clothing: ~50+ items (shirts, polos, pants, jackets, etc.)
- Women's dresses: ~50+ items
- Brands: Lacoste, Polo Ralph Lauren, Calvin Klein, Fred Perry, Paul Smith, etc.

**To Update Inventory:**
The inventory files are managed by backend scrapers in the OOTDay project. To refresh:
1. Run the scraper scripts in `/Users/naruechon/Documents/Project/OOTDay/BEcode/`
2. Copy updated JSON files to `products/` directory

### 8. Troubleshooting

**Problem**: Agent doesn't include product URLs
**Solution**:
- Ensure product JSON files exist in `products/` directory
- Verify JSON files contain `product_link` field
- Agent is now configured to ALWAYS include URLs

**Problem**: Agent doesn't trigger automatically
**Solution**: Use clear customer language like "I'm a customer that wants outfit for..."

**Problem**: Limited product selection
**Solution**: Run the backend scrapers to refresh inventory with more products

### 9. Example Output Format

```markdown
## Outfit 1: Beach Casual for Hua Hin

**Items:**
1. **เสื้อโปโลผู้ชายลาคอสท์ สีน้ำเงิน** - Lacoste
   - Category: Top
   - Size: M
   - Price: ฿2,295
   - URL: https://www.central.co.th/th/blue-men-s-slim-fit-stretch-piqu-polo-shirt-grmkppr000087261
   - Why: Breathable stretch fabric perfect for beach weather

2. **Men Denim Shorts** - Evisu
   - Category: Bottom
   - Size: 32
   - Price: ฿9,775
   - URL: https://www.central.co.th/th/evisu-men-denim-shorts-playful-seagull...
   - Why: Comfortable and stylish for beach activities

**Total: ฿12,070**

**Why This Works:** Perfect balance of comfort and style for a beach trip...

**Alternative Option:**
Swap the polo for this เสื้อโปโลผู้ชายลาคอสท์ สีเหลือง (Price: ฿2,295, URL: https://...)
```

## Technical Details

### Agent Behavior
- Reads product JSON files from `products/` directory
- Filters products based on occasion, weather, and user preferences
- Ensures color coordination and style consistency
- Prioritizes complete outfits (never partial recommendations)
- Always includes product URLs for easy shopping

### Quality Control
Before recommending, the agent verifies:
- All product URLs are included ✅
- All products exist in inventory ✅
- Outfit is complete (top, bottom, shoes) ✅
- Colors and styles are cohesive ✅
- Occasion requirements are met ✅
- At least one alternative is provided ✅

## Future Enhancements
- [ ] Add more product categories (shoes, accessories, bags)
- [ ] Implement size-specific filtering
- [ ] Add price range filtering
- [ ] Support multiple languages
- [ ] Add outfit visualization/mockups
