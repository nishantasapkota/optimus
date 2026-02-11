"use client"

import React, { useRef, useMemo } from "react"
import dynamic from "next/dynamic"

// Import JoditEditor dynamically to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted animate-pulse rounded-md border" />
})

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || "Start typing...",
    height: 400,
    width: "100%",
    toolbarSticky: false,
    buttons: [
      "source", "|",
      "bold", "italic", "underline", "strikethrough", "|",
      "superscript", "subscript", "|",
      "ul", "ol", "|",
      "outdent", "indent", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "image", "video", "table", "link", "|",
      "align", "undo", "redo", "|",
      "hr", "eraser", "copyformat", "|",
      "fullsize", "selectall", "print"
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    removeButtons: ["about"],
    showXPathInStatusbar: false
  }), [placeholder])

  return (
    <div className="w-full prose-none jodit-editor-container">
      <JoditEditor
        value={value}
        config={config}
        onBlur={(newContent: string) => onChange(newContent)}
      />
      <style jsx global>{`
        .jodit-editor-container .jodit-container {
          border-radius: 0.5rem;
          border-color: hsl(var(--border));
        }
        .jodit-editor-container .jodit-toolbar__box {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: hsl(var(--card));
          border-bottom: 1px solid hsl(var(--border));
        }
        .jodit-editor-container .jodit-workplace {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        .jodit-editor-container .jodit-status-bar {
          background: hsl(var(--card));
          border-top: 1px solid hsl(var(--border));
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}
