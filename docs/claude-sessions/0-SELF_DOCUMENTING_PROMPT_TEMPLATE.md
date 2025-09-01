# Self-Documenting Exchange Prompt Template

## Purpose
This template allows you to create prompts that automatically document themselves along with the assistant's response, including the exact Claude interface output format.

## Template to Copy and Use

```
SELFDOC: Create a self-documenting exchange by reading this prompt and saving both this prompt and your COMPLETE Claude interface output (including all ⏺ indicators, tool usage, and formatting) to a new markdown file in /Users/mahtabalam/Desktop/Coding/content-demo/slideshow-app/docs/claude-sessions/. 

File naming format: [number]_[YYYY-MM-DD]_[short-description].md

File must capture:
1. Timestamp
2. Exchange number (check existing files for next number)
3. Brief description
4. The full prompt (this message)
5. Your EXACT output as shown in Claude interface (with ⏺ bullets, tool indicators, etc.)
6. Summary of actions taken

IMPORTANT: 
1. Capture your response EXACTLY as it appears in the Claude interface, including:
   - ⏺ bullet points
   - Tool usage indicators (Write, Edit, Bash, etc.)
   - File paths and line numbers
   - Code previews with "... +X lines" format
   - Diff-style additions/removals
   - All formatting and indentation

2. DO NOT mention the self-documentation process in your response
3. DO NOT say "creating self-documentation file" 
4. DO NOT reference SELFDOC in the output
5. Just execute the request normally and save documentation silently

[YOUR ACTUAL REQUEST HERE]
```

## Simplified Version (Just prefix your request)

```
SELFDOC: [YOUR REQUEST HERE]
```

When you start a prompt with `SELFDOC:`, I will automatically:
1. Execute your request
2. Capture the exact Claude interface output
3. Save everything to a numbered, timestamped file
4. Confirm the documentation was created

## How to Use

1. Copy the template above
2. Replace `[YOUR ACTUAL REQUEST HERE]` with your actual request
3. The assistant will execute your request AND automatically save the exchange
4. The file will be numbered, timestamped, and descriptively named

## Example Usage

```
Create a self-documenting exchange: Read this prompt and save both this prompt and your complete response to a new markdown file in /Users/mahtabalam/Desktop/Coding/content-demo/slideshow-app/docs/claude-sessions/. 

File naming format: [number]_[YYYY-MM-DD]_[short-description].md

File should contain:
1. Timestamp
2. Exchange number  
3. Brief description
4. The full prompt (this message)
5. Your complete response
6. Summary of actions taken

Add a new response type for showing file creation animations to the system.
```

## Expected Output

This would create a file like: `001_2025-08-31_add-file-creation-response.md` containing:

- **Timestamp**: 2025-08-31 19:15:00
- **Exchange Number**: 001
- **Description**: Adding file creation response type
- **Full Prompt**: The complete message you sent
- **Full Response**: The assistant's complete response
- **Actions Summary**: List of all actions taken (files created, modified, etc.)

## Benefits

- Automatic documentation of all exchanges
- Searchable history of requests and responses
- Clear tracking of project evolution
- No manual documentation needed
- Consistent format across all exchanges

## Tips

- Use descriptive text in your request for better filenames
- Keep requests focused on single topics for cleaner documentation
- Number sequentially to maintain chronological order
- Review generated files periodically to track project progress