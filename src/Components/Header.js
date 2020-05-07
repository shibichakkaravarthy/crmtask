import React from 'react'

import { GoMail, GoPlus } from 'react-icons/go'
import { FaRegBell, FaSearch, FaCaretDown } from 'react-icons/fa'

import { Select } from './Select'
import '../styles.css'

const Header = () => {
	return (
		<div className="header">
			<div className="headerSection">
				<div className="searchIconContainer">
					<FaSearch color='#000' />
				</div>
			</div>
			<div className="headerSection">
				<div className="headerButton">
					<GoPlus />
					<div>Add</div>
				</div>

				<div className="headerButton">
					<GoMail />
				</div>

				<div className="headerButton">
					<Select title='Mark Henry' options={[ { label: 'Profile', value: '' }, { label: 'Sign out', value: '' } ]} onSelect={() => {}} noChangeInHeader={true} />
				</div>

				<div className="headerButton">
					<FaRegBell />
				</div>
			</div>
		</div>
	)
}

export { Header }