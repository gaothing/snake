// 获取类名的兼容性函数
// 功能 要实现ie低版本里面适配getClass
// ---------------------------------------------- 集合
function getClass(classname,obj){
	// 参数初始化
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var objs=document.getElementsByTagName('*');
		for(var i=0;i<objs.length;i++){
			if(objs[i].className==classname){
				arr.push(objs[i]);
			}
		}
		return arr;
	}
}
function CheckClass(obj,val){
	var classStr=obj.className;
	var classArr=classStr.split(" ");
	for (var i = 0; i < classArr.length; i++) {
		if(val==classArr[i]){
			return true;
		}
	};
	return false;
}

// ---------------------------------------------- 获取内容
function operateText(obj,val){
	if(val!=undefined){
		if(val.innerText){
			return val.innerText;
		}else{
			return val.textContent;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
		
}
// ----------------------------------------------获取样式

function getStyle(obj,style){
	if (obj.currentStyle) {
		return obj.currentStyle[style];
	} else{
		return getComputedStyle(obj,null)[style]
	};

}
// ---------------------------------------------- $函数
function $(val,obj){
	if(typeof val=="string"){
		var obj=obj||document;
		val=val.replace(/^\s*|\s*$/g,'')
		if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj);
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){
			return obj.getElementsByTagName(val);
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){
			return document.createElement(val.slice(1,-1));
		}
	}else if(typeof val=="function"){
		window.onload=function(){
			val()
		}
	}
	
}

// ----------------------------------------------选项卡

// window.onload=function(){
// 	var bt=getClass('bt');
// 	var tp=getClass('tp');
// 	for (var i = 0; i < bt.length; i++) {
// 		bt[i].index=i;
// 		bt[i].onclick=function(){
// 			for (var i = 0; i < bt.length; i++) {
// 				bt[i].className='bt';
// 			};
// 			bt[this.index].className='bt active';
// 			for (var i = 0; i < tp.length; i++) {
// 				tp[i].style.display='none';
// 				// tp[i].className='tp';
// 			};
// 			tp[this.index].style.display='block';
// 			// tp[this.index].className='tp active';
// 		};
// 	};
// };
// --------------------------------------------节点
// 获取子节点集合
// type为yes  与  no
function getChilds(obj,type){
	var type=type||"no";
	var kids=obj.childNodes;
	var arr=[];
	for (var i = 0; i < kids.length; i++) {
		if(type=="no"){
			// no获取元素节点
			if(kids[i].nodeType=="1"){
			arr.push(kids[i]);
			}
			// yes非空格所有节点
		}else if(type=="yes"){
			if(kids[i].nodeType=="1"||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
			arr.push(kids[i]);
			}
		}

	}
	return arr;
}
// 获取第一个子节点

function getFirst(obj,type){
	var type=type||"no"; 
	return getChilds(obj,type)[0];
}
// 取最后一个子节点
function getLast(obj,type){
	var type=type||"no"; 
	var childs=getChilds(obj,type);
	return childs[childs.length-1];
}
// 取第n个子节点
function getNub(obj,n,type){
	var type=type||"no"; 
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false
	}
	return childs[n-1];
}

// 获取下一个兄弟节点
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	if(type=="no"){
		// no获取元素节点
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
			// yes非空格所有节点
	}else if(type=="yes"){
		while(next.nodeType=="1"||next.nodeType=='3'&&!next.nodeValue.replace(/^\s*|\s*$/g,"")){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}
// 获取上一个兄弟节点
function getPrevious(obj,type){
	var type=type||"no";
	var Previous=obj.previousSibling;
	if(Previous==null){
		return false;
	}
	if(type=="no"){
		// no获取元素节点
		while(Previous.nodeType=='3'||Previous.nodeType=='8'){
			Previous=Previous.previousSibling;
			if(Previous==null){
				return false;
			}
		}
		return Previous;
			// yes非空格所有节点
	}else if(type=="yes"){
		while(Previous.nodeType=="1"||kids[i].nodeType=='3'&&!Previous.nodeValue.replace(/^\s*|\s*$/g,"")){
		Previous=Previous.previousSibling
			if(Previous==null){
				return false;
			}
		}
		return Previous;
	}
}


// ----------------------------------------------节点的插入

// 把obj添加到obj2之前
// obj为要插入的对象，obj2为位置
function insertBefore(obj,obj2){
	var parent=obj2.parentNode;
	parent.insertBefore(obj,obj2);
}
// 把obj添加到obj2之后
function insertAfter(obj,obj2){
	var parent=obj2.parentNode;
	 var next=getNext(obj2,"yes");
	 if(!next){
	 	parent.appendChild(obj);
	 }else{
		parent.insertBefore(obj,next);
	}
}
// ---------------------------------------------
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

// 11.绑定事件的兼容函数
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent("on"+event,function(){fun.call(obj);});
	}else{
		obj.addEventListener(event,fun,false);
	}
}


// 12.兼容鼠标滚轮的函数
function mouseWheel(obj,upfun,downfun){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn);//IE opera
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit-
		obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
	}

	function scrollFn(e){
		var eve=e||window.event;
		if(eve.preventDefault){
			eve.preventDefault()
		}else{
			eve.returnValue=false;
		}
		var fangxiang=eve.wheelDelta||eve.detail;
		// FF 向上 -3    向下 3
		// IE 向上 120   向下 -120
		// Chrome 向上 120  向下-120
		if(fangxiang==-3||fangxiang==120){
			if(upfun){
				upfun();
			}			
		}
		if(fangxiang==3||fangxiang==-120){
			if(downfun){
				downfun();
			}
		}
	}
}

// 多张图片滑动
function Lunbo(box,imgs,img,left,right,width){
	var box=box;
	var imgs=imgs;
	var img=img;
	var left=left;
	var right=right;
	var width=width;
	var flag=true;
	var t=setInterval(move,2000);
	function move(){
		if (!flag) {
			return
		};
		flag=false
		animate(imgs,{left:-width},1000,function(){
		var first=getFirst(imgs);
		imgs.appendChild(first);
		imgs.style.left="0px";
		flag=true;
		});
	}
	box.onmouseover=function(){
		clearInterval(t)
	}
	box.onmouseout=function(){
		 t=setInterval(move,2000)	
	}
	left.onclick=function(){
		if (!flag) {
			return;
		}
		flag=false
		var last=getLast(imgs);
		var gfirst=getFirst(imgs);
		insertBefore(last,gfirst);
		imgs.style.left=-width+"px";
		animate(imgs,{left:0},1000,function(){
		
			flag=true;
		});
	}
	right.onclick=function(){
		move();
	}
}
// ----------------------------------------------


function playCir(banner,act,cir,left,right,color1,color2){
		var n=0;
		var next=0;
		var flag=true;
		var t=setInterval(fun,2000);
		function fun(){
			next=n+1;
			if(next>=act.length){
				next=0;
			} 
			for (var i = 0; i < act.length; i++) {
				act[next].style.opacity=0;
				animate(act[n],{opacity:0},500);
				animate(act[next],{opacity:1},500);
				for (var i = 0; i < act.length; i++){
					cir[i].style.background='#3E3E3E';
				};
				cir[next].style.background='#B61B1F';
				n=next;
			};
		}
		right.onclick=function(){
			if(!flag){
				return;
			}
			flag=false;
			next=n+1;
			if(next>=act.length){
				next=0;
			}   
			act[next].style.opacity=0;
			animate(act[n],{opacity:0},500,function(){
				flag=true;
			});
			animate(act[next],{opacity:1},500,function(){
				flag=true;
			});
			for (var i = 0; i < act.length; i++) {
				cir[i].style.background='#3E3E3E';
			};
			cir[next].style.background='#B61B1F';
			n=next;
		}
		
		left.onclick=function(){
			if(!flag){
				return;
			} 
			flag=false;
			next=n-1;
			if(next<0){
				next=act.length-1;
			}   
			act[next].style.opacity=0;
			animate(act[n],{opacity:0},500,function(){
				flag=true;
			});
			animate(act[next],{opacity:1},500,function(){
				flag=true;
			});
			for (var i = 0; i < act.length; i++) {
				cir[i].style.background='color1';
			};
			cir[next].style.background='color2';
			n=next;
			
		}
		// 以下是点击轮播点的效果
		for (var i = 0; i < cir.length; i++) {
			cir[i].index=i;
			cir[i].onclick=function(){
				// 先判断点击的在前面还是后面
				if(this.index>n){
					if(!flag){
				return;
			}
			flag=false;
				act[next].style.opacity=0;
				animate(act[this.index],{opacity:0},500,function(){
					flag=true;
				});
				animate(act[next],{opacity:1},500,function(){
					flag=true;
				});
				for (var i = 0; i < cir.length; i++) {
				cir[i].style.background='color1';
				};cir[this.index].style.background='color2'

				
				}else if(this.index<n){
				if(!flag){
				return;
				}
				flag=false;
				act[next].style.opacity=0;
				animate(act[this.index],{opacity:1},500,function(){
					flag=true;
				});
				animate(act[next],{opacity:0},500,function(){
					flag=true;
				});
				for (var i = 0; i < cir.length; i++) {
					cir[i].style.background='#3E3E3E';
				};cir[this.index].style.background='#B61B1F'
			}
			// 改变轮播顺序,不会点完以后跑到点之前的位置，而是往下走
			n=this.index;
			next=this.index;
			}
		}
			// 滑到banner上时清除时间函数
		banner.onmouseover=function(){
			clearInterval(t)
		}
		// 滑出时启动时间函数
		banner.onmouseout=function(){
			t=setInterval(fun,1000)
		}
}
// --------------------------------------
// 图片依次滑动（左右）
function lunbof(img,cir,left1,right1,stop,width){
	// 图片img
	var img=img;
	// 滑动点
	var cir=cir;
	// 左右点击
	var left1=left1;
	var right1=right1;
	// 鼠标放置动画静止
	var stop=stop;
	// 图片宽度
	var width=width;
	var flag=true;
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(fun,2000);
	function fun(){
		next=n+1;
		if(!flag){
				return;
			};
			flag=false;
		if(next>=cir.length){
				next=0;
		}; 
		img[next].style.left=width+'px';
		animate(img[n],{left:-width},600,function(){
						flag=true;
					});
		animate(img[next],{left:0},600,function(){
						flag=true;
					});
		for (var i = 0; i < img.length; i++) {
			cir[i].className="bigcir";
		};
		cir[next].className="bigcir bigcir1";
		n=next;
	};
	for (var i = 0; i < cir.length; i++) {
		cir[i].index=i;
		next=n+1;
		cir[i].onclick=function(){
			if(!flag){
				return;
			};
			flag=false;
			for (var i = 0; i < img.length; i++) {
			cir[i].className="bigcir";
			};
			cir[this.index].className="bigcir bigcir1";
				if(n>this.index){
					img[this.index].style.left=width+"px";
					animate(img[n],{left:-width},600);
					animate(img[this.index],{left:0},600,function(){
						flag=true;
					});
				}else if(n<this.index){
					img[this.index].style.left=-width+"px";
					animate(img[n],{left:width},600,function(){
						flag=true;
					});
					animate(img[this.index],{left:0},600,function(){
						flag=true;
					});
				};
				n=this.index;
		};
	};	
	left1.onclick=function(){
		if(!flag){
			return;
		};
		flag=false;
		next=n-1;
		if(next<0){
			next=img.length-1;
		}
		for (var i = 0; i < img.length; i++) {
			cir[i].className="bigcir";
			
		};
		cir[next].className="bigcir bigcir1";
		img[next].style.left=width+"px";
		animate(img[n],{left:-width},600,function(){
			flag=true
		});
		animate(img[next],{left:0},600,function(){
			flag=true
		});
		n=next;	
	};
	right1.onclick=function(){
		fun(t);
	};
	stop.onmouseover=function(){
		right1.style.display="block";
		left1.style.display="block";
		clearInterval(t);
	}
	stop.onmouseout=function(){
		right1.style.display="none";
		left1.style.display="none";
	 t=setInterval(fun,2000);
	};
};
// ---------------------------------------------
// 透明度变化轮播（京东）
function lunboop(cir,act,banner,left,right){
	// 滑动点
	var cir=cir;
	// 图片
	var act=act;
	// 图片区
	var banner=banner;
	// 左右点击
	var left=left;
	var right=right;
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(fun,2000);
		function fun(){
			next=n+1;
			if(next>=act.length){
				next=0;
			};
			for (var i = 0; i < act.length; i++) {
				act[next].style.opacity=0;
				animate(act[n],{opacity:0},500);
				animate(act[next],{opacity:1},500);
				for (var i = 0; i < act.length; i++){
					cir[i].style.background='#3E3E3E';
				};
				cir[next].style.background='#B61B1F';
				n=next;
			};
		};
		right.onclick=function(){
			if(!flag){
				return;
			};
			flag=false;
			next=n+1;
			if(next>=act.length){
				next=0;
			}; 
			act[next].style.opacity=0;
			animate(act[n],{opacity:0},500,function(){
				flag=true;
			});
			animate(act[next],{opacity:1},500,function(){
				flag=true;
			});
			for (var i = 0; i < act.length; i++) {
				cir[i].style.background='#3E3E3E';
			};
			cir[next].style.background='#B61B1F';
			n=next;
		};
		left.onclick=function(){
			if(!flag){
				return;
			};
			flag=false;
			next=n-1;
			if(next<0){
				next=act.length-1;
			};   
			act[next].style.opacity=0;
			animate(act[n],{opacity:0},500,function(){
				flag=true;
			});
			animate(act[next],{opacity:1},500,function(){
				flag=true;
			});
			for (var i = 0; i < act.length; i++) {
				cir[i].style.background='#3E3E3E';
			};
			cir[next].style.background='#B61B1F';
			n=next;
			
		}
		// 以下是点击轮播点的效果
		for (var i = 0; i < cir.length; i++) {
			cir[i].index=i;
			cir[i].onclick=function(){
				// 先判断点击的在前面还是后面
				if(this.index>n){
					if(!flag){
				return;
			};
			flag=false;
				act[next].style.opacity=0;
				animate(act[this.index],{opacity:0},500,function(){
					flag=true;
				});
				animate(act[next],{opacity:1},500,function(){
					flag=true;
				});
				for (var i = 0; i < cir.length; i++) {
					cir[i].style.background='#3E3E3E';
				};
				cir[this.index].style.background='#B61B1F';
				}else if(this.index<n){
					if(!flag){
					return;
					};
				flag=false;
				act[next].style.opacity=0;
				animate(act[this.index],{opacity:1},500,function(){
					flag=true;
				});
				animate(act[next],{opacity:0},500,function(){
					flag=true;
				});
				for (var i = 0; i < cir.length; i++){
					cir[i].style.background='#3E3E3E';
				};cir[this.index].style.background='#B61B1F';
			};
			// 改变轮播顺序,不会点完以后跑到点之前的位置，而是往下走
			n=this.index;
			next=this.index;
			}
		};
			// 滑到banner上时清除时间函数
		banner.onmouseover=function(){
			left.style.display="block";
			right.style.display="block";
			clearInterval(t);
		};
		// 滑出时启动时间函数
		banner.onmouseout=function(){
			left.style.display="none";
			right.style.display="none";
			t=setInterval(fun,1000);
		};
};