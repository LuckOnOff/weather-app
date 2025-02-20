const possibleTypes: Record<string, string> = {
	'city': 'город',
	'administrative': 'округ',
	'town': 'городок',
	'village': 'деревня',
	'hamlet': 'поселение',
	'country': 'страна',
	'state': 'область',
	'region': 'регион',
	'postcode': 'почтовый индекс',
	'neighborhood': 'район',
	'landmark': 'достопримечательность',
	'road': 'улица',
	'building': 'здание',
	'place': 'местность',
	'suburb': 'пригород',
	'halt': 'платформа',
	'tomb': 'могила',
	'attraction': 'аттракцион',
	'yes': ''
};

export function getTranslatePlaceType(type: string): string {
	return possibleTypes[type];
};