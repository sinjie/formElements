#### 需要全局引入element-ui 依赖，然后直接引入jsonForm.vue 组件就可以使用，
#### props 说明
['config', 'value', 'editReadonlyList', 'isDetailsPage', 'hideList', 'mounted', 'cloneValue']
* config: 
   * 类型： `Object/Function` 
   * 详见 `formConfigDemo.js` 文件
* value: 
   * 类型： `Object`, 
   * 指的是组件的初始化值 , 例： `{a:'1', b:'xx'}`
* editReadonlyList: 
   * 类型： `Array`
   * 表示让某些 prop 对应的组件变成readonly ,一般和value 同时传入用于编辑表单的时候。例： `['a', 'b']`
* isDetailsPage: 
   * 类型： `Boolean`
   * 表示详情模式，该模式下，组件都会变成纯展示状态 
* hideList: 
   * 类型： `Array`
   * 表示让模型 prop 对应的组件隐藏
* mounted: 
   * 类型： `Function` 一个生命周期函数
   * 在jsonForm mounted 时候会执行该函数,例：
   * ```
     第一个产生是所有组件的配置， 第二个是所有表单组件的实例， 第三个是 jsonForm 实例
     function(itemConfigs, itemComponents, jsonForm) {
     // do something
     }
     ```
* cloneValue:
   * 类型： `Boolean`
   * 表示是否要cloneValue 传入的value ,如果要避免表单改动影响到传入的value 对象，就用 `true`

* cloneValue 类型： `Boolean`

#### 获取jsonForm 的表单数据
template
```html

<json-form>(ref="form", :config="config")</json-form>
```
js
```js

{
  // ...
  methods: {
    submit() {
      this.$refs.form.validate().then(value=> {
        console.log(value)
      })
    }
  }
  // ...
}
```