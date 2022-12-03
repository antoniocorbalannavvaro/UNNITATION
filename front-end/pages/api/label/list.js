/* TODO */

const dummyLabels = [
	{
		name: 'Happy',
		emojiUnicode: '😄'
	},
	{
		name: 'Sad',
		emojiUnicode: '😄'
	},
	{
		name: 'Annoyed',
		emojiUnicode: '😒'
	},
	{
		name: 'Thrilled',
		emojiUnicode: '🤗'
	}
];

export default async (req, res) => {
	res.json(dummyLabels);
};
