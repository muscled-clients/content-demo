# Claude Response Types Specification

## Overview
This document specifies the different response types that Claude Code produces and how content should be structured for each type. Each response type serves a specific purpose in demonstrating development workflows and should be rendered with appropriate visual styling and animations.

## Core Response Categories

### 1. Text Response
**Purpose**: General explanations, answers, and conversational responses

**Visual Characteristics**:
- White bullet point (•) preceding the response
- White text for Claude's response content
- Gray text for user prompts
- Monospace font for consistency
- Proper line wrapping for readability

**Content Structure**:
- Plain text paragraphs
- Natural language explanations
- Can include inline code references using backticks
- May contain multiple paragraphs separated by line breaks

**Use Cases**:
- Explaining concepts
- Answering questions
- Providing context
- General conversation

### 2. Todo Response
**Purpose**: Display actionable task lists with completion tracking in Claude's todo format

**Visual Characteristics**:
- Orange "Zigzagging..." status with thinking animation
- Escape/interrupt instructions in gray text
- Square checkbox symbols (☐ for unchecked, ☑ for checked)
- Hierarchical structure with proper indentation
- White text for task descriptions
- Tree-like connectors (└ and │) for visual hierarchy
- Completed items show checkmarks

**Content Structure Input**:
The user provides a numbered list like:
```
1. Analyze project structure and architecture patterns
2. Map component hierarchy and reusable UI components
3. Review routing structure and page organization
4. Identify data flow patterns and state management
5. Document API endpoints and service layer patterns
```

**Visual Output Format**:
```
✱ Zigzagging... (esc to interrupt · ctrl+t to hide todos)
  └ ☐Analyze project structure and architecture patterns
    ☐Map component hierarchy and reusable UI components
    
    ☐ Review routing structure and page organization
    ☐ Identify data flow patterns and state management
    ☐ Document API endpoints and service layer patterns
```

**Animation Sequence**:
- "Zigzagging..." appears with animated dots or spinner
- Todo items fade in sequentially
- Checkboxes animate from empty to checked as tasks complete
- Completed items may show with checkmark (☑)
- Tree structure maintains visual hierarchy

### 3. Code Diff Response
**Purpose**: Show code changes with additions and removals

**Visual Characteristics**:
- Green background/text for additions (+)
- Red background/text for removals (-)
- Gray for unchanged context lines
- Line numbers on the left
- Syntax highlighting preserved
- File path header

**Content Structure**:
- File path indication
- Context lines (unchanged code)
- Addition lines (new code)
- Removal lines (deleted code)
- Proper indentation maintained

**Example Content Format**:
```
File: components/Button.tsx
  
  5  import React from 'react';
  6  
- 7  const Button = ({ label }) => {
+ 7  const Button = ({ label, onClick, variant = 'primary' }) => {
  8    return (
- 9      <button className="btn">
+ 9      <button 
+10        className={`btn btn-${variant}`}
+11        onClick={onClick}
+12      >
 13        {label}
 14      </button>
  15    );
```

**Animation Sequence**:
- File path appears first
- Lines fade in sequentially
- Additions highlight briefly in green
- Removals highlight briefly in red

### 4. File Create Response
**Purpose**: Demonstrate file creation with content

**Visual Characteristics**:
- File path in header with icon
- "Creating file:" prefix
- Syntax-highlighted content
- Line numbers (optional)
- Success indicator when complete

**Content Structure**:
- Full file path
- File content with proper formatting
- Language-specific syntax highlighting
- Proper indentation

**Example Content Format**:
```
Creating: src/components/Header.tsx

[File content appears with typing animation]
- Shows the complete file being written
- Maintains proper code structure
- Includes imports, component definition, exports
```

**Animation Sequence**:
- File path types out
- Brief pause
- Content appears progressively
- Success indicator at completion

### 5. Command Execution Response
**Purpose**: Show terminal commands and their output

**Visual Characteristics**:
- Command prompt indicator (>)
- Command in white/gray
- Output in appropriate colors
- Maintains terminal formatting
- Shows execution progress

**Content Structure**:
- Command with arguments
- Output lines
- Success/error status
- Execution time (optional)

**Example Content Format**:
```
> npm install framer-motion

added 15 packages, and audited 1247 packages in 3s
found 0 vulnerabilities

> npm run dev

▲ Next.js 14.0.0
- Local: http://localhost:3000
✓ Ready in 1.2s
```

**Animation Sequence**:
- Command appears first
- Brief pause simulating execution
- Output streams in progressively
- Status indicator on completion

### 6. Error Response
**Purpose**: Display error messages and debugging information

**Visual Characteristics**:
- Red color scheme for errors
- Error icon or indicator
- Stack trace in muted colors
- Highlighted error message
- Suggestion or hint section

**Content Structure**:
- Error type/name
- Error message
- File location and line number
- Stack trace (collapsible)
- Helpful hints or solutions

**Example Content Format**:
```
TypeError: Cannot read property 'map' of undefined
  at TodoList.render (src/components/TodoList.tsx:15:8)
  
The error occurs when trying to map over 'items' which is undefined.

Hint: Ensure that 'items' prop is passed to TodoList component
or provide a default value: items = []
```

**Animation Sequence**:
- Error message appears with subtle shake
- Stack trace fades in
- Hints appear last with helpful icon

### 7. Progress Response
**Purpose**: Show ongoing operations with status updates

**Visual Characteristics**:
- Progress indicators (spinner, dots, percentage)
- Status messages that update
- Completed steps with checkmarks
- Current action highlighted

**Content Structure**:
- Operation name
- Current step
- Progress percentage or count
- Completed items
- Estimated time remaining

**Example Content Format**:
```
Building application...

✓ Compiling TypeScript
✓ Bundling assets
▸ Optimizing images (3/10)
  Minifying JavaScript
  Generating static pages
  
Progress: 45% | Time elapsed: 12s
```

**Animation Sequence**:
- Title appears
- Steps appear as list
- Current step shows loading animation
- Completed steps get checkmarks
- Progress updates smoothly

## Content Input Guidelines

### Structured Data Format
Each response type should accept content in a structured format that maintains separation between data and presentation. Content should be provided as configuration that the system interprets.

### Dynamic Content Adaptation
The system should adapt the visual presentation based on content characteristics:
- Long text should wrap appropriately
- Code should maintain proper indentation
- Lists should handle varying item counts
- Errors should emphasize critical information

### Timing Considerations
Animation timing should scale with content:
- Shorter content displays faster
- Longer content may need staged reveal
- User should control pacing when needed
- Consistent rhythm across response types

## Response Combination Patterns

### Sequential Responses
Multiple response types can appear in sequence:
1. Command execution
2. Progress indication
3. Success message or error
4. Follow-up suggestions

### Nested Responses
Some responses can contain others:
- Text response with embedded code blocks
- Todo lists with command executions
- Error messages with suggested fixes

### Contextual Transitions
Smooth transitions between response types:
- Command leads to output
- File creation leads to execution
- Error leads to fix suggestion

## Configuration Philosophy

Following the architectural principle of separation of concerns, content configuration should:

- Be independent of visual presentation
- Allow for future response types
- Support content reusability
- Enable easy testing and validation
- Maintain type safety where applicable

## Animation Principles

All response animations should:

- Maintain consistent timing patterns
- Support interruption and cancellation
- Provide visual feedback for state changes
- Optimize for 60fps performance
- Respect user motion preferences
- Create natural, purposeful movement

## Extensibility Considerations

The response type system should:

- Allow new types without modifying existing ones
- Support custom styling per response type
- Enable plugin-like additions
- Maintain backward compatibility
- Follow established patterns for consistency

## Quality Attributes

Each response type must:

- Render correctly at different viewport sizes
- Maintain readability when recorded
- Perform smoothly during animations
- Handle edge cases gracefully
- Provide consistent user experience
- Support accessibility requirements

## Testing Approach

Response types should be validated for:

- Correct content rendering
- Animation smoothness
- State management accuracy
- Error handling robustness
- Performance targets
- Visual consistency

## Documentation Requirements

Each response type implementation should document:

- Purpose and use cases
- Content structure requirements
- Animation specifications
- Performance considerations
- Known limitations
- Example configurations

---

*This specification follows the principles outlined in 1_ARCHITECTURE.md and supports the system design described in 2_PRESENTATION_SYSTEM.md. Implementation details are intentionally omitted to maintain focus on requirements and behavior.*