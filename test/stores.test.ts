import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));
import { app } from '../src/main';
chai.should();

describe("stores", () => {
    describe("GET /", () => {

        it("should Retrieve list of Stores", (done) => {
            chai.request(app)
                .get('/api/v1/stores')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });

        it("should Retrieve list of Stores w/ total customers count", (done) => {
            chai.request(app)
                .get('/api/v1/stores?customercount=true')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });

        it("should Retrieve a Store by ID", (done) => {
            chai.request(app)
                .get('/api/v1/stores/1')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .end((err, res) => {
                    console.log('err')
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                });
        });

        it("should Retrieve a Stores Customers", (done) => {
            chai.request(app)
                .get('/api/v1/stores/1/customers')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .end((err, res) => {
                    console.log('err')
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });

        it("should Search for Store", (done) => {
            chai.request(app)
                .get('/api/v1/stores/Divape/search')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .end((err, res) => {
                    console.log('err')
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        });
    })
    describe("PUT", () => {
        it("should  Update a Store", (done) => {
            chai.request(app)
                .put('/api/v1/stores/1')
                .set('x-api-key', 'Yn8uMnIhcg==.')
                .send({
                    "Id": 1,
                    "Phone": "8-772-453-83-20",
                    "Name": "Latz",
                    "Domain": "barathi.com",
                    "Status": "true",
                    "Street": "Cody Park 22",
                    "State": "TamilNadu"
                })
                .end((err, res) => {
                    console.log('err')
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                });
        });
    })
})

