import React from 'react'

import './detailCardStyles.css'

const DetailCard = ({ contact }) => {

	const getDp = () => {
		const names = contact.name.split(" ")

		if(names.length > 1) {		
			return names[0][0] + names[1][0]
		}

		return contact.name[0]
	}

	if(!contact.name) {
		return (
			<div>
				Selesct a contact to View Here
			</div>
		)
	}

	return (
		<div className="detailCardContainer">
			<div>
				<div className="dpContainer">
					<div className="dp" style={{ backgroundColor: contact.dpcolor }} >
						{
							getDp()
						}
					</div>
				</div>
				<div>
					<div className="name">{contact.name}</div>
					<div className="contactposition">{contact.position} @ {contact.company}</div>
				</div>
			</div>


			<div className="contentContainer">
				<div className="content">
					<div className="property">Full Name</div>
					<div className="value"> { contact.name } </div>
				</div>

				<div className="content">
					<div className="property">Email</div>
					<div className="value"> { contact.email } </div>
				</div>

				<div className="content">
					<div className="property">Phone</div>
					<div className="value"> { contact.mobile } </div>
				</div>

				<div className="content">
					<div className="property">Company</div>
					<div className="value"> { contact.company } </div>
				</div>

				<div className="content">
					<div className="property">Address</div>
					<div className="value"> { contact.address } </div>
				</div>
			</div>
		</div>
	)
}

export { DetailCard }