/*
* @Author: 卫思勉
* @Date:   2018-11-05 22:28:04
* @Last Modified by:   卫思勉
* @Last Modified time: 2019-02-20 16:28:12
*/




/*
	var e = e || window.event;   处理e
	var target = e.target || e.srcElement;   处理事件源
 */




/*
	rgb随机颜色
 */
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}


/*
	随机字母
 */
function randomWord() {
	var Word = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	var num = Math.floor(Math.random() * 52);
	return Word[num];
}


/*
	随机数字
 */
function randomNumber() {
	var Number = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	var num = Math.floor(Math.random() * 10);
	return Number[num];
}


/*
	格式化日期
 */
function formatDate(x) {
	return x < 10 ? '0' + x : x;
}




/**	Date原型上扩展,格式化日期
 * 	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"f+": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return format;
};




/*
	批量 onload
 */
function addOnloadEvent(func) {
	var oldOnload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		if (oldOnload) {
			oldOnload();
		}
		func();
	}
}






/*
	父级.insertAfter(要插入的元素, 在哪个元素后面);
	原型链上编程，封装insertAfter, 避免仅有的insertBefore
 */
Object.prototype.insertAfter = function (targetNode, afterNode) {
	var beforeNode = afterNode.nextElementSibling;
	if (beforeNode == null) {
		this.appendChild(targetNode);
	} else {
		this.insertBefore(targetNode, beforeNode);
	}
}



/*
	封装事件冒泡
 */
function stopBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}




/*
	 封装获取元素的css属性
 */
function getStyle(ele, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele, null)[prop];
	} else {
		return ele.currentStyle[prop];
	}
}





/*
	封装阻止默认行为
 */
function cancelHandler(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}




/*
	封装添加事件函数
 */
function addEvent(elem, type, func) {
	if (elem.addEventListener) {
		elem.addEventListener(type, func, false)
	} else if (elem.attachEvent) {
		elem.attachEvent('on' + type, function () {
			func.call(elem);
		});
	} else {
		elem['on' + type] = func;
	}
}



/*
	封装去除事件的函数
 */
function removeEvent(elem, type, func) {
	if (elem.addEventListener) {
		elem.removeEventListener(type, func, false)
	} else if (elem.attachEvent) {
		elem.detachEvent('on' + type, function () {
			func.call(elem);
		});
	}
}





/*
	封装拖拽函数
	
	注：此拖拽函数依赖 getStyle(ele, prop) ,addEvent(elem, type, func),removeEvent(elem, type, func) 函数的支持

	drag(elem, partOne, partTwo)
	参数解释：
			1.elem:这个参数必有,相当于最简单的一个盒子,也就是最外面那个盒子
			2.partOne: 这个参数是里面的标题盒子,可以没有,主要是为了改变鼠标按下时的鼠标样式
			3.partTwo: 这个参数是里面的内容盒子,可以没有,主要是为了改变鼠标按下时的鼠标样式
	
 */
function draft(elem, partOne, partTwo) {
	var disX, disY;
	addEvent(elem, 'mousedown', function (e) {
		if (partOne) {
			partOne.style.cursor = 'move';
		}
		if (partTwo) {
			partTwo.style.cursor = 'move';
		}
		elem.style.cursor = 'move';
		disX = e.pageX - parseInt(getStyle(elem, 'left'));
		disY = e.pageY - parseInt(getStyle(elem, 'top'));
		// console.log(disX,disY)

		addEvent(document, 'mousemove', mouseMove);

		addEvent(document, 'mouseup', mouseUp);
	});


	function mouseMove(e) {
		var e = e || window.event;
		elem.style.left = e.pageX - disX + 'px';
		elem.style.top = e.pageY - disY + 'px';
	}
	function mouseUp(e) {
		removeEvent(document, 'mousemove', mouseMove);
		elem.style.cursor = 'default';
		if (partOne) {
			partOne.style.cursor = 'default';
		}
		if (partTwo) {
			partTwo.style.cursor = 'default';
		}
	}
}







/*
	获取节点文本内容

	处理标准浏览器  和 IE浏览器
 */
function getNodeText(node) {
	if (window.ActiveXObject) {
		return node.text;
	} else {
		if (node.nodeType == 1) {
			return node.textContent;
		}
	}
}





/*
	封装原生Ajax(param)
	参数param是一个对象
	param = {data:'传的数据',type:'get/post', url:'', asyn:'false/true', dataType:'xml/json', success:function(){}, failure:function(){}}
 */
function Ajax(param) {

	// param = {data:'传的数据',type:'get/post', url:'', asyn:'false/true', dataType:'xml/json', success:function(){}, failure:function(){}}

	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	var type = param.type == 'get' ? 'get' : 'post';
	var asyn = param.asyn == 'true' ? 'true' : 'false';
	if (type == 'get') {
		var url = param.url + '?' + param.data + '&_t=' + new Date().getTime();  //时间戳,处理浏览器缓存
		xhr.open(type, url, asyn);
		xhr.send(null);
	} else if (type == 'post') {
		xhr.setRequestHeader('Content-Type', 'application/-form-urlencoded');
		xhr.send(param.data)
	}


	// xhr.send(null);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (typeof param.success == 'function') {
				var data = param.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
				param.success(data);
			} else if (typeof param.failure == 'function') {
				param.failure();
			}
		}
	}
}





/**
 *  判断鼠标进出的方向
 *  演示：$('.box').on('mouseenter mouseleave', judgeDirection);
 */
function judgeDirection(e) {
	var w = $(this).width(); // 得到盒子宽度
	var h = $(this).height();// 得到盒子高度
	var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
	// 获取x值
	var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
	// 获取y值
	var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
	// 将点的坐标对应的弧度值换算成角度度数值
	var dirName = new Array('On the top side ', 'On the right side ', 'On the bottom side ', 'On the left side ');
	if (e.type == 'mouseenter') {
		$(this).html(dirName[direction] + 'in');
	} else {
		$(this).html(dirName[direction] + 'out');
	}
}


























//-----------------------------------------------------------------------------------------------------------
// 从此处开始都是canvas的一些封装,有时候要借助Konva的库

// 封装的英雄函数
function Hero(json) {
	this._init(json);
}

Hero.prototype = {
	_init: function (json) {
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.w = json.w || 40;
		this.h = json.h || 65;
		this.originW = json.originW || 40;
		this.originH = json.originH || 65;
		this.speed = json.speed || 5;
		this.imgSrc = json.imgSrc || '';

		this._direction = 0;
	},
	render: function (ctx) {
		var img = new Image();
		img.src = this.imgSrc;
		var self = this;
		img.onload = function () {
			var rowIndex = 0;
			setInterval(function () {
				ctx.clearRect(0, 100, ctx.canvas.width, ctx.canvas.height);
				ctx.drawImage(img,
					rowIndex * self.originW,
					self._direction * self.originH,
					self.originW,
					self.originH,
					self.x,
					self.y,
					self.w,
					self.h);
				rowIndex++;
				rowIndex %= 4;
			}, 1000 / self.speed);
		}

	},
	changeDirection: function (param) {
		if (param == 'left') {
			this._direction = 1;
		}
		if (param == 'right') {
			this._direction = 2;
		}
		if (param == 'top') {
			this._direction = 3;
		}
		if (param == 'bottom') {
			this._direction = 0;
		}
	}
}



// 封装矩形
function wsmRect(json) {
	this._init(json);
}
wsmRect.prototype = {
	_init: function (json) {
		this.x = json.x === 0 ? 0 : json.x || 10;
		this.y = json.y === 0 ? 0 : json.y || 10;
		this.w = json.w || 100;
		this.h = json.h || 100;
		this.strokeColor = json.strokeColor || '#000';
		this.fillColor = json.fillColor || 'lightblue';
		this.rotate = json.rotate || 0;
		this.scaleX = json.scaleX || 1;
		this.scaleY = json.scaleY || 1;
		this.opacity = json.opacity === 0 ? 0 : json.opacity || 1;
		this.aroundSelf = json.aroundSelf || false; //旋转时是否围绕自己
		this.perClear = json.perClear || false;  //是否清空画板

	},
	render: function (ctx) {
		ctx.save();
		ctx.beginPath();
		this.perClear == true ? ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) : ctx.clearRect(0, 0, 0, 0);
		ctx.scale(this.scaleX, this.scaleY);
		ctx.rotate(this.rotate * Math.PI / 180);
		ctx.globalAlpha = this.opacity;
		ctx.scale(this.scaleX, this.scaleY);
		this.aroundSelf == true ? ctx.rect(0, 0, this.w, this.h) : ctx.rect(this.x, this.y, this.w, this.h);
		// ctx.rect(this.x, this.y, this.w, this.h);
		ctx.strokeStyle = this.strokeColor;
		ctx.stroke();
		ctx.fillStyle = this.fillColor;
		ctx.fill();
		ctx.restore();
	}
}




// 封装圆形
function wsmCircle(json) {
	this._init(json);
}
wsmCircle.prototype = {
	_init: function (json) {
		this.x = json.x === 0 ? 0 : json.x || 100;
		this.y = json.y === 0 ? 0 : json.y || 100;
		this.r = json.r || 100;
		this.startAngle = (json.startAngle <= 0) ? json.startAngle : json.startAngle || -90;
		this.endAngle = (json.endAngle <= 0) ? json.endAngle : json.endAngle || 30;
		this.strokeColor = json.strokeColor || '#000';
		this.fillColor = json.fillColor || 'lightblue';
		this.scaleX = json.scaleX || 1;
		this.scaleY = json.scaleY || 1;
		this.opacity = json.opacity === 0 ? 0 : json.opacity || 1;
		this.perClear = json.perClear || false;  //是否清空画板
		this.isStroke = json.isStroke || false;   //是否描边
	},
	render: function (ctx) {
		ctx.save();
		ctx.scale(this.scaleX, this.scaleY);
		ctx.globalAlpha = this.opacity;
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, this.r, this.startAngle * Math.PI / 180, this.endAngle * Math.PI / 180);
		if (this.isStroke) {
			ctx.strokeStyle = this.strokeColor;
			ctx.stroke();
		}
		ctx.fillStyle = this.fillColor
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}




// 封装进度条
function wsmProgressBar(json) {
	this._init(json);
}
wsmProgressBar.prototype = {
	_init: function (json) {
		this.x = json.x || 100;
		this.y = json.y || 100;
		this.w = json.w || 100;
		this.h = json.h || 50;
		this.fillColor = json.fillColor == null ? 'orange' : json.fillColor;
		this.strokeColor = json.strokeColor == null ? 'blue' : json.strokeColor;
		this.strokeWidth = json.strokeWidth == null ? '4' : json.strokeWidth;

		// 内部矩形
		var innerRect = new Konva.Rect({
			x: this.x,
			y: this.y,
			width: 1 / 10 * this.w,
			height: this.h,
			fill: this.fillColor,
			cornerRadius: 1 / 2 * this.h,
			id: 'innerRect'
		});

		// 外边框
		var outerRect = new Konva.Rect({
			x: this.x,
			y: this.y,
			width: this.w,
			height: this.h,
			stroke: this.strokeColor,
			strokeWidth: this.strokeWidth,
			cornerRadius: 1 / 2 * this.h
		});

		this.group = new Konva.Group({
			// x:0,
			// y:0
		});
		this.group.add(innerRect);
		this.group.add(outerRect);

	},
	changeValue: function (val) {
		if (val > 1) {
			val = val / 100;
		}

		// 做动画
		var width = this.w * val;
		var innerRect = this.group.findOne('#innerRect');
		// to动画系统：让我们的物件变换到某个状态
		innerRect.to({
			width: width,
			duration: 3,
			easing: Konva.Easings.StrongEaseInOut
		});
	},
	addToGroupOrLayer: function (arg) {  //将进度条渲染到层上
		arg.add(this.group);
	}
}






// 封装有文字的圆套圆环
function wsmCircleRing(json) {
	this._init(json);
}
wsmCircleRing.prototype = {
	_init: function (json) {
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.innerRadius = json.innerRadius || 0;
		this.outerRadius = json.outerRadius || 0;
		this.text = json.text || 'Konva';
		this.innerColor = json.innerColor || 'lightblue';
		this.outerColor = json.outerColor || '#e1e1e1';
		// this.innerColor = json.innerColor == null ? 'lightblue' : json.innerColor ;
		// this.outerColor = json.outerColor == null ? '#e1e1e1' : json.outerColor ;
		this.align = json.align == null ? 'center' : json.align;
		this.fontSize = json.fontSize || 15;
		this.textColor = json.textColor == null ? '#fff' : json.textColor;
		this.isBold = json.isBold == true ? 'bold' : 'normal';
		this.opacity = json.opacity || 1;

		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});
		// 初始化内圆
		var innerCircle = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.innerRadius,
			fill: this.innerColor,
			opacity: this.opacity,
		});
		this.group.add(innerCircle);

		// 初始化圆环
		var outerRing = new Konva.Ring({
			x: 0,
			y: 0,
			innerRadius: this.innerRadius,
			outerRadius: this.outerRadius,
			fill: this.outerColor,
			opacity: this.opacity,
		});
		this.group.add(outerRing);

		// 初始化文字
		var text = new Konva.Text({
			x: 0 - this.outerRadius,
			y: -7,
			fill: this.textColor,
			text: this.text,
			width: this.outerRadius * 2,
			fontSize: this.fontSize,
			align: this.align,
			fontStyle: this.isBold,
		});
		this.group.add(text);
	},
	addToGroupOrLayer: function (arg) {
		// arg可以是层或者是组
		arg.add(this.group);
	}
}




// 封装柱状图表
function wsmHistogram(json) {
	this._init(json);
}
wsmHistogram.prototype = {
	_init: function (json) {
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.w = json.w || 0;
		this.h = json.h || 0;
		this.data = json.data || [];

		// 创建组
		// 总的组
		this.allGroup = new Konva.Group({
			x0: this.x,
			y0: this.y
		});

		// 矩形组
		this.rectGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.allGroup.add(this.rectGroup);

		// 百分比文字组
		this.percentTextGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.allGroup.add(this.percentTextGroup);


		// 绘制基线
		var baseLine = new Konva.Line({
			points: [x0, y0, x0 + this.w, y0],
			strokeWidth: 1,
			stroke: 'lightgreen'
		});
		this.allGroup.add(baseLine);


		// 绘制矩形、百分比文字和底部文字
		var height = this.h;
		var RectWidth = this.w / this.data.length;
		var self = this;
		this.data.forEach(function (item, index) {
			var rect = new Konva.Rect({
				x: x0 + (index + 1 / 4) * RectWidth,
				y: y0 - item.value * height,
				width: 1 / 2 * RectWidth,
				height: item.value * height,
				fill: item.color,
				opacity: 0.9,
				cornerRadius: 10,
				name: 'rect',
				shadowBlur: 10,		  //设置阴影的模糊级别
				shadowColor: 'black',
			});
			self.rectGroup.add(rect);



			// 创建百分比文字
			var text = new Konva.Text({
				x: x0 + index * RectWidth,
				y: y0 - item.value * height - 14,
				fontSize: 14,
				width: RectWidth,
				align: 'center',
				text: item.value * 100 + '%',
				fill: item.color,
				name: 'percentText'
			});
			self.percentTextGroup.add(text);



			var group = new Konva.Group({
				x: x0 + (index + 2 / 5) * RectWidth,
				y: y0,
			});
			// 创建底部文字
			var bottomText = new Konva.Text({
				x: 0,
				y: 0,
				fontSize: 14,
				align: 'center',
				text: item.name,
				fill: item.color,
				rotation: 30
			});
			group.add(bottomText);
			self.allGroup.add(group);
		});
	},
	addToGroupOrLayer: function (arg) {
		arg.add(this.allGroup);
	},
	playAnimation: function () {
		var self = this;

		// 处理柱状图
		this.rectGroup.find('Rect').each(function (item, index) {
			item.y(y0);
			item.height(0);

			item.to({
				duration: 1,
				y: y0 - self.data[index].value * height,
				height: self.data[index].value * height,
			});
		});

		// 处理百分比文字
		this.percentTextGroup.find('Text').each(function (item, index) {
			item.y(y0 - 14);

			item.to({
				duration: 1,
				y: y0 - self.data[index].value * height - 14
			});
		});
	}
};



// 封装饼状图
function wsmPie(json) {
	this._init(json);
}
wsmPie.prototype = {
	_init: function (json) {
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.r = json.r || 0;
		this.data = json.data || [];
		this.fontSize = json.fontSize || 14;
		this.circleR = json.circleR || 8;
		this.textR = json.textR || 20;
		this.strokeColor = json.strokeColor || '#ccc';

		this._animationIndex = 0;

		// 创建总的组
		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});
		// 创建扇形图组
		this.pieGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		// 创建文字组
		this.textGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.group.add(this.pieGroup);
		this.group.add(this.textGroup);


		// 创建扇形和文字
		var tempAngle = -90,
			self = this;
		this.data.forEach(function (item, index) {
			var angle = item.value * 360,
				textAngle = tempAngle + 1 / 2 * angle;

			// 绘制扇形
			var wedge = new Konva.Wedge({
				x: 0,
				y: 0,
				radius: self.r,
				angle: angle,
				fill: item.color,
				rotation: tempAngle
			});
			self.pieGroup.add(wedge);


			// 绘制文字
			var text = new Konva.Text({
				x: (self.r + self.textR) * Math.cos(textAngle * Math.PI / 180),
				y: (self.r + self.textR) * Math.sin(textAngle * Math.PI / 180),
				fill: item.color,
				text: item.name + ':' + item.value * 100 + '%',
				fontSize: self.fontSize,
			});
			if (textAngle > 90 && textAngle < 270) {
				text.x(text.x() - text.width());
			}
			self.textGroup.add(text);


			tempAngle += item.value * 360;
		});

		// 绘制外环
		var circle = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.r + this.circleR,
			stroke: this.strokeColor,
		});
		this.group.add(circle);
	},
	addToGroupOrLayer: function (arg) {
		arg.add(this.group);
	},
	playAnimation: function (time) {  //封装动画效果
		var self = this;
		if (this._animationIndex == 0) {
			this.pieGroup.getChildren().each(function (item, index) {
				item.angle(0);
			});
		}

		var item = this.pieGroup.getChildren()[this._animationIndex];
		item.to({
			duration: this.data[self._animationIndex].value * time,
			angle: this.data[self._animationIndex].value * 360,
			onFinish: function () {
				self._animationIndex++;
				if (self._animationIndex >= self.data.length) {
					self._animationIndex = 0;
					return;
				}
				self.playAnimation(time);
			},
		});
	},
};