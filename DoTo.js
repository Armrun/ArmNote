/*
1, 输入框输入 todo 内容，有添加按钮
2, 于下方添加 todo 有完成和删除按钮
3, 保存 todo 数据在 localStorage 中
4, 刷新加载 localstoryage 
*/

var log = function() {
	console.log.apply(console, arguments)
}

// 1, 输入框输入 todo 内容，有添加按钮
	// 1.1 为添加按钮绑定事件
	var addevent = document.querySelector('.add-button')
	console.log(addevent)		
	addevent.addEventListener('click', function(event){
		// add按钮被点击后调用的匿名函数
		var input = document.querySelector('.add-input')
		var inputContent = input.value
		// 把得到的todo显示在下方
		if (inputContent != '') {
			showTodo(inputContent, false)
			input.value = ''
			saveTodo()
		}
		})

	var keyaddevent = document.querySelector('.add-input')
	console.log(keyaddevent)		
	keyaddevent.addEventListener('keydown', function(event){
		// add按钮被点击后调用的匿名函数
		if (event.keyCode == 13) {
			console.log('录入框按键事件',event);
			var input = document.querySelector('.add-input')
			var inputContent = input.value
			// 把得到的todo显示在下方
			if (inputContent != '') {
				showTodo(inputContent, false)
				input.value = ''
				saveTodo()
			}
		}
		})


 	// 把得到的todo信息加到一个设计好的div字符串模板中
 	var insertTodiv = function(todoContent, state) {
 		var x = null
 		if (state) {
 			x = 'done'
 		}
 		var onetodoDiv = `
 			<div class=${x}>
				<button class=finish-button>✅</button>
				<span class=contentSpan>${todoContent}</span>
				<button class=delete-button>✘</button>
			</div>
 		`
 		return onetodoDiv
 	}

// 2, 于下方添加 todo 有完成和删除按钮
	// 2.1 todo 显示添加函数
	var showTodo = function(inputContent, state) {
		var todoHtml = insertTodiv(inputContent, state)
		var containter = document.querySelector('#id-div-todocontainer')
		containter.insertAdjacentHTML('beforeend', todoHtml)
	}

	// 2.2 完成和删除按钮事件委托
	var changeView = document.querySelector('#id-div-todocontainer')
	changeView.addEventListener('click', function(event){
		var tar = event.target
		// console.log('target是什么', tar)
		// 判断是点了完成还是删除按钮
		if(tar.classList.contains('finish-button')) {
			//选中点击完成按钮的div中的span元素
			var p = tar.parentElement
			toggleClass(p, 'done')
			saveTodo()
		} else if (tar.classList.contains('delete-button')) {
			var p = tar.parentElement
			p.remove()
			saveTodo()
		}
	})

	var toggleClass = function(element, className) {
	    // 检查元素是否拥有某个 classs
	    if (element.classList.contains(className)) {
	        // 拥有则删除之
	        element.classList.remove(className)
	    } else {
	        // 没有则加上
	        element.classList.add(className)
	    }
	}  
	
// 3, 保存 todo 数据在 localstoryage 中
	// 3.1 创建保存函数
	var saveTodo = function() {
		var allTodo = document.querySelectorAll('.contentSpan')
		// 清空 Data 重新写入,不然会数据重复
		var Data = []
		for (var i = 0; i < allTodo.length; i++) {
			// 已父节点判断 class 中是否含有 done
			var parent = allTodo[i].parentElement
			Data.push({
				//要保存todo内容和完成情况
				Do: allTodo[i].innerHTML,
				state: parent.classList.contains('done'),
			})
		}
		Data = JSON.stringify(Data)
		localStorage.todoData = Data
		log('保存的数据', localStorage.todoData)
	}
	
	//3.2 创建读取函数
	var loadTodo = function() {
		// 转回列表格式
		var Data = JSON.parse(localStorage.todoData)
		// 用 showTodo 遍历添加
		for (var i = 0; i < Data.length; i++) {
			showTodo(Data[i].Do, Data[i].state)
		}
	}
	// 每次打开或刷新都调用载入函数
	loadTodo()