import { useState } from "react"
import { LuClipboard } from "react-icons/lu"
import { FaRegCircleXmark } from "react-icons/fa6"

export function ClipboardArea({
  title,
  content,
  updateTitle,
  updateContent,
  deleteArea,
}) {
  const [isContentCopied, setIsContentCopied] = useState(false)

  const showCopiedMessage = () => {
    setIsContentCopied((curr) => !curr)
    setTimeout(() => setIsContentCopied((curr) => !curr), 2000)
  }

  const copyText = () => {
    const element = document.querySelector(`#${title}`)
    element.select()
    element.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(content)
    showCopiedMessage()
  }

  const textIsCopiedClasses = isContentCopied
    ? "bg-transparent text-indigo-500 border-2 border-indigo-500"
    : "bg-indigo-500 text-white"

  const unprocessedTitle = title.replace("-", " ")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <input
          className="text-xl font-semibold tracking-wide focus:bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded p-1 lowercase"
          onChange={updateTitle}
          value={unprocessedTitle}
        />
        <button
          onClick={deleteArea}
          className="hover:text-red-600 hover:scale-110 transition"
        >
          <FaRegCircleXmark />
        </button>
      </div>
      <textarea
        name={title}
        id={title}
        cols={50}
        rows={6}
        placeholder="type your text in here"
        className="border-b-2 border-indigo-500 p-2 text-lg rounded shadow-md"
        value={content}
        onChange={updateContent}
      />
      <button
        onClick={copyText}
        className={`self-end flex items-center gap-1 px-3 py-1 rounded ${textIsCopiedClasses} hover:scale-110 transition font-medium`}
      >
        <LuClipboard />
        {isContentCopied ? "copied" : "copy"}
      </button>
    </div>
  )
}
