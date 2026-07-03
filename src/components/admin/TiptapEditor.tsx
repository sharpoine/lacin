"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Undo, Redo, RemoveFormatting
} from 'lucide-react'

export default function TiptapEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] max-h-[500px] overflow-y-auto px-4 py-4 w-full bg-[#f6f1e8] rounded-b-xl text-slate-800 font-sans'
      }
    }
  })

  if (!editor) {
    return null
  }

  const MenuBar = () => {
    return (
      <div className="flex flex-wrap gap-1 p-2 bg-[#e9dfce] rounded-t-xl border-b border-[#d6c2a0]">
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition ${editor.isActive('bold') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition ${editor.isActive('italic') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded transition ${editor.isActive('strike') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Strike"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#d6c2a0] mx-1 self-center" />

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run() }}
          className={`p-1.5 rounded transition font-bold ${editor.isActive('heading', { level: 1 }) ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
          className={`p-1.5 rounded transition font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run() }}
          className={`p-1.5 rounded transition font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#d6c2a0] mx-1 self-center" />

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
          className={`p-1.5 rounded transition ${editor.isActive('bulletList') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run() }}
          className={`p-1.5 rounded transition ${editor.isActive('orderedList') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#d6c2a0] mx-1 self-center" />

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }}
          className={`p-1.5 rounded transition ${editor.isActive('blockquote') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCodeBlock().run() }}
          className={`p-1.5 rounded transition ${editor.isActive('codeBlock') ? 'bg-[#8d6e45] text-white' : 'text-slate-700 hover:bg-[#d6c2a0]'}`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#d6c2a0] mx-1 self-center" />

        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run() }}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 rounded transition text-slate-700 hover:bg-[#d6c2a0] disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run() }}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 rounded transition text-slate-700 hover:bg-[#d6c2a0] disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
        
        <button
          onClick={(e) => { e.preventDefault(); editor.chain().focus().clearNodes().unsetAllMarks().run() }}
          className="p-1.5 rounded transition text-slate-700 hover:bg-[#d6c2a0]"
          title="Clear Formatting"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="border border-[#d6c2a0] rounded-xl bg-[#f6f1e8] shadow-sm flex flex-col w-full h-full">
      <MenuBar />
      <EditorContent editor={editor} className="flex-1 w-full" />
    </div>
  )
}
