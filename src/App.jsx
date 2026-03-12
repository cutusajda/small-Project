import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {


  const [notes, setNotes] = useState([
    {
      title: "test title 1 ",
      description: "test description 1"
    },

    {
      title: "test title 2 ",
      description: "test description 2"
    },

    {
      title: "test title 3 ",
      description: "test description 3"
    },

    {
      title: "test title 4 ",
      description: "test description 4"
    }
  ])

  function fetchNotes(){
     axios.get('http://localhost:3000/api/notes')
  .then((res) => {
    console.log(res.data)
    setNotes(res.data.notes)
  })
  .catch((err) => {
    console.error(err)
  })

  }

  useEffect(()=>{
   fetchNotes()

  },[])


  function handleSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements
    console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value

    })
    .then(res=>{
      console.log(res.data)

      fetchNotes()
    })
  }

function handleDeleteNote (noteid) {
  console.log("note id"+noteid)
   console.log(noteid)
   axios.delete("http://localhost:3000/api/notes/"+noteid)
   .then(res=>{
    console.log(res.data)
    fetchNotes()
   })
}


function handleChange(noteids){
  axios.patch("http://localhost:3000/api/notes/"+noteids,{
    description:"Updated description"
  }).then(
    res=>{
      console.log(res.data)
      fetchNotes()
    }
  )

}
  


// console.log(notes)

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title'/>
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create Note</button>
    </form>
      <div className="notes" >
        {
          notes.map((note,idx) => {
            return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>
                {handleDeleteNote(note._id)}}>Delete</button>

                <button onClick={()=>handleChange(note._id)}>Update</button>
               
            </div>

          })
        }

      </div>

    </>
  )
}

export default App
