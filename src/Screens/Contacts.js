import React, { useEffect, useState } from 'react'

import moment from 'moment'
import Modal from 'react-modal';
import { FaSearch, FaRegEdit } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { AiOutlineDelete, AiOutlineClose } from 'react-icons/ai'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import validate from 'validate.js'

import contactsJson from '../MOCK_DATA.json'
import { feedContacts, mutate, resetInputValues, setInputValues } from '../Redux/Actions'
import { Select, ContactCard, DetailCard } from '../Components'
import contactIcon from '../Components/contact-icon'
import '../styles.css'
import '../mobile.css'

const constraints = {
	name: {
		presence: {
			message: 'should not be empty'
		},

		length: {
			minimum: 2,
			message: 'is not valid'
		},

		format: {
			pattern: '[a-zA-Z ]*',
			message: 'is not valid'
		}
	},

	email: {
		presence: {
			message: 'should not be empty'
		},

		email: {
			message: 'is not valid'
		}
	},

	mobile: {
		presence: {
			message: 'should not be empty'
		},

		length: {
			minimum: 10,
			message: 'is not valid'
		},

		format: {
			pattern: '[0-9]*',
			message: 'is not valid'
		}
	},

	company: {
		presence: {
			message: 'should not be empty'
		},

		length: {
			minimum: 2,
			message: 'is not valid'
		},

		format: {
			pattern: '[a-zA-Z ]*',
			message: 'is not valid'
		}
	},

	address: {
		presence: {
			message: 'should not be empty'
		},

		length: {
			minimum: 2,
			message: 'is not valid'
		},
	},

	position: {
		presence: {
			message: 'should not be empty'
		},

		length: {
			minimum: 3,
			message: 'is not valid'
		},
	}
}

const Contacts = () => {
	// Declaring State Variables
	const [filter, setFilter] = useState('')
	const [sort, setSort] = useState('')
	const [selectedContacts, addToSelectedContacts] = useState([])
	const [editContactIndex, setContactIndex] = useState(null)
	const [contactDetail, setDetail] = useState({})
	const [ modalIsOpen, setModalOpen ] = useState(false)
	const [ detailModalIsOpen,setDetailModalOpen ] = useState(false)
	const [modalType, setModalType] = useState('add')
	const [mobileView, setMobileView] = useState('false')

	// Accessing Redux Store
	const { contacts, name, email, mobile, company, address, position } = useSelector(state => state.contacts, shallowEqual)
	const dispatch = useDispatch()

	const selectOptions = [
		{
			label: 'Name',
			value: 'name',
		},

		{
			label: 'Date Created',
			value: 'dateCreated',
		},

		{
			label: 'Company',
			value: 'company',
		}
	]

	const filteredContacts = contacts.filter(contact => {
		let filtered = contact.name.toLowerCase().includes(filter.toLowerCase()) || contact.company.toLowerCase().includes(filter.toLowerCase()) || contact.mobile.toString().includes(filter.toString())
		return filtered
	})

	const onContactSelect = (contact, index) => {
		let selected = selectedContacts

		if (index === -1) {
			console.log('ticked', contact.id.$oid, index)

			selected.push(contact.id.$oid)
			addToSelectedContacts(selected)
		}

		else if (index > -1) {
			selected.splice(index, 1)
		}
	}

	const sortContacts = () => {
		switch(sort) {
			case 'name':
				filteredContacts.sort((a,b) => {
					let value = 0

					if(a.name.toUpperCase() > b.name.toUpperCase()) {
						value = 1
					}

					else if (a.name.toUpperCase() < b.name.toUpperCase()) {
						value = -1
					}

					return value
				})
				break;

				case 'dateCreated':
				filteredContacts.sort((a,b) => {
					let value = 0

					if(moment(a.dateCreated).isBefore(b.dateCreated)) {
						value = 1
					}

					else if (moment(a.dateCreated).isAfter(b.dateCreated)) {
						value = -1
					}
					console.log('date sort', value)
					return value
				})
				break;

				case 'company':
				filteredContacts.sort((a,b) => {
					let value = 0

					if(a.company.toUpperCase() > b.company.toUpperCase()) {
						value = 1
					}

					else if (a.company.toUpperCase() < b.company.toUpperCase()) {
						value = -1
					}

					return value
				})
				break;

			default:
				filteredContacts.sort((a,b) => {
					return 0
				})
				break;
		}
	}

	const onModelOpen = (type) => {
		setModalType(type)
		setModalOpen(true)

		if(type === 'edit') {
			onEditContact()
		}
	}

	const onModelClose = () => {
		dispatch(resetInputValues())
		setModalOpen(false)
	}

	const onContactAdd = () => {
		const colors = ['#000', '#FF7F50', '#DC143C', '#008B8B', '#006400', '#FF8C00', '#2F4F4F', '#FF1493', '#2E8B57', '#008080']
		console.log('submit', name, email, mobile, position, company)

		const errors = validate({ name, email, mobile, company, address, position }, constraints)

		if(!errors) {
			let newContact = contacts

			newContact.push({ name, email, mobile, position, company, address, dateCreated: new Date(), dpcolor: colors[Math.floor(Math.random() * 11)] })
			feedContacts(newContact)
			
			setModalOpen(false)
			dispatch(resetInputValues())
		}

		else {
			console.log('errors', errors)
			Object.keys(errors).map(error => {
				store.addNotification({
				  title: error,
				  message: errors[error][0],
				  type: "danger",
				  insert: "top",
				  container: "top-right",
				  animationIn: ["animated", "fadeIn"],
				  animationOut: ["animated", "fadeOut"],
				  dismiss: {
				    duration: 10000,
				    onScreen: true
				  }
				});

			})
		}
	}

	const onEditSubmit  = contact => {
		const editedContacts = filteredContacts

		editedContacts[editContactIndex.index] = { ...editContactIndex.contact, name, email, mobile, position, company, address }

		dispatch(mutate('contacts', editedContacts))
		setModalOpen(false)
	}

	const onEditContact = () => {
		let id = selectedContacts[0]

		let index = filteredContacts.findIndex((contact => {
			return contact.id.$oid === id
		}))


		let contact = filteredContacts[index]
		setContactIndex({ index , contact})

		dispatch(setInputValues(contact.name, contact.email, contact.mobile, contact.company, contact.address, contact.position))
		console.log('edit index', index)

		setModalOpen(true)
	}

	const onDeleteContact = () => {
		let allContacts = contacts

		selectedContacts.map(contactId => {
			let index = allContacts.findIndex(contact => {
				return contact.id.$oid === contactId
			})

			console.log('id', contactId, index)
			allContacts.splice(index, 1)
		})
		
		dispatch(feedContacts(allContacts))
		addToSelectedContacts([])
		store.addNotification({
			title: 'Deleted',
			message: 'Selected Contacts was deleted',
			type: "success",
			insert: "top",
			container: "top-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: {
				duration: 3000,
				onScreen: true
			}
		});
	}

	const onResize = () => {
		// console.log('hi', window.matchMedia("(max-width: 900px)"))
		if (window.matchMedia("(max-width: 900px)").matches) {
			setMobileView(true)
		}

		else {
			setMobileView(false)
		}
	}

	const onContactClick = (contact, dpColor) => {
		setDetail({...contact, dpColor})

		if(mobileView) {
			setDetailModalOpen(true)
		}
	}

	useEffect(() => {
		dispatch(feedContacts(contactsJson))
		window.addEventListener("resize", onResize);
	}, [contactsJson])

	sortContacts()

	console.log('rerender', window.innerHeight)

	return (
		<div className="screenContainer">
			<Modal isOpen={modalIsOpen} onAfterOpen={() => { console.log('Modal is Open') }} onRequestClose={() => setModalOpen(false)} className='modal' contentLabel="Example Modal" >
				<div>
					<div>
						<AiOutlineClose className='modalCloseButton' onClick={() => onModelClose()} />
					</div>
				</div>
				{
					(modalType === 'add')
					?
					<div className="modalTitle">
						Add Contact
					</div>
					:
					<div className="modalTitle">
						Edit Contact
					</div>
				}

				<div className='inputContainer' >
					<div className='inputHolder' >
						<input type="text" className='inputUnderlined' value={name} placeholder='Name' onChange={event => dispatch(mutate('name', event.target.value))} />
					</div>

					<div className='inlineInput' >
						<div className='inputHolder' >
							<input type="text" className='inputUnderlined' value={email} placeholder='Email' onChange={event => dispatch(mutate('email', event.target.value))} />
						</div>

						<div className='inputHolder' >
							<input type="text" className='inputUnderlined' value={mobile} placeholder='Phone' onChange={event => dispatch(mutate('mobile', event.target.value))} />
						</div>
					</div>

					<div className='inlineInput' >
						<div className='inputHolder' >
							<input type="text" className='inputUnderlined' value={position} placeholder='Job Title' onChange={event => dispatch(mutate('position', event.target.value))} />
						</div>

						<div className='inputHolder' >
							<input type="text" className='inputUnderlined' value={company} placeholder='Company' onChange={event => dispatch(mutate('company', event.target.value))} />
						</div>
					</div>

					<div className='inputHolder' >
						<textarea type="text" className='inputUnderlined' value={address} placeholder='Address' onChange={event => dispatch(mutate('address', event.target.value))} ></textarea>
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-around' }} >
					{
						(modalType === 'add')
						?
						<div className="addContactButton" onClick={() => onContactAdd()} >
							<div style={{ textAlign: 'center' }} >
								Add Contact
							</div>
						</div>
						:
						<div className="addContactButton" onClick={() => onEditSubmit()} >
							<div style={{ textAlign: 'center' }} >
								Edit Contact
							</div>
						</div>
					}

					<div onClick={() => onModelClose()} className="addContactButton" style={{ backgroundImage: 'none', backgroundColor: '#ccc', color: '#000', border: '1px solid #999' }} >
						<div style={{ textAlign: 'center' }} >
							Cancel
						</div>
					</div>
				</div>
			</Modal>

			<Modal isOpen={detailModalIsOpen} onRequestClose={() => setDetailModalOpen(false)} className='detailModal' >
				<div>
					<AiOutlineClose className='modalCloseButton' onClick={() => setDetailModalOpen(false)} />
				</div>
				<DetailCard contact={contactDetail} />
			</Modal>

			<div className="titleContainer">
				<div className="title">
					<div className="titleIconContainer">
						<img src={contactIcon} className="titleIcon" style={{ width: '40px', height: '40px', marginRight: '5px' }} alt=""/>
					</div>
					<div className="titleText">
						<div className='mainHead' >Contacts</div>
						<div className='subHead fontColorGrey' >Welcome to FLATCRM Contact Page</div>
					</div>
				</div>

				<div className="sortOptions">
					<div className='fontColorGrey' >Sort By</div>
					<Select title='Sort Options' options={selectOptions} onSelect={selected => setSort(selected)} />
				</div>
			</div>

			<div className="searchBarContainer">
				<div className="searchBar">
					<input type="text" placeholder='Search contacts' onChange={event => setFilter(event.target.value)} />
					<FaSearch color='#000' />
				</div>

				<div className="addContact" onClick={() => onModelOpen('add')} >
					<div>
						<GoPlus />
					</div>

					<div>
						Add Contact
					</div>
				</div>
			</div>

			<div className="contactsWrapper">
				<div className="contactContainer">
				{
					(!selectedContacts.length)
					?
					<div className="contactsHeader">
						<div style={{ flex: 1 }} >+</div>
						<div style={{ flex: 6 }} >Basic info</div>
						<div style={{ flex: 3 }} >Company</div>
					</div>
					:
					<div className="contactsHeaderSelected">
						{
							(selectedContacts.length === 1)
							?
							<FaRegEdit color='#fff' class='iconButton' onClick={() => onModelOpen('edit')} />
							:
							null
						}

						<AiOutlineDelete color='#fff' class='iconButton' onClick={() => onDeleteContact()} />
					</div>
				}

					<div style={{ height: '70vh', overflowY: 'scroll', paddingLeft: '10px' }} >
						{
							filteredContacts.map(contact => <ContactCard key={ contact.name+contact.email } contact={contact} selected={selectedContacts} onclick={(contact, dpColor) => { onContactClick(contact, dpColor) }} onselect={(contact, index) => onContactSelect(contact, index)} />)
						}
					</div>
				</div>

				<div className="detailContainer">
					<DetailCard contact={contactDetail} />
				</div>
			</div>
		</div>
	)
}

export { Contacts }