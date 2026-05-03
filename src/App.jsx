import React, { useState } from 'react'

const App = () => {

  // State for input fields (controlled components)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  // State to store all notes
  const [task, setTask] = useState([])

  // Handles form submission
  const submitHandler = (e) => {
    e.preventDefault() // Prevent page reload

    // Create a copy of existing notes (immutability)
    const copyTask = [...task];

    // Add new note object
    copyTask.push({ title, details })

    // Update state with new list
    setTask(copyTask)

    // Clear input fields after submission
    setTitle('')
    setDetails('')
  }

  // Function to delete a note by index
  const deleteNote = (idx) => {
    const copyTask = [...task]

    // Remove the selected note
    copyTask.splice(idx, 1)

    // Update state
    setTask(copyTask)
  }

  return (
    <div className='h-screen lg:flex bg-black text-white'>

      {/* Form Section - Add Notes */}
      <form onSubmit={(e) => {submitHandler(e)}} className='flex items-start gap-5 flex-col p-10 lg:w-1/2'>

        <h1 className='text-4xl font-bold'>Add Notes</h1>

        {/* Input for Note Title */}
        <input
          className='px-5 py-2 w-full border-2 rounded font-medium outline-none'
          type="text"
          placeholder='Enter Notes Heading'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />

        {/* Textarea for Note Details */}
        <textarea
          className='px-5 w-full py-2 h-32 border-2 rounded font-medium outline-none'
          placeholder='Write Details'
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
        />

        
        <button className='cursor-pointer bg-white text-black px-5 py-2 rounded font-medium active:scale-95 w-full outline-none'>
          Add Note
        </button>

      </form>

      {/* Notes Display Section */}
      <div className='p-10 bg-gray-900 lg:border-l-2 lg:w-1/2'>

        <h1 className='text-4xl font-bold'>Recent Notes</h1>

        {/* Container for all notes */}
        <div className='flex flex-wrap items-start justify-start gap-5 mt-6 h-[90%] overflow-auto'>

          {/* Loop through notes and render each */}
          {task.map(function(elem, idx){ 
          return (
           <div key={idx}
              className='h-52 w-40 flex flex-col items-start justify-between rounded-xl relative text-black py-9 pb-4 px-4 bg-cover overflow-hidden bg-[url("https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png")]'>

              {/* Note Content */}
              <div>
                <h3 className='leading-tight text-lg font-bold'>
                  {elem.title}
                </h3>

                <p className='mt-3 leading-tight text-sm font-medium text-gray-500 whitespace-pre-wrap overflow-wrap'>
                  {elem.details}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteNote(idx)}
                className='w-full bg-red-400 text-white py-1 text-xs rounded font-bold cursor-pointer active:scale-95'>
                Delete
              </button>

            </div>
          )})}

        </div>
      </div>
    </div>
  )
}

export default App