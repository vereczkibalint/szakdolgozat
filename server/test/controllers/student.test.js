const mongoose = require('mongoose');
const Student = require('../../models/Student');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Students', () => {

    const API_ENDPOINT = '/api/students';

    const validStudentObject = {
        neptun: 'POOOOO',
        firstName: 'John',
        lastName: 'Doee',
        username: 'johndoe',
        password: 'itsmejohndoe',
        email: 'john@doe.com'
    };

    describe(`/GET ${API_ENDPOINT}`, () => {
        it('it should GET all the students without password hashes', (done) => {
            Student.countDocuments({}, (err, count) => {
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

    Object.keys(validStudentObject).forEach(key => {
        describe(`/POST ${API_ENDPOINT}`, () => {
            it(`it should not create a student without ${key}`, (done) => {
                let invalidStudentObject = {
                    ...validStudentObject,
                };
                invalidStudentObject[key] = "";
                chai.request(server)
                .post(API_ENDPOINT)
                .send(invalidStudentObject)
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
        it('it should create a student because all data is valid', (done) => {
            let student = {
                neptun: 'POOOOO',
                firstName: 'John',
                lastName: 'Doee',
                username: 'johndoe',
                password: 'itsmejohndoe',
                email: 'john@doe.com'
            };
            Student.deleteOne({ neptun: student.neptun }, (err) => {
                chai.request(server)
                .post(API_ENDPOINT)
                .send(student)
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
            Student.findOne({}, (err, student) => {
                let validUpdatedStudent = {
                    _id: student._id,
                    username: 'Updated username',
                    firstName: 'Updated firstName',
                    lastName: 'Updated lastName',
                    email: 'updated@email.com',
                    neptun: 'AAAAAA',    
                };

                chai.request(server)
                    .put(API_ENDPOINT + '/' + validUpdatedStudent._id)
                    .send(validUpdatedStudent)
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

    describe(`DELETE ${API_ENDPOINT}`, () => {
        it('it should delete the first document of the collection', (done) => {
            Student.findOne({}, (err, student) => {
                chai.request(server)
                    .delete(API_ENDPOINT + '/' + student._id)
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

});