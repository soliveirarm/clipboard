import { useLocalStorage } from "@uidotdev/usehooks"
import { useState } from "react"

import { ClipboardArea } from "./components/ClipboardArea"
import { CreateClipboardArea } from "./components/CreateClipboardArea"

export function App() {
  const [clipboardAreas, setClipboardAreas] = useLocalStorage("CB_AREAS", [])
  const [newArea, setNewArea] = useState("")

  const createClipboardArea = () => {
    const titleProcessed = newArea.toLowerCase().replace(" ", "-")
    setClipboardAreas([
      ...clipboardAreas,
      { title: titleProcessed, content: "" },
    ])
  }

  const updateFields = (event, index, field) => {
    setClipboardAreas((currClipboardAreas) => {
      const newClipboardAreas = [...currClipboardAreas]
      const selectedElement = currClipboardAreas[index]
      selectedElement[field] = event.target.value
      return newClipboardAreas
    })
  }

  const deleteClipboardArea = (i) => {
    const newClipboardAreas = clipboardAreas.filter((_c, index) => index !== i)
    setClipboardAreas(newClipboardAreas)
  }

  const renderedClipboardAreas = clipboardAreas.map((clipboardArea, i) => (
    <ClipboardArea
      key={i}
      {...clipboardArea}
      updateContent={(e) => updateFields(e, i, "content")}
      updateTitle={(e) => updateFields(e, i, "title")}
      deleteArea={() => deleteClipboardArea(i)}
    />
  ))

  const noClipboardAreas = clipboardAreas.length === 0

  return (
    <>
      <header className="p-8 text-3xl font-bold text-indigo-500">
        <h1>clipboard.</h1>
      </header>

      <main className="flex flex-col gap-8 p-8 max-w-screen-md mx-auto">
        <CreateClipboardArea
          onSubmit={createClipboardArea}
          newArea={newArea}
          setNewArea={setNewArea}
        />

        {noClipboardAreas ? (
          <p className="text-center text-xl text-slate-700 p-2">
            Nothing here yet... 🍃
          </p>
        ) : (
          <div className="flex flex-col gap-8">{renderedClipboardAreas}</div>
        )}
      </main>
    </>
  )
}
