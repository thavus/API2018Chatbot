/* Common functions used across all pages in PNC portal. Should be registered in Master Page.
 * Date: May 28, 2017
 * Author: Microsoft
*/

/*---------------------- START OF THIRD PARTY NOTICES ----------------------
This file incorporates material from the projects listed below (Third Party IP).
[marioloncarek/megamenu-js v2 (Source) , v2(Commit: 1451de3)]
[Copyright (c) 2016 Mario Loncarek]
[The MIT License (MIT)]
[Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.]
----------------------END OF THIRD PARTY NOTICES----------------------*/

/*jslint browser: true, devel: true */
/*global define, $, jQuery, document, SP, _spPageContextInfo, ExecuteOrDelayUntilScriptLoaded */

var PNC = PNC || {};

(function () {
    "use strict";

    PNC.Common = {
        //#region MasterPage
        "renderNavigation": function () {
            jQuery(document).ready(function () {
                // Hide Header, Footer, and Ribbon if isdlg parameter is passed as part of query string
                

                jQuery(".sidemenu .ms-core-listMenu-item .menu-item-text:contains(Recent)").parent().parent().parent().hide();

                /* Global Navigation - Starts */
                //Remove OOB css for all inner UL and LI elements
                jQuery("#DeltaTopNavigation, div[id$='QuickLaunchNavigationManager']").removeAttr("class").attr("class", "menu-container");
                jQuery("#DeltaTopNavigation .menu-container, div[id$='V4QuickLaunchMenu'] ul").find('*').removeAttr('class');
                jQuery("div[id$='TopNavigationMenu'], div[id$='V4QuickLaunchMenu']").removeAttr("class").attr("class", "menu");
                /* Global Navigation - Ends */
                /* Structural Navigation - Starts */
                // Show structural navigation only for subsites and not for root site
                
                /* Structural Navigation - Ends */
                // Remove all OOB styles for UL and LI elements
                jQuery('#DeltaTopNavigation .menu').find('*').removeAttr('class');
                if (jQuery("div[id$='TopNavigationMenu'] ul:first li:last").text().trim() == "Edit Links") {
                    jQuery("div[id$='TopNavigationMenu'] ul:first li:last").hide();
                }
                jQuery("span[id$='V4QuickLaunchMenu_NavMenu_Edit']").hide();

                jQuery('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
                //Checks if li has sub (ul) and adds class for toggle icon - just an UI
                jQuery('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
                //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
                jQuery(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");

                // Register Hover and click events
                //Adds menu-mobile class (for mobile toggle menu) before the normal menu
                //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
                //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
                //Done this way so it can be used with wordpress without any trouble
                jQuery("#DeltaTopNavigation .menu > ul > li, div[id$='V4QuickLaunchMenu'] ul li").hover(function (e) {
                    if (jQuery(window).width() > 943) {
                        jQuery(this).children("ul").stop(true, false).fadeToggle(150);
                        e.preventDefault();
                    }

                    if (jQuery(this).find("ul").attr("class") == "normal-sub") {
                        jQuery(this).find("ul.normal-sub li a").each(function () {
                            jQuery(this).css("font-weight", "400");
                        });
                    }
                });
                //If width is more than 943px dropdowns are displayed on hover
                jQuery("#DeltaTopNavigation .menu  ul  li, div[id$='V4QuickLaunchMenu'] ul li").click(function () {
                    if (jQuery(window).width() <= 943) {
                        jQuery(this).children("ul").fadeToggle(150);
                    }
                });
                //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)
                jQuery("#DeltaTopNavigation .menu-mobile, div[id$='V4QuickLaunchMenu'] .menu-mobile").click(function (e) {
                    jQuery(".menu > ul").toggleClass('show-on-mobile');
                    e.preventDefault();
                });
                // Remove unnecessary span tags in LI in Top and Quick Launch Navigation
                jQuery("ul[id$='RootAspMenu'] a").each(function () { jQuery(this).html("<span>" + jQuery(this).text() + "</span>"); });

                jQuery("#DeltaTopNavigation .menu > ul > li:has( > ul), div[id$='V4QuickLaunchMenu'] > ul > li:has( > ul)").addClass('menu-dropdown-icon');
                //Checks if li has sub (ul) and adds class for toggle icon - just an UI
                jQuery("#DeltaTopNavigation .menu > ul > li > ul:not(:has(ul)), div[id$='V4QuickLaunchMenu'] > ul > li > ul:not(:has(ul))").addClass('normal-sub');
                //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
                //jQuery("#DeltaTopNavigation .menu > ul").before("<a href=\"#\" class=\"menu-mobile\">Navigation</a>");
                jQuery("span:contains('Currently selected')").each(function () {
                    var text = jQuery(this).text();
                    jQuery(this).text(text.replace("Currently selected", ""));
                });

                // Highlight the first and second level navigation based on page url
                PNC.Common.highlightLink("[id$=RootAspMenu] li a", "");

                // Check if First and Second level navigation are highlighted correctly (Not applicable for Root site where breadcrumb is not available)
                jQuery(jQuery(".bread a").get().reverse()).each(function () {
                    if (jQuery(this).attr("href") != undefined && jQuery(this).attr("href").indexOf("/") == 0) {
                        if (jQuery("[id$=TopNavigationMenu] [id$=RootAspMenu] li.activeLink a").length === 0) {
                            PNC.Common.highlightLink("[id$=TopNavigationMenu] [id$=RootAspMenu] li a", jQuery(this).attr("href"));
                        }
                        if (jQuery("[id$=V4QuickLaunchMenu] [id$=RootAspMenu] li.activeLink a").length === 0) {
                            PNC.Common.highlightLink("[id$=V4QuickLaunchMenu] [id$=RootAspMenu] li a", jQuery(this).attr("href"));
                        }
                    }
                });
            });
        },
        "highlightLink": function (nodePath, pageUrl) {
            jQuery(nodePath).each(function () {
                var currentPageUrl = "";
                if (pageUrl != "") {
                    currentPageUrl = pageUrl.toLowerCase();
                }

                var url = jQuery(this).attr("href").toLowerCase();
                if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
                    currentPageUrl = "";
                    currentPageUrl = currentPageUrl.toLowerCase();
                }

                if (url == currentPageUrl) {
                    if (jQuery(this).closest("li").attr("class") === "menu-dropdown-icon" || (jQuery(this).closest("ul").attr("id") != undefined && jQuery(this).closest("ul").attr("id").indexOf("RootAspMenu") != -1)) {
                        jQuery(this).closest("li").addClass("activeLink");
                    } else {
                        jQuery(this).closest("li.menu-dropdown-icon").addClass("activeLink");
                    }
                }
            });
        },
        //#endregion MasterPage
        //#region Common SP Utilities
        // Load the file dynamically if not loaded already
        "loadFile": function (fileType, fileObj, filePath) {
            if (fileType === "JS") {
                if (fileObj === undefined) {
                    var jsObj = document.createElement('script');
                    jsObj.type = "text/javascript";
                    jsObj.src = filePath + "?rev=" + Date.parse(new Date().toJSON().slice(0, 10));
                    jsObj.async = true;
                    document.getElementsByTagName('head')[0].appendChild(jsObj);
                }
            }
            if (fileType === "CSS") {
                var cssLoaded = false;
                jQuery("link").each(function () {
                    if (jQuery(this).attr("href").replace(" ", "%20") === filePath) {
                        cssLoaded = true;
                        return false;
                    }
                });
                if (!cssLoaded) {
                    jQuery("<link href='" + filePath + "?rev=" + Date.parse(new Date().toJSON().slice(0, 10)) + "' rel='stylesheet' media='all'>").appendTo("head");
                }
            }
        },
        // Load all script synchronously
        "getScripts": function (scripts, callback) {
            var progress = 0;
            scripts.forEach(function (script) {
                jQuery.getScript(script + "?rev=" + Date.parse(new Date().toJSON().slice(0, 10)), function () {
                    progress = progress + 1;
                    if (progress === scripts.length) {
                        callback();
                    }
                });
            });
        },
        //#endregion Common SP Utilities
        //#region Reusable JSOM Methods
        //Create list item inside a folder asynchronously 
        "createListItem": function (listTitle, folderUrl, metadata) {
            var clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
            var oListItemInfo = new SP.ListItemCreationInformation();
            if (folderUrl != null) {
                oListItemInfo.set_folderUrl(folderUrl);
            }
            var oListItem = oList.addItem(oListItemInfo);
            Object.keys(metadata).forEach(function (key) {
                if (metadata.hasOwnProperty(key)) {
                    var val = metadata[key];
                    oListItem.set_item(key, val);
                }
            });
            oListItem.update();
            clientContext.load(oListItem);
            clientContext.executeQueryAsync(onItemAddedSuccess(metadata), onItemAddedFailed);
        },
        // Gets list item asynchronously
        "getListItems": function (siteUrl, listTitle, viewXml, propertiesToInclude) {
            var ctx = new SP.ClientContext(siteUrl);
            var web = ctx.get_web();
            var list = web.get_lists().getByTitle(listTitle);
            var camlQuery = new SP.CamlQuery();
            var listItems = [];
            if (viewXml.indexOf("<ViewFields>") === -1) {
                var viewFields = "<ViewFields>";
                propertiesToInclude.forEach(function (property) { viewFields += "<FieldRef Name='" + property + "'/>"; });
                viewFields += "</ViewFields>";
                var queryIndex = viewXml.indexOf("<Query>");
                viewXml = viewXml.slice(0, queryIndex) + viewFields + viewXml.slice(queryIndex, viewXml.length);
            }
            var rowLimit = jQuery(jQuery.parseXML(camlQuery.get_viewXml())).find("RowLimit").text().trim();
            if (rowLimit.length == 0) {
                var queryIndex = viewXml.indexOf("<Query>");
                viewXml = viewXml.slice(0, queryIndex) + "<RowLimit>5000</RowLimit>" + viewXml.slice(queryIndex, viewXml.length);
            }

            camlQuery.set_viewXml(viewXml);
            camlQuery.set_listItemCollectionPosition(null);

            var items = list.getItems(camlQuery);
            ctx.load(list);
            ctx.load(items);
            var d = $.Deferred();
            ctx.executeQueryAsync(function () {
                PNC.Common.ongetItemsQuerySucceeded(d, ctx, camlQuery, list, items, rowLimit, listItems);
            },
                function (sender, args) {
                    PNC.Common.ongetItemsQueryFailed(d, sender, args);
                });
            return d.promise();
        },
        "ongetItemsQuerySucceeded": function (d, ctx, camlQuery, list, items, rowLimit, listItems) {
            // Store the result items into an array
            items.get_data().map(function (i) {
                listItems.push(i.get_fieldValues());
            });

            var position = items.get_listItemCollectionPosition();
            if (position != null) {
                if (rowLimit.length == 0 || (rowLimit.length > 0 && listItems.length < parseInt(rowLimit))) {
                    //If more items are to be fetched, make a second call to the server and fetch the next group of items.
                    camlQuery.set_listItemCollectionPosition(position);
                    var items1 = list.getItems(camlQuery);
                    ctx.load(items1);
                    //Call the same function recursively until all the items in the current criteria are fetched.
                    ctx.executeQueryAsync(function () {
                        PNC.Common.ongetItemsQuerySucceeded(d, ctx, camlQuery, list, items1, rowLimit, listItems);
                    },
                        function (sender, args) {
                            PNC.Common.ongetItemsQueryFailed(sender, args);
                        });
                } else {
                    d.resolve(listItems);
                    return listItems;
                }
            } else {
                d.resolve(listItems);
                return listItems;
            }
        },
        "ongetItemsQueryFailed": function (d, sender, args) {
            d.reject(args);
            console.error("Exception in getListItems. Message:" + args.get_message());
        },
        // Loads multiple get list item queries and returns the updated context and item arrays
        "loadMultipleGetListItems": function (siteUrl, listTitles, viewXmls, propertiesToInclude) {
            var ctx = new SP.ClientContext(siteUrl);
            var web = ctx.get_web();
            var returnArrays = [];
            var lists = [];
            listTitles.forEach(function (listTitle, index) {
                lists[index] = web.get_lists().getByTitle(listTitle);
                var query = new SP.CamlQuery();
                query.set_viewXml(viewXmls[index]);
                var includeExpr = "Include(" + propertiesToInclude[index].join(",") + ")";
                var returnItems = lists[index].getItems(query);
                returnArrays[index] = ctx.loadQuery(returnItems, includeExpr);
            });

            return {
                "Context": ctx,
                "ItemArrays": returnArrays
            };
        },
        // Check if folder exists in a list/library
        "checkIfFolderExists": function (folderServerRelativeUrl) {
            try {
                var ctx = SP.ClientContext.get_current();
                var folder = ctx.get_web().getFolderByServerRelativeUrl(folderServerRelativeUrl);
                ctx.load(folder);
                context.executeQueryAsync(function () {
                    return true;

                }, function () {
                    return false;
                });
                return true;
            }
            catch (e) {
                return false;
            }
        },
        // Create folder in a list/library
        "createFolder": function (listTitle, folderName, success, error) {
            var clientContext = new SP.ClientContext();
            var list = clientContext.get_web().get_lists().getByTitle(listTitle);
            var itemCreateInfo = new SP.ListItemCreationInformation();
            itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
            itemCreateInfo.set_leafName(folderName);
            var newItem = list.addItem(itemCreateInfo);
            newItem.set_item('Title', folderName);
            newItem.update();
            clientContext.load(newItem);
            clientContext.executeQueryAsync(function () {
                console.log("Folder with name: " + folderName + " created");
            }, function (sender, args) {
                console.log(args.get_message());
            });
        },
        //#endregion Reusable JSOM Methods
        //#region Custom WebPart Properties
        "createWebpartProperties": function () {
            try {
                if (jQuery("input[id$='Description_EDITOR']").length > 0 && jQuery(".ms-TPBody:last div.ms-propGridTable:last table input.CustomWebPartProperties").length == 0) {
                    // Append the webpart custom properties
                    var html = "";
                    var jsonObject = JSON.parse(jQuery("input[id$='Description_EDITOR']").val());
                    Object.keys(jsonObject).forEach(function (key) {
                        if (jsonObject.hasOwnProperty(key)) {
                            var val = jsonObject[key];
                            html += "<tr><td><div class='UserSectionHead'>" + key + "</div><div class='UserSectionBody'><input type='text' id='" + key + "' class='CustomWebPartProperties' value='" + val + "'/></div></td></tr>";
                        }
                    });
                    jQuery(".ms-TPBody:last div.ms-propGridTable:last table").append(html);

                    // Overwrite OK and Apply events to 
                    // a. Load values from description field into custom property fields
                    // b. On click of save and apply, save the values from custom property fields into description
                    var buttonArray = ["input[id$='MSOTlPn_EditorZone_MSOTlPn_OKBtn']", "input[id$='MSOTlPn_EditorZone_MSOTlPn_AppBtn']"];
                    jQuery.each(buttonArray, function () {
                        var clickEvent = jQuery(this.toString()).attr('onclick');
                        jQuery(this.toString()).attr("onclick", "javascript:PNC.Common.saveWebpartProperties();" + clickEvent);
                    });
                }
            }
            catch (e) { }
        },
        "saveWebpartProperties": function () {
            if (jQuery("input[id$='Description_EDITOR']").length > 0) {
                // Convert JSON string into JSON object
                var jsonObject = JSON.parse(jQuery("input[id$='Description_EDITOR']").val());

                // Get all custom wepart properties values and save it to description editor field
                Object.keys(jsonObject).forEach(function (key) {
                    jQuery(".CustomWebPartProperties").each(function () {
                        if (jQuery(this).attr("id") != "undefined") {
                            if (jQuery(this).attr("id") == key) {
                                jsonObject[key] = jQuery(this).val();
                            }
                        }
                    });
                });


                // Convert the JSON object into JSON string and assign it to Description field
                jQuery("input[id$='Description_EDITOR']").val(JSON.stringify(jsonObject));
            }
        },
        "getCustomPropertyValue": function (jsonString, propertyName) {
            var jsonObject = JSON.parse(jsonString);
            return jsonObject[propertyName];
        },
        //#endregion Custom WebPart Properties
        "applyChangeToWorkSpace": function () {
            if (jQuery("#MSOLayout_InDesignMode").val() == 1) {
                document.body.style.overflow = "hidden";
            }
            else {
                jQuery("#s4-workspace").addClass("work-space");
            }
        },
        "replaceSpecialCharacter": function (pageUrl) {
            pageUrl = encodeURI(pageUrl);
            //replacing single quote from string
            pageUrl = pageUrl.replace(/'/g, '%27');
            return pageUrl;
        },
        "clearSearch": function () {
            // Reset styles for search box once search results are rendered.
            jQuery(document).ready(function () {
                var clearCheckBox = setInterval(function () {
                    if (jQuery(".SearchBox [id$=sboxdiv]").is(".ms-srch-sbLarge") || jQuery("div#Result").length > 0) {
                        if (jQuery("div#Result").length === 0) {
                            clearInterval(clearCheckBox);
                        }
                        jQuery(".SearchBox [id$='csr_sbox']").removeClass().addClass("ms-textSmall ms-srch-sb-prompt ms-helperText");
                        jQuery(".SearchBox .ms-srch-sb-searchLink").css("height", "20px").css("width", "20px");
                        jQuery(".SearchBox #searchImg").removeClass().addClass("ms-srch-sb-searchImg");
                        jQuery(".SearchBox [id$='csr_sboxdiv']").removeClass().addClass("ms-srch-sb ms-srch-sb-borderFocused");

                        //Remove query string from URL
                        PNC.Common.clearHistory();
                    }
                }, 100);
            });

            // Append the document.referrer in hidden field as this will be reset by history clear method
            if (jQuery("#hdnDocumentReferrer").length === 0) {
                jQuery("head").append("<input type='hidden' id='hdnDocumentReferrer' value='" + document.referrer + "'/>");
            }

            //Remove query string from URL
            PNC.Common.clearHistory();
        },
        "clearHistory": function () {
            //Remove query string from URL
            var pageUrl = location.href.split("#")[0];
//commenting to test the Search issue...            
//window.history.pushState('object', document.title, pageUrl);
        }
    };
 

    // Configure View All Link - Used by all display templates
    PNC.SearchWebParts = {
        // Configure View All Link
        "configureViewAllLink": function () {
            jQuery(".ViewAllLink").each(function () {
                jQuery(this).on("click", function () {
                    var wpTitle = jQuery(jQuery(this)[0]).closest(".ms-webpart-chrome").find(".js-webpart-titleCell").text().trim().replace("&", "%26");
                    var resultSourceName = $getClientControl(jQuery(jQuery(this)[0]).closest(".ms-webpartzone-cell").find("#DataProvider")[0]).get_sourceName();
                    var queryString = resultSourceName.replace("&", "%26") + ((wpTitle === resultSourceName) ? "" : "&wpTitle=" + wpTitle);
                    if (resultSourceName.toLowerCase() === "market location results") {
                        window.location.href = _spPageContextInfo.siteAbsoluteUrl + "/Search/Pages/MarketLocation.aspx?wpTitle=" + wpTitle;
                    } else if (resultSourceName.toLowerCase() === "businesssegmentresults") {
                        window.location.href = _spPageContextInfo.siteAbsoluteUrl + "/Search/Pages/BusinessSegment.aspx?wpTitle=" + wpTitle;
                    } else {
                        window.location.href = _spPageContextInfo.siteAbsoluteUrl + "/Search/Pages/ViewAll.aspx?wpName=" + queryString;
                    }
                });
            });
        },
        // Configure the user profile's business segment property update link
        "configureBusinessSegmentUpdateLink": function () {
            var qGroups = Srch.ScriptApplicationManager.get_current().queryGroups;
            jQuery.each(qGroups, function () {
                if (this.displays != null && this.displays.length > 0) {
                    for (var i = 0; i < this.displays.length; i++) {
                        if (this.dataProvider.get_sourceName().toLowerCase() == "businesssegmentresults" && jQuery("#" + jQuery(this)[0].displays[i].get_id()).find(".updatebslink-container").is(':empty')) {
                            jQuery("#" + jQuery(this)[0].displays[i].get_id()).find(".updatebslink-container").append((jQuery("#" + jQuery(this)[0].displays[i].get_id()).find(".ms-srch-result-noResults").length != 0 ? "<br/>" : "") + "<p style=\"color:black\">Your business segment setting selects items for this page.<br/>To <a style=\"cursor:pointer;color:#084c8d\">view/update the current business segment, click here.</a></p>");
                            jQuery("#" + jQuery(this)[0].displays[i].get_id()).find(".updatebslink-container").find('a:first').click(function () {
                                SP.UI.ModalDialog.showModalDialog({
                                    url: _spPageContextInfo.siteAbsoluteUrl + "/Search/Pages/UpdateUserProfile.aspx",
                                    width: 500,
                                    height: 300,
                                    title: "Change Business Segment",
                                    dialogReturnValueCallback: function (result) {
                                        if (result == SP.UI.DialogResult.OK) {
                                            window.location.reload();
                                        }
                                    }
                                });

                                jQuery("<style>").text(".ms-dlgContent { position:fixed; left:50%; top:50% }").appendTo("head");
                                return false;
                            });
                        }
                    }
                }
            });
        },
        //Get Market Search Results
        "renderMarketResults": function (ctx) {
            function overrideFKQ(sourceName, queryText) {
                var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
                var title = document.title;
                Srch.U.fillKeywordQuery = function (query, dp) {
                    dp.set_sourceName(sourceName);
                    dp.get_currentQueryState().k = queryText;
                    originalFillKeywordQuery(query, dp);
                    document.title = title;
                    jQuery("[id$='csr_sbox']").val("");
                }
            }

            var userProfileProperties = "";
            if (ctx.DataProvider.get_sourceName() == "Market Location Results" && jQuery("#isMarketLocationsQueryRaised").length === 0) {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
                        var clientContext = new SP.ClientContext.get_current();
                        var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
                        var userProfileProperties = peopleManager.getMyProperties();
                        clientContext.load(userProfileProperties);
                        clientContext.executeQueryAsync(onRequestSuccess, onRequestFail);

                        function onRequestSuccess() {
                            if (userProfileProperties.get_userProfileProperties()['CorporateMarket'] === "") {
                                EnsureScript("sp.search.js", TypeofFullName("Microsoft.SharePoint.Client.Search.Query.KeywordQuery"), function () {
                                    var clientContext = new SP.ClientContext(document.location.href);
                                    var originalFillKeywordQuery = Srch.U.fillKeywordQuery;
                                    overrideFKQ(ctx.DataProvider.get_sourceName(), "MarketLocations:Pittsburgh");
                                    var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(clientContext);
                                    Srch.U.fillKeywordQuery(keywordQuery, ctx.DataProvider);
                                    var queryState = new Srch.QueryState();
                                    var queryStateArgs = new Srch.QueryEventArgs(queryState);
                                    $getClientControl(jQuery("#" + ctx.ClientControl.get_id())[0]).raiseQueryReadyEvent(queryStateArgs);
                                    jQuery('form').append('<input type="hidden" id="isMarketLocationsQueryRaised" value="true" />');
                                    PNC.Common.clearSearch();
                                });
                            }
                        }

                        function onRequestFail() {
                            console.error("Something went wrong while quering user profile properties");
                        }
                    });
                });
            }
        },
        // If Market locations/Business Segment (or any search results) page is loaded in iframe, then adjust the height and width of iframe as well as open the search result links in parent window instead of iframe window
        "adjustiFrame": function () {
            if (GetUrlKeyValue("isdlg") !== "") {
                jQuery(".container").css("margin-left", "0px");
                var iframeContent = setInterval(function () {
                    if (jQuery(".ms-WPBody").find('a[class*="ms-srch-item-link"], #PersonalResult').length > 0) {
                        jQuery("#PageViewer", window.parent.document).height(jQuery("#s4-workspace").innerHeight());
                        jQuery(".ms-WPBody").find('a[class*="ms-srch-item-link"], #PersonalResult').each(function () {
                            jQuery(this).attr("target", "_top");
                        });
                    }
                }, 500);
            }
        }
    }

    // Enable caching on scripts so that there is no seperate call to sever to download CSS/JS files
    jQuery.ajaxSetup({
        cache: true
    });

    // Render Navigation
    PNC.Common.renderNavigation();
    PNC.Common.clearSearch();
})();
