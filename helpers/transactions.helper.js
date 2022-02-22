import supertest from 'supertest'


class TransactionsHelper {
    constructor() {
        this.response = null;
    }

    async create(senderId, receiverId, amount) {
        await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({from: senderId, to: receiverId, amount: amount})
            .then(res => {
                this.response = res
            })
    }
    async getAll() {
        await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
    async getById(transactionId) {
        await supertest(process.env.BASE_URL)
            .get(`/transactions?id=${transactionId}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
}

export default TransactionsHelper