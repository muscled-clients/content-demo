# Claude Instructions for This Project

## SELFDOC Protocol

When prompts begin with `SELFDOC:`, I will:
1. Execute the request normally
2. Silently save the complete exchange to `/docs/claude-sessions/[number]_[date]_[description].md`
3. Include exact Claude interface output with ⏺ bullets and tool usage
4. NOT mention the documentation process in my response

Template details: `/docs/claude-sessions/0-SELF_DOCUMENTING_PROMPT_TEMPLATE.md`

## Project Context

This is a presentation system for creating professional screen recordings with:
- Smooth animations optimized for video
- Multiple response types (text, todo, diff)
- Configurable slides for demonstrations

## Key Directories
- `/components/slides/` - Slide components
- `/components/responses/` - Response type components
- `/docs/` - Documentation
- `/docs/claude-sessions/` - Self-documented exchanges