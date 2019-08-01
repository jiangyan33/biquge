function emptyCase() {
    if (confirm('真的要清空书架吗？此操作不可恢复!')) {
        $.post('/bookcase/clear.php', {}, function (data) {
            data = eval("(" + data + ")");
            if (data.success) {
                window.location = '/bookcase.php';
            }
            else {
                alert(data.message);
            }
        });
    }

}

function removeCase(obj, csid) {
    if (confirm('真的要删除此书架条目吗？此操作不可恢复!')) {
        $.post('/bookcase/remove.php', { 'csid': csid }, function (data) {
            data = eval("("+data+")");
            if (data.success) {
                $(obj).parent().parent().remove();
            }
            else {
                alert(data.message);
            }

        });
    }
}


function postError(bid,cid){
    $.post('/posterror.php', {'bid': bid, 'cid': cid }, function (data) {
        data = eval("(" + data + ")");
		alert(data.message);
	});
}


function do_submit(f) {
    var u_name = f.username.value;
    var u_pwd = f.password.value;
    var u_pwd2 = f.repassword.value;
    var u_email = f.email.value;
    var json = { 'json': 1, 'username': u_name, 'password': u_pwd, 'repassword': u_pwd2,'email':u_email };
    $.post('/register.php', json, function (res) {
        alert(res.msg);
        if (res.success == 1) {
            window.location.href = res.goto;
        }
        return false;
    }, "json");
    return false;
}

function do_submit_login(f) {
    var u_name = f.username.value;
    var u_pwd = f.password.value;
    var usecookie = f.usecookie.value;
    var json = { 'json': 1, 'username': u_name, 'password': u_pwd,'usecookie':usecookie };

    $.post('/login.php', json, function (res) {
        alert(res.msg);
        
        if (res.success == 1) {
            window.location.href = res.goto;
            return true;
        }
        return false;
    }, "json");
    return false;
}

function addBookCase(bid){
	$.post("/addbookcase.php",
        {bid: bid },
        function(data){
            var msg="加入书架出错！";
            if(data==3)
            {
               msg="您还没有登录，请登录后加入该书到书架中！";
            }
            else if(data==2)
            {
                msg="加入书架出错！";
            }
            else if(data==4)
            {
                msg="该书已在书架中！";
            }
            else if(data==1)
            {
                msg="加入书架成功！";
            }
            alert(msg);
        }
    );
}

function addBookMark(aid,bid){
    $.post("/addbookmark.php",
       {bid: bid ,aid:aid},
       function(data){
            var msg="加入书签出错！";
            if(data==3)
            {
               msg="您还没有登录，请登录后加入书签！";
            }
            else if(data==2)
            {
                msg="加入书签出错！";
            }
            else if(data==4)
            {
                msg="该书签已在书架中！";
            }
            else if(data==1)
            {
                msg="加入书签成功！";
            }
            alert(msg);
        }
    );
}


function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+365)
    document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString()+";path=/";
}

function getCookie(c_name)
{
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    return "";
}

function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    document.cookie= name + "=;expires="+exp.toGMTString();
}
var bookUserName=getCookie("member_username");

function login(){
 document.writeln('<div class="ywtop"><div class="ywtop_con"><div class="ywtop_sethome"><a onclick="this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'https://www.biduo.cc\');"  href="#">将本站设为首页</a></div>');
    document.writeln('<div class="ywtop_addfavorite"><a href="javascript:window.external.addFavorite(\'https://www.biduo.cc\',\'笔趣屋_书友最值得收藏的网络小说阅读网\')">收藏笔趣屋</a></div>');
    document.writeln('<div class="nri">');
    if (bookUserName != '') {
        document.write('Hi,'+bookUserName+'&nbsp;&nbsp;<a href="/bookcase.php" target="_top">我的书架</a> | <a href="/passwd.php" target="_top">密码修改</a> | <a href="/logout.php" target="_self">退出登录</a>&nbsp;');
    }
    else {
        document.write('<form name="mylogin" id="mylogin" method="post" action="/login.php?action=login&amp;usecookie=120&amp;jumpurl=" https:="" www.biduo.cc=""><div class="cc"><div class="txt">账号：</div><div class="inp"><input type="text" name="username" id="username"></div></div><div class="cc"><div class="txt">密码：</div><div class="inp"><input type="password" name="password" id="password"></div></div><div class="frii"><input type="submit" class="int" value=" "></div><div class="ccc"><div class="txtt"></div><div class="txtt"><a href="/register.php">用户注册</a></div></div></form>');
    }
    document.writeln('</div></div></div>');
}

function footer(){
document.writeln("<div style=\"display:none\" >");
document.writeln("<script src=\'https://s13.cnzz.com/z_stat.php?id=1262689929&web_id=1262689929\' language=\'JavaScript\'></script>");
document.writeln("</div>");
//document.write("<scr"+"ipt type='text/javascript' src='https://code.zantainet.com/j/10602.js'></scr"+"ipt>");
//document.write("<scr"+"ipt type='text/javascript' src='https://code.zantainet.com/j/10605.js'></scr"+"ipt>");

(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
(function(){
   var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?c273ba633a16c550afbf3d77f87d433e":"https://jspassport.ssl.qhimg.com/11.0.1.js?c273ba633a16c550afbf3d77f87d433e";
   document.write('<script src="' + src + '" id="sozz"><\/script>');
})();


document.writeln('<div style="display:none;">');
document.writeln('<script>');
document.writeln('var _hmt = _hmt || [];');
document.writeln('(function() {');
  document.writeln('var hm = document.createElement("script");');
  document.writeln('hm.src = "//hm.baidu.com/hm.js?79146f7516f35fe12fd594789a89d25d";');
  document.writeln('var s = document.getElementsByTagName("script")[0]; ');
  document.writeln('s.parentNode.insertBefore(hm, s);');
document.writeln('})();');
			
			document.writeln('</script></div>');

}

function panel(){
//document.writeln("<form action=\"/search.php\" name=\"form\" id=\"sform\" target=\"_blank\" method=\"get\">");
document.writeln("<div class=\"search\">");
document.writeln("<input type=\"hidden\" name=\"s\" value=\"4424745511043303408\">");
document.writeln("<input type=\"hidden\" name=\"ie\" value=\"gbk\">");
document.writeln("<input name=\"keyword\" id=\"keyword\" type=\"text\" class=\"input\" value=\"输入需要搜索的小说\" onblur=\"if (value ==\'\'){value=\'输入需要搜索的小说\'}\" onfocus=\"if (value ==\'输入需要搜索的小说\'){value =\'\'}\" id=\"wd\"/><span class=\"s_btn\"><input type=\"button\" value=\" 搜 索 \" class=\"button\" onClick=\"window.location='/search.php?keyword='+encodeURI($('#keyword').val());\"></span>");
document.writeln("</div>");
//document.writeln("</form>");
}

function listindex(){
//document.write("<scr"+"ipt type='text/javascript' src='https://code.zantainet.com/j/10604.js'></scr"+"ipt>");
}

function list1(){
//document.write("<scr"+"ipt type='text/javascript' src='http://g.18tzx.com/pc.php?MjU5LjY=='></scr"+"ipt>");
}

function read1(){
}

function read2(){
//document.writeln('<div class="con_ad">');
//document.writeln('<div class="ad_1">');
//document.writeln("<script src='https://e.oeocriaq.cn/21078/12/0.stxhtml?'><\/script>");    
//document.writeln('</div>');
//document.writeln('<div class="ad_2">');
//document.writeln("<script src='https://e.oeocriaq.cn/21078/12/0.stxhtml?'><\/script>");    
//document.writeln('</div>');
//document.writeln('<div class="ad_3">');
//document.writeln("<script src='https://e.oeocriaq.cn/21078/12/0.stxhtml?'><\/script>");    
//document.writeln('</div>');
//document.writeln('</div>');
}

function read3(){
	document.writeln("<div style=\"text-align:center;padding:20px 0px;font-size:18px;\" ><a href=\"javascript:postErrorChapter();\" style=\"text-align:center;color:red;\">章节错误,点此举报(免注册)5分钟内会处理</a>,举报后请耐心等待,并刷新页面。</div>");
//document.writeln("<div id=\"jubao\"><a href=\"javascript:postErrorChapter();\" style=\"text-align:center;color:red;\">章节错误,点此举报(免注册)5分钟内会处理</a>,举报后请耐心等待,并刷新页面。<br />如果20分钟内没解决请发<a target=\"_blank\" href=\"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=Uj8zPDU1OCcwMz0SIyN8MT0-\" style=\"text-decoration:none;\"><font color=\"red\">邮件</font></a>给我们。谢谢书迷们的支持!</div>");

//document.writeln("<script src='https://e.oeocriaq.cn/21075/6/0.tpxhtml?'><\/script>"); 
}

function read4(){
//document.writeln("<script src='https://e.oeocriaq.cn/21075/6/0.tpxhtml?'><\/script>"); 
}

function tan(){
//fu
//document.write("<scr"+"ipt type='text/javascript' src='https://code.zantainet.com/j/10603.js'></scr"+"ipt>");
//tan
var randoms = {
	ad_list:[
		//"<scr"+"ipt type='text/javascript' src='https://m.oeocriaq.cn/8/8176.gpcjs?'></scr"+"ipt>"
	],
	get_cookie : function(Name){var search = Name + "=";var returnvalue = "";if (document.cookie.length > 0) {offset = document.cookie.indexOf(search);if (offset != -1) {offset += search.length;end = document.cookie.indexOf(";", offset);if (end == -1)end = document.cookie.length;returnvalue=unescape(document.cookie.substring(offset, end));}}return returnvalue;},
	init : function(){
		var adCount = 6;
		var id = parseInt(randoms.get_cookie('PPad_id_PP'));
		if (!id || id>=adCount)
			id = 0;

		if (id==0)
			document.writeln(randoms.ad_list[id]);
		
		var Then = new Date();
		id = id+1.0;
		Then.setTime(Then.getTime() + 2*3600*1000);
		document.cookie='PPad_id_PP='+id+';expires='+ Then.toGMTString()+';path=/;';
	}
}
randoms.init();
}

function dl(){
	//;(function(){var m = document.createElement("script");var url = "https://m.oeocriaq.cn";m.src = url + "/9/8176.pcjs?" + Math.round(Math.random() * 10000);var ss = document.getElementsByTagName("script")[0];ss.parentNode.insertBefore(m, ss);})();
}

function read5(){
}