import ACTIONTYPES from '../Constants'

export const feedContacts = contacts => {
	return {
		type: ACTIONTYPES.MUTATE,
		payload: { field: 'contacts', value: contacts }
	}
}

export const mutate = (field, value) => {
	return {
		type: ACTIONTYPES.MUTATE,
		payload: { field, value }
	}
}

export const setInputValues = (name, email, mobile, company, address, position) => {
	console.log('in action Creator')
	return {
		type: ACTIONTYPES.SETINPUTVALUES,
		payload: { name, email, mobile, company, address, position }
	}
}

export const resetInputValues = () => {
	return {
		type: ACTIONTYPES.RESETINPUTVALUES,
		payload: { name: '', email: '', mobile: '', company: '', address: '', position: '' }
	}
}