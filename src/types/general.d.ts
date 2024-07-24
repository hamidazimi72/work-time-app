//--------------------* !!! *--------------------//
declare type Service_response<Info = any> = {
	[key: string]: any;
	body?: Info;
	statusCode?: number;
	message?: string;
	success?: boolean;
};

//--------------------* !!! *--------------------//
declare type Service_configHandler = {
	onStatus?: (status: Service_status) => any;
	onOk?: (response: any) => any;
	onFail?: (response: any) => any;
	showFailMessage?: boolean;
	failMessage?: string;
	showOkMessage?: boolean;
	okMessage?: string;
};

//--------------------* !!! *--------------------//
declare type Service_data = {
	defaultUri?: boolean | string;
	defaultTimeout?: true | number;
	body?: { [key: string]: any };
	query?: { [key: string]: any };
	param?: { [key: string]: any };
	header?: { [key: string]: any };
	onUploadProgress?: (event: AxiosProgressEvent) => any;
};

//--------------------* !!! *--------------------//
declare type Service_defaultHeader = {
	Authorization: string | null;
	'Accept-Language': string | null;
	'Content-Type': string | null;
};

//--------------------* !!! *--------------------//
declare type Service_status = 'init' | 'loading' | 'fail' | 'ok';

//--------------------* !!! *--------------------//
declare type Action_callbacks = {
	okCB?: (res?: any) => any;
	failCB?: (res?: any) => any;
	statusChangeCB?: (status: Service_status) => any;
};
