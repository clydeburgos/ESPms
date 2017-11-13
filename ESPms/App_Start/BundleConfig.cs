using System.Web;
using System.Web.Optimization;

namespace ESPms
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Bundles/css")
                    .Include("~/Content/bootstrap.min.css")
                    .Include("~/Content/dx.common.css")
                    .Include("~/Content/dx.light.custom.css")
                    //.Include("~/Content/dx.overrides.css")
                    .Include("~/Content/Site.css")
                    .Include("~/Content/responsive.css")
                );

            bundles.Add(new ScriptBundle("~/Bundles/js")
               .Include("~/Scripts/underscore.js")
               .Include("~/Scripts/jquery-3.1.1.min.js")
               .Include("~/Scripts/ba-tiny-pubsub.min.js")
               .Include("~/Scripts/bootstrap.min.js")
               .Include("~/Scripts/knockout-3.4.2.js")
               .Include("~/Scripts/knockout.mapping-latest.js")
               .Include("~/Scripts/cldr.js")
               .Include("~/Scripts/cldr/event.js")
               .Include("~/Scripts/cldr/supplemental.js")
               .Include("~/Scripts/dx.all.js")
               .Include("~/Scripts/moment-with-locales.min.js")
               .Include("~/Scripts/promise.js")

               .Include("~/Scripts/app/helpers.js")
             );

         bundles.Add(new ScriptBundle("~/Bundles/App")
                .Include("~/Scripts/app/components/*.js")
                .Include("~/Scripts/app/widgets/*.js")
          );
        }
    }
}
