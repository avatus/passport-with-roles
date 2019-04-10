const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')
const PassportWithRoles = require('./index')

let sandbox = null

describe('PassportWithRoles', () => {

    const req = {
        user: {
            role: "testing"
        }
    }

    const res = {
        json: function() {
            return this
        },
        status: function() {
            return this
        }
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })


    it('should instantiate an object without path parameters', () => {
        const hasRoles = new PassportWithRoles()

        expect(hasRoles.path).to.equal(null)
    })

    it('should instantiate an object with path parameters', () => {
        const hasRoles = new PassportWithRoles("role")

        expect(hasRoles.path).to.equal("role")
    })

    it('should throw if parameter is not a string', () => {
        expect(() => new PassportWithRoles({bad: "param"})).to.throw("Path argument must be of type String")
    });

    it('should update path', () => {
        const hasRoles = new PassportWithRoles("role")

        hasRoles.setRolePath("testing")

        expect(hasRoles.path).to.equal("testing")
    })

    it('should throw error if path is missing', () => {
        const hasRoles = new PassportWithRoles("role")

        expect(() => hasRoles.setRolePath()).to.throw()
    })

    it('should throw error if path is not of type string', () => {
        const hasRoles = new PassportWithRoles("role")
        expect(() => hasRoles.setRolePath(["testing"])).to.throw()
    })

    it('should throw error if authorize is not supplied an array with at least one element', () => {
        const hasRoles = new PassportWithRoles("role")
        sandbox.spy(res, 'status')

        expect(() => hasRoles.authorize()(req, res)).to.throw()
    })

    it('should return error if request user is not included in roles array', () => {
        const hasRoles = new PassportWithRoles("role")
        sandbox.spy(res, 'status')

        hasRoles.authorize(["admin"])(req, res)

        expect(res.status.calledWith(403)).to.equal(true)

    })

    it('should continue the chain if requested user is included in roles array', () => {
        const hasRoles = new PassportWithRoles("role")
        const next = sandbox.spy()
        sandbox.spy(res, 'status')

        hasRoles.authorize(["testing"])(req, res, next)

        expect(next.calledOnce).to.equal(true)

    })
})