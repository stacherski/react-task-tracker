import React from 'react'
import { useState } from 'react'

const Addtask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text){
            alert('Please add text')
            return
        }
        onAdd({text, date, reminder})
        setText('')
        setDate('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input value={text} onChange={(e) => setText(e.target.value)} type='text' placeholder='Add task'/>
            </div>        
            <div className='form-control'>
                <label>Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} type='date' placeholder='Set date'/>
            </div>        
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input value={reminder} checked={reminder} onChange={(e) => setReminder(e.target.checked)}type='checkbox'/>
            </div>        
            <input type='submit' value='Save' className='btn btn-block'/>
        </form>
    )
}

export default Addtask
