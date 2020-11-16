const Thesis = require('../../models/Thesis');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Theses', () => {

    const API_ENDPOINT = '/api/theses';

    const validThesisObject = {
        lecturer: '5fb269a4a8707d16e8eb5a5b',
        student: '5fb269a4a8707d16e8eb5a62',
        title: 'Title',
        topic: 'Topic'
    };

    describe(`/GET ${API_ENDPOINT}`, () => {
        it('it should GET all the thesis populated with student and lecturer', (done) => {
            Thesis.countDocuments({}, (err, count) => {
                chai.request(server)
                .get(API_ENDPOINT)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(count);
                    if(count > 0) {
                        res.body[0].should.have.property('lecturer');
                        res.body[0].lecturer.should.be.a('object');
                        res.body[0].should.have.property('student');
                        res.body[0].lecturer.should.be.a('object');
                    }
                    done();
                });
            });
        });
    });

    Object.keys(validThesisObject).forEach(key => {
        describe(`/POST ${API_ENDPOINT}`, () => {
            it(`it should not create a thesis without ${key}`, (done) => {
                let invalidThesisObject = {
                    ...validThesisObject,
                };
                invalidThesisObject[key] = "";
                chai.request(server)
                .post(API_ENDPOINT)
                .send(invalidThesisObject)
                .end((err, res) => {
                    if(key === 'lecturer' || key ==='student') {
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
        it('it should create a thesis because all data is valid', (done) => {
            chai.request(server)
            .post(API_ENDPOINT)
            .send(validThesisObject)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('lecturer');
                res.body.lecturer.should.be.a('object');
                res.body.should.have.property('student');
                res.body.student.should.be.a('object');
                res.body.should.have.property('topic');
                res.body.should.have.property('title');
                done();
            });
        });
    });

    describe(`PUT ${API_ENDPOINT}`, () => {
        it('it should update the first document of the collection', (done) => {
            Thesis.findOne({}, (err, thesis) => {
                let validUpdatedThesisObject = {
                    _id: thesis._id,
                    title: 'Updated title',
                    topic: 'Updated topic'    
                };

                chai.request(server)
                    .put(API_ENDPOINT + '/' + validUpdatedThesisObject._id)
                    .send(validUpdatedThesisObject)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('lecturer');
                        res.body.lecturer.should.be.a('object');
                        res.body.should.have.property('student');
                        res.body.student.should.be.a('object');
                        res.body.should.have.property('topic');
                        res.body.should.have.property('title');
                        done();
                    });
            });
        });
    });

    describe(`DELETE ${API_ENDPOINT}`, () => {
        it('it should delete the first document of the collection', (done) => {
            Thesis.findOne({}, (err, thesis) => {
                chai.request(server)
                    .delete(API_ENDPOINT + '/' + thesis._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('lecturer');
                        res.body.lecturer.should.be.a('object');
                        res.body.should.have.property('student');
                        res.body.student.should.be.a('object');
                        res.body.should.have.property('topic');
                        res.body.should.have.property('title');
                        done();
                    });
            });
        });
    });
});