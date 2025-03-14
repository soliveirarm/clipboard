export function CreateClipboardArea({ onSubmit, newArea, setNewArea }) {
  return (
    <form onSubmit={onSubmit} className="flex-1 text-xl">
      <input
        type="text"
        placeholder="type in the name of your clipboard area"
        className="placeholder-slate-600 border-b-2 border-indigo-600 p-4 rounded-md shadow w-full text-center"
        value={newArea}
        onChange={(e) => setNewArea(e.target.value)}
        autoFocus
      />
    </form>
  )
}
