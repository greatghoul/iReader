// get element by id
function get(id) {
    return document.getElementById(id);
}

// trim string
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, '');
}

// escape text from html
function escapeHTML(xml) {
    var text = xml;
    text = text.replace(/&/, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    text = text.replace(/&/g, '&amp;');
    text = text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    text = text.replace(/\s/g, '&nbsp;');
    return text;
}
