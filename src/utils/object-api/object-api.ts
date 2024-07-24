type AnyObject = { [key: string | number | symbol]: any };

export class ObjectAPI {
	//
	static map = (object: AnyObject, cb: (key: string, value: any, index: number) => any) => {
		Object.keys(object).map((key, i) => cb(key, object[key], i));
	};

	static toArray = (object: AnyObject, keyProperty: string = 'key', valueProperty: string | null = 'value') => {
		const result: AnyObject[] = [];
		this.map(object, (key, item, i) => {
			result.push(valueProperty ? { [keyProperty]: key, [valueProperty]: item } : { [keyProperty]: key, ...item });
		});
		return result;
	};

	static overwrite = (state: AnyObject, payload: AnyObject, scope: string = ''): any => {
		if (!payload) return state;

		try {
			const Sc = scope ? scope.split('.') : [];

			return {
				...state,
				...(Sc.length > 0
					? {
							[Sc[0]]: {
								...state[Sc[0]],
								...(Sc.length > 1
									? {
											[Sc[1]]: {
												...state[Sc[0]][Sc[1]],
												...(Sc.length > 2
													? {
															[Sc[2]]: {
																...state[Sc[0]][Sc[1]][Sc[2]],
																...(Sc.length > 3
																	? {
																			[Sc[3]]: {
																				...state[Sc[0]][Sc[1]][Sc[2]][Sc[3]],
																				...(Sc.length > 4
																					? {
																							[Sc[4]]: {
																								...state[Sc[0]][Sc[1]][Sc[2]][Sc[3]][Sc[4]],
																								...(Sc.length > 5
																									? {
																											[Sc[5]]: {
																												...state[Sc[0]][Sc[1]][Sc[2]][Sc[3]][Sc[4]][Sc[5]],
																												...(Sc.length > 6
																													? {
																															[Sc[6]]: {
																																...state[Sc[0]][Sc[1]][Sc[2]][Sc[3]][Sc[4]][Sc[5]][Sc[6]],
																																...(Sc.length > 7
																																	? {
																																			[Sc[7]]: {
																																				...state[Sc[0]][Sc[1]][Sc[2]][Sc[3]][Sc[4]][Sc[5]][Sc[6]][
																																					Sc[7]
																																				],
																																			},
																																		}
																																	: payload),
																															},
																														}
																													: payload),
																											},
																										}
																									: payload),
																							},
																						}
																					: payload),
																			},
																		}
																	: payload),
															},
														}
													: payload),
											},
										}
									: payload),
							},
						}
					: payload),
			};
		} catch (error) {
			console.error(error);
			return state;
		}
	};
}

// const condisionProperty = { ...(true && { Key: 'value' }) };
