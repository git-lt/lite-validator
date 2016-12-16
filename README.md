# lite-validator.js

轻量级的验证工具类，做纯数据验证，不操作相关DOM与事件注册，规则配置方便，简单易用

依赖ES6的 `Promise`，如果需要低版本浏览器支持，请使用 `dist/lite-validator.js`


安装

```bash
npm install lite-validator --save
```

ES6 引用

```javascript
import { validForm, validValue, validField } from 'lite-validator'
```

AMD 引用

```javascript
var liteValidator = require('lite-validator');
validForm = liteValidator.validForm;
validValue = liteValidator.validValue;
validField = liteValidator.validField;
```

浏览器引用

```javascript
<script src="../lite-validator/dist/lite-validator-es5.js" type="text/javascript">

<script>
window.liteValidator.validForm
window.liteValidator.validValue
window.liteValidator.validField
</script>
```

## API

- `validForm` 验证整个 `表单`
- `validField` 验证单个 `字段`
- `validValue` 验证单个 `数值`

## validValue

做纯数据的验证，返回 `true` 或 `false`

`validValue(value, ruleName, pms)` 或 `validValue.ruleName(value, pms)`

`value` 数值
`ruleName` 规则名称
`pms` 规则的参数，可以是多个，具体参数见下面的默认规则

```
validValue.required(' ')//false
validValue.qq('123')//false
validValue.phone('1761231221')//false
validValue.email('1761231221')//false
validValue.Length('1761231221', '~5')//false 由于length与函数的length冲突，这里将首字母大写，暂时只有这一个规则是大写
validValue.range('3', '1~5')//true 默认转换为数值类型
···
```


## validField

用于表单中 **单个字段** 的验证，可以 `组合` 多种规则，`异步验证` 某个字段

`validField (formEl, field, rules)`

`formEl` 表单的DOM对象
`field` 可以是字段的 `name` 名称，也可以是字段的DOM对象
`rules` 规则数组

```javascript
let i = 0;
validField(formEl, 'name', [
	['required'],
	[(el)=>{
     window.timmerx = setInterval(()=>console.log(++i), 1000);
     return new Promise((r,j)=>{
      setTimeout(()=>{r(el.value); clearInterval(window.timmerx)}, 3000);
     })}
    ]
  ])
.then(res =>{
  console.log('验证通过:'+res)
})
.catch(err =>{
  console.log(err.msg || '')
})
```


## validForm

用于验证整个表单，默认是遇到验证失败时就停止验证

`validForm(formEl, fieldsRules, validAll)`

`formEl` 表单DOM对象
`fieldRules` 所有字段的验证配置
`validAll` 是否一次性验证所有字段

```javascript

//逐个验证，遇到错误时，停止验证，常用于移动端表单验证
validForm(oFormBox, {
  'uName':[['required'],['length:~10','字符长度过长，请小于10个字符']],
  'uAge': [['required'],['range:25~40','请输入25至40周岁']],
  'uEmail': [['required'],['email']],
  'uBirthday': [['required'],['date']],
  'invalicode': [['required']],
  'uPwd': [['required'],['password']],
  'rePwd': [['required'],['match:uPwd','与密码输入不一致']],
  'address': [['required'],['chinese']],
  'city': [['required'],['checked:1~','至少选择1项']],
})
.then(res=>console.log(res))
.catch(err=>{
	if(err instanceof Error) throw err;
	console.log(err.msg);
})

// 一次性验证所有字段，常用于PC端表单验证
validForm(oFormBox, {
  'uName':[['required'],['length:~10','字符长度过长，请小于10个字符']],
  'uAge': [['required'],['range:25~40','请输入25至40周岁']],
  'uEmail': [['required'],['email']],
  'uBirthday': [['required'],['date']],
  'invalicode': [['required']],
  'uPwd': [['required'],['password']],
  'rePwd': [['required'],['match:uPwd','与密码输入不一致']],
  'address': [['required'],['chinese']],
  'city': [['required'],['checked:1~','至少选择1项']],
}, true)
.then(res=>{
  console.log(res)
})
.catch(err=>{
  console.log(err)
})
```

**验证成功**
返回成功字段的验证信息
如果是遇到错误就停止，则返回一个对象 `{el:inputObj, field:fieldName}`
如果是一次性验证所有字段，则返回这个对象组成的数组

**验证失败**
如果在验证过程中失败，出现异常，则返回异常对象
如果是验证规则失败，则返回，失败的字段信息对象 `{el:inputObj, msg:errmsg, field:fieldName}`
如果是一次性难所有字段，则返回这个对象组成的数组


## 内置规则

### 常用正则

![](http://7xi480.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-12-16%20%E4%B8%8A%E5%8D%8811.22.26.png)

### 必填项
- required	 字段必填

### 整数

- integer 	         整数
- integer(+)	    正整数
- integer(+0) 	正整数和零
- integer(-)	    负整数
- integer(-0)	    负整数和零


### 长度

- length(n)	请填写 n 个字符
- length(n~)	请至少填写 n 个字符
- length(~n)	请最多填写 n 个字符
- length(n1~n2)	请填写 n1 到 n2 个字符

### 选择数量 Checkbox

- checked	必选
- checked(n)	必选 n 项
- checked(n~)	至少选择 n 项
- checked(~n)	最多选择 n 项
- checked(n1~n2)	选择 n1 到 n2 项


### 选择范围
- range(n~)	请填写不小于 n 的数
- range(~n)	请填写不大于 n 的数
- range(n1~n2)	请填写 n1 到 n2 的数

### 过滤

- filter	过滤 `<>"'\` 和字符实体编码的字符


## 过滤隐藏字段和禁用字段

在验证表单时，会先过滤出配置的字段中，不是隐藏或禁用的字段，禁用的字段主要判断，主要判断该表单控件是否有属性 `disabled` 或 class `disabled`


## 自定义规则与提示

在表单验证中，可以配置组合多个验证规则，可以配置验证失败的错误提示，如果不设置，也可以使用默认规则中的配置的提示信息， 如果默认配置中没有，则取该字段的 `placeholder`

```
  'uName':[
      ['required', '请输入姓名1'],
      ['length:2~5', '字符数2到5个'],
      ['integer:+'],
      ['range:1~3', '大于1小于等于3'],
      ['checked:1~', '至少选择1个'],
      ['match:pwd', '和pwd这个字段值必须相同'],
      [/^[Α-￥]+$/, '请输入中文字符'],
      [()=>{return Promise.resolve(1)}, '名称已经存在了']
```

**提示的优先级**
自定义的提示 > 默认规则的配置 > placeholder
