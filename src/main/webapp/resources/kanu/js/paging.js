// 4. Javascript
//submit




function frmPaging() {
	
	document.getElementById("frmPaging").submit();
}
// 이전 페이지 index
function pagePre(index, pageStartNum, total, listCnt, pageCnt, jsl, clickedState, valueJSL, stateJSL) {
	var totalPageCnt = Math.ceil(total / listCnt);
	index -= 1;
	pageStartNum -= 1;
	if(pageStartNum <= 1){
		pageStartNum = 1;
	}
	if(index <= 0){
		console.log("이전페이지클릭 totalPageCnt: "+totalPageCnt+", index: "+index);
		index = 0;
	}
	$("#pageStartNum").val(pageStartNum);
	$("#index").val(index);
	if(jsl==1) search(stateJSL, valueJSL, clickedState, index, pageStartNum);
	else ajaxList(index, pageStartNum);

}
// 다음 페이지 index
function pageNext(index, pageStartNum, total, listCnt, pageCnt, jsl, clickedState, valueJSL, stateJSL) {
	var totalPageCnt = Math.ceil(total / listCnt); 
	var max = Math.ceil(totalPageCnt / pageCnt); 
//	if (max * pageCnt > index + pageCnt) {
		//console.log("다음페이지클릭: max*pageCnt:"+max*pageCnt+", index+pageCnt: "+index+pageCnt+", totalPageCnt: "+totalPageCnt+", max: "+max+", index:"+index);
	index += 1;
	pageStartNum += 1;
	if(pageStartNum > totalPageCnt - pageCnt){
		pageStartNum = totalPageCnt - pageCnt+1;
	}
	if(index >= totalPageCnt-1){
		console.log("다음페이지클릭 totalPageCnt: "+totalPageCnt+", index: "+index);
		index = totalPageCnt-1;
	}
	if(pageStartNum <= 0){
		pageStartNum = 1;
	}
	console.log("다음페이지클릭 pageCnt보다 인덱스 커질때 pageStartNum: "+pageStartNum+", index: "+index);
	$("#pageStartNum").val(pageStartNum);
	$("#index").val(index);
	if(jsl==1) search(stateJSL, valueJSL, clickedState, index, pageStartNum);
	else ajaxList(index, pageStartNum);

}

// 마지막 페이지 index
function pageLast(index, total, listCnt, pageCnt) {
	var totalPageCnt = Math.ceil(total / listCnt);
	//var max = Math.ceil(totalPageCnt / pageCnt);
	while (max * pageCnt > index + pageCnt) {
		index += pageCnt;
	}
	var remainListCnt = total - listCnt * (index - 1);
	var remainPageCnt = Math.floor(remainListCnt / listCnt);
	if (remainListCnt % listCnt != 0) {
		remainPageCnt++;
	}
	var pageLastNum = 0;
	if (remainListCnt <= listCnt) {
		pageLastNum = index;
	} else if (remainPageCnt <= pageCnt) {
		pageLastNum = remainPageCnt + index - 1;
	} else {
		pageLastNum = pageCnt + index - 1;
	}
	document.getElementById("pageStartNum").value = index;
	document.getElementById("index").value = pageLastNum - 1;
	frmPaging();
}
// index 리스트 처리
function pageIndex(index, pageStartNum, total, listCnt, pageCnt, jsl, clickedState, valueJSL, stateJSL) {
	var totalPageCnt = Math.ceil(total / listCnt);
	console.log("pageIndex메서드 pageStarNum: "+pageStartNum+", totalPageCnt: "+totalPageCnt+", total: "+total);
	
	if(pageStartNum > totalPageCnt - pageCnt){
		pageStartNum = totalPageCnt - pageCnt+1;
	}
	if(pageStartNum <= 0){
		pageStartNum = 1;
	}
	$("#pageStartNum").val(pageStartNum);
	$("#index").val(index);
	console.log("숫자 페이지 클릭 pageStartNum: "+pageStartNum+", index: "+index);
	
	if(jsl==1) search(stateJSL, valueJSL, clickedState, index, pageStartNum);
	else ajaxList(index, pageStartNum);
}


function ajaxList(index, pageStartNum){
	
	latLngArray["north"] = $("#north").val();
	latLngArray["south"] = $("#south").val();
	latLngArray["east"] = $("#east").val();
	latLngArray["west"] = $("#west").val();
	latLngArray["index"] = index;
	latLngArray["pageStartNum"] = pageStartNum;
	latLngArray["flag"] = $("#flag").val();
	//매물 종류
	if($("#kind_of_sale").text() == '월세' || $("#kind_of_sale").text() == '전세or월세' || $("#kind_of_sale").text() == '전세' || $("#kind_of_sale").text() == '매매'){
		console.log("매물 종류 클릭: "+$("#kind_of_sale").text());
		latLngArray["buildType"] = $("#kind_of_sale").text();
	}else if($("#kind_of_sale").text() == '전체') {
		console.log("매물종류 전체선택");
		delete latLngArray["buildType"];
	}

	//거래종류
	if($("#kind_of_trade").text() == '전체' || $("#kind_of_trade").text() == '중개' || $("#kind_of_trade").text() == '직거래'){
		console.log("거래 종류 클릭: "+$("#kind_of_trade").text());
		latLngArray["kind_of_trade"] = $("#kind_of_trade").text();
	}

	//방종류
	if($("#kind_of_room").text() == '전체' || $("#kind_of_room").text() == '원룸' || $("#kind_of_room").text() == '1.5룸' || $("#kind_of_room").text() == '투룸' || $("#kind_of_room").text() == '쓰리룸' || $("#kind_of_room").text() == '오피스텔' || $("#kind_of_room").text() == '아파트'){
		console.log("방 종류 클릭: "+$("#kind_of_room").text());
		latLngArray["proType"] = $("#kind_of_room").text();
	}

	//보증금
	if( $("#begin_text").val() != undefined &&  $("#end_text").val() != undefined ){ //관심목록 에서 사용하기 위한 if문
		if( $("#begin_text").val()*1 <= $("#end_text").val()*1){
			if(!isNaN($("#begin_text").val()) && !isNaN($("#end_text").val())){
				console.log("보증금 시작: "+$("#begin_text").val()+", 보증금 끝: "+$("#end_text").val());
				latLngArray["beginDeposit"] = $("#begin_text").val();
				latLngArray["endDeposit"] = $("#end_text").val();
			}else{
				alert("텍스트 숫자만 입력하세요~");
				return;
			}
		}else{
			alert("보증금 범위 or 텍스트 숫자 확인해주세요!");
			return;
		}
	}
	
	//월세
	if( $("#begin_rent_text").val() != undefined &&  $("#end_rent_text").val() != undefined ){ //관심목록 에서 사용하기 위한 if문
		if( $("#begin_rent_text").val()*1 <= $("#end_rent_text").val()*1){
			if(!isNaN($("#begin_rent_text").val()) && !isNaN($("#end_rent_text").val())){
				console.log("보증금 시작: "+$("#begin_rent_text").val()+", 보증금 끝: "+$("#end_rent_text").val());
				latLngArray["beginRent"] = $("#begin_rent_text").val();
				latLngArray["endRent"] = $("#end_rent_text").val();
			}else{
				alert("텍스트 숫자만 입력하세요~");
				return;
			}
		}else{
			alert("월세 범위 or 텍스트 숫자 확인해주세요!");
			return;
		}
	}
	
	//추가사항
	//층수 선택
	if($("#startFloor").val() != "" && $("#endFloor").val() != ""){
		console.log("층수 선택");
		latLngArray["startFloor"] = $("#startFloor").val();
		latLngArray["endFloor"] = $("#endFloor").val();
	}else{
		delete latLngArray["startFloor"];
		delete latLngArray["endFloor"];
	}
	
	//면적 선택
	if($("#startArea").val() != "" && $("#endArea").val() != ""){
		console.log("면적 선택");
		latLngArray["startArea"] = $("#startArea").val();
		latLngArray["endArea"] = $("#endArea").val();
	}else{
		delete latLngArray["startArea"];
		delete latLngArray["endArea"];
	}
	
	//주차
	if($("#parking").val() != ""){
		console.log("주차");
		latLngArray["parking"] = $("#parking").val();
	}else{
		delete latLngArray["parking"];
	}
	
	//반려동물
	if($("#animal").val() != ""){
		console.log("반려동물");
		latLngArray["animal"] = $("#animal").val();
	}else{
		delete latLngArray["animal"];
	}
	
	//주소 검색
	if($("#address_search").val() != "" && $("#address_search").val() != null){
		console.log("주소검색값: "+$("#address_search").val());
		latLngArray["address"] = $("#address_search").val();
	}else{
		delete latLngArray["address"];
	}
	
	var i = 0;
	var jsonLatLng = JSON.stringify(latLngArray);
	console.log("latLng:"+jsonLatLng);
	$.ajax({
		contentType : "application/json",
		url : "indexJson.do",
		type : "post",
		dataType : "json",
		data : jsonLatLng,
		success : function(responseData){
			// $('#loading').show(); 
			//console.log("paing.js flag 확인 인입"+responseData.flag);
			var data = responseData;
			//console.log("pagingVo.pageStartNum: "+data.pagingVo.pageStartNum+"pagingVo.getPageLastNum: "+data.pagingVo.pageLastNum);
			//console.log("인입2"+data);
			var html = "";
			html +="<style>";
			html +=".itemList a:hover { font-weight:bold;color:gray; }";
			html +="</style>";
			//console.log("데이터: "+Object.keys(data));
			
			//console.log("데이터xx: "+Object.keys(data.map).length);
			if(Object.keys(data).includes("list")){
				//console.log("데이터랭스 1이상");
				for(i=0; i<data.list.length; i++){
					html +="<div class ='itemList' style='width:95%;height:145px;border:1px solid gray;margin:5px;margin-left:12px;' onmouseover='getterLatLng(this)' onmouseout='buildMouseOut(this)' >";
					html +="<div class='RoomItem-icons' style='float:right;margin:15px;' onClick='heart(this)'>";
					html +="<span class='room-favorite' >";
					if($("#flag").val() == '1'){
						console.log("ajax에서 heart.flag 밸류값1일때: "+$("#flag").val());
						html +="<i id='icon_heart' class='fa fa-heart fa-2x' style='color:red' onmouseover='heartMouseOver(this)' onmouseout='heartMouseOut(this)'></i>";
					}else{
						console.log("ajax에서 heart.flag 밸류값0일때: "+$("#flag").val());
						html +="<i id='icon_heart' class='fa fa-heart-o fa-2x' style='color:gray' onmouseover='heartMouseOver(this)' onmouseout='heartMouseOut(this)'></i>";
					}
					html +="</span>";
					html +="</div>";
					html +="<a href='room.do?buildNo="+data.list[i].BUILD_NO+"' target='_self' style='color:black' >";
					html +="<div class='RoomItem-preview' style='width:120px;height:145px;float:left' >";
					html +="<div class='RoomItem-preview__image' ></div>";
					html +="<div class='RoomItem-preview__image' style='background-image:url("+data.list[i].PICPATH+");width:100%;height:135px;margin:5px;' ></div>";
					html +="<div class='RoomItem-preview__cover' ></div>";
					html +="</div>";
					html +="<div class='RoomItem-detail'>";
					html +="<div class='RoomItem-info' >";
					html +="<div class='RoomItem-header' >";
					html +="<div class='RoomItem-price' style='font-size:2em;margin-bottom:-10px;margin-top:10px;width:60%;float:left' >";
					html +="<p>";
					
					if(data.list[i].MONTHLY !== 0){
						html +="<span class='RoomItem-price__type' style='margin-left:25px;' >월세</span>";
						html +="<span class='RoomsItem-price__title is-0' >"+data.list[i].DEPOSIT+" / "+data.list[i].MONTHLY+"</span>";
					}else if(data.list[i].MONTHLY === 0 && data.list[i].DEPOSIT != 0){
						html +="<span class='RoomItem-price__type' style='margin-left:25px;' >전세</span>";
						html +="<span class='RoomsItem-price__title is-0' >"+data.list[i].LEASE+"</span>";
					}else if(data.list[i].SALEPRICE !== 0 && data.list[i].MONTHLY === 0 && data.list[i].DEPOSIT === 0){
						html +="<span class='RoomItem-price__type' style='margin-left:25px;' >매매</span>";
						html +="<span class='RoomsItem-price__title is-0' >"+data.list[i].SALEPRICE+"</span>";
					}
				
					html +="</p>";
					html +="</div>";
					html +="<span class='room-visited' >";
					html +="<i class='dabang-icon' ></i>";
					html +="</span>";
					html +="</div>";
					html +="<div class='room_summary' style='width:60%;float:left;margin-left:25px;'>";
					html +="<span class='RoomItem-summary' >";
					html +="<span >"+data.list[i].PROTYPE+" |</span>";
					html +="<span > "+data.list[i].FLOOR+"층 |</span>";
					html +="<span > "+data.list[i].JAREA+"m²</span>";
					html +="</span>";
					html +="</div>";
					html +="<div class='RoomItem-types types' style='margin-top:10px;float:left;' >";
					if(data.list[i].PARKING === 1){
						html +="<span class='#주차 tag' style='background-color:yellow;margin-left:30px;' >#주차</span>";
					}
					if(data.list[i].ANIMAL === 1){
						html +="<span class='#주차 tag' style='background-color:yellow;margin-left:30px;' >#반려동물</span>";
					}
					html +="</div>";
					html +="<div class='RoomItem-content' style='margin-top:10px;float:left;' >";
					html +="<span class='RoomItem-title' style='margin-left:25px;display:inline;'>"+data.list[i].ROOMTITLE+"</span>";
					html +="</div>";
					html +="<input type='hidden' class='RoomItem-date' value='2일전'/>";
					html +="</div>";
					html +="<div class='RoomItem-options' >";
					html +="<input type='hidden' class='option' value='에어컨, 가스레인지, 신발장, 전자도어락'>";
					html +="<input type='hidden' id='build_no' name='build_no' value='"+data.list[i].BUILD_NO+"'>";
					html +="<input type='hidden' id='lat' name='lat' value='"+data.list[i].LAT+"'>";
					html +="<input type='hidden' id='lng' name='lng' value='"+data.list[i].LNG+"'>";
					html +="</div>";
					html +="</div>";
					html +="</a>";
					html +="</div>";
				}
				html +="</div>";
				html +="</div>";
			}else{
				html +="<br><br><br><br><center><strong>데이터 없음.</strong></center>"
			}
			var text = "검색결과 "+data.pagingVo.total+" 개";
			var paging = "";
			//<!-- 5. paging view -->
			//paging +="<div id='page' style='height:45px;width:480px;bottom:calc(-100% + 60px);float:right;position:relative;'> "; 
			paging +="<div id='pageLoad'>";
			paging +="<ul class='pagination' style='justify-content:center;margin-top:5px;'>";
			//<!-- 이전 페이지 이동 -->
			paging +="<li class='page-item'><a class='page-link' onclick='pagePre("+data.pagingVo.index+","+data.pagingVo.pageStartNum+","+data.pagingVo.total+","+data.pagingVo.listCnt+","+data.pagingVo.pageCnt+");'>&lsaquo;</a></li>";
			//<!--페이지번호 -->
			for(var i=data.pagingVo.pageStartNum; i<=data.pagingVo.pageLastNum; i++){
				paging+="<li class='pageIndex"+i+"' id='idx"+i+"'><a class='page-link' onclick='pageIndex("+(i-1)+","+(i-4)+","+data.pagingVo.total+","+data.pagingVo.listCnt+","+data.pagingVo.pageCnt+");'>"+i+"</a></li>";
			}
			
			//<!--다음 페이지 이동 -->
			paging+="<li class='page-item'><a class='page-link' onclick='pageNext("+data.pagingVo.index+","+data.pagingVo.pageStartNum+","+data.pagingVo.total+","+data.pagingVo.listCnt+","+data.pagingVo.pageCnt+");'>&rsaquo;</a></li>";
			paging+="</ul>";
			paging+="</div>";
			$("#sidebar").empty().append(html);
			$("#page").empty().append(paging);
			$(".pageIndex"+(data.pagingVo.index+1)).addClass("page-item active");
			$("#listCount").empty().append(text);
			$("#total").val(data.pagingVo.total);
			$("#listCnt").val(data.pagingVo.listCnt);
			$("#pageCnt").val(data.pagingVo.pageCnt);
			
			var jsonLatLng = JSON.stringify(latLngArray);
			 //console.log("클러스터러 인입 페이징 ajax: "+jsonLatLng);
			if(latLngArray["flag"] == 0){
				//console.log("index에서 클러스터 생성 인입.....");
				 $.ajax({
					 	contentType : "application/json",
				    	url : "mapClusterer.do",
				    	type : "post",
				    	dataType : "json",
				    	data : jsonLatLng,
					 	success : function(responseData){
						    var position = responseData;
					        var markers = $(position.positions).map(function(i, position) {
					            return new daum.maps.Marker({
					                position : new daum.maps.LatLng(position.lat, position.lng)         	
					            });
					        });
					        // 클러스터러에 마커들을 추가합니다
				        	clusterer.clear();
					        clusterer.addMarkers(markers);
					        
						}
				 });
			}
		 }
		 ,beforeSend:function(){ // 미완성 
	    	 $('#loading').show();
		 }
	     ,complete:function(){
    		 setTimeout( function() { $('#loading').hide() }, 1000); 
	     }
	
	});
	 
}


// 리스트출력개수 처리
function listCnt() {
	document.getElementById("index").value = 0;
	document.getElementById("pageStartNum").value = 1;
	document.getElementById("listCnt").value = document.getElementById("listCount").value;
	frmPaging();
}
//window.onload = function() {
$('document').ready(function(){	
	// 현재번호 active
	var index = document.getElementById("index").value;
	var pageIndex = document.querySelector('.pageIndex'+(Number(index)+1));
	pageIndex.setAttribute("class", "page-item active"); ////page에 인덱스 1번 포인트 주는 함수
	// 리스트갯수 selected 처리
	$("#listCount > option").each(function () {
		if ($(this).val() == $('#listCnt').val()) {
			$(this).prop("selected", true);
		}
	});
});

