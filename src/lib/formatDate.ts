import type { DateField } from '@prismicio/client';

export function formatDate(dateString: DateField): string {
	if (!dateString) return '';

	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	};

	return new Intl.DateTimeFormat('en-UK', options).format(date);
}
