(function (ko) {
    var componentId = "sidebar-menu";
    var ViewModel = function (params) {
        var self = this;
        self.menuBarItems = 
            [{
                id: "1",
                text: "School",
                expanded: true,
                items: [
                {
                    id: "1_0",
                    text: "Dashboard",
                    expanded: true
                },
                {
                    id: "1_1",
                    text: "List",
                    expanded: false
                }, {
                    id: "1_2",
                    text: "Profile",
                    expanded: false
                }, {
                    id: "1_3",
                    text: "Create",
                    expanded: false
                }, {
                    id: "1_4",
                    text: "Import / Export",
                    expanded: false
                }

                ]
            },
            {
                id: "2",
                text: "Courses",
                expanded: true,
                items: [
                    {
                        id: "2_0",
                        text: "Dashboard",
                        expanded: true
                    },
                    {
                        id: "2_1",
                        text: "List",
                        expanded: false
                    }, {
                        id: "2_2",
                        text: "Profile",
                        expanded: false
                    }, {
                        id: "2_3",
                        text: "Create",
                        expanded: false
                    }, {
                        id: "2_4",
                        text: "Import / Export",
                        expanded: false
                    }, {
                        id: "2_5",
                        text: "Best Find",
                        expanded: false
                    }
                ]
            }]
        self.InitControls = function () {
            var treeview = $("#sidebar-menu-treeview").dxTreeView({
                items: this.menuBarItems,
                width: 300,
                searchValue: "",
                onItemClick: function (e) {
                    var item = e.itemData;
                    //if (item.price) {
                    //    $("#product-details").removeClass("hidden");
                    //    $("#product-details > img").attr("src", item.image);
                    //    $("#product-details > .price").text("$" + item.price);
                    //    $("#product-details > .name").text(item.text);
                    //} else {
                    //    $("#product-details").addClass("hidden");
                    //}
                }
            }).dxTreeView("instance");
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