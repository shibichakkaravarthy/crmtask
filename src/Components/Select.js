import React, { useState } from 'react'

import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

import './selectStyles.css'

const Select = ({ title, options, defaultSelected, onSelect, noChangeInHeader }) => {
	const [isSelectOpen, toggleSelect] = useState(false)
	const [selectedOption, selectOption] = useState({})

	const onOptionSelect = option => {
		if(!noChangeInHeader) {	
			onSelect(option.value)
			selectOption(option)
		}

		toggleSelect(false)
	}

	return (
		<div className="selectContainer">
			<div className="title" onClick={ () => toggleSelect(!isSelectOpen) } >
				<div>
					{selectedOption.label || title}&nbsp;&nbsp;&nbsp;
				</div>

				<div>
					{
						(isSelectOpen)
						?
						<FaCaretUp />
						:
						<FaCaretDown />
					}
				</div>
			</div>
			{
				(isSelectOpen)
				?
				<div className="options">
					{
						options.map(option => <div onClick={() => onOptionSelect(option)} key={option.value} >{option.label}</div>)
					}
				</div>
				:
				null
			}

		</div>
	)

}

export { Select }