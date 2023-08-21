import { Dispatch, useReducer } from "react";

interface State {
	modalDelete: boolean;
	modalEdit: boolean;
	modalAdd: boolean;
}

export enum ModalAction {
	EDIT = "edit",
	ADD = "add",
	DELETE = "delete",
	CLOSE = "close",
}

export interface Action {
	type: ModalAction;
}

interface UseModalProps {
	state: State;
	dispatch: Dispatch<Action>;
}

export const useModal = (): UseModalProps => {
	const initialState = {
		modalDelete: false,
		modalEdit: false,
		modalAdd: false,
	};

	const [state, dispatch] = useReducer((state: State, action: Action) => {
		switch (action.type) {
			case ModalAction.DELETE:
				return {
					modalDelete: true,
					modalEdit: false,
					modalAdd: false,
				};
			case ModalAction.EDIT:
				return {
					modalDelete: false,
					modalEdit: true,
					modalAdd: false,
				};
			case ModalAction.ADD:
				return {
					modalDelete: false,
					modalEdit: false,
					modalAdd: true,
				};
			case ModalAction.CLOSE:
				return {
					modalDelete: initialState.modalDelete,
					modalEdit: initialState.modalEdit,
					modalAdd: initialState.modalAdd,
				};

			default:
				return state;
		}
	}, initialState);

	return {
		state,
		dispatch,
	};
};
