import {expect} from 'chai'
import UsersHelper from '../helpers/users.helper'
import TransactionsHelper from '../helpers/transactions.helper'
import {getRandomItem} from '../helpers/common.helper'

describe('Transactions', function() {

    let userHelper = new UsersHelper()
    let transactionsHelper = new TransactionsHelper()
    let senderId
    let receiverId
    let transactionId
    let amount = Math.floor(Math.random() * 200)

    before(async function() {
        await userHelper.create()
        senderId = userHelper.response.body.id
        await userHelper.create()
        receiverId = userHelper.response.body.id
        await transactionsHelper.create(senderId, receiverId, amount)
        transactionId = transactionsHelper.response.body.id
    })

    describe('Transaction creation', function() {
        before(async function() {
            await transactionsHelper.create(senderId, receiverId, amount)
        })
        it('response status code 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })
        it('response body contains transaction id', function() {
            expect(transactionsHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains sender id', function() {
            expect(transactionsHelper.response.body.from).to.eq(senderId)
        })
        it('response body contains receiver id', function() {
            expect(transactionsHelper.response.body.to).to.eq(receiverId)
        })
        it('response body contains initial amount', function() {
            expect(transactionsHelper.response.body.amount).not.to.be.undefined
        })
    })

    describe('Get all transactions', function() {
        before(async function() {
            await transactionsHelper.create(senderId, receiverId, amount)
            await transactionsHelper.getAll()
        })
        it('response status code 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })
        it('response body contains list of 2 or more items', function() {
            expect(transactionsHelper.response.body.length).to.be.at.least(2)
        })
        it('response body array items contains transaction id', function() {
            expect(getRandomItem(transactionsHelper.response.body).id).not.to.be.undefined
        })
        it('response body array items contains sender id', function() {
            expect(getRandomItem(transactionsHelper.response.body).from).not.to.be.undefined
        })
        it('response body array items contains receiver id', function() {
            expect(getRandomItem(transactionsHelper.response.body).to).not.to.be.undefined
        })
        it('response body array items contains amount', function() {
            expect(getRandomItem(transactionsHelper.response.body).amount).not.to.be.undefined
        })
    })
    describe('Get transaction by ID', function() {
        before(async function() {
            await transactionsHelper.getById(transactionId)
        })
        it('response status code 200', function() {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })
        it('response body contains transaction id', function() {
            expect(transactionsHelper.response.body.id).to.eq(transactionId)
        })
        it('response body contains sender id', function() {
            expect(transactionsHelper.response.body.from).to.eq(senderId)
        })
        it('response body contains receiver id', function() {
            expect(transactionsHelper.response.body.to).to.eq(receiverId)
        })
        it('response body array items contains amount', function() {
            expect(transactionsHelper.response.body.amount).to.eq(amount)
        })
    })
})