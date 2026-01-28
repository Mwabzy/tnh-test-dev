import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = "100px",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getText({ blockSeparator: "\n\n" }));
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none max-w-none",
      },
    },
  });

  const handleLinkInsert = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      // If there's selected text, make it a link. Otherwise, insert the URL as text.
      if (editor?.state.selection.empty) {
        editor
          ?.chain()
          .focus()
          .insertContent(`<a href="${url}">${url}</a>`)
          .run();
      } else {
        editor?.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b p-2 bg-gray-50 flex flex-wrap gap-1 items-center">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("underline") ? "bg-gray-200" : ""}`}
          title="Underline"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2ZM4 20h16v2H4v-2Z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
          title="Heading"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7h10Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 4h13v2H8V4ZM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM8 11h13v2H8v-2Zm0 7h13v2H8v-2Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("orderedList") ? "bg-gray-200" : ""}`}
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 4h13v2H8V4ZM5 3v3h1v1H3V6h1V4H3V3h2ZM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3Zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5ZM8 11h13v2H8v-2Zm0 7h13v2H8v-2Z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={handleLinkInsert}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive("link") ? "bg-gray-200" : ""}`}
          title="Insert Link"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.364 15.536 16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 6.05 8.464 4.636 9.88 3.222a7 7 0 0 1 9.9 9.9l-1.415 1.414Zm-2.828 2.828-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414Zm-.708-10.607 1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07Z" />
          </svg>
        </button>

        {editor?.isActive("link") && (
          <button
            type="button"
            onClick={removeLink}
            className="p-2 rounded hover:bg-gray-200 text-red-600"
            title="Remove Link"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 11v6.069c0 .53-.211 1.04-.586 1.415-.375.375-.884.586-1.414.586h-6.07a2.005 2.005 0 0 1-1.414-.586A2.005 2.005 0 0 1 7 17.069V11H5v6.069a4.008 4.008 0 0 0 1.172 2.828A4.008 4.008 0 0 0 9 21h6.07a4.008 4.008 0 0 0 2.828-1.172A4.008 4.008 0 0 0 19 17.069V11h-2ZM9 9h2V4h2v5h2l-3 3-3-3ZM4 3h16v2H4V3Z" />
            </svg>
          </button>
        )}

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200"
          title="Undo"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828Z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200"
          title="Redo"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.172 7l-2.536 2.536L17.05 10.95 22 6l-4.95-4.95-1.414 1.414L18.172 5H11a8 8 0 1 0 0 16h9v-2h-9a6 6 0 1 1 0-12h7.172Z" />
          </svg>
        </button>
      </div>

      {/* Editor content */}
      <div className="p-3" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
