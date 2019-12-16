
chrome.storage.sync.get('color', function(data) {
document.body.style.backgroundColor=data.color;
  //alert(data.color);
});

