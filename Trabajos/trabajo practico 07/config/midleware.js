const administrador = true;

verificacion = (req, res, next) => {
	if (administrador) {
		console.log("Acceso permitido");
		next();
	} else {
		return res.json({ error: true, mje: "Access denied" });
	}
};

module.exports = verificacion;
