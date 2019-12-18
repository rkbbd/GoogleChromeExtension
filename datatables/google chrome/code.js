chrome.storage.sync.get('color', function(data) {
    document.body.style.backgroundColor = data.color;
    });
    
  
  var options = Initializer({});
  ThemeManager(options);
  target = document.getElementsByTagName("table");
  for(var i = 0; i < target.length; i++){
    var targetId = target[i].hasAttribute("id");
    if (!targetId) {
        target[i].setAttribute("id", "tbl_" + i);
    }
    setTable(target[i]);
  }
  



  var search = function (target, inputSearch) {
      target = document.getElementById(target);

      var filter,
          tr,
          td,
          i,
          txtValue,
          matchCount = 0;
      filter = inputSearch.toUpperCase();
      tr = target.getElementsByTagName("tr");

      // CURRENT PAGE ROW
      var currentPage = parseInt(
          document.getElementById("currentPage_" + target.id).innerHTML
      );
      var itemsPerPage = parseInt(
          document.getElementById("itemsPerPage_" + target.id).innerHTML
      );

      var from = (currentPage - 1) * parseInt(itemsPerPage) + 1;
      var to = from + parseInt(itemsPerPage) - 1;
      to = to > tr.length - 1 ? tr.length - 1 : to;

      for (i = from; i <= to; i++) {
          //tr
          td = tr[i].getElementsByTagName("td");
          if (td.length > 0) {
              var displayStatus = "none";
              for (var j = 0; j < td.length; j++) {
                  //td
                  txtValue = td[j].textContent || td[j].innerText; //td Content
                  if (txtValue.toUpperCase().indexOf(filter) > -1) {
                      //Search
                      displayStatus = "";
                      td[j].style.color = _color.SearchMatch;
                      td[j].style.fontWeight = "bold";

                      if (filter === "") {
                          //no word input
                          td[j].style.fontWeight = "normal";
                          td[j].style.color = _color.EvenRowFont;
                      }
                  } else {
                      td[j].style.fontWeight = "normal";
                      td[j].style.color = _color.EvenRowFont;
                  }
              }
              tr[i].style.display = displayStatus;
              if (displayStatus == "") {
                  //match row count
                  matchCount++;
              }
          }
      }
      tableColor(tr); //table odd/even Color set
      if (_feature.TotalNoOfPage) {
          matchCount = filter === "" ? to : matchCount;
          var totalPage = document.getElementById("totalPage_" + target.id);
          totalPage.innerHTML =
              from + "<i> to </i>" + (matchCount + from) + " of " + tr.length;
      }
  };
  var sortTable = function (target, n) {
      var table,
          rows,
          switching,
          i,
          x,
          y,
          shouldSwitch,
          dir,
          switchcount = 0;
      switching = true;
      dir = "asc";
      table = document.getElementById(target);
      var currentPage = parseInt(
          document.getElementById("currentPage_" + table.id).innerHTML
      );
      var itemsPerPage = parseInt(
          document.getElementById("itemsPerPage_" + table.id).innerHTML
      );

      while (switching) {
          switching = false;
          rows = table.rows;
          var from = (currentPage - 1) * parseInt(itemsPerPage) + 1;
          var to = from + parseInt(itemsPerPage) - 1;
          to = to >= rows.length ? rows.length - 1 : to;
          for (i = from; i < to; i++) {
              shouldSwitch = false;
              x = rows[i].getElementsByTagName("TD")[n];
              y = rows[i + 1].getElementsByTagName("TD")[n];
              if (dir === "asc") {
                  if (!isNaN(x.innerHTML) && !isNaN(y.innerHTML)) {
                      if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                          //nubmer row compare
                          shouldSwitch = true;
                          break;
                      }
                  } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                      //string row
                      shouldSwitch = true;
                      break;
                  }
              } else if (dir === "desc") {
                  if (!isNaN(x.innerHTML) && !isNaN(y.innerHTML)) {
                      if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                          shouldSwitch = true;
                          break;
                      }
                  } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      shouldSwitch = true;
                      break;
                  }
              }
          }
          if (shouldSwitch) {
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
              switchcount++;
          } else {
              if (switchcount === 0 && dir === "asc") {
                  dir = "desc";
                  switching = true;
              }
          }
      }
      tableColor(rows);
  };
  function pager(target, currentPage, itemsPerPage) {
      var rows = target.rows;
      var records = rows.length - 1;
      var pages = Math.ceil(records / itemsPerPage);
      document.getElementById("pages_" + target.id).innerHTML = pages;
      var pageIndex = document.createElement("DIV");
      pageIndex.setAttribute("id", "pageIndex_" + target.id);
      pageIndex.style.styleFloat = "left";
      pageIndex.style.cssFloat = "left";
      pageIndex.style.display = "inline-block";
      pageIndex.style.paddingTop = "10px";

      var prevColor =
          currentPage === 1 ? _color.PageDisableFont : _color.PageFont;
      var nextColor =
          currentPage === pages ? _color.PageDisableFont : _color.PageFont;

      var pagerHtml =
          '<span style="cursor: pointer;color:' +
          prevColor +
          '" onclick="prev(' +
          target.id +
          ');" class="pg-normal"> « Prev </span> ';
      for (var page = 1; page <= pages; page++) {
          if (currentPage == page) {
              pagerHtml +=
                  '<span id="pg' +
                  target.id +
                  page +
                  '" class="pg-normal" style="cursor: pointer;background: ' +
                  _color.PageSelected +
                  '; padding: 2px 6px;border-radius: 100%;" onselectstart="return false;" onclick="showPage(' +
                  target.id +
                  ", " +
                  page +
                  ');">' +
                  page +
                  "</span> ";
          } else {
              pagerHtml +=
                  '<span id="pg' +
                  target.id +
                  page +
                  '" class="pg-normal" style="cursor: pointer;background: ' +
                  _color.Page +
                  '; padding: 2px 6px;border-radius: 100%;" onselectstart="return false;" onclick="showPage(' +
                  target.id +
                  ", " +
                  page +
                  ');">' +
                  page +
                  "</span> ";
          }
      }
      pagerHtml +=
          '<span style="cursor: pointer;color:' +
          nextColor +
          '" onclick="next(' +
          target.id +
          ');" class="pg-normal"> Next »</span>';
      pages = document.getElementById("pageIndex_" + target.id);
      if (pages !== null) {
          pages.innerHTML = "";
      }

      pageIndex.innerHTML = pagerHtml;
      target.parentNode.insertBefore(pageIndex, target.nextSibling);
  }
function tableColor (rows) {
      var back_color = _color.EvenRow;
      var color = _color.EvenRowFont;

      for (var c = 1; c < rows.length; c++) {
          //Row Hover
          rows[c].onmouseover = function () {
              this.style.backgroundColor = _color.TableHover;
          };
          rows[c].onmouseout = function () {
            tableColor(rows);
          };

          rows[c].style.border = _table.Border;

          if (rows[c].style.display === "none") {
              continue;
          }
          if (color === "") {
              rows[c].style.backgroundColor = back_color;
              rows[c].style.color = color;
              //row color change
              back_color = _color.EvenRow;
              color = _color.EvenRowFont;
          } else {
              rows[c].style.backgroundColor = back_color;
              rows[c].style.color = color;
              back_color = _color.OddRow;
              color = _color.OddRowFont;
          }
      }
      if (_feature.LastRow) {
          rows[rows.length - 1].style.backgroundColor = _color.LastRow;
      }
  };
function showPage (target, pageNumber) {
      document.getElementById(
          "currentPage_" + target.id
      ).innerHTML = pageNumber;

      var itemsPerPage = parseInt(
          document.getElementById("itemsPerPage_" + target.id).innerHTML
      );
      showRecords(target, itemsPerPage);

      //page selected color change
      var newPageAnchor = document.getElementById(
          "pg" + target.id + pageNumber
      );
      newPageAnchor.style.backgroundColor = _color.PageSelected;
      newPageAnchor.style.color = _color.PageSelectedFont;
  };
 function showRecords (target, itemsPerPage) {
      var currentPage = parseInt(
          document.getElementById("currentPage_" + target.id).innerHTML
      );

      if (itemsPerPage === "") {
          itemsPerPage = document.getElementById("ddlPage_" + target.id).value;
      }
      setTimeout(function () {
          document.getElementById("txtNoOfPage_" + target.id).value = "";
      }, 1000); //input empty

      var from = (currentPage - 1) * parseInt(itemsPerPage) + 1;
      var to = from + parseInt(itemsPerPage);
      var rows = target.rows;
      if (from > rows.length) {
          from = currentPage = 1;
          // to = itemsPerPage = 10;
          to = from + parseInt(itemsPerPage);
      }
      for (var i = 1; i < rows.length; i++) {
          if (i < from || i >= to) rows[i].style.display = "none";
          else rows[i].style.display = "";
      }
      if (_feature.Paging) {
          pager(target, currentPage, itemsPerPage);
      }

      tableColor(rows);

      if (_feature.TotalNoOfPage) {
          to = to > rows.length ? rows.length - 1 : to - 1;
          var totalPage = document.getElementById("totalPage_" + target.id);
          totalPage.innerHTML =
              from + "<i> to </i>" + to + " of " + (rows.length - 1);
      }
  };
function prev (target) {
      var currentPage = parseInt(
          document.getElementById("currentPage_" + target.id).innerHTML
      );
      if (currentPage > 1) {
          showPage(target, currentPage - 1);
      }
  };
function next (target) {
      var currentPage = parseInt(
          document.getElementById("currentPage_" + target.id).innerHTML
      );
      var pages = parseInt(
          document.getElementById("pages_" + target.id).innerHTML
      );
      if (currentPage < pages) {
          showPage(target, currentPage + 1);
      }
  };
 function exportTableToExcel (tableID, filename = "") {
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
      filename = filename ? filename + ".xls" : "excel_data.xls";
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);
      if (navigator.msSaveOrOpenBlob) {
          var blob = new Blob(["\ufeff", tableHTML], {
              type: dataType
          });
          navigator.msSaveOrOpenBlob(blob, filename);
      } else {
          downloadLink.href = "data:" + dataType + ", " + tableHTML;
          downloadLink.download = filename;
          downloadLink.click();
      }
  };
function exportTableToWord (tableID, filename = "") {
          var downloadLink;
          var dataType = "application/msword";
          var tableSelect = document.getElementById(tableID);
          var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
          filename = filename ? filename + ".doc" : "word_data.doc";
          downloadLink = document.createElement("a");
          document.body.appendChild(downloadLink);

          if (navigator.msSaveOrOpenBlob) {
              var blob = new Blob(["\ufeff", tableHTML], {
                  type: dataType
              });
              navigator.msSaveOrOpenBlob(blob, filename);
          } else {
              downloadLink.href = "data:" + dataType + ", " + tableHTML;
              downloadLink.download = filename;
              downloadLink.click();
          }
 };
function PrintTable(tableID) {
              var originalContents = document.body.innerHTML;

              document.body.innerHTML = document.getElementById(tableID).outerHTML;
              window.print();
              document.body.innerHTML = originalContents;
              return window.location.reload(true);
};

function setTable (target) {
              
              var currentPage = 1;
              var itemsPerPage = 9;
              var caption = document.getElementsByTagName("caption");
              if (caption !== null) {
                  for (var m = 0; m < caption.length; m++) {
                      caption[m].style.marginTop = "-20px";
                  }
              }

              target.style.width = _table.Width;
              target.style.borderCollapse = _table.borderCollapse;
              target.style.font = _table.Font;
              var rows = target.rows;

              //Search box

              if (_feature.Print) {
                  var print_btn = document.createElement("button");
                  print_btn.setAttribute("id", "print_btn_" + target.id);
                  print_btn.innerHTML = "🖨️";
                  print_btn.style.styleFloat = "right";
                  print_btn.style.cssFloat = "right";
                  print_btn.style.padding = "4px 0px 4px 0px";
                  print_btn.style.backgroundColor = _color.PrintBtn;
                  print_btn.style.minWidth = "30px";

                  target.parentNode.insertBefore(print_btn, target);
                  print_btn.onclick = function (e) {
                      PrintTable(target.id);
                  };
              }
              if (_feature.Download) {
                  var ddDownload = document.createElement("SELECT");
                  ddDownload.setAttribute("id", "ddDownload_" + target.id);

                  var op0 = new Option();
                  op0.value = 0;
                  op0.text = "[Select]";
                  var op1 = new Option();
                  op1.value = 1;
                  op1.text = "Excel";
                  var op2 = new Option();
                  op2.value = 2;
                  op2.text = "Word";
                  ddDownload.options.add(op0);
                  ddDownload.options.add(op1);
                  ddDownload.options.add(op2);

                  ddDownload.style.styleFloat = "right";
                  ddDownload.style.cssFloat = "right";
                  ddDownload.style.display = "inline-block";
                  ddDownload.style.border = "2px solid #ccc";
                  ddDownload.style.borderRadius = "4px";
                  ddDownload.style.boxSizing = "border-box";
                  ddDownload.style.backgroundRepeat = "no-repeat";
                  ddDownload.style.padding = "4px 0px 4px 0px";
                  ddDownload.style.marginBottom = "7px";
                  ddDownload.style.marginRight = "5px";
                  ddDownload.style.fontSize = "14px";
                  ddDownload.style.minWidth = "70px";
                  ddDownload.style.textAlign = "center";
                  target.parentNode.insertBefore(ddDownload, target);
                  ddDownload.onchange = function (e) {
                      var today = new Date().toLocaleDateString();
                      if (this.value == 1) {
                          exportTableToExcel(target.id, today + "_");
                      } else if (this.value == 2) {
                          exportTableToWord(target.id, today + "_");
                      } else {
                          alert("Please Select One");
                      }
                  };
              }
              if (_feature.Searching) {
                  var txtInput = document.createElement("INPUT");
                  txtInput.setAttribute("type", "text");
                  txtInput.setAttribute("id", "txtSearch");
                  txtInput.setAttribute("placeholder", "Search..");
                  txtInput.style.display = "inline-block";
                  txtInput.style.border = "2px solid #ccc";
                  txtInput.style.borderRadius = "4px";
                  txtInput.style.boxSizing = "border-box";
                  txtInput.style.backgroundRepeat = "no-repeat";
                  txtInput.style.padding = "6px 20px 6px 35px";
                  txtInput.style.marginBottom = "7px";
                  txtInput.style.fontSize = "14px";
                  txtInput.style.styleFloat = "left";
                  txtInput.style.cssFloat = "left";
                  txtInput.style.width = "200px";
                  txtInput.style.backgroundImage =
                      "url(https://www.w3schools.com/css/searchicon.png)";
                  // txtInput.style.backgroundImage = "url(🔍)";
                  txtInput.style.backgroundPosition = "5px center";
                  txtInput.style.backgroundColor = _color.Search;
                  target.parentNode.insertBefore(txtInput, target);
                  txtInput.onkeyup = function (e) {
                      search(target.id, this.value);
                  };
              }
              if (_feature.ItemPerPage) {
                  var dd = document.createElement("SELECT");
                  dd.setAttribute("id", "ddlPage_" + target.id);
                  for (var o = 10; o < 200; o += o) {
                      var op = new Option();
                      op.value = o - 1;
                      op.text = o;
                      dd.options.add(op);
                  }
                  dd.style.styleFloat = "right";
                  dd.style.cssFloat = "right";
                  dd.style.display = "inline-block";
                  dd.style.border = "2px solid #ccc";
                  dd.style.borderRadius = "4px";
                  dd.style.boxSizing = "border-box";
                  dd.style.backgroundRepeat = "no-repeat";
                  dd.style.padding = "4px 0px 4px 0px";
                  dd.style.marginBottom = "7px";
                  dd.style.marginRight = "5px";
                  dd.style.fontSize = "14px";
                  dd.style.minWidth = "70px";
                  dd.style.textAlign = "center";
                  target.parentNode.insertBefore(dd, target);
                  dd.onchange = function (e) {
                      var itemsPerPage = this.value < 1 ? 1 : this.value;
                      document.getElementById(
                          "itemsPerPage_" + target.id
                      ).innerHTML = itemsPerPage;
                      showRecords(target, itemsPerPage);
                  };

                  var txtNoOfPage = document.createElement("INPUT");
                  txtNoOfPage.setAttribute("type", "number");
                  txtNoOfPage.setAttribute("id", "txtNoOfPage_" + target.id);
                  txtNoOfPage.style.styleFloat = "right";
                  txtNoOfPage.style.cssFloat = "right";
                  txtNoOfPage.style.border = "2px solid #ccc";
                  txtNoOfPage.style.borderRadius = "4px";
                  txtNoOfPage.style.boxSizing = "border-box";
                  txtNoOfPage.style.display = "inline-block";
                  txtNoOfPage.style.backgroundRepeat = "no-repeat";
                  txtNoOfPage.style.padding = "5px 0px 5px 0px";
                  txtNoOfPage.style.marginBottom = "5px";
                  txtNoOfPage.style.marginRight = "5px";
                  txtNoOfPage.style.fontSize = "14px";
                  txtNoOfPage.style.width = "50px";
                  target.parentNode.insertBefore(txtNoOfPage, target);
                  txtNoOfPage.onkeyup = function (e) {
                      var itemsPerPage = this.value < 1 ? 1 : this.value;
                      document.getElementById(
                          "itemsPerPage_" + target.id
                      ).innerHTML = itemsPerPage;
                      showRecords(target, itemsPerPage);
                  };
              }
              if (_feature.TotalNoOfPage) {
                  var from = (currentPage - 1) * itemsPerPage + 1;
                  var to = from + itemsPerPage - 1;
                  var spanPage = document.createElement("div");
                  spanPage.setAttribute("id", "totalPage_" + target.id);
                  spanPage.innerHTML = from + "<i> to </i>" + to + " of " + rows.length;
                  spanPage.style.styleFloat = "right";
                  spanPage.style.paddingTop = "10px";
                  spanPage.style.cssFloat = "right";
                  spanPage.style.display = "inline-block";
                  target.parentNode.insertBefore(spanPage, target.nextSibling);
              }

              var cPage = document.createElement("div");
              cPage.setAttribute("id", "currentPage_" + target.id);
              cPage.innerHTML = currentPage;
              cPage.minWidth = "100%";
              cPage.style.display = "none";
              target.parentNode.insertBefore(cPage, target.nextSibling);

              var itemPage = document.createElement("div");
              itemPage.setAttribute("id", "itemsPerPage_" + target.id);
              itemPage.innerHTML = itemsPerPage;
              itemPage.style.display = "none";
              target.parentNode.insertBefore(itemPage, target.nextSibling);

              var totelPages = document.createElement("div");
              totelPages.setAttribute("id", "pages_" + target.id);
              totelPages.innerHTML = "";
              totelPages.style.display = "none";
              target.parentNode.insertBefore(totelPages, target.nextSibling);

              var end = document.createElement("div");
              end.style.display = "inline-block";
              target.parentNode.insertBefore(end, target.nextSibling);

              for (var i = 0; i < rows.length; i++) {
                  for (var j = 0; j < rows[i].children.length; j++) {
                      rows[i].children[j].style.textAlign = "left";
                      rows[i].children[j].style.padding = "8px";
                      if (i === 0) {
                          //Header
                          rows[0].style.backgroundColor = _color.Header;
                          rows[0].style.color = _color.HeaderFont;
                          if (_feature.Sorting) {
                              rows[0].onmousedown = function (e) {
                                  return false;
                              }; //select disable
                              rows[0].children[j].myParam = j;
                              rows[0].children[j].addEventListener(
                                  "click",
                                  function (event) {
                                      var thIndex = event.currentTarget.myParam;
                                      sortTable(target.id, thIndex);
                                  },
                                  false
                              );
                          }
                      }
                  }
              }
              showRecords(target, itemsPerPage);
              tableColor(rows);
 };

function Initializer (opt) {
              _defaults = {
                  _header: "#69a0c9",
                  _headerFont: "White",
                  _evenRow: "#f2f2f2",
                  _evenRowFont: "black",
                  _oddRow: "#d5eaf0",
                  _oddRowFont: "",
                  _LastRow: "#c5cae1",
                  _page: "#f2f2f2",
                  _pageFont: "#000",
                  _pageSelected: "#69a0c9",
                  _pageSelectedFont: "#ffffff",
                  _pageDisableFont: "#bdbdbd",
                  _searchMatch: "#78a83d",
                  _search: "white",
                  _printBtn: "#69a0c9",
                  _tableHover: "#bcd9e1",
                  _theme: "",
                  _font:
                      "14px Baskerville, 'Palatino Linotype', 'Times New Roman', Times, serif",
                  _borderCollapse: "collapse",
                  _width: "100%",
                  _border: "1px solid #fff",
                  _paging: false,
                  _searching: true,
                  _itemPerPage: false,
                  _totalNoOfPage: false,
                  _sorting: true,
                  _download: true,
                  _print: true,
                  _lastRow: false,
                  _OFF: false,
                  _ajax: {
                      url: "",
                      tableId: "tbl_1",
                      params: { method: "GET" }
                  }
              };

              var Theme = opt._theme ? opt._theme : _defaults._theme;
              var Table = {
                  Font: opt._font ? opt._font : _defaults._font,
                  borderCollapse: opt._borderCollapse ? opt._borderCollapse : _defaults._borderCollapse,
                  Width: opt._width ? opt._width : _defaults._width,
                  Border: opt._border ? opt._border : _defaults._border
              };
              var Color = {
                  Header: opt._header ? opt._header : _defaults._header,
                  HeaderFont: opt._headerFont ? opt._headerFont : _defaults._headerFont,
                  EvenRow: opt._evenRow ? opt._evenRow : _defaults._evenRow,
                  EvenRowFont: opt._evenRowFont ? opt._evenRowFont : _defaults._evenRowFont,
                  OddRow: opt._oddRow ? opt._oddRow : _defaults._oddRow,
                  OddRowFont: opt._oddRowFont ? opt._oddRowFont : _defaults._oddRowFont,
                  LastRow: opt._LastRow ? opt._LastRow : _defaults._LastRow,
                  Page: opt._page ? opt._page : _defaults._page,
                  PageFont: opt._pageFont ? opt._pageFont : _defaults._pageFont,
                  PageSelected: opt._pageSelected ? opt._pageSelected : _defaults._pageSelected,
                  PageSelectedFont: opt._pageSelectedFont
                      ? opt._pageSelectedFont
                      : _defaults._pageSelectedFont,
                  PageDisableFont: opt._pageDisableFont
                      ? opt._pageDisableFont
                      : _defaults._pageDisableFont,
                  SearchMatch: opt._searchMatch
                      ? opt._searchMatch
                      : _defaults._searchMatch,
                  Search: opt._search ? opt._search : _defaults._search,
                  PrintBtn: opt._printBtn ? opt._printBtn : _defaults._printBtn,
                  TableHover: opt._tableHover ? opt._tableHover : _defaults._tableHover
              };
              var Feature = {
                  Paging: opt._paging ? opt._paging : _defaults._paging,
                  Searching: opt._searching ? opt._searching : _defaults._searching,
                  ItemPerPage: opt._itemPerPage
                      ? opt._itemPerPage
                      : _defaults._itemPerPage,
                  TotalNoOfPage: opt._totalNoOfPage
                      ? opt._totalNoOfPage
                      : _defaults._totalNoOfPage,
                  Sorting: opt._sorting ? opt._sorting : _defaults._sorting,
                  Download: opt._download ? opt._download : _defaults._download,
                  Print: opt._print ? opt._print: _defaults._print,
                  LastRow: opt._lastRow ? opt._lastRow : _defaults._lastRow,
                  OFF: opt._OFF ? opt._OFF : _defaults._OFF
              };
              if (opt._ajax) {
                  var AJAX = {
                      url: opt._ajax.url ? opt._ajax.url : _defaults._ajax.url,
                      tableId: opt._ajax.tableId ? opt._ajax.tableId : _defaults._ajax.tableId,
                      params: opt._ajax.params ? opt._ajax.params : _defaults._ajax.params
                  };
              }
         
              _color = Color;
              _feature = Feature;
              _table = Table;
              _theme = Theme;
              _ajax = AJAX;
              return opt;
   };
function ThemeManager (opt) {
              var Color = {};
              var modified = false;
              if (opt._theme === "Day") {
                  modified = true;
                  Color = {
                      Header: "#b0cc7f",
                      HeaderFont: _color.HeaderFont,
                      EvenRow: "#edf5df",
                      EvenRowFont: _color.EvenRowFont,
                      OddRow: "#cddeaf",
                      OddRowFont: _color.OddRowFont,
                      LastRow: "b0cc7f",
                      Page: _color.Page,
                      PageFont: _color.PageFont,
                      PageSelected: "#b0cc7f",
                      PageSelectedFont: _color.PageSelectedFont,
                      PageDisableFont: _color.PageDisableFont,
                      SearchMatch: _color.SearchMatch,
                      Search: _color.Search,
                      PrintBtn: "#b0cc7f",
                      TableHover: "#c3e08d"
                  };
              } else if (opt._theme === "Night") {
                  modified = true;
                  Color = {
                      Header: "#697a87",
                      HeaderFont: "white",
                      EvenRow: "#a4acb3",
                      EvenRowFont: _color.EvenRowFont,
                      OddRow: "#ced8e0",
                      OddRowFont: _color.OddRowFont,
                      LastRow: _color.LastRow,
                      Page: _color.Page,
                      PageFont: _color.PageFont,
                      PageSelected: _color.PageSelected,
                      PageSelectedFont: _color.PageSelectedFont,
                      PageDisableFont: _color.PageDisableFont,
                      SearchMatch: "#dbfc86",
                      Search: _color.Search,
                      PrintBtn: _color.PrintBtn,
                      TableHover: "#b7c1c9"
                  };
              } else if (opt._theme === "White") {
                  modified = true;
                  Color = {
                      Header: "#dfe0e8",
                      HeaderFont: "#000000",
                      EvenRow: "#fefefe",
                      EvenRowFont: _color.EvenRowFont,
                      OddRow: "#f2f0f0",
                      OddRowFont: _color.OddRowFont,
                      LastRow: "#dfe0e8",
                      Page: _color.Page,
                      PageFont: _color.PageFont,
                      PageSelected: _color.PageSelected,
                      PageSelectedFont: _color.PageSelectedFont,
                      PageDisableFont: _color.PageDisableFont,
                      SearchMatch: "#515152",
                      Search: _color.Search,
                      PrintBtn: "#dfe0e8",
                      TableHover: "#e1e1e3"
                  };
              }
              if (modified) {
                  _color = Color;
              }
   };

