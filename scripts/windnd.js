//--定义移动窗口函数--//
var dragwin_cltx,dragwin_clty,dragwin_draging = false

function drag_move(){
if (dragwin_draging)
	{
	top.window.moveTo(event.screenX-dragwin_cltx,event.screenY-dragwin_clty);
	return false;
	}
}

function drag_down(){
	dragwin_cltx=event.clientX;
	dragwin_clty=event.clientY;
	dragwin_draging=true;
event.srcElement.setCapture();
}

function drag_up(){
	dragwin_draging=false;
event.srcElement.releaseCapture();
}