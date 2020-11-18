const Lecturer = require('../../models/Lecturer');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Lecturers', () => {

    const API_ENDPOINT = '/api/lecturers';

    const validLecturerObject = {
        neptun: 'POOOOO',
        firstName: 'John',
        lastName: 'Doee',
        username: 'johndoe',
        password: 'itsmejohndoe',
        email: 'john@doe.com'
    };

    describe(`/GET ${API_ENDPOINT}`, () => {
        it('it should GET all the lecturers without password hashes', (done) => {
            Lecturer.countDocuments({}, (err, count) => {
                chai.request(server)
                .get(API_ENDPOINT)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(count);
                    done();
                });
            });
        });
    });

    Object.keys(validLecturerObject).forEach(key => {
        describe(`/POST ${API_ENDPOINT}`, () => {
            it(`it should not create a lecturer without ${key}`, (done) => {
                let invalidLecturerObject = {
                    ...validLecturerObject,
                };
                invalidLecturerObject[key] = "";
                chai.request(server)
                .post(API_ENDPOINT)
                .send(invalidLecturerObject)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors[0].should.be.a('object');
                    res.body.errors[0].should.have.property('path');
                    res.body.errors[0].should.have.property('message');
                    res.body.errors[0].path.should.equal(`${key}`);
                    done();
                });
            });
        });
    });

    describe(`/POST ${API_ENDPOINT}`, () => {
        it('it should create a lecturer because all data is valid', (done) => {
            let lecturer = {
                neptun: 'POOOOO',
                firstName: 'John',
                lastName: 'Doee',
                username: 'johndoe',
                password: 'itsmejohndoe',
                email: 'john@doe.com'
            };
            Lecturer.deleteOne({ neptun: lecturer.neptun }, (err) => {
                chai.request(server)
                .post(API_ENDPOINT)
                .send(lecturer)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('neptun');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('username');
                    res.body.should.have.property('password');
                    res.body.should.have.property('email');
                    done();
                });
            });
        });
    });

    describe(`PUT ${API_ENDPOINT}`, () => {
        it('it should update the first document of the collection', (done) => {
            Lecturer.findOne({}, (err, lecturer) => {
                let validUpdatedLecturerObject = {
                    _id: lecturer._id,
                    username: 'Updated username',
                    firstName: 'Updated firstName',
                    lastName: 'Updated lastName',
                    email: 'updated@email.com',
                    neptun: 'AAAAAA',    
                };

                chai.request(server)
                    .put(API_ENDPOINT + '/' + validUpdatedLecturerObject._id)
                    .send(validUpdatedLecturerObject)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('neptun');
                        res.body.should.have.property('firstName');
                        res.body.should.have.property('lastName');
                        res.body.should.have.property('username');
                        res.body.should.have.property('password');
                        res.body.should.have.property('email');
                        done();
                    });
            });
        });
    });

    // describe(`DELETE ${API_ENDPOINT}`, () => {
    //     it('it should delete the first document of the collection', (done) => {
    //         Lecturer.findOne({}, (err, lecturer) => {
    //             chai.request(server)
    //                 .delete(API_ENDPOINT + '/' + lecturer._id)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('_id');
    //                     res.body.should.have.property('neptun');
    //                     res.body.should.have.property('firstName');
    //                     res.body.should.have.property('lastName');
    //                     res.body.should.have.property('username');
    //                     res.body.should.have.property('password');
    //                     res.body.should.have.property('email');
    //                     done();
    //                 });
    //         });
    //     });
    // });
});