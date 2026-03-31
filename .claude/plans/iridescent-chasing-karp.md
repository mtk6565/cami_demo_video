# Fix ChatBubble Timestamp Positioning

## Context
The timestamp in chat bubbles is positioned using `float: "right"` with `marginTop: 4`, which doesn't match real WhatsApp. In actual WhatsApp, the timestamp + checkmarks sit at the bottom-right corner of the bubble, tucked inline with the last line of text.

## File to modify
- `src/components/ChatBubble.tsx` (lines 104–123)

## Approach
Use the standard WhatsApp timestamp trick:
1. After the message text, add an invisible spacer `<span>` with the same width as the timestamp — this reserves space so the last line of text doesn't overlap the timestamp.
2. Position the timestamp `<span>` with `position: absolute; bottom; right` inside the bubble (bubble already has `position: relative`).
3. Adjust padding on the bubble slightly (`paddingBottom`) to ensure the timestamp doesn't overlap short single-line messages.

This is how WhatsApp actually does it — the timestamp floats at the absolute bottom-right, and an invisible inline spacer prevents text from running underneath it.

## Changes in `ChatBubble.tsx`

### In the message content area (lines 104–123):
```tsx
<>
  {message}
  {/* Invisible spacer to reserve space for the timestamp */}
  <span style={{
    display: "inline-block",
    width: !isBot ? 75 : 55,
    height: 1,
  }} />
  {/* Timestamp positioned at bottom-right */}
  <span
    style={{
      position: "absolute",
      bottom: 4,
      right: 8,
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 11,
      color: "#667781",
      lineHeight: 1,
    }}
  >
    {timestamp}
    {!isBot && <CheckMark status={status} />}
  </span>
</>
```

### Bubble padding (line 63):
Change `padding: "6px 12px"` → `padding: "6px 12px 8px"` (extra bottom padding so the absolute-positioned timestamp has room).

## Verification
- `npm run dev` → Open Remotion Studio
- Check timestamp position across all phases in the WhatsApp flow
- Verify both bot and user bubbles look correct
- Check short messages (1 word) and long messages (multi-line) both look natural
