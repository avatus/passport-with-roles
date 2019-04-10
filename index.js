class PassportRoles {
    constructor (path) {
        if (typeof path !== "string" && path !== undefined) {
            throw new TypeError("Path argument must be of type String")
        }
        if (path) {
            this.path = path
        } else {
            this.path = null
        }
    }

    setRolePath (path) {
        if (!path) throw new Error("Path method requires a path")
        if (typeof path !== "string") throw new Error("Path method requires type string")
        this.path = path
        return path
    }

    authorize(roles) {
        if (!roles || roles.length < 1) {
            throw new Error("authorize method requires an array with at least one role item")
        }
        return (req, res, next) => {
            const { user } = req
            const path = this.path ? this.path : "role"
            if (!roles.includes(user[path])) {
                return res.status(403).json({message: "Insufficient privileges"})
            }
            next()
        }
    }

}

module.exports = PassportRoles