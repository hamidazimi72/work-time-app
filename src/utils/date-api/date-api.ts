import { Convert, prototypes } from '@utils';

type GeoDateResult = {
	standardFullDate: string;
	standardDate: string;
	standardTime: string;
	year: string;
	month: string;
	day: string;
	monthName: string;
	dayName: string;
	hours: string;
	minutes: string;
	seconds: string;
	timeStamp: number;
	utc: string;
	iso: string;
};

type JalaaliDateResult = {
	standardFullDate: string;
	standardDate: string;
	standardTime: string;
	year: string;
	month: string;
	day: string;
	monthName: string;
	dayName: string;
	hours: string;
	minutes: string;
	seconds: string;
	timeStamp: number;
};

export class DateAPI {
	//

	static jalaaliToGregorian = (
		jalaaliDate: string = '',
		// setting?: { iranLocalTime?: boolean },
	): GeoDateResult | null => {
		const isValidDate = /^\d{4}[-/:.]{0,1}\d{2}[-/:.]{0,1}\d{2}/.test(jalaaliDate);

		if (!isValidDate) return null;

		// const iranLocalTime = setting?.iranLocalTime || false;
		const dateSeprate =
			(jalaaliDate[4] === '/' && '/') || (jalaaliDate[4] === '-' && '-') || (jalaaliDate[4] === ':' && ':') || null;

		const [JY, JM, JD]: any[] = dateSeprate
			? [jalaaliDate.slice(0, 4), jalaaliDate.slice(5, 7), jalaaliDate.slice(8, 10)]
			: [jalaaliDate.slice(0, 4), jalaaliDate.slice(4, 6), jalaaliDate.slice(6, 8)];

		const parseIntAny: any = parseInt;

		const [JY_valid, JM_valid, JD_valid] = [
			/^1[0-9]{3}$/.test(JY),
			parseInt(JM) > 0 && parseInt(JM) < 13,
			parseInt(JD) > 0 && parseInt(JD) < 32,
		];

		if (!JY_valid || !JM_valid || !JD_valid) return null;

		const [jy, jm, jd]: any[] = [parseIntAny(JY) - 979, parseIntAny(JM) - 1, parseIntAny(JD) - 1];

		const gd_inMonth: any[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const jd_inMonth: any[] = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

		let jd_num: any = 365 * jy + parseIntAny(jy / 33) * 8 + parseIntAny(((jy % 33) + 3) / 4);
		for (var i = 0; i < jm; ++i) jd_num += jd_inMonth[i];
		jd_num += jd;
		let gd_n: any = jd_num + 79;

		let gy = 1600 + 400 * parseIntAny(gd_n / 146097);
		gd_n = gd_n % 146097;

		let leap = true;
		if (gd_n >= 36525) {
			gd_n--;
			gy += 100 * parseIntAny(gd_n / 36524);
			gd_n = gd_n % 36524;

			if (gd_n >= 365) gd_n++;
			else leap = false;
		}

		gy += 4 * parseIntAny(gd_n / 1461);
		gd_n %= 1461;

		if (gd_n >= 366) {
			leap = false;

			gd_n--;
			gy += parseIntAny(gd_n / 365);
			gd_n = gd_n % 365;
		}

		for (var i = 0; gd_n >= gd_inMonth[i] + (i == 1 && leap); i++) gd_n -= gd_inMonth[i] + (i == 1 && leap);
		let gm: any = i + 1;
		let gd = gd_n + 1;

		gm = gm < 10 ? '0' + gm : gm;
		gd = gd < 10 ? '0' + gd : gd;

		//TIME
		const isValidTime = /^\d{4}[-/:]{0,1}\d{2}[-/:]{0,1}\d{2} \d{2}[:]{1}\d{2}[:]{1}\d{2}/.test(jalaaliDate);
		const time = isValidTime ? jalaaliDate.slice(11) : '00:00:00';

		const dateISO = `${gy}-${gm}-${gd} ${time}:000Z`;

		const notDecreasedOffsetDate: any = new Date(dateISO); // iran Time
		const decreasedOffsetDate: any = new Date(this.iranLocalTimeFromDate(dateISO));

		const result: any = new Date(this.iranLocalTimeFromDate(decreasedOffsetDate));

		if (!result || !Date.parse(result)) return null;
		console.log(result);

		const year = String(decreasedOffsetDate.getFullYear());
		const month = String(
			decreasedOffsetDate.getMonth() + 1 > 9 ? decreasedOffsetDate.getMonth() + 1 : `0${decreasedOffsetDate.getMonth() + 1}`,
		);
		const day = String(decreasedOffsetDate.getDate() > 9 ? decreasedOffsetDate.getDate() : '0' + decreasedOffsetDate.getDate());
		const hours = String(
			decreasedOffsetDate.getHours() > 9 ? decreasedOffsetDate.getHours() : '0' + decreasedOffsetDate.getHours(),
		);
		const minutes = String(
			decreasedOffsetDate.getMinutes() > 9 ? decreasedOffsetDate.getMinutes() : '0' + decreasedOffsetDate.getMinutes(),
		);
		const seconds = String(
			decreasedOffsetDate.getSeconds() > 9 ? decreasedOffsetDate.getSeconds() : '0' + decreasedOffsetDate.getSeconds(),
		);
		const standardFullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		const standardDate = `${year}-${month}-${day}`;
		const standardTime = `${hours}:${minutes}:${seconds}`;
		const monthName = prototypes.geoMonthProtoType[decreasedOffsetDate.getMonth() + 1];
		const dayName = prototypes.geoWeekProtoType[decreasedOffsetDate.getDay() + 1];
		const timeStamp = Date.parse(decreasedOffsetDate);
		const utc = decreasedOffsetDate.toUTCString();
		const iso = decreasedOffsetDate.toISOString();

		// 		? String(decreasedOffsetDate)
		// 		: String(new Date(this.iranLocalTimeFromDate(decreasedOffsetDate))).replace(/GMT[+]\d{4}.{0,}/, 'GMT+0000');

		return {
			standardFullDate,
			standardDate,
			standardTime,
			year,
			month,
			day,
			monthName,
			dayName,
			hours,
			minutes,
			seconds,
			timeStamp,
			utc,
			iso,
		};
	};

	static gregorianToJalaali = (
		gregorianDate: string | Date,
		setting?: {
			isUnformattedIranTime: boolean;
		},
	): JalaaliDateResult | null => {
		const isUnformattedIranTime = setting?.isUnformattedIranTime || false;

		const gregorian: any = new Date(gregorianDate);

		if (!gregorian || !Date.parse(gregorian)) return null;

		const formattedGregorian = isUnformattedIranTime ? new Date(this.increaseIranOffsetToDate(gregorian)) : gregorian;

		const date: any = Convert.faDigitToEn(formattedGregorian.toLocaleDateString('fa-IR'));
		const time: any = Convert.faDigitToEn(formattedGregorian.toLocaleTimeString('fa-IR'));

		let [Y, M, D, h, m, s] = [
			date.match(/^\d{4}/)[0],
			date.match(/\/\d{1,2}\//)[0].replace(/\//g, ''),
			date.match(/\/\d{1,2}$/)[0].replace(/\//g, ''),
			time.match(/^\d{1,2}/)[0].replace(/:/g, ''),
			time.match(/:\d{1,2}:/)[0].replace(/:/g, ''),
			time.match(/:\d{1,2}$/)[0].replace(/:/g, ''),
		];

		const year = Y;
		const month = M.length === 2 ? M : '0' + M;
		const day = D.length === 2 ? D : '0' + D;
		const hours = h.length === 2 ? h : '0' + h;
		const minutes = m.length === 2 ? m : '0' + m;
		const seconds = s.length === 2 ? s : '0' + s;

		const standardDate = `${year}/${month}/${day}`;
		const standardTime = `${hours}:${minutes}:${seconds}`;
		const standardFullDate = `${standardDate} - ${standardTime}`;

		const timeStamp = Date.parse(formattedGregorian);

		return {
			standardFullDate,
			standardDate,
			standardTime,
			year,
			month,
			day,
			monthName: prototypes.monthProtoType[Number(month)],
			dayName: prototypes.weekProtoType[formattedGregorian.getDay() + 1],
			hours,
			minutes,
			seconds,
			timeStamp,
		};
	};

	static iranLocalTimeFromDate = (iranTimeZoneInput: string | Date) => {
		const date: any = new Date(iranTimeZoneInput);

		if (!date || !Date.parse(date)) {
			console.error('input date invalid');
			return iranTimeZoneInput;
		}

		const iranTimeZoneISO = date.toISOString();

		const iranTimeZoneTime = Convert.faDigitToEn(new Date(iranTimeZoneISO.slice(0, 10)).toLocaleTimeString('fa-IR')) || '0:0:0';
		const [iranHours, iranMinutes, iranSeconds] = [
			(iranTimeZoneTime.match(/^\d{1,2}/) || '0')[0].replace(/:/g, ''),
			(iranTimeZoneTime.match(/:\d{1,2}:/) || '0')[0].replace(/:/g, ''),
			(iranTimeZoneTime.match(/:\d{1,2}$/) || '0')[0].replace(/:/g, ''),
		];

		const [iranHours_ts, iranMinutes_ts, iranSeconds_ts] = [
			+iranHours * 60 * 60 * 1000,
			+iranMinutes * 60 * 1000,
			+iranSeconds * 1000,
		];

		const iranGapOffset_ts = iranHours_ts + iranMinutes_ts + iranSeconds_ts;
		const iranTimeZone_ts = Date.parse(date);

		const londonTimeZone_ts = iranTimeZone_ts - iranGapOffset_ts;
		const londonTimeZone = new Date(londonTimeZone_ts).toISOString();

		return londonTimeZone;
	};

	static increaseIranOffsetToDate = (inputDate: string | Date) => {
		const date: any = new Date(inputDate);

		if (!date || !Date.parse(date)) {
			console.error('input date invalid');
			return inputDate;
		}

		const dateISO = date.toISOString();

		const iranTimeZoneTime = Convert.faDigitToEn(new Date(dateISO.slice(0, 10)).toLocaleTimeString('fa-IR')) || '0:0:0';
		const [iranHours, iranMinutes, iranSeconds] = [
			(iranTimeZoneTime.match(/^\d{1,2}/) || '0')[0].replace(/:/g, ''),
			(iranTimeZoneTime.match(/:\d{1,2}:/) || '0')[0].replace(/:/g, ''),
			(iranTimeZoneTime.match(/:\d{1,2}$/) || '0')[0].replace(/:/g, ''),
		];

		const [iranHours_ts, iranMinutes_ts, iranSeconds_ts] = [
			+iranHours * 60 * 60 * 1000,
			+iranMinutes * 60 * 1000,
			+iranSeconds * 1000,
		];

		const iranGapOffset_ts = iranHours_ts + iranMinutes_ts + iranSeconds_ts;
		const iranTimeZone_ts = Date.parse(date);

		const londonTimeZone_ts = iranTimeZone_ts + iranGapOffset_ts;
		const londonTimeZone = new Date(londonTimeZone_ts).toISOString();

		return londonTimeZone;
	};
}
