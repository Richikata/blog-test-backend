export default (): any => ({
  database: {
    readHost: process.env.DB_READ_HOST,
		writeHost: process.env.DB_WRITE_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		port: parseInt(process.env.DB_PORT, 10) || 3306,
  }
})