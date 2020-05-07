import ACTIONTYPES from '../Constants'

const INITIAL_STATE = {
	contacts: [],
	name: '',
	email: '',
	mobile: '',
	company: '',
	address: '',
	position: '',
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.MUTATE:
			return { ...state, [action.payload.field]: action.payload.value }

		case ACTIONTYPES.SETINPUTVALUES:
			return { ...state, ...action.payload }

		default:
			return state
	}
}