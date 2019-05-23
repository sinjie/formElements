// 基本写法
export const base = {
  gap: '0px', // 每行之间的空隙，不写为自动值
  labelWidth: '130px', // 全局的表单labelWidth，当前为默认值可不写
  columnsCount: 1, // 列数，当前为默认值可不写
  size: 'mini', // 表单控件的大小，当前为默认值可不写
  itemWidth: '100%', // 每项的宽度，当前为默认值可不写
  items: [{
    labelWidth: '130px', // labelWidth，不写的话默认为全局的labelWidth
    isDetailsPage: true, // 显示方式：一般不用写，不写的话与jsonForm组件的isDetailsPage属性一致，
    columnNumber: 1, // 表示表单项要显示到第几列，默认为1,
    rowspan: 1, // 控制表单项占用多行位置，多列布局的时候用，默认为1，
    exist() { // 控制是否存在，默认存在
      return true
    },
    style: { // 样式
      width: '100px'
    },
    type: 'input', // 表单项类型，默认为input
    label: '配置1', // 标签内容
    prop: 'xx', // 绑定字段
    config: {}, // 配置项，每个表单项类型特有
    rules: [{ required: true, message: '请输入xx', trigger: 'blur' }], // 校验规则
    required: true // 必填
  }, {
    type: 'select',
    label: '配置2',
    prop: 'yy',
    config: {
      options: [{ label: 'xxxasdf', value: '11' }], // 如果是方法的话需要返回promise
      optionsValueKey: 'value',
      optionsLabelKey: 'label'
      // remoteMethod(query){return Promise.resolve([])} // 远程搜索方法，有remoteMethod的话就不需要有options了
    }
  }]
}

// 分组

export const groupBase = {
  // ... 没有items，其他所有基本写法属性都有效。
  groupQuoteColor: '#6a737d', // 分组标题装饰颜色，
  groupContentHeight: '100px', // 分组内容高度，不学默认自动
  groupQuoteSize: 16, // 分组标题大小
  groupTheme: 'tabs', // 不写就是折叠区域
  groups: [
    {
      title: 'xxx', // 分组标题
      columnsCount: 1, // 不学默认继承全局的
      // 和基本写法中items 写法一致
      items: []
    }
  ]
}

// 通过闭包传入jsonForm 实例 ,注意不要写成箭头函数这样就拿不到this 了， 这里是一个rules 的例子
export const fnBase = function () {
  // jsonForm 实例
  let that = this
  return {
    // ... 没有items，其他所有基本写法属性都有效。
    groupQuoteColor: '#6a737d', // 分组标题装饰颜色，
    groupContentHeight: '100px', // 分组内容高度，不学默认自动
    groupQuoteSize: 16, // 分组标题大小
    groupTheme: 'tabs', // 不写就是折叠区域
    items: [{
      label: '配置2',
      prop: 'aa',
      rules: [{
        validator() {
          return that.formData.aa < that.formData.bb
        }, message: 'aa 要小于 bb', trigger: 'blur'
      }]
    },
      {
        label: '配置2',
        prop: 'bb',
        rules: [{
          validator() {
            return that.formData.aa < that.formData.bb
          }, message: 'aa 要小于 bb', trigger: 'blur'
        }]
      }]
  }
}
