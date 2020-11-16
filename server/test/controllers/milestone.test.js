const Milestone = require('../../models/Milestone');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Milestones', () => {

    const API_ENDPOINT = '/api/milestones';

    const validMilestoneObject = {
        thesis: '5fb269f9b7a4882a981f68a2',
        title: 'Milestone title',
        description: 'Milestone description',
        deadline: '2020-11-17'
    };

    describe(`/GET ${API_ENDPOINT}`, () => {
        it('it should GET all the milestones populated with thesis', (done) => {
            Milestone.countDocuments({}, (err, count) => {
                chai.request(server)
                .get(API_ENDPOINT)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(count);
                    if(count > 0) {
                        res.body[0].should.have.property('thesis');
                        res.body[0].lecturer.should.be.a('object');
                        res.body[0].should.have.property('title');
                        res.body[0].should.have.property('description');
                        res.body[0].should.have.property('deadline');
                    }
                    done();
                });
            });
        });
    });

    Object.keys(validMilestoneObject).forEach(key => {
        describe(`/POST ${API_ENDPOINT}`, () => {
            it(`it should not create a milestone without ${key}`, (done) => {
                let invalidMilestoneObject = {
                    ...validMilestoneObject,
                };
                invalidMilestoneObject[key] = "";
                chai.request(server)
                .post(API_ENDPOINT)
                .send(invalidMilestoneObject)
                .end((err, res) => {
                    if(key === 'thesis') {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        done();
                    } else {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors[0].should.be.a('object');
                        res.body.errors[0].should.have.property('path');
                        res.body.errors[0].should.have.property('message');
                        res.body.errors[0].path.should.equal(`${key}`);
                        done();
                    }
                });
            });
        });
    });

    describe(`/POST ${API_ENDPOINT}`, () => {
        it('it should create a milestone because all data is valid', (done) => {
            chai.request(server)
            .post(API_ENDPOINT)
            .send(validMilestoneObject)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('thesis');
                res.body.lecturer.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('deadline');
                done();
            });
        });
    });

    describe(`PUT ${API_ENDPOINT}`, () => {
        it('it should update the first document of the collection', (done) => {
            Milestone.findOne({}, (err, milestone) => {
                let validUpdatedMilestoneObject = {
                    _id: milestone._id,
                    title: 'Updated title',
                    description: 'Updated description',
                    deadline: '2020-12-31'    
                };

                chai.request(server)
                    .put(API_ENDPOINT + '/' + validUpdatedMilestoneObject._id)
                    .send(validUpdatedMilestoneObject)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('thesis');
                        res.body.lecturer.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('deadline');
                        done();
                    });
            });
        });
    });

    describe(`DELETE ${API_ENDPOINT}`, () => {
        it('it should delete the first document of the collection', (done) => {
            Milestone.findOne({}, (err, milestone) => {
                chai.request(server)
                    .delete(API_ENDPOINT + '/' + milestone._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('thesis');
                        res.body.lecturer.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('deadline');
                        done();
                    });
            });
        });
    });
});