# Quick Start: Knowledge Upload System

Get the knowledge upload system running in 5 minutes.

## Prerequisites

- Next.js project running
- OpenAI API key for embeddings
- Node.js 18+ installed

## Step 1: Environment Setup

Add to `.env.local`:

```bash
OPENAI_API_KEY=sk-...
RAG_ENABLED=true
```

## Step 2: Create Test Page

Create `app/knowledge/page.tsx`:

```tsx
import { KnowledgeManagerPage } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';

export default KnowledgeManagerPage;
```

## Step 3: Start Development Server

```bash
pnpm dev
```

## Step 4: Access Knowledge Manager

Open browser:
```
http://localhost:3000/knowledge
```

## Step 5: Upload Test Document

Create `fashion-tips.md`:

```markdown
---
title: Fashion Tips for Beginners
category: fashion
importance: high
---

## Basic Color Matching

- **Blue & White**: Classic combination for any occasion
- **Black & Red**: Perfect for evening events
- **Beige & Brown**: Natural, earthy look
- **Navy & Gray**: Professional and elegant

## Essential Wardrobe Items

1. White button-down shirt
2. Dark jeans
3. Black blazer
4. Comfortable sneakers
5. Classic watch
```

## Step 6: Upload Process

1. Go to http://localhost:3000/knowledge
2. Select "Fashion" category
3. Drag and drop `fashion-tips.md`
4. Click "Upload 1 File(s)"
5. Wait for success message
6. Click "Reload Knowledge Base"
7. Check Statistics tab

## Step 7: Test RAG Integration

### Option A: Via Chat Interface

If you have a chat interface, ask:

```
"What colors go well with blue?"
```

Expected response should include:
```
"Blue pairs well with white for a classic combination..."
```

### Option B: Via API Test

```bash
# Test retrieval directly
curl -X POST http://localhost:3000/api/knowledge/reload
```

## Verify It's Working

### Check 1: Files Uploaded

Go to "Files" tab, should see:
- `fashion-tips-{timestamp}.md`
- Category: fashion
- Size: ~500 bytes

### Check 2: Statistics

Go to "Statistics" tab, should show:
- Documents: 1 (or more if you had existing)
- Chunks: ~6-10 (depends on content)
- Embeddings: Same as chunks

### Check 3: RAG Retrieval

Test with specific query about uploaded content:

```typescript
// In your chat component
const query = "What are essential wardrobe items?";
// Should retrieve chunks from uploaded document
```

## Common Issues

### Upload Button Disabled
**Cause**: No files selected
**Fix**: Drag files or click "Select Files"

### Upload Fails
**Cause**: File too large or wrong type
**Fix**: Use .md or .txt files under 5MB

### Knowledge Not Used
**Cause**: Forgot to reload
**Fix**: Click "Reload Knowledge Base" after upload

### Embeddings Error
**Cause**: Missing or invalid OPENAI_API_KEY
**Fix**: Check `.env.local` has valid key

## File Locations

After upload, files are stored in:
```
knowledge/
├── fashion/fashion-tips-{timestamp}.md
├── occasions/
├── brand/
└── custom/
```

## API Endpoints

Test API directly:

```bash
# Upload
curl -X POST http://localhost:3000/api/knowledge/upload \
  -F "files=@fashion-tips.md" \
  -F "category=fashion"

# List
curl http://localhost:3000/api/knowledge/list

# Reload
curl -X POST http://localhost:3000/api/knowledge/reload
```

## Integration Options

Choose your preferred layout:

### 1. Standalone Page (Easiest)
```tsx
import { KnowledgeManagerPage } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';
export default KnowledgeManagerPage;
```

### 2. Modal (Most Flexible)
```tsx
import { ChatWithKnowledgeModal } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';
export default ChatWithKnowledgeModal;
```

### 3. Split View (Best for Desktop)
```tsx
import { SplitViewChatAndKnowledge } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';
export default SplitViewChatAndKnowledge;
```

### 4. Tabbed (Mobile Friendly)
```tsx
import { TabbedChatAndKnowledge } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';
export default TabbedChatAndKnowledge;
```

### 5. Floating Button (Minimal)
```tsx
import { ChatWithFloatingKnowledge } from '@/KNOWLEDGE_UPLOAD_EXAMPLE';
export default ChatWithFloatingKnowledge;
```

## What Documents to Upload

Good candidates for knowledge documents:

### Fashion Knowledge
- Color matching guides
- Style trends
- Seasonal fashion tips
- Body type recommendations
- Occasion-specific advice

### Brand Guidelines
- Voice and tone
- Prohibited topics
- Response templates
- Brand values
- Communication style

### Product Information
- Product catalogs
- Size guides
- Material information
- Care instructions
- Brand descriptions

### Occasion Guides
- Wedding attire
- Business casual
- Party outfits
- Sports wear
- Travel fashion

## Document Format Tips

### Good Example
```markdown
---
title: Business Casual Guide
category: occasions
importance: high
---

## Men's Business Casual

### Tops
- Collared shirts (polo or button-down)
- Sweaters or cardigans
- Smart casual blazers

### Bottoms
- Chinos or dress pants
- Dark jeans (some workplaces)
- Avoid shorts
```

### What to Avoid
- Very long documents (split into multiple files)
- Binary files (images, PDFs) - convert to markdown
- Duplicate content
- Outdated information
- Overly technical jargon

## Performance Tips

### For Large Knowledge Bases

If uploading 10+ documents:

1. **Increase Chunk Size**
   ```typescript
   // config/rag-config.ts
   chunking: { maxChunkSize: 300 }
   ```

2. **Adjust Top-K**
   ```typescript
   retrieval: { topK: 3 }
   ```

3. **Enable Cache**
   ```typescript
   cache: { enabled: true, maxSize: 200 }
   ```

### For Better Retrieval

1. **Use Clear Headings**: Helps chunking
2. **Add Examples**: Improves matching
3. **Include Keywords**: Better vector search
4. **Categorize Properly**: Easier management

## Next Steps

1. ✅ Upload test document
2. ✅ Verify in Files tab
3. ✅ Check Statistics
4. ✅ Reload knowledge base
5. ⬜ Test in chat interface
6. ⬜ Upload more documents
7. ⬜ Customize categories
8. ⬜ Adjust RAG settings

## Need Help?

- **Full Documentation**: `KNOWLEDGE_UPLOAD_README.md`
- **Integration Examples**: `KNOWLEDGE_UPLOAD_EXAMPLE.tsx`
- **Implementation Details**: `KNOWLEDGE_UPLOAD_INTEGRATION_SUMMARY.md`
- **RAG Configuration**: `config/rag-config.ts`

## Success Checklist

- [ ] Environment variables set
- [ ] Development server running
- [ ] Knowledge page accessible
- [ ] Test document created
- [ ] Upload successful
- [ ] Knowledge base reloaded
- [ ] Statistics showing data
- [ ] Chat uses uploaded knowledge

## Congratulations!

Your knowledge upload system is now operational. The AI assistant can now learn from any documents you upload!

Upload more documents to improve the AI's knowledge and accuracy.
