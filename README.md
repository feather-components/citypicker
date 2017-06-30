城市选择器
===============================
 
### Options

*   container: 容器，一般为document.body
*   dom：在指定元素上绑定选择器，通常为input，如果不指定dom，则选择器会直接显示在container中，不会消失，除非手动调用close
*   source：自定义城市列表数据，可参考[city.js](./city.js)数据源
*   className：选择器额外的类名
*   selectedClassName: 选中某个城市后的样式
*   closeAfterSelect：选择后，是否关闭，此参数只有在dom不为空时才会起作用

 
### Events
 
*   select(event, value)
*   open: 打开时触发
*   close：关闭时触发

### Api

*   disable(name|id)：禁用某一个城市
*   enable(name|id)：启用某一个城市
*   open：打开选择器
*   close: 关闭选择器
*   destroy: 摧毁对象
 
### Example

```html
<input type="text" id="citypicker" readonly="readonly" />

<script>
$('#citypicker').citypicker({
    closeAfterSelect: false
}).on('citypicker:select', function(event, v, a){
    console.log(v, a);
    $(this).citypicker('disable', v);
}).citypicker('disable', '盐城');
</script>
```
