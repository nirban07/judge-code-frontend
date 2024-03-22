import { useEffect, useState } from 'react';

async function getLogs() {
	const response = await fetch(import.meta.env.VITE_PROD_URL + "logs/", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json' // Set content type to JSON
		},
	})
	const logs = await response.json()
	return logs
}

const Logs = () => {
	const [logs, setLogs] = useState([])
	async function logsSetting() {
		const logList = await getLogs()

		setLogs(await logList)

	}

	useEffect(() => {
		logsSetting()
	}, [])
	return (
		<div>
			<div className='flex justify-around mt-5'>
				<div>
					Username
				</div>
				<div>
					Language Used
				</div>
				<div>
					Std Input
				</div>
				<div>
					Source Code
				</div>
				<div>
					Time stamp
				</div>

			</div>
			{logs.length > 0 ? (
				logs.map((log) => (
					<div key={log.id} className='flex justify-around mt-5'>
						<div>{log.username}</div>
						<div>{log.language}</div>
						<div>{log.stdin}</div>
						<div>{log.stdout}</div>
						<div >{log.createdAt}</div>
					</div>
				))
			) : (
				<div>No logs available</div>
			)}


		</div>
	)
}

export default Logs