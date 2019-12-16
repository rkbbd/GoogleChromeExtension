chrome.storage.sync.get("color", function(data) {
  document.body.style.backgroundColor = data.color;
  if (!document.getElementById("modal_content")) {
    createIframe();
  }
});

function createIframe() {
  //--------------------Main Modal-------------------
  var modalDiv = document.createElement("div");
  modalDiv.setAttribute("id", "modal_content");
  modalDiv.style.width = "35%"; //420px
  modalDiv.style.height = "35%"; //345px
  modalDiv.style.padding = "5px";
  modalDiv.style.right = 0;
  modalDiv.style.bottom = 0;
  modalDiv.style.marginBottom = "30px";
  modalDiv.style.position = "fixed";
  modalDiv.style.zIndex = 9999;
  //------------------------------------------------
  //-----------------Close-------------------------
  var modal_span = document.createElement("span");
  modal_span.innerHTML = "X";
  modal_span.style.cssFloat = "right";
  modal_span.style.fontSize = "15px";
  modal_span.style.fontWeight = "bold";
  modal_span.style.cursor = "pointer";
  modal_span.onclick = function() {
    document.getElementById("modal_content").style.display = "none";
  };
  modalDiv.appendChild(modal_span);
  //------------------------------------------------
  //-----------------URL-------------------------
  var modal_input = document.createElement("input");
  modal_input.style.cssFloat = "left";
  modal_input.style.border = "0px";
  modal_input.style.borderLeft = "6px solid red";
  modal_input.style.color = "white";
  modal_input.style.width = "80%";
  modal_input.style.backgroundColor = "rgba(0,0,0,.5)";
  modal_input.onkeyup = function(e) {
    const url = this.value;
    var urlNew = "";
    if (e.keyCode == 13) {
      var youtube = url.toLowerCase().includes("youtube");
      if (youtube) {
        var va = getParameterByName("v", url);
        urlNew = "https://www.youtube.com/embed/" + va;
      } else {
        urlNew = url;
      }
      urlNew += "&autoplay=1";
      document.getElementById("modal_iframe").remove();
      var modal_iframe = document.createElement("iframe");
      modal_iframe.setAttribute("id", "modal_iframe");
      modal_iframe.width = "100%";
      modal_iframe.height = "100%";
      modal_iframe.style.padding = "5px";
      modal_iframe.src = urlNew;

      modalDiv.appendChild(modal_iframe);
    }

    e.preventDefault();
  };
  modalDiv.appendChild(modal_input);
  //------------------------------------------------

  //-----------------IFRAME-------------------------
  var modal_iframe = document.createElement("iframe");
  modal_iframe.setAttribute("id", "modal_iframe");
  modal_iframe.width = "100%";
  modal_iframe.height = "100%";
  modal_iframe.style.padding = "5px";
  chrome.storage.sync.get("url", function(data) {
    var url_ = "https://www.youtube.com/embed/Zm-Da5p9Exo";
    if (data.url === "undefine") {
      url_ = data.url;
    }
    modal_iframe.src = url_;
  });
  //modal_iframe.src = "https://www.youtube.com/embed/Zm-Da5p9Exo";

  modalDiv.appendChild(modal_iframe);

  //------------------------------------------------
  //------------------title-------------------------
  var title_span = document.createElement("marquee");
  title_span.innerHTML = "MD. RAKIB HASAN";
  title_span.style.position = "fixed";
  title_span.style.fontSize = "9px";
  title_span.width = "34%";
  title_span.style.right = 0;
  title_span.style.bottom = 0;
  modalDiv.append(title_span);

  document.body.appendChild(modalDiv);
}
function getParameterByName(name, url) {
  // if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getStroge() {}
