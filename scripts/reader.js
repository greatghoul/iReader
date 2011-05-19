var fso  = new ActiveXObject('Scripting.FileSystemObject');
var file = null;
var fileName = '';
var lastChapter = null;
var chapter_pattern = /^\s*[卷第].{1,20}[卷章飞].*$/

// 获取章节内容
function readChapterContent(head, tail) {
    var file = fso.OpenTextFile(fileName, 1);
    var content = [];
    while (!file.AtEndOfStream) {
        if (file.Line < head) {
            file.SkipLine();
        } else if (file.Line < tail) {
            content.push(escapeHTML(file.ReadLine()));
        } else {
            file.close();
            break;
        }
    }
    return '<p>' + content.join('</p><p>') + '</p>';
}

// 显示章节
function showChpater(chapter, head, tail) {
    get('main-title').innerHTML = chapter.innerText;
    get('content').innerHTML = '加载中...';
    if (lastChapter) lastChapter.className = '';
    chapter.className = 'curr-chapter';
    lastChapter = chapter;
    Status.show('正在加载章节 ' + chapter.innerText);
    var timer = setTimeout(function() {
        get('content').innerHTML = readChapterContent(head, tail);
        Status.hide();
        clearTimeout(timer);
    }, 0);
}

// 打开第一章
function openFirstChpater(chapterList) {
    var link = chapterList.getElementsByTagName('A')[0];
    if (link) link.click();
    
}

// 在目录中添加一个章节
function appendChapter(menu, chapter, head, tail) {
    var chapterNode = document.createElement('LI');
    chapterNode.innerHTML = '<a href="#" '
        + 'onclick="showChpater(this, ' + head + ', ' + tail + ')">' 
        + escapeHTML(trim(chapter)) + '</a>';
    menu.appendChild(chapterNode);
}

// 构建章节目录
function buildMenu() {
    Status.show('正在建立目录索引(' + fileName + ')...');
    setTimeout(function() {
        var chapterList = get('chapter-list');
        chapterList.innerHTML = '';
        get('main-title').innerHTML = '';
        get('content').innerHTML = '';
        var headLineNumber = tailLineNumber = 1; // 初始行号为1
        var chapterTitle = '前言';
        var menu = document.createDocumentFragment();
        while (!file.AtEndOfStream) {
            var line = file.ReadLine();
            if (chapter_pattern.test(line)) {
                tailLineNumber = file.Line - 1;
                appendChapter(menu, chapterTitle, headLineNumber, tailLineNumber);
                chapterTitle = line;
                headLineNumber = tailLineNumber;
            }
        }
        tailLineNumber = file.Line;
        appendChapter(menu, chapterTitle, headLineNumber, tailLineNumber);        
        chapterList.appendChild(menu);
        Status.hide();
        
        openFirstChpater(chapterList);
    }, 0);
}

// 打开小说
function openFile() {
    var dlg = new ActiveXObject("UserAccounts.CommonDialog");
    dlg.Filter = "Text Files|*.txt|All Files|*.*";
    dlg.FilterIndex = 1;
    dlg.InitialDir = "books";
    if(dlg.ShowOpen()) {
        fileName = dlg.FileName;
        file = fso.OpenTextFile(fileName, 1);
        buildMenu();
    }
}
