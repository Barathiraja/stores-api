import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));
import { app } from '../src/main';
chai.should();

const getRandomInt = (base = 100000) => {
    return Math.floor(Math.random() * base)
}

describe("Customers", () => {

    describe("POST", () => {
        it("should  Create a Customer", (done) => {
            chai.request(app)
                .post('/api/v1/customers/')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .send({
                    "Id": getRandomInt(),
                    "StoreId": 4,
                    "Firstname": "Barathi",
                    "Lastname": "Raja",
                    "Phone": "799-53-61",
                    "Email": "barathi@company.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                });
        });
    })
})
