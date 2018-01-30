using System;
using System.IO;
using System.Web.Mvc;
using OCRTesseract.Properties;
using Tesseract;

namespace OCRTesseract.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ProcessImage()
        {
            var text = String.Empty;
            float meanConfidence = 0;
            foreach (string file in Request.Files)
            {
                var fileContent = Request.Files[file];

                if (fileContent != null && fileContent.ContentLength > 0)
                {
                    // get a stream
                    var stream = fileContent.InputStream;
                    var testImagePath = Resources.ImagePath + fileContent.FileName;
                    var dataPath = Resources.TesseractPath;
                    // and optionally write the file to disk
                    using (var tEngine = new TesseractEngine(dataPath, "eng", EngineMode.Default)) //creating the tesseract OCR engine with English as the language
                    {
                        using (var img = Pix.LoadFromFile(testImagePath)) // Load of the image file from the Pix object which is a wrapper for Leptonica PIX structure
                        {
                            using (var page = tEngine.Process(img)) //process the specified image
                            {
                                text = page.GetText(); //Gets the image's content as plain text.
                                meanConfidence = page.GetMeanConfidence() * 100;
                            }
                        }
                    }
                }
            }
            var tesseractResult = new { Text = text, MeanConfidence = meanConfidence };
            return Json(tesseractResult);
        }
    }
}