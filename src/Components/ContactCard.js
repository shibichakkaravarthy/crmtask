import React, { useState, useEffect } from 'react'

import './contactCardStyles.css'

const colors = ['#000', '#FF7F50', '#DC143C', '#008B8B', '#006400', '#FF8C00', '#2F4F4F', '#FF1493', '#2E8B57', '#008080']

const ContactCard = ({ contact, onselect, onclick, selected }) => {
	// Declaring State Variables
	const [ checked, setCheck ] = useState(false)

	const getDp = () => {
		const names = contact.name.split(" ")

		if(names.length > 1) {		
			return names[0][0] + names[1][0]
		}

		return contact.name[0]
	}

	const checkIfSelected = () => {
		return selected.indexOf(contact.id.$oid)
	}

	const onCheckBoxChange = (check) => {
		setCheck(check)
		onselect(contact, checkIfSelected())
	}

	return (
		<div className="cardContainer" onClick={() => onclick(contact)} >
			<div className="checkBox">
				<input type="checkbox" checked={ checked } onChange = { event => onCheckBoxChange(event.target.checked) } />
			</div>
			
			<div className="basicInfo">
				<div className="dp" style={{ backgroundColor: contact.dpcolor }} >
					{getDp()}
				</div>
				<div className="detail">
					<div className="contactname">
						{ contact.name }
					</div>
					<div className="email">
						{ contact.email }
					</div>
					<div className="companyMobileView">
						{contact.position} @ {contact.company}
					</div>
				</div>
			</div>

			<div className="company">
				{contact.company}
			</div>
		</div>
	)
}

export { ContactCard }