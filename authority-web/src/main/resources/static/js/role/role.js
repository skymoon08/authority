var $table = $('#role_table'),
    $remove = $('#remove'),
    selections = [],
	validator;
//初始化表格       
function initTable() {
    $table.bootstrapTable({
    	  icons: {
				  paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
				  paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
				  refresh: 'glyphicon-refresh icon-refresh',
				  toggle: 'glyphicon-list-alt icon-list-alt',
				  columns: 'glyphicon-th icon-th',
				  detailOpen: 'glyphicon-chevron-down icon-plus',
				  detailClose: 'glyphicon-chevron-up icon-minus'
				},
        columns: [{
	                field: 'state',
	                checkbox: true,
	                align: 'center',
	                valign: 'middle'
	            },
                {
                    field: 'role_uuid',
                    title: 'RoleUUID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'role_name',
                    title: '角色名',
                    sortable: true,
                    align: 'center',
                }, {
                    field: 'role_platform_name',
                    title: '所属平台',
                    sortable: true,
                    align: 'center',
                }, {
                	field: 'role_status_name',
                	title: '角色状态',
                	sortable: true,
                	align: 'center',
                },{
                	field: 'role_add_time',
                	title: '增加时间',
                	sortable: true,
                	align: 'center'
                },{
                	field: 'role_edit_time',
                	title: '修改时间',
                	sortable: true,
                	align: 'center'
                },{
                	field: 'role_add_by_name',
                	title: '增加人',
                	align: 'center'
                },{
                	field: 'role_edit_by_name',
                	title: '修改人',
                	align: 'center'
                }, {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    events: operateEvents,
                    formatter: operateFormatter
                }
            ]
    });
    
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        // save your data, here just save the current page
        selections = getIdSelections();
        // push or splice the selections if you want to save all data selections
    });
}
        
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.role_uuid;
    });
}
        
//详情
function detailFormatter(index, row) {
    var html = [];
    html.push('<p><b>' + 'roleUUID' + ':</b> ' + row.role_uuid + '</p>');
    html.push('<p><b>' + '角色名' + ':</b> ' + row.role_name + '</p>');
    html.push('<p><b>' + '角色状态' + ':</b> ' + row.role_status_name + '</p>');
    html.push('<p><b>' + '所属平台' + ':</b> ' + row.role_platform_name + '</p>');
    html.push('<p><b>' + '增加时间' + ':</b> ' + row.role_add_time + '</p>');
    html.push('<p><b>' + '修改时间' + ':</b> ' + row.role_edit_time + '</p>');
    html.push('<p><b>' + '增加人' + ':</b> ' + row.role_add_by_name + '</p>');
    html.push('<p><b>' + '修改人' + ':</b> ' + row.role_edit_by_name+ '</p>');
    return html.join('');
}
//操作:删除,编辑
function operateFormatter(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="编辑">',
        '<i class="fa fa-edit"></i>',
        '</a>  　',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="fa fa-remove"></i>',
        '</a>'
    ].join('');
}
window.operateEvents = {
    'click .edit': function (e, value, row, index) {
    	//重置校验
    	validator.resetForm();
    	//初始化编辑
        $("#addPageTitle").text("编辑角色");
        $("#addForm").attr("action","/role/edit");
        $("#save").text("修改");
        $("#addPage").attr("sign","edit");
        $("#addPage").modal("show");
        if($("#role_uuid").length <= 0){
        	uuidInput = '<input id="role_uuid" name="role_uuid" class="form-control" type="hidden" value="'+row.role_uuid+'">';
            $("#addForm").append(uuidInput);
        }
        else{
        	$("#role_uuid").val(row.role_uuid);
        }
        $.each(row, function(key, value){
        		$("#"+key).val(value);
        });
    },
    'click .remove': function (e, value, row, index) {
    		var param = {};
    		param.role_uuid = row.role_uuid;
    	    swal({
    	        title: "您确定要删除这条信息吗",
    	        text: "删除后将无法恢复，请谨慎操作！",
    	        type: "warning",
    	        showCancelButton: true,
    	        confirmButtonColor: "#DD6B55",
    	        confirmButtonText: "删除",
    	        cancelButtonText: "取消",
    	        closeOnConfirm: false
    	    }, function () {
			    	    	$.ajax({  
			    	  	       url: "/role/delete",  
			    	  	       dataType: "json", 
			    	  	       data: param,
			    	  	       success: function (res) {  
			    	  	    	   var data = $.parseJSON(res);
			    	  	    	  if(data.success){
			    	  	    		  	$table.bootstrapTable('refresh');
			    	  					swal({
			    	 	    					title: "",
			    	 	    					text: "删除成功",
			    	 	    					type: "success"
			    	 	    				});
			    	  	    	  }
			    	  	    	  else{
			    	 	 	    		 swal({
			    	 	 					title: "",
			    	 	 					text: "发生错误",
			    	 	 					type: "error"
			    	 	 				});
			    	  	    	  }
			    	  	       },  
			    	  	       error: function (XMLHttpRequest, textStatus, errorThrown) {  
			    	  	    	  swal({
			    	 					title: "",
			    	 					text: "发生错误",
			    	 					type: "error"
			    	 				});
			    	  	       }  
			    	  	   });  
    	    });
    },
    
};




//验证
function validate(){
	// validate signup form on keyup and submit
	var icon = "<i class='fa fa-times-circle'></i> ";
	validator = $("#addForm").validate({
			    rules: {
			    	role_platform_uuid:{
			    	 	required:true
			    	},
			    	role_name:{
			    		required: true,
			    		checkRoleName: true,
			    		rangelength:[2,16],
			    		checkRoleNameRepeat: true
			    	}
			    },
			    messages: {
			    	role_platform_uuid:{
			    		required: icon+"平台是必填项"
			    	},
			    	role_name:{
			    		required: icon+"角色名是必填项",
			    		rangelength:icon+"长度必须在2-16个字符"
			    	}
			    },
			    submitHandler: function(form){
			    	$(form).ajaxSubmit({
			    		type: "POST",
			    		dataType: "json",
			    		success: function(res){
			    			var data = $.parseJSON(res);
			    			if(data.success){
			    				$("#addPage").modal('hide');
			    				$table.bootstrapTable('refresh');
			    				if($("#addPage").attr("sign")  == 'add')
			    				{
			    					swal({
				    					title: "",
				    					text: "增加成功",
				    					type: "success"
				    				});
			    				}
			    				else if($("#addPage").attr("sign")  == 'edit'){
			    					swal({
				    					title: "",
				    					text: "修改成功",
				    					type: "success"
				    				});
			    				}
			    				else{
			    					swal({
				    					title: "",
				    					text: "发生错误",
				    					type: "error"
				    				});
			    				}
			    			}
			    			else{
			    				swal({
			    					title: "",
			    					text: "发生错误",
			    					type: "error"
			    				});
			    			}
			    		}
			    	});
			    }
			});

	$.validator.addMethod("checkRoleNameRepeat",function(value,element,params){  
		var param = {};
		param.role_name = value;
		param.role_platform_uuid = $("#role_platform_uuid").val();
		if($("#role_uuid").length > 0){
			param.role_uuid = $("#role_uuid").val();
		}
		var result;
		$.ajax({  
	       url: "/role/isRepeat",  
	       dataType: "json", 
	       data: param,
	       async:false,
	       success: function (res) {  
	    	   var data = $.parseJSON(res);
	    	   if(typeof data == 'boolean'){
	    		  result=data;
	    	   }
	    	   else{
	    		   swal({
	 					title: "",
	 					text: "发生错误",
	 					type: "error"
	 				});
	    		   return;
	    	   }
	       },  
	       error: function (XMLHttpRequest, textStatus, errorThrown) {  
	    	   swal({
					title: "",
					text: "发生错误",
					type: "error"
				});
	       }  
	   });  
		return this.optional(element) || result;  
    },icon+"该平台已存在该角色名");  
	
	$.validator.addMethod("checkRoleName",function(value,element,params){  
        var checkPlatName = /^[\u4e00-\u9fa5]{2,16}$/;  
        return this.optional(element)||(checkPlatName.test(value));  
    },icon+"平台名必须是2-16个汉字"); 
}

//初始化下拉列表
function initStatus(){
	$("#role_platform_uuid").html("");
	$("#role_status").html("");
	$.ajax({  
	       url: "/role/getStatusList",  
	       dataType: "json",  
	       success: function (res) {  
	    	   var data = $.parseJSON(res);
	    	   $.each(data, function (key, value) {  
	    			if("role_status" == key){
	    		   		$.each(value, function(key, value){
	    		   			$("#role_status").append("<option value="+value+">" +key + "</option>");
	    		   		});
	    		   	}
	    		   	if("platform" == key){
	    		   		$.each(value, function(key, value){
	    		   			$("#role_platform_uuid").append("<option value="+value+">" +key + "</option>");
	    		   		});
	    		   	}
	    	    });  
	       },  
	       error: function (XMLHttpRequest, textStatus, errorThrown) {  
	    	   swal({
					title: "",
					text: "发生错误",
					type: "error"
				});
	       }  
	   });  
}


        
$(function () {
	
   initTable();
   initStatus();
   validate();
   
   $("#save").on("click",function(){
	   $("#addForm").submit();
   });
   
   $("#addButton").on("click",function(){
	   validator.resetForm();
	   $("#addPageTitle").text("增加角色");
	    $("#addForm").attr("action","/role/add");
	    $("#save").text("保存");
	    $("#addPage").attr("sign","add");
	    $("#addPage").modal("show");
	    if($("#role_uuid").length > 0){
	    	$("#role_uuid").remove();
        }
	    $("#role_name").val("");
	    initStatus();
   });
   $remove.on("click", function(){
	   swal({
	        title: "您确定要删除这"+selections.length+"条信息吗",
	        text: "删除后将无法恢复，请谨慎操作！",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "#DD6B55",
	        confirmButtonText: "删除",
	        cancelButtonText: "取消",
	        closeOnConfirm: false
	    }, function () {
				    $.ajax({  
					       url: "/role/deleteBatch",  
					       type: "POST",
					       dataType: "json",  
					       contentType:"application/json",
					       data: JSON.stringify(selections), 
					       success: function (res) {  
					    	  var data = $.parseJSON(res);
					    	  if(data.success){
					    		  $table.bootstrapTable('refresh');
					    		  swal({
					    			  title: "",
					    			  text: "删除成功",
					    			  type: "success"
					    		  });
					    	  }
					    	  else{
					    		  swal({
					    			  title: "",
					    			  text: "删除失败",
					    			  type: "error"
					    		  })
					    	  }
					       },  
					       error: function (XMLHttpRequest, textStatus, errorThrown) {  
					    	   swal({
									title: "",
									text: "发生错误",
									type: "error"
								});
					       }  
					   });  
	    });
	   
   });
   
  
});


