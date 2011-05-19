(function(){
    function require(uri) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = uri;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}
	
    function resize(width, height) {
        while (true) {
            try {
                var w = 800, h = 600
                window.resizeTo(w, h);
                window.moveTo((window.screen.width - w) / 2, (window.screen.height - h) / 2);
                break;
            } catch (e) { continue; }
        }
    }

	// 需要导入的包
	require('scripts/windnd.js');
    require('scripts/status-1.0.3.js');
	require('scripts/utils.js')
	require('scripts/reader.js');

    // 初始化窗口尺寸
    resize(800, 600);
})();
