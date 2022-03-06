export const convertDate = (str) => {
	str = str.toString();
	let parts = str.split(' ');
	let months = {
		Jan: '01',
		Feb: '02',
		Mar: '03',
		Apr: '04',
		May: '05',
		Jun: '06',
		Jul: '07',
		Aug: '08',
		Sep: '09',
		Oct: '10',
		Nov: '11',
		Dec: '12',
	};
	return `${parts[3]}-${months[parts[1]]}-${parts[2]} ${parts[4]}`;
};

export const convertNewDate = (str) => {
	str = str.toString();
	let parts = str.split(' ');
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	return `${parts[2]} ${months[parts[1]]} ${parts[0]}`;
};

export const getFormattedDate = (str) => {
	const formatTIme = str.split('T');
	const date = formatTIme[0];
	const time = formatTIme[1];

	const splitDate = date.split('-').reverse().join('-');

	const splitTime = time.split('.')[0];

	const b = splitTime.split(':');

	const fullTime = `${b[0]}:${b[1]}`;

	return { splitDate, fullTime };
};
