/*
 * @Name: 文件名称
 * @Description: 该文件描述
 * @Author: yangyin
 * @Date: 2022-05-02 11:35:21
 * @Editors: yangyin
 */
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    next()
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const version = 'v1'

// 4.2.3.3 获取标签信息接口
app.get(`/${version}/imageLabel/task/tags`, (req, res) => {
    console.log('获取标签信息接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    let filePath = path.resolve(__dirname + '/annotationTag.json')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('读取 annotaionsTag.json 失败：', err)
            res.send({ code: 500 })
            return
        }
        res.send(JSON.parse(data))
    })
})

// 4.2.3.5 图片接口
app.get(`/${version}/imageLabel/task/data`, (req, res) => {
    res.setHeader('Content-Type', 'binary')
    console.log('图片接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    let imageName = ''

    if (req.query.dataId === '4' || req.query.dataId === '6') {
        imageName = `${req.query.dataId}.webp`
    } else {
        imageName = `${req.query.dataId}.png`
    }

    res.setHeader('filename', imageName)
    res.setHeader('Access-Control-Expose-Headers', 'filename')

    let imagePath = __dirname + '/images/' + imageName
    console.log('imagePath:', imagePath)
    const stream = fs.createReadStream(path.resolve(imagePath))
    const resData = [] //存储文件流
    if (stream) {
        //判断状态
        stream.on('data', function (chunk) {
            resData.push(chunk)
        })
        stream.on('end', function () {
            const finalData = Buffer.concat(resData)
            // response.write(finalData, 'binary')
            console.log('finalData:', finalData)
            res.send(finalData)
        })
    }
})

//  4.2.3.4 获取待处理数据 id
app.get(`/${version}/imageLabel/task/:type`, (req, res) => {
    console.log('获取待处理数据 id 接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    let filePath = path.resolve(__dirname + '/annotationPending.json')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('读取 annotationPending.json 失败：', err)
            res.send({ code: 500 })
            return
        }
        res.send(JSON.parse(data))
    })
})

// 4.2.3.6. 获取指定图片标注结果
app.get(`/${version}/imageLabel/anno/annotation`, (req, res) => {
    console.log('标注结果接口 id 接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    let filePath = path.resolve(__dirname + '/annotations.json')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('读取 annotaions.json 失败：', err)
            res.send({ code: 500 })
            return
        }
        res.send(JSON.parse(data))
    })
})

// 4.2.3.11. 获取图像批注数据接口

app.get(`/${version}/imageLabel/check/getCvComments`, (req, res) => {
    console.log('获取图像批注数据接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    let filePath = path.resolve(__dirname + '/comments.json')
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log('读取 comments.json 失败：', err)
            res.send({ code: 500 })
            return
        }
        res.send(JSON.parse(data))
    })
})

//4.2.3.7. 保存标注结果
app.post(`/${version}/imageLabel/anno/dolabel`, (req, res) => {
    console.log('保存标注结果接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    res.send({
        message: 'OK',
        data: {},
        status: 200,
    })
})

// 审核通过、驳回接口
app.post(`/${version}/imageLabel/check/doCheck`, (req, res) => {
    console.log('审核通过驳回接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    res.send({
        message: 'OK',
        data: {},
        status: 200,
    })
})

// 验收通过、驳回接口
app.post(`/${version}/imageLabel/exam/doExam`, (req, res) => {
    console.log('验收通过驳回接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    res.send({
        message: 'OK',
        data: {},
        status: 200,
    })
})

// 删除图片接口
app.post(`/${version}/imageLabel/anno/drop`, (req, res) => {
    console.log('删除图片接口---------------------')
    console.log('query:', req.query)
    console.log('params:', req.params)
    console.log('body:', req.body)
    res.send({
        message: 'OK',
        data: {},
        status: 200,
    })
})

app.listen(3131, () => {
    console.log('server is on 3131')
})
