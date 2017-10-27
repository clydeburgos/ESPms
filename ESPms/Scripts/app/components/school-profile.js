(function (ko) {
    var componentId = "school-profile";
    var ViewModel = function (params) {
        var self = this;
        self.schoolName = 'Massachusetts Institute of Technology (MIT)';
        self.otherName = 'MIT'
        self.fullAddress = '02139 77 Massachusetts Avenue Cambridge, MA 02139, United States';

        self.initControls = function () {
            $("#address").dxTextBox({
                value: '02139 77 Massachusetts Avenue Cambridge'
            });

            $("#state-zip").dxTextBox({
                value: 'MA 02139'
            });

            $("#notes").dxTextArea({
                value: "Founded in 1861, Massachusetts Institute of Technology (M.I.T.) is the best university in the world according"
                + " to the QS World University Rankings 2016-2017, a title it has regularly claimed over the last few years. Rated 5+ QS stars, "
                + " it’s achieved the maximum score across all categories, including research, employability, teaching, facilities, internationalization, innovation, specialist criteria and inclusiveness." 
                + " MIT is also the best university in the world for a number of subjects including, but not limited to, architecture, linguistics, computer science and information systems, engineering and technology, chemistry, mathematics, economics and",
                height: 200
            });
        }
        self.Init = function () {
            self.initControls();
        }

        self.Init();
    }

    ko.components.register(componentId, {
        viewModel: ViewModel,
        template: { element: "t-" + componentId }
    });
})(ko);