export default function NoteCard({ note, title, starred, body, darkMode, tags, addShortcut, setFields, setTagNoteArray, showEdit, setShowEdit }) {
  return (
    <div className="notes-card" onClick={() => setFields(note)}>
      <div className="notes-header">
        <div className="notes-title">
          {title}
        </div>
        <div className="notes-sc fa-stack" onClick={() => addShortcut(note)}>
          <i className="fa-regular fa-star fa-stack-1x icon-a" />
          {starred === true && (
            <i className="fa-solid fa-star fa-stack-1x icon-b" />
          )}
        </div>
      </div>
      <div className="notes-content">
        {body}
      </div>
      <div className="note-tag-icons">
        <div className="tag-edit-notes">
          <button
            className={darkMode ? "edit-tag-btn td-dark" : "edit-tag-btn td-light"}
            onClick={() => {
              setTagNoteArray(tags)
              setShowEdit(!showEdit)
            }}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
        <p id="t-card">Tags</p>
        <div className="tag-icons-container">
          {tags.map(tag => (
            <div key={tag?.id} className="tag-icons">
              {tag?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

/* <div className={darkMode ? 'column-notes dark' : 'column-notes light'}>
  {notes?.map((note, idx) => (
    <div key={idx}
      className="notes-card"
      onClick={() => setFields(note)}
    >
      <div className="notes-header">
        <div className="notes-title">
          {note?.title}
        </div>
        <div className="notes-sc fa-stack" onClick={() => addShortcut(note)}>
          <i className="fa-regular fa-star fa-stack-1x icon-a" />
          {note.starred === true && (
            <i className="fa-solid fa-star fa-stack-1x icon-b" />
          )}
        </div>
      </div>
      <div className="notes-content">
        {note?.body}
      </div>
      <div className="note-tag-icons">
        <div className="tag-edit-notes">
          <button
            className={darkMode ? "edit-tag-btn td-dark" : "edit-tag-btn td-light"}
            onClick={() => {
              setTagNoteArray(note?.tags)
              setShowEdit(!showEdit)
            }}>
            <i className="fa-solid fa-plus" />
          </button>
        </div>
        <p id="t-card">Tags</p>
        <div className="tag-icons-container">
          {note?.tags.map(tag => (
            <div key={tag?.id} className="tag-icons">
              {tag?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
  {showEdit && (
    <EditTagModal
      noteId={notesId}
      showEdit={showEdit}
      setShowEdit={setShowEdit}
      tagNoteArray={tagNoteArray}
    />
  )}
</div> */
