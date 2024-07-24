import { getDispatchTypes } from 'w3-redux';

import { api } from '@services';

import { InitState } from './initState';

const { setDispatchType, clearDispatchType, customDispatchType } = getDispatchTypes('page', 'example');

export const example: Action_thunk = (config, data) => {
	return async (dispatch, getState) => {
		const [onOkCB, onFailCB, onStatusCB] = [
			parameters?.okCB ?? null,
			parameters?.failCB ?? null,
			parameters?.statusChangeCB ?? null,
		];

		const state: InitState = getState().page.example;

		const onStatus = async (status: Service_status) => {
			if (typeof onStatusCB === 'function') onStatusCB(status);
			await dispatch({
				type: setDispatchType,
				payload: { scope: '', values: { _status: status } },
			});
		};

		const onOk = async (res: any) => {
			if (onOkCB) onOkCB();

			await dispatch({
				type: setDispatchType,
				payload: { scope: '', values: {} },
			});
		};

		const onFail = async (res: {}) => {
			if (onFailCB) onFailCB();

			await dispatch({
				type: setDispatchType,
				payload: { scope: '', values: {} },
			});
		};

		// api.$x_x_POST({ onFail, onOk, onStatus }, { body: { from , to: from + size -1  } });
		api.$serviceSimulator_POST(
			{ onOk, onFail, onStatus },
			{ okResponse: true, dataModel: { name: 'x', value: 'y' }, responseType: 'array' },
		);
	};
};
