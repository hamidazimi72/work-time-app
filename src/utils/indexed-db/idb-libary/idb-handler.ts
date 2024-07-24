//@ts-nocheck
import { openDB, deleteDB, wrap, unwrap } from './idb';

export class IndexedDB {
	constructor(dbName = 'database', dbVersion = 1, keyPath = 'id') {
		this.keyPath = keyPath;
		this.dbPromise = openDB(dbName, dbVersion, {
			upgrade(db) {
				if (!db.objectStoreNames.contains('store')) db.createObjectStore('store');
			},
		});
	}

	putItem = (data = {}, cb = (data = {}) => {}) => {
		return this.dbPromise.then((db) => {
			const tx = db.transaction('store', 'readwrite');
			const store = tx.objectStore('store');

			return store
				.put(data, data[this.keyPath])
				.then((id) => cb(id ? data : null))
				.catch((err) => cb(null));
		});
	};

	getItem = (key = null, cb = (data = {}) => {}) => {
		return this.dbPromise.then((db) => {
			const tx = db.transaction('store', 'readonly');
			const store = tx.objectStore('store');

			return store
				.get(key)
				.then((data) => cb(data || null))
				.catch((err) => cb(null));
		});
	};

	deleteItem = (key = null, cb = (data = {}) => {}) => {
		return this.getItem(key, (data) => {
			if (!data) return cb(null);

			this.dbPromise.then((db) => {
				const tx = db.transaction('store', 'readwrite');
				const store = tx.objectStore('store');
				return store
					.delete(key)
					.then(() => cb(data))
					.catch((err) => cb(null));
			});
		});
	};

	getAll = (cb = (data = []) => {}) => {
		return this.dbPromise.then((db) => {
			const tx = db.transaction('store', 'readonly');
			const store = tx.objectStore('store');

			return store
				.getAll()
				.then((data) => cb(data || null))
				.catch((err) => cb(null));
		});
	};
}

// const db = await this.dbPromise;
// db.put('store', data, this.storeOptions?.keyPath);
