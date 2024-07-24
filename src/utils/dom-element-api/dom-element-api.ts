export class DomElementAPI {
	private _element: HTMLElement;

	constructor(tagName: keyof HTMLElementTagNameMap) {
		this._element = document.createElement(tagName);
	}

	get element() {
		return this._element;
	}

	set element(value: HTMLElement) {
		this._element = value;
	}

	setProperties = (properties: {
		id?: string;
		className?: string;
		styles?: Partial<{ [key in keyof CSSStyleDeclaration]: string }>;
		attributes?: { [key: string]: string };
	}) => {
		if (properties?.id) this._element.id = properties.id;
		if (properties?.className)
			properties.className.split(' ').map((item) => {
				if (item) this._element.classList.add(item);
			});
		if (properties?.styles)
			Object.entries(properties.styles).map(([key, value]) => {
				this._element.style[key] = value;
			});
		if (properties?.attributes)
			Object.entries(properties.attributes).map(([key, value]) => {
				this._element.setAttribute(key, value);
			});
	};

	addClassname = (classnames: string) => {
		(classnames || '').split(' ').map((item) => {
			if (item) this._element.classList.add(item);
		});
	};

	toggleClassname = (classnames: string) => {
		(classnames || '').split(' ').map((item) => {
			if (item) this._element.classList.toggle(item);
		});
	};

	removeClassname = (classnames: string) => {
		(classnames || '').split(' ').map((item) => {
			if (item) this._element.classList.remove(item);
		});
	};
}
