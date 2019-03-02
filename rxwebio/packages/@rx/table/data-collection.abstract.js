"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("../core");
var DataCollection = (function () {
    function DataCollection(http, hostUri) {
        this.http = http;
        this.hostUri = hostUri;
        this.pageSize = 4;
        this.skip = 0;
        this.showPagging = true;
        this.lastSkip = 1;
        this.pageChanging = new core_1.EventEmitter();
        this.tableConfiguration = core_2.ApplicationConfiguration.get('control.rxTable');
        var date = core_2.ApplicationConfiguration.get('internationalization.date');
        this.format = date.format;
        this.seperator = date.seperator;
        this.label = this.tableConfiguration.label;
        this.pageSize = this.tableConfiguration.pageSize;
        this.pageIndexs = [];
        this.pages = [];
    }
    DataCollection.prototype.setEvents = function (pageChanging) {
        this.pageChanging = pageChanging;
    };
    DataCollection.prototype.set = function (data, pageSize, columns, isStoreProc, totalCount) {
        if (pageSize)
            this.pageSize = pageSize;
        this.source = data;
        this.filterData = data;
        this.data = data;
        this.tableColumns = columns;
        if (!(this.isStoreProc && this.pageIndexs && this.pageIndexs.length > 0))
            this.pageIndexs = [];
        this.searchCollection = new Array();
        this.isStoreProc = isStoreProc;
        this.totalCount = totalCount;
    };
    Object.defineProperty(DataCollection.prototype, "total", {
        get: function () {
            if (this.isStoreProc)
                return this.totalCount;
            return this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "length", {
        get: function () {
            if (this.isStoreProc)
                return this.totalCount;
            return this.filterData.length;
        },
        enumerable: true,
        configurable: true
    });
    DataCollection.prototype.next = function () {
        if (!this.isNext) {
            this.skip++;
            this.pagging();
        }
    };
    DataCollection.prototype.previous = function () {
        if (!this.isPrevious) {
            this.skip--;
            this.pagging();
        }
    };
    DataCollection.prototype.goTo = function (pageNumber) {
        this.skip = pageNumber;
        this.pagging();
    };
    DataCollection.prototype.changePageSize = function (size) {
        this.skip = 0;
        this.pageSize = size;
        this.pagging();
    };
    DataCollection.prototype.pagging = function () {
        var _this = this;
        this.showPagging = this.length > 0;
        if (this.showPagging) {
            if (this.skip == 0) {
                this.startNumber = (this.skip + 1) * this.pageSize - this.pageSize + 1;
                this.endNumber = (this.skip + 1) * this.pageSize;
                this.endNumber = (this.length < this.endNumber) ? this.length : this.endNumber;
                this.selectedIndex = this.startNumber;
                this.skip = 1;
            }
            else {
                this.startNumber = this.skip * this.pageSize - this.pageSize + 1;
                this.endNumber = this.skip * this.pageSize;
                if (this.endNumber > this.length) {
                    this.endNumber = this.length;
                }
                this.selectedIndex = this.startNumber;
            }
            if (this.pageIndexs.filter(function (t) { return t == _this.skip; }).length == 0) {
                this.pageIndexs = [];
                var currentIndex = 1;
                if (this.lastSkip > this.skip) {
                    currentIndex = this.lastSkip - 5;
                    if (currentIndex < 1)
                        currentIndex = 1;
                }
                else
                    currentIndex = this.skip;
                var currentLength = (this.length / this.pageSize);
                if (currentLength == 0 || currentLength == 1)
                    currentLength = 1;
                else
                    currentLength = currentLength + 1;
                for (var i = 0; i < 5; i++) {
                    if (currentIndex <= currentLength) {
                        this.pageIndexs.push(currentIndex);
                    }
                    currentIndex++;
                }
            }
            this.footerText = this.label.footerText.replace("{{startNumber}}", this.startNumber.toString()).replace("{{endNumber}}", this.endNumber.toString()).replace("{{totalNumber}}", this.length.toString());
            this.isNext = this.skip >= ((this.filterData.length / this.pageSize));
            this.isPrevious = this.skip == 1;
            if (this.isStoreProc)
                this.pageChanging.emit({ pageNumber: this.skip, pageSize: this.pageSize, sortColumnName: this.sortColumnName, sortOrder: this.sortOrder });
            else
                this.data = this.filterData.slice(this.startNumber - 1, Math.max(0, this.endNumber));
            this.lastSkip = this.skip;
        }
        else {
            this.data = [];
            if (this.searchCollection.length > 0)
                this.footerText = this.label.notFound;
            else
                this.footerText = this.label.dataNotFound;
        }
    };
    DataCollection.prototype.setFooter = function () {
        this.showPagging = false;
        this.footerText = this.label.dataNotAvailable;
    };
    DataCollection.prototype.filterAll = function (value) {
        var _this = this;
        this.filterData = [];
        this.source.forEach(function (t) {
            if (_this.wildcardSearch(t, value))
                _this.filterData.push(t);
        });
        this.refreshTable();
    };
    DataCollection.prototype.wildcardSearch = function (row, prefix) {
        var isMatched = false;
        for (var i = 0; i < this.tableColumns.length; i++) {
            var t = this.tableColumns[i];
            var columnValue = String(row[t]);
            if (this.isExist(columnValue, prefix)) {
                isMatched = true;
                break;
            }
        }
        return isMatched;
    };
    DataCollection.prototype.isExist = function (columnValue, prefix) {
        if (/^(true|false)$/i.test(prefix)) {
            return (columnValue + "").indexOf(prefix) === 0;
        }
        else if (/^\s*\d+\s*$/i.test(prefix)) {
            return (columnValue + "").indexOf(prefix) === 0;
        }
        if (columnValue == null) {
            return false;
        }
        return (columnValue.toLowerCase() + "").indexOf(prefix.toLowerCase()) === 0;
    };
    DataCollection.prototype.filter = function (dataSearch) {
        if (dataSearch instanceof Array) {
            this.searchCollection = dataSearch;
        }
        else {
            var searchObject = this.searchCollection.filter(function (t) { return t.columnName == dataSearch.columnName; })[0];
            if (searchObject) {
                searchObject.condition = dataSearch.condition;
                searchObject.value = dataSearch.value;
            }
            else {
                dataSearch.dataType = this.source.length > 0 ? typeof this.source[0][dataSearch.columnName] : '';
                this.searchCollection.push(dataSearch);
            }
        }
        var expression = this.filterExpession();
        var match = expression.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/);
        var fun = new Function(match[1], "return " + match[2]);
        this.filterData = this.source.filter(fun);
        this.refreshTable();
    };
    DataCollection.prototype.refreshTable = function () {
        this.skip = 0;
        this.pageIndexs = [];
        this.pagging();
    };
    DataCollection.prototype.resetTable = function () {
        var _this = this;
        this.searchCollection = new Array();
        this.filterData = [];
        this.source.forEach(function (t) { return _this.filterData.push(t); });
        this.refreshTable();
    };
    DataCollection.prototype.filterExpession = function () {
        var expression = "t => ";
        var lengthCount = this.searchCollection.length;
        var loopCount = 0;
        this.searchCollection.forEach(function (t) {
            if (t.dataType == "string" || typeof t.value == "string") {
                expression = expression.concat("t.", t.columnName, ".toLowerCase() ", t.condition, ' "', t.value, '".toLowerCase() ');
            }
            else if (t.value instanceof Date) {
                var value = t.value;
                expression = expression.concat("new Date(t.", t.columnName, ") ", t.condition, " new Date('", String(value.getMonth() + 1), '/', String(value.getDate()), '/', String(value.getFullYear()), "')");
            }
            else {
                expression = expression.concat("t.", t.columnName, " ", t.condition, " ", t.value);
            }
            loopCount++;
            if (loopCount != lengthCount)
                expression = expression.concat(" && ");
        });
        return expression;
    };
    DataCollection.prototype.sort = function (columnName, sortOrder) {
        var _this = this;
        this.sortColumnName = columnName;
        this.sortOrder = sortOrder;
        this.filterData.sort(function (item1, item2) {
            var a = item1[columnName];
            var b = item2[columnName];
            if (sortOrder)
                return _this.comparator(a, b);
            else
                return _this.comparator(b, a);
        });
        this.pagging();
        return sortOrder;
    };
    DataCollection.prototype.export = function (columns, fileName) {
        var _this = this;
        var data, filename, link;
        var csv = this.csvProcessor(columns);
        if (csv == null)
            return;
        filename = fileName;
        this.http.post('/api/csvexport', { data: csv }).subscribe(function (t) {
            window.location.href = _this.hostUri.concat("api/csvexport/" + t.key + "/?fileName=" + filename);
        });
        //if (!csv.match(/^data:text\/csv/i)) {
        //    csv = 'data:text/csv;charset=utf-8,' + csv;
        //}
        //data = encodeURI(csv);
        ////window.open(data,"a.csv");
        //link = document.createElement('a');
        //link.setAttribute('href', data);
        //link.setAttribute('download', filename);
        //link.click();
    };
    DataCollection.prototype.csvProcessor = function (columns) {
        var _this = this;
        var result, ctr, columnDelimiter, lineDelimiter, data;
        columnDelimiter = ',';
        lineDelimiter = '\n';
        var keys = new Array();
        result = '';
        columns.forEach(function (column) {
            if (!column.actionable && column.isBindable) {
                keys.push(column.title);
            }
        });
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        this.filterData.forEach(function (item) {
            ctr = 0;
            columns.forEach(function (column) {
                if (!column.actionable && column.isBindable) {
                    if (ctr > 0)
                        result += columnDelimiter;
                    if (column.dataType == "date" && item[column.field])
                        result += _this.makeDateString(new Date(item[column.field]));
                    else
                        result += item[column.field];
                    ctr++;
                }
            });
            result += lineDelimiter;
        });
        return result;
    };
    DataCollection.prototype.makeDateString = function (value) {
        var dateString = '';
        for (var _i = 0, _a = this.format; _i < _a.length; _i++) {
            var character = _a[_i];
            switch (character) {
                case 'm':
                    dateString += dateString.length == 0 ? (value.getMonth() + 1).toString() : this.seperator + (value.getMonth() + 1);
                    break;
                case 'd':
                    dateString += dateString.length == 0 ? (value.getDate()).toString() : this.seperator + (value.getDate());
                    break;
                case 'y':
                    dateString += dateString.length == 0 ? (value.getFullYear()).toString() : this.seperator + (value.getFullYear());
                    break;
            }
        }
        return dateString;
    };
    DataCollection.prototype.comparator = function (firstValue, secondValue) {
        if (!firstValue) {
            if (secondValue)
                firstValue = typeof secondValue === "number" ? 0 : typeof secondValue === "boolean" ? false : "";
            else {
                firstValue = '';
                secondValue = '';
            }
        }
        if (!secondValue)
            secondValue = typeof firstValue === "number" ? 0 : typeof firstValue === "boolean" ? false : "";
        if ((isNaN(parseFloat(firstValue)) || !isFinite(firstValue)) || (isNaN(parseFloat(secondValue)) || !isFinite(secondValue))) {
            if (typeof firstValue === "boolean" && typeof secondValue === "boolean") {
                if (firstValue === secondValue)
                    return -1;
                if (firstValue !== secondValue)
                    return 1;
            }
            else {
                if (firstValue.toLowerCase() < secondValue.toLowerCase())
                    return -1;
                if (firstValue.toLowerCase() > secondValue.toLowerCase())
                    return 1;
            }
        }
        else {
            if (parseFloat(firstValue) < parseFloat(secondValue))
                return -1;
            if (parseFloat(firstValue) > parseFloat(secondValue))
                return 1;
        }
        return 0;
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;
//# sourceMappingURL=data-collection.abstract.js.map