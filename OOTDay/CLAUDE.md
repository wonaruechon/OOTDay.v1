# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OOTDay is an AI-powered fashion assistant platform that helps users with daily outfit decisions and connects fashion inspiration directly to purchase opportunities. The project includes a Next.js frontend application and uses the BMAD-METHOD agent framework for development workflows.

## Key Architecture

### Frontend Application (v0-ootd-ay-ai-fashion-assistant/)
- **Framework**: Next.js 14 with TypeScript
- **UI Components**: Radix UI components with shadcn/ui theming
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks and custom hooks in `lib/hooks/`
- **Component Structure**:
  - `components/chat/`: Chat interface for AI fashion recommendations
  - `components/outfit/`: Outfit cards and grid displays
  - `components/product/`: Product modal and details
  - `components/layout/`: Header and bottom navigation
  - `components/ui/`: Base UI components (button, card, dialog, etc.)

### BMAD-METHOD Agent System
The project uses BMAD agents for specialized development tasks. Activate agents with "As [agent-id], ..." pattern:
- **dev**: Full stack development tasks
- **architect**: System design and architecture
- **ux-expert**: UI/UX design and prototypes
- **pm**: Product management and PRDs
- **po**: Product ownership and backlog
- **qa**: Testing and quality assurance
- **sm**: Scrum and agile processes
- **analyst**: Business analysis and research

## Development Commands

### Next.js Application (in v0-ootd-ay-ai-fashion-assistant/)
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build production
pnpm build

# Run linting
pnpm lint

# Start production server
pnpm start
```

### BMAD Agent Management (project root)
```bash
# List all available agents
npm run bmad:list

# Refresh BMAD agents and regenerate AGENTS.md
npm run bmad:refresh

# Validate BMAD configuration
npm run bmad:validate
```

## Core Business Context

The platform targets four main user segments:
1. Fashion-Curious & Social Users (15-28)
2. Fashion-Struggling Shoppers (18-35)
3. Mobile-First Inspiration Seekers (20-35)
4. Special Occasions & Professionals (25-45)

MVP features include:
- Chat & Search with natural language processing
- AI-powered product matching with Central Group inventory
- Direct purchase links and conversion tracking

## Project Structure Notes

- Main application code is in `v0-ootd-ay-ai-fashion-assistant/`
- BMAD agent configurations are in `.bmad-core/`
- Product requirements and specifications are in `OOTDay PRD.MD`
- Generated outputs and prompts are in `Output/`

## Integration Points

The platform is designed to integrate with:
- Central Group inventory systems for product data
- Azure cloud infrastructure for hosting
- Claude AI for fashion recommendations
- Various AI tools (n8n, langflow, Kling AI) for enhanced features