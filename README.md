# promise
###个人理解

```
promise :一种异步函数的解决方案，避免了异步函数层层嵌套，将原来异步函数转换为便于理解和阅读的链式步骤关系。
  。三种状态：Pending(进行中)、Resoloved(已完成)、Rejected(已失败)
  。两种结果：Pending-》Resoloved; Pending-》Rejected
  。then方法：第一个参数是成功是调用的函数，第二个参数是失败时调用的函数
步骤
  resolve(解决)
  reject(拒绝)
    var promise = new Promise(function(resolve, reject){
      if(条件成立){
        // Pending -> Resoloved
        resolve('kkk');
      }else{
        // Pending -> Rejected
        reject()
      }
    })

    promise.then(function(val){
      //第一个参数成功时 调用的
      console.log(val)  // kkk
      return promise   // 成功时 继续往下 调用
    },function(){
      //第二个参数失败调用的
      // 失败一般不处理，要处理看需求
    })

    // then一般这样写，用链式写法
    promise.then(function(val){
      console.log(val)  // kkk
      return promise;
    }).then(function(){
        console.log('bbb') // bbb
        return promise;
    }).then(function(){
        console.log('ccc')  // ccc
    })
```

##例子

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="node_modules/jquery/dist/jquery.js" charset="utf-8"></script>
</head>
<body>
<h2>显现数据</h2>
<div id="div">

</div>
</body>
</html>
<script>
		var oDiv = document.getElementById('div');

		var name2 = [], age2 = [], citys2 = [];
		// $.ajax({
		// 	type:'GET',
		// 	url:'/name',
		// 	success:function(data){
		// 		data = JSON.parse(data)
		// 		name2 = data.name;
		// 		console.log(name2)
		// 		$.ajax({
		// 			type:'GET',
		// 			url:'/age',
		// 			success:function(data){
		// 				data = JSON.parse(data)
		// 				age2 = data.age;
		//
		// 				$.ajax({
		// 					type:'GET',
		// 					url:'/citys',
		// 					success:function(data){
		// 						data = JSON.parse(data)
		// 						citys2 = data.citys;
		//
		// 						var str = '';
		// 						name2.forEach(function(ele,index){
		// 							str += '<h2>'+name2[index]+'在'+citys2[index]+'今年'+age2[index]+'岁了'+'</h2>'
		// 						})
		// 						oDiv.innerHTML = str;
		// 					}
		// 				})
		//
		// 			}
		// 		})
		//
		// 	}
		// })

		// promise 写法


		function getData(URL){
			var promise = new Promise(function(resolve, reject){

					$.ajax({
						type:'GET',
						url:URL,
						success:function(data){
							data = JSON.parse(data)
							if(data.status == 1){ // 如果 数据里面 status 对于 1 也就是，有这个数据
								resolve(data);		// 执行 成功的方法
							}else{
								reject(data.msg) // 执行 失败的方法
							}


						}
					})

			})
			return promise;



		}

		// getData('name').then(function(data){ //  /name 也行
		// 	console.log(data)
		// 	return getData('age'); //{status: 1, msg: "success", name: Array[3]}
		// }).then(function(data){
		// 	console.log(data)      // {status: 1, msg: "success", age: Array[3]}
		// 	return getData('citys')
		// }).then(function(data){
		// 	console.log(data)      //  {status: 1, msg: "success", citys: Array[3]}
		// })

		//这个结果上前两个演化过来的 promise
		getData('name').then(function(data){ //  /name 也行

			name2 = data.name;
			return getData('age');
		}).then(function(data){

			age2 = data.age;
			return getData('citys')
		}).then(function(data){

			citys2 = data.citys;

			var str = '';
			name2.forEach(function(ele,index){
				str += '<h2>'+name2[index]+'在'+citys2[index]+'今年'+age2[index]+'岁了'+'</h2>'
			})
			oDiv.innerHTML = str;
		})
</script>

```
