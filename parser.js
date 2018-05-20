window.allNotes = [];
window.noteHTMLString = '';
window.children = document.querySelector('#kp-notebook-annotations').childNodes;

window.children.forEach((child) => {
    let text = child.innerText;
    let noteRegex = new RegExp('^Note');
    let highlightRegex = new RegExp('^Yellow highlight');
    if (noteRegex.test(text)) {
        const htmlString = getHTMLString(text, 'Single Note');
        window.noteHTMLString += htmlString;
    } else if (highlightRegex.test(text)) {
        const htmlString = getHTMLString(text, 'Highlight');
        window.noteHTMLString += htmlString;
    } else {
        console.log('Did not match anything');
    }
});

copyFormatted(window.noteHTMLString);

function getHTMLString (text, type) {
    let html = '';
    const parts = text.split(/\n+/g);
    const pageNum = getPage(parts[0]);
    const pageOrLocation = getPageOrLocation(parts[0]);
    html += `<h4>${type} (${pageOrLocation} ${pageNum})</h4><p>${parts[1]}</p>`;
    if (parts.length === 4) {
        const userNote = parts[2];
        const splitUserNote = userNote.split('Note:');
        html += `<p><strong>My note: </strong><em>${splitUserNote[1]}</em></p>`
    }
    html += '<hr>';
    return html;
}

function getPage(firstLineString) {
    let pageRegex = new RegExp(/\d+/g);
    const splitString = firstLineString.split('|');
    if (splitString[1]) {
        return splitString[1].match(pageRegex);
    } else {
        return 'no page found';
    }
}

function getPageOrLocation(firstLineString) {
    const splitString = firstLineString.split('|');
    console.log(splitString);
    let locationRegex = new RegExp(/\s*Location/);
    if (locationRegex.test(splitString[1])) {
        console.log('here!')
        return 'location';
    } else {
        return 'page';
    }
}

function copyFormatted (html) {
    // Create container for the HTML
    // [1]
    var container = document.createElement('div')
    container.innerHTML = html
  
    // Hide element
    // [2]
    container.style.position = 'fixed'
    container.style.pointerEvents = 'none'
    container.style.opacity = 0
  
    // Detect all style sheets of the page
    var activeSheets = Array.prototype.slice.call(document.styleSheets)
      .filter(function (sheet) {
        return !sheet.disabled
      })
  
    // Mount the container to the DOM to make `contentWindow` available
    // [3]
    document.body.appendChild(container)
  
    // Copy to clipboard
    // [4]
    window.getSelection().removeAllRanges()
  
    var range = document.createRange()
    range.selectNode(container)
    window.getSelection().addRange(range)
  
    // [5.1]
    document.execCommand('copy')
  
    // [5.2]
    for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
  
    // [5.3]
    document.execCommand('copy')
  
    // [5.4]
    for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false
  
    // Remove the container
    // [6]
    document.body.removeChild(container)
}

