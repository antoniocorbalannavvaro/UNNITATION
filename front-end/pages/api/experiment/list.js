/* TODO */

const dummyExperiments = [
	{
		name: 'Experiment 1',
		chunkTime: 10,
		users: [  ],	/* TBD */
		videos: [  ],	/* TBD */
		labels: [  ]	/* TBD */
	},
	{
		name: 'Experiment 2',
		chunkTime: 15,
		users: [  ],	/* TBD */
		videos: [  ],	/* TBD */
		labels: [  ]	/* TBD */
	},
	{
		name: 'Experiment 3',
		chunkTime: 5,
		users: [  ],	/* TBD */
		videos: [  ],	/* TBD */
		labels: [  ]	/* TBD */
	}
];

export default async (req, res) => {
	res.json(dummyExperiments);
};
