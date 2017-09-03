using System.IO;
using System.Linq;

namespace vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsFileExtensionSupported(string fileName)
        {
            return AcceptedFileTypes.Any(e => e == Path.GetExtension(fileName));
        }
    }
}