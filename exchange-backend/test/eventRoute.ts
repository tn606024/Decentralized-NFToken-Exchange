import chai from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";

const expect = chai.expect;

chai.use(chaiHttp);

describe("test eventRoute functions", () => {
    it("test getUserNFTTokens", (done) => {
        chai.request("http://127.0.0.1:3000")
            .get("/event/tokens/0x89fBF9dA0a7B47C16c32e0FE87e99339e89510C6")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                const data = res.body;
                expect(data).to.have.lengthOf(1);
                const token = data[0];
                expect(token).to.have.property("contractAddress");
                expect(token).to.have.property("tokenId");
                expect(token).to.have.property("_id");
                done();
            });
    });
    it("test getUserOrders", (done) => {
        chai.request("http://127.0.0.1:3000")
            .get("/event/orders/0x89fBF9dA0a7B47C16c32e0FE87e99339e89510C6")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                const data = res.body;
                expect(data).to.have.lengthOf(1);
                const order = data[0];
                const { match } = order;
                expect(order).to.have.property("match");
                expect(order).to.have.property("contractAddress");
                expect(order).to.have.property("tokenId");
                expect(order).to.have.property("_id");
                expect(match[0]).to.have.property("contractAddress");
                expect(match[0]).to.have.property("tokenId");
                expect(match[0]).to.have.property("_id");
                done();
            });
    });
    it("test getUserMatchOrders", (done) => {
        chai.request("http://127.0.0.1:3000")
            .get("/event/matchOrders/0x457Cf662b8334C0AB1a382901a93481e5027B0a6")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                const data = res.body;
                console.log(data);
                expect(data).to.have.lengthOf(1);
                const order = data[0];
                const { want } = order;
                expect(order).to.have.property("match");
                expect(order).to.have.property("contractAddress");
                expect(order).to.have.property("tokenId");
                expect(order).to.have.property("_id");
                expect(want[0]).to.have.property("contractAddress");
                expect(want[0]).to.have.property("tokenId");
                expect(want[0]).to.have.property("_id");
                expect(want[0]).to.have.property("order");
                done();
            });
    });
});
