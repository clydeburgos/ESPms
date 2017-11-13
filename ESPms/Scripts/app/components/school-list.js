(function (ko) {
    var componentId = "school-list";
    var ViewModel = function (params) {
        var self = this;
        self.SchoolsData = [{
            "ID": 1,
            "SchoolName": "Super Mart of the West",
            "Address": "702 SW 8th Street",
            "City": "Bentonville",
            "State": "Arkansas",
            "Zipcode": 72716,
            "Phone": "(800) 555-2797",
            "Fax": "(800) 555-2171",
            "Website": "http://www.nowebsitesupermart.com"
        }, {
            "ID": 2,
            "SchoolName": "Electronics Depot",
            "Address": "2455 Paces Ferry Road NW",
            "City": "Atlanta",
            "State": "Georgia",
            "Zipcode": 30339,
            "Phone": "(800) 595-3232",
            "Fax": "(800) 595-3231",
            "Website": "http://www.nowebsitedepot.com"
        }, {
            "ID": 3,
            "SchoolName": "K&S Music",
            "Address": "1000 Nicllet Mall",
            "City": "Minneapolis",
            "State": "Minnesota",
            "Zipcode": 55403,
            "Phone": "(612) 304-6073",
            "Fax": "(612) 304-6074",
            "Website": "http://www.nowebsitemusic.com"
        }, {
            "ID": 4,
            "SchoolName": "Tom's Club",
            "Address": "999 Lake Drive",
            "City": "Issaquah",
            "State": "Washington",
            "Zipcode": 98027,
            "Phone": "(800) 955-2292",
            "Fax": "(800) 955-2293",
            "Website": "http://www.nowebsitetomsclub.com"
        }, {
            "ID": 5,
            "SchoolName": "E-Mart",
            "Address": "3333 Beverly Rd",
            "City": "Hoffman Estates",
            "State": "Illinois",
            "Zipcode": 60179,
            "Phone": "(847) 286-2500",
            "Fax": "(847) 286-2501",
            "Website": "http://www.nowebsiteemart.com"
        }, {
            "ID": 6,
            "SchoolName": "Walters",
            "Address": "200 Wilmot Rd",
            "City": "Deerfield",
            "State": "Illinois",
            "Zipcode": 60015,
            "Phone": "(847) 940-2500",
            "Fax": "(847) 940-2501",
            "Website": "http://www.nowebsitewalters.com"
        }, {
            "ID": 7,
            "SchoolName": "StereoShack",
            "Address": "400 Commerce S",
            "City": "Fort Worth",
            "State": "Texas",
            "Zipcode": 76102,
            "Phone": "(817) 820-0741",
            "Fax": "(817) 820-0742",
            "Website": "http://www.nowebsiteshack.com"
        }, {
            "ID": 8,
            "SchoolName": "Circuit Town",
            "Address": "2200 Kensington Court",
            "City": "Oak Brook",
            "State": "Illinois",
            "Zipcode": 60523,
            "Phone": "(800) 955-2929",
            "Fax": "(800) 955-9392",
            "Website": "http://www.nowebsitecircuittown.com"
        }, {
            "ID": 9,
            "SchoolName": "Premier Buy",
            "Address": "7601 Penn Avenue South",
            "City": "Richfield",
            "State": "Minnesota",
            "Zipcode": 55423,
            "Phone": "(612) 291-1000",
            "Fax": "(612) 291-2001",
            "Website": "http://www.nowebsitepremierbuy.com"
        }, {
            "ID": 10,
            "SchoolName": "ElectrixMax",
            "Address": "263 Shuman Blvd",
            "City": "Naperville",
            "State": "Illinois",
            "Zipcode": 60563,
            "Phone": "(630) 438-7800",
            "Fax": "(630) 438-7801",
            "Website": "http://www.nowebsiteelectrixmax.com"
        }, {
            "ID": 11,
            "SchoolName": "Video Emporium",
            "Address": "1201 Elm Street",
            "City": "Dallas",
            "State": "Texas",
            "Zipcode": 75270,
            "Phone": "(214) 854-3000",
            "Fax": "(214) 854-3001",
            "Website": "http://www.nowebsitevideoemporium.com"
        }, {
            "ID": 12,
            "SchoolName": "Screen Shop",
            "Address": "1000 Lowes Blvd",
            "City": "Mooresville",
            "State": "North Carolina",
            "Zipcode": 28117,
            "Phone": "(800) 445-6937",
            "Fax": "(800) 445-6938",
            "Website": "http://www.nowebsitescreenshop.com"
        }, {
            "ID": 13,
            "SchoolName": "Harry and Melton Technical",
            "Address": "1000 Nicllet Mall",
            "City": "Minneapolis",
            "State": "Minnesota",
            "Zipcode": 55403,
            "Phone": "(612) 304-6073",
            "Fax": "(612) 304-6074",
            "Website": "http://www.nowebsitemusic.com"
        }
        ];
        self.InitControls = function () {
            var treeview = $("#schoolGridContainer").dxDataGrid({
                dataSource: self.SchoolsData,
                columns: ["SchoolName", "Address", "City", "State", "Zipcode", "Phone", "Website"],
                paging: { pageSize: 10 },
                selection: { mode: 'single' },
                sorting: { mode: 'multiple' },
                allowColumnReordering: true,
                allowColumnResizing: true,
                filterRow: { visible: true }
            }).dxDataGrid("instance");
        }

        self.Init = function () {
            self.InitControls();
        }

        self.Init();

        }
      
    ko.components.register(componentId, {
        viewModel: ViewModel,
        template: { element: "t-" + componentId }
    });
})(ko);