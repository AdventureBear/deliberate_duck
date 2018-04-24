var request = require("request");
var deliberateDuckServer = require("../app.js")
var base_url = "http://localhost:" + process.env.PORT


var server;

describe("Server", () => {
  beforeAll(() => {
    server = require("../app")
  })
  afterAll(() => {
    server.closeServer()
  })

  describe("GET /", () => {
    var data = {};
    beforeAll((done) => {
      request.get(base_url, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body).toContain("Deliberate Duck");
    });
  });


  it("Returns Status Code 200", function(done){
    request.get(base_url, function(err, res, body){
      //console.log("status code:" + res.statusCode)
      expect(res.statusCode).toBe(200)
      done()
    })
  })

  it("returns Deliberate Duck", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(body).toContain("Deliberate Duck")
      done()
    })
  })

})



