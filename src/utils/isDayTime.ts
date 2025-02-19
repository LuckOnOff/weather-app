export function isDayTime (time: string): boolean {
	const result = time ? (time >= '05:00:00' && time < '21:00:00') : true;

	return result;
};