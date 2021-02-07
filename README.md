
### 如何判断是一个普通对象

```javascript
export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// formData、arrayBuffer、Blob等，typeof时也是object,因此上面的方法并不严谨
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
```

### 前端向后端传递流数据

```javascript
// ArrayBuffer
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
```

后端可以通过如下接受流，但是这种ArrayBuffer的传递在浏览器是无法看到数据的
```javascript
router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
```
