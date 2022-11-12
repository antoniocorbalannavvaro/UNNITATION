export default (req, res) => {
	res.send({
		url: { type: 'text', label: 'URL' },
		transcriptUrl: { type: 'text', label: 'Transcript URL' },
		numActors: { type: 'number', label: 'Participants' },
		videoDate: { type: 'datetime', label: 'Video date' },
		platform: { type: 'text', label: 'Platform' },
		language: { type: 'text', label: 'Language' }
	});
};
