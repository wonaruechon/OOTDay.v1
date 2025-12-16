# Knowledge Upload & RAG Integration

Complete system for uploading, managing, and using knowledge documents with the RAG (Retrieval-Augmented Generation) system in the OOTDay Fashion Assistant.

## Overview

This feature enables dynamic knowledge base management through a user-friendly interface. Users can upload markdown documents that are automatically indexed and used by the AI assistant to provide more accurate and context-aware fashion recommendations.

## Architecture

```
┌─────────────────┐
│  User Interface │
│ KnowledgeManager│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   API Routes    │
│ /api/knowledge/ │
│  - upload       │
│  - list         │
│  - reload       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Upload Service │
│knowledge-uploader│
└────────┬────────┘
         │
         ↓
┌─────────────────┐     ┌──────────────┐
│ Knowledge Base  │────→│ RAG System   │
│ /knowledge/     │     │ (retrieval.ts)│
└─────────────────┘     └──────────────┘
         │
         ↓
┌─────────────────┐
│  Chat Assistant │
│ chat-orchestrator│
└─────────────────┘
```

## Components

### 1. Knowledge Manager (`components/chat/KnowledgeManager.tsx`)

Complete UI for managing knowledge documents with three tabs:

- **Upload**: Drag-and-drop interface for uploading new documents
- **Files**: List of all uploaded documents with metadata
- **Statistics**: Knowledge base statistics and category breakdown

**Features:**
- Multi-file upload with drag-and-drop
- Real-time upload progress
- Category organization (fashion, occasions, brand, custom)
- Knowledge base reload trigger
- File validation (max 5MB, .md/.txt only)

### 2. Knowledge Uploader (`components/chat/KnowledgeUploader.tsx`)

Standalone upload component for integration into any interface.

**Props:**
```typescript
interface KnowledgeUploaderProps {
  onUploadComplete?: () => void;
}
```

### 3. Upload Service (`lib/knowledge-uploader.ts`)

Backend service handling file validation, sanitization, and storage.

**Key Functions:**
```typescript
// Validate uploaded file
validateKnowledgeFile(file: UploadedFile): ValidationResult

// Save document to disk
saveKnowledgeDocument(file: UploadedFile): Promise<UploadResult>

// Upload and index multiple documents
uploadAndIndex(files: UploadedFile[]): Promise<UploadIndexResult>

// Trigger knowledge base reload
reloadKnowledgeBase(): Promise<ReloadResult>
```

### 4. API Routes

#### POST `/api/knowledge/upload`
Upload one or more knowledge documents.

**Request:**
```typescript
FormData {
  files: File[],
  category: 'fashion' | 'occasions' | 'brand' | 'custom'
}
```

**Response:**
```typescript
{
  success: boolean,
  message: string,
  uploadResults: UploadResult[],
  reloadResult: ReloadResult,
  stats: {
    total: number,
    success: number,
    failed: number
  }
}
```

#### GET `/api/knowledge/list`
List all knowledge documents.

**Response:**
```typescript
{
  success: boolean,
  files: KnowledgeFile[],
  byCategory: Record<string, KnowledgeFile[]>,
  stats: {
    total: number,
    byCategory: Record<string, number>
  }
}
```

#### POST `/api/knowledge/reload`
Reload knowledge base and return statistics.

**Response:**
```typescript
{
  success: boolean,
  message: string,
  stats: {
    totalDocuments: number,
    totalChunks: number,
    totalEmbeddings: number,
    lastUpdated: Date,
    documentsByCategory: Record<string, number>
  }
}
```

## File Structure

```
v0-ootd-ay-ai-fashion-assistant/
├── app/
│   └── api/
│       └── knowledge/
│           ├── upload/
│           │   └── route.ts          # Upload endpoint
│           ├── list/
│           │   └── route.ts          # List endpoint
│           └── reload/
│               └── route.ts          # Reload endpoint
├── components/
│   └── chat/
│       ├── KnowledgeManager.tsx      # Complete management UI
│       └── KnowledgeUploader.tsx     # Upload component
├── lib/
│   ├── knowledge-uploader.ts         # Upload service
│   ├── chat-orchestrator.ts          # RAG integration
│   └── rag/
│       ├── knowledge-base.ts         # Knowledge base management
│       ├── retrieval.ts              # RAG retrieval logic
│       └── vector-search.ts          # Vector search
├── config/
│   └── rag-config.ts                 # RAG configuration
├── knowledge/                        # Knowledge storage
│   ├── fashion/
│   ├── occasions/
│   ├── brand/
│   └── custom/
└── KNOWLEDGE_UPLOAD_EXAMPLE.tsx      # Integration examples
```

## Usage

### Basic Integration

```tsx
import { KnowledgeManager } from '@/components/chat/KnowledgeManager';

export function MyPage() {
  return (
    <div className="container">
      <KnowledgeManager />
    </div>
  );
}
```

### Modal Integration

```tsx
import { useState } from 'react';
import { KnowledgeManager } from '@/components/chat/KnowledgeManager';

export function ChatPage() {
  const [showKnowledge, setShowKnowledge] = useState(false);

  return (
    <>
      <button onClick={() => setShowKnowledge(true)}>
        Manage Knowledge
      </button>

      {showKnowledge && (
        <div className="modal">
          <KnowledgeManager />
        </div>
      )}
    </>
  );
}
```

See `KNOWLEDGE_UPLOAD_EXAMPLE.tsx` for 5 complete integration patterns.

## Knowledge Document Format

Documents should be in Markdown format with frontmatter:

```markdown
---
title: Summer Fashion Trends 2025
category: fashion
importance: high
last_updated: 2025-01-15
---

## Section 1: Light Colors

Light and pastel colors are trending this summer...

## Section 2: Breathable Fabrics

Cotton and linen are essential for hot weather...
```

**Frontmatter Fields:**
- `title`: Document title (required)
- `category`: fashion, occasions, brand, or custom (required)
- `importance`: high, medium, or low (optional)
- `last_updated`: ISO date string (optional)

If frontmatter is missing, it will be automatically generated during upload.

## RAG System Integration

### How It Works

1. **Upload**: User uploads markdown documents via UI
2. **Storage**: Documents saved to `/knowledge/{category}/` directory
3. **Parsing**: Documents parsed into chunks (200-500 tokens)
4. **Embedding**: OpenAI embeddings generated for each chunk
5. **Indexing**: Chunks stored in memory with vector embeddings
6. **Retrieval**: When user asks question:
   - Query embedded using same model
   - Vector search finds most relevant chunks (top-K)
   - Retrieved context injected into LLM prompt
7. **Response**: LLM generates answer using retrieved knowledge

### Configuration

Edit `config/rag-config.ts`:

```typescript
export const defaultRAGConfig: RAGConfig = {
  enabled: true,
  embedding: {
    provider: 'openai',
    modelName: 'text-embedding-3-small',
    dimension: 1536,
    batchSize: 10
  },
  retrieval: {
    topK: 5,                      // Number of chunks to retrieve
    similarityThreshold: 0.7,     // Minimum similarity score
    rerank: false
  },
  chunking: {
    minChunkSize: 200,
    maxChunkSize: 500,
    overlapSize: 50
  }
};
```

### Environment Variables

Required in `.env.local`:

```bash
# OpenAI API Key (for embeddings)
OPENAI_API_KEY=sk-...

# Optional: Enable RAG system
RAG_ENABLED=true

# Optional: Retrieval parameters
RAG_RETRIEVAL_TOP_K=5
RAG_SIMILARITY_THRESHOLD=0.7
```

## Testing the System

### 1. Upload Test Document

Create `test-fashion.md`:

```markdown
---
title: Test Fashion Knowledge
category: fashion
importance: high
---

## Color Matching

Blue pairs well with white and beige for a classic look.
Red works great with black for evening events.
```

### 2. Upload via UI

1. Open Knowledge Manager
2. Select "Fashion" category
3. Drag and drop `test-fashion.md`
4. Click "Upload"
5. Wait for success message
6. Click "Reload Knowledge Base"

### 3. Test in Chat

Ask the assistant:
> "What colors go well with blue?"

The RAG system should retrieve the knowledge and answer:
> "Blue pairs well with white and beige for a classic look!"

### 4. Verify via API

```bash
# List uploaded files
curl http://localhost:3000/api/knowledge/list

# Check stats
curl -X POST http://localhost:3000/api/knowledge/reload
```

## File Validation & Security

### Validation Rules

- **File Size**: Maximum 5MB per file
- **File Type**: Only `.md`, `.txt`, `.markdown` extensions
- **MIME Types**: `text/markdown`, `text/plain`, `application/octet-stream`
- **Filename**: Max 255 characters, no special characters
- **Content**: Must be valid UTF-8 text

### Security Features

- Filename sanitization (removes path components)
- Character filtering (prevents directory traversal)
- Timestamp-based unique filenames (prevents collisions)
- Category-based directory isolation
- Size limits prevent DoS attacks
- Server-side validation (client-side checks are supplementary)

## Performance Considerations

### Upload Performance

- **Chunk Size**: 200-500 tokens balances precision vs. speed
- **Batch Embedding**: Process 10 chunks at a time
- **Async Processing**: Upload and indexing in background
- **Cache**: LRU cache for query embeddings (100 entries)

### Retrieval Performance

- **Timeout**: Max 200ms for retrieval (configurable)
- **Parallel**: Enabled by default
- **Top-K**: Return 5 most relevant chunks
- **Threshold**: 0.7 similarity minimum (adjustable)

### Scaling

For large knowledge bases (1000+ documents):

1. **Increase Cache Size**:
   ```typescript
   cache: { maxSize: 500 }
   ```

2. **Adjust Chunk Sizes**:
   ```typescript
   chunking: { maxChunkSize: 300 }
   ```

3. **Use Vector Database**: Replace in-memory storage with Pinecone/Weaviate

4. **Enable Re-ranking**:
   ```typescript
   retrieval: { rerank: true }
   ```

## Troubleshooting

### Upload Fails

**Problem**: Files not uploading
**Solutions**:
- Check file size (< 5MB)
- Verify file extension (.md or .txt)
- Check API route accessibility
- Verify write permissions on `/knowledge` directory

### Knowledge Not Used in Chat

**Problem**: AI doesn't use uploaded knowledge
**Solutions**:
1. Click "Reload Knowledge Base" after upload
2. Check RAG is enabled (`RAG_ENABLED=true`)
3. Verify `OPENAI_API_KEY` is set
4. Check console for embedding errors
5. Test with specific queries that match document content

### Embeddings Generation Fails

**Problem**: "Failed to generate embeddings"
**Solutions**:
- Verify `OPENAI_API_KEY` is valid
- Check OpenAI API quota/limits
- Ensure internet connection
- Check document content is valid UTF-8

### Slow Performance

**Problem**: Uploads or searches are slow
**Solutions**:
- Reduce `topK` value (e.g., 3 instead of 5)
- Increase `similarityThreshold` (e.g., 0.8)
- Enable parallel processing
- Reduce chunk overlap

## API Integration Examples

### Upload from External System

```typescript
const formData = new FormData();
formData.append('files', file);
formData.append('category', 'fashion');

const response = await fetch('/api/knowledge/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

### Programmatic Upload

```typescript
import { uploadAndIndex } from '@/lib/knowledge-uploader';

const files = [{
  filename: 'new-document.md',
  content: '# Fashion Tips\n\nContent here...',
  category: 'fashion',
  size: 1024,
  mimeType: 'text/markdown'
}];

const result = await uploadAndIndex(files);
```

## Future Enhancements

Potential improvements for the system:

1. **Document Editing**: Edit uploaded documents in-place
2. **Version Control**: Track document versions and changes
3. **Bulk Operations**: Delete/update multiple files
4. **Search**: Full-text search within documents
5. **Preview**: Preview document content before upload
6. **Metadata Tags**: Custom tags for better organization
7. **Access Control**: Role-based permissions for uploads
8. **Analytics**: Track which documents are most used
9. **Export**: Download entire knowledge base
10. **Import**: Bulk import from ZIP files

## Support

For issues or questions:
- Check the troubleshooting section
- Review example integrations in `KNOWLEDGE_UPLOAD_EXAMPLE.tsx`
- Verify RAG configuration in `config/rag-config.ts`
- Check API route logs for errors
- Test with minimal example first

## License

Part of the OOTDay Fashion Assistant platform.
