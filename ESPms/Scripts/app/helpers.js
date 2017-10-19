// Polyfills

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method 
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}

// -- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

function wpsDownloadFile(url) {

    // remove any existing iframes
    $("iframe.download-file").remove();

    // add iframe to body
    $("<iframe class='download-file'></iframe>")
        .css("display", "none")
        .attr("src", url)
        .appendTo("body");
}

function _reverse(s) {
    return Array.from(s).reverse().join('');
}

function wpsEncode(s) {
    return _reverse(btoa(s)) + "=";
}

//
// -- Helpers for the WPS Application

(function (ko) {

    // Knockout Extensions

    if (!ko.ext) {
        ko.ext = {}
    }

    ko.ext.renderComponent = function (element, name, params) {
        // container view model
        var Vm = function (n, p) {
            this.c = ko.observable({
                name: n,
                // not convinced this line actually matters
                // -- as we are passing into the new VM
                params: p
            })
        }

        // template html
        var div = $('<div data-bind="component: c"></div>')

        // element
        var el = $(element)
        if (!el.length) {
            console.warn("cannot find element for component", name, element)
            return
        }
        el.addClass("hide"); // hide this element initially

        // -- clear bindings as often being reused
        ko.ext.unapplyBindings(el)

        // clear and load
        el.empty().append(div)

        // apply
        ko.applyBindings(new Vm(name, params), el[0])

        // translate elements
        _.defer(function () {
            ko.ext.globalizeElement(el[0]);

            // display the element
            el.removeClass("hide");
        })
    }

    ko.ext.toJSON = function (model) {
        // this is a hack for dates.
        return JSON.parse(ko.mapping.toJSON(model))
    }

    ko.ext.globalizeElement = function (el) {
        var elems = $(el)
            .find('.translate');
        elems
            .each(function (item) {
                var elem = $(this);
                var rawText = elem.text();
                var translatedText = WpsApp.translate(rawText); // self.t(rawText);
                elem.text(translatedText);
                elem.removeClass('.translate');
            });
    }

    ko.ext.isValidEmail = function (email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return $.trim(email).match(pattern) ? true : false;
    }

    // http://stackoverflow.com/a/13459885/51507
    ko.ext.unapplyBindings = function ($node) {

        // clean node first up anyway
        $node.off();
        ko.cleanNode($node[0])

        // now destroy the children
        $node.find("*").each(function (index, item) {
            $(item).off();
            ko.removeNode(item);
            $(item).remove();
            item = null;
        });

        // run twice because we can

        $node.find("*").each(function (index, item) {
            $(item).off();
            ko.removeNode(item);
            $(item).remove();
            item = null;
        });

        // unbind events
        //$node.find("*").each(function () {
        //    $(this).unbind()
        //})

        //// Remove KO subscriptions and references
        //if (remove) {
        //    ko.removeNode($node[0])
        //} else {
        //    ko.cleanNode($node[0])
        //}
    }

    if (!ko.ext.dxSelectBox) {
        ko.ext.dxSelectBox = {}
    }

    ko.ext.dxSelectBox.autoSelectTextOnOpened = function (e) {
        var $input = e.element.find('.dx-texteditor-input');
        if ($input) {
            $input.select();
        }
    }

    if (!ko.ext.dxDataGrid) {
        ko.ext.dxDataGrid = {}
    }

    ko.ext.dxDataGrid.onKeyDown = function (e) {
        var gridInstance = e.component;
        var data = gridInstance.option('dataSource');

        if (!_.isArray(data)) {
            data = gridInstance.getDataSource()._store._array;
        }

        var gridScrollableInstance = gridInstance.element().find(".dx-scrollable").first().dxScrollable("instance");
        var rowHeight = gridInstance.element().find('tr.dx-data-row').height() + 2; // 2 = 1px border top and 1px border bottom for each row.
        var gridContentHeight = gridInstance.element().find('.dx-datagrid-rowsview').height();
        var totalRecordCount = data.length;
        var maxRowCountForPage = -(Math.round(-(gridContentHeight / rowHeight)));

        var pageSize = gridInstance.pageSize();   // Can't rely on pageSize method from the instand because this is static. This should be changed when we have different page size.
        var isPaged = pageSize !== 0;   // This indicates whether the paging is or (virtual / infinte scrolling is on)
        if (isPaged === false) {
            pageSize = maxRowCountForPage;
        }

        var pageCount = Math.ceil(totalRecordCount / pageSize);

        var selectedRow = gridInstance.element().find('tr.dx-data-row.dx-selection');
        if (selectedRow.length > 1) {
            selectedRow = selectedRow[selectedRow.length];
        }

        var currentRowIndex = gridInstance.element().find('tr.dx-data-row').index(selectedRow);
        var currentPageIndex = (Math.ceil(currentRowIndex / (pageSize - 1)) || 0);
        var currentPage = currentPageIndex + 1;

        var selectRowByIndex = function (gridInstance, rowIndexToSelect) {
            console.log('Next Record Index: ' + rowIndexToSelect);
            var rowToSelect = gridInstance.element().find('tr.dx-data-row').eq(rowIndexToSelect);
            if (rowToSelect) {
                gridInstance.selectRowsByIndexes(rowIndexToSelect);
                gridScrollableInstance.scrollToElement(rowToSelect);
            }
        };

        var selKey = gridInstance.getSelectedRowKeys();
        if (selKey.length) {
            var currentKey = selKey[0];
            var index = gridInstance.getRowIndexByKey(currentKey);
            var keyCode = e.jQueryEvent.keyCode;

            if (keyCode === 38) {      // Up
                index--;

                if (index < 0) {
                    index = 0;  
                }

                selectRowByIndex(gridInstance, index);
            }
            else if (keyCode === 40) {     // Down
                index++;

                if (index > totalRecordCount - 1) {
                    index = totalRecordCount - 1;   
                }

                selectRowByIndex(gridInstance, index);
            }
            else if (keyCode === 33) {      // Page Up
                var pageUpPageIndex = Math.floor(currentRowIndex / maxRowCountForPage);
                var pageUPNextRecordIndex = (pageUpPageIndex) * (maxRowCountForPage - 1);

                if (nextRecordIndex < 0) {
                    pageUPNextRecordIndex = 0;     // Set to first record
                }

                selectRowByIndex(gridInstance, pageUPNextRecordIndex);
            }
            else if (keyCode === 34) {      // Page Down
                var nextRecordIndex = (currentPageIndex + 1) * (maxRowCountForPage - 1);

                if (currentRowIndex % (currentPageIndex * (maxRowCountForPage - 1)) > 0) {
                    nextRecordIndex = nextRecordIndex - (maxRowCountForPage - 1);
                }

                if (nextRecordIndex >= totalRecordCount - 1) {
                    nextRecordIndex = totalRecordCount - 1;     // Set to last record
                }

                console.log('CurrentRowIndex: ' + currentRowIndex);
                console.log('CurrentPageIndex: ' + currentPageIndex);
                console.log('NextRecordIndex: ' + nextRecordIndex);

                selectRowByIndex(gridInstance, nextRecordIndex);
            }
        }

        // Prevent cell being focus
        gridInstance.focus(null);
        e.jQueryEvent.preventDefault();
        e.jQueryEvent.stopPropagation();
    }

    ko.ext.dxDataGrid.selectFirstRow = function (gridInstance, focusFirstRow) {
        if (!gridInstance) {
            console.log('Unable to select first row because grid instance is null or undefined.');
        }

        if (typeof focusFirstRow === 'undefined') {
            focusFirstRow = true;
        }

        var data = gridInstance.option('dataSource');

        if (!_.isArray(data)) {
            data = data._items;
        }

        if (data.length > 0) {
            setTimeout(function () {
                var firstRow = gridInstance.element().find('tr.dx-data-row:first-child');
                if (firstRow) {
                    firstRow.trigger('click');
                    gridInstance.selectRowsByIndexes(0);    // Select first row by default

                    if (focusFirstRow) {
                        // 2017-06-29 Note From Rob
                        // we need to focus on the cell before we can use up and down key to navigation between rows. 
                        // according to Dev Extreme, there's no way to focus a row???
                        gridInstance.element().find('.dx-data-row:first-child td:first-child').focus();
                    }
                }
            }, 100);
        }
    }

    ko.ext.dxDataGrid.selectRowByIndex = function (gridInstance, indexToSelect) {
        if (indexToSelect < 0) {
            return;
        }

        gridInstance.selectRowsByIndexes(indexToSelect);

        var rowToSelect = gridInstance.element().find('tr.dx-data-row').eq(indexToSelect);
        if (rowToSelect) {
            gridInstance.selectRowsByIndexes(indexToSelect);

            setTimeout(function () {
                var gridScrollableInstance = gridInstance.element().find(".dx-scrollable").first().dxScrollable("instance");
                gridScrollableInstance.scrollToElement(rowToSelect);

                console.log('DxScrollable executed...');
            }, 500);
        }
    }
})(ko);

//Deferred jQuery Promise extensions
(function (window) {
    window.extendPromise = function (promise) {
        //General function for both checking Success == true, displaying any error to the user
        promise.checkResponseRecordModel = function () {
            var newPromise = promise.then(function (data) {
                if (data.Success !== 1) {
                    throw WpsApp.translate(data.Message);
                }

                return data;
            }).fail(function (jqXHR, textStatus, errorThrown) {
                DevExpress.ui.notify(errorThrown, 'error');
                });

            window.extendPromise(newPromise);

            return newPromise;
        };

        //General function to update observable and ensure the subscribing grid will refresh itself
        promise.BindResultToGrid = function (observableArray, grid) {
            //observableArray: the ViewModel observableArray which needs to be updated with new data
            //promise: the source of the ajax query
            //grid: optional - when present will force the update of data

            //Binding on ObservableArray should be correct - https://js.devexpress.com/Documentation/16_1/Guide/Data_Visualization/Charts/Data_Binding/
            //Note: Don't use the DevExpress.data.DataSource method - https://js.devexpress.com/Documentation/16_1/Guide/Data_Layer/Data_Source_Examples/. Why: Because ObservableArray is already documented to work by the vendor

            return promise.done(function (data) {
                var response = data.Data;

                observableArray.removeAll();
                for (var i = 0; i < response.length; i++) {
                    observableArray.push(response[i]);
                }
                var dataGrid = $(grid).dxDataGrid('instance');

                dataGrid.option('dataSource', observableArray());
                //dataGrid.refresh();
            });
        }
    }
}(window));

function jsonToCSV() {

}


