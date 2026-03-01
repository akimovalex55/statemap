var ClickableMap = {};
(function() {
    var version = '1.0.0';
    var classPrefix = 'cmm-usa-';
    var creditLinkUrl = '';
    var stateCount = 0;
    var maxTableColumns = 5;
    var global = this;
    this.getEleById = function(id) {
        return document.getElementById(id)
    };
    this.getEleByQuery = function(query) {
        return document.querySelector(query)
    };
    this.stateIdToDomClass = function(stateId) {
        return classPrefix + 'state-' + stateId.toLowerCase()
    };
    this.version = version;

    function createBaseGlobalData() {
        return {
            version: version,
            width: "100",
            widthUnits: "%",
            fontSize: "14px",
            fontName: "Courier New",

            // 🌿 Зеленая палитра
            fill: "#9FD8A3",
            hoverFill: "#1ABC9C",
            disabledFill: "#CDEBD6",
            backgroundFill: "#ffffff",

            innerLabelColor: "#000000",
            outerLabelColor: "#000000",
            hoverLabelColor: "#ffffff",

            borderType: null,
            borderStroke: "#145A32",

            enableShadows: true,
            popLink: false,
            showStateTitleAndDescOnHover: true,
            showLinksList: false,
            globalLinkUrl: null,
            globalJsCallback: null,
            mapTitle: null,
            creditLink: ""
        };
    }


    function createBaseStatesData() {
        var statesData = {
            AL: {
                fullName: 'Alabama'
            },
            AK: {
                fullName: 'Alaska'
            },
            AZ: {
                fullName: 'Arizona'
            },
            AR: {
                fullName: 'Arkansas'
            },
            CA: {
                fullName: 'California'
            },
            CO: {
                fullName: 'Colorado'
            },
            CT: {
                fullName: 'Connecticut'
            },
            DE: {
                fullName: 'Delaware'
            },
            DC: {
                fullName: 'District Of Columbia'
            },
            FL: {
                fullName: 'Florida'
            },
            GA: {
                fullName: 'Georgia'
            },
            HI: {
                fullName: 'Hawaii'
            },
            ID: {
                fullName: 'Idaho'
            },
            IL: {
                fullName: 'Illinois'
            },
            IN: {
                fullName: 'Indiana'
            },
            IA: {
                fullName: 'Iowa'
            },
            KS: {
                fullName: 'Kansas'
            },
            KY: {
                fullName: 'Kentucky'
            },
            LA: {
                fullName: 'Louisiana'
            },
            ME: {
                fullName: 'Maine'
            },
            MD: {
                fullName: 'Maryland'
            },
            MA: {
                fullName: 'Massachusetts'
            },
            MI: {
                fullName: 'Michigan'
            },
            MN: {
                fullName: 'Minnesota'
            },
            MS: {
                fullName: 'Mississippi'
            },
            MO: {
                fullName: 'Missouri'
            },
            MT: {
                fullName: 'Montana'
            },
            NE: {
                fullName: 'Nebraska'
            },
            NV: {
                fullName: 'Nevada'
            },
            NH: {
                fullName: 'New Hampshire'
            },
            NJ: {
                fullName: 'New Jersey'
            },
            NM: {
                fullName: 'New Mexico'
            },
            NY: {
                fullName: 'New York'
            },
            NC: {
                fullName: 'North Carolina'
            },
            ND: {
                fullName: 'North Dakota'
            },
            OH: {
                fullName: 'Ohio'
            },
            OK: {
                fullName: 'Oklahoma'
            },
            OR: {
                fullName: 'Oregon'
            },
            PA: {
                fullName: 'Pennsylvania'
            },
            RI: {
                fullName: 'Rhode Island'
            },
            SC: {
                fullName: 'South Carolina'
            },
            SD: {
                fullName: 'South Dakota'
            },
            TN: {
                fullName: 'Tennessee'
            },
            TX: {
                fullName: 'Texas'
            },
            UT: {
                fullName: 'Utah'
            },
            VT: {
                fullName: 'Vermont'
            },
            VA: {
                fullName: 'Virginia'
            },
            WA: {
                fullName: 'Washington'
            },
            WV: {
                fullName: 'West Virginia'
            },
            WI: {
                fullName: 'Wisconsin'
            },
            WY: {
                fullName: 'Wyoming'
            }
        };
        for (var stateId in statesData) {
            if (!statesData.hasOwnProperty(stateId)) {
                continue
            }
            statesData[stateId].title = statesData[stateId].fullName;
            statesData[stateId].description = null;
            statesData[stateId].longDescription = null;
            statesData[stateId].linkUrl = null;
            statesData[stateId].isDisabled = false;
            statesData[stateId].isHovering = false;
            statesData[stateId].cssClass = null;
            statesData[stateId].overrideFill = null;
            statesData[stateId].overrideFillEnabled = false;
            statesData[stateId].overrideHoverFill = null;
            statesData[stateId].overrideHoverFillEnabled = false;
            statesData[stateId].overridePopLink = null, stateCount++
        }
        return statesData
    }

    function stateOn(stateId) {
        if (this.statesData[stateId].isHovering) {
            return
        }
        this.statesData[stateId].isHovering = true;
        var $stateLink = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId));
        var $statePath = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId) + ' path');
        var $stateText = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId) + ' text');
        if (this.statesData[stateId].isDisabled) {
            $statePath.style.fill = this.globalData.disabledFill;
            $stateLink.style.cursor = 'default'
        } else if (this.statesData[stateId].overrideHoverFillEnabled && this.statesData[stateId].overrideHoverFill != null) {
            $statePath.style.fill = this.statesData[stateId].overrideHoverFill;
            $stateText.style.fill = this.globalData.hoverLabelColor;
            $stateLink.style.cursor = 'pointer'
        } else {
            $statePath.style.fill = this.globalData.hoverFill;
            $stateText.style.fill = this.globalData.hoverLabelColor;
            $stateLink.style.cursor = 'pointer'
        }
        if (this.globalData.showStateTitleAndDescOnHover) {
            var $hoverStateInfo = global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'hover-state-info');
            var titleText = this.statesData[stateId].title == null ? '' : this.statesData[stateId].title;
            var descText = this.statesData[stateId].description == null ? '' : this.statesData[stateId].description;
            var longDescText = this.statesData[stateId].longDescription == null ? '' : this.statesData[stateId].longDescription;
            var titleSpan = document.createElement('span');
            var descSpan = document.createElement('span');
            titleSpan.textContent = titleText;
            if (longDescText != '') {
                descSpan.innerHTML = longDescText
            } else {
                descSpan.textContent = descText
            }
            while ($hoverStateInfo.firstChild) {
                $hoverStateInfo.removeChild($hoverStateInfo.firstChild)
            }
            $hoverStateInfo.appendChild(titleSpan);
            $hoverStateInfo.appendChild(descSpan);
            $hoverStateInfo.style.display = 'block'
        }
        if (!this.statesData[stateId].isDisabled && this.globalData.enableShadows) {
            statePathBlur = $statePath.cloneNode(true);
            statePathBlur.setAttribute('filter', 'url(#' + this.$map.id + '-blur-filter)');
            statePathBlur.setAttribute('class', classPrefix + 'state-shadow');
            $stateLink.parentNode.appendChild(statePathBlur);
            $stateLink.parentNode.appendChild($stateLink)
        }
    }

    function stateOff(stateId) {
        this.statesData[stateId].isHovering = false;
        var $statePath = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId) + ' path');
        var $stateText = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId) + ' text');
        var isOuterLabel = $stateText.getAttribute('class') == classPrefix + 'outer-label';
        if (this.globalData.showStateTitleAndDescOnHover) {
            var $hoverStateInfo = global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'hover-state-info');
            $hoverStateInfo.style.display = 'none'
        }
        if (this.statesData[stateId].isDisabled) {
            $statePath.style.fill = this.globalData.disabledFill
        } else if (this.statesData[stateId].overrideFillEnabled && this.statesData[stateId].overrideFill != null) {
            $statePath.style.fill = this.statesData[stateId].overrideFill;
            $stateText.style.fill = isOuterLabel ? this.globalData.outerLabelColor : this.globalData.innerLabelColor
        } else {
            $statePath.style.fill = this.globalData.fill;
            $stateText.style.fill = isOuterLabel ? this.globalData.outerLabelColor : this.globalData.innerLabelColor
        }
        var allShadows = document.querySelectorAll('#' + this.$map.id + ' .' + classPrefix + 'state-shadow');
        Array.prototype.map.call(Array.prototype.slice.call(allShadows), function(ele) {
            ele.parentNode.removeChild(ele)
        })
    }
    this.create = function(wrapperId) {
        return new this.mapObject(wrapperId)
    };
    this.mapObject = function(wrapperId) {
        this.$map = global.getEleById(wrapperId);
        this.globalData = createBaseGlobalData();
        this.statesData = createBaseStatesData();
        for (var stateId in this.statesData) {
            if (!this.statesData.hasOwnProperty(stateId)) {
                continue
            }(function(stateId) {
                var $stateLink = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId));
                var self = this;
                $stateLink.addEventListener('mouseover', function(e) {
                    stateOn.call(self, stateId)
                });
                $stateLink.addEventListener('mouseout', function(e) {
                    stateOff.call(self, stateId)
                });
                $stateLink = null
            }.call(this, stateId))
        }
        global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'blur-filter').setAttribute('id', this.$map.id + '-blur-filter')
    };
    this.mapObject.prototype.getDomId = function() {
        return this.$map.id
    };
    this.mapObject.prototype.draw = function() {
        this.$map.style.width = this.globalData.width + this.globalData.widthUnits;
        this.$map.style.backgroundColor = this.globalData.backgroundFill;
        this.$map.style.fontFamily = this.globalData.fontName;
        this.$map.style.fontSize = this.globalData.fontSize;
        global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'title').textContent = this.globalData.mapTitle;
        if (this.globalData.creditLink != null && this.globalData.creditLink != '') {
            global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'credit-link').innerHTML = '<a target="_blank" href="' + creditLinkUrl + '"></a>';
            global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'credit-link a').textContent = this.globalData.creditLink
        } else {
            global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'credit-link').innerHTML = ''
        }
        for (var stateId in this.statesData) {
            if (!this.statesData.hasOwnProperty(stateId)) {
                continue
            }
            var stateDomClass = global.stateIdToDomClass(stateId);
            var $stateTitle = global.getEleByQuery('#' + this.$map.id + ' .' + stateDomClass + ' title');
            var $stateDescription = global.getEleByQuery('#' + this.$map.id + ' .' + stateDomClass + ' desc');
            $stateTitle.textContent = this.statesData[stateId].title;
            $stateDescription.textContent = this.statesData[stateId].description;
            var $statePath = global.getEleByQuery('#' + this.$map.id + ' .' + stateDomClass + ' path');
            $statePath.style.stroke = this.globalData.borderStroke;
            if (this.globalData.borderType != null) {
                $statePath.style.strokeDasharray = this.globalData.borderType
            } else {
                $statePath.style.strokeDasharray = 'none'
            }
            if (this.statesData[stateId].isDisabled) {
                $statePath.style.fill = this.globalData.disabledFill
            } else if (this.statesData[stateId].overrideFillEnabled && this.statesData[stateId].overrideFill != null) {
                $statePath.style.fill = this.statesData[stateId].overrideFill
            } else {
                $statePath.style.fill = this.globalData.fill
            }
            var $allLabels = document.querySelectorAll('#' + this.$map.id + ' .' + stateDomClass + ' text');
            for (var i = 0; i < $allLabels.length; ++i) {
                $allLabels.item(i).style.fill = this.globalData.innerLabelColor
            }
            this.wireStateLink(stateId, false)
        }
        var $outerLabels = document.querySelectorAll('#' + this.$map.id + ' .' + classPrefix + 'outer-label');
        for (var i = 0; i < $outerLabels.length; ++i) {
            $outerLabels.item(i).style.fill = this.globalData.outerLabelColor
        }
        if (this.globalData.showLinksList) {
            this.displayMapLinksList()
        } else {
            global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'listview').innerHTML = ''
        }
        this.$map.style.display = 'block'
    };
    this.mapObject.prototype.getGlobalData = function() {
        return this.globalData
    };
    this.mapObject.prototype.getStatesData = function() {
        return this.statesData
    };
    this.mapObject.prototype.setGlobalData = function(data) {
        for (var setting in this.globalData) {
            if (!this.globalData.hasOwnProperty(setting) || !data.hasOwnProperty(setting)) {
                continue
            }
            this.globalData[setting] = data[setting]
        }
    };
    this.mapObject.prototype.setStatesData = function(data) {
        for (var state in this.statesData) {
            if (!this.statesData.hasOwnProperty(state) || !data.hasOwnProperty(state)) {
                continue
            }
            for (var setting in this.statesData[state]) {
                if (!this.statesData[state].hasOwnProperty(setting) || !data[state].hasOwnProperty(setting)) {
                    continue
                }
                this.statesData[state][setting] = data[state][setting]
            }
        }
    };
    this.mapObject.prototype.wireStateLink = function(stateId, addLiveClassName, linkType) {
        var clickFn = null;
        linkType = linkType ? linkType : '';
        var $stateLink = global.getEleByQuery('#' + this.$map.id + ' .' + global.stateIdToDomClass(stateId) + linkType);
        if (this.statesData[stateId].cssClass != null) {
            $stateLink.setAttribute('class', $stateLink.getAttribute('class') + ' ' + this.statesData[stateId].cssClass)
        }
        if (this.statesData[stateId].isDisabled) {
            clickFn = null
        } else if (this.statesData[stateId].linkUrl != null) {
            var self = this;
            clickFn = function(e) {
                var isPop = false;
                if (self.statesData[stateId].overridePopLink != null) {
                    isPop = self.statesData[stateId].overridePopLink
                } else if (self.globalData.popLink) {
                    isPop = true
                }
                if (isPop) {
                    window.open(self.statesData[stateId].linkUrl)
                } else {
                    document.location.href = self.statesData[stateId].linkUrl
                }
            }
        } else if (this.globalData.globalLinkUrl != null) {
            var self = this;
            clickFn = function(e) {
                var normalizedUrl = self.globalData.globalLinkUrl.replaceAll('@state', stateId);
                var isPop = false;
                if (self.statesData[stateId].overridePopLink != null) {
                    isPop = self.statesData[stateId].overridePopLink
                } else if (self.globalData.popLink) {
                    isPop = true
                }
                if (isPop) {
                    window.open(normalizedUrl)
                } else {
                    document.location.href = normalizedUrl
                }
            }
        } else if (this.globalData.globalJsCallback != null) {
            var self = this;
            clickFn = function(e) {
                var fn = window[self.globalData.globalJsCallback];
                if (typeof fn == 'function') {
                    fn(stateId)
                } else {
                    console.log('Unable to execute function: ' + self.globalData.globalJsCallback + '("' + stateId + '")')
                }
            }
        }
        $stateLink.onclick = clickFn;
        if (addLiveClassName) {
            var liveLinkClassName = classPrefix + 'live-link';
            $stateLink.className = $stateLink.className.replace(' ' + liveLinkClassName, '');
            if (clickFn != null) {
                $stateLink.className = $stateLink.className + ' ' + liveLinkClassName
            }
        }
    };
    this.mapObject.prototype.displayMapLinksList = function() {
        var $linkList = global.getEleByQuery('#' + this.$map.id + ' .' + classPrefix + 'listview');
        var allListsHtml = '';
        var stateIds = [];
        for (var stateId in this.statesData) {
            if (!this.statesData.hasOwnProperty(stateId)) {
                continue
            }
            stateIds.push(stateId)
        }
        var widthPercent = Math.floor(100 / maxTableColumns);
        var itemsPerList = Math.ceil(stateCount / maxTableColumns);
        var sliceStart = 0;
        for (var i = 0; i < maxTableColumns; ++i) {
            var slicedIds = stateIds.slice(sliceStart, sliceStart + itemsPerList);
            sliceStart += itemsPerList;
            if (slicedIds.length > 0) {
                var ul = document.createElement('UL');
                ul.style.maxWidth = widthPercent + '%';
                for (var x = 0; x < slicedIds.length; ++x) {
                    var li = document.createElement('LI');
                    li.appendChild(document.createElement('SPAN'));
                    var a = document.createElement('A');
                    a.className = classPrefix + 'state-' + slicedIds[x].toLowerCase() + '-listview';
                    a.textContent = this.statesData[slicedIds[x]].title;
                    li.appendChild(a);
                    ul.appendChild(li)
                }
                $linkList.appendChild(ul)
            }
        }
        for (var stateId in this.statesData) {
            if (!this.statesData.hasOwnProperty(stateId)) {
                continue
            }
            this.wireStateLink(stateId, true, '-listview')
        }
    };
    if (typeof exports !== 'undefined') {
        module.exports = this
    }
}).apply(ClickableMap);
var myUsaMap = ClickableMap.create('cmm-usa');
myUsaMap.setGlobalData({
    "version": "1.0.0",
    "width": "100",
    "widthUnits": "%",
    "fontSize": "14px",
    "fontName": "Courier New",
    "fill": "#92dce5",
    "hoverFill": "#ffffff",
    "disabledFill": "#c2c2c2",
    "backgroundFill": "#ffffff",
    "innerLabelColor": "#000000",
    "outerLabelColor": "#000000",
    "hoverLabelColor": "#d64933",
    "borderType": null,
    "borderStroke": "#6086d7",
    "enableShadows": true,
    "popLink": false,
    "showStateTitleAndDescOnHover": true,
    "showLinksList": false,
    "globalLinkUrl": null,
    "globalJsCallback": null,
    "mapTitle": null,
    "creditLink": ""
});
myUsaMap.setStatesData({
    "AL": {
        "fullName": "Alabama",
        "title": "Alabama – The Yellowhammer State",
        "description": "The Yellowhammer State",
        "longDescription": "Alabama is called the Yellowhammer State because of the yellowhammer woodpecker, which became a symbol of the state during the Civil War.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "AK": {
        "fullName": "Alaska",
        "title": "Alaska – The Last Frontier",
        "description": null,
        "longDescription": "Alaska is called the Last Frontier because it was the last major territory added to the United States and remains wild and sparsely populated.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "AZ": {
        "fullName": "Arizona",
        "title": "Arizona – The Grand Canyon State",
        "description": null,
        "longDescription": "Arizona is called the Grand Canyon State because it is home to the famous Grand Canyon, one of the world’s greatest natural wonders.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "AR": {
        "fullName": "Arkansas",
        "title": "Arkansas – The Natural State",
        "description": null,
        "longDescription": "Arkansas is called the Natural State because of its beautiful landscapes, forests, rivers, and mountains.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "CA": {
        "fullName": "California",
        "title": "California – The Golden State",
        "description": null,
        "longDescription": "California is called the Golden State because of the Gold Rush of 1849 and the golden poppy flowers that grow there",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "CO": {
        "fullName": "Colorado",
        "title": "Colorado – The Centennial State",
        "description": null,
        "longDescription": "Colorado is called the Centennial State because it became a state in 1876, 100 years after the United States declared independence",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "CT": {
        "fullName": "Connecticut",
        "title": "Connecticut – The Constitution State",
        "description": null,
        "longDescription": "Connecticut is called the Constitution State because it adopted one of the first written constitutions in America",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "DE": {
        "fullName": "Delaware",
        "title": "Delaware – The First State",
        "description": null,
        "longDescription": "Delaware is called the First State because it was the first to ratify the U.S. Constitution in 1787.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "DC": {
        "fullName": "District Of Columbia",
        "title": "District of Columbia (Washington, D.C.) – The Nation’s Capital",
        "description": null,
        "longDescription": "The District of Columbia is called the Nation’s Capital because it is the seat of the United States federal government and home to the White House, the Capitol Building, and the Supreme Court",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "FL": {
        "fullName": "Florida",
        "title": "Florida – The Sunshine State",
        "description": null,
        "longDescription": "Florida is called the Sunshine State because of its warm climate and sunny weather throughout most of the year",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "GA": {
        "fullName": "Georgia",
        "title": "Georgia – The Peach State",
        "description": null,
        "longDescription": "Georgia is called the Peach State because it is famous for producing high-quality peaches.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "HI": {
        "fullName": "Hawaii",
        "title": "Hawaii – The Aloha State",
        "description": null,
        "longDescription": "Hawaii is called the Aloha State because “aloha” is a traditional Hawaiian greeting that represents love, peace, and compassion.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": true,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "ID": {
        "fullName": "Idaho",
        "title": "Idaho – The Gem State",
        "description": null,
        "longDescription": "Idaho is called the Gem State because it has many different types of gemstones and natural beauty",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "IL": {
        "fullName": "Illinois",
        "title": "Illinois – The Prairie State",
        "description": null,
        "longDescription": "Illinois is called the Prairie State because much of its land was originally covered by prairies.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "IN": {
        "fullName": "Indiana",
        "title": "Indiana – The Hoosier State",
        "description": null,
        "longDescription": "Indiana is called the Hoosier State because “Hoosier” is a traditional nickname for the people of Indiana.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "IA": {
        "fullName": "Iowa",
        "title": "Iowa – The Hawkeye State",
        "description": null,
        "longDescription": "Iowa is called the Hawkeye State to honor Chief Black Hawk, a Native American leader.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "KS": {
        "fullName": "Kansas",
        "title": "Kansas – The Sunflower State",
        "description": null,
        "longDescription": "Kansas is called the Sunflower State because wild sunflowers grow widely across the state.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "KY": {
        "fullName": "Kentucky",
        "title": "Kentucky – The Bluegrass State",
        "description": null,
        "longDescription": "Kentucky is called the Bluegrass State because of the bluegrass that grows in its fertile soil.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "LA": {
        "fullName": "Louisiana",
        "title": "Louisiana – The Pelican State",
        "description": null,
        "longDescription": "Louisiana is called the Pelican State because the brown pelican is the state bird",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "ME": {
        "fullName": "Maine",
        "title": "Maine – The Pine Tree State",
        "description": null,
        "longDescription": "Maine is called the Pine Tree State because it has large forests filled with pine trees",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MD": {
        "fullName": "Maryland",
        "title": "Maryland – The Old Line State",
        "description": null,
        "longDescription": "Maryland is called the Old Line State in honor of its brave soldiers during the American Revolutionary War.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MA": {
        "fullName": "Massachusetts",
        "title": "Massachusetts – The Bay State",
        "description": null,
        "longDescription": "Massachusetts is called the Bay State because of its several large bays along the Atlantic coast.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": true,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MI": {
        "fullName": "Michigan",
        "title": "Michigan – The Great Lakes State",
        "description": null,
        "longDescription": "Michigan is called the Great Lakes State because it borders four of the five Great Lakes.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MN": {
        "fullName": "Minnesota",
        "title": "Minnesota – The North Star State",
        "description": null,
        "longDescription": "Minnesota is called the North Star State because its French motto means “The Star of the North.”",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MS": {
        "fullName": "Mississippi",
        "title": "Mississippi – The Magnolia State",
        "description": "The Magnolia State",
        "longDescription": "Mississippi is called the Magnolia State because magnolia trees grow widely there",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MO": {
        "fullName": "Missouri",
        "title": "Missouri – The Show-Me State",
        "description": null,
        "longDescription": "Missouri is called the Show-Me State because it reflects the people’s reputation for being practical and skeptical",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "MT": {
        "fullName": "Montana",
        "title": "Montana – The Treasure State",
        "description": null,
        "longDescription": "Montana is called the Treasure State because of its rich mineral resources, including gold and silver",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NE": {
        "fullName": "Nebraska",
        "title": "Nebraska – The Cornhusker State",
        "description": null,
        "longDescription": "Nebraska is called the Cornhusker State because of its strong agricultural tradition, especially corn farming",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NV": {
        "fullName": "Nevada",
        "title": "Nevada – The Silver State",
        "description": null,
        "longDescription": "Nevada is called the Silver State because of the large amounts of silver discovered there in the 19th century",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NH": {
        "fullName": "New Hampshire",
        "title": "New Hampshire – The Granite State",
        "description": null,
        "longDescription": "New Hampshire is called the Granite State because it has many granite quarries and rocky landscapes",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NJ": {
        "fullName": "New Jersey",
        "title": "New Jersey – The Garden State",
        "description": null,
        "longDescription": "New Jersey is called the Garden State because of its fertile soil and agricultural production",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NM": {
        "fullName": "New Mexico",
        "title": "New Mexico – The Land of Enchantment.",
        "description": null,
        "longDescription": "New Mexico is called the Land of Enchantment because of its beautiful deserts, mountains, and unique culture",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NY": {
        "fullName": "New York",
        "title": "New York – The Empire State",
        "description": null,
        "longDescription": "New York is called the Empire State because of its wealth, resources, and historical importance",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": true,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "NC": {
        "fullName": "North Carolina",
        "title": "North Carolina – The Tar Heel State",
        "description": null,
        "longDescription": "North Carolina is called the Tar Heel State because of its historic tar, pitch, and turpentine industries.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "ND": {
        "fullName": "North Dakota",
        "title": "North Dakota – The Peace Garden State",
        "description": null,
        "longDescription": "North Dakota is called the Peace Garden State because of the International Peace Garden located on the border with Canada.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "OH": {
        "fullName": "Ohio",
        "title": "Ohio – The Buckeye State",
        "description": null,
        "longDescription": "Ohio is called the Buckeye State because of the buckeye tree that grows there",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "OK": {
        "fullName": "Oklahoma",
        "title": "Oklahoma – The Sooner State",
        "description": null,
        "longDescription": "Oklahoma is called the Sooner State because of the settlers who arrived early to claim land during the Land Rush.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "OR": {
        "fullName": "Oregon",
        "title": "Oregon – The Beaver State",
        "description": null,
        "longDescription": "Oregon is called the Beaver State because beavers were important in its early fur trade history",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "PA": {
        "fullName": "Pennsylvania",
        "title": "Pennsylvania – The Keystone State",
        "description": null,
        "longDescription": "Pennsylvania is called the Keystone State because it played a central role in the founding of the United States.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "RI": {
        "fullName": "Rhode Island",
        "title": "Rhode Island – The Ocean State",
        "description": null,
        "longDescription": "Rhode Island is called the Ocean State because of its long coastline and maritime history.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "SC": {
        "fullName": "South Carolina",
        "title": "South Carolina – The Palmetto State",
        "description": null,
        "longDescription": "South Carolina is called the Palmetto State because of the palmetto tree, which is a state symbol",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "SD": {
        "fullName": "South Dakota",
        "title": "South Dakota – The Mount Rushmore State",
        "description": null,
        "longDescription": "South Dakota is called the Mount Rushmore State because Mount Rushmore is located there.",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "TN": {
        "fullName": "Tennessee",
        "title": "Tennessee – The Volunteer State",
        "description": null,
        "longDescription": "Tennessee is called the Volunteer State because many volunteers from Tennessee served in the War of 1812",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "TX": {
        "fullName": "Texas",
        "title": "Texas – The Lone Star State",
        "description": null,
        "longDescription": "Texas is called the Lone Star State because the single star on its flag represents its former independence",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "UT": {
        "fullName": "Utah",
        "title": "Utah – The Beehive State",
        "description": null,
        "longDescription": "Utah is called the Beehive State because the beehive symbolizes hard work and industry",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "VT": {
        "fullName": "Vermont",
        "title": "Vermont – The Green Mountain State",
        "description": null,
        "longDescription": "Vermont is called the Green Mountain State because of its green mountains, which are called the Green Mountains",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "VA": {
        "fullName": "Virginia",
        "title": "Virginia – The Old Dominion",
        "description": null,
        "longDescription": "Virginia is called the Old Dominion because of its loyalty to the English crown in the past",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "WA": {
        "fullName": "Washington",
        "title": "Washington – The Evergreen State",
        "description": null,
        "longDescription": "Washington is called the Evergreen State because of its many evergreen forests",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "WV": {
        "fullName": "West Virginia",
        "title": "West Virginia – The Mountain State",
        "description": null,
        "longDescription": "West Virginia is called the Mountain State because it is located entirely within the Appalachian Mountains",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "WI": {
        "fullName": "Wisconsin",
        "title": "Wisconsin – The Badger State",
        "description": null,
        "longDescription": "Wisconsin is called the Badger State because early miners lived in hillside tunnels like badgers",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    },
    "WY": {
        "fullName": "Wyoming",
        "title": "Wyoming – The Equality State",
        "description": null,
        "longDescription": "Wyoming is called the Equality State because it was the first state to grant women the right to vote",
        "linkUrl": null,
        "isDisabled": false,
        "isHovering": false,
        "cssClass": null,
        "overrideFill": "#000000",
        "overrideFillEnabled": false,
        "overrideHoverFill": "#000000",
        "overrideHoverFillEnabled": false,
        "overridePopLink": null
    }
});
myUsaMap.draw();