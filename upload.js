(function(){
	var Render = {

		render:function(){
			var oWrapper = document.querySelector("#wrapper");
			Render.preview(oWrapper);
			
			oWrapper.addEventListener('click',function(e){
				var oDel = e.target;
				oWrapper.removeChild(oDel.parentNode);
			},false);

			var oSubUpload = document.querySelector("#SubUpload");
			oSubUpload.addEventListener('click',function(){
					Render.getData();	
			},false);
		},

		preview: function(content){
			
			var oUpload = document.querySelector("#uploadImg");
			oUpload.addEventListener("change",function(e){
				
				for(var i=0;i<e.target.files.length;i++){
					var index = i;
					var file = e.target.files.item(i);
		            
					if(!(/^image\/.*$/i.test(file.type))){
						alert("请选择正确的图片！");
						continue;
					}

					var freader = new FileReader();
					freader.readAsDataURL(file);
					freader.onload=function(e){
						var cont = document.createElement('div');
						cont.setAttribute('class','img-content');
						var html = [];
						html.push('<img class="list-img" src="'+e.target.result+'" data-name="img'+index+'"/>');
						html.push('<a href="javascript:void(0)" class="img-del"></a>');						
						cont.innerHTML = html.join('');						
						content.appendChild(cont);	
					}
				}
			},false);
		},

		getData: function(){
			var aImg = document.getElementsByTagName('img');
			console.log(aImg.length);
			var data = [];
			for(var i=0;i<aImg.length;i++){
				var imgUrl = aImg[i].getAttribute('src');
				data.push(imgUrl);
			}
			console.log(data);
			ajax({
				url: "List",
				data: data,
				method: "get",
				succFunc: function(data){
					console.log("success");
				},
				failFunc: function(data){
					console.log("error");
				}
			});
		}
	
	};
	var Index = {
		init: function(){
			Render.render();
		}
	};

	Index.init();


})();