/*
	<li>
		<input type="checkbox" />
		<div>
			<span></span>
			<span></span>
		</div>
		<p></p>
	</li>
*/
/*
	写操作：
		data-xxx = "123"  给行间添加属性
	读操作:
		console.log(dataset.xxx) ->  123
	
*/
const email = document.getElementById('email');//获取到需要生成结构的盒子
list.forEach(e=>e.check = false); //添加选中的状态。
render(list); //第一次渲染


function render(list){
	//生成数据
	let html = '';
	list.forEach(e=>{
		html += `<li data-index="${e.id}" class="${e.check?'active':''}">
			<input type="checkbox" id="${e.id}" ${e.check?'checked':''} />
			<div>
				<span>${e.caption}</span>
				<span>${e.time}</span>
			</div>
			<p>${e.desc}</p>
		</li>`;
	});
	email.innerHTML = html;
	//点击操作
	const inputs = email.getElementsByTagName('input');//获取到email下的五个input
	for(let i=0;i<inputs.length;i++){
		//每个input内容变化的时候
		inputs[i].onchange = function(){
			let _this = this;//把当前的存在变量_this里  方便下面代码的比较
			//map方法返回新的数组  list
			list = list.map(e=>{
				//如果list里的id==inputs里的id的时候，那就让list下的check的值==inputs 的checked值
				if(e.id == _this.id){
					e.check = _this.checked
				}
				return e;//因为是要返回新数组的值  所以要return
			});
			//通过数据中每个的check值来设置all是否选中
			//every方法测试list下的check情况   都是true   all.checked也是true  有一个是false all.checked就是false 
			all.checked = list.every(e=>e.check);
			render(list);
		}
	}
}

//全选内容发生变化的时候
all.onchange = function(){
	list.forEach(e=>e.check = all.checked);//全选选中  list下的check都是true   就是五个input都选中 全选没选中  就是五个input都不选中
	render(list);
}
let onOff = false;//首先声明开关  默认不碰撞
//
email.onmousedown = function(ev){
	if(ev.target.tagName == 'INPUT')return;//防止点击的是input
	let li = getLi(ev.target);//调用下面的getLi()  得到当前点击选中的li
	let o = list.some(e=>{
		//测试list下的id有没有==li下的data-index   有就返回选中的input存在变量o里
		if(e.id == li.dataset.index){
			return e.check;
		}
	});
	//如果有input选中的点击时 hinit3才出现并且跟着鼠标位置走
	//如果li为选中的让拖拽的元素到坐标点
	if(o){
		let f = list.filter(e=>e.check);//将list下check是true的存在f里
		hint3.innerHTML = '选中'+ (f.length) +'封邮件';//hint3里内容 里的数量==f的长度  就是被选中的input数量
		hint3.style.display = 'block';
		hint3.style.left = ev.pageX + 'px';//hint3跟着鼠标的位置走
		hint3.style.top = ev.pageY + 'px';
	}
	document.onmousemove = function(ev){
		//调用bong()函数   方便碰撞
		if( bong(hint3,delebox) ){
			onOff = true;
		}else{
			onOff = false;
		}
		hint3.style.left = ev.pageX + 'px';//hint3跟着鼠标的位置走
		hint3.style.top = ev.pageY + 'px';
	}
	document.onmouseup = function(){
		hint3.style.display = 'none';//鼠标抬起的时候  hinit3消失
		//如果碰上了
		if(onOff){
			list = list.filter(e=>!e.check);//list的数据  就是剩下没有选中的
			render(list);//继续调用  方便再次选中碰撞
			//如果数据清空,all变false
			all.checked = list.length?list.every(e=>e.check):false;//当五条数据都清空了  全选是不选中状态
		}
		document.onmouseup = document.onmousemove = null;
	}
	return false;//清除默认行为    例如自动选中文字
};


//碰撞的函数  方便上面碰撞的时候调用
function bong(box1,box2){
	let bl = box1.offsetLeft;
	let bt = box1.offsetTop;
	let br = bl + box1.offsetWidth;
	let bb = bt + box1.offsetHeight;

	

	let cl = box2.offsetLeft + box.offsetLeft;
	let ct = box2.offsetTop + box.offsetTop;
	let cr = cl + box2.offsetWidth;
	let cb = ct + box2.offsetHeight;



	if(br < cl || bb < ct || bl > cr || bt > cb){
		return false;
	}else{
		//碰到了
		return true;
	}
}

//如果点击的是li  就返回li   点击的是li下的div span p标签   就返回他们的父级 li
function getLi(ele){
	if(ele.tagName === 'LI')return ele;//如果
	return getLi(ele.parentNode);
}








// console.log(list);




