import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, bgColor, onClick }) => {
    return(
         <button 
         className='btn' 
         style={{backgroundColor: bgColor}}
         onClick = {onClick}
         >
             {text}
        </button>
    )
}

Button.defaultProps =
{
    bgColor: '#080',
    text: 'Add task'

}
Button.propTypes =
{
    text: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    onClick: PropTypes.func
}

export default Button