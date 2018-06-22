export const CLIENT_SETTINGS : {[key:string]:any} = {
  "configuration": {
    "changeDetection": true,
    "defaultLanguage": "English",
    "authorization": {
      "cacheMinutes": 30
    },
    "spinner": {
      "loadingText": "Loading..."
    },
    "dataOperation": {
      "post": "Data added successfully",
      "put": "Data updated successfully",
      "delete": "Data deleted successfully"
    },
    "popup": {
      "validationFailed": {
        "title": "Validation Failed",
        "ok": "Ok"
      },
      "unauthorized": {
        "oops": "Oops",
        "message": "You don't have access rights?",
        "ok": "Ok"
      }
    },
    "dialog": {
      "okText": "Ok",
      "cancelText": "Cancel",
      "style": {
        "main": "",
        "header": "",
        "body": "",
        "footer": "",
        "okClick": "",
        "cancelClick": "",
        "secondaryClick": ""
      },
      "confirmation": {
        "okText": "Yes",
        "cancelText": "No",
        "title": "Please confirm!",
        "messageType": {
          "delete": "Are you sure you want to delete '{0}'?",
          "inactive": "Are you sure you want to inactive '{0}'?",
          "active": "Are you sure you want to active '{0}'?"
        },
        "style": {
          "okClick": "",
          "cancelClick": ""
        }
      },
      "alert": {
        "okText": "Ok",
        "title": "Alert!",
        "style": {
          "okClick": ""
        }
      },
      "validation": {
        "okText": "Ok",
        "title": "Alert!",
        "style": {
          "okClick": ""
        }
      },
      "saveConfirmation": {
        "title": "Data lost confirmation!",
        "saveText": "Save",
        "dontSaveText": "Don't Save",
        "style": {
          "okClick": "",
          "secondaryClick": "",
          "cancelClick": ""
        }
      }
    },
    "placeholder": {
      "text": "Please enter the value of",
      "select": "Please select the value of",
      "checkbox": "Please choose the value of",
      "radio": "Please choose the value of",
      "file": "Please upload",
      "textarea": "Please select the value of"
    },
    "validation": {
      "messageDisplayType": "Both",
      "message": {
        "default": {
          "required": "You can't leave this empty",
          "minlength": "Minimum #n# characters required",
          "maxlength": "More than #n# characters are not permitted",
          "pattern": "The specified input format is not recognized",
          "compare": "The specified values of '#field1#' and '#field2#' must be the same",
          "contains": "The specified value must '#value#' in the input",
          "alpha": "You can use letters and periods only",
          "alphanumeric": "You can use letters, numbers and periods only",
          "range": "You need to enter appropriate value in this field"
        },
        "custom": { "userNameRequired": "This UserName is Required." }
      }
    },
    "internationalization": {
     "currencyCode": "INR",
      "viewDefaultDateFormatName": "shortDate",
      "date": {
        "format": "dmy",
        "seperator": "/",
        "short": "d/M/yy, h:mm a",
        "medium": "d, MMMM y, h:mm:ss a",
        "full": "EEEE, MMMM d, y, h:mm:ss a ",
        "shortDate": "M/d/yy",
        "mediumDate": "MMM d, y",
        "longDate": "MMMM d, y",
        "fullDate": "EEEE, MMMM d, y",
        "shortTime": "h:mm a",
        "mediumTime": "h:mm:ss a",
        "fullTime": "h:mm:ss a zzzz"
      }
    },
    "control": {
      "rxSelect": {
        "placeholder": "Select"
      },
      "rxTag": {
        "message": {
          "maxSelection": "You can only select {maxSelection} items"
        }
      },
      "rxTable": {
        "formatters": {
          "date": "dd/mm/yyyy"
        },
        "pageSizes": [ 5, 10, 20, 30, 40, 50 ],
        "pageSize": 10,
        "controlClass": {
          "table": "table table-bordered  dataTable no-footer dtr-inline"
        },
        "masterClass": {
          "asc": "sorting_asc fa fa-arrow-up right-arrow",
          "desc": "sorting_desc fa fa-arrow-down right-arrow",
          "openDetail": "fa fa-minus",
          "closeDetail": "fa fa-plus"
        },
        "label": {
          "footerText": "Showing {{startNumber}} to {{endNumber}} of {{totalNumber}} entries",
          "notFound": "Records not found",
          "dataNotAvailable": "Data Not Available"
        }
      }
    },
    "cacheKeys": {

    }
  }
}
;
