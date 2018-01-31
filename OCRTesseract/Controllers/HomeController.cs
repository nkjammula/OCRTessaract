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
                    //Getting Image and Tesseract Frame work file path
                    var imagePath = Resources.ImagePath + fileContent.FileName;
                    var tessereactDataPath = Resources.TesseractPath;
                    //Instantiating Tesseract engine
                    using (var tesseractEngine = new TesseractEngine(tessereactDataPath, "eng", EngineMode.Default)) //creating the tesseract OCR engine with English as the language
                    {
                        using (var pixImg = Pix.LoadFromFile(imagePath)) // Load of the image file from the Pix object which is a wrapper for Leptonica PIX structure
                        {
                            using (var page = tesseractEngine.Process(pixImg)) //process the specified image
                            {
                                text = page.GetText(); //Getting image's content as plain text.
                                meanConfidence = page.GetMeanConfidence() * 100; //Converting mean confidence value to %;
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