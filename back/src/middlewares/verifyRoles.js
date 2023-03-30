const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if (!req?.usuario?.rol) return res.status(401).json({ mensaje: "sin autorización" });
        const rolesArray = [...allowedRoles];
        const result = rolesArray.find(val => val === req.usuario.rol);
        //console.log(result);
        if (!result) return res.status(401).json({ mensaje: "sin autorización" });
        next();
    }
}

module.exports = verifyRoles;