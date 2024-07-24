type Index = { keyPath: string; unique?: boolean; multiEntry?: boolean };
type ObjectStore = { name: string; keyPath?: string; autoIncrement?: boolean; indexes?: Index[] };
type PromiseResult = { error: boolean; data: unknown | null; event: Event | undefined };
type Id = IDBValidKey | IDBKeyRange;

export class IndexedDB {
	db: IDBDatabase | null = null;
	private dbName: string = '';
	private dbVersion: number = 0;
	private objectStores: ObjectStore[] = [];
	private logStatus: boolean = true;
	private log = (methodName: string, message: string, error: boolean) => {
		console.log(
			`%c [IndexedDB] %c [${methodName}] %c ${message} `,
			`padding:1px; margin: 1px; border-radius:10px; color: #fff; background: #048;`,
			`padding:1px; margin: 1px; border-radius:10px; color: #fff; background: ${error ? '#800' : '#080'};`,
			``,
		);
	};

	constructor(config?: { dbName?: string; dbVersion?: number; logStatus?: boolean }) {
		this.dbName = config?.dbName || 'main';
		this.dbVersion = config?.dbVersion || 1;
		this.logStatus = config?.logStatus || true;
	}

	// ---------------- * Open DB * ---------------- //
	openDB_sync = (
		objectStores: ObjectStore[],
		callBacks?: {
			onupgradeneeded?: (event: IDBVersionChangeEvent, db: IDBDatabase | null) => any;
			onsuccess?: (event: Event) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		if (this.db) {
			this.db.close();
			this.db = null;
		}

		this.objectStores = objectStores || [];

		const openReq = indexedDB.open(this.dbName, this.dbVersion);

		// --- * openDB > OnUpgrade * --- //
		openReq.onupgradeneeded = (event) => {
			const [oldVersion, newVersion] = [event.oldVersion, event.newVersion];
			this.db = openReq.result;

			this.objectStores.map((objectStore) => {
				if (!this.db?.objectStoreNames.contains(objectStore.name)) {
					const createdObjectStore = this.db?.createObjectStore(objectStore.name, {
						keyPath: 'keyPath' in objectStore ? objectStore.keyPath : 'id',
						autoIncrement: 'autoIncrement' in objectStore ? objectStore.autoIncrement : true,
					});

					(objectStore?.indexes || []).map((index) => {
						if (!index.keyPath) return;

						createdObjectStore?.createIndex(index.keyPath, index.keyPath, {
							unique: index.unique || false,
							multiEntry: index.multiEntry || false,
						});
					});
				}
			});

			if (typeof callBacks?.onupgradeneeded === 'function') callBacks.onupgradeneeded(event, this.db);
			if (this.logStatus) this.log('OpenDB', `New Version Detected From ${oldVersion} Version to ${newVersion} Version`, false);
		};

		// --- * openDB > OnSuccess * --- //
		openReq.onsuccess = (event) => {
			this.db = openReq.result;
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus) this.log('OpenDB', `Connect Successfully To "${this.dbName}" DB`, false);

			// - * openDB > OnSuccess > OnVersionChange* - //
			this.db.onversionchange = () => {
				this.db?.close();
				location.reload();
			};
		};

		// --- * openDB > OnError * --- //
		openReq.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('OpenDB', `Fail Open "${this.dbName}" DB`, true);
		};

		// --- * openDB > OnBlocked * --- //
		openReq.onblocked = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('OpenDB', `Fail To Connect "${this.dbName}" DB`, true);
		};
	};

	// ---------------- * Delete DB * ---------------- //
	deleteDB_sync = (callBacks?: { onsuccess?: (event: Event) => any | null; onerror?: (event?: Event) => any | null }) => {
		if (this.db) {
			this.db.close();
			this.db = null;
		}

		const deleteReq = indexedDB.deleteDatabase(this.dbName);

		// --- * deleteDB > OnSuccess * --- //
		deleteReq.onsuccess = (event) => {
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus) this.log('DeleteDB', `Successfully Deleted "${this.dbName}" DB`, false);
		};

		// --- * deleteDB > OnError * --- //
		deleteReq.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('DeleteDB', `Fail To Delete "${this.dbName}" DB`, true);
		};
	};

	// ---------------- * GetById in ObjectStore * ---------------- //
	getById_sync = (
		objectStoreName: string,
		id: Id,
		callBacks?: {
			onsuccess?: (event: Event, result: any) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName) errorMessage = `ObjectStore Name is Invalid`;
		else if (!id) errorMessage = `Parameter of "id" is Empty in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('GetById', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readonly');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.get(id);

		// --- * GetById In ObjectStore > OnSuccess * --- //
		action.onsuccess = (event) => {
			const result = action.result;
			if (result) {
				if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, result);
				if (this.logStatus) this.log('GetById', `Successfully Get Item "id:${id}" in "${objectStoreName}" ObjectStore`, false);
			} else {
				if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
				if (this.logStatus) this.log('GetById', `Not Exist Item "id:${id}" in "${objectStoreName}" ObjectStore`, true);
			}
		};

		// --- * GetById In ObjectStore > OnError * --- //
		action.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('GetById', `Fail Get Item "id:${id}" in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * GetAll in ObjectStore * ---------------- //
	getAll_sync = (
		objectStoreName: string,
		callBacks?: {
			onsuccess?: (event: Event, result: any) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName) errorMessage = `ObjectStore Name is Invalid`;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('GetAll', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readonly');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.getAll();

		// --- * GetAll In ObjectStore > OnSuccess * --- //
		action.onsuccess = (event) => {
			const result = action.result || [];

			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, result);
			if (this.logStatus) this.log('GetAll', `Successfully Get All Items in "${objectStoreName}" ObjectStore`, false);
		};

		// --- * GetAll In ObjectStore > OnError * --- //
		action.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('GetAll', `Fail Get All Items in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * GetByIndex in ObjectStore * ---------------- //
	getAllByIndex_sync = (
		objectStoreName: string,
		index: string,
		value: Id,
		callBacks?: {
			onsuccess?: (event: Event, result: any) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;
		const findedIndex = findedObjectStore
			? (findedObjectStore.indexes || []).find((itemIndex) => itemIndex.keyPath === index)
			: null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name "${objectStoreName}" is Invalid`;
		else if (!index) errorMessage = `Parameter of "index" is Empty in "${objectStoreName}" ObjectStore `;
		else if (!findedIndex) errorMessage = `Index Of "${index}" not Exist in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('GetAllByIndex', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readonly');
		const objectStore = transaction.objectStore(objectStoreName);

		const indexOfObjectStore = objectStore.index(index);
		const action = indexOfObjectStore.getAll(value);

		// --- * GetAllByIndex In ObjectStore > OnSuccess * --- //
		action.onsuccess = (event) => {
			const result = action.result || [];

			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, result);
			if (this.logStatus)
				this.log(
					'GetAllByIndex',
					`Successfully Get Items By "Index:${index} = ${value}" in "${objectStoreName}" ObjectStore`,
					false,
				);
		};

		// --- * GetAllByIndex In ObjectStore > OnError * --- //
		action.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus)
				this.log('GetAllByIndex', `Fail To Get Items By "Index:${index}=${value}" in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * Put To ObjectStore * ---------------- //
	put_sync = (
		objectStoreName: string,
		data: { [key: string]: any },
		callBacks?: { onsuccess?: (event: Event, id: IDBValidKey) => any | null; onerror?: (event?: Event) => any | null },
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name: "${objectStoreName}" is Invalid`;
		else if (!data) errorMessage = `Parameter of "Data" is Empty in "${objectStoreName}" ObjectStore `;
		else if (!findedObjectStore.autoIncrement && !data?.[findedObjectStore?.keyPath || 'id'])
			errorMessage = `KeyPath "${findedObjectStore?.keyPath || 'id'}" not Exist in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('Put', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.put(data);

		// --- * Put To ObjectStore > OnSuccess * --- //
		transaction.oncomplete = (event) => {
			const id = action.result;
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, id);
			if (this.logStatus) this.log('Put', `Successfully Put Item "id:${id}" to "${objectStoreName}" ObjectStore`, false);
		};

		// --- * Put To ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('Put', `Fail To Put "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * Put Array To ObjectStore * ---------------- //
	putAll_sync = (
		objectStoreName: string,
		data: { [key: string]: any }[],
		callBacks?: { onsuccess?: (event: Event) => any | null; onerror?: (event?: Event) => any | null },
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name: "${objectStoreName}" is Invalid`;
		else if (!data || typeof data !== 'object')
			errorMessage = `Parameter of "Data" is Invalid in "${objectStoreName}" ObjectStore `;
		else if (!findedObjectStore.autoIncrement && !data.every((item) => item?.[findedObjectStore?.keyPath || 'id']))
			errorMessage = `KeyPath "${findedObjectStore?.keyPath || 'id'}" not Exist in "${objectStoreName}" ObjectStore Items`;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('PutAll', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		data.map((item) => {
			objectStore.put(item);
		});

		// --- * PutAll To ObjectStore > OnSuccess * --- //
		transaction.oncomplete = (event) => {
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus) this.log('Put All', `Successfully Put Items to "${objectStoreName}" ObjectStore`, false);
		};

		// --- * PutAll To ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('PutAll', `Fail To Put Items "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * Save To ObjectStore * ---------------- //
	save_sync = (
		objectStoreName: string,
		data: { [key: string]: any },
		callBacks?: { onsuccess?: (event: Event, id: IDBValidKey) => any | null; onerror?: (event?: Event) => any | null },
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name: "${objectStoreName}" is Invalid`;
		else if (!data) errorMessage = `Parameter of "Data" is Empty in "${objectStoreName}" ObjectStore `;
		else if (!findedObjectStore.autoIncrement && !data?.[findedObjectStore?.keyPath || 'id'])
			errorMessage = `KeyPath "${findedObjectStore?.keyPath || 'id'}" not Exist in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('Save', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.add(data);

		// --- * Save To ObjectStore > OnSuccess * --- //
		transaction.oncomplete = (event) => {
			const id = action.result;
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, id);
			if (this.logStatus) this.log('Save', `Successfully Save Item "id:${id}" to "${objectStoreName}" ObjectStore`, false);
		};

		// --- * Save To ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('Save', `Fail To Save "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * Save Array To ObjectStore * ---------------- //
	saveAll_sync = (
		objectStoreName: string,
		data: { [key: string]: any }[],
		callBacks?: { onsuccess?: (event: Event) => any | null; onerror?: (event?: Event) => any | null },
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name: "${objectStoreName}" is Invalid`;
		else if (!data || typeof data !== 'object')
			errorMessage = `Parameter of "Data" is Invalid in "${objectStoreName}" ObjectStore `;
		else if (!findedObjectStore.autoIncrement && !data.every((item) => item?.[findedObjectStore?.keyPath || 'id']))
			errorMessage = `KeyPath "${findedObjectStore?.keyPath || 'id'}" not Exist in "${objectStoreName}" ObjectStore Items`;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('SaveAll', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		data.map((item) => {
			objectStore.add(item);
		});

		// --- * SaveAll To ObjectStore > OnSuccess * --- //
		transaction.oncomplete = (event) => {
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus) this.log('Save All', `Successfully Save Items to "${objectStoreName}" ObjectStore`, false);
		};

		// --- * SaveAll To ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('SaveAll', `Fail To Save Items "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * Edit Item Of ObjectStore * ---------------- //
	edit_sync = (
		objectStoreName: string,
		data: { [key: string]: any },
		callBacks?: { onsuccess?: (event: Event, id: IDBValidKey) => any | null; onerror?: (event?: Event) => any | null },
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;
		const id = data?.[findedObjectStore?.keyPath || 'id'] || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name: "${objectStoreName}" is Invalid`;
		else if (!data) errorMessage = `Parameter of "Data" is Empty in "${objectStoreName}" ObjectStore `;
		else if (!findedObjectStore.autoIncrement && !id)
			errorMessage = `KeyPath "${findedObjectStore?.keyPath || 'id'}" not Exist in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('Edit', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const getAction = objectStore.get(id);

		getAction.onsuccess = (event) => {
			const item = getAction.result;
			if (!item) {
				if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
				if (this.logStatus) this.log('Edit', `Not Exist Item "id:${id}" in "${objectStoreName}" ObjectStore`, true);
				return;
			} else {
				const putAction = objectStore.put(data);
				// --- * Edit Item Of ObjectStore > OnSuccess * --- //
				putAction.onsuccess = (event) => {
					if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event, id);
					if (this.logStatus) this.log('Edit', `Successfully Edit Item "id:${id}" to "${objectStoreName}" ObjectStore`, false);
				};
			}
		};

		// --- * Edit Item Of ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('Edit', `Fail To Edit "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * DeleteById in ObjectStore * ---------------- //
	deleteById_sync = (
		objectStoreName: string,
		id: Id,
		callBacks?: {
			onsuccess?: (event: Event) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName) errorMessage = `ObjectStore Name is Invalid`;
		else if (!id) errorMessage = `Parameter of "id" is Empty in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('Add', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.delete(id);

		// --- * DeleteById In ObjectStore > OnSuccess * --- //
		action.onsuccess = (event) => {
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus)
				this.log('DeleteById', `Successfully Delete Item "id:${id}" in "${objectStoreName}" ObjectStore`, false);
		};

		// --- * DeleteById In ObjectStore > OnError * --- //
		action.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('DeleteById', `Fail Delete Item "id:${id}" in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * DeleteAll in ObjectStore * ---------------- //
	deleteAll_sync = (
		objectStoreName: string,
		callBacks?: {
			onsuccess?: (event: Event) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName) errorMessage = `ObjectStore Name is Invalid`;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('DeleteAll', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const action = objectStore.clear();

		// --- * DeleteAll In ObjectStore > OnSuccess * --- //
		action.onsuccess = (event) => {
			if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
			if (this.logStatus) this.log('DeleteAll', `Successfully Delete All Items in "${objectStoreName}" ObjectStore`, false);
		};

		// --- * DeleteAll In ObjectStore > OnError * --- //
		action.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('DeleteAll', `Fail Delete All Items in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * ReadCursorByIndex in ObjectStore * ---------------- //
	readCursorByIndex_sync = (
		objectStoreName: string,
		index: string,
		value: Id,
		callBacks?: {
			onGetCursor?: (cursor: IDBCursorWithValue) => any | null;
			onsuccess?: (event: Event) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;
		const findedIndex = findedObjectStore
			? (findedObjectStore.indexes || []).find((itemIndex) => itemIndex.keyPath === index)
			: null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name "${objectStoreName}" is Invalid`;
		else if (!index) errorMessage = `Parameter of "index" is Empty in "${objectStoreName}" ObjectStore `;
		else if (!findedIndex) errorMessage = `Index Of "${index}" not Exist in "${objectStoreName}" ObjectStore `;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('ReadCursorByIndex', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const indexOfObjectStore = objectStore.index(index);

		const cursorRequest = indexOfObjectStore.openCursor(value, 'next');

		// --- * ReadCursorByIndex In ObjectStore > OnSuccess * --- //
		cursorRequest.onsuccess = (event) => {
			const cursor = cursorRequest.result || null;

			if (cursor) {
				if (typeof callBacks?.onGetCursor === 'function') callBacks.onGetCursor(cursor);
				// cursor.update({...cursor.value , x:""});
				cursor.continue();
			} else {
				if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
				if (this.logStatus)
					this.log(
						'ReadCursorByIndex',
						`Successfully Get Items By "Index:${index} = ${value}" in "${objectStoreName}" ObjectStore`,
						false,
					);
			}
		};

		// --- * ReadCursorByIndex In ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus)
				this.log('ReadCursorByIndex', `Fail To Get Items By "Index:${index}=${value}" in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * ReadCursorAll in ObjectStore * ---------------- //
	readCursorAll_sync = (
		objectStoreName: string,
		callBacks?: {
			onGetCursor?: (cursor: IDBCursorWithValue) => any | null;
			onsuccess?: (event: Event) => any | null;
			onerror?: (event?: Event) => any | null;
		},
	) => {
		const findedObjectStore = this.objectStores.find((item) => item.name === objectStoreName) || null;

		let errorMessage: string | null = null;
		if (!this.db) errorMessage = `${this.dbName} DB not Connected`;
		else if (!objectStoreName || !findedObjectStore) errorMessage = `ObjectStore Name "${objectStoreName}" is Invalid`;

		if (errorMessage) {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror();
			if (this.logStatus) this.log('ReadCursorAll', errorMessage, true);
			return;
		}

		const transaction = (this.db as IDBDatabase).transaction(objectStoreName, 'readwrite');
		const objectStore = transaction.objectStore(objectStoreName);

		const cursorRequest = objectStore.openCursor();

		// --- * ReadCursorAll In ObjectStore > OnSuccess * --- //
		cursorRequest.onsuccess = (event) => {
			const cursor = cursorRequest.result || null;

			if (cursor) {
				if (typeof callBacks?.onGetCursor === 'function') callBacks.onGetCursor(cursor);
				// cursor.update({...cursor.value , x:""});
				cursor.continue();
			} else {
				if (typeof callBacks?.onsuccess === 'function') callBacks.onsuccess(event);
				if (this.logStatus) this.log('ReadCursorAll', `Successfully Get All Items in "${objectStoreName}" ObjectStore`, false);
			}
		};

		// --- * ReadCursorAll In ObjectStore > OnError * --- //
		transaction.onerror = (event) => {
			if (typeof callBacks?.onerror === 'function') callBacks.onerror(event);
			if (this.logStatus) this.log('ReadCursorAll', `Fail To Get All Items in "${objectStoreName}" ObjectStore`, true);
		};
	};

	// ---------------- * PROMISE => openDB * ---------------- //
	openDB = (
		objectStores: ObjectStore[],
		callBacks?: {
			onupgradeneeded?: (event: IDBVersionChangeEvent, db: IDBDatabase | null) => any;
		},
	) =>
		new Promise((resolve: (result: PromiseResult & { data: IDBDatabase | null }) => any, reject) => {
			this.openDB_sync(objectStores, {
				...callBacks,
				onsuccess: (e) => resolve({ error: false, data: this.db, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => deleteDB * ---------------- //
	deleteDB = () =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.deleteDB_sync({
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => getById * ---------------- //
	getById = (objectStoreName: string, id: Id) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.getById_sync(objectStoreName, id, {
				onsuccess: (e, result) => resolve({ error: false, data: result, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => getAll * ---------------- //
	getAll = (objectStoreName: string) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.getAll_sync(objectStoreName, {
				onsuccess: (e, result) => resolve({ error: false, data: result, event: e }),
				onerror: (e) => resolve({ error: true, data: [], event: e }),
			});
		});

	// ---------------- * PROMISE => getAllByIndex * ---------------- //
	getAllByIndex = (objectStoreName: string, index: string, id: Id) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.getAllByIndex_sync(objectStoreName, index, id, {
				onsuccess: (e, result) => resolve({ error: false, data: result, event: e }),
				onerror: (e) => resolve({ error: true, data: [], event: e }),
			});
		});

	// ---------------- * PROMISE => put * ---------------- //
	put = (objectStoreName: string, data: { [key: string]: any }) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.put_sync(objectStoreName, data, {
				onsuccess: (e, id) => resolve({ error: false, data: id, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => putAll * ---------------- //
	putAll = (objectStoreName: string, data: { [key: string]: any }[]) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.putAll_sync(objectStoreName, data, {
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => save * ---------------- //
	save = (objectStoreName: string, data: { [key: string]: any }) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.save_sync(objectStoreName, data, {
				onsuccess: (e, id) => resolve({ error: false, data: id, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => saveAll * ---------------- //
	saveAll = (objectStoreName: string, data: { [key: string]: any }[]) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.saveAll_sync(objectStoreName, data, {
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => edit * ---------------- //
	edit = (objectStoreName: string, data: { [key: string]: any }) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.edit_sync(objectStoreName, data, {
				onsuccess: (e, id) => resolve({ error: false, data: id, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => deleteById * ---------------- //
	deleteById = (objectStoreName: string, id: Id) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.deleteById_sync(objectStoreName, id, {
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => deleteAll * ---------------- //
	deleteAll = (objectStoreName: string) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.deleteAll_sync(objectStoreName, {
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => readCursorByIndex * ---------------- //
	readCursorByIndex = (objectStoreName: string, index: string, value: Id, onGetCursor?: (cursor: IDBCursorWithValue) => any) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.readCursorByIndex_sync(objectStoreName, index, value, {
				onGetCursor: onGetCursor,
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});

	// ---------------- * PROMISE => readCursorAll * ---------------- //
	readCursorAll = (objectStoreName: string, onGetCursor?: (cursor: IDBCursorWithValue) => any) =>
		new Promise((resolve: (result: PromiseResult) => any, reject) => {
			this.readCursorAll_sync(objectStoreName, {
				onGetCursor: onGetCursor,
				onsuccess: (e) => resolve({ error: false, data: null, event: e }),
				onerror: (e) => resolve({ error: true, data: null, event: e }),
			});
		});
}
