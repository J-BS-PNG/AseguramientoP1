const tokenController = {};
const jwt = require('jsonwebtoken');

tokenController.verifyToken = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauthorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauthorized Request');
		}
		const data = jwt.verify(token, 'secretkey');
		if (!data) {
			return res.status(401).send('Unauthorized Request');
		}
		req.id = data.identificacion;
		req.admin = data.admin;
		req.jefatura = data.jefatura;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauthorized Request');
	}
}

module.exports = tokenController;