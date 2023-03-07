import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/animals', () => {
  it('should add an animal', function(done) {
    this.timeout(30000);
    // Arrange
    const animalData = {
      name: 'Test Animal',
      description: 'This is a test animal',
      needs: 'Test needs',
      status: 'available',
      resume: 'Test resume',
      birthdate: '2021-01-01',
    };
    const filePath = path.join(new URL('.', import.meta.url).pathname, 'test_image.jpg');

    // Act
    import('../app').then((app) => {
      chai.request(app.default)
        .post('/api/animals')
        .set('Content-Type', 'multipart/form-data')
        .field('name', animalData.name)
        .field('description', animalData.description)
        .field('needs', animalData.needs)
        .field('status', animalData.status)
        .field('resume', animalData.resume)
        .field('birthdate', animalData.birthdate)
        .attach('photo1', fs.readFileSync(filePath), 'test_image.jpg')
        .end((err, res) => {
          // Assert
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal(animalData.name);
          expect(res.body.description).to.equal(animalData.description);
          expect(res.body.needs).to.equal(animalData.needs);
          expect(res.body.status).to.equal(animalData.status);
          expect(res.body.resume).to.equal(animalData.resume);
          expect(res.body.birthdate).to.equal(animalData.birthdate);
          expect(res.body.photo1).to.match(/^[a-zA-Z0-9]+\.[a-z]+$/);
          done();
        });
    });
  });
});