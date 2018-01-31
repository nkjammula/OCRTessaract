using System;
using HtmlBuilders;

namespace HtmlBuilder
{
    public class HtmlBuilder
    {
        public static HtmlTag TextBoxTag(string id, string name)
        {
            return new HtmlTag("input").Id(id).Attribute("class", name)
                .Attribute("type", "text").Attribute("value", "Hi");
        }
        public static HtmlTag DivTag(string id, string className)
        {
            return new HtmlTag("Div").Id(id).Class(className);
        }

       

    }
}
