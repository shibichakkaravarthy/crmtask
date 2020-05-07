import React from 'react'

import { GoFile, GoHome } from 'react-icons/go'
import { IoIosContact, IoIosCalendar, IoIosMenu } from 'react-icons/io'
import { AiOutlinePieChart, AiOutlineSetting } from 'react-icons/ai'
import { FiDatabase } from 'react-icons/fi'

import '../styles.css'

const MenuBar = () => {
	return (
		<div className='menu-container' >
			<div className='icon-container' style={{ marginBottom: '30px' }} >
				<div className='icon-wrapper' >
					<IoIosMenu className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<GoHome className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<IoIosContact className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<GoFile className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<AiOutlinePieChart className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<FiDatabase className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<IoIosCalendar className='menu-icon' />
				</div>
			</div>

			<div className='icon-container' >
				<div className='icon-wrapper' >
					<AiOutlineSetting className='menu-icon' />
				</div>
			</div>
		</div>
	)
}

export { MenuBar }